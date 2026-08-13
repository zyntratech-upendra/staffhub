import React, { useEffect, useState } from 'react';
import { Users, Building2, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">{title}</p>
        <h3 className={`text-3xl font-extrabold ${color}`}>{value}</h3>
      </div>
      <div className={`p-4 rounded-xl ${color.replace('text-', 'bg-').replace('600', '50')} ${color}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const SupervisorDashboard = () => {
  const [supervisor, setSupervisor] = useState(null);

  useEffect(() => {
    // In a real app, this might come from a context, but we can just parse it or fetch it again if needed.
    // For now, we'll just show a generic welcome if we don't have it, but SupervisorLayout already fetches it.
    // We could pass it down via context or outlet context.
  }, []);

  const stats = [
    { title: 'Total Teams', value: '12', icon: <Users size={24} />, color: 'text-[#0e3d79]' },
    { title: 'Active Projects', value: '34', icon: <Briefcase size={24} />, color: 'text-teal-600' },
    { title: 'Departments', value: '4', icon: <Building2 size={24} />, color: 'text-indigo-600' },
    { title: 'Performance', value: '92%', icon: <TrendingUp size={24} />, color: 'text-emerald-600' },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0e3d79] tracking-tight pb-1">Supervisor Dashboard</h1>
        <p className="text-gray-500 mt-1 font-medium text-sm">Welcome back to your command center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#0e3d79]/10 rounded-full flex items-center justify-center mx-auto mb-4">
             <LayoutDashboard size={32} className="text-[#0e3d79]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">More Features Coming Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto">This dashboard is currently under construction. Future updates will include team management, task assignments, and reporting metrics.</p>
        </div>
      </div>
    </div>
  );
};

// Need to import LayoutDashboard for the placeholder
import { LayoutDashboard } from 'lucide-react';

export default SupervisorDashboard;
