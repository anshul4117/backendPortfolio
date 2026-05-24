'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power1.inOut',
                },
            });

            tl.to('.name-text span', {
                y: 0,
                stagger: 0.05,
                duration: 0.2,
            });

            tl.to('.role-text span', {
                y: 0,
                duration: 0.3,
            }, '-=0.1');

            tl.to('.preloader-item', {
                delay: 1,
                y: '100%',
                duration: 0.5,
                stagger: 0.1,
            })
                .to('.name-text span, .role-text span', { autoAlpha: 0 }, '<0.5')
                .to(
                    preloaderRef.current,
                    {
                        autoAlpha: 0,
                    },
                    '<1',
                );
        },
        { scope: preloaderRef },
    );

    return (
        <div className="fixed inset-0 z-[6] flex" ref={preloaderRef}>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>

            <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                <p className="name-text flex text-[16vw] lg:text-[180px] font-anton leading-none overflow-hidden justify-center">
                    <span className="inline-block translate-y-full">A</span>
                    <span className="inline-block translate-y-full">N</span>
                    <span className="inline-block translate-y-full">S</span>
                    <span className="inline-block translate-y-full">H</span>
                    <span className="inline-block translate-y-full">U</span>
                    <span className="inline-block translate-y-full">L</span>
                </p>
                <p className="role-text text-sm sm:text-lg tracking-[0.5em] text-primary font-medium uppercase mt-4 overflow-hidden pl-[0.5em]">
                    <span className="inline-block translate-y-full">BACKEND DEVELOPER</span>
                </p>
            </div>
        </div>
    );
};

export default Preloader;
