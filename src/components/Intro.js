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
import { useMediaQuery } from "react-responsive";

const ScrollHero = () => {
  // Width breakpoints with md representing laptop screens:
  // xs: <640 (phones), sm: 640-1023 (tablets/small), md: 1024-1439 (laptops),
  // lg: 1440-1919 (large desktops), xl+: >=1920 (ultra-wide/4k)
  const isWidthXS = useMediaQuery({ maxWidth: 639 });
  const isWidthSM = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isWidthMD = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isWidthLG = useMediaQuery({ minWidth: 1440, maxWidth: 1919 });
  const isWidthXLPlus = useMediaQuery({ minWidth: 1920 });

  // Height tiers (practical ranges)
  const isHeightXS = useMediaQuery({ maxHeight: 639 });
  const isHeightSM = useMediaQuery({ minHeight: 640, maxHeight: 767 });
  const isHeightMD = useMediaQuery({ minHeight: 768, maxHeight: 899 });
  const isHeightLG = useMediaQuery({ minHeight: 900, maxHeight: 1079 });
  const isHeightXL = useMediaQuery({ minHeight: 1080 });

  // Base offset from width
  const widthOffset = isWidthXS
    ? { x: 3, y: 22 } // phones
    : isWidthSM
    ? { x: 5, y: 28 } // tablets
    : isWidthMD
    ? { x: 5, y: 44 } // laptops (md)
    : isWidthLG
    ? { x: 1, y: 36 } // large desktops
    : { x: 12, y: 46 }; // ultra-wide/4k

  // Y adjustment from height
  const yAdjust = isHeightXS
    ? -8
    : isHeightSM
    ? -4
    : isHeightMD
    ? 0
    : isHeightLG
    ? 4
    : 8; // height XL

  const offset = { x: widthOffset.x, y: widthOffset.y + yAdjust };

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

    // Overlay and logo mask logic
    const initialOverlayScale = 350;
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
      const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
      const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;
      const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

      const logoHorizontalPosition =
        logoDimensions.left +
        (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
        logoBoundingBox.x * logoScaleFactor +
        offset.x;

      const logoVerticalPosition =
        logoDimensions.top +
        (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
        logoBoundingBox.y * logoScaleFactor +
        offset.y; // responsive vertical offset

      // Set logoMask transform
      if (logoMask) {
        logoMask.setAttribute(
          "transform",
          `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`
        );
      }

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

          if (fadeOverlay) fadeOverlay.style.opacity = fadeOpacity;

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
  }, [
    isWidthXS,
    isWidthSM,
    isWidthMD,
    isWidthLG,
    isWidthXLPlus,
    isHeightXS,
    isHeightSM,
    isHeightMD,
    isHeightLG,
    isHeightXL,
    offset.x,
    offset.y,
  ]);

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
      background: #171e3a;
      overflow: hidden;
      }

      .hero-img-container,
      .hero-img-container img,
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
        width: 250px;
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
      }
      .overlay {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center 15%;
          width: 100%;
          height: 200%;
          z-index: 1;
        }

        .logo-container {
          position: fixed;
          top: 25%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 150px;
          z-index: 2;
        }

        .overlay-copy {
  z-index: 10 !important;
  position: absolute;
  top: 70%;
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

      <div className="hero-img-logo">
        <Image src={studioDevstag} alt="Studio DevStag" width={500} height={120} />
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

      <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%',  borderRadius: '1.25rem' }}>
        
      <div style={{
          margin: '0px auto 0 auto',
          width: '100%',
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.35), 0 1px 8px 0 rgba(0,0,0,0.15)',
          backgroundColor: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundImage: 'linear-gradient(120deg, rgba(4, 4, 4, 0.22), rgba(127,60,255,0.11), rgba(0,0,0,0.09))',
          // backgroundImage: "linear-gradient(180deg, rgba(25, 13, 66, 0) 4%, #190D42 33%, #4F34C7 67%, #7A6ECA 100%)",
          backgroundSize: '30px',
          // boxShadow: '0 4px 32px 0 rgba(127,60,255,0.10)',
          // border: '1.5px solid rgba(255,255,255,0.13)',
          marginBottom: 320,
        }} >

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 90 }}>
          <Navbar />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 90, gap: 700 }}>

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
        }} style={{
          marginTop: 295,
          marginLeft: 100,
          padding: '5px 20px 5px 20px',
          borderRadius: '999px',
          fontWeight: 700,
          width: '300px',
          fontSize: '1.1rem',
          background: '#fff',
          color: '#181818',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
          cursor: 'pointer',
          gap: '12px',
        }}>
          LETS GET STARTED
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 12,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#ff4ecd 0%,#b983ff 100%)',
            boxShadow: '0 2px 8px 0 rgba(186,131,255,0.10)',
          }}>
            <FaArrowUpRightFromSquare style={{ color: '#fff', width: 13, height: 13 }} />
          </span>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 60, marginTop: 200, maxWidth: 340}}>
          <p style={{ margin: 0, marginBottom: 10, fontSize: '1.08rem', color: '#fff', maxWidth: 320, textAlign: 'right', fontWeight: 400 }}>
            Explore how we transform digital brands with our creative vision.
            We craft unique digital experiences that captivate.
          </p>
          <div style={{
            boxSizing: 'border-box',
            width: '220px',
            padding: '3px 22px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            color: '#fff',
            fontWeight: 400,
            
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '1.02rem',
            boxShadow: '0 2px 12px 0 rgba(186,131,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 4,
            // marginRight: 30,
            cursor: 'default',
            userSelect: 'none',
          }}>
            <FaGlobe style={{ color: '#fff', fontSize: '1.2em', marginRight: 10 }} />
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