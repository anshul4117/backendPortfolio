'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    LogOut, 
    Trash2, 
    Eye, 
    Mail, 
    Building, 
    RefreshCw, 
    Copy, 
    Check, 
    MessageSquare,
    Sparkles,
    Briefcase,
    Code,
    Search
} from 'lucide-react';

interface Message {
    _id: string;
    name: string;
    company: string;
    email: string;
    topic: string;
    message: string;
    createdAt: string;
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);
    
    const router = useRouter();

    const fetchMessages = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/app/../api/messages');
            if (res.status === 401) {
                router.push('/admin/login');
                return;
            }
            if (!res.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await res.json();
            if (data.success) {
                setMessages(data.messages);
            } else {
                setError(data.error || 'Could not load messages');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to database API.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/app/../api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to permanently delete this message?')) return;
        setDeletingId(id);
        try {
            const res = await fetch('/app/../api/messages', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                setMessages(prev => prev.filter(msg => msg._id !== id));
                if (selectedMessage?._id === id) {
                    setSelectedMessage(null);
                }
            } else {
                alert(data.error || 'Failed to delete message');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting message.');
        } finally {
            setDeletingId(null);
        }
    };

    const handleCopyEmail = async (email: string, id: string) => {
        try {
            await navigator.clipboard.writeText(email);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Copy error', err);
        }
    };

    // Filter messages by search query (name, company, email, message body)
    const filteredMessages = messages.filter(msg => {
        const query = searchQuery.toLowerCase();
        return (
            msg.name.toLowerCase().includes(query) ||
            msg.company.toLowerCase().includes(query) ||
            msg.email.toLowerCase().includes(query) ||
            msg.message.toLowerCase().includes(query) ||
            msg.topic.toLowerCase().includes(query)
        );
    });

    // Stats calculations
    const stats = {
        total: messages.length,
        hiring: messages.filter(m => m.topic === 'hiring').length,
        collaboration: messages.filter(m => m.topic === 'collaboration').length,
        techChat: messages.filter(m => m.topic === 'tech_chat').length,
        justHi: messages.filter(m => m.topic === 'just_hi').length,
    };

    const getTopicBadge = (topic: string) => {
        switch (topic) {
            case 'hiring':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        <Briefcase className="w-3 h-3" />
                        Hiring
                    </span>
                );
            case 'collaboration':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                        <Code className="w-3 h-3" />
                        Collab
                    </span>
                );
            case 'tech_chat':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <Sparkles className="w-3 h-3" />
                        Tech Chat
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        <MessageSquare className="w-3 h-3" />
                        Just Hi
                    </span>
                );
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <main className="min-h-screen bg-black text-foreground font-sans p-6 relative">
            {/* Top Bar */}
            <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-800 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                        <MessageSquare className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-anton uppercase tracking-widest leading-none">
                            Admin Messages
                        </h1>
                        <p className="text-xs text-muted-foreground mt-1 font-mono">
                            Database Status: <span className="text-primary font-bold">Connected</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={fetchMessages}
                        disabled={loading}
                        className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-muted-foreground hover:text-foreground hover:bg-neutral-800 transition-colors"
                        title="Refresh Messages"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={handleLogout}
                        className="h-10 px-4 rounded-xl border border-neutral-800 bg-neutral-900 text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors font-mono text-sm flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Stats Dashboard Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                        <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider block">Total Received</span>
                        <span className="text-3xl font-anton text-foreground mt-1 block">{stats.total}</span>
                    </div>
                    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                        <span className="text-xs text-primary font-mono uppercase tracking-wider block">💼 Hiring</span>
                        <span className="text-3xl font-anton text-primary mt-1 block">{stats.hiring}</span>
                    </div>
                    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                        <span className="text-xs text-secondary font-mono uppercase tracking-wider block">🛠️ Collab</span>
                        <span className="text-3xl font-anton text-secondary mt-1 block">{stats.collaboration}</span>
                    </div>
                    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                        <span className="text-xs text-purple-400 font-mono uppercase tracking-wider block">💬 Tech Chat</span>
                        <span className="text-3xl font-anton text-purple-400 mt-1 block">{stats.techChat}</span>
                    </div>
                    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 col-span-2 lg:col-span-1">
                        <span className="text-xs text-orange-400 font-mono uppercase tracking-wider block">👋 Just Hi</span>
                        <span className="text-3xl font-anton text-orange-400 mt-1 block">{stats.justHi}</span>
                    </div>
                </div>

                {/* Filter and Table Card */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 overflow-hidden flex flex-col">
                    {/* Filter Bar */}
                    <div className="p-4 border-b border-neutral-800 bg-neutral-900/40 flex items-center gap-3">
                        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter by name, email, company, or message..."
                            className="bg-transparent border-none text-foreground placeholder:text-muted-foreground outline-none text-sm w-full py-1 focus:ring-0"
                        />
                    </div>

                    {/* Messages Body */}
                    {loading ? (
                        <div className="p-12 text-center space-y-3">
                            <svg className="animate-spin h-8 w-8 text-primary mx-auto" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-sm font-mono text-muted-foreground">Retrieving Mongo Documents...</p>
                        </div>
                    ) : error ? (
                        <div className="p-12 text-center text-red-400 font-mono text-sm">
                            ⚠️ Error: {error}
                        </div>
                    ) : filteredMessages.length === 0 ? (
                        <div className="p-16 text-center text-muted-foreground font-mono space-y-2">
                            <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto text-neutral-600 mb-2">
                                <Search className="w-5 h-5" />
                            </div>
                            <p className="text-sm">No documents found matching criteria</p>
                            <p className="text-xs text-neutral-600">Waiting for recruiter submissions...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-neutral-800 bg-neutral-900/60 text-muted-foreground text-xs font-mono uppercase tracking-wider">
                                        <th className="p-4 font-semibold">Date</th>
                                        <th className="p-4 font-semibold">Sender</th>
                                        <th className="p-4 font-semibold">Purpose</th>
                                        <th className="p-4 font-semibold">Message Preview</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-800 bg-neutral-950/20 font-sans">
                                    {filteredMessages.map((msg) => (
                                        <tr key={msg._id} className="hover:bg-neutral-900/30 transition-colors group">
                                            <td className="p-4 font-mono text-xs whitespace-nowrap text-muted-foreground">
                                                {formatDate(msg.createdAt)}
                                            </td>
                                            <td className="p-4">
                                                <div className="font-semibold text-foreground">{msg.name}</div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                                    {msg.company && (
                                                        <span className="flex items-center gap-0.5 text-neutral-400">
                                                            <Building className="w-3 h-3" />
                                                            {msg.company}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                {getTopicBadge(msg.topic)}
                                            </td>
                                            <td className="p-4 max-w-xs truncate text-muted-foreground font-sans">
                                                {msg.message}
                                            </td>
                                            <td className="p-4 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleCopyEmail(msg.email, msg._id)}
                                                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200"
                                                        title="Copy Sender Email"
                                                    >
                                                        {copiedId === msg._id ? (
                                                            <Check className="w-4 h-4 text-primary animate-in zoom-in" />
                                                        ) : (
                                                            <Mail className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => setSelectedMessage(msg)}
                                                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-secondary text-muted-foreground hover:text-secondary transition-all duration-200"
                                                        title="Read Full Message"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(msg._id)}
                                                        disabled={deletingId === msg._id}
                                                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-500 text-muted-foreground hover:text-red-400 transition-all duration-200"
                                                        title="Delete Message"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Read Message Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div 
                        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-[4px] w-full bg-gradient-to-r from-primary via-secondary to-primary-hover"></div>
                        
                        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-neutral-950/40">
                            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                                Document Detail
                            </span>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-neutral-800"
                            >
                                <span className="text-xl leading-none">&times;</span>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                            {/* Metadata */}
                            <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-neutral-800/60 pb-4">
                                <div className="space-y-1">
                                    <span className="text-muted-foreground uppercase block">Sender Name</span>
                                    <span className="text-foreground font-sans font-bold text-sm block">{selectedMessage.name}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-muted-foreground uppercase block">Company / Brand</span>
                                    <span className="text-foreground font-sans font-semibold text-sm block">
                                        {selectedMessage.company || <span className="text-neutral-700 italic">None</span>}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-muted-foreground uppercase block">Sender Email</span>
                                    <span className="text-foreground font-sans font-semibold text-sm flex items-center gap-1.5 mt-0.5">
                                        {selectedMessage.email}
                                        <button
                                            onClick={() => handleCopyEmail(selectedMessage.email, 'detail-modal')}
                                            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {copiedId === 'detail-modal' ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-muted-foreground uppercase block">Timestamp</span>
                                    <span className="text-foreground text-xs block">{formatDate(selectedMessage.createdAt)}</span>
                                </div>
                            </div>

                            {/* Topic Badge */}
                            <div>
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">Category</span>
                                {getTopicBadge(selectedMessage.topic)}
                            </div>

                            {/* Body Message */}
                            <div className="space-y-2">
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Message Payload</span>
                                <div className="w-full bg-neutral-950 border border-neutral-800/80 rounded-xl p-4 text-foreground text-sm leading-relaxed whitespace-pre-wrap font-sans overflow-x-auto">
                                    {selectedMessage.message}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center px-6 py-4 border-t border-neutral-800 bg-neutral-950/20">
                            <button
                                onClick={() => handleDelete(selectedMessage._id)}
                                className="flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete Document
                            </button>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="px-4 py-2 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 rounded-lg text-xs font-mono tracking-wider transition-colors uppercase text-foreground"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
