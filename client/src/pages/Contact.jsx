import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Contact = () => {
  useSEO({
    title: 'Contact Our Sales & Support Team',
    description: 'Contact the StaffHub team for enterprise sales inquiries, technical support, or partnership opportunities. Let us help you transform your workforce management.',
    keywords: 'contact staffhub, hr software support, enterprise sales, workforce management partnership'
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in <span className="text-theme-primary">Touch</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to transform your workforce? Contact us today and let's start a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="glassmorphism p-8 md:p-12 rounded-3xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                  <input type="text" className="w-full bg-gray-50/50 border border-theme-primary/20 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-gray-50/50 border border-theme-primary/20 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                <input type="email" className="w-full bg-gray-50/50 border border-theme-primary/20 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Message</label>
                <textarea rows="4" className="w-full bg-gray-50/50 border border-theme-primary/20 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-colors" placeholder="How can we help you?"></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-theme-primary to-theme-secondary text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-theme-primary/30 transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center space-y-12 pl-0 lg:pl-12"
          >
            <div className="flex items-start space-x-6">
              <div className="w-14 h-14 rounded-full bg-theme-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-theme-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">hello@staffinghub.com</p>
                <p className="text-gray-600">support@staffinghub.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-14 h-14 rounded-full bg-theme-secondary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-theme-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">Mon-Fri, 9am - 6pm EST</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-14 h-14 rounded-full bg-theme-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-theme-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600">123 Innovation Drive</p>
                <p className="text-gray-600">Tech Valley, CA 94043</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
