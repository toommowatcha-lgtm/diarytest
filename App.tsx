import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './lib/ui/theme';
import { StockProvider } from './contexts/StockContext';
import TopNav from './components/TopNav';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const CompanyPage = lazy(() => import('./pages/CompanyPage'));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vistar-theme">
      <StockProvider>
        <HashRouter>
          <div className="min-h-screen bg-background font-sans antialiased">
            <TopNav />
            <main className="container mx-auto p-4 md:p-6 lg:p-8">
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/company/:ticker" element={<CompanyPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
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