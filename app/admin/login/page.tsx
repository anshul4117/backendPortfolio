'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, ShieldAlert, Terminal } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/app/../api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push('/admin/messages');
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black flex flex-col justify-center items-center p-4 font-sans select-none relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden relative">
                {/* Accent line */}
                <div className="h-[4px] w-full bg-gradient-to-r from-primary via-secondary to-primary-hover"></div>

                <div className="p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-2">
                            <Terminal className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-anton uppercase tracking-widest text-foreground">
                            Admin Control
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter secret password to access incoming messages.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">
                                Authentication Key
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••••"
                                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-10 pr-10 py-3 text-foreground outline-none transition-all placeholder:text-neutral-800"
                                    disabled={loading}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Notice */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-950/20 border border-red-900/30 rounded-xl text-xs text-red-400 font-mono animate-in fade-in slide-in-from-top-1">
                                <ShieldAlert className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Action Button */}
                        <button
                            type="submit"
                            disabled={loading || !password.trim()}
                            className="w-full h-12 bg-primary text-primary-foreground font-anton tracking-widest uppercase hover:bg-primary-hover flex items-center justify-center gap-2 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-primary/10 mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                'Verify Identity'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Back to Site */}
            <button
                onClick={() => router.push('/')}
                className="mt-6 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
                ← Back to Portfolio
            </button>
        </main>
    );
}
