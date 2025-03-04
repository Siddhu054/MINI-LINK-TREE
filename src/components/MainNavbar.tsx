import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LinkIcon, Menu, X } from 'lucide-react';
import { User } from '../types';

interface MainNavbarProps {
  user: User | null;
  onLogout?: () => void;
}

const MainNavbar: React.FC<MainNavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (sectionId: string) => {
    if (isLandingPage) {
      // If on landing page, scroll to section
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // If not on landing page, navigate to landing page with section
      localStorage.setItem('lastSection', sectionId); // Save section to scroll to
      navigate('/', { replace: true }); // Use replace to prevent back button issues
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="bg-white/30 ml-2 mr-2 backdrop-blur-md shadow-sm fixed w-full rounded-2xl top-2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <LinkIcon className="h-8 w-8 text-indigo-600" />
            <Link to="/" className="ml-2 text-2xl font-bold text-gray-900">
              MiniLink
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('top')} 
              className={`text-gray-700 hover:text-indigo-600 ${location.pathname === '/' ? 'text-indigo-600' : ''}`}
            >
              Home
            </button>

            {/* Navigation Links */}
            <button 
              onClick={() => handleNavigation('features')} 
              className="text-gray-700 hover:text-indigo-600"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavigation('pricing')} 
              className="text-gray-700 hover:text-indigo-600"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavigation('testimonials')} 
              className="text-gray-700 hover:text-indigo-600"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleNavigation('contact')} 
              className="text-gray-700 hover:text-indigo-600"
            >
              Contact
            </button>

            {/* Auth buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link 
                    to="/app" 
                    className={`text-gray-700 hover:text-indigo-600 ${location.pathname.startsWith('/app') ? 'text-indigo-600' : ''}`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 px-2 pb-3">
              <button 
                onClick={() => handleNavigation('top')} 
                className={`text-left text-gray-700 hover:text-indigo-600 ${location.pathname === '/' ? 'text-indigo-600' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('features')} 
                className="text-left text-gray-700 hover:text-indigo-600"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavigation('pricing')} 
                className="text-left text-gray-700 hover:text-indigo-600"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavigation('testimonials')} 
                className="text-left text-gray-700 hover:text-indigo-600"
              >
                Testimonials
              </button>
              <button 
                onClick={() => handleNavigation('contact')} 
                className="text-left text-gray-700 hover:text-indigo-600"
              >
                Contact
              </button>
              {user ? (
                <>
                  <Link 
                    to="/app" 
                    className={`text-gray-700 hover:text-indigo-600 ${location.pathname.startsWith('/app') ? 'text-indigo-600' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;