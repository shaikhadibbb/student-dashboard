# Atlas Student Dashboard

A high-performance, dark-themed student learning management dashboard built with Next.js 15, Supabase, Tailwind CSS, and Framer Motion. This project is structured to demonstrate best practices in modern web development, focusing on performance, responsive design, and robust server-side data fetching.

Live Deployment: [https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/](https://student-dashboard-21me1qq22-shaikhadibbbs-projects.vercel.app/)

## Technical Stack

* **Framework:** Next.js 15 (App Router) utilizing React Server Components (RSC)
* **Database:** Supabase (PostgreSQL) for real-time relational data persistence
* **Styling:** Tailwind CSS for structured utility styling and responsive layouts
* **Animations:** Framer Motion for high-fidelity interactive elements and transition states
* **Icons:** Lucide React for dynamic vector graphic elements

---

## Architectural Implementation

### 1. Hybrid Server-Client Split
Data persistence is handled via Next.js Server Components. Relational database queries are executed directly on the server during request time using the `@supabase/ssr` package. This architecture delivers multiple performance benefits:
* **Zero Client-Side Fetching Overhead:** Eliminates large client-side data fetching libraries and reduces initial bundle sizes.
* **Optimal SEO:** Delivers pre-rendered HTML payloads directly from the server.
* **Unified Error Boundaries:** Utilizes `error.tsx` to gracefully catch and handle any database connection or query execution failures with full state recovery controls.
* **Instant Skeleton Pre-rendering:** Incorporates `loading.tsx` to automatically supply an accurate CSS-pulsing skeleton layout during the server-side retrieval lifecycle.

Interactive features are handled at the client level using appropriate hydration boundaries:
* **Stateful Collapsible Sidebar:** Features a dynamic toggle transitioning between `260px` and `80px` states. Navigation items morph their highlight backgrounds dynamically using Framer Motion's `layoutId` layout-matching mechanics.
* **Performance-First Progress Tracking:** Displays thinning progress bars (`h-1.5`) running hardware-accelerated CSS `scaleX` transforms, completely avoiding costly DOM repaints triggered by animating standard CSS `width` rules.

### 2. SSR Hydration Security
To prevent Next.js SSR hydration mismatches (which commonly occur when client components use dynamic dates, local formats, or non-deterministic functions), this application implements strict structural strategies:
* **Deterministic Graph Seeding:** The 14-week contribution map generates cells and opacities deterministically utilizing a mathematical sine-based pseudo-random generator, guaranteeing identical DOM values on both the server pre-rendering and client hydration passes.
* **Entrance Stagger Protection:** Mount states inside `CourseGrid.tsx` are managed securely using standard lifecycle mount hooks to prevent visual layout shifts during client-side animation cascading.

---

## TypeScript Configurations

The codebase enforces strict type safety and static checking:
* **Dynamic Icon Validation:** Implements a type guard checking (`keyof typeof LucideIcons`) to dynamically validate icon strings fetched from the database, ensuring strict interface compliance with Lucide React elements.
* **PostgreSQL Schema Mapping:** Strictly types server response payloads utilizing custom-defined PostgreSQL row interfaces.

---

## Setup and Installation

### 1. Local Environment Configuration
Clone the repository and create a `.env.local` configuration file in the project root containing your Supabase project API credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Initialization
Execute the following SQL script inside the Supabase SQL editor to construct the schema, configure security policies, and seed mock course rows:

```sql
-- Create Courses Table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  progress integer NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Allow anonymous read" ON courses FOR SELECT USING (true);

-- Seed Data Rows
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Code2'),
  ('System Design Fundamentals', 42, 'Database'),
  ('Machine Learning Basics', 88, 'Brain'),
  ('UI/UX Design Principles', 60, 'Palette');
```

### 3. Execution Commands
Install dependencies and initiate the local compilation and hot-reloading dev instances:

```bash
# Install packages
npm install

# Run the development environment
npm run dev

# Compile production bundle
npm run build
```
