# Atlas Student Dashboard

This is a modern, dark-themed learning dashboard built to explore performant data fetching and fluid UI transitions in Next.js 15. The project integrates Supabase for persistence, Tailwind for styling, and Framer Motion for spring-based interactive states.

Live link: [https://student-dashboard-4qffu3u9h-shaikhadibbbs-projects.vercel.app/](https://student-dashboard-4qffu3u9h-shaikhadibbbs-projects.vercel.app/)

---

## Architecture & Data Decisions

### Hybrid Rendering Strategy
I wanted to keep the initial page load as close to instant as possible, so the core data fetching is handled entirely on the server.
In `src/app/page.tsx`, we query Supabase directly using the `@supabase/ssr` package. This has a few major benefits:
- **No client-side fetch waterfalls**: The browser receives fully populated HTML instead of a blank page that has to make subsequent API requests.
- **Graceful loading states**: The entire route is wrapped in a suspense boundary. While the server fetches data, Next.js instantly stream-renders the skeleton mockup defined in `loading.tsx`.
- **Integrated error boundaries**: If the database is down, `error.tsx` catches the failure and renders a focused retry screen, keeping the rest of the application stable.

### Smooth Transitions without Layout Shifts
Fluid interfaces are great, but animating structural properties like `width` triggers browser repaints on every frame, which ruins performance. To prevent this, the components are engineered to prioritize GPU-accelerated properties:
- **Progress Tracking**: The course progress bars animate using `scaleX` transforms on the X-axis, keeping layout calculations at zero.
- **Fluid Side Navigation**: The sidebar collapses down from `260px` to `80px` smoothly on desktop. The active indicator is built with Framer Motion's `layoutId`, meaning it physically morphs between active links rather than jumping instantly.

### Solving the Hydration Mismatch
One of the trickiest parts of server-rendering interactive charts is avoiding hydration mismatches. Initially, generating the 14-week activity heatmap with random levels caused React console warnings because the server and client generated different grids.
To solve this, I wrote a deterministic mathematical calculation based on the sine of each cell's index. The result is a realistic-looking, scattered contribution graph that remains completely stable and identical on both server and client paints.

---

## Type Safety

The application is written in strict TypeScript:
- **Dynamic Icons**: To allow courses to load different Lucide icons from the database, we parse and validate icon names using a strict key guard: `keyof typeof LucideIcons`.
- **Relational Mapping**: Supabase queries are typed against the relational Postgres schema interface to guarantee auto-completion and compile-time checks.

---

## Local Setup

### 1. Database Setup
Create a new project on Supabase and run the following script in the SQL editor to create the courses table and seed starting data:

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default now()
);

alter table courses enable row level security;
create policy "Allow anonymous read" ON courses for select using (true);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('System Design Fundamentals', 42, 'Database'),
  ('Machine Learning Basics', 88, 'Brain'),
  ('UI/UX Design Principles', 60, 'Palette');
```

### 2. Environment Variables
Rename `.env.example` to `.env.local` in your root directory and plug in your Supabase API credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Installation
Install dependencies and run the local development server:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Run production build
npm run build
```
