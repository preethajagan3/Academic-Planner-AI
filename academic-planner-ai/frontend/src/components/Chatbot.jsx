import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SparkleChatIcon, XIcon, BrainIcon } from './Icons';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hi! I'm your Academic Assistant. How can I help you with your study plan today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { token, user } = useSelector((state) => state.auth);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    if (!token) return null;

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await axios.post('/api/chat', {
                message: userMessage,
                context: { user: user?.name, date: new Date().toLocaleDateString() }
            }, config);

            setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
        } catch (error) {
            console.error("Chatbot Error:", error);
            const data = error.response?.data;
            let displayMsg = data?.message || "I'm having trouble connecting to the AI.";
            if (data?.details) displayMsg += ` (${data.details})`;

            setMessages(prev => [...prev, { role: 'assistant', content: `[Alert] ${displayMsg}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-500 transform shimmer-btn ${isOpen ? 'bg-slate-900 rotate-90 scale-110' : 'bg-primary-600 hover:scale-110 active:scale-95'
                    }`}
            >
                {isOpen ? <XIcon className="w-6 h-6 text-white" /> : <SparkleChatIcon className="w-8 h-8 text-white" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-violet-500 border-2 border-white shadow-sm"></span>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            <div
                className={`absolute bottom-24 right-0 w-[380px] sm:w-[420px] h-[600px] bg-white rounded-[40px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-20 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-full blur-[60px] opacity-20 -mr-16 -mt-16"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                            <BrainIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-xl tracking-tight">Academic AI</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <p className="text-[10px] opacity-60 uppercase tracking-widest font-black">Online & Ready</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 no-scrollbar">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[85%] p-5 rounded-[28px] text-sm leading-relaxed shadow-sm transition-all duration-300 ${msg.role === 'user'
                                    ? 'bg-primary-600 text-white rounded-tr-none shadow-primary-100'
                                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-slate-100 p-5 rounded-[28px] rounded-tl-none shadow-sm flex items-center gap-2">
                                <div className="flex space-x-1.5">
                                    <div className="w-2 h-2 bg-slate-200 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-50 flex gap-3 items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-primary-50 focus:bg-white focus:border-primary-200 outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="bg-primary-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-primary-100 active:scale-90"
                    >
                        <svg className="w-6 h-6 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
