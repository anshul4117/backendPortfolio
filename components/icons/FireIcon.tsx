'use client';

import React from 'react';

interface FireIconProps {
    size?: number;
    className?: string;
}

const FireIcon: React.FC<FireIconProps> = ({ size = 40, className = '' }) => {
    return (
        <div className={`inline-flex items-center justify-center cursor-pointer ${className} fire-container`}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
                aria-hidden="true"
            >
                <defs>
                    {/* Main flame gradient */}
                    <linearGradient id="flameGrad" x1="0.5" y1="1" x2="0.5" y2="0">
                        <stop offset="0%" stopColor="#ff3300" />
                        <stop offset="35%" stopColor="#ff6a00" />
                        <stop offset="65%" stopColor="#ffae00" />
                        <stop offset="100%" stopColor="#ffe066" />
                    </linearGradient>
                    {/* Inner flame gradient */}
                    <linearGradient id="innerFlameGrad" x1="0.5" y1="1" x2="0.5" y2="0">
                        <stop offset="0%" stopColor="#ff5500" />
                        <stop offset="50%" stopColor="#ffcc33" />
                        <stop offset="100%" stopColor="#fff5b8" />
                    </linearGradient>
                    {/* Glow filter */}
                    <filter id="fireGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feFlood floodColor="#ff6a00" floodOpacity="0.5" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g filter="url(#fireGlow)">
                    {/* Spark particles rising */}
                    <circle cx="28" cy="18" r="1.5" fill="#ffe066" className="spark spark-1" />
                    <circle cx="36" cy="14" r="2" fill="#ffae00" className="spark spark-2" />
                    <circle cx="30" cy="8" r="1.2" fill="#ffe066" className="spark spark-3" />
                    <circle cx="22" cy="22" r="1.5" fill="#ff6a00" className="spark spark-4" />

                    {/* Outer flame - main body */}
                    <path
                        d="M32 4 C25 17, 12 23, 12 38 C12 49, 21 58, 32 58 C43 58, 52 49, 52 38 C52 23, 39 17, 32 4Z"
                        fill="url(#flameGrad)"
                        className="animate-flame-outer"
                    />

                    {/* Left flicker */}
                    <path
                        d="M24 14 C19 22, 14 28, 16 39 C17 43, 20 45, 22 43 C24 41, 21 32, 24 14Z"
                        fill="url(#flameGrad)"
                        opacity="0.75"
                        className="animate-flame-left"
                    />

                    {/* Right flicker */}
                    <path
                        d="M40 14 C45 22, 50 28, 48 39 C47 43, 44 45, 42 43 C40 41, 43 32, 40 14Z"
                        fill="url(#flameGrad)"
                        opacity="0.75"
                        className="animate-flame-right"
                    />

                    {/* Inner flame - bright core */}
                    <path
                        d="M32 20 C27 29, 20 34, 20 44 C20 51, 25 55, 32 55 C39 55, 44 51, 44 44 C44 34, 37 29, 32 20Z"
                        fill="url(#innerFlameGrad)"
                        className="animate-flame-inner"
                    />

                    {/* Core highlight - hottest part */}
                    <ellipse
                        cx="32"
                        cy="47"
                        rx="5"
                        ry="6"
                        fill="#fff7d6"
                        opacity="0.9"
                        className="animate-flame-core"
                    />
                </g>
            </svg>

            <style dangerouslySetInnerHTML={{ __html: `
                .fire-container:hover .animate-flame-outer {
                    animation-duration: 0.4s;
                }
                .fire-container:hover .animate-flame-inner {
                    animation-duration: 0.3s;
                }
                .fire-container:hover .spark {
                    animation-duration: 0.6s;
                }
                
                .animate-flame-outer {
                    transform-origin: 32px 58px;
                    animation: flameOuter 0.7s ease-in-out infinite alternate;
                }
                .animate-flame-inner {
                    transform-origin: 32px 55px;
                    animation: flameInner 0.5s ease-in-out infinite alternate;
                }
                .animate-flame-left {
                    transform-origin: 20px 43px;
                    animation: flameLeft 0.8s ease-in-out infinite alternate;
                }
                .animate-flame-right {
                    transform-origin: 44px 43px;
                    animation: flameRight 0.75s ease-in-out infinite alternate;
                }
                .animate-flame-core {
                    transform-origin: 32px 47px;
                    animation: flameCore 0.4s ease-in-out infinite alternate;
                }

                /* Animated Sparks */
                .spark {
                    animation-iteration-count: infinite;
                    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .spark-1 {
                    animation: sparkUp1 1.2s infinite;
                }
                .spark-2 {
                    animation: sparkUp2 1.5s infinite 0.3s;
                }
                .spark-3 {
                    animation: sparkUp3 1.8s infinite 0.6s;
                }
                .spark-4 {
                    animation: sparkUp4 1.4s infinite 0.1s;
                }

                @keyframes flameOuter {
                    0% {
                        transform: scaleX(1) scaleY(1) rotate(0deg);
                    }
                    50% {
                        transform: scaleX(0.95) scaleY(1.03) rotate(1deg);
                    }
                    100% {
                        transform: scaleX(1.02) scaleY(0.97) rotate(-1deg);
                    }
                }
                @keyframes flameInner {
                    0% {
                        transform: scaleX(1) scaleY(1) translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: scaleX(0.92) scaleY(1.05) translateY(-1px) rotate(-1deg);
                    }
                    100% {
                        transform: scaleX(1.04) scaleY(0.94) translateY(0.5px) rotate(1deg);
                    }
                }
                @keyframes flameLeft {
                    0% {
                        transform: scale(1) rotate(0deg);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1.12) rotate(-5deg);
                        opacity: 0.4;
                    }
                }
                @keyframes flameRight {
                    0% {
                        transform: scale(1) rotate(0deg);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1.12) rotate(5deg);
                        opacity: 0.4;
                    }
                }
                @keyframes flameCore {
                    0% {
                        transform: scale(1);
                        opacity: 0.9;
                    }
                    100% {
                        transform: scale(0.9);
                        opacity: 0.7;
                    }
                }

                @keyframes sparkUp1 {
                    0% {
                        transform: translate(0, 20px) scale(1);
                        opacity: 1;
                    }
                    80% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(-10px, -25px) scale(0.2);
                        opacity: 0;
                    }
                }
                @keyframes sparkUp2 {
                    0% {
                        transform: translate(0, 25px) scale(1);
                        opacity: 1;
                    }
                    70% {
                        opacity: 0.9;
                    }
                    100% {
                        transform: translate(8px, -30px) scale(0.1);
                        opacity: 0;
                    }
                }
                @keyframes sparkUp3 {
                    0% {
                        transform: translate(0, 30px) scale(1);
                        opacity: 1;
                    }
                    80% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(-4px, -35px) scale(0.3);
                        opacity: 0;
                    }
                }
                @keyframes sparkUp4 {
                    0% {
                        transform: translate(0, 15px) scale(1);
                        opacity: 1;
                    }
                    60% {
                        opacity: 0.9;
                    }
                    100% {
                        transform: translate(-12px, -20px) scale(0.2);
                        opacity: 0;
                    }
                }
            ` }} />
        </div>
    );
};

export default FireIcon;
