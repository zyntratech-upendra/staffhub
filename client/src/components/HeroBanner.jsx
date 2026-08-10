import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative bg-white overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Streamline your <br className="hidden lg:block"/>
              <span className="text-theme-primary">workforce</span> <span className="text-theme-secondary">management</span>
            </h1>
            
            <p className="mt-4 max-w-lg mx-auto lg:mx-0 text-lg md:text-xl text-gray-600 mb-8">
              Complete staffing solution with attendance tracking, payroll automation and role-based access — built to free up administrators to focus on what matters.
            </p>
          </motion.div>

          {/* Right Image/Mockup Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-theme-primary/10 rounded-full blur-3xl z-0"></div>
            
            <div className="relative z-10 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(5,54,123,0.1)] p-2">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Dashboard Mockup" 
                className="rounded-xl w-full object-cover h-[400px]"
              />
              {/* Floating UI Element */}
              <div className="absolute -left-10 top-1/4 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Attendance Logged</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
