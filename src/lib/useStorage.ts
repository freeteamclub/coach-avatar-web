import { useState } from 'react'
import { supabase } from './supabase'
import { useAuth } from './AuthContext'

interface UploadResult {
  url: string | null
  path: string | null
  error: string | null
}

interface UseStorageReturn {
  uploading: boolean
  uploadProgress: number
  uploadFile: (file: File, folder?: string) => Promise<UploadResult>
  uploadAvatar: (file: File) => Promise<UploadResult>
  uploadDocument: (file: File) => Promise<UploadResult>
  uploadVideo: (file: File) => Promise<UploadResult>
  deleteFile: (path: string) => Promise<boolean>
  getPublicUrl: (path: string) => string
}

export function useStorage(): UseStorageReturn {
  const { user } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadFile = async (file: File, folder: string = 'files'): Promise<UploadResult> => {
    if (!user) {
      return { url: null, path: null, error: 'User not authenticated' }
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 8)
      const fileName = `${timestamp}-${randomString}.${fileExt}`
      
      // Path: userId/folder/filename
      const filePath = `${user.id}/${folder}/${fileName}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      setUploadProgress(100)

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      return {
        url: urlData.publicUrl,
        path: filePath,
        error: null
      }
    } catch (err: any) {
      console.error('Upload error:', err)
      return {
        url: null,
        path: null,
        error: err.message || 'Upload failed'
      }
    } finally {
      setUploading(false)
    }
  }

  const uploadAvatar = async (file: File): Promise<UploadResult> => {
    // Validate image
    if (!file.type.startsWith('image/')) {
      return { url: null, path: null, error: 'Please select an image file' }
    }

    // Max 5MB for avatar
    if (file.size > 5 * 1024 * 1024) {
      return { url: null, path: null, error: 'Image must be less than 5MB' }
    }

    return uploadFile(file, 'photos')
  }

  const uploadDocument = async (file: File): Promise<UploadResult> => {
    // Validate document types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]

    if (!allowedTypes.includes(file.type)) {
      return { url: null, path: null, error: 'Please select a PDF, DOC, DOCX, or TXT file' }
    }

    // Max 50MB for documents
    if (file.size > 50 * 1024 * 1024) {
      return { url: null, path: null, error: 'Document must be less than 50MB' }
    }

    return uploadFile(file, 'documents')
  }

  const uploadVideo = async (file: File): Promise<UploadResult> => {
    // Validate video types
    const allowedTypes = [
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/webm'
    ]

    if (!allowedTypes.includes(file.type)) {
      return { url: null, path: null, error: 'Please select an MP4, MOV, AVI, or WebM file' }
    }

    // Max 50MB for videos (Supabase free tier limit)
    if (file.size > 50 * 1024 * 1024) {
      return { url: null, path: null, error: 'Video must be less than 50MB' }
    }

    return uploadFile(file, 'videos')
  }

  const deleteFile = async (path: string): Promise<boolean> => {
    if (!user) return false

    try {
      const { error } = await supabase.storage
        .from('avatars')
        .remove([path])

      if (error) throw error

      return true
    } catch (err: any) {
      console.error('Delete error:', err)
      return false
    }
  }

  const getPublicUrl = (path: string): string => {
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(path)

    return data.publicUrl
  }

  return {
    uploading,
    uploadProgress,
    uploadFile,
    uploadAvatar,
    uploadDocument,
    uploadVideo,
    deleteFile,
    getPublicUrl
  }
}
