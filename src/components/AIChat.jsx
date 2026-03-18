import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Brain, Send, Loader2, Copy, Trash2, MessageCircle, Sparkles, X, Bot } from 'lucide-react';
// import { useDarkMode } from '../context/DarkModeContext';
import API from '../services/api';

const AIChat = () => {
//  const { isDarkMode } = useDarkMode();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'नमस्ते! 👋 मैं CampusFlow AI Assistant हूँ। Campus, fees, attendance, placements, TC या किसी भी study problem के बारे में पूछो। How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/api/ai/chat', {
        message: input,
      });

      const aiMessage = { id: Date.now() + 1, role: 'assistant', content: response.data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Sorry, AI service temporarily unavailable. Try again later.');
      console.error('AI Chat Error:', err);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Chat cleared! नया conversation शुरू। Ask me anything about campus life! 🚀',
      },
    ]);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="h-[70vh] lg:h-[75vh] flex flex-col bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg">
          <Brain size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            AI Assistant
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">CampusFlow Smart Helper</p>
        </div>
        <button
          onClick={clearChat}
          className="ml-auto p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all"
          title="Clear Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 border border-gray-200/50 dark:border-gray-600/50'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <button
                onClick={() => copyMessage(message.content)}
                className="mt-2 flex items-center gap-1 text-xs opacity-70 hover:opacity-100 transition-all p-1 -m-1 rounded hover:bg-white/50 dark:hover:bg-gray-600"
              >
                <Copy size={12} /> Copy
              </button>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
              <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
              <div className="text-sm text-gray-500 dark:text-gray-400">Typing...</div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 rounded-2xl text-red-700 dark:text-red-300 text-sm max-w-md text-center">
              {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question... (e.g., Fee status कैसे check करें?)"
            className="flex-1 px-5 py-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !loading) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`p-4 rounded-2xl transition-all shadow-lg ${
              input.trim() && !loading
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-blue-500/25 hover:shadow-xl hover:scale-[1.05]'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
          Powered by OpenAI • Free to use
        </p>
      </form>
    </div>
  );
};

export default AIChat;

