import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { Swords, Info, Home } from 'lucide-react';

const Navbar = () => {
  const { isGameStarted } = useGameContext();
  const location = useLocation();

  return (
    <nav className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Swords className="h-6 w-6" />
            <span className="text-xl font-bold">Battle Cards</span>
          </div>
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 hover:text-primary-200 transition-colors ${
                location.pathname === '/' ? 'border-b-2 border-accent-400' : ''
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/game" 
              className={`flex items-center space-x-1 hover:text-primary-200 transition-colors ${
                !isGameStarted ? 'opacity-50 pointer-events-none' : ''
              } ${location.pathname === '/game' ? 'border-b-2 border-accent-400' : ''}`}
            >
              <Swords className="h-5 w-5" />
              <span>Game</span>
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center space-x-1 hover:text-primary-200 transition-colors ${
                location.pathname === '/about' ? 'border-b-2 border-accent-400' : ''
              }`}
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 