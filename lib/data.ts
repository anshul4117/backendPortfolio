import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'anshul41171@gmail.com',

    emailSubject: "Let's collaborate on a backend project",
    emailBody: 'Hi Anshul, I am reaching out to you because...',

    oldPortfolio: '',
    upworkProfile: '',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/anshul4117' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/anshul-ab7135245/' },
    { name: 'leetcode', url: 'https://leetcode.com/u/Anshul101/' },
    { name: 'hashnode', url: 'https://hashnode.com/@anshul41171' },
];

export const MY_STACK = {
    languages: [
        {
            name: 'C',
            icon: '/logo/c.svg',
        },
        {
            name: 'C++',
            icon: '/logo/cpp.svg',
        },
        {
            name: 'Java',
            icon: '/logo/java.svg',
        },
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'Python',
            icon: '/logo/python.svg',
        },
        {
            name: 'SQL',
            icon: '/logo/sql.svg',
        },
    ],
    'technologies & frameworks': [
        {
            name: 'Node.js',
            icon: '/logo/node.svg',
        },
        {
            name: 'React.js',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Redis',
            icon: '/logo/redis.svg',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
        {
            name: 'Socket.io',
            icon: '/logo/socket-io.svg',
        },
        {
            name: 'MCP Server',
            icon: '/logo/mcp.svg',
        },
        {
            name: 'Apache Kafka',
            icon: '/logo/kafka.svg',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    tools: [
        {
            name: 'Git & GitHub',
            icon: '/logo/git.png',
        },
        {
            name: 'Postman',
            icon: '/logo/postman.svg',
        },
        {
            name: 'Redis Insight',
            icon: '/logo/redis-insight.svg',
        },
        {
            name: 'MS SQL Server',
            icon: '/logo/mssql.svg',
        },
        {
            name: 'VS Code',
            icon: '/logo/vscode.svg',
        },
        {
            name: 'Cursor',
            icon: '/logo/cursor.svg',
        },
        {
            name: 'Antigravity',
            icon: '/logo/antigravity.svg',
        },
        {
            name: 'Claude AI',
            icon: '/logo/claude.svg',
        },
        {
            name: 'Figma',
            icon: '/logo/figma.svg',
        },
        {
            name: 'Stitch AI',
            icon: '/logo/stitch.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Dev Tinder',
        slug: 'dev-tinder',
        liveUrl: 'https://github.com/anshul4117',
        year: 2024,
        description: `
      A full-stack developer networking platform inspired by Tinder, designed to connect developers based on their technical interests, experience level, and collaboration goals. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🔥 Developer Matching: Smart matching system connecting developers with complementary skills.</li>
        <li>👤 Profile Management: Detailed user profiles showcasing bio, experience, and interests.</li>
        <li>💬 Real-Time Interaction: Instant chat for match interactions built with Socket.io.</li>
        <li>🛡️ Secure Authentication: Safe session management using JWT cookies.</li>
      </ul><br/>
      
      Technical Highlights:
      <ul>
        <li>Designed robust database collections and relationships in MongoDB/Mongoose.</li>
        <li>Integrated Redis caching to store session tokens and frequent profile lookups.</li>
        <li>Containerized backend services with Docker to streamline local environment setup.</li>
      </ul>
      `,
        role: `
      Backend & API Developer <br/>
      Engineered the entire backend service:
      <ul>
        <li>✅ API Development: Developed secure REST API endpoints with Express.js.</li>
        <li>✅ Database: Created scalable MongoDB models and queries.</li>
        <li>✅ Caching: Handled caching of critical data points with Redis.</li>
        <li>✅ Real-Time: Set up instant message event loops using Socket.io.</li>
      </ul>
      `,
        techStack: [
            'Node.js',
            'Express.js',
            'React.js',
            'MongoDB',
            'Redis',
            'Socket.io',
            'Docker',
        ],
        thumbnail: '/projects/thumbnail/dev-tinder.png',
        longThumbnail: '/projects/long/dev-tinder.png',
        images: [
            '/projects/images/dev-tinder-1.png',
        ],
    },
    {
        title: 'MyBlog Application',
        slug: 'my-blog',
        liveUrl: 'https://github.com/anshul4117',
        year: 2024,
        description: `
      A scalable blogging platform that enables users to create, manage, and explore articles with secure authentication and optimized performance. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🔑 Role-based Management: Admin & User levels to manage and publish posts.</li>
        <li>⚡ Redis Caching: Speed up reads for articles, reducing DB query overhead.</li>
        <li>🔒 Secure Access: Secure signup/login utilizing JWT auth and bcrypt hashing.</li>
        <li>📱 Responsive UI: Highly responsive interface designed for all screens.</li>
      </ul><br/>
      
      Technical Highlights:
      <ul>
        <li>Implemented Redis-based cache invalidation to maintain post consistency.</li>
        <li>Optimized database operations and queries for efficient article listing.</li>
        <li>Built out clean user profiles and modern design layouts in React.</li>
      </ul>
      `,
        role: `
      Backend Developer <br/>
      Owned end-to-end design and code:
      <ul>
        <li>✅ Server-side: Set up Express and database integrations.</li>
        <li>✅ Caching: Built cache-aside pattern with Redis.</li>
        <li>✅ Frontend: Coded responsive pages using React.js.</li>
      </ul>
      `,
        techStack: [
            'Node.js',
            'Express.js',
            'React.js',
            'MongoDB',
            'Redis',
            'CSS',
        ],
        thumbnail: '/projects/thumbnail/my-blog.png',
        longThumbnail: '/projects/long/my-blog.png',
        images: [
            '/projects/images/my-blog-1.png',
        ],
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'NodeJS Developer Intern',
        company: 'ESSENTIAL SOFT TECH, Meerut',
        duration: 'Feb 2024 – Apr 2024',
        description: [
            'Developed and debugged backend core services using Node.js, MongoDB, Redis, Docker, and AWS',
            'Built user and company management APIs with CRUD operations using Express.js and Socket.io',
            'Worked on scalable backend architecture and real-time communication features',
        ],
    },
    {
        title: 'Backend Developer Intern',
        company: 'AP Mobility India Pvt Ltd, Meerut',
        duration: 'Feb 2024 – Apr 2024',
        description: [
            'Gained hands-on experience in backend development, API design, and database management',
            'Developed scalable backend applications using Express.js, MongoDB, and Redis',
            'Collaborated with frontend developers to integrate user-facing components with backend services',
        ],
    },
];

export const EDUCATION = [
    {
        degree: 'Master of Computer Applications (MCA)',
        institution: 'Meerut Institute of Engineering and Technology',
        duration: '2025 – Present',
    },
    {
        degree: 'Bachelor of Computer Applications (BCA)',
        institution: 'IIMT University, Meerut',
        duration: '2021 – 2024',
    },
];

export const CERTIFICATIONS = [
    {
        title: 'Build Real World AI Applications with Gemini and Imagen',
        issuer: 'Google Cloud',
    },
    {
        title: 'AI Impact Summit Buildathon',
        issuer: 'GUVI & HCL',
    },
    {
        title: 'GDG Cloud New Delhi HackFest 2.0',
        issuer: 'GDG New Delhi',
    },
];
