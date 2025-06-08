"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative w-full pt-0 pb-10 mt-0 backdrop-blur-lg overflow-hidden" style={{ padding: '50px', background: '#000000' }} >
      {/* Top radial gradient to blend with testimonial section */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '-34vw',
        transform: 'translateX(-50%)',
        width: '44vw',
        height: '44vw',
        pointerEvents: 'none',
        zIndex: 1,
        background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)'
      }} />
      <div className="relative z-10 container mx-auto px-4">
        <div className="relative flex flex-col md:flex-row md:justify-start md:items-start justify-between items-center gap-12 w-full">
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
            className="grid grid-cols-2 md:grid-cols-3 gap-50 md:ml-90"
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
            
            <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-end md:absolute md:right-0 md:top-0" >
              <h3 className="text-white font-semibold mb-3">Connect</h3>
              {/* Reserve space for FloatingDock at max hover size so layout never shifts */}
              <div className="w-full max-w-xs h-32 flex items-center justify-center">
                <FloatingDock
                  items={[
                    {
                      title: "GitHub",
                      icon: <IconBrandGithub className="w-6 h-6 text-white" />,
                      href: "https://github.com/",
                    },
                    {
                      title: "LinkedIn",
                      icon: <IconBrandLinkedin className="w-6 h-6 text-white" />,
                      href: "https://linkedin.com/",
                    },
                    {
                      title: "Email",
                      icon: <IconMail className="w-6 h-6 text-white" />,
                      href: "mailto:hello@example.com",
                    },
                  ]}
                  desktopClassName="bg-[#18181b] border border-white/10 shadow-lg w-full"
                  mobileClassName="bg-[#18181b] border border-white/10 shadow-lg w-full"
                  maxIconSize={56}
                  minIconSize={32}
                />
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
