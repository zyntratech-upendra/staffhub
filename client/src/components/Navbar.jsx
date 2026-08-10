import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glassmorphism py-2' : 'bg-transparent py-3'}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <motion.img 
                src="/logo.png" 
                alt="StaffHub Logo" 
                className="h-10 md:h-12 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </div>
          
          {/* Navlinks - Middle */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-medium transition-colors hover:text-theme-primary ${
                  location.pathname === link.path ? 'text-theme-primary' : 'text-gray-600'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-theme-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Action & Mobile Toggle - Right */}
          <div className="flex items-center space-x-4">
            <div className="relative group hidden md:inline-block">
              <button className="inline-flex items-center px-6 py-2 rounded-lg bg-theme-primary text-white font-bold hover:bg-opacity-90 transition-all shadow-md">
                Login
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                  <Link to="/login/employee" className="block px-4 py-3 text-sm text-gray-700 font-medium hover:bg-theme-primary/10 hover:text-theme-primary transition-colors">
                    Employee Login
                  </Link>
                  <Link to="/login/supervisor" className="block px-4 py-3 text-sm text-gray-700 font-medium hover:bg-theme-primary/10 hover:text-theme-primary transition-colors">
                    Supervisor Login
                  </Link>
                  <Link to="/login/consultant" className="block px-4 py-3 text-sm text-gray-700 font-medium hover:bg-theme-primary/10 hover:text-theme-primary transition-colors">
                    Consultant Login
                  </Link>
                  <Link to="/admin/login" className="block px-4 py-3 text-sm font-bold text-theme-primary bg-theme-primary/5 hover:bg-theme-primary/10 transition-colors border-t border-gray-50 flex items-center justify-between">
                    <span>Admin Portal</span>
                    <ShieldCheck className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full glassmorphism mt-2"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path ? 'bg-gray-50 text-theme-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
