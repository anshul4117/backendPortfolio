# 🚀 Backend Developer Portfolio — Anshul

A premium, interactive personal portfolio website tailored for showcasing backend engineering, system architecture, API design, and full-stack development skills. Built with Next.js, Tailwind CSS, TypeScript, and GSAP.

🔗 **Live Demo:** [anshul4117-portfolio.vercel.app](https://anshul4117-portfolio.vercel.app/)

---

## ✨ Features

- **Hero Banner** — Bold, animated introduction with real-time availability status and key stats
- **About Me** — Detailed professional overview with slide-up reveal animations
- **Tech Stack** — Categorised showcase of languages, frameworks, tools, and databases
- **Experience** — Internship timeline and professional journey
- **Projects** — Highlighted projects with dedicated detail pages (`/projects/[slug]`)
- **Education & Certifications** — Academic background and credentials
- **GitHub Contributions** — Live GitHub contribution calendar integration
- **Contact** — Sticky email sidebar and footer contact section
- **Custom Cursor** — Bespoke cursor for an elevated browsing experience
- **Preloader & Page Transitions** — Smooth GSAP-powered loading and route transitions
- **Scroll Progress Indicator** — Visual reading progress bar
- **Particle Background** — Subtle animated particle effects
- **SEO & Sitemap** — Dynamic sitemap generation and meta optimisation
- **Analytics** — Google Analytics integration via `@next/third-parties`
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop

---

## 🛠️ Tech Stack & Key Technologies

| Category | Technologies |
|---|---|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, CSS Animations |
| **Animations** | GSAP (GreenSock Animation Platform) |
| **Smooth Scrolling** | Lenis |
| **UI Components** | Lucide React, Custom SVG Icons (SVGR) |
| **Deployment** | Vercel |
| **Analytics** | Google Analytics (`@next/third-parties`) |
| **Package Manager** | pnpm |

---

## 📂 Project Structure

```
.
├── app/
│   ├── _components/        # Page-level sections (Banner, AboutMe, Skills, etc.)
│   ├── projects/           # Dynamic project detail pages
│   ├── layout.tsx          # Root layout with fonts, metadata, analytics
│   ├── template.tsx        # Route transition wrapper
│   ├── page.tsx            # Home page
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── globals.css         # Global styles & CSS variables
├── components/             # Shared UI components
│   ├── icons/              # SVG icon components (via SVGR)
│   ├── Navbar.tsx          # Slide-out navigation menu
│   ├── Footer.tsx          # Footer with social links
│   ├── Button.tsx          # Reusable button component
│   ├── CustomCursor.tsx    # Custom cursor effect
│   ├── Preloader.tsx       # Page load animation
│   ├── ScrollProgressIndicator.tsx
│   ├── ParticleBackground.tsx
│   └── TransitionLink.tsx  # GSAP page transition links
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
├── public/
│   ├── logo/               # Tech stack logos & icons
│   └── projects/           # Project screenshots & assets
├── tailwind.config.ts      # Tailwind configuration with custom theme
├── next.config.ts          # Next.js configuration
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repository
git clone https://github.com/anshul4117/backend-portfolio.git
cd backend-portfolio

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
pnpm start
```

---

## 🚢 Deployment

This project is deployed on [Vercel](https://vercel.com). Every push to the `main` branch triggers an automatic deployment.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
