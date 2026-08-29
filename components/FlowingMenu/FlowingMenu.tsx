import React, { useRef, useEffect, useState, MouseEvent } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import TransitionLink from '@/components/TransitionLink';
import './FlowingMenu.css';

export interface FlowingMenuItem {
    link: string;
    text: string;
    image: string;
    year?: string | number;
    techStack?: string[];
    index?: number;
    slug?: string;
}

export interface FlowingMenuProps {
    items?: FlowingMenuItem[];
    speed?: number;
    textColor?: string;
    bgColor?: string;
    marqueeBgColor?: string;
    marqueeTextColor?: string;
    borderColor?: string;
}

function MenuItem({
    link,
    text,
    image,
    year,
    techStack = [],
    index,
    speed = 15,
    textColor = 'var(--foreground)',
    marqueeBgColor = '#22c55e',
    marqueeTextColor = '#0a0a0a',
    borderColor = 'var(--border)',
}: FlowingMenuItem & {
    speed?: number;
    textColor?: string;
    marqueeBgColor?: string;
    marqueeTextColor?: string;
    borderColor?: string;
}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Animation | null>(null);
    const [repetitions, setRepetitions] = useState<number>(4);

    const animationDefaults = { duration: 0.6, ease: 'expo.out' };

    const distMetric = (x: number, y: number, x2: number, y2: number) => {
        const xDiff = x - x2;
        const yDiff = y - y2;
        return xDiff * xDiff + yDiff * yDiff;
    };

    const findClosestEdge = (
        mouseX: number,
        mouseY: number,
        width: number,
        height: number,
    ): 'top' | 'bottom' => {
        const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
        const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    useEffect(() => {
        const calculateRepetitions = () => {
            if (!marqueeInnerRef.current) return;

            const marqueeContent = marqueeInnerRef.current.querySelector(
                '.marquee__part',
            ) as HTMLElement;
            if (!marqueeContent) return;

            const contentWidth = marqueeContent.offsetWidth;
            const viewportWidth = window.innerWidth;

            const needed = Math.ceil(viewportWidth / (contentWidth || 1)) + 2;
            setRepetitions(Math.max(4, needed));
        };

        calculateRepetitions();
        window.addEventListener('resize', calculateRepetitions);
        return () => window.removeEventListener('resize', calculateRepetitions);
    }, [text, image]);

    useEffect(() => {
        const setupMarquee = () => {
            if (!marqueeInnerRef.current) return;

            const marqueeContent = marqueeInnerRef.current.querySelector(
                '.marquee__part',
            ) as HTMLElement;
            if (!marqueeContent) return;

            const contentWidth = marqueeContent.offsetWidth;
            if (contentWidth === 0) return;

            if (animationRef.current) {
                animationRef.current.kill();
            }

            animationRef.current = gsap.to(marqueeInnerRef.current, {
                x: -contentWidth,
                duration: speed,
                ease: 'none',
                repeat: -1,
            });
        };

        const timer = setTimeout(setupMarquee, 50);

        return () => {
            clearTimeout(timer);
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [text, image, repetitions, speed]);

    const handleMouseEnter = (ev: MouseEvent<HTMLAnchorElement>) => {
        if (
            !itemRef.current ||
            !marqueeRef.current ||
            !marqueeInnerRef.current
        )
            return;
        const rect = itemRef.current.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const edge = findClosestEdge(x, y, rect.width, rect.height);

        gsap.timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(
                marqueeInnerRef.current,
                { y: edge === 'top' ? '101%' : '-101%' },
                0,
            )
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    };

    const handleMouseLeave = (ev: MouseEvent<HTMLAnchorElement>) => {
        if (
            !itemRef.current ||
            !marqueeRef.current ||
            !marqueeInnerRef.current
        )
            return;
        const rect = itemRef.current.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const edge = findClosestEdge(x, y, rect.width, rect.height);

        gsap.timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(
                marqueeInnerRef.current,
                { y: edge === 'top' ? '101%' : '-101%' },
                0,
            );
    };

    return (
        <div className="menu__item" ref={itemRef} style={{ borderColor }}>
            <TransitionLink
                className="menu__item-link group"
                href={link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ color: textColor }}
            >
                <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-6">
                        {index !== undefined && (
                            <span className="font-anton text-muted-foreground text-base sm:text-2xl">
                                _{index.toString().padStart(2, '0')}.
                            </span>
                        )}
                        <div>
                            <h3 className="text-2xl sm:text-4xl md:text-6xl font-anton tracking-wide transition-colors group-hover:text-primary">
                                {text}
                            </h3>
                            {techStack.length > 0 && (
                                <div className="mt-1 sm:mt-2 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted-foreground font-roboto-flex">
                                    {techStack.slice(0, 3).map((tech, idx) => (
                                        <span key={tech}>
                                            {tech}
                                            {idx < Math.min(techStack.length, 3) - 1 && ' • '}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {year && (
                        <span className="text-xs sm:text-base font-anton text-muted-foreground">
                            {year}
                        </span>
                    )}
                </div>

                {/* Mobile Preview Image (shown on touch/small screens) */}
                <div className="md:hidden mt-3 w-full aspect-[16/10] bg-background-light/50 border border-border rounded-lg p-2 overflow-hidden flex items-center justify-center">
                    <Image
                        src={image}
                        alt={`${text} preview`}
                        width={480}
                        height={300}
                        className="w-full h-full object-contain rounded-md"
                        loading="lazy"
                    />
                </div>
            </TransitionLink>

            <div
                className="marquee"
                ref={marqueeRef}
                style={{ backgroundColor: marqueeBgColor }}
            >
                <div className="marquee__inner-wrap">
                    <div
                        className="marquee__inner"
                        ref={marqueeInnerRef}
                        aria-hidden="true"
                    >
                        {[...Array(repetitions)].map((_, idx) => (
                            <div
                                className="marquee__part"
                                key={idx}
                                style={{ color: marqueeTextColor }}
                            >
                                <span className="text-2xl sm:text-4xl md:text-5xl">
                                    {text}
                                </span>
                                <div
                                    className="marquee__img"
                                    style={{ backgroundImage: `url(${image})` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FlowingMenu({
    items = [],
    speed = 15,
    textColor = 'var(--foreground)',
    bgColor = 'transparent',
    marqueeBgColor = '#22c55e',
    marqueeTextColor = '#0a0a0a',
    borderColor = 'transparent',
}: FlowingMenuProps) {
    return (
        <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
            <nav className="menu">
                {items.map((item, idx) => (
                    <MenuItem
                        key={item.link || idx}
                        {...item}
                        speed={speed}
                        textColor={textColor}
                        marqueeBgColor={marqueeBgColor}
                        marqueeTextColor={marqueeTextColor}
                        borderColor={borderColor}
                    />
                ))}
            </nav>
        </div>
    );
}
