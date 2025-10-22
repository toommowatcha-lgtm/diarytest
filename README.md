
# StockDiary - Investor Notebook

StockDiary is a complete, production-ready single-page web application that serves as an investor's notebook and stock research tool. It's built with React, Vite, TypeScript, and Tailwind CSS, featuring a local-first data model with a clear path to backend integration with Supabase.

## Features

- **Watchlist Management**: Add, view, and manage a list of stocks you're tracking.
- **In-Depth Stock Analysis**: A multi-tab interface for each stock covering:
  - **Business Overview**: Business model, revenue breakdown, competitive advantages (moats), and market size.
  - **Financials**: Track quarterly and annual metrics, add custom metrics, and visualize data with charts.
  - **Valuation**: A flexible valuation calculator based on your assumptions.
  - **Story**: Keep track of earnings call notes and your investment thesis over time.
  - **Risk Assessment**: Document and rate various risks associated with an investment.
- **Stock Comparison**: Compare key financial metrics of multiple stocks side-by-side.
- **Local-First & Autosave**: All data is saved automatically to your browser's IndexedDB. No account needed to get started.
- **Light & Dark Mode**: Switch between themes to suit your preference.
- **PWA Ready**: Installable on your desktop or mobile device for an app-like experience.
- **Admin & Debug Tools**: An admin page to inspect local data, seed sample data, and manage application state.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui inspired components
- **Charting**: Recharts
- **Routing**: React Router (`HashRouter`)
- **Local Persistence**: `localforage` (IndexedDB with localStorage fallback)

---

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone <repository_url>
cd stockdiary
npm install
```

### 2. Running the Development Server

To start the local development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

The app will start with an empty watchlist. To populate it with sample data, navigate to the **Admin** page (via the settings dropdown in the top-right) and click the "Seed Local Database" button.

---

## Future Backend Integration (Supabase)

This project is scaffolded to make integrating a real backend like Supabase straightforward. The data persistence is abstracted behind a data client interface.

### How to Switch to `SupabaseDataClient`

1.  **Set up Supabase**:
    - Create a new project on [Supabase](https://supabase.com/).
    - Use the SQL editor to create tables that match the data structures in `src/types/index.ts`.
    - Get your Project URL and anon key from `Project Settings > API`.

2.  **Configure Environment Variables**:
    - Create a `.env.local` file in the root of the project.
    - Add your Supabase credentials:
      ```
      VITE_SUPABASE_URL=your_supabase_project_url
      VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
      ```

3.  **Implement `SupabaseDataClient.ts`**:
    - Open `src/lib/data/SupabaseDataClient.ts`.
    - Install the Supabase client library: `npm install @supabase/supabase-js`.
    - Uncomment the Supabase client initialization.
    - Implement the methods (`list`, `get`, `upsert`, `delete`) using the Supabase client. Each method has a `// TODO:` comment with implementation guidance.

4.  **Update the Data Client Provider**:
    - Open `src/contexts/StockContext.tsx`.
    - Change the data client instantiation from `LocalDataClient` to `SupabaseDataClient`:

      ```typescript
      // Change this:
      const dataClient = new LocalDataClient();

      // To this:
      // import { SupabaseDataClient } from '../lib/data/SupabaseDataClient';
      // const dataClient = new SupabaseDataClient();
      ```

After these changes, the app will use Supabase for data persistence instead of the browser's local storage.

---

## Deployment

### Deploying to Vercel

1.  Push your code to a Git repository (e.g., GitHub, GitLab).
2.  Import the project into [Vercel](https://vercel.com).
3.  Vercel will automatically detect that it's a Vite project and configure the build settings.
4.  **Important**: If you have connected Supabase, add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the Vercel project settings.
5.  Click "Deploy". Your application will be built and deployed.

---

## Testing

This project is set up to be testable, but example tests were not included in the initial scaffold. You can add a testing framework like Vitest or Jest.

### Example Test Setup (Vitest)

1.  Install Vitest:
    ```bash
    npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
    ```

2.  Configure Vite (`vite.config.ts`):
    ```typescript
    /// <reference types="vitest" />
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      plugins: [react()],
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
      },
    })
    ```

3.  Create a setup file (`src/test/setup.ts`):
    ```typescript
    import '@testing-library/jest-dom';
    ```

4.  Write your first test, for example `src/components/Moat/MoatEditor.test.tsx`.

You can find more details in the [Vitest documentation](https://vitest.dev/).
