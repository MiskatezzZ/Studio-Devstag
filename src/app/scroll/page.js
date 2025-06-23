"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";

const ScrollPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Corner Violet Radials */}
      {/* Top Left */}
      <div style={{position: 'absolute', top: 30, left: -90, width: '340px', height: '340px', pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(circle at 50% 50%, #7A6ECA88 0%, transparent 80%)'}} />
      {/* Top Right */}
      <div style={{position: 'absolute', top: 0, right: 0, width: '260px', height: '260px', pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(circle at 100% 0%, #7A6ECA88 0%, transparent 80%)'}} />
      {/* Bottom Left */}
      <div style={{position: 'absolute', bottom: 0, left: 0, width: '260px', height: '260px', pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(circle at 0% 100%, #7A6ECA88 0%, transparent 80%)'}} />
      {/* Bottom Right */}
      <div style={{position: 'absolute', bottom: 0, right: 0, width: '260px', height: '260px', pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(circle at 100% 100%, #7A6ECA88 0%, transparent 80%)'}} />
      {/* Violet Rectangle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150px',
          height: '35vh',
          background: 'radial-gradient(circle at 50% 150%, #000 0%, #2a1858 60%, #7A6ECA 100%)',
          zIndex: 2,
          boxShadow: '0 10px 60px 0 #7A6ECA55',
        }}
      />
      {/* White Circle */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -25%)',
          width: '360px',
          height: '360px',
          background: '#fff',
          borderRadius: '50%',
          zIndex: 3,
          boxShadow: '0 0 40px 12px #fff8',
        }}
      />
    </div>
  );
};

export default ScrollPage;