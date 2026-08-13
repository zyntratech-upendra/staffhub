import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Bell, Search, LayoutDashboard, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  const menuItems = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: <LayoutDashboard size={20} /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('employeeToken');
    const employeeData = localStorage.getItem('employeeInfo');
    
    if (!token || !employeeData) {
      navigate('/employee/login');
    } else {
      setEmployee(JSON.parse(employeeData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('employeeToken');
    localStorage.removeItem('employeeInfo');
    navigate('/employee/login');
  };

  if (!employee) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0e3d79] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <Link to="/employee/dashboard" className="flex items-center space-x-2">
            <img src="/logo.png" alt="StaffHub" className={`h-8 w-auto ${!isSidebarOpen && !isMobile ? 'mx-auto' : ''}`} style={{ filter: 'brightness(0) invert(1)' }} />
          </Link>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} className="text-white/70 hover:text-white">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center ${!isSidebarOpen && !isMobile ? 'justify-center' : 'px-4'} py-3 rounded-xl transition-all duration-200 group ${
                location.pathname === item.path
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className={`${location.pathname === item.path ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                {item.icon}
              </div>
              {(isSidebarOpen || isMobile) && (
                <span className="ml-3 text-sm font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`flex items-center ${!isSidebarOpen && !isMobile ? 'justify-center' : 'px-4'} py-3 w-full rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all duration-200`}
          >
            <LogOut size={20} className="text-white/60 group-hover:text-white" />
            {(isSidebarOpen || isMobile) && <span className="ml-3 text-sm font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8fafc]">
        {/* Top Header */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0 shadow-sm">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 mr-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-[#0e3d79]/10 text-[#0e3d79] flex items-center justify-center font-bold text-sm shadow-sm border border-[#0e3d79]/20">
                {employee.name.charAt(0)}
              </div>
              <div className="ml-2.5 hidden md:block">
                <p className="text-sm font-bold text-gray-700 leading-tight group-hover:text-[#0e3d79] transition-colors">{employee.name}</p>
                <p className="text-xs text-gray-500 font-medium">Employee</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
