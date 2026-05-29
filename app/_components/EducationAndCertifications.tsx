'use client';
import SectionTitle from '@/components/SectionTitle';
import { EDUCATION, CERTIFICATIONS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EducationAndCertifications = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    end: 'bottom 75%',
                    scrub: 1,
                },
            });

            tl.from('.edu-cert-col', {
                y: 50,
                opacity: 0,
                stagger: 0.2,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 60%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-section" id="education-certifications">
            <div className="container" ref={containerRef}>
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Education Column */}
                    <div className="edu-cert-col">
                        <SectionTitle title="Education" />
                        <div className="space-y-10">
                            {EDUCATION.map((item) => (
                                <div key={item.degree} className="group">
                                    <p className="text-xl text-muted-foreground">
                                        {item.institution}
                                    </p>
                                    <p className="text-3xl sm:text-4xl font-anton leading-snug mt-2 mb-2">
                                        {item.degree}
                                    </p>
                                    <p className="text-lg text-primary">
                                        {item.duration}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div className="edu-cert-col">
                        <SectionTitle title="Certifications" />
                        <div className="space-y-10">
                            {CERTIFICATIONS.map((item) => {
                                const Content = (
                                    <div className="group cursor-pointer">
                                        <p className="text-xl text-muted-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                                            {item.issuer}
                                            {item.link && (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                                    <polyline points="15 3 21 3 21 9"/>
                                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                                </svg>
                                            )}
                                        </p>
                                        <p className="text-3xl sm:text-4xl font-anton leading-snug mt-2 mb-2 group-hover:text-primary transition-colors duration-300">
                                            {item.title}
                                        </p>
                                    </div>
                                );

                                return item.link ? (
                                    <a
                                        key={item.title}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block focus:outline-none"
                                    >
                                        {Content}
                                    </a>
                                ) : (
                                    <div key={item.title}>
                                        {Content}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationAndCertifications;
