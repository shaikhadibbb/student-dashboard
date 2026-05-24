# ⚡️ Atlas Student Dashboard (Internship Challenge!)

Hey there! This is my submission for the frontend internship challenge. I spent the last few days building a dark-themed student dashboard from scratch. My main goal was to make it look super polished (very inspired by premium tools like Vercel and Linear) and extremely fast.

Live link: [https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/](https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/)

## 🛠️ The Tech Stack I Used

- **Next.js 15 (App Router)** - I opted for the latest Next.js because Server Components are amazing for loading speed.
- **Supabase** - Used PostgreSQL to store the courses table. The database queries run directly inside Next.js Server Components.
- **Tailwind CSS** - For layout styling. I extended it with custom HSL/RGB colors for the cards and backgrounds.
- **Framer Motion** - Handled all animations (spring physics on cards, staggered fade-ins, and layout morphs).
- **Lucide React** - Standard icons, dynamically rendered using TypeScript.

---

## 🏗️ How I Structured the App (and why)

I decided to keep the layout clean and highly performant by putting the actual server-side queries inside `src/app/page.tsx` itself. 
The data is pulled from Supabase on the server side using the `@supabase/ssr` package. When a user requests the page:
1. The server fetches the list of courses.
2. If the connection fails, `error.tsx` catches the error immediately and shows a nice fallback UI with a "Try Again" button (which triggers a React state reset).
3. If it is loading, Next.js handles it behind the scenes by rendering the custom skeleton inside `loading.tsx`. It uses pulse animation matching the real layout.

Once the data reaches the client, interactive client-side components take over:
- The **Sidebar** is completely stateful! It's 260px wide but you can collapse it down to 80px by clicking the PanelLeft toggle button at the very bottom (custom SVG transition). The active indicator dynamically highlights menu items using Framer Motion's `layoutId` so it glides smoothly between active states.
- The **Activity Heatmap** displays a 14-week graph. Initially, I used random levels but that caused a huge Next.js SSR hydration mismatch warning in the console because the server and client values didn't match. I resolved this by writing a deterministic pseudo-random formula based on trigonometric sine inputs. Now it is completely stable, has 0 console errors, and features smooth hover scaling.
- The **Progress Bar** uses hardware-accelerated `scaleX` transitions (instead of animating CSS `width` which triggers heavy browser repaint flags) to load smoothly.

---

## ⚡️ Challenges & What I Learned

1. **Next.js 15 Cookie API gotcha**: In Next.js 15, the `cookies()` API became asynchronous. I had to make sure the Supabase server client `await`s the cookies store rather than calling it synchronously, which took some debugging!
2. **Hydration Flickers**: Framer Motion's entrance animations caused a tiny flash of unstyled content or hydration mismatch because the client rendered different initial animations than the static server-rendered output. I fixed this in `CourseGrid.tsx` by waiting until the component successfully mounts (`useEffect` flag) before triggering the stagger container variant.
3. **TypeScript Lucide Type Guarding**: TypeScript threw a lot of errors when trying to load dynamic strings like `'Code2'` or `'Database'` into Lucide icon components. I resolved this by writing a custom type guard: `keyof typeof LucideIcons` to ensure total type safety.

---

## 🚀 Setting it up locally

If you want to run this project locally:

1. Clone the repo to your local machine.
2. Create a `.env.local` file in the root folder and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   (You can find these inside Project Settings > API on Supabase).
3. Set up the SQL table:
   Run the table creation script inside the Supabase SQL editor:
   ```sql
   CREATE TABLE courses (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     title text NOT NULL,
     progress integer NOT NULL CHECK (progress >= 0 AND progress <= 100),
     icon_name text NOT NULL,
     created_at timestamp with time zone DEFAULT now()
   );
   ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow anonymous read" ON courses FOR SELECT USING (true);
   -- Seed values:
   INSERT INTO courses (title, progress, icon_name) VALUES
     ('Advanced React Patterns', 75, 'Code2'),
     ('System Design Fundamentals', 42, 'Database'),
     ('Machine Learning Basics', 88, 'Brain'),
     ('UI/UX Design Principles', 60, 'Palette');
   ```
4. Run `npm install` to grab the packages.
5. Launch the local dev server using `npm run dev`. Go to `http://localhost:3000`!
