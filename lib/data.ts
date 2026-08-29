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
        title: 'AI Career Agent',
        slug: 'ai-career-agent',
        sourceCode: 'https://github.com/anshul4117',
        liveUrl: 'https://ai-career-agent-web.vercel.app/',
        year: 2026,
        description: `
      An AI-powered career management platform that brings job opportunities from multiple job boards and company career pages into one unified platform, helping candidates discover relevant jobs, understand their fit, optimize their resumes, and manage applications from a single workspace. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>Unified Job Discovery: Aggregates job opportunities from multiple job sources and company career pages into one platform.</li>
        <li>AI Resume Parsing: Extracts candidate skills, education, experience, and projects from uploaded resumes.</li>
        <li>AI Job Matching: Analyzes candidate profiles against job requirements and provides personalized match insights.</li>
        <li>Skill Gap Analysis: Identifies missing or weak skills based on target job requirements.</li>
        <li>Resume Optimization: Provides ATS-focused keyword and resume improvement suggestions.</li>
        <li>Cover Letter Generator: Generates personalized cover letters based on the candidate profile and target job.</li>
        <li>Application Tracking: Allows candidates to save jobs, track applications, and manage their job-search workflow.</li>
        <li>Resume Management: Supports resume uploads, versions, document details, and resume history.</li>
      </ul><br/>
      
      Technical Highlights:
      <ul>
        <li>Designed a modular full-stack architecture separating frontend features, backend services, data models, and AI workflows.</li>
        <li>Implemented authentication and protected application routes for secure candidate data management.</li>
        <li>Integrated PostgreSQL with Prisma for structured career, resume, job, and application data.</li>
        <li>Designed Redis and BullMQ-based background processing architecture for asynchronous jobs and AI/data processing workflows.</li>
        <li>Built the system to support multiple job sources while keeping source-specific collection logic isolated and extensible.</li>
      </ul>
      `,
        role: `
      Full-Stack & Backend Developer <br/>
      Engineered the platform architecture and core application workflows:
      <ul>
        <li>Platform Architecture: Designed the modular architecture for job discovery, candidate profiles, resumes, applications, and AI features.</li>
        <li>Backend & APIs: Designed REST APIs and backend services for core career-management workflows.</li>
        <li>Database: Designed relational data models for users, profiles, resumes, jobs, and applications using PostgreSQL and Prisma.</li>
        <li>AI Integration: Built AI-powered workflows for resume parsing, job matching, resume optimization, and cover-letter generation.</li>
        <li>Background Processing: Designed asynchronous processing using Redis and BullMQ for long-running tasks.</li>
        <li>Frontend: Built responsive dashboard workflows and interactive career-management interfaces using Next.js, React, and TypeScript.</li>
      </ul>
      `,
        techStack: [
            'Next.js',
            'React.js',
            'TypeScript',
            'Node.js',
            'Express.js',
            'PostgreSQL',
            'Prisma',
            'Redis',
            'BullMQ',
            'Docker',
            'OpenAI',
        ],
        thumbnail: '/projects/images/ai-career-agent.png',
        longThumbnail: '/projects/images/ai-career-agent.png',
        images: [
            '/projects/images/ai-career-agent-1.png',
        ],
    },
    {
        title: 'Xdrop',
        slug: 'xdrop',
        liveUrl: 'https://xdrop.vercel.app/',
        year: 'March 2025 – Present',
        description: `
      A production-grade, full-stack blogging platform built with a modern React 19 frontend and a hardened Express 5 backend. Designed for scalability, security, and developer experience from day one. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>Role-based Management: Admin & User levels to manage and publish posts with fine-grained access control.</li>
        <li>Redis Caching: Accelerated reads with ioredis-powered cache-aside pattern, reducing DB query overhead.</li>
        <li>Secure Access: JWT authentication with bcrypt password hashing and security hardening via Helmet, CORS, rate-limiting, and XSS protection.</li>
        <li>Responsive UI: Premium, animated interface built with React 19, Tailwind CSS 4, shadcn/ui (Radix UI), Framer Motion, and Spline 3D visuals.</li>
        <li>Analytics Dashboard: Interactive charts and insights powered by Recharts.</li>
        <li>Cloud Media: Image uploads handled via Cloudinary + Multer with optimized delivery.</li>
        <li>Email Notifications: Transactional emails via Nodemailer for account verification and updates.</li>
        <li>Form Validation: Robust client-side validation using React Hook Form + Zod schemas.</li>
        <li>API Documentation: Auto-generated Swagger/OpenAPI docs for every endpoint.</li>
      </ul><br/>
      
      Technical Highlights:
      <ul>
        <li>Built the frontend with React 19 + Vite 7 for blazing-fast HMR and optimized builds, using React Router 7 for client-side routing.</li>
        <li>Implemented Redis-based cache invalidation with ioredis to maintain post consistency at scale.</li>
        <li>Structured logging with Pino for production-grade observability and debugging.</li>
        <li>Containerized the entire stack with Docker & Docker Compose for reproducible local and CI environments.</li>
        <li>Comprehensive test coverage with Jest + Supertest for API integration and unit tests.</li>
        <li>Optimized MongoDB queries with Mongoose for efficient article listing and aggregation pipelines.</li>
      </ul>
      `,
        role: `
      Full-Stack Developer <br/>
      Owned end-to-end architecture, design, and implementation:
      <ul>
        <li>Backend: Architected Express 5 API with MongoDB, Redis caching, JWT auth, and production security middleware (Helmet, CORS, rate-limit, XSS).</li>
        <li>Frontend: Built a premium React 19 + Vite 7 SPA with Tailwind CSS 4, shadcn/ui components, Framer Motion animations, and Spline 3D visuals.</li>
        <li>Media & Email: Integrated Cloudinary for image management and Nodemailer for transactional emails.</li>
        <li>DevOps: Dockerized services with Docker Compose, structured logging with Pino, and Swagger API documentation.</li>
        <li>Testing: Built comprehensive test suites using Jest + Supertest for reliable CI/CD.</li>
      </ul>
      `,
        techStack: [
            'React 19',
            'Vite',
            'Tailwind CSS',
            'shadcn/ui',
            'Framer Motion',
            'Node.js',
            'Express 5',
            'MongoDB',
            'Redis',
            'Docker',
            'JWT',
            'Cloudinary',
            'Jest',
        ],
        thumbnail: '/projects/images/xDrop.png',
        longThumbnail: '/projects/images/xDrop.png',
        images: [
            '/projects/images/xDrop.png',
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
        title: 'GDG Cloud New Delhi HackFest 2.0',
        issuer: 'GDG New Delhi',
        link: 'https://www.creadefy.com/verify/CERT-6B44CEB6-93A5-4894',
    },
    {
        title: 'SQL Basic',
        issuer: 'HackerRank',
        link: 'https://www.hackerrank.com/certificates/c1338d22656b',
    },
    {
        title: 'AI Impact Summit Buildathon',
        issuer: 'GUVI & HCL',
        link: 'https://www.guvi.in/verify-certificate?id=6lT324S7zU97218C30',
    },
    {
        title: 'Agentic AI Day',
        issuer: 'Hack2Skill',
        link: 'https://certificate.hack2skill.com/legacy/2025H2S06AID-I16841',
    },
    {
        title: 'AWS Solutions Architecture Job Simulation',
        issuer: 'AWS by Forage',
        link: 'https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_69577d42beda68c4730956bc_1767342320860_completion_certificate.pdf',
    },
];
