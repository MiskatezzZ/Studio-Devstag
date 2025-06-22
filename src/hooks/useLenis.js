"use client";
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = (options = {}) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      // duration: 2,
      autoRaf: true,
      ...options,
    });

    lenis.on('scroll', (e) => {
      // console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, [options]);

  return lenisRef.current;
};

export default useLenis;