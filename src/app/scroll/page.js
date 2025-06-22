"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";

const ScrollPage = () => {
  return (
    <>
      <style jsx global>{`
        body {
          background: black;
          background-image:
            radial-gradient(circle at 10% 40%, rgba(127,60,255,0.4) 0%, rgba(127,60,255,0) 35%),
            radial-gradient(circle at 90% 60%, rgba(127,60,255,0.4) 0%, rgba(127,60,255,0) 50%);
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
      <div className="tab"></div>
      <style jsx>{`
        .tab {
          margin: 32px auto 0 auto;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background-color: transparent;
          backdrop-filter: blur(20px);
          background-image: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.3),
            rgba(0, 0, 0, 0.2)
          );
          background-size: 30px;
        }
      `}</style>
    </>
  );

};

export default ScrollPage;