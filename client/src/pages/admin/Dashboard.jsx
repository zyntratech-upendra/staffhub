import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back. This dashboard is ready for integration.</p>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 border-dashed shadow-sm flex flex-col items-center justify-center p-12 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Data Available</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          The dashboard widgets have been cleared. This space is now ready to be connected to the official backend endpoints to display live data.
        </p>
      </div>

    </div>
  );
};

export default Dashboard;
