
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Trash2, RefreshCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage, UserProfile } from '../types';
import { askTutor } from '../services/ai';

interface ChatBotProps {
  userProfile: UserProfile;
  initialContext?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ userProfile, initialContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    setError(null);
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    const currentInput = input;
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await askTutor(currentInput, history, userProfile, initialContext);
      
      const botMsg: ChatMessage = { 
        role: 'model', 
        text: response || "I'm sorry, I couldn't process that.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setError("Connection issue. Please try again.");
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I'm having trouble connecting right now. Could you try asking again?", 
        timestamp: new Date() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm("Clear conversation history?")) {
      setMessages([]);
      setError(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-indigo-600 text-white flex items-center justify-between shadow-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base">AI Doubt Support</h3>
            <p className="text-[10px] text-indigo-100 uppercase tracking-wider font-bold">Grade {userProfile.grade}</p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-indigo-100 hover:text-white"
          title="Clear chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {initialContext && (
        <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100 flex items-center gap-2">
          <RefreshCcw size={12} className="text-indigo-400" />
          <p className="text-[11px] text-indigo-600 font-bold truncate">
            HELPING WITH: {initialContext.toUpperCase()}
          </p>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30 chat-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-200 mb-6 shadow-inner">
              <Bot size={40} />
            </div>
            <h4 className="text-xl font-black text-slate-800 mb-2">Hello, {userProfile.name}!</h4>
            <p className="text-sm text-slate-500 max-w-[280px]">
              Ask me any question about your lessons or something new you'd like to learn.
            </p>
          </div>
        )}
        
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[90%] sm:max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm mt-1 ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
                {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'}`}>
                {m.role === 'user' ? (
                  <p className="text-sm leading-relaxed">{m.text}</p>
                ) : (
                  <div className="prose prose-sm prose-slate max-w-none prose-headings:text-indigo-900 prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0 prose-p:leading-relaxed prose-li:my-1 prose-strong:text-indigo-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center">
                <Bot size={14} />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Studying...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 text-red-600 text-[10px] font-bold px-4 py-2 rounded-full border border-red-100 shadow-sm">
              {error}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="relative group max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 text-sm transition-all shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all font-bold flex items-center justify-center gap-2 shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
