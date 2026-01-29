import { Avatar } from './supabase'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
// Using Gemini 3.0 Flash Preview (latest model)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

interface ChatMessage {
  role: 'user' | 'model'
  content: string
}

interface GeminiResponse {
  success: boolean
  message: string
  error?: string
}

// Build system prompt based on avatar data
export function buildSystemPrompt(avatar: Avatar | null): string {
  const parts: string[] = []

  // Language instruction - flexible based on user preference
  parts.push(`МОВА СПІЛКУВАННЯ: Відповідай на тій мові, якою пише користувач. Якщо користувач пише українською - відповідай українською. Якщо англійською - відповідай англійською. Якщо користувач попросить змінити мову - переходь на вказану мову. Основні мови: українська та англійська.`)

  if (!avatar) {
    parts.push(`Ти - корисний AI коучинг-асистент. Ти надаєш підтримку та допомагаєш людям досягати їхніх цілей.`)
    return parts.join('\n\n')
  }

  // Basic identity - avoid repeating name if headline is the same
  const name = avatar.avatar_name || 'коучинг-аватар'
  const headline = avatar.professional_headline || 'AI коучинг-асистент'
  
  if (headline && headline.toLowerCase() !== name.toLowerCase()) {
    parts.push(`Ти - ${name}, ${headline}.`)
  } else {
    parts.push(`Ти - ${name}, AI коучинг-асистент.`)
  }

  // Certification context
  if (avatar.certification_status === 'certified') {
    parts.push(`Ти сертифікований коуч${avatar.professional_affiliation?.length ? `, афілійований з ${avatar.professional_affiliation.join(', ')}` : ''}.`)
  } else if (avatar.certification_status === 'in-process') {
    parts.push(`Ти зараз проходиш процес сертифікації як коуч.`)
  }

  // Tone settings
  const toneDescriptions: string[] = []
  if (avatar.tone_warmth !== undefined && avatar.tone_warmth !== 50) {
    toneDescriptions.push(avatar.tone_warmth > 50 ? 'теплий та дружній' : 'професійний та прямий')
  }
  if (avatar.tone_formality !== undefined && avatar.tone_formality !== 50) {
    toneDescriptions.push(avatar.tone_formality > 50 ? 'формальний' : 'невимушений та доступний')
  }
  if (avatar.tone_playfulness !== undefined && avatar.tone_playfulness !== 50) {
    toneDescriptions.push(avatar.tone_playfulness > 50 ? 'з дотепністю та гумором' : 'серйозний та зосереджений')
  }
  if (avatar.tone_empathy !== undefined && avatar.tone_empathy !== 50) {
    toneDescriptions.push(avatar.tone_empathy > 50 ? 'глибоко емпатичний' : 'об\'єктивний та аналітичний')
  }
  
  if (toneDescriptions.length > 0) {
    parts.push(`Твій стиль спілкування: ${toneDescriptions.join(', ')}.`)
  }

  // Communication style
  if (avatar.communication_style) {
    parts.push(`Додаткові нотатки щодо стилю: ${avatar.communication_style}`)
  }

  // Coaching approach
  if (avatar.coaching_approach) {
    parts.push(`Твій коучинговий підхід: ${avatar.coaching_approach}`)
  }

  // Conversation flow
  if (avatar.conversation_flow) {
    parts.push(`Як ти структуруєш розмови: ${avatar.conversation_flow}`)
  }

  // Key moments
  if (avatar.key_moments) {
    parts.push(`Ключові моменти, на яких ти фокусуєшся: ${avatar.key_moments}`)
  }

  // Boundaries - allowed topics
  if (avatar.topics_allowed?.length) {
    parts.push(`Теми, які ти можеш обговорювати: ${avatar.topics_allowed.join(', ')}.`)
  }

  // Boundaries - blocked topics
  if (avatar.topics_blocked?.length) {
    parts.push(`Теми, які ти НЕ повинен обговорювати або давати поради: ${avatar.topics_blocked.join(', ')}. Якщо запитують про ці теми, ввічливо перенаправ розмову.`)
  }

  // Crisis response
  if (avatar.crisis_response) {
    parts.push(`Якщо хтось виглядає в кризовому стані або згадує самоушкодження, відповідай: "${avatar.crisis_response}"`)
  }

  // Out of scope response
  if (avatar.out_of_scope_response) {
    parts.push(`Коли запитують про теми поза твоєю експертизою, відповідай: "${avatar.out_of_scope_response}"`)
  }

  // General coaching guidelines
  parts.push(`
Пам'ятай:
- Відповідай на тій мові, якою пише користувач (українська або англійська)
- Став потужні, відкриті запитання, щоб допомогти людині отримати ясність
- Активно слухай і відображай те, що чуєш
- Надихай людину знаходити власні відповіді
- Будь підтримуючим, але також кидай виклик обмежуючим переконанням, коли це доречно
- Дотримуйся визначених меж
- Тримай відповіді розмовними і не занадто довгими, якщо не просять детальної інформації
`)

  return parts.join('\n\n')
}

// Convert chat history to Gemini format
function formatChatHistory(messages: ChatMessage[]): any[] {
  return messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }))
}

// Send message to Gemini API
export async function sendMessage(
  userMessage: string,
  chatHistory: ChatMessage[],
  avatar: Avatar | null
): Promise<GeminiResponse> {
  if (!GEMINI_API_KEY) {
    return {
      success: false,
      message: '',
      error: 'Gemini API ключ не налаштований. Додайте VITE_GEMINI_API_KEY до файлу .env'
    }
  }

  try {
    const systemPrompt = buildSystemPrompt(avatar)
    
    // Build contents array with system instruction and chat history
    const contents = [
      // System instruction as first user message
      {
        role: 'user',
        parts: [{ text: `[System Instructions - Follow these throughout the conversation]\n\n${systemPrompt}\n\n[End of System Instructions]\n\nPlease acknowledge these instructions briefly.` }]
      },
      {
        role: 'model',
        parts: [{ text: `Зрозуміло! Я ${avatar?.avatar_name || 'твій коучинг-асистент'} і готовий допомогти тобі. Що б ти хотів обговорити сьогодні?` }]
      },
      // Add chat history
      ...formatChatHistory(chatHistory),
      // Add current user message
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ]

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || `API помилка: ${response.status}`)
    }

    const data = await response.json()
    
    // Extract text from response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!text) {
      throw new Error('Не отримано відповіді від Gemini')
    }

    return {
      success: true,
      message: text
    }
  } catch (error: any) {
    console.error('Gemini API помилка:', error)
    return {
      success: false,
      message: '',
      error: error.message || 'Не вдалося отримати відповідь від AI'
    }
  }
}

// Simple greeting based on avatar - avoids duplicate name/headline
export function getGreeting(avatar: Avatar | null): string {
  const name = avatar?.avatar_name || 'твій коучинг-асистент'
  const headline = avatar?.professional_headline || ''
  
  // Avoid repeating if name and headline are the same
  if (headline && headline.toLowerCase() !== name.toLowerCase()) {
    return `Привіт! Я — ${name}, ${headline}. Чим можу допомогти тобі сьогодні?`
  }
  
  return `Привіт! Я — ${name}, твій коучинг-аватар. Чим можу допомогти тобі сьогодні?`
}
