import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Briefcase, GraduationCap, FileText, Calendar, Loader2, Award, Mail, ExternalLink } from 'lucide-react';

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem('employeeToken')?.replace(/^"|"$/g, '');
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/employee/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center font-semibold">
        {error}. Please try logging in again.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto w-full pb-10">
      {/* Header & Profile Summary */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0e3d79]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Picture */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex-shrink-0 flex items-center justify-center relative group">
            {employee.profilePhotoUrl ? (
              <img src={employee.profilePhotoUrl} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : (
              <User className="w-16 h-16 text-gray-300" />
            )}
          </div>
          
          {/* Main Info */}
          <div className="flex-1 text-center md:text-left mt-2">
            <h1 className="text-3xl font-extrabold text-[#0e3d79] tracking-tight">{employee.name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
              <span className="px-3 py-1 bg-[#0e3d79]/10 text-[#0e3d79] font-bold text-sm rounded-full tracking-wide">ID: {employee.employeeId}</span>
              <span className={`px-3 py-1 font-bold text-sm rounded-full tracking-wide ${employee.skillType === 'Skilled' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'}`}>
                {employee.skillType || 'Unskilled'} Worker
              </span>
            </div>
            
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 font-medium">
              <div className="flex items-center justify-center md:justify-start gap-2"><Mail size={16} className="text-gray-400" /> {employee.email}</div>
              <div className="flex items-center justify-center md:justify-start gap-2"><Phone size={16} className="text-gray-400" /> {employee.phoneNumber || 'Not provided'}</div>
              <div className="flex items-center justify-center md:justify-start gap-2"><Calendar size={16} className="text-gray-400" /> DOB: {employee.dob || 'Not provided'}</div>
              <div className="flex items-center justify-center md:justify-start gap-2"><MapPin size={16} className="text-gray-400" /> {employee.address || 'Not provided'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Education & Experience */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Education Block */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-7 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><GraduationCap size={24} /></div>
              <h2 className="text-xl font-bold text-gray-900">Educational Background</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Highest Qualification</p>
                <p className="font-bold text-gray-900 text-lg">{employee.qualifications || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Institution</p>
                <p className="font-bold text-gray-900 text-lg">{employee.institutions || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Passing Year</p>
                <p className="font-bold text-gray-900 text-lg">{employee.passingYear || 'N/A'}</p>
              </div>
            </div>
          </motion.div>

          {/* Professional Experience Block */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-7 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Briefcase size={24} /></div>
              <h2 className="text-xl font-bold text-gray-900">Professional Experience</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Total Experience</p>
                  <p className="font-bold text-gray-900 text-lg">{employee.experienceYears ? `${employee.experienceYears} Years` : 'Fresher'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Previous Salary</p>
                  <p className="font-bold text-gray-900 text-lg">{employee.previousSalary ? `₹${employee.previousSalary}` : 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">Technical Skills</p>
                <div className="flex flex-wrap gap-2">
                  {employee.skills && employee.skills.length > 0 ? (
                    employee.skills.map((skill, idx) => (
                      <span key={idx} className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg">{skill}</span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-sm">No specific skills listed.</span>
                  )}
                </div>
              </div>

              {employee.previousRoles && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Previous Roles & Companies</p>
                  <p className="font-medium text-gray-800 bg-gray-50 p-4 rounded-xl text-sm leading-relaxed border border-gray-100">
                    {employee.previousRoles}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Documents */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-7 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6 border-b pb-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl"><FileText size={24} /></div>
              <h2 className="text-xl font-bold text-gray-900">Identity Proofs</h2>
            </div>
            
            <div className="space-y-4">
              {employee.aadhaarUrl ? (
                <a href={employee.aadhaarUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-teal-50 border border-gray-100 hover:border-teal-200 rounded-xl transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-400 group-hover:text-teal-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-teal-800 text-sm">Aadhaar Card</p>
                      <p className="text-xs text-gray-500">Verified Document</p>
                    </div>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 group-hover:text-teal-500" />
                </a>
              ) : (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center border border-red-100">Aadhaar Card not uploaded</div>
              )}

              {employee.panUrl ? (
                <a href={employee.panUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-teal-50 border border-gray-100 hover:border-teal-200 rounded-xl transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-400 group-hover:text-teal-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-teal-800 text-sm">PAN Card</p>
                      <p className="text-xs text-gray-500">Verified Document</p>
                    </div>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 group-hover:text-teal-500" />
                </a>
              ) : (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center border border-red-100">PAN Card not uploaded</div>
              )}
            </div>
          </motion.div>

          {/* Quick Stats / Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-[#0e3d79] to-[#1553a1] rounded-3xl shadow-xl p-7 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
            <Award className="w-12 h-12 text-white/20 absolute bottom-4 right-4" />
            
            <h3 className="text-lg font-bold mb-1 opacity-90">Employment Status</h3>
            <p className="text-sm text-blue-100 mb-6">You are currently active and ready for assignments.</p>
            
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold mb-1">Supervisor</p>
              <p className="font-bold">Assigned System Admin</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
