import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Settings, History, Loader2, AlertCircle } from 'lucide-react';
import { sendMessage, getGreeting } from '../../lib/geminiService';
import { Avatar } from '../../lib/supabase';
import { useChatHistory } from '../../lib/useChatHistory';

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  created_at?: string;
}

interface Conversation {
  id: string;
  user: string;
  preview: string;
  time: string;
}

interface AIChatInterfaceProps {
  avatar?: Avatar | null;
}

export function AIChatInterface({ avatar }: AIChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState('current');
  const [showSettings, setShowSettings] = useState(false);
  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use chat history hook
  const { 
    messages: savedMessages, 
    loading: historyLoading, 
    addMessage: saveMessage,
    clearHistory 
  } = useChatHistory(avatar?.id || null);

  // Format timestamp for display
  const formatTimestamp = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Initialize messages from history or with greeting
  useEffect(() => {
    if (historyLoading) return;

    if (savedMessages.length > 0) {
      // Load saved messages
      const formattedMessages: Message[] = savedMessages.map(msg => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: formatTimestamp(msg.created_at),
        created_at: msg.created_at,
      }));
      setDisplayMessages(formattedMessages);
    } else {
      // No history - show greeting
      const greeting = getGreeting(avatar || null);
      setDisplayMessages([
        {
          role: 'assistant',
          content: greeting,
          timestamp: formatTimestamp(),
        },
      ]);
    }
  }, [savedMessages, historyLoading, avatar]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages]);

  const conversations: Conversation[] = [
    { id: 'current', user: 'Current Session', preview: 'Active conversation...', time: 'Now' },
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setError(null);

    // Add user message to display immediately
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: formatTimestamp(),
    };
    setDisplayMessages(prev => [...prev, newUserMessage]);

    // Save user message to Supabase
    await saveMessage('user', userMessage);

    // Prepare chat history for API
    const chatHistory = displayMessages
      .filter((_, index) => index > 0) // Skip initial greeting if present
      .map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'model' as const,
        content: msg.content
      }));

    // Add current message to history
    chatHistory.push({ role: 'user', content: userMessage });

    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage, chatHistory, avatar || null);

      if (response.success) {
        const aiResponse: Message = {
          role: 'assistant',
          content: response.message,
          timestamp: formatTimestamp(),
        };
        setDisplayMessages(prev => [...prev, aiResponse]);
        
        // Save AI response to Supabase
        await saveMessage('assistant', response.message);
      } else {
        setError(response.error || 'Failed to get response');
        const errorMessage: Message = {
          role: 'assistant',
          content: `Вибачте, виникла помилка: ${response.error}. Спробуйте ще раз.`,
          timestamp: formatTimestamp(),
        };
        setDisplayMessages(prev => [...prev, errorMessage]);
        
        // Save error response to Supabase
        await saveMessage('assistant', errorMessage.content);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearConversation = async () => {
    // Clear from Supabase
    await clearHistory();
    
    // Reset to greeting
    const greeting = getGreeting(avatar || null);
    setDisplayMessages([{
      role: 'assistant',
      content: greeting,
      timestamp: formatTimestamp(),
    }]);
    setError(null);
  };

  const avatarName = avatar?.avatar_name || 'Coach Avatar';
  const avatarHeadline = avatar?.professional_headline || 'AI Coaching Assistant';

  // Show loading while fetching history
  if (historyLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Завантаження історії чату...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Conversation History Sidebar - Hidden on mobile, collapsible on desktop */}
      <div className="hidden lg:block w-80 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="flex items-center gap-2 text-lg text-gray-900 dark:text-white">
              <History className="w-5 h-5" />
              Conversation History
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full p-4 border-b border-gray-200 dark:border-gray-700 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedConversation === conv.id ? 'bg-green-50 dark:bg-green-600/20 border-l-4 border-l-green-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-gray-900 dark:text-white">{conv.user}</p>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{conv.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {displayMessages.length > 0 
                    ? displayMessages[displayMessages.length - 1].content.substring(0, 50) + '...'
                    : conv.preview
                  }
                </p>
              </button>
            ))}
          </div>
          
          {/* Message count indicator */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {savedMessages.length > 0 
                ? `${savedMessages.length} повідомлень збережено`
                : 'Немає збережених повідомлень'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {avatar?.avatar_photo_url ? (
                <img 
                  src={avatar.avatar_photo_url} 
                  alt={avatarName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-lg text-gray-900 dark:text-white">{avatarName}</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {avatarHeadline !== avatarName ? avatarHeadline : 'AI Coaching Assistant'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Online indicator */}
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
          {displayMessages.map((message, index) => (
            <div
              key={message.id || index}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                  message.role === 'user' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-green-100 dark:bg-green-600/20'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 dark:text-gray-300" />
                ) : avatar?.avatar_photo_url ? (
                  <img 
                    src={avatar.avatar_photo_url} 
                    alt={avatarName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 dark:text-green-400" />
                )}
              </div>
              <div className={`flex-1 max-w-[80%] lg:max-w-[70%]`}>
                <div
                  className={`rounded-xl p-3 lg:p-4 ${
                    message.role === 'user'
                      ? 'bg-green-600 text-white ml-auto'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <p className="text-sm lg:text-base whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 px-1">{message.timestamp}</p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-green-100 dark:bg-green-600/20 overflow-hidden">
                {avatar?.avatar_photo_url ? (
                  <img 
                    src={avatar.avatar_photo_url} 
                    alt={avatarName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 dark:text-green-400" />
                )}
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Думаю...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Напишіть повідомлення..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">Надіслати</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
            Працює на Gemini AI • Історія чату зберігається автоматично
          </p>
        </div>
      </div>

      {/* Settings Sidebar - Shown when settings button clicked */}
      {showSettings && (
        <div className="absolute lg:relative right-0 top-0 w-full lg:w-80 h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg lg:shadow-none z-10">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg text-gray-900 dark:text-white">Інформація про аватар</h3>
            <button onClick={() => setShowSettings(false)} className="text-gray-900 dark:text-white text-2xl">
              ×
            </button>
          </div>
          <div className="p-4 space-y-4">
            {/* Avatar Details */}
            <div className="text-center">
              {avatar?.avatar_photo_url ? (
                <img 
                  src={avatar.avatar_photo_url} 
                  alt={avatarName}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bot className="w-10 h-10 text-white" />
                </div>
              )}
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">{avatarName}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {avatarHeadline !== avatarName ? avatarHeadline : 'AI Coaching Assistant'}
              </p>
            </div>

            {/* Tone Settings Display */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Стиль спілкування</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Теплота</span>
                  <span className="text-gray-900 dark:text-white">{avatar?.tone_warmth || 50}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Формальність</span>
                  <span className="text-gray-900 dark:text-white">{avatar?.tone_formality || 50}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Грайливість</span>
                  <span className="text-gray-900 dark:text-white">{avatar?.tone_playfulness || 50}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Емпатія</span>
                  <span className="text-gray-900 dark:text-white">{avatar?.tone_empathy || 50}%</span>
                </div>
              </div>
            </div>

            {/* Boundaries */}
            {(avatar?.topics_allowed?.length || avatar?.topics_blocked?.length) && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Межі</h5>
                {avatar?.topics_allowed && avatar.topics_allowed.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-green-600 dark:text-green-400 mb-1">Теми для обговорення:</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {avatar.topics_allowed.slice(0, 3).join(', ')}
                      {avatar.topics_allowed.length > 3 && ` +${avatar.topics_allowed.length - 3} ще`}
                    </p>
                  </div>
                )}
                {avatar?.topics_blocked && avatar.topics_blocked.length > 0 && (
                  <div>
                    <p className="text-xs text-red-600 dark:text-red-400 mb-1">Теми для перенаправлення:</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {avatar.topics_blocked.slice(0, 3).join(', ')}
                      {avatar.topics_blocked.length > 3 && ` +${avatar.topics_blocked.length - 3} ще`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Chat Stats */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Статистика чату</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Всього повідомлень: {savedMessages.length}
              </p>
            </div>

            {/* Clear Chat */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleClearConversation}
                className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Очистити розмову
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
