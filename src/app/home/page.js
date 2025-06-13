"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useCallback, useMemo } from "react";
import useLenis from "@/hooks/useLenis";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { Spotlight } from "@/components/ui/spotlight";
import { StickyScroll } from "@/components/ui/stcikyreveal";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { HeroParallax } from "@/components/ui/hero-parallax";
import bgImage from "../../assets/bg.jpg";
import cameraImg from "../../assets/back.png";
import cameraWebpImg from "../../assets/vrback.png";
import Image from "next/image";
import TestimonialsSection from "@/components/TestimonialsSection";
import Sticky from "@/components/Sticky";
import Intro from "@/components/Intro";

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
        background-color: #000000 !important;
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
        lenis.on('scroll');
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

      <section style={{ position: 'relative', zIndex: 2000 }}>
        <Intro/>
      </section>



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
    className="relative w-full py-20 px-0 mt-[50px] rounded-t-[40px] shadow-2xl will-change-transform overlap-section"
    style={{
      transform: "translateY(0) scale(1)", 
      opacity: 1,
      transition: "transform 0.3s ease-out, opacity 0.3s ease-out, box-shadow 0.3s ease-out",
      zIndex: 20,
      position: "relative",

      backdropFilter: "none",
      marginLeft: 0,
      marginRight: 0,
      width: "100vw",
      maxWidth: "100%",
      overflowX: "hidden"  
    }}
  >

    {/* Glowing white ellipse above the purple gradient */}
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '-50vw',
      transform: 'translateX(-50%)',
      width: '80vw',
      height: '90vw',
      pointerEvents: 'none',
      zIndex: 30,
      background: 'radial-gradient(ellipse 5% 40% at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(0,255,0,0) 70%)',
      filter: 'blur(8px)',
    }} />

    {/* Glowing white ellipse above the purple gradient number 2*/}
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '-50vw',
      transform: 'translateX(-50%)',
      width: '80vw',
      height: '90vw',
      pointerEvents: 'none',
      zIndex: 31,
      background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(0,255,0,0) 70%)',
      filter: 'blur(8px)',
    }} />

    {/* Top radial gradient background (matching TestimonialBackground.js) */}
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '-40vw',
      transform: 'translateX(-50%)',
      width: '100vw',
      height: '100vw',
      pointerEvents: 'none',
      zIndex: 1,
      background: 'radial-gradient(ellipse 60% 90% at 50% 0%, #7B3FE4 0%, #000 100%)'
    }} />
    {/* Additional solid background layer */}
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
        {/* Left: Placeholder for future video */}
        <div className="w-full md:w-[45%] pr-4 flex items-center justify-center">
          <div className="w-full h-[320px] md:h-[400px] bg-black/40 border border-white/20 rounded-2xl flex items-center justify-center">
            {/* Place your video here later */}
            <span className="text-white/60 text-lg">Video Coming Soon</span>
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

      {/* Duplicate Section with camera.webp (image left, video right) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mx-4 lg:mx-0 mt-12">
        {/* Left: Featured Image (camera.webp) */}
        <div className="w-full md:w-[45%] pr-4 flex items-center justify-center">
          <div className="relative">
            <Image
              src={cameraWebpImg.src}
              alt="Featured Project 2"
              width={500}
              height={500}
              className="max-w-full h-auto object-contain"
              priority
            />
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-yellow-300 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">PREMIUM PROJECT 2</span>
          </div>
        </div>
        {/* Connector element */}
        <div className="hidden md:block w-[80px] flex items-center justify-center">
          <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-r from-indigo-900 to-blue-800 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <div className="w-[30px] h-[4px] bg-white/40 rounded-full"></div>
          </div>
        </div>
        {/* Right: Placeholder for future video */}
        <div className="w-full md:w-[45%] flex items-center justify-center pl-4">
          <div className="w-full h-[320px] md:h-[400px] bg-black/40 border border-white/20 rounded-2xl flex items-center justify-center">
            {/* Place your video here later */}
            <span className="text-white/60 text-lg">Video Coming Soon</span>
          </div>
        </div>
      </div>
    </motion.div>
      </section>


      <section style={{ position: 'relative', zIndex: 2000 }}>
        <Sticky />
      </section>

      {/* Hero Parallax Section */}
      {/* <section className="relative z-20">


        
        <HeroParallax
            // ...props

        
           products={[
          { title: "Moonbeam", link: "https://gomoonbeam.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png" },
          { title: "Cursor", link: "https://cursor.so", thumbnail: "https://aceternity.com/images/products/thumbnails/new/cursor.png" },
          { title: "Rogue", link: "https://userogue.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/rogue.png" },
          { title: "Editorially", link: "https://editorially.org", thumbnail: "https://aceternity.com/images/products/thumbnails/new/editorially.png" },
          { title: "Editrix AI", link: "https://editrix.ai", thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png" },
          { title: "Pixel Perfect", link: "https://app.pixelperfect.quest", thumbnail: "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png" },
          { title: "Algochurn", link: "https://algochurn.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png" },
          { title: "Aceternity UI", link: "https://ui.aceternity.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png" },
          { title: "Tailwind Master Kit", link: "https://tailwindmasterkit.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png" },
          { title: "SmartBridge", link: "https://smartbridgetech.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png" },
          { title: "Renderwork Studio", link: "https://renderwork.studio", thumbnail: "https://aceternity.com/images/products/thumbnails/new/renderwork.png" },
          { title: "Creme Digital", link: "https://cremedigital.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/cremedigital.png" },
          { title: "Golden Bells Academy", link: "https://goldenbellsacademy.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png" },
          { title: "Invoker Labs", link: "https://invoker.lol", thumbnail: "https://aceternity.com/images/products/thumbnails/new/invoker.png" },
          { title: "E Free Invoice", link: "https://efreeinvoice.com", thumbnail: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png" }
        ]} />
      </section> */}

      {/* Why Choose Us Section */}
      

      {/* Featured In Section with Infinite Horizontal Scrolling */}
      <section 
        style={{ background: '#000000', zIndex: 21, position: 'relative', paddingTop: '80px', paddingBottom: '80px', overflowX: 'clip' }}
      >
        {/* Spotlight Background Layer */}
        <Spotlight />
        {/* Bottom left and right radial gradient balls */}
        {/* <div style={{position: 'absolute', left: '-10vw', bottom: '-25vw', width: '40vw', height: '40vw', pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 70%)'}} /> */}
        <div style={{position: 'absolute', right: '-10vw', bottom: '-42vw', width: '40vw', height: '40vw', pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 70%)'}} />
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

          {/* StickyScroll placed between heading and marquee, inside container */}
          <div className="mb-10">
            <TracingBeam>
              <StickyScroll contentClassName="w-full" content={[
              { title: "Sticky Card 1", description: "This is the first sticky card." },
              { title: "Sticky Card 2", description: "This is the second sticky card." },
              { title: "Sticky Card 3", description: "This is the third sticky card." },
            ]} />
            </TracingBeam>
          </div>

        </motion.div>

        {/* Clients Section with Infinite Horizontal Scrolling */}
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
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tighter text-[#ffffff]"
            >
              Our Clients
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-md md:text-lg text-white max-w-2xl mx-auto mb-12"
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


      
      {/* Dedicated section for Testimonials after 'Our Clients' */}
      <TestimonialsSection />

      {/* Footer Section */}
      </div>

      <Footer />
    </div>
  );
}