import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Key, Save } from 'lucide-react';

const Profile = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // In a real app, this might come from a global state or context
    const fetchAdmin = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setAdmin(data);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchAdmin();
  }, []);

  if (!admin) {
    return <div className="p-8 text-gray-500">Loading profile...</div>;
  }

  const initials = admin.email ? admin.email.substring(0, 2).toUpperCase() : 'AD';

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Admin Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information and security preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-theme-primary/5 px-8 py-6 border-b border-gray-100 flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-theme-primary flex items-center justify-center text-white font-bold text-3xl shadow-md border-4 border-white">
            {initials}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{admin.email}</h2>
            <div className="flex items-center mt-1 space-x-2 text-theme-primary">
              <Shield className="w-4 h-4" />
              <span className="font-medium text-sm">{admin.role}</span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  disabled
                  value={admin.email}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 sm:text-sm"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Email cannot be changed directly.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  disabled
                  value={admin.role}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100 my-6" />

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Key className="w-5 h-5 mr-2 text-gray-400" />
              Change Password
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-theme-primary focus:border-theme-primary sm:text-sm transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-theme-primary focus:border-theme-primary sm:text-sm transition-colors"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="flex items-center px-6 py-2.5 bg-theme-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
                <Save className="w-4 h-4 mr-2" />
                Update Security Settings
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
