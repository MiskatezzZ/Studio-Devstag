"use client";

import Image from 'next/image';
import bgImage from '../assests/bg.jpg';

export default function GradientBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
      <Image
        src={bgImage}
        alt="Background"
        quality={100}
        fill
        priority
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 1 // Full opacity for crystal clear image
        }}
      />
      {/* Very subtle gradient overlay to ensure text readability if needed */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" 
      />
    </div>
  );
}
