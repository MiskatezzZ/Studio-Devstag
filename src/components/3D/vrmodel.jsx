"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from "@react-three/fiber";
import Scene from "@/components/3D/Scene";
import Project from '../Project';

gsap.registerPlugin(ScrollTrigger);

const PortalScrollDemo = () => {
  const modelRef = useRef();
  const mainRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // let ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom+=1250 top",
          scrub: 1,
          onUpdate: (self) => {
            setProgress(self.progress);
          }
        }
      })
      .to(modelRef.current, {
        x: '0vw',
        y: '50vh',
        ease: "none",
      })
        .to(modelRef.current, {
          x: '-30vw',
          y: '80vh',
          ease: "none",
        })
        .to(modelRef.current, {
         x: '30vw',
         y: '220vh',
         duration: 2,
         ease: "none",
        })
        .to(modelRef.current, {
          x: '0vw',
          y: '300vh',
          ease: "none",
        })
    // }, mainRef);
    // return () => ctx.revert();
}, [mainRef]);

  return (
    <div style={{ backgroundImage: '#000', minHeight: '200vh', maxWidth: '110vw', padding: '0 10vw', position: 'relative' }}>
      {/* CHAND.svg at the top */}
      <img src="/CHAND.svg" alt="Chand" className="chand-svg-vr" style={{width: '120vw', height: '100vh', zIndex: 2}}/>

      <section ref={mainRef} className="relative grid place-items-center h-[100vh] z-10">
        {/* <p className="text-white text-center absolute top-[5%] mx-4 w-fit text-8xl font-bold">
          Samsung VR
        </p> */}
        <div
          ref={modelRef}
          className="w-full md:w-[100%] h-[600px] md:h-[700px] rounded-2xl overflow-hidden bg-transparent relative"
        >
          <Canvas>
            <Scene progress={progress} />
          </Canvas>
        </div>
        {/* <p className="text-white text-center absolute bottom-[5%] mx-4 w-fit text-8xl font-bold">
          Ultra 2
        </p> */}

      </section>
      <style jsx>{`
        .chand-svg-vr {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120vw;
          height: 100vh;
          z-index: 20;
          pointer-events: none;
          
        }
      `}</style>
      <section className="relative flex items-center justify-evenly h-[110vh]">
  <div className="w-[50%]"></div>
  <div className="w-[50%] flex items-center justify-end">
    <div className="bg-black/70 border border-white/20 rounded-2xl shadow-lg flex items-center justify-center h-[70vh] w-[70%] md:w-[600px] mr-[-10%] mt-[30vh] text-white text-2xl md:text-3xl font-semibold filter: drop-shadow(0 0 24px #a259ffcc);">
      Video Coming Soon
    </div>
  </div>
</section>

      <section className="relative flex items-center justify-evenly h-[100vh]">
  <div className="w-[50%] flex items-center justify-center">
  <div className="bg-black/70 border border-white/20 rounded-2xl shadow-lg flex items-center justify-center h-[70vh] w-[70%] md:w-[600px] ml-[-30%] mt-[30vh] text-white text-2xl md:text-3xl font-semibold">
      Video Coming Soon
    </div>
  </div>
  <div className="w-[50%]"></div>
</section>

      <section className="relative flex items-center justify-evenly h-[140vh] z-30">
  <div className="w-[100%]"></div>
  <div className="w-[100%] flex items-center justify-center">
    <div className="bg-black/70 border border-white/20 rounded-2xl shadow-lg flex items-center justify-center h-[70vh] w-[100vw] text-white mt-[20vh] text-2xl md:text-3xl font-semibold">
      Video Coming Soon
      {/* <Project /> */}
    </div>
  </div>
  <div className="w-[50%]"></div>
</section>
    </div>
  );
};

export default PortalScrollDemo;