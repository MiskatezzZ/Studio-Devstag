"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from "@react-three/fiber";
import Scene from "@/components/3D/Scene";

gsap.registerPlugin(ScrollTrigger);

const PortalScrollDemo = () => {
  const modelRef = useRef();
  const mainRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getResponsiveValues = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Extra small devices
      if (w <= 480) {
        return {
          x1: '0vw', y1: '25vh',
          x2: '-15vw', y2: '45vh',
          x3: '15vw', y3: '100vh',
          x4: '0vw', y4: '150vh',
          endMult: 0.8,
        };
      }
      // Small devices (your original SM)
      else if (w <= 640) {
        return {
          x1: '0vw', y1: '30vh',
          x2: '-20vw', y2: '50vh',
          x3: '20vw', y3: '120vh',
          x4: '0vw', y4: '180vh',
          endMult: 0.9,
        };
      }
      // Medium devices - tablets
      else if (w <= 1024) {
        return {
          x1: '0vw', y1: '40vh',
          x2: '-25vw', y2: '65vh',
          x3: '25vw', y3: '170vh',
          x4: '0vw', y4: '240vh',
          endMult: 1.1,
        };
      }
      // Large devices
      else if (w <= 1440) {
        return {
          x1: '0vw', y1: '20vh',
          x2: '-30vw', y2: '60vh',
          x3: '40vw', y3: '198vh',
          x4: '0vw', y4: '250vh',
          endMult: 1.25,
        };
      }
      // Extra large devices
      else {
        return {
          x1: '0vw', y1: '15vh',
          x2: '-35vw', y2: '55vh',
          x3: '35vw', y3: '160vh',
          x4: '0vw', y4: '250vh',
          endMult: 0.8,
        };
      }
    };

    const buildTimeline = () => {
      const values = getResponsiveValues();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: () => {
            const endPx = Math.round(window.innerHeight * values.endMult);
            return `bottom+=${endPx} top`;
          },
          scrub: 2,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
      tl
        .to(modelRef.current, { x: values.x1, y: values.y1, ease: "none" })
        .to(modelRef.current, { x: values.x2, y: values.y2, ease: "none" })
        .to(modelRef.current, { x: values.x3, y: values.y3, duration: 2.5, ease: "none" })
        .to(modelRef.current, { x: values.x4, y: values.y4, ease: "none" });
      return tl;
    };

    let tl = buildTimeline();

    const handleResize = () => {
      if (tl?.scrollTrigger) tl.scrollTrigger.kill();
      if (tl) tl.kill();
      tl = buildTimeline();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tl?.scrollTrigger) tl.scrollTrigger.kill();
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div className="vr-root">
      {/* CHAND.svg at the top - now responsive */}
      <img 
        src="/CHAND.svg" 
        alt="Chand" 
        className="chand-svg-vr" 
      />

      <section ref={mainRef} className="vr-stage">
        <div ref={modelRef} className="vr-canvas">
          <Canvas>
            <Scene progress={progress} />
          </Canvas>
        </div>
      </section>

      <style jsx>{`
        .vr-root {
          --container-max: 100vw;
          --vr-bg: #000;
          --vr-px: 4vw;
          --vr-section-py: 6vh;
          --vr-canvas-h: 64vh;
          --vr-frame-bw: 0.35vw;
          --vr-frame-radius: 1.25vw;
          --vr-frame-shadow-blur: 2.4vw;
          --vr-frame-shadow-color: rgba(162, 89, 255, 0.8);
          --vr-gap-x: 2vw;
          --vr-shift: 1.5vw;
          --vr-frame-max-w: 44vw;
          --vr-frame-max-w-wide: 80vw;

          background: var(--vr-bg);
          min-height: 100vh;
          max-width: var(--container-max);
          padding: 0 var(--vr-px);
          position: relative;
          overflow-x: clip;
          margin: 0 auto;
          width: 100%;
        }

        .chand-svg-vr {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          pointer-events: none;
          object-fit: cover;
          width: 100vw;
          height: 100vh;
        }

        .vr-stage {
          position: relative;
          display: grid;
          place-items: center;
          height: 100vh;
          z-index: 10;
          background: transparent;
        }

        .vr-canvas {
          width: 100%;
          height: var(--vr-canvas-h);
          border-radius: var(--vr-frame-radius);
          overflow: hidden;
          background: transparent;
          position: relative;
          z-index: 15;
        }
        
        .vr-canvas canvas {
          background: transparent !important;
        }

        .vr-section {
          position: relative;
          padding-block: var(--vr-section-py);
        }

        /* Add a little extra space before the final box */
        .vr-section:last-of-type {
          margin-top: 40vh;
        }

        .vr-frame {
          background: rgba(0, 0, 0, 0.7);
          border: var(--vr-frame-bw) solid #fff;
          border-radius: var(--vr-frame-radius);
          box-shadow: 0 0 var(--vr-frame-shadow-blur) var(--vr-frame-shadow-color);
          overflow: hidden;
          width: 100%;
          max-width: var(--vr-frame-max-w);
          aspect-ratio: 16 / 9;
        }

        .vr-frame--right { margin-right: var(--vr-gap-x); }
        .vr-frame--left { margin-left: calc(-1 * var(--vr-shift)); }
        .vr-frame--center { max-width: var(--vr-frame-max-w-wide); }

        /* Layout helpers */
        .vr-flex {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: var(--vr-gap-x);
        }
        .vr-col {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vr-col--right { justify-content: flex-end; }
        .vr-spacer { width: 50%; }
        .vr-center { display: flex; align-items: center; justify-content: center; }
        .vr-top { z-index: 30; position: relative; }
        .vr-center-row { width: 100%; display: flex; align-items: center; justify-content: center; }

        /* Extra Small ≤480px */
        @media (max-width: 480px) {
          .vr-root {
            --vr-px: 3vw;
            --vr-section-py: 5vh;
            --vr-canvas-h: 40vh;
            --vr-frame-bw: 1vw;
            --vr-frame-radius: 4vw;
            --vr-frame-shadow-blur: 5vw;
            --vr-gap-x: 0vw;
            --vr-shift: 0vw;
            --vr-frame-max-w: 90vw;
            --vr-frame-max-w-wide: 90vw;
          }
          .chand-svg-vr { height: 70vh; }
          .vr-flex { flex-direction: column; }
          .vr-col, .vr-spacer { width: 100%; }
          .vr-spacer { display: none; }
          .vr-col--right { justify-content: center; }
          .vr-canvas { min-height: 35vh; }
        }

        /* SM ≤640px */
        @media (min-width: 481px) and (max-width: 640px) {
          .vr-root {
            --vr-px: 4vw;
            --vr-section-py: 8vh;
            --vr-canvas-h: 48vh;
            --vr-frame-bw: 0.8vw;
            --vr-frame-radius: 3vw;
            --vr-frame-shadow-blur: 4vw;
            --vr-gap-x: 0vw;
            --vr-shift: 0vw;
            --vr-frame-max-w: 92vw;
            --vr-frame-max-w-wide: 92vw;
          }
          .chand-svg-vr { height: 80vh; }
          .vr-flex { flex-direction: column; }
          .vr-col, .vr-spacer { width: 100%; }
          .vr-spacer { display: none; }
          .vr-col--right { justify-content: center; }
          .vr-canvas { min-height: 42vh; }
        }

        /* MD ≤1024px */
        @media (min-width: 641px) and (max-width: 1024px) {
          .vr-root {
            --vr-px: 5vw;
            --vr-section-py: 7vh;
            --vr-canvas-h: 56vh;
            --vr-frame-bw: 0.6vw;
            --vr-frame-radius: 2vw;
            --vr-frame-shadow-blur: 3vw;
            --vr-gap-x: 2vw;
            --vr-shift: 0.5vw;
            --vr-frame-max-w: 70vw;
            --vr-frame-max-w-wide: 84vw;
          }
          .vr-flex { flex-direction: column; }
          .vr-col, .vr-spacer { width: 100%; }
          .vr-spacer { display: none; }
          .vr-col--right { justify-content: center; }
          .vr-canvas { min-height: 50vh; }
        }

        /* LG 1025–1440px */
        @media (min-width: 1025px) and (max-width: 1440px) {
          .vr-root {
            --vr-px: 4vw;
            --vr-section-py: 6vh;
            --vr-canvas-h: 64vh;
            --vr-frame-bw: 0.35vw;
            --vr-frame-radius: 1.25vw;
            --vr-frame-shadow-blur: 2.4vw;
            --vr-gap-x: 2vw;
            --vr-shift: 1.5vw;
            --vr-frame-max-w: 44vw;
            --vr-frame-max-w-wide: 80vw;
          }
          .vr-flex { flex-direction: row; }
          .vr-col, .vr-spacer { width: 50%; }
          .vr-spacer { display: block; }
          .vr-col--right { justify-content: flex-end; }
          .vr-canvas { min-height: 58vh; }
        }

        /* XL ≥1441px */
        @media (min-width: 1441px) {
          .vr-root {
            --vr-px: 3vw;
            --vr-section-py: 5vh;
            --vr-canvas-h: 68vh;
            --vr-frame-bw: 0.25vw;
            --vr-frame-radius: 1vw;
            --vr-frame-shadow-blur: 1.8vw;
            --vr-gap-x: 1.5vw;
            --vr-shift: 1.2vw;
            --vr-frame-max-w: 40vw;
            --vr-frame-max-w-wide: 72vw;
          }
          .vr-flex { flex-direction: row; }
          .vr-col, .vr-spacer { width: 50%; }
          .vr-spacer { display: block; }
          .vr-col--right { justify-content: flex-end; }
          .vr-canvas { min-height: 62vh; }
        }

        /* Landscape mobile optimization */
        @media (max-height: 500px) and (orientation: landscape) {
          .vr-root {
            --vr-canvas-h: 70vh;
            --vr-section-py: 3vh;
          }
          .chand-svg-vr { height: 90vh; }
        }

        /* Ultra-wide screens */
        @media (min-aspect-ratio: 21/9) {
          .vr-root {
            --vr-frame-max-w: 35vw;
            --vr-frame-max-w-wide: 60vw;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .vr-canvas {
            transform: none !important;
          }
        }
      `}</style>

      {/* Video sections */}
      <section className="vr-section vr-flex">
        <div className="vr-spacer"></div>
        <div className="vr-col vr-col--right">
          <div className="vr-frame vr-frame--right">
            {/* Video iframe content */}
          </div>
        </div>
      </section>

      <section className="vr-section vr-flex" style={{ marginTop: '7vh' }}>
        <div className="vr-col">
          <div className="vr-frame vr-frame--left">
            {/* Video iframe content */}
          </div>
        </div>
        <div className="vr-spacer"></div>
      </section>

      <section className="vr-section vr-center vr-top">
        <div className="vr-center-row">
          <div className="vr-frame vr-frame--center">
            {/* Video iframe content */}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PortalScrollDemo;