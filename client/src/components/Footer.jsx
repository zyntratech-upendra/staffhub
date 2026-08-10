import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Rocket className="w-6 h-6 text-theme-primary" />
              <span className="text-xl font-bold text-gray-900">Staff<span className="text-theme-primary">Hub</span></span>
            </Link>
            <p className="text-gray-900 font-medium mb-2">Workforce made simple</p>
            <p className="text-gray-600 text-sm mb-6">
              Trusted attendance, payroll and analytics tools for institutions and small businesses. Built to scale and easy to manage.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-theme-primary" />
                <span>hello@staffhub.example</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-theme-primary" />
                <span>+91 12 3456 7890</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-600 hover:text-theme-primary text-sm transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-theme-primary text-sm transition-colors">How it works</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-theme-primary text-sm transition-colors">Pricing</Link></li>
              <li><Link to="/integrations" className="text-gray-600 hover:text-theme-primary text-sm transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-theme-primary text-sm transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-theme-primary text-sm transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-theme-primary text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-theme-primary text-sm transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Subscribe</h3>
            <p className="text-gray-600 text-sm mb-4">Get the latest updates right in your inbox.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-50 text-gray-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary border border-gray-200"
              />
              <button 
                type="submit" 
                className="bg-theme-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-opacity-90 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} StaffHub. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <a href="#" className="text-gray-600 hover:text-theme-primary">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-theme-primary">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
