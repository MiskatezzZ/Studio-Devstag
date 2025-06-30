"use client";
import React, {useEffect, useRef} from "react";
import { useFrame } from "@react-three/fiber";
import {Environment, PerspectiveCamera, OrbitControls} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VR } from "@/components/3D/VR";
import { axesHelper } from 'three';
import { Canvas } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ progress = 0 }) => {
  const cameraRef = useRef();

  useFrame(() => {
    // console.log(cameraRef.current.position);
    cameraRef.current.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const updateCamPos = () => {
        const position = [
         [1.1016113946574677, 0.341597825920753, -0.061003699489932] ,
         [0.39095081730859516, 0.43213159585076133, 1.54782459334164] ,
        //  [-0.13, 0.15, 0.2],
        [1.1016113946574677, 0.341597825920753, -0.061003699489932],
        //  [-0.1170116580489911, 0.20437905257615763, -1.8173659300516234] ,
         [0.34406418831632557, 1.548152928981351, -0.6863082583138185] 
        ];

        if(progress>=1){
            gsap.to(cameraRef.current.position, {
                x:0.34406418831632557,
                y:1.548152928981351,
                z:-0.6863082583138185,
                duration: 0.5,
                ease: "power1.out"
            });
        }
        else{
          const segmentProgress = 1/3;

        if (isNaN(progress)) return;
        const segmentIndex = Math.floor(progress / segmentProgress);
        console.log(segmentIndex);

        const percentage = progress % segmentProgress;
        // console.log(percentage);

        const [startX, startY, startZ] = position[segmentIndex];
        const [endX, endY, endZ] = position[segmentIndex + 1];

        const x=startX + (endX-startX)*percentage;
        const y=startY + (endY-startY)*percentage;
        const z=startZ + (endZ-startZ)*percentage;
        
        gsap.to(cameraRef.current.position, {
            x,
            y,
            z,
            duration: 0.5,
            ease: "power1.out"
        });
        }
        
    }
    updateCamPos();
  }, [progress, cameraRef.current]);
  
  return (
  <>
    
    {/* <OrbitControls /> */}
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
