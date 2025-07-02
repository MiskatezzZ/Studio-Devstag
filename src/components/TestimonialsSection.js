"use client";

import TestimonialBackground from './TestimonialBackground';

const TestimonialsSection = () => {
  return (
    <section className="relative z-20 bg-indigo-950 py-32 md:py-48 overflow-hidden">
      <TestimonialBackground />
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-[400px]">
        {/* Purplish-whitish radial gradient glow behind the black box */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-6xl h-full rounded-3xl overflow-hidden z-10" style={{minHeight: '400px'}}>
  {/* Violet Elliptical Glow at Bottom */}
  <div
    className="pointer-events-none absolute z-0"
    style={{
      left: '50%',
      bottom: '-60px',
      width: '120%',
      height: '280px',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(0deg, rgba(94,27,255,0.95) 0%, rgba(94,27,255,0.35) 60%, transparent 100%)',
      filter: 'blur(48px)',
      opacity: 1,
    }}
  />
  {/* White Circular Radial Glow at Left Bottom */}
  <div
    className="pointer-events-none absolute z-41"
    style={{
      left: '-40px',
      bottom: '-40px',
      width: '260px',
      height: '120px',
      background: 'radial-gradient(ellipse at 40% 70%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 60%, transparent 100%)',
      filter: 'blur(18px)',
      opacity: 1,
      zIndex: 41,
    }}
  />
  {/* Extra Sharp White Glow */}
  <div
    className="pointer-events-none absolute z-20"
    style={{
      left: '50%',
      bottom: '0',
      width: '100%',
      height: '18px',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(0deg, white 0%, transparent 800%)',
      filter: 'blur(9px)',
      opacity: 1,
      zIndex: 31,
    }}
  />
  {/* White Elliptical Shine */}
  <div
    className="pointer-events-none absolute z-10"
    style={{
      left: '50%',
      bottom: '0',
      width: '100%',
      height: '48px',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(0deg, white 0%, white 180%, transparent 800%)',
      filter: 'none',
      opacity: 1,
    }}
  />
  {/* Gray linear gradient shade at top left */}
  <div
    className="pointer-events-none absolute z-20"
    style={{
      left: 0,
      top: 0,
      width: '80%',
      height: '180px',
      background: 'linear-gradient(135deg, rgba(120,120,130,0.5) 0%, transparent 90%)',
      borderTopLeftRadius: '24px',
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      zIndex: 20,
    }}
  />
  {/* Dark purple radial gradient at top right */}
  <div
    className="pointer-events-none absolute z-21"
    style={{
      right: '-40px',
      top: '-50px',
      width: '240px',
      height: '160px',
      background: 'radial-gradient(ellipse at 80% 20%, #0B0215 0%, rgba(11,2,21,0.75) 60%, transparent 100%)',
      filter: 'blur(14px)',
      opacity: 0.85,
      zIndex: 31,
    }}
  />
  {/* Black glassy background box only (content wrapper) */}
  <div className="absolute left-0 top-0 w-full h-full rounded-3xl bg-black/30 shadow-2xl backdrop-blur-3xl border border-white/20 z-30 flex flex-col md:flex-row items-center justify-between px-8 py-12" style={{minHeight: '440px', boxShadow: '0 4px 64px 0 rgba(0,0,0,0.35)'}}>
    {/* LEFT: Header & Subtext */}
    <div className="flex-1 min-w-[260px] md:max-w-[46%] flex flex-col items-start justify-center z-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-xl">
        Vortasky Intelligent Routing<br />That Delivers
      </h1>
      <p className="text-base md:text-lg text-white/80 mb-6 max-w-lg">
        Automatically route conversations to the right agent or department—no delays, no confusion.
      </p>
      <button className="bg-[#5E1BFF] hover:bg-[#4a13c6] text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all text-base">
        Get Started
      </button>
    </div>
    {/* RIGHT: Tree Structure */}
    <div className="flex-1 min-w-[320px] flex items-center justify-center relative z-10 mt-12 md:mt-0">
      {/* Violet Glow Behind Top Node */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          left: "50%",
          top: "0",
          transform: "translateX(-50%)",
          width: "120px",
          height: "120px",
          background:
            "radial-gradient(ellipse at center, rgba(94,27,255,0.6) 0%, rgba(94,27,255,0.18) 60%, transparent 100%)",
          filter: "blur(16px)",
        }}
      />
      {/* Top Node */}
      <div className="relative flex flex-col items-center">
        <div className="w-[68px] h-[68px] rounded-full bg-[#1B0257] border-4 border-[#5E1BFF] flex items-center justify-center text-white text-3xl shadow-xl relative z-10">
          <span className="">🔗</span>
        </div>
        <div className="mt-3 mb-2 px-5 py-1 bg-[#19132b] bg-opacity-80 rounded-full border border-[#5E1BFF]/40 text-white/90 font-medium shadow-md text-base">
          Intelligent Routing
        </div>
        {/* Dotted line to children */}
        <div className="w-1 h-8 border-r-2 border-dotted border-[#5E1BFF]/70 mx-auto"></div>
        {/* Children nodes */}
        <div className="flex flex-row gap-6 mt-2">
          <div className="flex flex-col items-center">
            <div className="w-[54px] h-[54px] rounded-xl bg-white/10 border border-[#5E1BFF]/30 shadow-lg flex items-center justify-center text-2xl text-white mb-1">
              <span>💬</span>
            </div>
            <div className="text-white/90 text-xs font-medium px-2 text-center whitespace-nowrap">
              Help Centre
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[54px] h-[54px] rounded-xl bg-white/10 border border-[#5E1BFF]/30 shadow-lg flex items-center justify-center text-2xl text-white mb-1">
              <span>✉️</span>
            </div>
            <div className="text-white/90 text-xs font-medium px-2 text-center whitespace-nowrap">
              Email Marketing
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[54px] h-[54px] rounded-xl bg-white/10 border border-[#5E1BFF]/30 shadow-lg flex items-center justify-center text-2xl text-white mb-1">
              <span>🤝</span>
            </div>
            <div className="text-white/90 text-xs font-medium px-2 text-center whitespace-nowrap">
              Preferred Agent
            </div>
          </div>
        </div>
        {/* Dotted lines from parent to each child */}
        <div className="absolute left-0 right-0 top-[110px] flex flex-row justify-between px-3 pointer-events-none">
          <span className="border-b-2 border-dotted border-[#5E1BFF]/60 w-[54px]"></span>
          <span className="border-b-2 border-dotted border-[#5E1BFF]/60 w-[54px]"></span>
          <span className="border-b-2 border-dotted border-[#5E1BFF]/60 w-[54px]"></span>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
      <div className="flex flex-row gap-4 mt-4 justify-center items-start w-full max-w-6xl mx-auto flex-wrap">
        {/* Small Box 1 */}
        <div className="relative flex-1 min-w-[260px] max-w-[570px] h-[320px] rounded-2xl overflow-hidden flex flex-col items-center justify-between px-4 py-6 bg-black/30 shadow-2xl backdrop-blur-3xl border border-white/20">
          {/* Gradient and glow effects (copied from big box bottom, now at top) */}
{/* Violet Elliptical Glow at Top */}
<div
  className="pointer-events-none absolute z-0"
  style={{
    left: '50%',
    top: '-80px',
    width: '120%',
    height: '200px',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(180deg, rgba(94,27,255,0.95) 0%, rgba(94,27,255,0.35) 60%, transparent 100%)',
    filter: 'blur(48px)',
    opacity: 1,
  }}
/>
{/* White Circular Radial Glow at Left Top */}
<div
  className="pointer-events-none absolute z-41"
  style={{
    right: '-20px',
    top: '-20px',
    width: '130px',
    height: '60px',
    background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 60%, transparent 100%)',
    filter: 'blur(9px)',
    opacity: 1,
    zIndex: 41,
  }}
/>
{/* Extra Sharp White Glow at Top (SOFTENED) */}
<div
  className="pointer-events-none absolute z-20"
  style={{
    left: '50%',
    top: '0',
    width: '100%',
    height: '18px',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(180deg, white 0%, transparent 800%)',
    filter: 'blur(9px)',
    opacity: 1,
    zIndex: 31,
  }}
/>
{/* White Elliptical Shine at Top */}
<div
  className="pointer-events-none absolute z-10"
  style={{
    left: '50%',
    top: '0',
    width: '100%',
    height: '24px',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(180deg, white 0%, white 180%, transparent 800%)',
    filter: 'blur(28px)',
    opacity: 1,
  }}
/>
          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col items-start justify-center w-full">
            <h2 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight drop-shadow-xl">Vortasky Routing</h2>
            <p className="text-xs md:text-sm text-white/80 mb-2">Auto route to the right agent or department.</p>
            <button className="bg-[#5E1BFF] hover:bg-[#4a13c6] text-white font-semibold px-4 py-1 rounded-full shadow-lg transition-all text-xs mt-auto">Get Started</button>
          </div>
        </div>
        {/* Small Box 2 */}
        <div className="relative flex-1 min-w-[260px] max-w-[570px] h-[320px] rounded-2xl overflow-hidden flex flex-col items-center justify-between px-4 py-6 bg-black/30 shadow-2xl backdrop-blur-3xl border border-white/20">
          {/* Gradient and glow effects (copied from big box bottom, now at top) */}
{/* Violet Elliptical Glow at Top */}
<div
  className="pointer-events-none absolute z-0"
  style={{
    left: '50%',
    top: '-80px',
    width: '120%',
    height: '200px',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(180deg, rgba(94,27,255,0.95) 0%, rgba(94,27,255,0.35) 60%, transparent 100%)',
    filter: 'blur(48px)',
    opacity: 1,
  }}
/>
{/* White Circular Radial Glow at Left Top */}
<div
  className="pointer-events-none absolute z-41"
  style={{
    left: '-20px',
    top: '-20px',
    width: '130px',
    height: '60px',
    background: 'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 60%, transparent 100%)',
    filter: 'blur(9px)',
    opacity: 1,
    zIndex: 41,
  }}
/>
{/* Extra Sharp White Glow at Top (SOFTENED) */}
<div
  className="pointer-events-none absolute z-20"
  style={{
    left: '50%',
    top: '0',
    width: '100%',
    height: '18px',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(180deg, white 0%, transparent 800%)',
    filter: 'blur(9px)',
    opacity: 1,
    zIndex: 31,
  }}
/>
{/* White Elliptical Shine at Top */}
<div
  className="pointer-events-none absolute z-10"
  style={{
    left: '50%',
    top: '0',
    width: '100%',
    height: '24px',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(180deg, white 0%, white 180%, transparent 800%)',
    filter: 'blur(28px)',
    opacity: 1,
  }}
/>
          {/* Content */}
          <div className="relative z-10 flex-1 flex flex-col items-start justify-center w-full">
            <h2 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight drop-shadow-xl">Vortasky Routing</h2>
            <p className="text-xs md:text-sm text-white/80 mb-2">Auto route to the right agent or department.</p>
            <button className="bg-[#5E1BFF] hover:bg-[#4a13c6] text-white font-semibold px-4 py-1 rounded-full shadow-lg transition-all text-xs mt-auto">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
