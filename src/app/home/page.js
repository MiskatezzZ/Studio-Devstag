"use client";

import { motion } from "framer-motion";
import MagicBento from "@/components/ui/Magicbento";
import DarkVeil from "@/components/ui/Darkveil";
import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import useLenis from "@/hooks/useLenis";
import Footer from "@/components/Footer";
import { StickyScroll } from "@/components/ui/stcikyreveal";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Intro from "@/components/Intro";
import FloatingGallery from "@/components/FloatingGallery";
import Capsules from "@/components/capsules";
import PortalScrollDemo from "@/components/3D/vrmodel";

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
    className="absolute inset-0 w-full h-full z-0"
    style={{
      background: "#000",
      backgroundImage: "url('/Devkia2.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundBlendMode: "normal",
      minHeight: '100vh'
    }}
  />

  <div className="min-h-screen flex flex-col items-start justify-center text-white text-left relative z-10" style={{ paddingLeft: '6%', paddingRight: '6%' }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-[88%] sm:w-[84%] md:w-[62%] lg:w-[48%] xl:w-[42%]"
      style={{
        marginTop: '18vh',
        marginLeft: '6%'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-[2vh] sm:mb-[2.4vh] md:mb-[3vh] lg:mb-[3.6vh] xl:mb-[4vh]"
        style={{ marginTop: '-6vh' }}
      >
        <span className="inline-block whitespace-nowrap py-[1.2vh] px-[4vw] sm:px-[3.2vw] md:px-[2.4vw] lg:px-[2vw] xl:px-[1.6vw] text-[clamp(1.4vh,3vw,2.2vh)] sm:text-[clamp(1.4vh,2.4vw,2.1vh)] md:text-[clamp(1.3vh,1.6vw,1.8vh)] lg:text-[clamp(1.2vh,1.2vw,1.6vh)] xl:text-[clamp(1.1vh,1vw,1.5vh)] font-medium text-yellow-300 tracking-widest uppercase bg-white/5 backdrop-blur-sm border-[0.2vw] md:border-[0.15vw] lg:border-[0.12vw] xl:border-[0.1vw] border-white/10 rounded-full">
          NOW LIVE
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-bold tracking-tighter leading-[1.12] mb-[4vh] sm:mb-[4.8vh] md:mb-[5.6vh] lg:mb-[6.4vh] xl:mb-[7vh] text-[clamp(3.8vh,9vw,7.2vh)] sm:text-[clamp(4vh,8vw,7.4vh)] md:text-[clamp(4.4vh,5.6vw,7.6vh)] lg:text-[clamp(4.8vh,4.6vw,7.8vh)] xl:text-[clamp(5vh,4vw,8vh)]"
      >
        <span className="block">Introducing</span>
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
          DevStag Studio
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-blue-100/80 font-light tracking-wide leading-[1.6] mb-[4vh] sm:mb-[4.8vh] md:mb-[5.6vh] lg:mb-[6.4vh] xl:mb-[7vh] text-[clamp(1.8vh,3.6vw,2.8vh)] sm:text-[clamp(1.8vh,3vw,2.6vh)] md:text-[clamp(1.7vh,2vw,2.4vh)] lg:text-[clamp(1.6vh,1.6vw,2.2vh)] xl:text-[clamp(1.5vh,1.4vw,2vh)] w-[92%] sm:w-[88%] md:w-[85%] lg:w-[82%] xl:w-[78%]"
      >
        Every project is artistically curated but grounded in real-time
        performance, ensuring both aesthetics and usability.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex flex-col sm:flex-row justify-start w-full gap-[4vw] sm:gap-[3.4vw] md:gap-[2.6vw] lg:gap-[2vw] xl:gap-[1.6vw]"
        style={{ marginLeft: '1%' }}
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 3vw rgba(255, 46, 203, 0.45)" }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-[#ff2ecb] to-[#d94cf7] rounded-full font-medium uppercase tracking-wider hover:opacity-90 transition-all w-full sm:w-auto py-[1.8vh] sm:py-[1.8vh] md:py-[1.6vh] lg:py-[1.4vh] xl:py-[1.2vh] px-[6vw] sm:px-[5vw] md:px-[4vw] lg:px-[3.2vw] xl:px-[2.8vw] text-[clamp(1.6vh,3.2vw,2.6vh)] sm:text-[clamp(1.6vh,2.6vw,2.4vh)] md:text-[clamp(1.5vh,1.8vw,2.2vh)] lg:text-[clamp(1.4vh,1.5vw,2vh)] xl:text-[clamp(1.3vh,1.3vw,1.8vh)]"
        >
          Start free trial
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/5 backdrop-blur-sm border-white/10 rounded-full font-medium uppercase tracking-wider hover:bg-white/20 transition-all w-full sm:w-auto border-[0.2vw] md:border-[0.15vw] lg:border-[0.12vw] xl:border-[0.1vw] py-[1.8vh] sm:py-[1.8vh] md:py-[1.6vh] lg:py-[1.4vh] xl:py-[1.2vh] px-[6vw] sm:px-[5vw] md:px-[4vw] lg:px-[3.2vw] xl:px-[2.8vw] text-[clamp(1.6vh,3.2vw,2.6vh)] sm:text-[clamp(1.6vh,2.6vw,2.4vh)] md:text-[clamp(1.5vh,1.8vw,2.2vh)] lg:text-[clamp(1.4vh,1.5vw,2vh)] xl:text-[clamp(1.3vh,1.3vw,1.8vh)]"
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
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-blue-500/20 blur-xl" 
        style={{
          width: '50%',
          height: '2vh'
        }}
      />
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


                {/* Magic Bento Box Section */}
        <section style={{ 
          background: 'transparent', 
          zIndex: 21, 
          position: 'relative', 
          paddingTop: '80px', 
          paddingBottom: '80px', 
          width: '100vw', 
          marginLeft: 'calc(50% - 50vw)', 
          marginRight: 'calc(50% - 50vw)', 
          isolation: 'isolate', 
          overflow: 'hidden' 
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <DarkVeil 
              resolutionScale={1} 
              noiseIntensity={0.02} 
              scanlineIntensity={0.06} 
              scanlineFrequency={6} 
              warpAmount={0.03} 
            />
          </div>
          <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
            <MagicBento 
              textAutoHide={true} 
              enableStars={true} 
              enableSpotlight={true} 
              enableBorderGlow={true} 
              disableAnimations={false} 
              enableTilt={false} 
              enableMagnetism={false} 
              enableHoverLift={false} 
              clickEffect={true} 
              spotlightRadius={300} 
              particleCount={12} 
              glowColor="132, 0, 255" 
            />
          </div>
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