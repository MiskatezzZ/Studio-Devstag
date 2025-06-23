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
        background: "linear-gradient(180deg, rgba(25, 13, 66, 0) 4%, #190D42 33%, #4F34C7 67%, #BAB9F8 100%)",
        backgroundColor: "#0A133D",
        overflow: "hidden",
      }}
    >
      {/* Your content goes here */}
    </div>
  );
};

export default ScrollPage;