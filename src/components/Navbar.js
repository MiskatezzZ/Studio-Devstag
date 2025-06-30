"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Premium Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center group">
            <div className="relative w-12 h-12 mr-3 overflow-hidden">
              <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="50%" stopColor="#4ECDC4" />
                    <stop offset="100%" stopColor="#1A535C" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <g filter="url(#glow)">
                  <path d="M25,5 L45,15 L45,35 L25,45 L5,35 L5,15 Z" fill="url(#logoGradient)" stroke="white" strokeWidth="0.5" strokeOpacity="0.8" />
                  <path d="M25,10 L38,17 L38,31 L25,38 L12,31 L12,17 Z" fill="black" fillOpacity="0.3" />
                  <path d="M18,18 L18,25 L22,25 L22,32 L32,32 L32,25 L28,25 L28,18 Z" fill="white" />
                </g>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-sm group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-tight font-montserrat">
                DEVSTAG
              </span>
              <span className="text-xs text-cyan-300/80 tracking-widest uppercase font-light">STUDIO</span>
            </div>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex space-x-12 absolute left-1/2 transform -translate-x-1/2"
        >
          <Link href="/" className="group relative">
            <span className="text-white group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300 text-sm uppercase tracking-wider font-montserrat">
              [  Home  ]
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-300 to-blue-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/about" className="group relative">
            <span className="text-white group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300 text-sm uppercase tracking-wider font-montserrat">
              [  About  ]
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-300 to-blue-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/services" className="group relative">
            <span className="text-white group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300 text-sm uppercase tracking-wider font-montserrat">
              [  Services  ]
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-300 to-blue-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/contact" className="group relative">
            <span className="text-white group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300 text-sm uppercase tracking-wider font-montserrat">
              [  Contact  ]
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-300 to-blue-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>
        
        {/* Right Icons */}
        {/* <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center space-x-6"
        >
          <button className="relative p-2 text-white/80 hover:text-white transition-colors duration-200 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur transition duration-200"></div>
            <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 group-hover:text-cyan-300 transition-colors duration-200" />
          </button>
          <button className="relative p-2 text-white/80 hover:text-white transition-colors duration-200 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur transition duration-200"></div>
            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 group-hover:text-cyan-300 transition-colors duration-200" />
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-[10px] font-bold text-white">3</span>
          </button>
        </motion.div> */}
        
        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden relative group"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-200"></div>
          <div className="relative p-2">
            <motion.div
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              className={`absolute inset-0 flex items-center justify-center ${!isOpen && 'pointer-events-none'}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-cyan-300 transition-colors duration-200">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <motion.div
              initial={false}
              animate={{ opacity: !isOpen ? 1 : 0, scale: !isOpen ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center justify-center ${isOpen && 'pointer-events-none'}`}
            >
              <div className="relative mr-2">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z" fill="url(#paint0_linear)" />
                  <path d="M25.5 18.5L16.5 27.5L10.5 21.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.5 14.5L16.5 20.5L25.5 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF7A00" />
                      <stop offset="1" stopColor="#FF4D00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.button>
        
        {/* Mobile Menu */}
        <motion.div 
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            height: isOpen ? 'auto' : 0,
            y: isOpen ? 0 : -10
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.23, 1, 0.32, 1],
            opacity: { duration: 0.2 }
          }}
          className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 overflow-hidden"
        >
          <div className="bg-black/80 backdrop-blur-xl py-6 px-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-xl"></div>
              
              {/* Menu items */}
              <div className="relative flex flex-col space-y-5 z-10">
                {/* Menu header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs uppercase tracking-widest text-white/60 font-montserrat">Navigation</h3>
                  <div className="h-px flex-grow ml-4 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                
                {/* Menu links */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.07 } },
                    hidden: {}
                  }}
                  className="flex flex-col space-y-4"
                >
                  {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
                    <motion.div
                      key={item}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <Link 
                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                        className="group flex items-center space-x-2 py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <span className="text-white group-hover:text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300 text-sm uppercase tracking-wider font-montserrat">
                          {item}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>
                
                {/* Icons section header */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs uppercase tracking-widest text-white/60 font-montserrat">Quick Access</h3>
                  <div className="h-px flex-grow ml-4 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                
                {/* Icons */}
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                    hidden: {}
                  }}
                  className="flex space-x-4 pt-2"
                >
                  <motion.button 
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative group p-2"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur transition duration-200"></div>
                    <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 group-hover:text-cyan-300 transition-colors duration-200" />
                  </motion.button>
                  <motion.button 
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative group p-2"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur transition duration-200"></div>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-cyan-300 transition-colors duration-200">
                      <path d="M9 22L12 20L15 22V18L19.2 15.2C19.6765 14.9333 20.0701 14.5557 20.3487 14.1003C20.6273 13.6449 20.7827 13.1272 20.8021 12.5956C20.8215 12.064 20.7043 11.5368 20.4624 11.0612C20.2204 10.5856 19.8616 10.1782 19.41 9.88L19.18 9.73L19.93 6.34C20.0432 5.78107 20.0115 5.20311 19.8379 4.66053C19.6644 4.11795 19.3543 3.62793 18.9367 3.23201C18.5191 2.83608 18.0078 2.54591 17.4536 2.38585C16.8994 2.22579 16.3176 2.20044 15.75 2.31L12.58 3.00996C12.3395 3.00338 12.0989 3.00002 11.8584 3.00002C9.71023 3.00002 7.64882 3.84287 6.11359 5.35361C4.57837 6.86436 3.72314 8.90266 3.71001 11.05C3.68989 13.7565 4.86723 16.3455 6.94001 18.15L9 20V22Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 11C7 11.7956 7.31607 12.5587 7.87868 13.1213C8.44129 13.6839 9.20435 14 10 14C10.7956 14 11.5587 13.6839 12.1213 13.1213C12.6839 12.5587 13 11.7956 13 11C13 10.2044 12.6839 9.44129 12.1213 8.87868C11.5587 8.31607 10.7956 8 10 8C9.20435 8 8.44129 8.31607 7.87868 8.87868C7.31607 9.44129 7 10.2044 7 11Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-[10px] font-bold text-white">3</span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
