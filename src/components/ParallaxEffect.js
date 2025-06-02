"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ParallaxLayer({ children, speed = 0.1, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) * speed;
      const y = (clientY - window.innerHeight / 2) * speed;
      
      gsap.to(element, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export function ParallaxSection({ children, className = "" }) {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const parallaxItems = section.querySelectorAll('.parallax-item');
    
    parallaxItems.forEach((item, i) => {
      const speed = item.dataset.speed || 0.1;
      
      gsap.to(item, {
        y: `${-100 * speed}%`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function useParallaxScroll() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax);
        const yPos = -(scrollTop * speed);
        gsap.set(element, { y: yPos });
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
