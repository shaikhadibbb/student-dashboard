# Atlas Student Dashboard

A high-fidelity student dashboard built for a frontend internship challenge. 
Dark mode only, bento grid layout, Supabase-powered, with buttery-smooth Framer Motion animations.

## Tech Stack

- **Next.js 15** (App Router) — Server Components for data fetching
- **Supabase** — PostgreSQL database with real-time course data
- **Tailwind CSS** — Utility-first styling with custom design tokens
- **Framer Motion** — Spring physics animations, zero layout shifts
- **Lucide React** — Dynamic icon rendering from database

## Architecture

### Server/Client Split
I used Next.js Server Components (`page.tsx`) to fetch course data directly from Supabase 
using `@supabase/ssr`. This means the data hits the page before any JavaScript runs on the client, 
which is great for performance and SEO.

Client components (marked with `"use client"`) handle all the interactive stuff:
- Framer Motion entrance animations
- Hover states and micro-interactions
- Sidebar navigation with `layoutId` sliding highlight

### Why This Split Matters
Server Components let me keep the data fetching logic close to the database, while Client Components 
handle the "feel" of the app. The `loading.tsx` file automatically wraps the page in a Suspense 
boundary, so users see a skeleton loader while Supabase responds.

## Challenges Faced

1. **Hydration mismatch with stagger animations**: Framer Motion's `initial="hidden"` caused a 
   hydration error in Next.js. Fixed by rendering a static grid until `useEffect` confirms mount.

2. **Zero layout shifts**: Had to replace `width` animations with `scaleX` and `opacity` transitions 
   on pseudo-elements. Chrome DevTools Paint Flashing was my best friend here.

3. **Dynamic Lucide icons**: TypeScript didn't like dynamic icon names. Built a type guard using 
   `keyof typeof LucideIcons` to keep it strict.

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env.local` and add your Supabase credentials
3. Run `npm install`
4. Run `npm run dev`

## Live Demo

The app is fully deployed on Vercel. You can check out the live version here: [https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/](https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/)
