import { useState, useEffect, useRef } from 'react'
import { supabase, Avatar } from './supabase'
import { useAuth } from './AuthContext'

interface UseAvatarReturn {
  avatar: Avatar | null
  loading: boolean
  error: string | null
  createAvatar: () => Promise<Avatar | null>
  updateAvatar: (data: Partial<Avatar>) => Promise<boolean>
  deleteAvatar: () => Promise<boolean>
  refreshAvatar: () => Promise<void>
}

export function useAvatar(): UseAvatarReturn {
  const { user } = useAuth()
  const [avatar, setAvatar] = useState<Avatar | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Protection against race conditions
  const isCreating = useRef(false)
  const isFetching = useRef(false)

  // Fetch avatar on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchAvatar()
    } else {
      setAvatar(null)
      setLoading(false)
    }
  }, [user])

  const fetchAvatar = async () => {
    if (!user) return
    
    // Prevent concurrent fetches
    if (isFetching.current) return
    isFetching.current = true

    setLoading(true)
    setError(null)

    try {
      // Get the LATEST avatar for this coach (order by created_at desc, limit 1)
      const { data, error: fetchError } = await supabase
        .from('avatars')
        .select('*')
        .eq('coach_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (fetchError) {
        // No avatar found - that's okay
        if (fetchError.code === 'PGRST116') {
          setAvatar(null)
        } else {
          throw fetchError
        }
      } else {
        setAvatar(data)
      }
    } catch (err: any) {
      console.error('Error fetching avatar:', err)
      setError(err.message)
    } finally {
      setLoading(false)
      isFetching.current = false
    }
  }

  const createAvatar = async (): Promise<Avatar | null> => {
    if (!user) return null
    
    // CRITICAL: Prevent multiple simultaneous create calls
    if (isCreating.current) {
      console.log('Avatar creation already in progress, skipping...')
      return null
    }
    isCreating.current = true

    setError(null)

    try {
      // IMPORTANT: First check if avatar already exists for this user
      const { data: existingAvatars, error: checkError } = await supabase
        .from('avatars')
        .select('*')
        .eq('coach_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      // If avatar exists, return it - DON'T create a new one!
      if (existingAvatars && existingAvatars.length > 0) {
        const existing = existingAvatars[0]
        console.log('Avatar already exists, using existing:', existing.id)
        setAvatar(existing)
        return existing
      }

      console.log('Creating new avatar for user:', user.id)

      // Only create new avatar if none exists
      const { data, error: createError } = await supabase
        .from('avatars')
        .insert({
          coach_id: user.id,
          // Default values
          tone_warmth: 50,
          tone_formality: 50,
          tone_playfulness: 50,
          tone_empathy: 50,
          is_published: false,
          completion_percentage: 0,
          topics_allowed: ['Goal clarity', 'Accountability', 'Leadership challenges', 'Career transitions', 'Work-life balance'],
          topics_blocked: ['Clinical mental health', 'Legal issues', 'Medical decisions', 'Acute crisis', 'Financial advice'],
          crisis_response: "I hear that you're going through something really difficult right now. Your safety and wellbeing are the priority. I'd encourage you to reach out to a crisis helpline or mental health professional who can provide immediate support. Would you like me to share some resources?",
          out_of_scope_response: "I appreciate you sharing that with me. This topic falls outside my area of expertise as a coaching avatar. I'd recommend speaking with a qualified professional who specializes in this area. Is there something else I can help you with today?"
        })
        .select()
        .single()

      if (createError) throw createError

      console.log('Avatar created successfully:', data.id)
      setAvatar(data)
      return data
    } catch (err: any) {
      console.error('Error creating avatar:', err)
      setError(err.message)
      return null
    } finally {
      isCreating.current = false
    }
  }

  const updateAvatar = async (data: Partial<Avatar>): Promise<boolean> => {
    if (!user || !avatar) return false

    setError(null)

    try {
      // Calculate completion percentage
      const completionData = { ...avatar, ...data }
      const completion = calculateCompletion(completionData)

      const { error: updateError } = await supabase
        .from('avatars')
        .update({
          ...data,
          completion_percentage: completion,
          updated_at: new Date().toISOString()
        })
        .eq('id', avatar.id)
        .eq('coach_id', user.id) // Extra safety: ensure we only update our own avatar

      if (updateError) throw updateError

      // Update local state
      setAvatar(prev => prev ? { 
        ...prev, 
        ...data, 
        completion_percentage: completion,
        updated_at: new Date().toISOString()
      } : null)

      return true
    } catch (err: any) {
      console.error('Error updating avatar:', err)
      setError(err.message)
      return false
    }
  }

  const deleteAvatar = async (): Promise<boolean> => {
    if (!user || !avatar) return false

    setError(null)

    try {
      // Delete related data first (due to foreign key constraints)
      
      // 1. Delete chat messages
      await supabase
        .from('chat_messages')
        .delete()
        .eq('avatar_id', avatar.id)

      // 2. Delete training materials
      await supabase
        .from('training_materials')
        .delete()
        .eq('avatar_id', avatar.id)

      // 3. Delete the avatar itself
      const { error: deleteError } = await supabase
        .from('avatars')
        .delete()
        .eq('id', avatar.id)
        .eq('coach_id', user.id) // Extra safety

      if (deleteError) throw deleteError

      // 4. Delete storage files (avatar photos, documents, videos)
      try {
        // List all files in user's storage folder
        const { data: files } = await supabase.storage
          .from('avatars')
          .list(user.id)

        if (files && files.length > 0) {
          // Delete all user files
          const filePaths = files.map(file => `${user.id}/${file.name}`)
          await supabase.storage
            .from('avatars')
            .remove(filePaths)
        }

        // Also try to delete subfolders
        const folders = ['photos', 'documents', 'videos']
        for (const folder of folders) {
          const { data: folderFiles } = await supabase.storage
            .from('avatars')
            .list(`${user.id}/${folder}`)

          if (folderFiles && folderFiles.length > 0) {
            const folderPaths = folderFiles.map(file => `${user.id}/${folder}/${file.name}`)
            await supabase.storage
              .from('avatars')
              .remove(folderPaths)
          }
        }
      } catch (storageErr) {
        // Storage deletion errors are not critical
        console.warn('Error deleting storage files:', storageErr)
      }

      // Clear local state
      setAvatar(null)

      console.log('Avatar deleted successfully')
      return true
    } catch (err: any) {
      console.error('Error deleting avatar:', err)
      setError(err.message)
      return false
    }
  }

  const refreshAvatar = async () => {
    await fetchAvatar()
  }

  return {
    avatar,
    loading,
    error,
    createAvatar,
    updateAvatar,
    deleteAvatar,
    refreshAvatar
  }
}

// Helper function to calculate completion percentage
function calculateCompletion(avatar: Partial<Avatar>): number {
  let completed = 0
  const total = 7 // 7 steps

  // Step 1: Basic Identity
  if (avatar.avatar_name && avatar.professional_headline && avatar.certification_status) {
    completed++
  }

  // Step 2: Tone of Voice
  if (avatar.communication_style || 
      (avatar.tone_warmth !== 50 || avatar.tone_formality !== 50 || 
       avatar.tone_playfulness !== 50 || avatar.tone_empathy !== 50)) {
    completed++
  }

  // Step 3: Coaching Approach
  if (avatar.coaching_approach) {
    completed++
  }

  // Step 4: How You Work
  if (avatar.conversation_flow || avatar.key_moments) {
    completed++
  }

  // Step 5: Boundaries
  if (avatar.topics_allowed?.length || avatar.topics_blocked?.length) {
    completed++
  }

  // Step 6: Training Materials (optional, count as complete by default)
  completed++

  // Step 7: Review (count as complete if we have basic info)
  if (avatar.avatar_name) {
    completed++
  }

  return Math.round((completed / total) * 100)
}
