import React from 'react';
import { motion } from 'framer-motion';

const EmployeeDashboard = () => {
  const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo') || '{}');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {employeeInfo.name?.split(' ')[0]} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here is what's happening with your tasks today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <h3 className="text-gray-500 text-sm font-semibold mb-1">Assigned Tasks</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-gray-900">0</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-50 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <h3 className="text-gray-500 text-sm font-semibold mb-1">Messages</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-gray-900">0</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <h3 className="text-gray-500 text-sm font-semibold mb-1">Documents</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-gray-900">0</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Assignments</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">Your supervisor hasn't assigned you any tasks yet. Check back later!</p>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
