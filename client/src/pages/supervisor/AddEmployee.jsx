import React, { useState, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft, UploadCloud, Camera, CheckCircle, Loader2, Save, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form Data State
  const [formData, setFormData] = useState({
    name: '', email: '', employeeId: '', phoneNumber: '', address: '',
    dob: '', gender: 'Male', qualifications: '', institutions: '', passingYear: '',
    skillType: 'Skilled', skills: '', experienceYears: '', previousRoles: '', previousSalary: ''
  });

  // Files State
  const [files, setFiles] = useState({ aadhaar: null, pan: null });
  const [photo, setPhoto] = useState(null);

  // Webcam Setup
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  }, [webcamRef]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Convert Base64 to File
  const dataURLtoFile = (dataurl, filename) => {
    if (!dataurl) return null;
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('supervisorToken')?.replace(/^"|"$/g, '');
      const submitData = new FormData();
      
      // Append text fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      // Append files
      if (files.aadhaar) submitData.append('aadhaar', files.aadhaar);
      if (files.pan) submitData.append('pan', files.pan);
      
      if (photo) {
        const photoFile = dataURLtoFile(photo, 'profile.jpg');
        submitData.append('profilePhoto', photoFile);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/supervisor/employees`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Employee created successfully! Login credentials and joining letter have been emailed.');
        setTimeout(() => {
          navigate('/supervisor/employees');
        }, 3000);
      } else {
        setError(data.message || 'Failed to create employee');
      }
    } catch (err) {
      setError('An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderStepIndicator = () => {
    const steps = ['Bio Data', 'Education', 'Documents', 'Photo', 'Preview'];
    return (
      <div className="flex justify-between items-center mb-8 px-4 sm:px-12 relative print:hidden">
        <div className="absolute left-10 right-10 top-1/2 h-1 bg-gray-200 -z-10 rounded-full"></div>
        <div 
          className="absolute left-10 top-1/2 h-1 bg-teal-500 -z-10 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 2.5rem)` }}
        ></div>
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md ${currentStep > index + 1 ? 'bg-teal-500 text-white' : currentStep === index + 1 ? 'bg-[#0e3d79] text-white ring-4 ring-[#0e3d79]/30' : 'bg-white text-gray-400 border-2 border-gray-200'}`}>
              {currentStep > index + 1 ? <CheckCircle size={18} /> : index + 1}
            </div>
            <span className={`mt-2 text-xs font-semibold ${currentStep >= index + 1 ? 'text-[#0e3d79]' : 'text-gray-400'}`}>{label}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h3 className="text-xl font-bold text-[#0e3d79] mb-4 border-b pb-2">Basic & Bio Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Employee ID</label>
                <input type="text" name="employeeId" value={formData.employeeId} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none resize-none" required />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h3 className="text-xl font-bold text-[#0e3d79] mb-4 border-b pb-2">Education & Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Highest Qualification</label>
                <input type="text" name="qualifications" value={formData.qualifications} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Institution</label>
                <input type="text" name="institutions" value={formData.institutions} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Passing Year</label>
                <input type="text" name="passingYear" value={formData.passingYear} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Skill Category</label>
                <select name="skillType" value={formData.skillType} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none">
                  <option>Skilled</option>
                  <option>Unskilled</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Skills (comma separated)</label>
                <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g., React, Node.js, Welding, Driving" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Experience (Years)</label>
                <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Previous Salary</label>
                <input type="number" name="previousSalary" value={formData.previousSalary} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Previous Roles/Companies</label>
                <textarea name="previousRoles" value={formData.previousRoles} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none resize-none" />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="text-xl font-bold text-[#0e3d79] mb-4 border-b pb-2">Identity Proofs</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden group hover:border-teal-400 transition-colors">
              <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-teal-500 mb-2 transition-colors" />
              <p className="font-semibold text-gray-700">Upload Aadhaar Card</p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
              <input type="file" name="aadhaar" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,image/*" />
              {files.aadhaar && <p className="mt-3 text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">{files.aadhaar.name}</p>}
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden group hover:border-teal-400 transition-colors">
              <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-teal-500 mb-2 transition-colors" />
              <p className="font-semibold text-gray-700">Upload PAN Card</p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
              <input type="file" name="pan" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,image/*" />
              {files.pan && <p className="mt-3 text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">{files.pan.name}</p>}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-[#0e3d79] mb-2 border-b pb-2 w-full text-left">Live Photo Capture</h3>
            
            {!photo ? (
              <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg border-4 border-[#0e3d79]/10">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-auto"
                />
                <button 
                  onClick={capture}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-[#0e3d79] p-4 rounded-full shadow-xl hover:scale-105 transition-transform"
                >
                  <Camera size={24} />
                </button>
              </div>
            ) : (
              <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg border-4 border-teal-500/30">
                <img src={photo} alt="Captured" className="w-full h-auto" />
                <button 
                  onClick={() => setPhoto(null)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-red-500 px-6 py-2 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
                >
                  Retake Photo
                </button>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4 text-center max-w-md">Please ensure the employee's face is clearly visible in the frame before capturing.</p>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 print-container">
            <div className="flex justify-between items-center border-b pb-2 mb-4 print:border-b-2 print:border-gray-800">
              <h3 className="text-xl font-bold text-[#0e3d79] print:text-black">Preview & Summary</h3>
              <button onClick={handlePrint} className="print:hidden flex items-center space-x-2 text-[#0e3d79] hover:text-teal-600 font-bold transition-colors">
                <Printer size={18} /> <span>Print</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center justify-start space-y-4">
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-md">
                  {photo ? <img src={photo} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Photo</div>}
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-lg text-gray-800">{formData.name || 'N/A'}</h4>
                  <p className="text-sm font-semibold text-teal-600">{formData.employeeId || 'ID: N/A'}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">{formData.skillType}</span>
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-x-4 gap-y-3 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 print:bg-white print:border-none print:p-0">
                <div className="col-span-2 mb-2"><h5 className="font-bold text-gray-800 border-b pb-1 text-sm uppercase tracking-wider">Bio Data</h5></div>
                <div><span className="block text-xs text-gray-500 font-medium mb-0.5">Email</span><span className="font-semibold text-gray-800">{formData.email || '-'}</span></div>
                <div><span className="block text-xs text-gray-500 font-medium mb-0.5">Phone</span><span className="font-semibold text-gray-800">{formData.phoneNumber || '-'}</span></div>
                <div><span className="block text-xs text-gray-500 font-medium mb-0.5">DOB</span><span className="font-semibold text-gray-800">{formData.dob || '-'}</span></div>
                <div><span className="block text-xs text-gray-500 font-medium mb-0.5">Gender</span><span className="font-semibold text-gray-800">{formData.gender || '-'}</span></div>
                <div className="col-span-2"><span className="block text-xs text-gray-500 font-medium mb-0.5">Address</span><span className="font-semibold text-gray-800">{formData.address || '-'}</span></div>
                
                <div className="col-span-2 mt-4 mb-2"><h5 className="font-bold text-gray-800 border-b pb-1 text-sm uppercase tracking-wider">Education & Professional</h5></div>
                <div><span className="block text-xs text-gray-500 font-medium mb-0.5">Qualification</span><span className="font-semibold text-gray-800">{formData.qualifications || '-'}</span></div>
                <div><span className="block text-xs text-gray-500 font-medium mb-0.5">Institution</span><span className="font-semibold text-gray-800">{formData.institutions || '-'}</span></div>
                <div><span className="block text-xs text-gray-500 font-medium mb-0.5">Passing Year</span><span className="font-semibold text-gray-800">{formData.passingYear || '-'}</span></div>
                <div><span className="block text-xs text-gray-500 font-medium mb-0.5">Experience</span><span className="font-semibold text-gray-800">{formData.experienceYears ? `${formData.experienceYears} Years` : '-'}</span></div>
                <div className="col-span-2"><span className="block text-xs text-gray-500 font-medium mb-0.5">Skills</span><span className="font-semibold text-gray-800">{formData.skills || '-'}</span></div>
                
                <div className="col-span-2 mt-4 mb-2"><h5 className="font-bold text-gray-800 border-b pb-1 text-sm uppercase tracking-wider">Documents Attached</h5></div>
                <div className="col-span-2 flex space-x-4">
                  <div className="flex items-center space-x-2"><CheckCircle size={16} className={files.aadhaar ? "text-green-500" : "text-gray-300"} /> <span className="text-sm font-semibold">Aadhaar Card</span></div>
                  <div className="flex items-center space-x-2"><CheckCircle size={16} className={files.pan ? "text-green-500" : "text-gray-300"} /> <span className="text-sm font-semibold">PAN Card</span></div>
                </div>
              </div>
            </div>
            
            {error && <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl font-medium border border-red-100 print:hidden">{error}</div>}
            {success && <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl font-medium border border-green-100 print:hidden">{success}</div>}
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full min-h-screen">
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white p-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-10 print:mb-6">
          <h1 className="text-3xl font-extrabold text-[#0e3d79] tracking-tight mb-2">Register New Employee</h1>
          <p className="text-gray-500 font-medium print:hidden">Complete the multi-step form to add an employee to the system</p>
        </div>

        {renderStepIndicator()}

        {/* Form Container */}
        <div className="min-h-[400px] mb-8">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-6 print:hidden">
          <button
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </button>
          
          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#0e3d79] to-[#1553a1] hover:from-[#1553a1] hover:to-[#0e3d79] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#0e3d79]/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Next Step</span>
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || success}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/30 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Saving Profile...</>
              ) : (
                <><Save size={18} /> <span>Submit & Email Credentials</span></>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
          .print-container { width: 100% !important; margin: 0 !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default AddEmployee;
