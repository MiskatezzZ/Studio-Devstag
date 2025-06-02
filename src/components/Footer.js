"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-10 mt-20 border-t border-white/10 backdrop-blur-lg bg-gradient-to-b from-[#0A0F2C]/80 to-[#4B0082]/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-0"
          >
            <div className="flex items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                DevStag Studio
              </h2>
            </div>
            <p className="text-white/60 mt-2 text-sm">
              © {currentYear} DevStag Studio. All rights reserved.
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
          >
            <div>
              <h3 className="text-white font-semibold mb-3">Services</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300">Web Design</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300">Development</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300">Branding</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300">About</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300">Portfolio</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300">Contact</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold mb-3">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                  <span className="text-white">X</span>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                  <span className="text-white">IG</span>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                  <span className="text-white">LI</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 pt-6 border-t border-white/5 text-center text-white/40 text-sm"
        >
          <p>Designed with passion by DevStag Studio</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
