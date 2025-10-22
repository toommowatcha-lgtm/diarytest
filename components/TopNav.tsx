
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Settings, GitCompare, BookOpen } from 'lucide-react';

const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link to="/watchlist" className="flex items-center space-x-2">
            <BarChart className="h-6 w-6" />
            <span className="inline-block font-bold">StockDiary</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              to="/watchlist"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Watchlist
            </Link>
            <Link
              to="/compare"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Compare
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
            {/* Theme Toggle and Settings can be added here */}
            <Link to="/settings">
                <Settings className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
