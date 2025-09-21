# Mobile Profile Shell: Interactive Portfolio Website

<div align="center">
  <img src="public/placeholder.svg" alt="Mobile Profile Shell Preview" width="300">
</div>

## Overview

A modern, interactive portfolio website designed as a mobile phone interface, showcasing Iheoma Nkwo's professional profile, projects, skills, and contact information in an engaging, app-based format. This responsive web application provides an immersive user experience that mimics the feel of navigating a mobile device.

## Features

- **Mobile-Inspired Interface**: Interactive home screen with app icons and realistic animations
- **About Me App**: Personal profile, bio, social links, and GitHub stats
- **Projects App**: Showcases 4 featured projects with descriptions, technologies, and links
- **Skills App**: Visual representation of technical skills organized by category
- **Contact App**: Easy way to get in touch
- **Responsive Design**: Works seamlessly on all device sizes
- **Modern UI**: Beautiful gradients, animations, and transitions

## Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn-ui components
- **Routing**: React Router
- **State Management**: React Query
- **Icons**: Lucide React
- **Additional Libraries**: clsx, tailwind-merge, sonner

## Quick Start

### Prerequisites
- Node.js (v16 or later)
- npm, yarn, or bun

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/pxlcrtiv/mobile-profile-shell.git
   cd mobile-profile-shell
   ```

2. Install dependencies
   ```sh
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Start the development server
   ```sh
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` to see the application

## Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── apps/           # Portfolio section apps
│   │   ├── ui/             # shadcn-ui components
│   │   ├── AppIcon.tsx     # App icon component
│   │   ├── MobileScreen.tsx # Mobile screen container
│   │   └── StatusBar.tsx   # Status bar component
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page with app grid
│   │   └── NotFound.tsx    # 404 page
│   ├── assets/             # Static assets
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Entry point
├── public/                 # Public assets
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── vite.config.ts          # Vite configuration
```

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run build:dev`: Builds the application for development
- `npm run lint`: Runs ESLint to check for code issues
- `npm run preview`: Previews the production build

## Portfolio Content

### About Section
- Professional profile with bio
- Personal information and location
- Links to external websites
- Social media connections (GitHub, Twitter, LinkedIn)
- GitHub statistics

### Projects Section
1. **Panorama Streetviewer**: Interactive panoramic imagery exploration application
2. **Adiva**: AI-powered advertising creation platform using Google's Gemini AI
3. **Sonic Dreamscape Orchestrator**: Professional-grade application for generating healing frequencies
4. **Activepieces**: AI Agents & Workflow Automation platform

### Skills Section
- Frontend Development (JavaScript, React, Next.js, TypeScript, Vue.js)
- Backend & Tools (Python, Node.js, PHP, Rust, Java)
- Design & UI (UI/UX Design, Figma, Adobe Creative Suite, CSS/Tailwind)
- AI & Innovation (AI Tools Integration, Machine Learning, Automation, Wellness Tech)

## Customization

To update the portfolio content:
1. Modify the `AboutApp.tsx`, `ProjectsApp.tsx`, and `SkillsApp.tsx` files in the `components/apps/` directory
2. Update the profile avatar in the `assets/` directory
3. Adjust animations and styles in the respective component files

## Deployment

### Vercel
The easiest way to deploy this portfolio is to use the [Vercel Platform](https://vercel.com/import) from the creators of Next.js.

### Netlify
Alternatively, you can deploy to Netlify by connecting your GitHub repository.

1. Visit [Netlify](https://www.netlify.com/)
2. Click "New site from Git"
3. Select your repository
4. Configure your build settings (use `npm run build` as the build command)
5. Click "Deploy site"

## License
This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements
- Built with React and TypeScript
- Styled with Tailwind CSS and shadcn-ui
- Icons from Lucide React
- Animations powered by CSS transitions and animations

---

<p align="center">
  Designed with 💜 by Iheoma Nkwo
</p>
