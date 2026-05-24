import { GENERAL_INFO } from '@/lib/data';
import { GitFork, Star } from 'lucide-react';

interface RepoStats {
    stargazers_count: number;
    forks_count: number;
}

const Footer = async () => {
    let stargazers_count = 0;
    let forks_count = 0;

    try {
        const repoStats = await fetch(
            'https://api.github.com/repos/anshul4117/backendPortfolio',
            {
                next: {
                    revalidate: 60 * 60, // 1 hour
                },
            },
        );
        if (repoStats.ok) {
            const data = await repoStats.json() as RepoStats;
            stargazers_count = data.stargazers_count;
            forks_count = data.forks_count;
        }
    } catch (e) {
        console.error('Failed to fetch repo stats:', e);
    }

    return (
        <footer className="text-center pb-5" id="contact">
            <div className="container">
                <p className="text-lg">Have a project in mind?</p>
                <a
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-10 hover:underline"
                >
                    {GENERAL_INFO.email}
                </a>

                <div className="">
                    <a
                        href="https://github.com/anshul4117/backendPortfolio"
                        target="_blank"
                        className="leading-none text-muted-foreground hover:underline hover:text-white"
                    >
                        Built by Anshul
                        <div className="flex items-center justify-center gap-5 pt-1">
                            <span className="flex items-center gap-2">
                                <Star size={18} /> {stargazers_count}
                            </span>
                            <span className="flex items-center gap-2">
                                <GitFork size={18} /> {forks_count}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
