import React from "react";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatPreviewProps {
  messages: Message[];
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  showBadge?: boolean;
  className?: string;
  avatarUrl?: string | null;
  avatarName?: string;
}

export function ChatPreview({
  messages,
  onSendMessage,
  placeholder = "Type your message...",
  showBadge = true,
  className = "",
  avatarUrl,
  avatarName = "Your Mentor Avatar",
}: ChatPreviewProps) {
  const [input, setInput] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && onSendMessage) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-card ${className}`}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={avatarName}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200 dark:border-indigo-700"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <h4 className="text-slate-900 dark:text-slate-100">
              {avatarName}
            </h4>
            {showBadge && (
              <span className="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full mt-1">
                Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96 min-h-[300px]">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={avatarName}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-indigo-200 dark:border-indigo-700"
                />
              ) : (
                <Sparkles className="w-12 h-12 text-indigo-300 dark:text-indigo-700 mx-auto mb-3" />
              )}
              <p className="text-slate-500 dark:text-slate-400">
                Start a conversation with your mentor avatar
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && avatarUrl && (
                <img 
                  src={avatarUrl} 
                  alt={avatarName}
                  className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0 border border-indigo-200 dark:border-indigo-700"
                />
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                }`}
              >
                <p className="whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {onSendMessage && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-none rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
