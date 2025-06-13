"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

const PortalScrollExperience = ({
  portalSize = 80,
  glowIntensity = 0.8,
  tunnelDepth = 1000,
  backgroundColor = '#0a0a0a',
  portalColor = '#4f46e5',
  secondSectionBg = '#1a1a2e',
  children
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioned, setIsTransitioned] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  
  const containerRef = useRef(null);
  const portalRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioned && e.deltaY < 0 && typeof window !== 'undefined' && window.scrollY <= 5) {
        setIsTransitioned(false);
        setScrollProgress(0.95);
        e.preventDefault();
      } else if (!isTransitioned) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.001;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setIsTransitioned(true);
        }
      }
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (isTransitioned && deltaY < -30 && typeof window !== 'undefined' && window.scrollY <= 5) {
        setIsTransitioned(false);
        setScrollProgress(0.95);
        e.preventDefault();
      } else if (!isTransitioned) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setIsTransitioned(true);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!isTransitioned) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, isTransitioned, touchStartY]);

  // Portal size calculation
  const currentPortalSize = portalSize + (scrollProgress * (window.innerWidth * 2));
  
  // Tunnel effect calculations
  const tunnelScale = 1 + (scrollProgress * 5);
  const tunnelOpacity = Math.max(0, 1 - (scrollProgress * 1.5));
  const portalGlow = glowIntensity * (1 + scrollProgress * 2);
  
  // Background transition
  const backgroundOpacity = Math.max(0, 1 - (scrollProgress * 1.2));
  
  // Perspective effect for the glimpse through portal
  const glimpseScale = 0.8 + (scrollProgress * 0.4);
  const glimpseOpacity = 0.3 + (scrollProgress * 0.7);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ 
        height: isTransitioned ? 'auto' : '100vh',
        minHeight: '100vh'
      }}
    >
      {/* Initial dark background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor,
          opacity: backgroundOpacity,
        }}
      />

      {/* Portal container */}
      {!isTransitioned && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          {/* Portal hole with glow effect */}
          <motion.div
            ref={portalRef}
            className="relative rounded-full overflow-hidden"
            style={{
              width: `${currentPortalSize}px`,
              height: `${currentPortalSize}px`,
              boxShadow: `
                0 0 ${portalGlow * 50}px ${portalColor}40,
                0 0 ${portalGlow * 100}px ${portalColor}20,
                0 0 ${portalGlow * 200}px ${portalColor}10,
                inset 0 0 ${portalGlow * 30}px ${portalColor}30
              `,
              border: `2px solid ${portalColor}60`,
            }}
          >
            {/* Glimpse of second section through portal */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundColor: secondSectionBg,
                transform: `scale(${glimpseScale}) perspective(${tunnelDepth}px) rotateX(${scrollProgress * 10}deg)`,
                opacity: glimpseOpacity,
              }}
            >
              {/* Preview content visible through portal */}
              <div className="text-center text-white p-8">
                <motion.h2 
                  className="text-2xl md:text-4xl font-bold mb-4"
                  style={{
                    transform: `translateZ(${scrollProgress * 100}px)`,
                  }}
                >
                  Welcome to the Other Side
                </motion.h2>
                <motion.p 
                  className="text-lg opacity-80"
                  style={{
                    transform: `translateZ(${scrollProgress * 50}px)`,
                  }}
                >
                  Scroll to enter the portal
                </motion.p>
              </div>
            </motion.div>

            {/* Tunnel rings effect */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor: `${portalColor}${Math.floor((1 - i * 0.1) * 255).toString(16).padStart(2, '0')}`,
                  borderWidth: '1px',
                  transform: `scale(${tunnelScale + i * 0.1}) translateZ(${-i * 100}px)`,
                  opacity: tunnelOpacity * (1 - i * 0.1),
                }}
              />
            ))}
          </motion.div>

          {/* Scroll instruction */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 2),
            }}
          >
            <p className="text-lg mb-2">Scroll to zoom through the portal</p>
            <motion.div
              className="w-6 h-10 border-2 border-white rounded-full mx-auto relative"
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1 h-3 bg-white rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Second section - revealed after transition */}
      {isTransitioned && (
        <motion.div
          className="relative z-20 min-h-screen"
          style={{
            backgroundColor: secondSectionBg,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto px-6 py-20">
            <motion.div
              className="text-center text-white mb-16"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                You&apos;ve Entered the Portal
              </h1>
              <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
                Experience the seamless transition from one dimension to another. 
                This is where your journey truly begins.
              </p>
            </motion.div>

            {/* Content sections */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Immersive Experience</h3>
                <p className="text-white/80 leading-relaxed">
                  The portal effect creates a cinematic transition that draws users into your content. 
                  Perfect for storytelling and creating memorable first impressions.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Smooth Animations</h3>
                <p className="text-white/80 leading-relaxed">
                  Built with Framer Motion for buttery smooth animations that work across all devices. 
                  The scroll-based interaction feels natural and responsive.
                </p>
              </motion.div>
            </div>

            {/* Custom children content */}
            {children && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                {children}
              </motion.div>
            )}

            {/* Additional content to demonstrate scrolling */}
            <motion.div
              className="text-white space-y-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-center mb-8">Continue Your Journey</h2>
              <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed opacity-80">
                <p>
                  Now that you&apos;ve successfully traveled through the portal, you can scroll normally 
                  through this section. The transition creates a sense of depth and movement that 
                  enhances the user experience.
                </p>
                <p>
                  This component is perfect for landing pages, product showcases, or any application 
                  where you want to create a memorable entrance to your content. The portal effect 
                  can be customized with different colors, sizes, and animations to match your brand.
                </p>
                <p>
                  The scroll-based interaction works on both desktop and mobile devices, providing 
                  a consistent experience across all platforms. Users can scroll back up to return 
                  to the portal view if needed.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Usage example
const PortalScrollDemo = () => {
  return (
    <div className="w-full">
      <PortalScrollExperience
        portalSize={100}
        glowIntensity={1.2}
        backgroundColor="#000011"
        portalColor="#6366f1"
        secondSectionBg="#1e1b4b"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Custom Content Area</h3>
          <p className="text-white/80">
            This is where you can add your own custom content after the portal transition.
          </p>
        </div>
      </PortalScrollExperience>
    </div>
  );
};

export default PortalScrollDemo;
