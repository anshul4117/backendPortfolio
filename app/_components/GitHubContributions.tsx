'use client';
import SectionTitle from '@/components/SectionTitle';
import FireIcon from '@/components/icons/FireIcon';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const GitHubCalendar = dynamic(
    () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
    { ssr: false }
);

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Calculate the maximum contribution streak from the contribution data.
 * A streak is consecutive days with count > 0.
 */
function calculateMaxStreak(contributions: { date: string; count: number }[]): number {
    if (!contributions || contributions.length === 0) return 0;

    // Sort by date ascending
    const sorted = [...contributions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let maxStreak = 0;
    let currentStreak = 0;

    for (const day of sorted) {
        if (day.count > 0) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    }

    return maxStreak;
}

const GitHubContributions = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [userStats, setUserStats] = useState<any>(null);
    const [languages, setLanguages] = useState<any[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [loading, setLoading] = useState(true);

    // LeetCode State
    const [leetcodeStats, setLeetcodeStats] = useState<any>(null);
    const [leetcodeLoading, setLeetcodeLoading] = useState(true);

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

                // Fetch contribution data for max streak calculation
                const contribRes = await fetch(
                    'https://github-contributions-api.jogruber.de/v4/anshul4117?y=last'
                );
                if (contribRes.ok) {
                    const contribData = await contribRes.json();
                    if (contribData.contributions) {
                        const streak = calculateMaxStreak(contribData.contributions);
                        setMaxStreak(streak);
                    }
                }
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchLeetcodeData = async () => {
            try {
                const res = await fetch('/api/leetcode');
                if (res.ok) {
                    const data = await res.json();
                    setLeetcodeStats(data);
                }
            } catch (error) {
                console.error('Error fetching LeetCode data:', error);
            } finally {
                setLeetcodeLoading(false);
            }
        };

        fetchGitHubData();
        fetchLeetcodeData();
    }, []);

    // Custom theme for the GitHub Calendar to match the website green
    const greenTheme = {
        light: ['#1e1e1e', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section className="py-section" id="github-activity">
            <div className="container" ref={containerRef}>
                <SectionTitle title="GitHub & LeetCode Stats" />

                <div className="space-y-10">
                    {/* Interactive Calendar Card */}
                    <div className="github-item bg-background-light border border-border p-8 rounded-xl flex flex-col items-center">
                        <div className="w-full flex items-center justify-between mb-6 flex-wrap gap-4">
                            <p className="text-xl font-anton uppercase tracking-wider text-muted-foreground">
                                Contribution Calendar
                            </p>
                            {/* Max Streak Badge */}
                            {!loading && maxStreak > 0 && (
                                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-full px-4 py-2 streak-badge">
                                    <FireIcon size={28} />
                                    <div className="flex flex-col leading-none">
                                        <span className="text-xs uppercase tracking-wider text-orange-400/80 font-medium">
                                            Max Streak
                                        </span>
                                        <span className="text-xl font-anton text-orange-400 leading-tight">
                                            {maxStreak} <span className="text-sm font-roboto-flex font-normal text-orange-400/70">days</span>
                                        </span>
                                    </div>
                                </div>
                            )}
                            {loading && (
                                <div className="h-12 w-36 bg-border rounded-full animate-pulse"></div>
                            )}
                        </div>
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

                    {/* Stats, Languages & LeetCode cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Profile Stats Card */}
                        <div className="github-item bg-background-light border border-border p-8 rounded-xl flex flex-col justify-between min-h-[340px]">
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
                                            <p className="text-xs uppercase text-muted-foreground tracking-wider">Total Stars</p>
                                            <p className="text-3xl font-anton text-primary mt-1">{totalStars}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">Unable to load stats.</p>
                                )}
                            </div>
                            {userStats && (
                                <div className="mt-8 pt-4 border-t border-border flex items-center gap-3">
                                    <Image
                                        src={userStats.avatar_url}
                                        alt="GitHub Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full border border-primary"
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
                        <div className="github-item bg-background-light border border-border p-8 rounded-xl flex flex-col min-h-[340px]">
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
                                            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
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

                        {/* LeetCode Stats Card */}
                        <div className="github-item bg-background-light border border-border p-8 rounded-xl flex flex-col justify-between min-h-[340px]">
                            <div>
                                <p className="text-xl font-anton uppercase tracking-wider mb-6 text-muted-foreground">
                                    LeetCode Stats
                                </p>
                                {leetcodeLoading ? (
                                    <div className="space-y-4 animate-pulse">
                                        <div className="h-6 bg-border rounded w-3/4"></div>
                                        <div className="h-6 bg-border rounded w-1/2"></div>
                                        <div className="h-6 bg-border rounded w-2/3"></div>
                                    </div>
                                ) : leetcodeStats ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-xs uppercase text-muted-foreground tracking-wider">Total Solved</p>
                                                <p className="text-3xl font-anton text-yellow-500 mt-1">
                                                    {leetcodeStats.totalSolved} <span className="text-sm font-normal text-muted-foreground">/ {leetcodeStats.totalQuestions}</span>
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs uppercase text-muted-foreground tracking-wider">Global Rank</p>
                                                <p className="text-xl font-anton text-foreground mt-1">
                                                    {leetcodeStats.ranking?.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Easy / Medium / Hard Progress bars */}
                                        <div className="space-y-3 pt-2">
                                            {/* Easy */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs font-semibold">
                                                    <span className="text-green-500 uppercase">Easy</span>
                                                    <span>{leetcodeStats.easySolved} / {leetcodeStats.totalEasy}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-500"
                                                        style={{ width: `${(leetcodeStats.easySolved / leetcodeStats.totalEasy) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Medium */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs font-semibold">
                                                    <span className="text-yellow-500 uppercase">Medium</span>
                                                    <span>{leetcodeStats.mediumSolved} / {leetcodeStats.totalMedium}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-yellow-500"
                                                        style={{ width: `${(leetcodeStats.mediumSolved / leetcodeStats.totalMedium) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Hard */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs font-semibold">
                                                    <span className="text-red-500 uppercase">Hard</span>
                                                    <span>{leetcodeStats.hardSolved} / {leetcodeStats.totalHard}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-red-500"
                                                        style={{ width: `${(leetcodeStats.hardSolved / leetcodeStats.totalHard) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">Unable to load LeetCode stats.</p>
                                )}
                            </div>

                            {leetcodeStats && (
                                <div className="mt-8 pt-4 border-t border-border flex items-center gap-3">
                                    <div className="size-10 rounded-full border border-yellow-500 flex items-center justify-center bg-yellow-500/10">
                                        {/* Stylized LeetCode Icon */}
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-yellow-500" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a1.38 1.38 0 0 0 0 1.95l1.95 1.95a1.38 1.38 0 0 0 1.951 0l7.827-7.828a.426.426 0 0 1 .602 0l1.95 1.95a.426.426 0 0 1 0 .602L9.4 16.637a1.38 1.38 0 0 0 0 1.95l1.95 1.95a1.38 1.38 0 0 0 1.951 0l9.777-9.778a1.378 1.378 0 0 0 0-1.95l-7.827-7.828A1.378 1.378 0 0 0 13.483 0zm-8.4 11.536a.2.2 0 0 0-.142-.059.2.2 0 0 0-.142.059l-1.95 1.95a.2.2 0 0 0 0 .283l7.828 7.828a1.38 1.38 0 0 0 1.95 0l1.95-1.95a.2.2 0 0 0 0-.283l-7.828-7.828a.2.2 0 0 0-.142-.059z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground leading-none">LeetCode Profile</p>
                                        <a
                                            href="https://leetcode.com/u/Anshul101/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-yellow-500 hover:underline leading-normal flex items-center gap-1 mt-1"
                                        >
                                            @Anshul101
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                                <polyline points="15 3 21 3 21 9"/>
                                                <line x1="10" y1="14" x2="21" y2="3"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GitHubContributions;
