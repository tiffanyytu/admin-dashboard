# AI Humor Project: Admin & Analytics Dashboard
![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript) ![Supabase](https://img.shields.io/badge/Supabase-green?style=flat&logo=supabase)

**🚀 Live Demo:** [https://admin-dashboard-amber-kappa.vercel.app/](https://admin-dashboard-amber-kappa.vercel.app/)

**GitHub Repository Topics:** `nextjs`, `typescript`, `supabase`, `full-stack`, `admin-panel`, `crud`, `analytics`

### What This Project Does
This is the internal command center for the Humor Project ecosystem. It allows administrators to securely manage system configurations (like LLM Providers, Terms, and Allowed Domains) and provides data-driven insights into how the AI's jokes are performing with the community.

### My Contribution
As the developer, I architected the administrative workflows, implementing Role-Based Access Control (RBAC), and building dynamic data visualization tables that calculate relational data in real-time.

### Tech Stack
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Next.js Server Actions, Supabase (PostgreSQL)

### Key Technical Decisions & Features
* **Interactive Performance Analytics:** Built a custom `SortableTable` client component that calculates Net Score (Upvotes minus Downvotes) on the fly, allowing admins to instantly sort and identify the highest and lowest-performing AI jokes.
* **Secure Database Management (CRUD):** Created forms and server actions to manage foundational database tables without requiring raw SQL access.
* **Automated Data Auditing:** Implemented security measures on all update/create server actions to automatically fetch the session state and attach `created_by_user_id` and `modified_by_user_id` to maintain a strict audit trail.
* **Access Control:** Protected routes to ensure only whitelisted administrator accounts can view or alter system configurations.

### How to Run It Locally

1. Clone the repository.
2. Install dependencies:
   `npm install`
3. Add your environment variables to `.env.local`:
   `NEXT_PUBLIC_SUPABASE_URL=your_supabase_url`
   `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`
4. Run the development server:
   `npm run dev`
5. Open http://localhost:3000 in your browser.
