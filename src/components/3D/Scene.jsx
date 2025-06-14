"use client";
import React, {useEffect, useRef} from "react";
import useFrame from "@react-three/fiber";
import {Environment, PerspectiveCamera, OrbitControls} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VR } from "@/components/3D/VR";
import { axesHelper } from 'three';
import { Canvas } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

const Scene = () => (

  <>
    {/* <OrbitControls /> */}
    <PerspectiveCamera fov={45} near={0.1} far={10000} makeDefault position={[0, 0, 10]} />
    <Environment preset="city" />
    <VR />
    <axesHelper args={[500]}/> 
  </>
  
);

export default Scene;
