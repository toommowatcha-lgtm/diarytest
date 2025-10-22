import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart } from 'lucide-react';

const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <BarChart className="h-6 w-6" />
            <span className="inline-block font-bold">Vistar</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNav;