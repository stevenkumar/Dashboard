import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/SignInPage');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="w-full  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8 ">
            <Link to="/" className="flex items-center gap-2 select-none">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Tekunik Front</span>
            </Link>

          </div>
          <div className="hidden md:flex  items-center gap-6  ">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/templates" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Templates
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Services
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Link
                to="/builder"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors hidden sm:block"
              >
                Go to Builder
              </Link>
            )}
            <button
              onClick={handleAuthAction}
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {isAuthenticated ? 'Sign Out' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
