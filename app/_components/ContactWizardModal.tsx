'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
    X, 
    ArrowRight, 
    ArrowLeft, 
    Copy, 
    Check, 
    Mail, 
    Briefcase, 
    Code, 
    MessageSquare, 
    User, 
    Building, 
    Sparkles,
    Terminal,
    AlertCircle
} from 'lucide-react';

interface ContactWizardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type TopicType = 'hiring' | 'collaboration' | 'tech_chat' | 'just_hi';

export default function ContactWizardModal({ isOpen, onClose }: ContactWizardModalProps) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [topic, setTopic] = useState<TopicType>('hiring');
    const [email, setEmail] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [copied, setCopied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [countdown, setCountdown] = useState(5);

    const modalRef = useRef<HTMLDivElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const companyInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        onClose();
        // Reset state after transition finishes (e.g. 300ms)
        setTimeout(() => {
            setStep(1);
            setName('');
            setCompany('');
            setTopic('hiring');
            setEmail('');
            setCustomMessage('');
            setSubmitError('');
        }, 300);
    };

    // Escape key listener to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            // Auto focus name input on open after a short delay
            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 100);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle automatic close and countdown timer after success (step 6)
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let intervalId: NodeJS.Timeout;
        
        if (step === 6 && isOpen) {
            setCountdown(5); // Reset countdown to 5
            
            intervalId = setInterval(() => {
                setCountdown((prev) => Math.max(0, prev - 1));
            }, 1000);
            
            timeoutId = setTimeout(() => {
                handleClose();
            }, 5000);
        }
        
        return () => {
            if (intervalId) clearInterval(intervalId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [step, isOpen]);

    // Handle focus when step changes
    useEffect(() => {
        if (step === 1) {
            nameInputRef.current?.focus();
        } else if (step === 2) {
            companyInputRef.current?.focus();
        } else if (step === 4) {
            emailInputRef.current?.focus();
        }
    }, [step]);

    // Generate message templates based on selections
    useEffect(() => {
        const companyStr = company ? ` at ${company}` : '';
        let template = '';

        switch (topic) {
            case 'hiring':
                template = `Hi Anshul,\n\nI'm ${name || 'Recruiter'}${companyStr}. I came across your portfolio and was impressed by your backend engineering stack—especially your work with Node.js, Redis, MongoDB, and Docker.\n\nWe have an open role that aligns perfectly with your skills. Let's schedule a brief call to discuss this opportunity further.\n\nBest regards,\n${name || 'Best regards'}`;
                break;
            case 'collaboration':
                template = `Hi Anshul,\n\nI'm ${name || 'there'}${companyStr}. I saw your projects like Dev Tinder and Xdrop. I'm currently working on a backend system and would love to collaborate or exchange ideas with you on scalability and system design.\n\nLet me know if you'd be open to a chat!\n\nBest,\n${name || 'Best'}`;
                break;
            case 'tech_chat':
                template = `Hi Anshul,\n\nI'm ${name || 'there'}. I'm also into backend systems, Express, databases, and microservices. I really liked your interactive guestbook terminal and wanted to connect to talk about system architecture, performance optimization, and Kafka.\n\nCheers,\n${name || 'Cheers'}`;
                break;
            case 'just_hi':
                template = `Hi Anshul,\n\nMy name is ${name || 'Guest'}${companyStr}. Just stopped by your portfolio and wanted to reach out to say you've built an awesome site! The animations and the terminal are exceptionally clean.\n\nLet's stay connected on LinkedIn!\n\nBest,\n${name || 'Best'}`;
                break;
        }
        setCustomMessage(template);
    }, [name, company, topic, step]);

    if (!isOpen) return null;

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const isEmailValid = (val: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(customMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text', err);
        }
    };

    const handleSendEmailBackup = () => {
        const subject = encodeURIComponent(`Let's Collaborate - ${name || 'Recruiter'} from ${company || 'Portfolio'}`);
        const body = encodeURIComponent(customMessage);
        window.open(`mailto:anshul41171@gmail.com?subject=${subject}&body=${body}`, '_blank');
    };

    const handleSubmitMessage = async () => {
        setSubmitting(true);
        setSubmitError('');

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    company,
                    email,
                    topic,
                    message: customMessage
                })
            });

            const data = await res.json();

            if (data.success) {
                setStep(6); // Go to Success Screen
            } else {
                setSubmitError(data.error || 'Failed to save message in database.');
            }
        } catch (err) {
            console.error(err);
            setSubmitError('Connection error. Could not connect to API server.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleGuestbookRedirect = () => {
        handleClose();
        const element = document.getElementById('terminal-guestbook');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const terminalInput = document.querySelector('#terminal-guestbook input') as HTMLInputElement;
                terminalInput?.focus();
            }, 800);
        }
    };

    const topicsList = [
        { id: 'hiring', label: 'Hiring for a Role', icon: Briefcase, color: 'text-primary' },
        { id: 'collaboration', label: 'Project Collaboration', icon: Code, color: 'text-secondary' },
        { id: 'tech_chat', label: 'Technical Chat', icon: Sparkles, color: 'text-purple-400' },
        { id: 'just_hi', label: 'Just Saying Hi!', icon: MessageSquare, color: 'text-orange-400' }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
            {/* Modal Box */}
            <div 
                ref={modalRef}
                className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Visual glow indicator */}
                <div className="h-[4px] w-full bg-gradient-to-r from-primary via-secondary to-primary-hover"></div>

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-neutral-800 bg-neutral-950/40">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <h3 className="font-anton uppercase tracking-wider text-lg text-foreground">
                            Let&apos;s Talk Wizard
                        </h3>
                    </div>
                    <button 
                        onClick={handleClose}
                        disabled={submitting}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-neutral-800 disabled:opacity-40"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-neutral-800 h-1">
                    <div 
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${(step / 6) * 100}%` }}
                    />
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 flex-grow overflow-y-auto custom-scrollbar flex flex-col justify-center">
                    
                    {/* Step 1: Name */}
                    {step === 1 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-200">
                            <div className="flex items-center gap-3 text-primary mb-2">
                                <User className="w-5 h-5" />
                                <span className="text-xs font-mono uppercase tracking-widest">Step 01 / 06</span>
                            </div>
                            <h4 className="text-2xl font-bold font-anton uppercase tracking-wide">
                                What is your name?
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Let me know who is reaching out!
                            </p>
                            <input 
                                ref={nameInputRef}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && name.trim() && handleNext()}
                                placeholder="Your name (e.g. John Doe)"
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-primary rounded-xl px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground"
                            />
                        </div>
                    )}

                    {/* Step 2: Company */}
                    {step === 2 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-200">
                            <div className="flex items-center gap-3 text-primary mb-2">
                                <Building className="w-5 h-5" />
                                <span className="text-xs font-mono uppercase tracking-widest">Step 02 / 06</span>
                            </div>
                            <h4 className="text-2xl font-bold font-anton uppercase tracking-wide">
                                Which company or brand are you representing?
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Leave blank if this is a personal inquiry.
                            </p>
                            <input 
                                ref={companyInputRef}
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                placeholder="Company name (e.g. Google, Startup)"
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-primary rounded-xl px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground"
                            />
                        </div>
                    )}

                    {/* Step 3: Purpose */}
                    {step === 3 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-200">
                            <div className="flex items-center gap-3 text-primary mb-2">
                                <Sparkles className="w-5 h-5" />
                                <span className="text-xs font-mono uppercase tracking-widest">Step 03 / 06</span>
                            </div>
                            <h4 className="text-2xl font-bold font-anton uppercase tracking-wide">
                                What is the purpose of your message?
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Select a topic to auto-generate a baseline message structure.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                {topicsList.map((t) => {
                                    const Icon = t.icon;
                                    const isSelected = topic === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => setTopic(t.id as TopicType)}
                                            className={`p-4 rounded-xl border flex flex-col items-start gap-3 text-left transition-all duration-300 hover:scale-[1.02] ${
                                                isSelected 
                                                    ? 'bg-neutral-800 border-primary shadow-[0_0_15px_-3px_rgba(34,197,94,0.3)]' 
                                                    : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                                            }`}
                                        >
                                            <Icon className={`w-5 h-5 ${t.color}`} />
                                            <span className="font-semibold text-sm">{t.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Sender's Email */}
                    {step === 4 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-200">
                            <div className="flex items-center gap-3 text-primary mb-2">
                                <Mail className="w-5 h-5" />
                                <span className="text-xs font-mono uppercase tracking-widest">Step 04 / 06</span>
                            </div>
                            <h4 className="text-2xl font-bold font-anton uppercase tracking-wide">
                                What is your email address?
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                I need this to write back to you!
                            </p>
                            <input 
                                ref={emailInputRef}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && isEmailValid(email) && handleNext()}
                                placeholder="name@company.com"
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-primary rounded-xl px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground"
                            />
                        </div>
                    )}

                    {/* Step 5: Review & Edit */}
                    {step === 5 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200 flex-grow flex flex-col justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-primary">
                                    <Terminal className="w-5 h-5" />
                                    <span className="text-xs font-mono uppercase tracking-widest">Step 05 / 06</span>
                                </div>
                                <h4 className="text-xl font-bold font-anton uppercase tracking-wide">
                                    Review and Edit your Message
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Feel free to modify the pre-written email payload before sending.
                                </p>
                            </div>
                            <textarea
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                className="w-full flex-grow min-h-[160px] md:min-h-[200px] bg-neutral-950 border border-neutral-800 focus:border-primary rounded-xl p-4 text-foreground text-sm outline-none transition-colors resize-none font-sans leading-relaxed custom-scrollbar mt-3"
                                placeholder="Type your custom message..."
                                disabled={submitting}
                            />
                            {submitError && (
                                <div className="flex items-center gap-2 p-3 bg-red-950/20 border border-red-950 rounded-xl text-xs text-red-400 font-mono">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{submitError}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 6: Success screen */}
                    {step === 6 && (
                        <div className="space-y-6 text-center animate-in scale-in duration-300 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center animate-bounce">
                                <Check className="w-8 h-8" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-mono text-primary uppercase tracking-widest">Step 06 / 06</span>
                                <h4 className="text-2xl font-bold font-anton uppercase tracking-wide">
                                    Message Submitted!
                                </h4>
                                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                                    Your message has been stored successfully. This window will close automatically in <span className="text-primary font-mono font-bold">{countdown}s</span>.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
                                <button
                                    onClick={handleSendEmailBackup}
                                    className="w-full h-12 bg-primary text-primary-foreground font-anton tracking-widest uppercase hover:bg-primary-hover flex items-center justify-center gap-2 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-primary/20"
                                >
                                    <Mail className="w-4 h-4" />
                                    Send Email Copy
                                </button>
                                
                                <button
                                    onClick={handleCopy}
                                    className="w-full h-12 bg-neutral-800 border border-neutral-700 text-foreground font-anton tracking-widest uppercase hover:bg-neutral-700 flex items-center justify-center gap-2 rounded-xl transition-all duration-300 active:scale-95"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4 text-primary animate-in zoom-in" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copy message body
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleGuestbookRedirect}
                                    className="w-full py-2.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1.5 mt-2"
                                >
                                    <Terminal className="w-3.5 h-3.5" />
                                    Or leave a terminal guestbook note
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center px-6 py-4 border-t border-neutral-800 bg-neutral-950/20">
                    <div>
                        {step > 1 && step < 6 && (
                            <button
                                onClick={handleBack}
                                disabled={submitting}
                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground font-mono transition-colors disabled:opacity-40"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                        )}
                    </div>
                    <div>
                        {step < 5 && (
                            <button
                                onClick={handleNext}
                                disabled={
                                    (step === 1 && !name.trim()) ||
                                    (step === 4 && !isEmailValid(email))
                                }
                                className={`flex items-center gap-1.5 text-sm font-mono transition-colors ${
                                    ((step === 1 && !name.trim()) || (step === 4 && !isEmailValid(email))) 
                                        ? 'text-neutral-600 cursor-not-allowed' 
                                        : 'text-primary hover:text-primary-hover font-bold'
                                }`}
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                        {step === 5 && (
                            <button
                                onClick={handleSubmitMessage}
                                disabled={submitting || !customMessage.trim()}
                                className="flex items-center gap-1.5 text-sm font-mono text-primary hover:text-primary-hover font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-primary mr-1" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        Submit Message
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
