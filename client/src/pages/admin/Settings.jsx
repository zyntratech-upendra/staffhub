import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database, Globe, Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
          <SettingsIcon className="w-6 h-6 mr-3 text-theme-primary" />
          System Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">Configure global platform preferences and system behaviors.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <button className="w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl bg-theme-primary/5 text-theme-primary border-l-4 border-theme-primary transition-colors">
            <Globe className="w-5 h-5 mr-3" />
            General
          </button>
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent transition-colors">
            <Shield className="w-5 h-5 mr-3" />
            Security & Roles
          </button>
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent transition-colors">
            <Bell className="w-5 h-5 mr-3" />
            Notifications
          </button>
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent transition-colors">
            <Database className="w-5 h-5 mr-3" />
            Database Backups
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          
          <h2 className="text-lg font-bold text-gray-900 mb-6">General Preferences</h2>
          
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="platform-name" className="block text-sm font-bold text-gray-700">
                  Platform Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="platform-name"
                    id="platform-name"
                    defaultValue="StaffHub Staffing"
                    className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-theme-primary focus:ring-theme-primary sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="timezone" className="block text-sm font-bold text-gray-700">
                  Default Timezone
                </label>
                <div className="mt-2">
                  <select
                    id="timezone"
                    name="timezone"
                    className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-theme-primary focus:ring-theme-primary sm:text-sm"
                  >
                    <option>Asia/Kolkata (IST)</option>
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>America/New_York (EST)</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="support-email" className="block text-sm font-bold text-gray-700">
                  Support Email Address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="support-email"
                    id="support-email"
                    defaultValue="support@staffhub.com"
                    className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-theme-primary focus:ring-theme-primary sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">This email will be displayed to users in the help center.</p>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">Features Toggle</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="registrations"
                      name="registrations"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-theme-primary focus:ring-theme-primary"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="registrations" className="font-bold text-gray-700">Allow New Company Registrations</label>
                    <p className="text-gray-500">If disabled, new companies cannot sign up through the public portal.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="maintenance"
                      name="maintenance"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-theme-primary focus:ring-theme-primary"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="maintenance" className="font-bold text-red-600">Maintenance Mode</label>
                    <p className="text-gray-500">When active, only SuperAdmins can access the platform.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button className="flex items-center px-6 py-2.5 bg-theme-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
