import React, { useState, useEffect } from 'react';
import { Plus, Search, Mail, Loader2, X, Trash2, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SupervisorManagement = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/supervisors`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSupervisors(data);
      }
    } catch (err) {
      console.error('Error fetching supervisors', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingId 
        ? `${import.meta.env.VITE_API_URL}/admin/supervisors/${editingId}`
        : `${import.meta.env.VITE_API_URL}/admin/supervisors`;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (editingId) {
          setSupervisors(supervisors.map(s => s._id === editingId ? data : s));
        } else {
          setSupervisors([...supervisors, data]);
        }
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phoneNumber: '', address: '' });
        setEditingId(null);
      } else {
        setError(data.message || `Failed to ${editingId ? 'update' : 'create'} supervisor`);
      }
    } catch (err) {
      setError(`An error occurred while ${editingId ? 'updating' : 'creating'} supervisor`);
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (supervisor) => {
    setEditingId(supervisor._id);
    setFormData({
      name: supervisor.name,
      email: supervisor.email,
      phoneNumber: supervisor.phoneNumber || '',
      address: supervisor.address || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this supervisor?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/supervisors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setSupervisors(supervisors.filter(s => s._id !== id));
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete supervisor');
      }
    } catch (err) {
      console.error('Error deleting supervisor', err);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full">
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0e3d79] tracking-tight pb-1">Supervisor Management</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">Manage supervisors and their access</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', email: '', phoneNumber: '', address: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#0e3d79] to-[#1553a1] hover:from-[#1553a1] hover:to-[#0e3d79] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-[#0e3d79]/30 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
        >
          <Plus size={18} />
          <span>Add Supervisor</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {supervisors.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium">
                      No supervisors found.
                    </td>
                  </tr>
                ) : (
                  supervisors.map((supervisor) => (
                    <tr key={supervisor._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-600">{supervisor.supervisorId || '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{supervisor.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-500 text-sm font-medium">
                          <Mail size={14} className="mr-2" />
                          {supervisor.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-500 text-sm font-medium">{supervisor.phoneNumber || '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700">
                          {supervisor.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button onClick={() => handleEdit(supervisor)} className="text-gray-400 hover:text-teal-600 transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(supervisor._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Slide-over Panel */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white/70 backdrop-blur-2xl border-l border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] w-full max-w-lg h-full relative z-10 overflow-y-auto flex flex-col"
            >
              <div className="p-6 border-b border-gray-200/50 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Supervisor' : 'Add New Supervisor'}</h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">{editingId ? 'Update supervisor details.' : 'They will receive an email with login credentials.'}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl focus:bg-white/80 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/50 outline-none transition-all font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl focus:bg-white/80 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/50 outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl focus:bg-white/80 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/50 outline-none transition-all font-medium"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Address</label>
                    <textarea
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/50 border border-gray-200/50 rounded-xl focus:bg-white/80 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/50 outline-none transition-all font-medium resize-none"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200/50 flex items-center justify-end space-x-3 mb-6">
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex items-center justify-center bg-[#0e3d79] hover:bg-[#1553a1] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-[#0e3d79]/20 transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {creating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      editingId ? 'Update Supervisor' : 'Create Supervisor'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupervisorManagement;
