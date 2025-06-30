"use client";
// c:\Users\soumo\OneDrive\Desktop\devstag\src\app\splitintro\page.js

import React from "react";

export default function SplitPage() {
  return (
    <>
      {/* Black background and purple circle at the top */}
      <div className="purple-bg">
        <div className="purple-circle"></div>
        <img src="/CHAND.svg" alt="Chand" className="chand-svg" />
      </div>

      {/* Main content goes here */}
      <div style={{height: '200vh'}}></div>
      <style jsx>{`
        .purple-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 240px;
          background: #000;
          z-index: 100;
          pointer-events: none;
        }
        .purple-circle {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 50%, #a259ff 60%, #4F34C7 100%, transparent 100%);
          box-shadow: 0 0 80px 40px #a259ff99, 0 0 0 8px #4F34C7;
          pointer-events: none;
        }
        .chand-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 240px;
          object-fit: cover;
          z-index: 110;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}