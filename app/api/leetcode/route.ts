import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username') || 'Anshul101';

        const query = `
            query getUserProfile($username: String!) {
                matchedUser(username: $username) {
                    username
                    submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                    }
                    profile {
                        ranking
                    }
                }
                allQuestionsCount {
                    difficulty
                    count
                }
            }
        `;

        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                query,
                variables: { username }
            }),
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: 'Failed to fetch data from LeetCode' },
                { status: response.status }
            );
        }

        const data = await response.json();

        if (!data.data?.matchedUser) {
            return NextResponse.json(
                { success: false, error: 'LeetCode user not found' },
                { status: 404 }
            );
        }

        const acSubmissions = data.data.matchedUser.submitStats?.acSubmissionNum || [];
        const allQuestions = data.data.allQuestionsCount || [];

        const totalSolved = acSubmissions.find((s: any) => s.difficulty === 'All')?.count || 0;
        const easySolved = acSubmissions.find((s: any) => s.difficulty === 'Easy')?.count || 0;
        const mediumSolved = acSubmissions.find((s: any) => s.difficulty === 'Medium')?.count || 0;
        const hardSolved = acSubmissions.find((s: any) => s.difficulty === 'Hard')?.count || 0;

        const totalQuestions = allQuestions.find((q: any) => q.difficulty === 'All')?.count || 0;
        const totalEasy = allQuestions.find((q: any) => q.difficulty === 'Easy')?.count || 0;
        const totalMedium = allQuestions.find((q: any) => q.difficulty === 'Medium')?.count || 0;
        const totalHard = allQuestions.find((q: any) => q.difficulty === 'Hard')?.count || 0;

        const ranking = data.data.matchedUser.profile?.ranking || 0;

        return NextResponse.json({
            status: 'success',
            totalSolved,
            totalQuestions,
            easySolved,
            totalEasy,
            mediumSolved,
            totalMedium,
            hardSolved,
            totalHard,
            ranking
        });
    } catch (error) {
        console.error('LeetCode API route error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
