"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const [galleryIndices, setGalleryIndices] = React.useState({});
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    if (closestBreakpointIndex !== activeCard) {
      setActiveCard(closestBreakpointIndex);
    }
  });

  // Gallery navigation helpers
  const handleGalleryNav = (cardIdx, dir, length) => {
    setGalleryIndices(prev => {
      const current = prev[cardIdx] || 0;
      let next = current;
      if (dir === 'next') next = (current + 1) % length;
      if (dir === 'prev') next = (current - 1 + length) % length;
      return { ...prev, [cardIdx]: next };
    });
  };
  const setGalleryIndex = (cardIdx, idx) => {
    setGalleryIndices(prev => ({ ...prev, [cardIdx]: idx }));
  };


  // Premium, minimalist sticky scroll layout
  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center w-full py-24 px-4 bg-[#101014] overflow-visible"
      style={{ minHeight: '70vh' }}
    >

      {/* Sticky Cards */}
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
        {content.map((item, index) => {
          const isGallery = item.mediaType === 'gallery' && Array.isArray(item.mediaSrc) && item.mediaSrc.length > 0;
          const galleryIndex = galleryIndices[index] || 0;

          const cardContent = (
            <>
              {/* Media Area */}
              {isGallery && (
                <div className="w-full flex flex-col items-center mb-6">
                  <div className="relative w-full flex justify-center items-center">
                    <button
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg transition disabled:opacity-30 z-10"
                      onClick={() => handleGalleryNav(index, 'prev', item.mediaSrc.length)}
                      aria-label="Previous photo"
                      disabled={item.mediaSrc.length <= 1}
                      tabIndex={activeCard === index ? 0 : -1}
                      style={{outline: 'none', border: 'none'}}>
                      &#8592;
                    </button>
                    <img
                      src={item.mediaSrc[galleryIndex]}
                      alt={item.title + ' gallery image'}
                      className="object-cover rounded-xl shadow-lg border border-white/10 max-h-64 w-full"
                      style={{ aspectRatio: '16/9', background: '#18181b', transition: 'opacity 0.3s' }}
                    />
                    <button
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg transition disabled:opacity-30 z-10"
                      onClick={() => handleGalleryNav(index, 'next', item.mediaSrc.length)}
                      aria-label="Next photo"
                      disabled={item.mediaSrc.length <= 1}
                      tabIndex={activeCard === index ? 0 : -1}
                      style={{outline: 'none', border: 'none'}}>
                      &#8594;
                    </button>
                  </div>
                  <div className="flex mt-3 gap-2 justify-center">
                    {item.mediaSrc.map((src, i) => (
                      <button
                        key={src + i}
                        onClick={() => setGalleryIndex(index, i)}
                        className={`w-3 h-3 rounded-full border-2 ${galleryIndex === i ? 'bg-white border-white' : 'bg-neutral-700 border-white/20'} transition-all duration-200`}
                        aria-label={`Go to image ${i + 1}`}
                        tabIndex={activeCard === index ? 0 : -1}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* Single Image */}
              {item.mediaType === 'image' && item.mediaSrc && !isGallery && (
                <div className="w-full flex justify-center mb-6">
                  <img
                    src={item.mediaSrc}
                    alt={item.title + ' image'}
                    className="object-cover rounded-xl shadow-lg border border-white/10 max-h-64 w-full"
                    style={{ aspectRatio: '16/9', background: '#18181b' }}
                  />
                </div>
              )}
              {/* Video */}
              {item.mediaType === 'video' && item.mediaSrc && (
                <div className="w-full flex justify-center mb-6">
                  {/* For YouTube/Vimeo embed, use iframe. For direct video, use <video> */}
                  {typeof item.mediaSrc === 'string' && (item.mediaSrc.includes('youtube') || item.mediaSrc.includes('vimeo')) ? (
                    <iframe
                      src={item.mediaSrc}
                      title={item.title + ' video'}
                      className="rounded-xl shadow-lg border border-white/10 w-full"
                      style={{ aspectRatio: '16/9', minHeight: 200, background: '#18181b' }}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={item.mediaSrc}
                      controls
                      className="rounded-xl shadow-lg border border-white/10 w-full"
                      style={{ aspectRatio: '16/9', minHeight: 200, background: '#18181b' }}
                    />
                  )}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight leading-tight">
                {item.title}
              </h2>
              <p className="text-lg md:text-xl text-neutral-200 font-light mb-2 max-w-2xl">
                {item.description}
              </p>
            </>
          );

          if (activeCard === index) {
            return (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0.7, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1.03 }}
                exit={{ opacity: 0.7, y: 18, scale: 0.98 }}
                transition={{ duration: 0.32, type: 'spring', bounce: 0.12, mass: 0.7, damping: 22 }}
                className={`transition-all duration-300 w-full mb-14 z-20`}
                style={{ willChange: 'transform' }}
              >
                <div
                  className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl rounded-2xl px-10 py-12 flex flex-col items-start"
                  style={{
                    boxShadow: '0 6px 24px 0 rgba(0,0,0,0.34), 0 1.5px 6px 0 rgba(80,80,120,0.08)',
                    border: '1.5px solid #fff3',
                    transition: 'box-shadow 0.32s, border 0.32s',
                  }}
                >
                  {cardContent}
                </div>
              </motion.div>
            );
          } else {
            return (
              <div
                key={item.title + index}
                className={`transition-all duration-300 w-full mb-14 z-10 opacity-45`}
                style={{
                  filter: 'blur(0.5px)',
                  transform: 'translateY(18px) scale(0.98)',
                  transition: 'filter 0.32s, opacity 0.32s, transform 0.32s',
                }}
                aria-hidden="true"
                tabIndex={-1}
              >
                <div
                  className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl rounded-2xl px-10 py-12 flex flex-col items-start"
                  style={{
                    boxShadow: '0 1.5px 6px 0 rgba(0,0,0,0.08)',
                    border: '1px solid #222',
                    transition: 'box-shadow 0.32s, border 0.32s',
                  }}
                >
                  {cardContent}
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};