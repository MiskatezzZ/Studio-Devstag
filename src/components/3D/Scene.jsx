"use client";
import React, {useEffect, useRef} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {Environment, PerspectiveCamera, OrbitControls} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VR } from "@/components/3D/VR";
import { axesHelper } from 'three';

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ progress = 0 }) => {
  const cameraRef = useRef();
  const { size } = useThree();
  const aspect = (size?.width || 1) / (size?.height || 1);

  const clampNum = (v, min, max) => Math.min(max, Math.max(min, v));
  const mapRange = (v, inMin, inMax, outMin, outMax) => {
    const t = (clampNum(v, inMin, inMax) - inMin) / (inMax - inMin);
    return outMin + t * (outMax - outMin);
  };

  useFrame(() => {
    console.log(cameraRef.current.position);
    cameraRef.current.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const positions = [
      [1.1016113946574677, 0.341597825920753, -0.061003699489932],
      [0.8368812620715087,0.27446767123988347, 0.7471649359426317],
      [1.1016113946574677, 0.341597825920753, -0.061003699489932],
      [1.00266029217015, 0.3828536186119205, -0.5711089762902671],

    ];
    
    const p = clampNum(progress, 0, 1);
    const segCount = positions.length - 1; // 3 segments
    const segLen = 1 / segCount;
    const rawIndex = Math.floor(p / segLen);
    const segmentIndex = clampNum(rawIndex, 0, segCount - 1);
    const segStart = segmentIndex * segLen;
    const local = (p - segStart) / segLen; // 0..1 within segment

    // Aspect-aware scaling to keep subject centered across ratios
    const xScale = mapRange(aspect, 0.6, 2.4, 0.85, 1.05);
    const yScale = mapRange(aspect, 0.6, 2.4, 0.90, 1.05);
    const zScale = mapRange(aspect, 0.6, 2.4, 1.25, 0.95);

    const [sx, sy, sz] = positions[segmentIndex];
    const [ex, ey, ez] = positions[segmentIndex + 1];

    const x = (sx + (ex - sx) * local) * xScale;
    const y = (sy + (ey - sy) * local) * yScale;
    const z = (sz + (ez - sz) * local) * zScale;

    gsap.to(cameraRef.current.position, {
      x,
      y,
      z,
      duration: 1.2,
      ease: "power2.out",
    });
  }, [progress, aspect]);

  // Adjust FOV based on aspect so object stays in frame on tall/ultrawide screens
  useEffect(() => {
    if (!cameraRef.current) return;
    const fov = mapRange(aspect, 0.6, 2.4, 58, 40); // taller -> larger FOV, wider -> smaller FOV
    if (Math.abs(cameraRef.current.fov - fov) > 0.1) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [aspect]);
  
  return (
  <>
    
    { /*<OrbitControls /> */}
    <PerspectiveCamera 
    fov={45} 
    near={0.1} 
    far={10000} 
    makeDefault 
    position={[1.1016113946574677, 0.341597825920753, -0.061003699489932]} 
    // position={[3.5, .6, .7]} 
    // position={[2.3, .87, -4.2]}
    // position={[0, 2.5, 3.6]} 
    ref={cameraRef}
    />
    <Environment preset="city" />
    <VR />
    {/* <axesHelper args={[500]}/>  */}
    
  </>
  
  );
}
export default Scene;