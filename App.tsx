
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './lib/ui/theme';
import { StockProvider } from './contexts/StockContext';
import TopNav from './components/TopNav';

// Lazy load pages for better initial performance
const Watchlist = lazy(() => import('./pages/Watchlist'));
const StockDetail = lazy(() => import('./pages/StockDetail/Index'));
const Compare = lazy(() => import('./pages/Compare'));
const Settings = lazy(() => import('./pages/Settings'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="stockdiary-theme">
      <StockProvider>
        <HashRouter>
          <div className="min-h-screen bg-background font-sans antialiased">
            <TopNav />
            <main className="container mx-auto p-4 md:p-6 lg:p-8">
              <Suspense fallback={<div className="text-center py-10">Loading page...</div>}>
                <Routes>
                  <Route path="/" element={<Navigate to="/watchlist" replace />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/stock/:symbol" element={<StockDetail />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </HashRouter>
      </StockProvider>
    </ThemeProvider>
  );
}

export default App;
