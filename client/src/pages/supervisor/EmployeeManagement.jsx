import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Loader2, Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    phoneNumber: '',
    address: ''
  });
  
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('supervisorToken')?.replace(/^"|"$/g, '');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/supervisor/employees`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (employee = null) => {
    if (employee) {
      setCurrentEmployee(employee);
      setFormData({
        name: employee.name,
        email: employee.email,
        employeeId: employee.employeeId,
        phoneNumber: employee.phoneNumber || '',
        address: employee.address || ''
      });
    } else {
      setCurrentEmployee(null);
      setFormData({
        name: '',
        email: '',
        employeeId: '',
        phoneNumber: '',
        address: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const token = localStorage.getItem('supervisorToken')?.replace(/^"|"$/g, '');
    
    try {
      const url = currentEmployee 
        ? `${import.meta.env.VITE_API_URL}/supervisor/employees/${currentEmployee._id}`
        : `${import.meta.env.VITE_API_URL}/supervisor/employees`;
        
      const method = currentEmployee ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Action failed');
      }

      await fetchEmployees();
      closeModal();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (employee) => {
    setCurrentEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setActionLoading(true);
    const token = localStorage.getItem('supervisorToken')?.replace(/^"|"$/g, '');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/supervisor/employees/${currentEmployee._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete employee');

      await fetchEmployees();
      setIsDeleteModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0e3d79] tracking-tight pb-1">Employee Management</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">Manage your team members and access credentials.</p>
        </div>
        <button 
          onClick={() => navigate('/supervisor/employees/add')}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#0e3d79] to-[#1553a1] hover:from-[#1553a1] hover:to-[#0e3d79] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-[#0e3d79]/30 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
        >
          <Plus size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search employees..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3d79]/20 focus:border-[#0e3d79] bg-white/50 transition-all text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-[#0e3d79]" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8 font-medium bg-red-50 rounded-xl border border-red-100">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-semibold text-gray-600">Employee</th>
                  <th className="pb-3 text-sm font-semibold text-gray-600">ID</th>
                  <th className="pb-3 text-sm font-semibold text-gray-600">Contact</th>
                  <th className="pb-3 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">No employees found.</td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#0e3d79]/10 flex items-center justify-center text-[#0e3d79] font-bold">
                            {emp.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                            <p className="text-xs text-gray-500">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {emp.employeeId}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="text-sm text-gray-600">{emp.phoneNumber || 'N/A'}</div>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => openModal(emp)}
                          className="text-gray-400 hover:text-[#0e3d79] transition-colors p-2"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(emp)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2 ml-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={closeModal}
            />
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-xl relative z-10"
              >
                <div className="h-full flex flex-col bg-white/95 backdrop-blur-3xl border-l border-gray-200 shadow-[0_0_60px_rgba(0,0,0,0.2)]">
                  <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white/80 backdrop-blur-xl shrink-0">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{currentEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
                    <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors shadow-sm border border-gray-200">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <form onSubmit={handleSubmit} className="p-7 flex flex-col min-h-full">
                      <div className="space-y-5 flex-1">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                          <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0e3d79] focus:ring-4 focus:ring-[#0e3d79]/10 text-sm font-medium transition-all shadow-sm placeholder-gray-400 text-gray-900" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0e3d79] focus:ring-4 focus:ring-[#0e3d79]/10 text-sm font-medium transition-all shadow-sm placeholder-gray-400 text-gray-900" placeholder="john@example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Employee ID</label>
                          <input type="text" name="employeeId" required value={formData.employeeId} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0e3d79] focus:ring-4 focus:ring-[#0e3d79]/10 text-sm font-medium transition-all shadow-sm placeholder-gray-400 text-gray-900" placeholder="EMP-001" />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone (Optional)</label>
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0e3d79] focus:ring-4 focus:ring-[#0e3d79]/10 text-sm font-medium transition-all shadow-sm placeholder-gray-400 text-gray-900" placeholder="+1 234 567 890" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address (Optional)</label>
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0e3d79] focus:ring-4 focus:ring-[#0e3d79]/10 text-sm font-medium transition-all shadow-sm placeholder-gray-400 text-gray-900" placeholder="City, Country" />
                          </div>
                        </div>
                        {!currentEmployee && (
                          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100/60 rounded-2xl p-5 mt-6 flex items-start shadow-sm">
                            <div className="bg-white rounded-full p-2.5 shadow-sm mr-4 flex-shrink-0 mt-0.5 text-blue-600 border border-blue-100">
                              <Mail className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[15px] font-bold text-gray-900 mb-1">Automated Credentials</p>
                              <p className="text-sm text-gray-600 leading-relaxed">An email with secure login credentials will be automatically generated and sent to this employee upon creation.</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-8 flex justify-end pt-6 border-t border-gray-100 shrink-0 sticky bottom-0 bg-white/90 backdrop-blur-xl -mx-7 -mb-7 px-7 pb-7 pt-5">
                        <button type="submit" disabled={actionLoading} className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0e3d79] to-[#1553a1] hover:from-[#1553a1] hover:to-[#0e3d79] rounded-xl transition-all shadow-lg shadow-[#0e3d79]/25 flex items-center min-w-[140px] justify-center w-full sm:w-auto hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                          {actionLoading ? <Loader2 size={18} className="animate-spin" /> : currentEmployee ? 'Save Changes' : 'Add Employee'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm relative z-10 overflow-hidden p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Employee</h3>
              <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete <strong>{currentEmployee?.name}</strong>? This action cannot be undone.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors w-full">Cancel</button>
                <button onClick={handleDelete} disabled={actionLoading} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors w-full flex items-center justify-center">
                  {actionLoading ? <Loader2 size={16} className="animate-spin" /> : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeManagement;
