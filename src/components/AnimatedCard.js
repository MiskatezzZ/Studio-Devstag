"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCard({ 
  children, 
  className = "", 
  depth = 20, 
  glowColor = "rgba(130, 87, 230, 0.4)",
  hoverScale = 1.05,
  glassmorphism = true
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
    
    // Calculate normalized direction from center (-1 to 1)
    const directionX = (x - centerX) / centerX;
    const directionY = (y - centerY) / centerY;
    
    const rotateX = directionY * -depth;
    const rotateY = directionX * depth;
    
    setMousePosition({ x, y });
  };
  
  // Variants for card animation
  const cardVariants = {
    rest: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: glassmorphism ? `0 4px 20px rgba(0, 0, 0, 0.1)` : `0 10px 30px -15px rgba(0, 0, 0, 0.2)`,
    },
    hover: { 
      scale: hoverScale,
      rotateX: isHovered ? (mousePosition.y / cardRef.current?.offsetHeight - 0.5) * -depth : 0,
      rotateY: isHovered ? (mousePosition.x / cardRef.current?.offsetWidth - 0.5) * depth : 0,
      boxShadow: glassmorphism 
        ? `0 10px 30px rgba(0, 0, 0, 0.15), 0 0 20px ${glowColor}` 
        : `0 20px 40px -20px rgba(0, 0, 0, 0.3), 0 0 30px ${glowColor}`,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Radial gradient effect that follows the cursor
  const radialGradientVariants = {
    rest: { 
      opacity: 0,
      scale: 0.5
    },
    hover: { 
      opacity: 0.8,
      scale: 1.5,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  // Calculate distance from point to line segment
  const distToSegment = (px, py, x1, y1, x2, y2) => {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  // Base classes for the card
  const baseClasses = `relative overflow-hidden rounded-2xl ${glassmorphism ? 'backdrop-blur-sm bg-white/[0.01] border border-white/5' : ''} ${className}`;
  
  return (
    <motion.div
      ref={cardRef}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      variants={cardVariants}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* Smaller radial gradient effect */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-xl"
        style={{
          background: `radial-gradient(circle, ${glowColor.replace('0.4', '0.7')} 0%, rgba(255,255,255,0) 70%)`,
          width: "200px",
          height: "200px",
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
          zIndex: 0
        }}
        variants={radialGradientVariants}
      />
      
      {/* Radial border glow effect */}
      {isHovered && (
        <>
          {/* Border container */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {/* Calculate border glow based on mouse position */}
            {(() => {
              if (!cardRef.current) return null;
              
              const rect = cardRef.current.getBoundingClientRect();
              const width = rect.width;
              const height = rect.height;
              
              // Distance to each border
              const distToTop = mousePosition.y;
              const distToRight = width - mousePosition.x;
              const distToBottom = height - mousePosition.y;
              const distToLeft = mousePosition.x;
              
              // Threshold for showing a border (closer than this will show the glow)
              const threshold = 120; // pixels - increased significantly to detect cursor from further away
              
              // Calculate opacity based on distance (closer = more opaque)
              const getOpacity = (distance) => {
                if (distance > threshold) return 0;
                // Make it more visible by having a minimum opacity and gentler curve
                return Math.max(0.5, 1 - (distance / threshold) * 0.5);
              };
              
              // Prepare elements array
              const elements = [];
              
              // Top border
              const topOpacity = getOpacity(distToTop);
              if (topOpacity > 0) {
                elements.push(
                  <div key="top" className="absolute top-0 left-0 right-0 overflow-visible">
                    <div 
                      className="absolute blur-[4px]"
                      style={{
                        background: glowColor.replace('0.4', '1'),
                        width: '180px',
                        height: '5px',
                        left: `${mousePosition.x - 90}px`,
                        top: '0px',
                        opacity: topOpacity,
                        boxShadow: `0 0 20px 8px ${glowColor.replace('0.4', '1')}, 0 0 40px 12px ${glowColor.replace('0.4', '0.7')}`,
                        transition: 'opacity 0.15s ease-out',
                        borderRadius: '100%'
                      }}
                    />
                  </div>
                );
              }
              
              // Right border
              const rightOpacity = getOpacity(distToRight);
              if (rightOpacity > 0) {
                elements.push(
                  <div key="right" className="absolute top-0 right-0 bottom-0 overflow-visible">
                    <div 
                      className="absolute blur-[4px]"
                      style={{
                        background: glowColor.replace('0.4', '1'),
                        width: '5px',
                        height: '180px',
                        right: '0px',
                        top: `${mousePosition.y - 90}px`,
                        opacity: rightOpacity,
                        boxShadow: `0 0 20px 8px ${glowColor.replace('0.4', '1')}, 0 0 40px 12px ${glowColor.replace('0.4', '0.7')}`,
                        transition: 'opacity 0.15s ease-out',
                        borderRadius: '100%'
                      }}
                    />
                  </div>
                );
              }
              
              // Bottom border
              const bottomOpacity = getOpacity(distToBottom);
              if (bottomOpacity > 0) {
                elements.push(
                  <div key="bottom" className="absolute bottom-0 left-0 right-0 overflow-visible">
                    <div 
                      className="absolute blur-[4px]"
                      style={{
                        background: glowColor.replace('0.4', '1'),
                        width: '180px',
                        height: '5px',
                        left: `${mousePosition.x - 90}px`,
                        bottom: '0px',
                        opacity: bottomOpacity,
                        boxShadow: `0 0 20px 8px ${glowColor.replace('0.4', '1')}, 0 0 40px 12px ${glowColor.replace('0.4', '0.7')}`,
                        transition: 'opacity 0.15s ease-out',
                        borderRadius: '100%'
                      }}
                    />
                  </div>
                );
              }
              
              // Left border
              const leftOpacity = getOpacity(distToLeft);
              if (leftOpacity > 0) {
                elements.push(
                  <div key="left" className="absolute top-0 left-0 bottom-0 overflow-visible">
                    <div 
                      className="absolute blur-[4px]"
                      style={{
                        background: glowColor.replace('0.4', '1'),
                        width: '5px',
                        height: '180px',
                        left: '0px',
                        top: `${mousePosition.y - 90}px`,
                        opacity: leftOpacity,
                        boxShadow: `0 0 20px 8px ${glowColor.replace('0.4', '1')}, 0 0 40px 12px ${glowColor.replace('0.4', '0.7')}`,
                        transition: 'opacity 0.15s ease-out',
                        borderRadius: '100%'
                      }}
                    />
                  </div>
                );
              }
              
              return elements;
            })()}
          </div>
        </>
      )}
      
      {/* Card content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
}
