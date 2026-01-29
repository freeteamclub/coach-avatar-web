import { useState } from "react";
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

  const samplePrompts = [
    "I feel stuck with my goals",
    "Help me reflect on my last week",
    "I need clarity before making a decision",
    "I'm struggling with work-life balance",
  ];

  const handleSendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    // Add user message
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: messageText },
    ];
    setMessages(newMessages);
    setInput("");

    // Simulate avatar response
    setTimeout(() => {
      const responses = [
        "That's a great question. Let's explore what's making you feel stuck. Can you tell me more about your current goals?",
        "Reflection is a powerful tool. What were the key moments or decisions from last week that stood out to you?",
        "Clarity comes from understanding your priorities. What factors are most important to you in making this decision?",
        "Work-life balance is crucial. What does balance look like for you, and where do you feel it's lacking right now?",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      setMessages([
        ...newMessages,
        { role: "assistant", content: randomResponse },
      ]);
    }, 1000);
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
  };

  if (!isOpen) return null;

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
              {/* Chat Messages */}
              <Card className="mb-4">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-slate-100">
                      Your Mentor Avatar
                    </h4>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Active
                    </p>
                  </div>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 rounded-lg max-w-[80%] ${
                          message.role === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        <p className="text-sm">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    placeholder="Ask your avatar anything..."
                    className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </Card>

              {/* Reset Button */}
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
                      className="w-full text-left p-3 bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-lg transition-all"
                    >
                      <p className="text-slate-700 dark:text-slate-300">
                        "{prompt}"
                      </p>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Start Build Button */}
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
    </div>
  );
}