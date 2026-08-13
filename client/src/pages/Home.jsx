import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, UserCheck, Users, Briefcase, Clock, DollarSign, FileText, BarChart3, UserPlus, Settings, Activity, TrendingUp, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Home = () => {
  useSEO({
    title: 'Smart Staff Management Software',
    description: 'StaffHub is an enterprise-grade workforce management platform offering smart scheduling, real-time attendance tracking, automated payroll, and actionable analytics. Streamline your HR operations today.',
    keywords: 'workforce management, hr software, attendance tracking, automated payroll, staff scheduling, staffhub'
  });

  const roles = [
    {
      name: 'Main Admin',
      icon: <ShieldCheck className="w-6 h-6" />,
      features: [
        'Register and manage companies',
        'Enable/disable company accounts',
        'View platform statistics',
        'Manage admin profile',
        'Monitor system activity'
      ]
    },
    {
      name: 'Company Account',
      icon: <Briefcase className="w-6 h-6" />,
      features: [
        'Register employees and supervisors',
        'Define salary structures',
        'View attendance records',
        'Generate salary and payslips',
        'Manage company profile'
      ]
    },
    {
      name: 'Supervisor',
      icon: <Users className="w-6 h-6" />,
      features: [
        'View assigned employees',
        'Mark daily attendance',
        'Update attendance records',
        'View attendance history',
        'Generate reports'
      ]
    },
    {
      name: 'Employee',
      icon: <UserCheck className="w-6 h-6" />,
      features: [
        'View personal attendance',
        'View salary and payslips',
        'View documents',
        'Update profile information',
        'Download reports'
      ]
    }
  ];

  const coreTools = [
    { title: 'Attendance Tracking', desc: 'Real-time attendance monitoring with detailed history and exportable reporting.', icon: <Clock className="w-8 h-8 text-theme-secondary" /> },
    { title: 'Salary Management', desc: 'Automated salary calculations, payslip generation and export-ready files.', icon: <DollarSign className="w-8 h-8 text-theme-primary" /> },
    { title: 'Document Management', desc: 'Store, tag and grant access to employee documents securely.', icon: <FileText className="w-8 h-8 text-theme-secondary" /> },
    { title: 'Advanced Analytics', desc: 'Dashboards, trends, and insights for smarter decisions.', icon: <BarChart3 className="w-8 h-8 text-theme-primary" /> }
  ];

  const onboardingSteps = [
    { title: 'Create account', desc: 'Sign up and configure your organization in minutes — quick setup for immediate use.', icon: <UserPlus className="w-6 h-6 text-white" />, color: 'bg-theme-primary' },
    { title: 'Tailor settings', desc: 'Add teams, roles and payroll rules so the platform matches how your organization operates.', icon: <Settings className="w-6 h-6 text-white" />, color: 'bg-theme-secondary' },
    { title: 'Start tracking', desc: 'Capture attendance, monitor shifts and keep accurate records — real-time and historical.', icon: <Activity className="w-6 h-6 text-white" />, color: 'bg-theme-primary' },
    { title: 'Act on insights', desc: 'Use dashboards and reports to optimize staffing, reduce costs and scale with confidence.', icon: <TrendingUp className="w-6 h-6 text-white" />, color: 'bg-theme-secondary' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <HeroBanner />

      {/* Role-based access control Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Powerful features for every role</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Role-based access control ensures every user sees the right tools and information to manage work effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 relative z-10">
            {roles.map((role, idx) => (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02, rotateX: 2, rotateY: -2 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                style={{ perspective: 1000 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-theme-primary/20 transition-all flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-theme-primary/10 flex items-center justify-center mb-6 text-theme-primary shadow-inner">
                  {role.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{role.name}</h3>
                <ul className="flex flex-col space-y-4 flex-grow">
                  {role.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-3">
                      <ShieldCheck className="w-5 h-5 text-theme-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-medium text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Tools Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Everything you need in one place</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to manage your entire workforce — from attendance to payroll and analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreTools.map((tool, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-theme-primary/5 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Steps Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Get your team moving — simple, fast, visual</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From setup to insight — four focused actions that get your workforce productive quickly.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {onboardingSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.02, rotateX: 5, rotateY: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  style={{ perspective: 1000 }}
                  className="flex flex-col items-center text-center group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-theme-primary/20 transition-all"
                >
                  <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-xl shadow-${step.color}/40 transform group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow">{step.desc}</p>
                  <a href="#" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-50 text-theme-primary font-bold text-sm hover:bg-theme-primary hover:text-white transition-colors w-full">
                    Learn more <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
