'use client';
import SectionTitle from '@/components/SectionTitle';
import FlowingMenu, { FlowingMenuItem } from '@/components/FlowingMenu/FlowingMenu';
import { PROJECTS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectList = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top 80%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from(containerRef.current, {
                y: 100,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    const flowingItems: FlowingMenuItem[] = PROJECTS.map((project, idx) => ({
        link: `/projects/${project.slug}`,
        text: project.title,
        image: project.thumbnail,
        year: project.year,
        techStack: project.techStack,
        index: idx + 1,
        slug: project.slug,
    }));

    return (
        <section className="pb-section" id="selected-projects">
            <div className="container">
                <SectionTitle title="SELECTED PROJECTS" />

                <div
                    ref={containerRef}
                    className="w-full overflow-hidden bg-transparent"
                >
                    <FlowingMenu
                        items={flowingItems}
                        speed={14}
                        textColor="var(--foreground)"
                        bgColor="transparent"
                        marqueeBgColor="#22c55e"
                        marqueeTextColor="#0a0a0a"
                        borderColor="transparent"
                    />
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
