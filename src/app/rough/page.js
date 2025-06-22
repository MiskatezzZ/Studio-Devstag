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
    gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      }
    })
      .to(modelRef.current, {
        x: '-25vw',
        y: '100vh',
        ease: "none",
      })
      .to(modelRef.current, {
        x: '25vw',
        y: '200vh',
        ease: "none",
      })
      .to(modelRef.current, {
        x: '-25vw',
        y: '300vh',
        ease: "none",
      })

  }, []);

  return (
    <>

      <section className="relative grid place-items-center h-[100vh]">
        <p className="text-white text-center absolute top-[5%] mx-4 w-fit text-8xl font-bold">
          Apple Watch
        </p>
        <div
          ref={modelRef}
          className="w-full md:w-[100%] h-[600px] md:h-[700px] rounded-2xl overflow-hidden bg-transparent relative"
        >
          <Canvas>
            <Scene progress={progress} />
          </Canvas>
        </div>
        <p className="text-white text-center absolute bottom-[5%] mx-4 w-fit text-8xl font-bold">
          Ultra 2
        </p>

      </section>
      <section className="relative flex items-center justify-evenly h-[100vh]">
  <div className="w-[50%]"></div>
  <div className="w-[50%] flex items-center justify-center">
    <div className="bg-black/70 border border-white/20 rounded-2xl shadow-lg flex items-center justify-center h-[300px] w-full text-white text-2xl md:text-3xl font-semibold">
      Video Coming Soon
    </div>
  </div>
</section>

      <section className="relative flex items-center justify-evenly h-[100vh]">
  <div className="w-[50%] flex items-center justify-center">
    <div className="bg-black/70 border border-white/20 rounded-2xl shadow-lg flex items-center justify-center h-[300px] w-full text-white text-2xl md:text-3xl font-semibold">
      Video Coming Soon
    </div>
  </div>
  <div className="w-[50%]"></div>
</section>

      <section className="relative flex items-center justify-evenly h-[110vh]">
  <div className="w-[50%]"></div>
  <div className="w-[50%] flex items-center justify-center">
    <div className="bg-black/70 border border-white/20 rounded-2xl shadow-lg flex items-center justify-center h-[300px] w-full text-white text-2xl md:text-3xl font-semibold">
      Video Coming Soon
    </div>
  </div>
</section>

{/* <section className="relative flex items-center justify-evenly h-[100vh]">
  <div className="w-[50%] flex items-center justify-center">
    <div className="bg-black/70 border border-white/20 rounded-2xl shadow-lg flex items-center justify-center h-[300px] w-full text-white text-2xl md:text-3xl font-semibold">
      Video Coming Soon
    </div>
  </div>
  <div className="w-[50%]"></div>
</section> */}
    </>
  );
};

export default PortalScrollDemo;