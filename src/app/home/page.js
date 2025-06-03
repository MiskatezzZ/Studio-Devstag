"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useCallback, useMemo } from "react";
import useLenis from "@/hooks/useLenis";

// Testimonials data
const testimonials = [
  {
    quote: "DevStag Studio transformed our digital presence with their premium design and development services. The attention to detail and modern aesthetics exceeded our expectations.",
    author: "Sarah Johnson",
    role: "CEO, TechVision Inc.",
    delay: 0.3
  },
  {
    quote: "Working with DevStag was a game-changer for our brand. Their team delivered a stunning website that perfectly captures our premium identity in the market.",
    author: "Michael Chen",
    role: "Marketing Director, Luxe Brands",
    delay: 0.5
  },
  {
    quote: "The glassmorphism effects and animations DevStag implemented on our site have significantly increased user engagement and conversion rates.",
    author: "Priya Sharma",
    role: "Product Manager, NexGen Solutions",
    delay: 0.7
  },
  {
    quote: "DevStag's ability to blend cutting-edge design with flawless functionality made them the perfect partner for our website redesign project.",
    author: "David Rodriguez",
    role: "CTO, Innovate Systems",
    delay: 0.9
  }
];

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bgImage from "../../assests/bg.jpg";
import cameraImg from "../../assests/camera.webp";
import Image from "next/image";

export default function Home() {
  // Initialize Lenis for smooth scrolling
  const lenis = useLenis({
    autoRaf: true,
  });
  
  // Add background style to ensure no white space is visible
  useEffect(() => {
    // Set body background to match the deep indigo theme
    document.body.style.backgroundColor = '#0A0F2C';
    
    // Add CSS to ensure solid background colors
    const style = document.createElement('style');
    style.textContent = `
      .overlap-section {
        margin-top: 50px;
        position: relative;
        z-index: 20;
        background-color: #8F5ECA !important;
        width: 100vw !important;
        margin-left: calc(-50vw + 50%) !important;
        margin-right: calc(-50vw + 50%) !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important;
      }
      section {
        position: relative;
        background-color: inherit;
      }
      @media (max-width: 768px) {
        .sticky-header-section {
          position: static;
        }
        .overlap-section {
          margin-top: -20px;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Cleanup when component unmounts
      document.body.style.backgroundColor = '';
      document.head.removeChild(style);
    };
  }, []);
  const worksRef = useRef(null);
  
  // Enhanced scroll handler for upward animation
  const handleScroll = useCallback(() => {
    if (!worksRef.current) return;
    
    const scrollPosition = window.scrollY;
    const triggerPosition = window.innerHeight * 0.2; // Trigger even earlier
    const sectionRect = worksRef.current.getBoundingClientRect();
    const sectionTop = sectionRect.top + window.scrollY;
    
    // Calculate how close we are to the section
    const distanceToSection = sectionTop - scrollPosition;
    const viewportHeight = window.innerHeight;
    
    // Always ensure the background color is solid
    worksRef.current.style.backgroundColor = '#8558BD';
    worksRef.current.style.opacity = 1;
    worksRef.current.style.width = '100vw';
    worksRef.current.style.maxWidth = '100%';
    worksRef.current.style.marginLeft = '0';
    worksRef.current.style.marginRight = '0';
    worksRef.current.style.overflowX = 'hidden';
    
    if (scrollPosition > triggerPosition) {
      // Move section upward as user scrolls down
      const moveUpAmount = Math.min(100, (scrollPosition - triggerPosition) * 0.4);
      const scaleValue = 1 + (Math.min(scrollPosition - triggerPosition, 300) * 0.0001);
      
      // Apply transformations (keeping opacity at 1)
      worksRef.current.style.transform = `translateY(-${moveUpAmount}px) scale(${scaleValue})`;
      worksRef.current.style.boxShadow = `0px -${moveUpAmount/2}px ${moveUpAmount * 1.5}px rgba(10, 15, 44, ${moveUpAmount/300})`;
      
      // Add margin adjustment to create gap closing effect
      worksRef.current.style.marginTop = `${50 - moveUpAmount/3}px`;
    } else {
      // Reset to initial state (keeping opacity at 1)
      worksRef.current.style.transform = 'translateY(0) scale(1)';
      worksRef.current.style.boxShadow = '0px 0px 0px rgba(10, 15, 44, 0)';
      worksRef.current.style.marginTop = '50px';
    }
  }, []);

  useEffect(() => {
    if (!lenis) return;
    
    // Use Lenis for scroll events instead of native scroll
    lenis.on('scroll', () => {
      handleScroll();
    });
    
    // Initial call to set up the scroll position
    handleScroll();
    
    return () => {
      if (lenis) {
        lenis.off('scroll');
      }
    };
  }, [handleScroll, lenis]);

  const projects = useMemo(() => [
    {
      title: "Nebula Dashboard",
      category: "Web Application",
      description: "Interactive analytics platform with real-time data visualization",
      size: "large",
      color: "from-indigo-900 to-blue-800",
      delay: 0.5
    },
    {
      title: "Quantum Analytics", 
      category: "UI/UX Design",
      description: "Award-winning interface design for enterprise solutions",
      size: "small",
      color: "from-purple-900 to-indigo-800",
      delay: 0.6
    },
    {
      title: "Aurora Platform",
      category: "Full Stack Development", 
      description: "Scalable cloud infrastructure with AI-powered insights",
      size: "small",
      color: "from-blue-900 to-indigo-800",
      delay: 0.7
    },
    {
      title: "Polaris E-commerce",
      category: "Website & Branding",
      description: "Premium shopping experience with seamless checkout flow",
      size: "medium",
      color: "from-indigo-800 to-blue-700",
      delay: 0.8
    },
    {
      title: "Celestial VR Experience",
      category: "Immersive Media",
      description: "Virtual reality showcase for architectural visualization",
      size: "medium",
      color: "from-violet-900 to-indigo-800",
      delay: 0.9
    },
  ], []);

  const testimonials = useMemo(() => [
    {
      quote: "DevStag Studio transformed our digital presence. Their attention to detail and innovative approach exceeded our expectations.",
      author: "Sarah Johnson",
      role: "CEO, Nexus Technologies",
      delay: 0.5
    },
    {
      quote: "Working with DevStag was an incredible experience. They delivered a premium website that perfectly captures our brand identity.",
      author: "Michael Chen", 
      role: "Marketing Director, Quantum Brands",
      delay: 0.6
    },
  ], []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header Section */}
      <section className="relative min-h-screen w-full overflow-hidden" style={{position: 'sticky', top: 0, zIndex: 10}}>
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4 pt-0 pb-20 container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative z-10 mt-[130px]"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4 mt-[-120px]"
            >
              <span className="inline-block py-1 px-4 text-xs font-medium text-yellow-300 tracking-widest uppercase bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                NOW LIVE
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tighter"
            >
              <span className="block">Introducing</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">DevStag Studio</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto mb-12 font-light tracking-wide"
            >
              Every project is artistically curated but grounded in real-time 
              performance, ensuring both aesthetics and usability.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-5"
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(56, 189, 248, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-all"
              >
                Start free trial
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Watch the Keynote
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-blue-500/20 blur-xl" />
          </motion.div>
        </div>
      </section>
      
      {/* Works Section with Improved Scroll Animation */}
      <section 
    ref={worksRef}
    className="relative w-full py-20 px-0 mt-[50px] rounded-t-[40px] shadow-2xl will-change-transform overlap-section bg-[#8F5ECA]"
    style={{
      transform: "translateY(0) scale(1)", 
      opacity: 1,
      transition: "transform 0.3s ease-out, opacity 0.3s ease-out, box-shadow 0.3s ease-out",
      zIndex: 20,
      position: "relative",
      backgroundColor: "#8F5ECA",
      backdropFilter: "none",
      marginLeft: 0,
      marginRight: 0,
      width: "100vw",
      maxWidth: "100%",
      overflowX: "hidden"  
    }}
  >
    {/* Additional solid background layer */}
    <div className="absolute inset-0 bg-[#8F5ECA] rounded-t-[40px] -z-10"></div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
      className="w-full max-w-6xl mx-auto px-6 md:px-8 relative z-10"
    >
      <div className="text-center mb-16">
        <span className="inline-block py-1 px-4 text-xs font-medium text-[#0A0F2C] bg-white tracking-widest uppercase rounded-full mb-4">
          PORTFOLIO
        </span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tighter"
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#0A0F2C] via-white to-[#0A0F2C]">Our Recent Works</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-md md:text-lg text-white/70 max-w-2xl mx-auto mb-12"
        >
          Discover our portfolio of premium digital experiences
        </motion.p>
      </div>

      {/* Two-column layout: left = bento boxes, right = image */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mx-4 lg:mx-0">
        {/* Left: Bento Boxes (smaller) */}
        <div className="w-full md:w-[45%] pr-4">
          <div className="relative grid grid-cols-12 gap-3 grid-rows-[50px_auto_auto_auto] h-[520px]">
            {projects.map((project, index) => {
              // Custom layout for each project based on index
              let colSpan, rowSpan, gridArea, roundedEdges = '';
              
              if (index === 0) { // Top bar
                colSpan = 'col-span-12';
                rowSpan = 'row-span-1';
                gridArea = 'grid-row-start-1 grid-row-end-2 grid-col-start-1 grid-col-end-13';
              } else if (index === 1) { // Main content left
                colSpan = 'col-span-8';
                rowSpan = 'row-span-2';
                gridArea = 'grid-row-start-2 grid-row-end-4 grid-col-start-1 grid-col-end-9';
                roundedEdges = 'rounded-bl-[40px]';
              } else if (index === 2) { // Right sidebar
                colSpan = 'col-span-4';
                rowSpan = 'row-span-3';
                gridArea = 'grid-row-start-2 grid-row-end-5 grid-col-start-9 grid-col-end-13';
                roundedEdges = 'rounded-tr-[40px]';
              } else if (index === 3) { // Bottom left
                colSpan = 'col-span-5';
                rowSpan = 'row-span-1';
                gridArea = 'grid-row-start-4 grid-row-end-5 grid-col-start-1 grid-col-end-6';
              } else { // Bottom middle
                colSpan = 'col-span-3';
                rowSpan = 'row-span-1';
                gridArea = 'grid-row-start-4 grid-row-end-5 grid-col-start-6 grid-col-end-9';
              }
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: project.delay, duration: 0.8 }}
                  className={`group ${colSpan} ${rowSpan} ${gridArea} relative overflow-hidden rounded-[20px] ${roundedEdges} cursor-pointer will-change-transform shadow-lg`}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] } }}
                >
              <div className="absolute inset-0 backdrop-blur-[8px] bg-white/10 border border-white/20 rounded-[20px] group-hover:bg-white/15 group-hover:border-white/30 group-hover:backdrop-blur-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
                </div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {index === 1 && (
                  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[20px]">
                    <iframe 
                      style={{ 
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.3)",
                        transformOrigin: "center center",
                        transition: "transform 10s ease-in-out"
                      }} 
                      width="100%" 
                      height="100%" 
                      src="https://embed.figma.com/design/Nc84ryFABkoemjQ498df3k/DevStag-Premium-UI?node-id=1-8&embed-host=share" 
                      allowFullScreen
                      className="w-full h-full absolute inset-0 group-hover:scale-110 transition-transform duration-[10000ms]"
                      loading="lazy"
                    ></iframe>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4B0082]/80 via-[#8F5ECA]/30 to-transparent pointer-events-none"></div>
                  </div>
                )}

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                  <div>
                    <span className="inline-block py-1 px-3 text-xs font-medium text-yellow-300 bg-white/10 backdrop-blur-sm rounded-full mb-3 border border-white/20 shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/90 mb-4 line-clamp-2 max-w-[95%] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white transform opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <span className="text-sm font-medium">Explore Project</span>
                        <motion.svg 
                          className="ml-2 w-4 h-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
          </div>
        </div>
        {/* Connector element */}
        <div className="hidden md:block w-[80px] flex items-center justify-center">
          <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-r from-indigo-900 to-blue-800 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <div className="w-[30px] h-[4px] bg-white/40 rounded-full"></div>
          </div>
        </div>
        
        {/* Right: Featured Image */}
        <div className="w-full md:w-[45%] flex items-center justify-center pl-4">
          <div className="relative">
            <Image
              src={cameraImg.src}
              alt="Featured Project"
              width={500}
              height={500}
              className="max-w-full h-auto object-contain"
              priority
            />
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-yellow-300 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">PREMIUM PROJECT</span>
          </div>
        </div>
      </div>
    </motion.div>
  </section>

      {/* Featured In Section with Infinite Horizontal Scrolling */}
      <section className="bg-gradient-to-b from-[#101849] to-[#0A0F2C] py-20 w-full overflow-hidden relative" style={{zIndex: 21, position: "relative"}}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="w-full max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-4 text-xs font-medium text-yellow-400 bg-white/10 tracking-widest uppercase rounded-full mb-4">
              FEATURED IN
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tighter text-white"
            >
              As Seen In
            </motion.h2>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative w-full overflow-hidden py-6">
            {/* Featured Publications Marquee */}
            <div className="group">
              <div className="flex animate-marquee group-hover:pause-animation">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-[180px] mx-3"
                  >
                    <div className="h-14 w-full flex items-center justify-center rounded-lg p-3 backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/30 hover:bg-white/20 transition-all duration-300 group">
                      <div className="text-white font-bold text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        Publication {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 10 }).map((_, index) => (
                  <div 
                    key={`dup-${index}`} 
                    className="flex-shrink-0 w-[180px] mx-3"
                  >
                    <div className="h-14 w-full flex items-center justify-center rounded-lg p-3 backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/30 hover:bg-white/20 transition-all duration-300 group">
                      <div className="text-white font-bold text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        Publication {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Clients Section with Infinite Horizontal Scrolling */}
      <section className="bg-white py-24 w-full relative" style={{zIndex: 22, position: "relative", backgroundColor: "white"}}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="w-full max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 text-xs font-medium text-[#101849] bg-gray-100 tracking-widest uppercase rounded-full mb-4">
              CLIENTS
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tighter text-[#101849]"
            >
              Our Clients
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto mb-12"
            >
              Trusted by industry leaders worldwide
            </motion.p>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative w-full overflow-hidden">
            {/* First Marquee - Left to Right */}
            <div className="group">
              <div className="flex animate-marquee group-hover:pause-animation">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-[200px] mx-4"
                  >
                    <div className="h-16 w-full flex items-center justify-center rounded-lg p-4 backdrop-blur-sm bg-white/80 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:bg-white">
                      <div className="text-[#101849] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity duration-300">
                        Client {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={`dup-${index}`} 
                    className="flex-shrink-0 w-[200px] mx-4"
                  >
                    <div className="h-16 w-full flex items-center justify-center rounded-lg p-4 backdrop-blur-sm bg-white/80 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:bg-white">
                      <div className="text-[#101849] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity duration-300">
                        Client {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Second Marquee - Right to Left (opposite direction) */}
            <div className="group mt-8">
              <div className="flex animate-marquee-reverse group-hover:pause-animation">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-[200px] mx-4"
                  >
                    <div className="h-16 w-full flex items-center justify-center rounded-lg p-4 backdrop-blur-sm bg-white/80 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:bg-white">
                      <div className="text-[#101849] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity duration-300">
                        Partner {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={`dup-${index}`} 
                    className="flex-shrink-0 w-[200px] mx-4"
                  >
                    <div className="h-16 w-full flex items-center justify-center rounded-lg p-4 backdrop-blur-sm bg-white/80 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:bg-white">
                      <div className="text-[#101849] font-bold text-xl opacity-60 hover:opacity-100 transition-opacity duration-300">
                        Partner {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Technology Partners Section */}
      <section className="bg-gradient-to-b from-[#0A0F2C] to-[#050811] py-24 w-full overflow-hidden relative" style={{zIndex: 23, position: "relative"}}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="w-full max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 text-xs font-medium text-[#FDBD10] bg-[#22273D] tracking-widest uppercase rounded-full mb-4">
              PARTNERS
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tighter text-white"
            >
              Technology Partners
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-md md:text-lg text-white/70 max-w-2xl mx-auto mb-12"
            >
              Powering innovation together with industry leaders
            </motion.p>
          </div>

          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                className="group"
                whileHover={{ y: -5 }}
              >
                <div className="h-32 flex items-center justify-center rounded-xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-[#101849] font-bold text-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    Tech Partner {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-[#050811] to-[#0A0F2C] py-24 w-full relative mb-0 pb-0" style={{zIndex: 24, position: "relative"}}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="w-full max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 text-xs font-medium text-[#0A0F2C] bg-white tracking-widest uppercase rounded-full mb-4">
              TESTIMONIALS
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tighter text-white"
            >
              Client Reviews
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-md md:text-lg text-white/70 max-w-2xl mx-auto mb-12"
            >
              What our clients have to say about our services
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: testimonial.delay, duration: 0.8 }}
                className="group relative"
                whileHover={{ y: -5 }}
              >
                <div className="backdrop-blur-sm bg-white/10 border border-white/10 rounded-2xl p-8 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/15 relative z-10" style={{backgroundColor: "rgba(25, 30, 70, 0.8)"}}>
                  <div className="mb-6">
                    <svg className="w-10 h-10 text-white/30 group-hover:text-white/40 transition-colors duration-300" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8v12H6v-8c0-2.21 1.79-4 4-4zm12 0v12h-4v-8c0-2.21 1.79-4 4-4z" />
                    </svg>
                  </div>
                  
                  <p className="text-white/80 leading-relaxed mb-6 italic group-hover:text-white/90 transition-colors duration-300">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0A0F2C] font-bold group-hover:scale-105 transition-transform duration-300">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                        {testimonial.author}
                      </h4>
                      <p className="text-xs text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Technology Partners Section with Infinite Horizontal Scrolling */}
  

      {/* Footer Section */}
      </div>
      <footer style={{width: '100%', background: '#0A0F2C', marginTop: 0, paddingTop: 0}}>
        <Footer />
      </footer>
    </div>
  );
}