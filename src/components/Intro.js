"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import intro from "@/assets/introbg.png";
import studioDevstag from "@/assets/logo3.png";
import gsap from "gsap";
import { FaArrowUpRightFromSquare, FaGlobe } from "react-icons/fa6";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import { logoData } from "@/lib/intropath3";

const ScrollHero = () => {
  // Use a single percentage-based offset that scales with the logo container size.
  // This keeps the mask aligned consistently across all widths without branching.

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Kill existing triggers when breakpoints change to avoid stacking
    ScrollTrigger.getAll().forEach((t) => t.kill());
    const lenis = new Lenis();

    // DOM element selections
    const heroImgContainer = document.querySelector(".hero-img-container");
    const heroImgLogo = document.querySelector(".hero-img-logo");
    const heroImgCopy = document.querySelector(".hero-img-copy");
    const fadeOverlay = document.querySelector(".fade-overlay");
    const svgOverlay = document.querySelector(".overlay");
    const overlayCopy = document.querySelector(".overlay-copy div");
    const overlayCard = document.getElementById("overlayCard");

    // Overlay and logo mask logic
    const initialOverlayScale = 700;
    const logoContainer = document.querySelector(".logo-container");
    const logoMask = document.getElementById("logoMask");
    // If logoData is defined/imported, set the d attribute
    if (logoMask && typeof logoData !== 'undefined') {
      logoMask.setAttribute("d", logoData);
    }
    const logoDimensions = logoContainer?.getBoundingClientRect();
    const logoBoundingBox = logoMask?.getBBox ? logoMask.getBBox() : null;

    // Scale and position calculations
    if (logoDimensions && logoBoundingBox) {
      // Single offset applied for all widths (percentage of container size)
      // Chosen as a balanced midpoint of prior values.
      // const pct = { x: 0.02, y: 0.21 };
      const pct = { x: 0, y: -0.24 };

      const offsetX = logoDimensions.width * pct.x;
      const offsetY = logoDimensions.height * pct.y;

      const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
      const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;
      const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

      const logoHorizontalPosition =
        logoDimensions.left +
        (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
        logoBoundingBox.x * logoScaleFactor +
        offsetX;

      const logoVerticalPosition =
        logoDimensions.top +
        (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
        logoBoundingBox.y * logoScaleFactor +
        offsetY; // responsive vertical offset

      // Set logoMask transform
      if (logoMask) {
        logoMask.setAttribute(
          "transform",
          `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`
        );
      }

      // Make the overlay card fully transparent initially (avoid initial color flash)
      if (overlayCard) gsap.set(overlayCard, { opacity: 0 });

      // Make overlays fully transparent initially so the image shows through
      if (svgOverlay) gsap.set(svgOverlay, { opacity: 0 });
      if (fadeOverlay) gsap.set(fadeOverlay, { opacity: 0 });

      // ScrollTrigger pinning and fade effect
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          const fadeOpacity = 1 - scrollProgress * (1 / 0.15);

          if (scrollProgress <= 0.15) {
            gsap.set([heroImgLogo, heroImgCopy], { opacity: fadeOpacity });
          } else {
            gsap.set([heroImgLogo, heroImgCopy], { opacity: 0 });
          }

          // Do NOT show the white fade overlay at start; it will be handled by the later block
          // if (fadeOverlay) fadeOverlay.style.opacity = fadeOpacity;

          // Fade in the SVG overlay (gradients + mask) after a small scroll
          if (svgOverlay) {
            const ovStart = 0.05; // 5%
            const ovEnd = 0.15;   // 15%
            let ovOpacity = 0;
            if (scrollProgress > ovStart) {
              ovOpacity = Math.min(1, (scrollProgress - ovStart) / (ovEnd - ovStart));
            }
            gsap.set(svgOverlay, { opacity: ovOpacity });
          }

          // Make the overlay card (line ~378 div) transparent until a little scroll (0-5%)
          if (overlayCard) {
            const start = 0.0; // start hidden at 0%
            const end = 0.50;  // fully visible by 5%
            let cardOpacity = 0;
            if (scrollProgress > start) {
              cardOpacity = Math.min(1, (scrollProgress - start) / (end - start));
            }
            gsap.set(overlayCard, { opacity: cardOpacity });
          }

          // Scaling logic for heroImgContainer and svgOverlay
          let fadeOverlayOpacity = 0;
          if (scrollProgress <= 0.85) {
            const normalizedProgress = scrollProgress * (1 / 0.85);
            const heroImgContainerScale = 1.2 - 0.2 * normalizedProgress;
            const overlayScale =
              initialOverlayScale *
              Math.pow(1 / initialOverlayScale, normalizedProgress);

            gsap.set(heroImgContainer, {
              scale: heroImgContainerScale,
            });

            gsap.set(svgOverlay, {
              scale: overlayScale,
            });
          }

          // Fade overlay in after scrollProgress >= 0.25
          if (scrollProgress >= 0.25) {
            fadeOverlayOpacity = Math.min(1, (scrollProgress - 0.25) * (1 / 0.4));
          }

          gsap.set(fadeOverlay, {
            opacity: fadeOverlayOpacity,
          });

          // Overlay copy reveal logic
          if (scrollProgress > 0.6 && scrollProgress < 0.85) {
            const overlayCopyRevealProgress = (scrollProgress - 0.6) * (1 / 0.25);

            const gradientSpread = 100;
            const gradientBottomPosition = 240;
            let overlayCopyRevealProgressValue = 280;
            const gradientTopPosition = gradientBottomPosition - gradientSpread;
            const overlayCopyScale = 1.25 - 0.25 * overlayCopyRevealProgress;
            overlayCopyRevealProgressValue = overlayCopyRevealProgress;

            if (overlayCopy) {
              overlayCopy.style.background = `linear-gradient(to bottom, #111117 0%, #111117 ${gradientTopPosition}%, #e66461 ${gradientBottomPosition}%, #e66461 100%)`;
              overlayCopy.style.backgroundClip = "text";
            }
            gsap.set(overlayCopy, {
              scale: overlayCopyScale,
              opacity: overlayCopyRevealProgress,
            });
          } else if (scrollProgress <= 0.6) {
            gsap.set(overlayCopy, {
              opacity: 0,
            });
          }
        },
      });
    }

    function raf(time) {
      lenis.raf(time * 500);
    }

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup triggers and GSAP ticker when effect re-runs/unmounts
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(raf);
      lenis.on("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return (
  <div>
    <style jsx>{`

     img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      }

      section {
      position: relative;
      width: 100vw;
      height: 100vh;
      background: transparent;
      overflow: hidden;
      }

      .hero-img-container,
      .hero-img-container-img,
      .fade-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .hero-img-logo img {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        width: 250vw;
        height: auto;
        object-fit: contain;
      }
      .hero-img-copy {
        position: absolute;
        bottom: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        will-change: opacity;
      }
      .fade-overlay {
        background-color: #fff;
        will-change: opacity;
        opacity: 0; /* start fully transparent */
      }
      .overlay {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center 15%;
          width: 100%;
          height: 200%;
          z-index: 1;
          opacity: 0; /* start fully transparent */
        }

        .logo-container {
          position: fixed;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 18vw;
          height: 10vh;
          z-index: 2;
        }

        .overlay-copy {
  z-index: 10 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.overlay-copy h1 {
  z-index: 11 !important;
  position: relative;
  color: #4f7fff !important;
  font-size: 4rem;
  font-weight: bold;
  background: none !important;
  background-clip: unset !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
  text-align: center;
}
          transform-origin: center 0%;
        }
        
        .outro {
          display: flex;
          align-items: center;
          justify-content: center;
        }

    `}</style>
   

    <section className="hero">

    <div className="hero-img-container">
      <Image src={intro} alt="Intro All" style={{ width: '100vw', height: '100vh', objectFit: 'fill' }} />

      <div className="hero-img-logo w-[400vw] h-auto">
  <Image
    src={studioDevstag}
    alt="Studio DevStag"
    layout="responsive"
    width={1000}
    height={24}
  />
</div>


       
      <Image src={intro} alt="Intro Removed" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} />

      <div className="hero-img-copy">
        <p>Scroll down to reveal</p>
      </div>
    </div>

    <div className="fade-overlay"></div>

    <div className="overlay">
      <svg width="100%" height="100%">
        <defs>
          <mask id="logoRevealMask">
            <rect width="100%" height="100vh" fill="white" />
            <path id="logoMask"></path>
          </mask>
          <radialGradient id="pinkLeft" cx="15%" cy="35%" r="40%">
  <stop offset="0%" stop-color="#fff" stop-opacity="1" />
  <stop offset="10%" stop-color="#f3eaff" stop-opacity="0.9" />
  <stop offset="20%" stop-color="#e0cfff" stop-opacity="0.8" />
  <stop offset="30%" stop-color="#cdb5ff" stop-opacity="0.7" />
  <stop offset="40%" stop-color="#b99cff" stop-opacity="0.6" />
  <stop offset="50%" stop-color="#a683ff" stop-opacity="0.5" />
  <stop offset="60%" stop-color="#946bff" stop-opacity="0.4" />
  <stop offset="70%" stop-color="#8254ff" stop-opacity="0.3" />
  <stop offset="80%" stop-color="#713eff" stop-opacity="0.2" />
  <stop offset="90%" stop-color="#652fff" stop-opacity="0.1" />
  <stop offset="100%" stop-color="#7f3cff" stop-opacity="0" />
</radialGradient>
          <radialGradient id="whiteRight" cx="80%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
  <stop offset="10%" stop-color="#f3eaff" stop-opacity="0.9" />
  <stop offset="20%" stop-color="#e0cfff" stop-opacity="0.8" />
  <stop offset="30%" stop-color="#cdb5ff" stop-opacity="0.7" />
  <stop offset="40%" stop-color="#b99cff" stop-opacity="0.6" />
  <stop offset="50%" stop-color="#a683ff" stop-opacity="0.5" />
  <stop offset="60%" stop-color="#946bff" stop-opacity="0.4" />
  <stop offset="70%" stop-color="#8254ff" stop-opacity="0.3" />
  <stop offset="80%" stop-color="#713eff" stop-opacity="0.2" />
  <stop offset="90%" stop-color="#652fff" stop-opacity="0.1" />
  <stop offset="100%" stop-color="#7f3cff" stop-opacity="0" />
          </radialGradient>
        {/* <linearGradient id="tabGradient" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(120)">
          <stop offset="0%" stop-color="rgba(109, 79, 232, 0.3)" />
          <stop offset="100%" stop-color="rgba(121, 76, 225, 0.2)" />
        </linearGradient> */}
          <radialGradient id="whiteInner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.4" />
  <stop offset="10%" stop-color="#fff" stop-opacity="0.3" />
  <stop offset="20%" stop-color="#fff" stop-opacity="0.2" />
  <stop offset="30%" stop-color="#fff" stop-opacity="0.1" />
  <stop offset="40%" stop-color="#fff" stop-opacity="0.05" />
  <stop offset="50%" stop-color="#fff" stop-opacity="0.02" />
  <stop offset="60%" stop-color="#fff" stop-opacity="0.01" />
  <stop offset="70%" stop-color="#fff" stop-opacity="0.005" />
  <stop offset="80%" stop-color="#fff" stop-opacity="0.002" />
  <stop offset="90%" stop-color="#fff" stop-opacity="0.001" />
          </radialGradient>
        </defs>
        <rect
              x="0"
              y="0"
              width="100vw"
              height="100vh"
          fill="#000"
          mask="url(#logoRevealMask)"
        />
        <circle
          cx="10%"
          cy="38%"
          r="35%"
          fill="url(#pinkLeft)"
          mask="url(#logoRevealMask)"
        />
        <circle
          cx="85%"
          cy="15%"
          r="45%"
          fill="url(#whiteRight)"
          mask="url(#logoRevealMask)"
        />
        <circle
          cx="95%"
          cy="12%"
          r="28%"
          fill="url(#whiteInner)"
          mask="url(#logoRevealMask)"
        />
      </svg>
    </div>

     <div className="logo-container"></div>

     <div className="overlay-copy">

      <div id="overlayCard" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%',  borderRadius: '1.25rem', opacity: 0 }}>
        
      <div id="glassCard" style={{
          margin: '0 auto',
          width: '98vw',
          maxWidth: '100%',
          height: '90vh',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '1.5vw',
          boxShadow: '0 0.4vh 2.4vh 0 rgba(0,0,0,0.35), 0 0.1vh 0.8vh 0 rgba(0,0,0,0.15)',
          backgroundColor: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(2vh)',
          WebkitBackdropFilter: 'blur(2vh)',
          backgroundImage: 'linear-gradient(120deg, rgba(4, 4, 4, 0.22), rgba(127,60,255,0.11), rgba(0,0,0,0.09))',
          // backgroundImage: "linear-gradient(180deg, rgba(25, 13, 66, 0) 4%, #190D42 33%, #4F34C7 67%, #7A6ECA 100%)",
          backgroundSize: '3vh',
          // boxShadow: '0 4px 32px 0 rgba(127,60,255,0.10)',
          // border: '1.5px solid rgba(255,255,255,0.13)',
          padding: '4vh 4vw',
          position: 'relative',
        }} >

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 90 }}>
          <Navbar />
        </div>
        
        <div className="flex w-full items-end justify-between sm:mt-[12vh] md:mt-[15vh] lg:mt-[18vh] xl:mt-[22vh] sm:mb-[8vh] md:mb-[10vh] lg:mb-[12vh] xl:mb-[14vh]" style={{ display: 'flex' }}>

        <button onClick={() => {
          const target = document.getElementById('studio');
          if (target) {
            const startPosition = window.pageYOffset;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1500; // 1.5 seconds
            let start = null;

            function step(timestamp) {
              if (!start) start = timestamp;
              const progress = timestamp - start;
              const percentage = Math.min(progress / duration, 1);
              
              // Easing function (easeInOutQuad)
              const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
              
              window.scrollTo(0, startPosition + distance * easeInOutQuad(percentage));
              
              if (progress < duration) {
                window.requestAnimationFrame(step);
              }
            }
            
            window.requestAnimationFrame(step);
          }
        }} className="rounded-full inline-flex items-center sm:ml-[4vw] md:ml-[4vw] lg:ml-[4vw] xl:ml-[4vw] sm:w-[44vw] md:w-[34vw] lg:w-[24vw] xl:w-[20vw] sm:px-[4vw] md:px-[3vw] lg:px-[2.4vw] xl:px-[2vw] sm:py-[1.6vh] md:py-[1.4vh] lg:py-[1.2vh] xl:py-[1.1vh] sm:text-[2.6vw] md:text-[1.9vw] lg:text-[1.1vw] xl:text-[1vw] gap-[1.2vw]" style={{
          borderRadius: '50vh',
          fontWeight: 700,
          background: '#fff',
          color: '#181818',
          border: 'none',
          boxShadow: '0 0.5vh 4vh 0 rgba(0,0,0,0.06)',
          cursor: 'pointer',
        }}>
          LETS GET STARTED
          <span className="shrink-0 sm:ml-[1.5vw] sm:w-[3vh] sm:h-[3vh] md:ml-[1.2vw] md:w-[2.8vh] md:h-[2.8vh] lg:ml-[1vw] lg:w-[2.5vh] lg:h-[2.5vh] xl:ml-[0.8vw] xl:w-[2.2vh] xl:h-[2.2vh]" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#ff4ecd 0%,#b983ff 100%)',
            boxShadow: '0 0.5vh 2vh 0 rgba(186,131,255,0.10)',
          }}>
            <FaArrowUpRightFromSquare className="sm:w-[1.8vw] sm:h-[1.8vw] md:w-[1.5vw] md:h-[1.5vw] lg:w-[1.2vw] lg:h-[1.2vw] xl:w-[1vw] xl:h-[1vw]" style={{ color: '#fff' }} />
          </span>
        </button>

        <div className="sm:mr-[6vw] md:mr-[8vw] lg:mr-[10vw] xl:mr-[12vw]" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <p className="sm:text-[2.5vw] sm:max-w-[40vw] sm:mb-[2vh] md:text-[2.2vw] md:max-w-[35vw] md:mb-[1.8vh] lg:text-[1.8vw] lg:max-w-[30vw] lg:mb-[1.5vh] xl:text-[1.5vw] xl:max-w-[25vw] xl:mb-[1.2vh]" style={{ margin: 0, color: '#fff', textAlign: 'right', fontWeight: 400 }}>
            Explore how we transform digital brands with our creative vision. We craft unique digital experiences that captivate.
          </p>
          <div className="sm:w-[28vw] sm:px-[3vw] sm:py-[0.8vh] sm:text-[1.8vw] md:w-[25vw] md:px-[2.5vw] md:py-[0.7vh] md:text-[1.6vw] lg:w-[22vw] lg:px-[2vw] lg:py-[0.6vh] lg:text-[1.4vw] xl:w-[18vw] xl:px-[1.8vw] xl:py-[0.5vh] xl:text-[1.2vw]" style={{
            boxSizing: 'border-box',
            borderRadius: '50vh',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(2vh)',
            WebkitBackdropFilter: 'blur(2vh)',
            border: '0.2vh solid rgba(255, 255, 255, 0.25)',
            color: '#fff',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.1vw',
            boxShadow: '0 0.5vh 3vh 0 rgba(186,131,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1vh',
            cursor: 'default',
            userSelect: 'none',
          }}>
            <FaGlobe className="sm:text-[1.8vw] sm:mr-[1.5vw] md:text-[1.6vw] md:mr-[1.2vw] lg:text-[1.4vw] lg:mr-[1vw] xl:text-[1.2vw] xl:mr-[0.8vw]" style={{ color: '#fff' }} />
            WORLD CLASS AGENCY
          </div>
        </div>

        </div>

      </div>

      </div>

     </div>

    </section>


    {/* <section className="outro">
      <p>Outro Section</p>
    </section> */}
  </div>
  );
};

export default ScrollHero;