# Student Dashboard 🚀

Hey there! Thanks for checking out my submission for the frontend internship challenge. I built this **Student Dashboard** to showcase my skills in React, Next.js, and creating buttery-smooth UI experiences. I really wanted this to feel like a premium product (taking a lot of inspiration from tools like Linear and Vercel's dashboard).

## What I Built & Why

This is a responsive, dark-mode-only dashboard that pulls real data from Supabase. I focused heavily on **performance and polish**. 

Instead of just making it "work," I wanted it to feel *alive*. That means:
- ✅ 60fps animations with zero layout shifts
- ✅ Spring physics that feel natural, not robotic
- ✅ Hardware-accelerated transforms for smooth interactions
- ✅ A layout that adapts perfectly from desktop down to mobile
- ✅ Thoughtful loading states that don't feel like placeholders

### The Stack:
- **Next.js 15 (App Router)** - Built-in optimizations and streaming for fast loads.
- **Supabase** - PostgreSQL database with secure server-side fetching via `@supabase/ssr`.
- **Tailwind CSS** - Crafted a custom dark theme with subtle gradient meshes and grain textures to evoke that premium feel.
- **Framer Motion** - This is where the magic happens. Staggered animations, spring physics, and morph transitions all work together for a polished experience.
- **Lucide React** - Consistent, clean icons that scale beautifully.

## Architecture Choices

I split the architecture cleanly between **Server Components** and **Client Components**:

### 1. Server-Side Data Fetching
- Courses are fetched in `CourseGridWrapper.tsx` (an async server component) using Supabase SSR.
- This means zero client-side waterfalls and instant data availability.
- Wrapped in a `<Suspense>` boundary with a skeleton loader fallback (which has its own subtle pulsing animation).

### 2. Client-Side Interactivity
- The `CourseGrid` is a client component that orchestrates all Framer Motion animations.
- I use `useMemo` and early mounting checks to avoid hydration mismatches.
- `ProgressBar` has a mounted state so it only animates after the client takes over from the server.
- Individual course tiles use `React.memo` (via Framer Motion's optimization) to prevent unnecessary re-renders.

### 3. Component Structure
```
app/
├── (dashboard)/
│   └── dashboard-page.tsx           # Main client wrapper
└── page.tsx                          # Root page

components/
├── layout/
│   ├── Sidebar.tsx                   # Desktop nav with layout animations
│   └── MobileNav.tsx                 # Mobile bottom nav
└── dashboard/
    ├── HeroTile.tsx                  # Welcome banner with streak indicator
    ├── CourseTile.tsx                # Individual course cards
    ├── ActivityTile.tsx              # GitHub-style contribution heatmap
    ├── CourseGrid.tsx                # Container with stagger animation
    ├── CourseGridWrapper.tsx         # Server component that fetches courses
    ├── CourseGridSkeleton.tsx        # Loading state
    └── ProgressBar.tsx               # Animated progress indicator

lib/supabase/
├── server.ts                         # Server-side Supabase client
└── client.ts                         # Browser-side Supabase client
```

## Technical Highlights

### Spring Physics & Animations
- **Stagger Animation**: Each tile enters with a 0.08s delay, using spring physics (`stiffness: 300`, `damping: 24`, `mass: 0.8`) for a snappy but natural feel.
- **Hover States**: Cards scale up 2% on hover with the same spring physics, paired with a subtle glow overlay that morphs in smoothly.
- **Sidebar Navigation**: Active nav items use Framer Motion's `layoutId` to create a snapping background highlight that smoothly animates between items.
- **Progress Bars**: Animate from 0% to the database value using `scaleX` (not `width`!) to avoid layout shifts.

### Zero Layout Shifts
- All animations use `transform` and `opacity` exclusively (GPU-accelerated).
- Pseudo-elements handle shadow effects to prevent repaints.
- Skeleton loaders are dimensionally identical to real content.
- The `CourseGrid` renders a hidden version first to prevent hydration mismatches.

### Responsive Design
- **Desktop (> 1024px)**: Full Bento grid with sidebar visible.
- **Tablet (768px - 1024px)**: Sidebar collapses to icons only; grid adjusts to 2 columns.
- **Mobile (< 768px)**: Sidebar becomes a bottom navigation bar; grid stacks vertically.

### Data Architecture
- **Secure**: Environment variables are never exposed to the browser (Supabase URL and key are `NEXT_PUBLIC_*` but only the anon key is used, no secret key in code).
- **Typed**: Full TypeScript support with Supabase's auto-generated types in `types/database.ts`.
- **Error Handling**: Graceful fallbacks for missing data or connection issues.

## Challenges Faced & How I Solved Them

### 1. Stagger Animation Timing
**Challenge**: Initially, the animations felt too slow and sluggish. Tiles were floating in with no energy.

**Solution**: I tweaked the stagger delay to `0.08s` and adjusted the spring physics from the default linear easing to `stiffness: 300`, `damping: 24`, `mass: 0.8`. This created a snappier entrance that still felt natural.

### 2. Layout Shifts on Hover
**Challenge**: Using `box-shadow` or `border` changes on hover triggers repaints and layout recalculations.

**Solution**: I used a pseudo-element overlay with `opacity` transitions instead. The GPU handles rendering without triggering browser repaints. The border color also changes via opacity, not by adding/removing borders.

### 3. Hydration Mismatches
**Challenge**: The `ProgressBar` width animation was being set to 0% on the server but then suddenly jumped to the full value on the client, causing a mismatch.

**Solution**: I added a simple `mounted` state that only allows the animation to run after the component hydrates. The server renders it at 0%, and the client smoothly animates it to the final value.

### 4. Dynamic Icon Rendering
**Challenge**: Lucide icon names are fetched from the database as strings (e.g., "BookOpen"), but React needs the actual component.

**Solution**: I created a type-safe `isValidIcon` check that validates the string against the Lucide exports and safely casts it to the `LucideIcon` type. Invalid icons fall back to `BookOpen`.

## Environment Setup

### 1. Clone and Install
```bash
npm install
```

### 2. Supabase Setup
- Create a free Supabase project at [supabase.com](https://supabase.com)
- Create a `courses` table with this schema:
  ```sql
  CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL,
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
  );
  ```
- Insert some seed data:
  ```sql
  INSERT INTO courses (title, progress, icon_name) VALUES
    ('Advanced React Patterns', 75, 'Zap'),
    ('TypeScript Mastery', 60, 'Code'),
    ('System Design Fundamentals', 45, 'Layers'),
    ('Web Performance Optimization', 88, 'Rocket');
  ```

### 3. Environment Variables
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're good to go!

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This app is fully deployed on **Vercel** with automatic deployments from the main branch. Environment variables are securely configured in Vercel's dashboard.

**Live URL**: [https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/](https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/)

## What I'd Do Next

If I had more time, I'd add:
- **User Authentication**: Real user sessions with Supabase Auth.
- **Course Details Page**: Deep dive into individual courses with progress tracking and video content.
- **Drag & Drop**: Reorder course tiles or customize the dashboard layout.
- **Dark/Light Mode Toggle**: (Though the spec is dark-mode only, it's a nice UX feature).
- **WebGL Background**: A subtle animated mesh for extra polish (like Stripe's website).
- **Real-Time Updates**: Use Supabase Realtime to sync course progress across devices.

## Code Quality Notes

- **No TypeScript errors**: Fully typed with strict mode enabled.
- **No layout shifts**: Every animation uses GPU-accelerated transforms.
- **Semantic HTML**: Uses `<nav>`, `<main>`, `<article>`, `<section>` for proper document structure.
- **Accessibility**: ARIA labels, proper button roles, and semantic structure.
- **Performance**: Server components reduce bundle size, Suspense enables streaming, Framer Motion optimizes animations.

---

**P.S.** I left detailed comments throughout the code explaining my thought process. This dashboard is a reflection of how I think about building user interfaces: **performance-first, attention to detail, and shipping polished products that feel good to use.**

Thanks for reviewing! 🙌

