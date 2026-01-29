import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pkpqcqrkplthmykhcgie.supabase.co'
const supabaseAnonKey = 'sb_publishable_X0bE41FNTvRR-s09LBsAXw_ic9EQrnR'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface Coach {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Avatar {
  id: string
  coach_id: string
  
  // Step 1: Basic Identity
  avatar_name: string | null
  professional_headline: string | null
  avatar_photo_url: string | null
  avatar_photo_1: string | null
  avatar_photo_2: string | null
  avatar_photo_3: string | null
  generated_avatar_1: string | null
  generated_avatar_2: string | null
  generated_avatar_3: string | null
  selected_avatar_url: string | null
  certification_status: string | null
  professional_affiliation: string[] | null
  social_linkedin: string | null
  social_instagram: string | null
  social_website: string | null
  social_other: string | null
  
  // Step 2: Tone of Voice
  tone_warmth: number
  tone_formality: number
  tone_playfulness: number
  tone_empathy: number
  communication_style: string | null
  
  // Step 3: Coaching Approach
  coaching_approach: string | null
  
  // Step 4: How You Work
  conversation_flow: string | null
  key_moments: string | null
  
  // Step 5: Boundaries
  topics_allowed: string[] | null
  topics_blocked: string[] | null
  crisis_response: string | null
  out_of_scope_response: string | null
  
  // Status
  is_published: boolean
  completion_percentage: number
  
  created_at: string
  updated_at: string
}

export interface TrainingMaterial {
  id: string
  avatar_id: string
  type: 'link' | 'document' | 'video'
  title: string | null
  url: string | null
  file_path: string | null
  file_size: number | null
  mime_type: string | null
  transcription: string | null
  notes: string | null
  tags: string[] | null
  created_at: string
}

export interface Conversation {
  id: string
  avatar_id: string
  visitor_name: string | null
  visitor_email: string | null
  status: 'active' | 'completed'
  satisfaction_rating: number | null
  started_at: string
  ended_at: string | null
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}
