"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCard({ 
  children, 
  className = "", 
  depth = 20, 
  glowColor = "rgba(130, 87, 230, 0.4)",
  hoverScale = 1.05
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * depth;
    const rotateY = (centerX - x) / centerX * depth;
    
    setMousePosition({ x, y });
  };
  
  // Variants for card animation
  const cardVariants = {
    rest: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: `0 10px 30px -15px rgba(0, 0, 0, 0.2)`,
    },
    hover: { 
      scale: hoverScale,
      rotateX: isHovered ? (mousePosition.y / cardRef.current?.offsetHeight - 0.5) * -depth : 0,
      rotateY: isHovered ? (mousePosition.x / cardRef.current?.offsetWidth - 0.5) * depth : 0,
      boxShadow: `0 20px 40px -20px rgba(0, 0, 0, 0.3), 0 0 30px ${glowColor}`,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Glow effect that follows the cursor
  const glowVariants = {
    rest: { 
      opacity: 0,
      scale: 1
    },
    hover: { 
      opacity: 0.7,
      scale: 1.5,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      variants={cardVariants}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-xl"
        style={{
          background: glowColor,
          width: "150px",
          height: "150px",
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          zIndex: -1
        }}
        variants={glowVariants}
      />
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
