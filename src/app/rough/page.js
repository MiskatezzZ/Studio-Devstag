"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortalScrollDemo = () => {
  const modelRef = useRef();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window === 'undefined') return;

    // Dynamically import Three.js only on client side
    import('three').then(THREE => {
      // Import GLTFLoader from the correct path
      import('three/examples/jsm/loaders/GLTFLoader').then(({ GLTFLoader }) => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xfefdfd);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        
        renderer.setClearColor(0xffffff, 1);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.physicallyCorrectLights = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 2.5;

        if (modelRef.current) {
          modelRef.current.appendChild(renderer.domElement);
        }

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Load model
        const loader = new GLTFLoader();
        loader.load(
          '/vr_headset_simple.glb',
          (gltf) => {
            const model = gltf.scene;
            scene.add(model);

            // Center model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            // Scale model
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            camera.position.z = maxDim * 2;
            
            model.scale.set(0.5, 0.5, 0.5);
            
            // Animation functions
            let animationFrameId;
            let isFloating = false;
            
            const playInitAnimation = () => {
              if (model) {
                // Initial scale animation
                gsap.to(model.scale, { 
                  x: 1,
                  y: 1,
                  z: 1,
                  duration: 1,
                  ease: 'power2.out'
                });

                // Continuous rotation
                gsap.to(model.rotation, { 
                  y: Math.PI * 2, 
                  duration: 8, 
                  repeat: -1,
                  ease: 'none'
                });
              }
            };
            
            const animate = () => {
              renderer.render(scene, camera);
              animationFrameId = requestAnimationFrame(animate);
            };
            
            playInitAnimation();
            animate();
            
            // Handle window resize
            const handleResize = () => {
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(window.innerWidth, window.innerHeight);
            };

            ScrollTrigger.create({
              trigger: "body",
              start: 'top top',
              end: 'top -10',
              onEnterBack: () => {
                if (model) {
                  gsap.to(model.rotation, 
                    { 
                      x: 1,
                      y: 1,
                      z: 1,
                      duration: 1,
                      ease: 'power2.out'
                    }
                  );

                  // Update floating state
                  isFloating = true;
                }
                gsap.to(scanContainer, 
                  { 
                    scale: 1,
                    duration: 1,
                    ease: 'power2.out'
                  }
                );
              }
            });
            
            
            
            window.addEventListener('resize', handleResize);
            
            // Cleanup function
            return () => {
              cancelAnimationFrame(animationFrameId);
              window.removeEventListener('resize', handleResize);
              if (modelRef.current && modelRef.current.contains(renderer.domElement)) {
                modelRef.current.removeChild(renderer.domElement);
              }
              renderer.dispose();
            };
          },
          undefined,
          (error) => {
            console.error('Error loading model:', error);
          }
        );
      });
    });
  }, []);

  return (
    <>
        <style jsx>{`
            canvas {
                position: fixed;
                top: 0;
                left: 0;
            }
            h1 {
                text-align: center;
                font-size: 4rem;
                font-weight: bold;
                color: #fff;
            }
            .model {
                position: fixed;
                width: 100%;
                height: 100vh;
                background-color: #171e3a;
            }
            section {
                position: relative;
                width: 100vw;
                height: 100vh;
                background: #171e3a;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

        `}</style>


      <div 
        ref={modelRef} 
        className="model min-h-screen flex items-center justify-center bg-gray-100"
        style={{ position: 'relative', width: '100%', height: '100vh' }}
      >
        <h1 className="absolute z-10 text-5xl font-bold text-gray-800">3D Model Showcase</h1>
      </div>

      <section className='hero min-h-screen flex items-center justify-center bg-blue-600 text-white'>
        <h1 className="text-5xl font-bold">Discover Amazing Features</h1>
      </section>

      <section className='info min-h-screen flex items-center justify-center bg-white'>
        <h1 className="text-5xl font-bold text-gray-800">Detailed Information</h1>
      </section>

      <section className='scanner min-h-screen flex items-center justify-center bg-gray-900 text-white'>
        <h1 className="text-5xl font-bold">Scan & Explore</h1>
      </section>

      <section className='outro min-h-screen flex items-center justify-center bg-indigo-700 text-white'>
        <h1 className="text-5xl font-bold">Start Your Journey</h1>
      </section>
    </>
  );
};


export default PortalScrollDemo;
