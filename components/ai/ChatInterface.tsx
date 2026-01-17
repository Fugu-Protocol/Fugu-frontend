'use client';

import React, { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function ChatInterface() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [status, setStatus] = useState<'ready' | 'streaming'>('ready');
    const [isOpen, setIsOpen] = useState(false);

    // User context data
    const [userContext, setUserContext] = useState({
        walletAddress: null as string | null,
        balance: 0,
        activePredictions: [] as any[],
        userPreferences: {
            language: 'auto',
            riskLevel: 'medium'
        }
    });

    const sendMessage = async (userMessage: string) => {
        if (!userMessage.trim()) return;

        const newUserMessage = {
            id: Date.now().toString(),
            role: 'user',
            parts: [{ type: 'text', text: userMessage }]
        };

        setMessages(prev => [...prev, newUserMessage]);
        setStatus('streaming');

        try {
            const formattedMessages = [...messages, newUserMessage]
                .map(m => {
                    const content = m.parts?.[0]?.text || m.content || '';
                    return {
                        role: m.role,
                        content: content.trim()
                    };
                })
                .filter(m => m.content.length > 0);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: formattedMessages,
                    userContext: userContext,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantText = '';

            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                parts: [{ type: 'text', text: '' }]
            };

            setMessages(prev => [...prev, assistantMessage]);

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                assistantText += chunk;

                setMessages(prev => {
                    const updated = [...prev];
                    const lastMsg = updated[updated.length - 1];
                    if (lastMsg.role === 'assistant') {
                        lastMsg.parts[0].text = assistantText;
                    }
                    return updated;
                });
            }
        } catch (error) {
            console.error('Chat error:', error);
        } finally {
            setStatus('ready');
        }
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        await sendMessage(input);
        setInput('');
    };

    // Toggle Button (Neo-Brutalist Style)
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#3e90f0] border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] text-white flex items-center justify-center transition-all z-50 animate-bounce"
            >
                <span className="text-3xl">🤖</span>
            </button>
        );
    }

    // Main Chat Window (Neo-Brutalist Style)
    return (
        <div className="fixed bottom-6 right-6 flex flex-col h-[600px] w-full max-w-[400px] bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Header */}
            <div className="p-4 border-b-2 border-black bg-[#3e90f0] flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#a5f3fc] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                        <span className="text-xl">🐠</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase tracking-wide">Fugu AI</h2>
                        <p className="text-xs text-white font-bold">Prediction Assistant</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 flex items-center justify-center bg-white border-2 border-black rounded hover:bg-red-500 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* Messages Area - Light Background */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-[#f0fdfa]">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="text-6xl mb-4 grayscale opacity-80">💬</div>
                        <p className="text-base font-bold text-slate-700">Hello! How can I help you?</p>
                        <p className="text-xs text-slate-500 mb-6">Ask about crypto prices, events, or how to play.</p>

                        <div className="mt-2 flex flex-wrap justify-center gap-2">
                            {[
                                '💰 How to deposit?',
                                '📈 BTC Price?',
                                '🏆 Top Winners?',
                            ].map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(suggestion)}
                                    className="px-3 py-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-lg text-xs font-bold hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((m: any) => (
                    <div
                        key={m.id}
                        className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-xl px-4 py-3 text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] ${m.role === 'user'
                                ? 'bg-[#3e90f0] text-white'
                                : 'bg-white text-slate-800'
                                }`}
                        >
                            {m.parts?.map((part: any, index: number) => (
                                <div key={index} className={`markdown-body prose prose-sm max-w-none ${m.role === 'user' ? 'prose-invert' : ''}`}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {part.text}
                                    </ReactMarkdown>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {status !== 'ready' && (
                    <div className="flex justify-start">
                        <div className="rounded-xl px-4 py-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t-2 border-black bg-white">
                <div className="relative flex items-center">
                    <input
                        className="w-full flex-1 bg-white text-black placeholder-slate-400 rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none border-2 border-black focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                        value={input}
                        placeholder="Type your question..."
                        onChange={(e) => setInput(e.target.value)}
                        disabled={status !== 'ready'}
                    />
                    <button
                        type="submit"
                        disabled={status !== 'ready' || !input.trim()}
                        className="absolute right-2 p-2 bg-[#d8d174] border-2 border-black hover:bg-[#b6c454] rounded text-black transition-all disabled:opacity-50 hover:shadow-[2px_2px_0px_0px_#000]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
