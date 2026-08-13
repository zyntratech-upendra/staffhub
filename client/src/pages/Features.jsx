import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Globe, TrendingUp, Search } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Features = () => {
  useSEO({
    title: 'Powerful Workforce Management Features',
    description: "Explore StaffHub's comprehensive suite of features. From GPS-enabled attendance tracking and role-based access control to automated payroll generation and advanced data analytics.",
    keywords: 'staffhub features, attendance tracking, payroll management, advanced analytics, role-based access'
  });

  const features = [
    { icon: <Search className="w-8 h-8 text-theme-primary" />, title: 'Smart Search', desc: 'AI-powered matching to find the perfect candidate.' },
    { icon: <Zap className="w-8 h-8 text-theme-secondary" />, title: 'Fast Onboarding', desc: 'Get your new hires up to speed in record time.' },
    { icon: <Globe className="w-8 h-8 text-theme-primary" />, title: 'Global Reach', desc: 'Access a worldwide pool of exceptional talent.' },
    { icon: <Shield className="w-8 h-8 text-theme-secondary" />, title: 'Verified Profiles', desc: 'Every candidate goes through a rigorous background check.' },
    { icon: <Users className="w-8 h-8 text-theme-primary" />, title: 'Team Fit', desc: 'Cultural alignment assessments ensure long-term success.' },
    { icon: <TrendingUp className="w-8 h-8 text-theme-secondary" />, title: 'Analytics', desc: 'Track hiring metrics and optimize your recruitment process.' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary">Features</span>
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to build a world-class team, all in one intuitive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glassmorphism p-8 rounded-2xl hover:shadow-[0_0_20px_rgba(102,252,241,0.2)] transition-shadow duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-theme-primary/10 to-theme-secondary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
              <div className="relative z-10">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
