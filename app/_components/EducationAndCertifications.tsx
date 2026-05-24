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
                            {CERTIFICATIONS.map((item) => (
                                <div key={item.title} className="group">
                                    <p className="text-xl text-muted-foreground">
                                        {item.issuer}
                                    </p>
                                    <p className="text-3xl sm:text-4xl font-anton leading-snug mt-2 mb-2">
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationAndCertifications;
