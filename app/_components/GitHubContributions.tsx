'use client';
import SectionTitle from '@/components/SectionTitle';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef, useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GitHubContributions = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [userStats, setUserStats] = useState<any>(null);
    const [languages, setLanguages] = useState<any[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [loading, setLoading] = useState(true);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 80%',
                    scrub: 1,
                },
            });

            tl.from('.github-item', {
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

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Fetch user profile stats
                const userRes = await fetch('https://api.github.com/users/anshul4117');
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUserStats(userData);
                }

                // Fetch repositories to calculate stars and top languages
                const reposRes = await fetch('https://api.github.com/users/anshul4117/repos?per_page=100');
                if (reposRes.ok) {
                    const reposData = await reposRes.json();
                    let stars = 0;
                    const langMap: { [key: string]: number } = {};

                    reposData.forEach((repo: any) => {
                        stars += repo.stargazers_count;
                        if (repo.language) {
                            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                        }
                    });

                    setTotalStars(stars);

                    const sortedLangs = Object.entries(langMap)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5);

                    const totalLangsCount = Object.values(langMap).reduce((acc, curr) => acc + curr, 0);
                    const langPercentages = sortedLangs.map(([lang, count]) => ({
                        name: lang,
                        percentage: Math.round((count / totalLangsCount) * 100),
                    }));

                    setLanguages(langPercentages);
                }
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    // Custom theme for the GitHub Calendar to match the website green
    const greenTheme = {
        light: ['#1e1e1e', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section className="py-section" id="github-activity">
            <div className="container" ref={containerRef}>
                <SectionTitle title="GitHub Activity" />

                <div className="space-y-10">
                    {/* Interactive Calendar Card */}
                    <div className="github-item bg-background-light border border-border p-8 rounded-xl flex flex-col items-center">
                        <p className="text-xl font-anton uppercase tracking-wider mb-6 text-muted-foreground self-start">
                            Contribution Calendar
                        </p>
                        <div className="w-full overflow-x-auto py-2 flex justify-center custom-scrollbar">
                            <div className="min-w-[800px] text-foreground flex justify-center">
                                <GitHubCalendar
                                    username="anshul4117"
                                    theme={greenTheme}
                                    colorScheme="dark"
                                    labels={{
                                        totalCount: '{{count}} contributions in the last year',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats & Languages cards */}
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Profile Stats Card */}
                        <div className="github-item bg-background-light border border-border p-8 rounded-xl flex flex-col justify-between min-h-[300px]">
                            <div>
                                <p className="text-xl font-anton uppercase tracking-wider mb-6 text-muted-foreground">
                                    GitHub Profile Stats
                                </p>
                                {loading ? (
                                    <div className="space-y-4 animate-pulse">
                                        <div className="h-6 bg-border rounded w-3/4"></div>
                                        <div className="h-6 bg-border rounded w-1/2"></div>
                                        <div className="h-6 bg-border rounded w-2/3"></div>
                                    </div>
                                ) : userStats ? (
                                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-left">
                                        <div>
                                            <p className="text-xs uppercase text-muted-foreground tracking-wider">Public Repositories</p>
                                            <p className="text-3xl font-anton text-primary mt-1">{userStats.public_repos}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase text-muted-foreground tracking-wider">Followers</p>
                                            <p className="text-3xl font-anton text-primary mt-1">{userStats.followers}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase text-muted-foreground tracking-wider">Following</p>
                                            <p className="text-3xl font-anton text-primary mt-1">{userStats.following}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase text-muted-foreground tracking-wider">Total Repository Stars</p>
                                            <p className="text-3xl font-anton text-primary mt-1">{totalStars}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">Unable to load stats.</p>
                                )}
                            </div>
                            {userStats && (
                                <div className="mt-8 pt-4 border-t border-border flex items-center gap-3">
                                    <img
                                        src={userStats.avatar_url}
                                        alt="GitHub Avatar"
                                        className="w-10 h-10 rounded-full border border-primary"
                                    />
                                    <div>
                                        <p className="font-semibold text-foreground leading-none">{userStats.name || 'Anshul'}</p>
                                        <a
                                            href={userStats.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary hover:underline leading-normal"
                                        >
                                            @{userStats.login}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Top Languages Card */}
                        <div className="github-item bg-background-light border border-border p-8 rounded-xl flex flex-col min-h-[300px]">
                            <p className="text-xl font-anton uppercase tracking-wider mb-6 text-muted-foreground">
                                Top Languages
                            </p>
                            {loading ? (
                                <div className="space-y-4 animate-pulse">
                                    <div className="h-6 bg-border rounded"></div>
                                    <div className="h-6 bg-border rounded"></div>
                                    <div className="h-6 bg-border rounded"></div>
                                </div>
                            ) : languages.length > 0 ? (
                                <div className="space-y-4 flex-grow flex flex-col justify-center">
                                    {languages.map((lang: any) => (
                                        <div key={lang.name} className="space-y-2">
                                            <div className="flex justify-between text-sm uppercase font-semibold tracking-wide">
                                                <span>{lang.name}</span>
                                                <span className="text-primary">{lang.percentage}%</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-background rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${lang.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground m-auto">No language data found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GitHubContributions;
