"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import moonbg from "../../assets/moonbg.png";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const heroRef = useRef(null);

  const circleRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !imgRef.current || !heroRef.current || !circleRef.current) return;


        // Separate scroll-triggered animation for the circle
        gsap.to(circleRef.current, {
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=50%', // Slower, smoother fade
            scrub: true,
          },
          scale: 7,
          opacity: 0,
          transformOrigin: 'center center',
          ease: 'power2.inOut', // Smooth and gentle fade
        });



    // Animate for 3x (300%)
    gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: '+=800%',
        scrub: true,
      }
    })
      .to(imgRef.current, {
        scale: 50,
        z: 350,
        transformOrigin: 'center center',
        ease: 'power1.inOut'
      }, 0)
      .to(heroRef.current, {
        scale: 1,
        transformOrigin: 'center center',
        ease: 'power1.inOut'
      }
    );

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: false // No animation here, just pinning
    });
  }, []);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <section className="section hero" ref={heroRef} style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100vh',
          position: 'relative',
          zIndex: 1,
        }}></section>
        <section className="section gradient-purple" style={{ width: '100vw', height: '100vh', zIndex: 1, background: 'linear-gradient(135deg, #a4508b 0%, #5f0a87 100%)' }}></section>
        <section className="section gradient-blue" style={{ width: '100vw', height: '100vh', zIndex: 1, background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' }}></section>
      </div>
      <div className="image-container" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <img
          ref={imgRef}
          src={moonbg.src}
          alt="Background"
          style={{ height: '100vh', width: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Animated circle above image */}
        <div
          ref={circleRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '47%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 0 60px 10px rgba(128,90,213,0.18)',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}