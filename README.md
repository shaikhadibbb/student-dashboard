# Student Dashboard 🚀

Hey there! Thanks for checking out my submission for the frontend internship challenge. I built this Student Dashboard to showcase my skills in React, Next.js, and creating buttery-smooth UI experiences. I really wanted this to feel like a premium product (taking a lot of inspiration from tools like Linear and Vercel's dashboard).

## What I Built & Why

This is a responsive, dark-mode-only dashboard that pulls real data from Supabase. I focused heavily on **performance and polish**. 
Instead of just making it "work," I wanted it to feel alive. That means 60fps animations, zero layout shifts, and a layout that adapts perfectly from desktop down to mobile.

### The Stack:
- **Next.js 15 (App Router)** - Used for the foundation.
- **Supabase** - For the PostgreSQL database and data fetching.
- **Tailwind CSS** - For styling (I created a custom dark theme with noise textures and gradient meshes).
- **Framer Motion** - This is where the magic happens. Used for the staggered bento grid entrance, hover states, and the morphing sidebar pill.
- **Lucide React** - Clean, consistent icons.

## Architecture Choices

I split the architecture cleanly between **Server Components** and **Client Components**:
1. **Server-Side Data Fetching**: I'm fetching the courses directly in `app/page.tsx` using Supabase SSR. This means zero client-side waterfalls and instant loading (with a nice pulse skeleton fallback in `loading.tsx` via Suspense).
2. **Client-Side Interactivity**: The data is passed down to `dashboard-page.tsx`, which is a client component wrapper that coordinates all the Framer Motion animations.
3. **Component Structure**: I kept things modular (`HeroTile`, `CourseTile`, `ActivityTile`) so the code is easy to read and maintain. I also wrapped `CourseTile` in `React.memo` to prevent unnecessary re-renders when the parent layout animates.

## Challenges Faced

- **Getting the stagger animation timing right took a few tries.** Initially, it felt too slow and sluggish. I tweaked the stagger delay to `0.08s` and adjusted the spring physics (`stiffness: 300`, `damping: 24`) until it felt snappy but natural.
- **Layout shifts on hover:** I had to be super careful to only animate `transform` and `opacity`. I used a pseudo-element for the hover shadow to ensure the GPU handles the rendering without triggering a browser repaint.
- **Hydration mismatches:** The `ProgressBar` width animation initially caused some hydration issues since the server renders it at 0%. I added a simple `mounted` state check so it only animates once the client takes over. 

## How to Run Locally

If you want to spin this up on your machine:

1. Clone the repo and install dependencies:
```bash
npm install
```

2. Set up your environment variables. Copy the `.env.example` file and add your Supabase credentials:
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you should be good to go!

## Deployment

The app is fully deployed on Vercel. You can check out the live version here: [https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/](https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/)**

---

*P.S. I left a few comments in the code explaining my thought process. Let me know what you think!*
