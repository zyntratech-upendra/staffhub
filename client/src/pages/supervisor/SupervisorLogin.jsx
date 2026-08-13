import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import useSEO from '../../hooks/useSEO';

const SupervisorLogin = () => {
  useSEO({
    title: 'Supervisor Login',
    description: 'StaffHub Supervisor Portal Login. Access your dashboard to oversee employee shifts, approve timesheets, manage daily attendance, and track team performance.',
    keywords: 'supervisor login, staffhub supervisor, team management, track attendance, approve timesheets'
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/supervisor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('supervisorToken', data.token);
        navigate('/supervisor/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow bg-gray-50 flex items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0e3d79]/5 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/5 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#0e3d79] tracking-tight mb-2">Supervisor Portal</h1>
            <p className="text-gray-500 font-medium text-sm">Welcome back! Please login to your account.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 rounded-2xl text-sm font-semibold flex items-center"
            >
              <span className="mr-2">⚠️</span>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200/60 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0e3d79]/20 focus:border-[#0e3d79] transition-all outline-none"
                  placeholder="supervisor@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <Link to="/supervisor/forgot-password" className="text-xs font-bold text-[#0e3d79] hover:text-[#1553a1] transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200/60 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0e3d79]/20 focus:border-[#0e3d79] transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-[#0e3d79]/20 text-sm font-bold text-white bg-gradient-to-r from-[#0e3d79] to-[#1553a1] hover:from-[#1553a1] hover:to-[#0e3d79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0e3d79] transition-all hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
        <div className="text-center mt-6">
           <p className="text-xs text-gray-500 font-medium">StaffHub © 2026. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SupervisorLogin;
