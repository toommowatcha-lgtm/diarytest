
# Vistar - Financial Analysis Dashboard

Vistar is a modern, production-ready single-page web application that serves as a financial analysis dashboard, inspired by platforms like Fiscal.ai and Quartr.im. It's built with React, Vite, TypeScript, and Tailwind CSS, featuring a local-first data model.

## Features

- **Dashboard**: View your watchlist with key metrics at a glance.
- **In-Depth Company Analysis**: A multi-section page for each stock covering:
  - **Company Overview**: Key metrics, business description, and market data.
  - **AI-Powered Summary**: Use the Gemini API to generate summaries of the latest earnings calls, including highlights, risks, and opportunities.
  - **Interactive Financials**: Explore Income Statements, Balance Sheets, and Cash Flow statements with annual/quarterly toggles and visual charts.
  - **Valuation Calculator**: A flexible valuation tool based on your growth and multiple assumptions.
  - **Earnings Calls**: A log of recent earnings calls with links to materials.
  - **Personal Notes**: An auto-saving editor for your investment thesis and notes.
- **Local-First & Autosave**: All data is saved automatically to your browser's IndexedDB. No account needed to get started.
- **Light & Dark Mode**: Switch between themes to suit your preference.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **AI**: Google Gemini
- **Styling**: Tailwind CSS
- **Charting**: Recharts
- **Routing**: React Router (`HashRouter`)
- **Local Persistence**: `localforage` (IndexedDB with localStorage fallback)

---

## Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone <repository_url>
cd vistar
npm install
```

### 2. Running the Development Server

To start the local development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`. The app will start with sample data for NVIDIA (NVDA).
