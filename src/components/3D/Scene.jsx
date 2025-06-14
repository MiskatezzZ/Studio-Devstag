"use client";
import React, {useEffect, useRef} from "react";
import useFrame from "@react-three/fiber";
import {Environment, PerspectiveCamera} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Model } from "@/components/3D/VR";

gsap.registerPlugin(ScrollTrigger);
const Scene = () => {
    return (
        <>
        
            <PerspectiveCamera fov={45} near={0.1} far={10000} makeDefault position={[0, 0, 10]} />
            <Environment preset="city" />
            <Model />
            <axesHelper args={[500]}/> 
            
        </>
    );
};

export default Scene;
