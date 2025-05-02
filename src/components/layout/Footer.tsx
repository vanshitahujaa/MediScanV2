import React from 'react';
import { Heart, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} MediScan. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms of Service
            </a>
            <a 
              href="mailto:contact@mediscan.com" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
            >
              <Mail size={16} className="mr-1" />
              Contact
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
          Made with <Heart size={16} className="mx-1 text-red-500" /> for healthier medication management
        </div>
      </div>
    </footer>
  );
};

export default Footer;