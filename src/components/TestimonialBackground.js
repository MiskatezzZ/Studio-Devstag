"use client";

// Adapted from GridBackground for Testimonials section
const TestimonialBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" style={{background: '#000000'}}>
      {/* Three subtle white radial gradients */}
      {/* Smaller radial gradients at top left, top right, and bottom center */}
      {/* <div style={{position: 'absolute', left: '-10vw', top: '-10vw', width: '40vw', height: '40vw', pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)'}} /> */}
      {/* <div style={{position: 'absolute', right: '-10vw', top: '-10vw', width: '40vw', height: '40vw', pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 70%)'}} /> */}
      <div style={{position: 'absolute', left: '50%', bottom: '-10vw', transform: 'translateX(-50%)', width: '44vw', height: '44vw', pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)'}} />
      {/* The parent section in home/page.js now provides the dark blue background */}
    </div>
  );
};

export default TestimonialBackground;

