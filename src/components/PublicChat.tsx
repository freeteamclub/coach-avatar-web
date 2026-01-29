import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Send, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { supabase, Avatar } from '../lib/supabase';
import { sendMessage, getGreeting } from '../lib/geminiService';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export function PublicChat() {
  const { avatarId } = useParams<{ avatarId: string }>();
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch avatar data
  useEffect(() => {
    async function fetchAvatar() {
      console.log('PublicChat: avatarId from URL =', avatarId);
      
      if (!avatarId) {
        setError('Avatar ID не вказано');
        setLoading(false);
        return;
      }

      try {
        console.log('PublicChat: Fetching avatar from Supabase...');
        
        const { data, error: fetchError } = await supabase
          .from('avatars')
          .select('*')
          .eq('id', avatarId)
          .single();

        console.log('PublicChat: Supabase response:', { data, error: fetchError });

        if (fetchError) {
          console.error('Supabase error:', fetchError);
          setError('Аватар не знайдено');
          setLoading(false);
          return;
        }

        if (!data) {
          setError('Аватар не знайдено');
          setLoading(false);
          return;
        }

        setAvatar(data);
        // Set initial greeting
        setMessages([{
          role: 'model',
          content: getGreeting(data)
        }]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching avatar:', err);
        setError('Помилка завантаження аватара');
        setLoading(false);
      }
    }

    fetchAvatar();
  }, [avatarId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      // Filter out greeting for API call
      const chatHistory = newMessages.slice(1); // Skip initial greeting
      
      const response = await sendMessage(userMessage, chatHistory, avatar);
      
      if (response.success) {
        setMessages([...newMessages, { role: 'model', content: response.message }]);
      } else {
        setMessages([...newMessages, { 
          role: 'model', 
          content: response.error || 'Вибачте, сталася помилка. Спробуйте ще раз.' 
        }]);
      }
    } catch (err) {
      setMessages([...newMessages, { 
        role: 'model', 
        content: 'Вибачте, сталася помилка. Спробуйте ще раз.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    if (avatar) {
      setMessages([{
        role: 'model',
        content: getGreeting(avatar)
      }]);
    }
    setInput('');
  };

  // DiceBear avatar URL
  const getAvatarImageUrl = () => {
    if (avatar?.selected_avatar_url) {
      return avatar.selected_avatar_url;
    }
    if (avatar?.avatar_photo_url) {
      return avatar.avatar_photo_url;
    }
    // Fallback to DiceBear
    return `https://api.dicebear.com/7.x/lorelei/svg?seed=${avatarId}&backgroundColor=b6e3f4`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Завантаження аватара...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Помилка</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            На головну
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <img
            src={getAvatarImageUrl()}
            alt={avatar?.avatar_name || 'Avatar'}
            className="w-12 h-12 rounded-full object-cover shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">
              {avatar?.avatar_name || 'AI Coach'}
            </h1>
            {avatar?.professional_headline && (
              <p className="text-sm text-gray-600">{avatar.professional_headline}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-green-600">Online</span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'model' && (
                <img
                  src={getAvatarImageUrl()}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white shadow-md text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <img
                src={getAvatarImageUrl()}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="px-4 py-3 rounded-2xl bg-white shadow-md">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isTyping}
                placeholder={isTyping ? 'Аватар друкує...' : 'Напишіть повідомлення...'}
                className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || !input.trim()}
                className="px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Reset button */}
            <div className="mt-3 text-center">
              <button
                onClick={resetChat}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Почати спочатку
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-3">
        <div className="text-center text-sm text-gray-500">
          Powered by{' '}
          <a 
            href="https://anantata.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Anantata
          </a>
        </div>
      </footer>
    </div>
  );
}
