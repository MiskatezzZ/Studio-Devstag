"use client";

import { useEffect } from 'react';
import ThreeBackground from './ThreeBackground';
import SmoothScroll from './SmoothScroll';
import GradientBackground from './GradientBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImmersiveLayout({ children }) {
  // Set up GSAP defaults
  useEffect(() => {
    // Set default ease for all GSAP animations
    gsap.defaults({
      ease: "power3.out",
      duration: 1
    });
    
    // Initialize all scroll-triggered animations
    const sections = document.querySelectorAll('.gsap-section');
    
    sections.forEach(section => {
      // Fade in section
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <SmoothScroll>
      <GradientBackground />
      <ThreeBackground />
      <div className="relative z-10">
        {children}
      </div>
    </SmoothScroll>
  );
}
