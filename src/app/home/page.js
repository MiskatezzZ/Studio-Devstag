"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import useLenis from "@/hooks/useLenis";
import intro from "@/assets/introbg.png";

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
import Loader from "@/components/Loader";
import PortalScrollDemo from "@/components/3D/vrmodel";
import FloatingGallery from "@/components/FloatingGallery";

// import gsap from "gsap";
// import { CustomEase } from "gsap/CustomEase";
// import { SplitText } from "gsap/SplitText";


// import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";



export default function Home() {
  // const [isLoaded, setIsLoaded] = useState(false);

  // const handleLoaderComplete = () => {
  //   setIsLoaded(true);
  // };

  // Initialize Lenis for smooth scrolling
  const lenis = useLenis({
    autoRaf: true,
  });

  const worksRef = useRef(null);

  // useEffect(() => {

  // }, [isLoaded]);

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
      worksRef.current.style.boxShadow = `0px -${moveUpAmount / 2}px ${moveUpAmount * 1.5}px rgba(10, 15, 44, ${moveUpAmount / 300})`;

      // Add margin adjustment to create gap closing effect
      worksRef.current.style.marginTop = `${50 - moveUpAmount / 3}px`;
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

  // Early return moved after all hooks
    // if (!isLoaded) {
    //   return <Loader onComplete={handleLoaderComplete} />;
    // }

  return (
    <div style={{ maxWidth: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Intro Section */}
        <section style={{ position: 'relative', zIndex: 2000 }}>
          <Intro />
        </section>

        {/* Introducing Studio Devstag Section */}
        <section id="studio" className="relative min-h-screen w-full overflow-hidden" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
          <div
            className="absolute inset-0 w-full h-[105vh] z-0"
            style={{
              background: "#000",
              backgroundImage: "url('/hands.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "normal"
            }}
          />

          <div className="min-h-screen flex flex-col items-start justify-center text-white text-left px-4 pt-0 pb-20 container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl relative z-10 mt-[130px] ml-0 md:ml-2 lg:ml-6"
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
                className="flex flex-col sm:flex-row justify-start gap-5 ml-0 md:ml-1 lg:ml-1"
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

        {/* 3d VR rotation section */}
        <section
          ref={worksRef}
          className="relative w-full py-20 px-0 mt-[50px] rounded-t-[40px] ml-4 shadow-2xl will-change-transform overlap-section"
          style={{
            // transform: "translateY(0) scale(1)",
            opacity: 1,
            // transition: "transform 0.3s ease-out, opacity 0.3s ease-out, box-shadow 0.3s ease-out",
            zIndex: 20,
            position: "relative",

            backdropFilter: "none",
            marginLeft: 0,
            marginRight: 0,
            width: "100vw",
            maxWidth: "110%",
            overflowX: "hidden"
            // overflowY: "hidden"
          }}
        >
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '-40vw',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: '100vw',
            pointerEvents: 'none',
            zIndex: 1,
            background: 'radial-gradient(ellipse 60% 90% at 50% 0%,rgb(0, 0, 0) 0%, #000 100%)'
          }} />

          {/* Additional solid background layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="w-full relative z-10"
          >

            <div className="relative w-[100vw]" >
              <PortalScrollDemo />
              {/* <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-yellow-300 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
                PREMIUM PROJECT 2
              </span> */}
            </div>

          </motion.div>
        </section>


        {/* Sticky Videos 1by1 showing section */}
        <section style={{ position: 'relative', zIndex: 2000, }}>
          <Sticky />
        </section>


        {/* As Seen in & Our clients section */}
        <section
          style={{ background: 'linear-gradient(180deg, rgb(14, 2, 42) 0%, #190D42 33%, #4F34C7 67%,rgb(1, 1, 1) 100%)', zIndex: 21, position: 'relative', paddingTop: '80px', paddingBottom: '80px', overflowX: 'clip' }}
        >
          {/* Spotlight Background Layer */}

          {/* Bottom left and right radial gradient balls */}
          {/* <div style={{position: 'absolute', left: '-10vw', bottom: '-25vw', width: '40vw', height: '40vw', pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 70%)'}} /> */}
          <div style={{ position: 'absolute', right: '-10vw', bottom: '-42vw', width: '40vw', height: '40vw', pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 70%)' }} />
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

        </section>  

        {/* Violet 3 boxes section */}
        {/* <TestimonialsSection /> */}

        <section style={{
          background: "black",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          padding: 0,
          border: "none",
          position: "relative",
          zIndex: 30
        }}>
          <svg style={{ display: "none" }}>
            <filter id="wavy-distort">
              <feTurbulence id="turb" baseFrequency="0.02 0.03" numOctaves="2" seed="2" type="fractalNoise" result="turb"/>
              <feDisplacementMap in2="turb" in="SourceGraphic" scale="18" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </svg>
          <FloatingGallery />
        </section>

        {/* Footer Section */}
      </div>
      <Footer />
    </div>
  );
}