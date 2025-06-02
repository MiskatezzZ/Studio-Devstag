"use client";

import { motion } from "framer-motion";
import ImmersiveLayout from "@/components/ImmersiveLayout";
import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCode, faPalette } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

// Define the keyframes style
const mountainAnimationStyles = `
  @keyframes pulseCore {
    0%, 100% { opacity: 0.3; height: 30px; }
    50% { opacity: 1; height: 50px; }
  }
  @keyframes mountainRise {
    0% { 
      opacity: 0;
      transform: scaleY(0) translateY(100px);
      filter: blur(5px);
    }
    50% { 
      opacity: 0.7;
      transform: scaleY(1) translateY(0);
      filter: blur(15px);
    }
    100% { 
      opacity: 0;
      transform: scaleY(0.5) translateY(-50px);
      filter: blur(25px);
    }
  }
  @keyframes particleFloat {
    0% { opacity: 0; transform: translateY(0); }
    20% { opacity: 0.8; }
    100% { opacity: 0; transform: translateY(-150px); }
  }
`;

export default function About() {
  // Inject the animation styles
  useEffect(() => {
    // Create style element
    const styleEl = document.createElement('style');
    styleEl.id = 'mountain-animation-styles';
    styleEl.innerHTML = mountainAnimationStyles;
    document.head.appendChild(styleEl);
    
    // Cleanup function
    return () => {
      const existingStyle = document.getElementById('mountain-animation-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
  
  return (
    <ImmersiveLayout>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 pt-0 pb-20">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10 mt-[130px]"
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 mt-[-70px] text-center"
          >
            <span className="inline-block py-1 px-4 text-xs font-medium text-yellow-300 tracking-widest uppercase bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              OUR JOURNEY
            </span>
          </motion.div>
          
          {/* Page Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tighter text-center"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">About Us</span>
          </motion.h1>

          {/* Mountain Glow Animation */}
          <div className="relative w-[400px] h-[300px] mx-auto mt-12 flex items-center justify-center">
            {/* Core Glow Line (Source) */}
            <div className="absolute w-1 h-40 bg-gradient-to-t from-white to-blue-400 blur-[1px] 
              animate-[pulseCore_2s_ease-out_infinite]" />

            {/* Mountain Aura (Animated) */}
            <div className="absolute bottom-0 w-64 h-64
              [clip-path:polygon(50%_0%,0%_100%,100%_100%)]
              bg-gradient-to-t from-[#4B0082]/10 to-transparent
              animate-[mountainRise_4s_ease-in-out_infinite]"
            />

            {/* Glow Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-white rounded-full opacity-0
                    animate-[particleFloat_4s_ease-in-out_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: '20%',
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* About Content */}
          <div className="space-y-8 text-left mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 group hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="relative p-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-[#4B0082] rounded-xl opacity-30 group-hover:opacity-50 blur transition-all duration-300"></div>
                  <FontAwesomeIcon icon={faLightbulb} className="relative w-6 h-6 text-yellow-300" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Our Vision</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    DevStag Studio was founded with a vision to create digital experiences that seamlessly blend cutting-edge technology with stunning aesthetics. We believe that great design should not come at the expense of performance.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 group hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="relative p-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-[#4B0082] rounded-xl opacity-30 group-hover:opacity-50 blur transition-all duration-300"></div>
                  <FontAwesomeIcon icon={faCode} className="relative w-6 h-6 text-cyan-300" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Our Approach</h2>
                  <p className="text-white/80 leading-relaxed">
                    We approach each project with a blend of artistic vision and technical precision. Our team works collaboratively to push the boundaries of what&apos;s possible, while ensuring that every line of code serves a purpose.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <button className="relative group inline-flex items-center justify-center px-8 py-3 overflow-hidden text-white font-medium rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-[#4B0082] opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4B0082]/50 via-cyan-600/50 to-[#4B0082]/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                <span>Get in Touch</span>
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </ImmersiveLayout>
  );
}
