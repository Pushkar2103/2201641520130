import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
              URL Shortener
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
              Home
            </Link>
            <Link to="/stats" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
              Stats
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

