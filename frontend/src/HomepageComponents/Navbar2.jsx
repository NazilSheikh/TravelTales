import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, BookMarked, User, PenSquare, Menu } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    // { path: '/login', label: 'My Stories', icon: BookMarked },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TravelTales</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
               <Link to="/login">
            <Button  variant="primary" size="sm" className="ml-4" >
              <PenSquare className="w-4 h-4 mr-2" />
              Add Story
            </Button>
               </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 p-4 bg-white shadow-md">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}

          
            <Link to="/login">
            <Button  variant="primary" size="sm" className="w-full  " >
              <PenSquare className="w-4 h-4 mr-2" />
              Add Story
            </Button>
               </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
