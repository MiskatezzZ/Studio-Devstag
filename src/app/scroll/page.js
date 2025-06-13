"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import intro from "@/assets/figmapart.webp";
import studioDevstag from "@/assets/logo.png";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { logoData } from "@/lib/intropath";

const ScrollHero = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();

    // DOM element selections
    const heroImgContainer = document.querySelector(".hero-img-container");
    const heroImgLogo = document.querySelector(".hero-img-logo");
    const heroImgCopy = document.querySelector(".hero-img-copy");
    const fadeOverlay = document.querySelector(".fade-overlay");
    const svgOverlay = document.querySelector(".overlay");
    const overlayCopy = document.querySelector("h1");

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
        logoBoundingBox.x * logoScaleFactor
        + 25;

      const logoVerticalPosition =
        logoDimensions.top +
        (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
        logoBoundingBox.y * logoScaleFactor
        + 60; // Shifts the mask logo 60px lower

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
      lenis.raf(time * 1000);
    }

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
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
      background: #111117;
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
  color: red !important;
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
      <Image src={intro} alt="Intro All" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} />

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
            <rect width="100%" height="100%" fill="white" />
            <path id="logoMask"></path>
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="#111117"
          mask="url(#logoRevealMask)"
        />
      </svg>
     </div>

     <div className="logo-container"></div>

     <div className="overlay-copy">
      <h1>Animation Experiment 452</h1>
     </div>
    </section>


    <section className="outro">
      <p>Outro Section</p>
    </section>
  </div>
  );
};

export default ScrollHero;
