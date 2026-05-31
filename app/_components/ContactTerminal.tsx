'use client';

import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';

interface LogEntry {
    type: 'input' | 'output' | 'error' | 'success';
    text: string;
}

interface Message {
    name: string;
    text: string;
    date: string;
}

const ContactTerminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<LogEntry[]>([
        { type: 'output', text: 'Welcome to Anshul\'s Interactive Terminal Guestbook! [Version 1.0.0]' },
        { type: 'output', text: 'Type "help" to see available commands.' },
        { type: 'output', text: '' },
    ]);
    const [messages, setMessages] = useState<Message[]>([
        { name: 'Alex', text: 'Awesome portfolio! The animations are clean.', date: '2026-05-28' },
        { name: 'Sarah', text: 'Loved the custom fire icon. Great job!', date: '2026-05-29' },
    ]);

    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto scroll to bottom of terminal
    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Focus input on terminal box click
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        const parts = trimmed.split(' ');
        const mainCommand = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        const newHistory = [...history, { type: 'input' as const, text: `$ ${trimmed}` }];

        switch (mainCommand) {
            case 'clear':
                setHistory([]);
                return;
            case 'help':
                newHistory.push(
                    { type: 'output', text: 'Available commands:' },
                    { type: 'output', text: '  about      - Display brief bio about Anshul' },
                    { type: 'output', text: '  projects   - List top featured projects' },
                    { type: 'output', text: '  guestbook  - Show all guestbook messages' },
                    { type: 'output', text: '  sign <msg> - Sign the guestbook (e.g., "sign hello world")' },
                    { type: 'output', text: '  contact    - Get contact email & socials' },
                    { type: 'output', text: '  clear      - Clear the screen' }
                );
                break;
            case 'about':
                newHistory.push(
                    { type: 'output', text: 'Hi! I\'m Anshul, a Backend Developer specializing in scalable systems,' },
                    { type: 'output', text: 'APIs, and caching layers with Node.js, Express, Redis, MongoDB, and Docker.' }
                );
                break;
            case 'projects':
                newHistory.push(
                    { type: 'output', text: '1. MyBlog Application - React 19 + Express 5 Blog Platform' },
                    { type: 'output', text: '2. Dev Tinder - Developer matching app using Socket.io' },
                    { type: 'output', text: 'Type "about" to learn more.' }
                );
                break;
            case 'guestbook':
                newHistory.push({ type: 'output', text: '--- Guestbook Signatures ---' });
                messages.forEach((msg) => {
                    newHistory.push({
                        type: 'output',
                        text: `[${msg.date}] ${msg.name}: "${msg.text}"`,
                    });
                });
                newHistory.push({ type: 'output', text: '----------------------------' });
                break;
            case 'sign':
                if (!args) {
                    newHistory.push({
                        type: 'error',
                        text: 'Usage: sign <your message> (e.g., sign Great work!)',
                    });
                } else {
                    const visitorName = `Guest_${Math.floor(100 + Math.random() * 900)}`;
                    const today = new Date().toISOString().split('T')[0];
                    const newMsg: Message = { name: visitorName, text: args, date: today };

                    setMessages((prev) => [...prev, newMsg]);
                    newHistory.push(
                        { type: 'success', text: `Success! Signed as ${visitorName}` },
                        { type: 'output', text: `Message added: "${args}"` }
                    );
                }
                break;
            case 'contact':
                newHistory.push(
                    { type: 'output', text: 'Email: anshul41171@gmail.com' },
                    { type: 'output', text: 'GitHub: https://github.com/anshul4117' },
                    { type: 'output', text: 'LinkedIn: https://www.linkedin.com/in/anshul-ab7135245/' }
                );
                break;
            case '':
                break;
            default:
                newHistory.push({
                    type: 'error',
                    text: `Command not found: "${mainCommand}". Type "help" for a list of commands.`,
                });
                break;
        }

        setHistory(newHistory);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <section className="py-section bg-background" id="terminal-guestbook">
            <div className="container">
                <SectionTitle title="Guestbook Terminal" />

                <div 
                    onClick={handleTerminalClick}
                    className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-border shadow-2xl bg-black font-mono text-sm md:text-base cursor-text flex flex-col min-h-[420px]"
                >
                    {/* Terminal Title Bar */}
                    <div className="bg-neutral-900 px-4 py-3 flex items-center justify-between border-b border-border select-none">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                        </div>
                        <span className="text-xs text-muted-foreground font-semibold">guestbook@anshul: ~</span>
                        <div className="w-12"></div> {/* Spacer for alignment */}
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 flex-grow flex flex-col gap-2 overflow-y-auto max-h-[400px] custom-scrollbar text-green-400">
                        <div className="space-y-1">
                            {history.map((log, idx) => {
                                let styleClass = 'text-green-400';
                                if (log.type === 'input') styleClass = 'text-foreground font-bold';
                                if (log.type === 'error') styleClass = 'text-red-400';
                                if (log.type === 'success') styleClass = 'text-primary'; // theme green

                                return (
                                    <div key={idx} className={`${styleClass} whitespace-pre-wrap leading-relaxed`}>
                                        {log.text}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Interactive Input Row */}
                        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-neutral-900">
                            <span className="text-primary font-bold select-none">$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-grow bg-transparent outline-none text-foreground border-none p-0 focus:ring-0"
                                placeholder="Type a command..."
                                autoFocus
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                            />
                        </div>
                        <div ref={terminalEndRef} />
                    </div>
                </div>

                {/* Suggestions / Shortcuts */}
                <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-4xl mx-auto">
                    {['help', 'about', 'guestbook', 'sign Awesome site!', 'contact'].map((cmd) => (
                        <button
                            key={cmd}
                            onClick={() => {
                                handleCommand(cmd);
                                setInput('');
                            }}
                            className="px-3 py-1.5 text-xs rounded-full border border-border bg-background-light hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-mono text-muted-foreground"
                        >
                            {cmd}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactTerminal;
