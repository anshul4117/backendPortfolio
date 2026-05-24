'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 150,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -150,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section className="pb-section" id="about-me">
            <div className="container" ref={container}>
                <h2 className="text-4xl md:text-5xl font-thin mb-20 slide-up-and-fade leading-tight">
                    I build scalable and performance-focused web applications with clean architecture and modern technologies. From developing REST APIs and real-time backend systems to optimizing applications using Redis and Docker, I enjoy creating solutions that deliver seamless user experiences.
                </h2>

                <p className="pb-3 border-b text-muted-foreground slide-up-and-fade">
                    This is me.
                </p>

                <div className="grid md:grid-cols-12 mt-9">
                    <div className="md:col-span-5">
                        <p className="text-5xl slide-up-and-fade">
                            Hi, I&apos;m Anshul.
                        </p>
                    </div>
                    <div className="md:col-span-7">
                        <div className="text-lg text-muted-foreground max-w-[450px]">
                            <p className="slide-up-and-fade">
                                I&apos;m a Backend Developer passionate about building scalable, high-performance, and user-centric web applications. I specialize in backend development with strong experience in Node.js, Express.js, MongoDB, Redis, Docker, and AWS, while also developing responsive frontend applications using React.js.
                            </p>
                            <p className="mt-3 slide-up-and-fade">
                                I have hands-on industry experience through onsite internships where I worked on backend services, API development, database management, and real-time application features. During my internships, I developed and debugged scalable backend systems using Node.js, MongoDB, Redis, Docker, and AWS, while collaborating with frontend teams to integrate seamless user experiences.
                            </p>
                            <p className="mt-3 slide-up-and-fade">
                                Alongside building practical projects, I am deeply focused on learning system design concepts—such as load balancing, database sharding, caching strategies, replication, and distributed message queues like Apache Kafka—to design highly resilient and fault-tolerant architectures.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
