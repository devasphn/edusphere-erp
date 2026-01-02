import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ExternalLink } from 'lucide-react';
import { getChatbotResponse } from '../services/geminiService';
import { NavigationTab } from '../types';

interface FloatingChatbotProps {
  onNavigate: (tab: NavigationTab) => void;
}

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hi! I am EduBot. Ask me where to find things (e.g., "Where are the teachers?").' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Call Gemini API
    const responseText = await getChatbotResponse(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', content: responseText }]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to parse navigation tags: [[NAV:TAB_NAME]]
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\[\[NAV:[A-Z_]+\]\])/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('[[NAV:') && part.endsWith(']]')) {
        const tabKey = part.replace('[[NAV:', '').replace(']]', '') as NavigationTab;
        return (
          <button
            key={index}
            onClick={() => {
              onNavigate(tabKey);
              // Optional: Close chat on navigation
              // setIsOpen(false); 
            }}
            className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-full transition-colors border border-red-200"
          >
            <span>Go to {tabKey.replace('_', ' ')}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 z-50 ${
          isOpen ? 'bg-red-800 rotate-90' : 'bg-red-600 hover:bg-red-700 hover:scale-110'
        } text-white`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-red-100 flex flex-col overflow-hidden z-50 animate-fade-in-up h-[500px]">
          {/* Header */}
          <div className="bg-red-900 p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">EduBot Assistant</h3>
              <p className="text-red-200 text-xs">Online • Gemini Flash</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-red-50/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-red-600 text-white rounded-br-none'
                      : 'bg-white text-red-900 border border-red-100 rounded-bl-none'
                  }`}
                >
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none border border-red-100 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-red-300 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-red-300 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-red-300 rounded-full animate-bounce delay-200"></span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-red-100">
            <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-full border border-red-200 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-sm text-red-900 placeholder:text-red-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};