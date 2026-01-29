import { useState, useEffect } from "react";
import {
  X,
  Send,
  RefreshCw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Card } from "./Card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AvatarPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBuild?: () => void;
}

export function AvatarPreviewModal({
  isOpen,
  onClose,
  onStartBuild,
}: AvatarPreviewModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your mentor avatar. I'm here to help you with business strategy, leadership development, and career transitions. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [floatOffset, setFloatOffset] = useState(0);

  // Анімація glow та float
  useEffect(() => {
    if (!isOpen) return;
    
    const glowInterval = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 30);
    
    const floatInterval = setInterval(() => {
      setFloatOffset(prev => (prev + 1) % 360);
    }, 20);
    
    return () => {
      clearInterval(glowInterval);
      clearInterval(floatInterval);
    };
  }, [isOpen]);

  const samplePrompts = [
    "I feel stuck with my goals",
    "Help me reflect on my last week",
    "I need clarity before making a decision",
    "I'm struggling with work-life balance",
  ];

  const handleSendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: messageText },
    ];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "That's a great question. Let's explore what's making you feel stuck. Can you tell me more about your current goals?",
        "Reflection is a powerful tool. What were the key moments or decisions from last week that stood out to you?",
        "Clarity comes from understanding your priorities. What factors are most important to you in making this decision?",
        "Work-life balance is crucial. What does balance look like for you, and where do you feel it's lacking right now?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setIsTyping(false);
      setMessages([...newMessages, { role: "assistant", content: randomResponse }]);
    }, 1500);
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm your mentor avatar. I'm here to help you with business strategy, leadership development, and career transitions. How can I assist you today?",
      },
    ]);
    setInput("");
    setIsTyping(false);
  };

  if (!isOpen) return null;

  // DiceBear аватар URL (простий робочий варіант)
  const exampleAvatarUrl = 'https://api.dicebear.com/7.x/lorelei/svg?seed=CoachMentor&backgroundColor=b6e3f4';

  // Динамічні стилі для анімацій
  const glowValue = Math.sin(glowIntensity * 0.1) * 0.5 + 0.5;
  const floatValue = Math.sin(floatOffset * (Math.PI / 180)) * 4;
  const scaleValue = isTyping ? 1 + Math.sin(Date.now() / 200) * 0.03 : 1;

  const animatedAvatarStyle = {
    transform: `translateY(${floatValue}px) scale(${scaleValue})`,
    boxShadow: `0 0 ${10 + glowValue * 15}px rgba(99, 102, 241, ${0.4 + glowValue * 0.4}), 
                0 0 ${20 + glowValue * 20}px rgba(139, 92, 246, ${0.3 + glowValue * 0.3})`,
    transition: 'transform 0.1s ease-out',
  };

  const smallAvatarStyle = {
    transform: `scale(${isTyping ? 1 + Math.sin(Date.now() / 150) * 0.05 : 1})`,
    boxShadow: isTyping ? '0 0 10px rgba(99, 102, 241, 0.5)' : 'none',
  };

  // Typing dots animation
  const TypingIndicator = () => {
    const [dotFrame, setDotFrame] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setDotFrame(prev => (prev + 1) % 3);
      }, 400);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex gap-3 justify-start">
        <img 
          src={exampleAvatarUrl}
          alt="Avatar"
          className="w-8 h-8 rounded-full flex-shrink-0"
          style={smallAvatarStyle}
        />
        <div className="px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700">
          <div className="flex items-center gap-1.5 h-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-indigo-500"
                style={{
                  transform: `translateY(${dotFrame === i ? -6 : 0}px)`,
                  opacity: dotFrame === i ? 1 : 0.4,
                  transition: 'all 0.2s ease-out',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl lg:text-3xl text-slate-900 dark:text-slate-100 mb-2">
              Your Mentor Avatar — live preview
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Try a short chat to see how your avatar responds.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Chat Interface */}
            <div>
              <Card className="mb-4">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                  {/* Animated Avatar Header */}
                  <img 
                    src={exampleAvatarUrl}
                    alt="Mentor Avatar"
                    className="w-12 h-12 rounded-full"
                    style={animatedAvatarStyle}
                  />
                  <div>
                    <h4 className="text-slate-900 dark:text-slate-100 font-semibold">
                      Your Mentor Avatar
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="w-2 h-2 bg-green-500 rounded-full"
                        style={{ 
                          animation: 'pulse 1.5s ease-in-out infinite',
                          boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)'
                        }}
                      />
                      <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {isTyping ? "Thinking..." : "Active"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                      style={{
                        animation: 'slideIn 0.3s ease-out',
                      }}
                    >
                      {message.role === "assistant" && (
                        <img 
                          src={exampleAvatarUrl}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full flex-shrink-0"
                          style={smallAvatarStyle}
                        />
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                          message.role === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && <TypingIndicator />}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSendMessage()}
                    disabled={isTyping}
                    placeholder={isTyping ? "Avatar is thinking..." : "Ask your avatar anything..."}
                    className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isTyping || !input.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </Card>

              <div className="text-center">
                <button
                  onClick={resetChat}
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset conversation
                </button>
              </div>
            </div>

            {/* Right: Sample Prompts */}
            <div>
              <Card>
                <h4 className="text-slate-900 dark:text-slate-100 mb-4">
                  Try these sample questions
                </h4>
                <div className="space-y-2">
                  {samplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isTyping}
                      className="w-full text-left p-3 bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <p className="text-slate-700 dark:text-slate-300">"{prompt}"</p>
                    </button>
                  ))}
                </div>
              </Card>

              <div className="mt-6">
                <button
                  onClick={onStartBuild}
                  className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg font-medium"
                >
                  Start Build Avatar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
