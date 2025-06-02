"use client";

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnimatedText({ 
  children, 
  className = "", 
  type = "words", // words, lines
  stagger = 0.03,
  duration = 0.8,
  y = 100,
  ease = "power4.out",
  trigger,
  start = "top 80%",
}) {
  const textRef = useRef(null);
  const [content, setContent] = useState(children);
  
  // Split text into words or lines when component mounts
  useEffect(() => {
    if (typeof children !== 'string') {
      setContent(children);
      return;
    }
    
    if (type === "words") {
      const words = children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="animated-word inline-block">{word}</span>
          <span className="inline-block">&nbsp;</span>
        </span>
      ));
      setContent(words);
    } else if (type === "lines") {
      const lines = children.split('\n').map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div className="animated-line">{line}</div>
        </div>
      ));
      setContent(lines);
    }
  }, [children, type]);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    // Use the actual DOM element as the trigger if none is provided
    const triggerElement = trigger || textRef.current;
    
    // Get elements to animate
    const elements = type === "words" 
      ? textRef.current.querySelectorAll('.animated-word')
      : textRef.current.querySelectorAll('.animated-line');
    
    if (elements.length === 0) return;
    
    // Set initial state
    gsap.set(elements, { 
      y: y, 
      opacity: 0 
    });
    
    // Create the animation
    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: duration,
      stagger: stagger,
      ease: ease,
      scrollTrigger: {
        trigger: triggerElement,
        start: start,
        toggleActions: "play none none none"
      }
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [content, type, stagger, duration, y, ease, trigger, start]);
  
  return (
    <div ref={textRef} className={className}>
      {content}
    </div>
  );
}
