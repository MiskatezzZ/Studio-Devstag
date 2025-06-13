"use client";

import React from "react";
import Navbar from '@/components/Navbar';
import { useState, useRef, useEffect } from 'react';



// Animated background grid lines with enhanced visibility
const GridBackground = () => {
  return (
    
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden bg-black">
      {/* Solid black background to ensure contrast */}
      <div className="absolute inset-0 bg-black z-0"></div>
      {/* <Navbar/> */}
      
      {/* Radial gradients - always visible, never overflow */}
      <div className="absolute inset-0 flex items-center justify-center z-1">
        <div className="w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-purple-700/40 rounded-full blur-3xl opacity-70 absolute top-[-20vw] left-[-20vw]"></div>
        <div className="w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-blue-600/30 rounded-full blur-2xl opacity-60 absolute bottom-[-15vw] right-[-15vw]"></div>
        <div className="w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-indigo-600/30 rounded-full blur-2xl opacity-50 absolute top-[30vh] left-[20vw]"></div>
      </div>
      
      {/* SVG Grid - ultra-thin white glowing lines (0.5px) with much larger 400px squares */}
      <div
        className="absolute inset-0 z-2"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='400' height='400' fill='none'/%3E%3Cpath d='M0 0 H400 M0 400 H400 M0 0 V400 M400 0 V400' stroke='%23ffffff' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "400px 400px",
          backgroundPosition: "center center",
          opacity: 0.4,
          filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.4))"
        }}
      />
      
      {/* White glowing dots at the corners of each grid square */}
      <div
        className="absolute inset-0 z-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='0' cy='0' r='2' fill='%23ffffff'/%3E%3Ccircle cx='0' cy='400' r='2' fill='%23ffffff'/%3E%3Ccircle cx='400' cy='0' r='2' fill='%23ffffff'/%3E%3Ccircle cx='400' cy='400' r='2' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "400px 400px",
          backgroundPosition: "center center",
          opacity: 0.7,
          filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))"
        }}
      />
    </div>
  );
};

// Floating orbs component
const FloatingOrbs = () => {
  return (
    <>
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-violet-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
    </>
  );
};

// Pure Transparent Glassmorphism Card Component with Laser Border
const ModernCard = ({ children, className = "", delay = 0 }) => {
  return (
    <div 
      className={`group relative backdrop-blur-sm bg-transparent rounded-2xl p-8 transition-all duration-500 hover:scale-[1.01] ${className} laser-border`}
      style={{
        animationDelay: `${delay}s`,
        animation: 'fadeInUp 0.8s ease-out forwards',
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Laser border effect */}
      <div className="absolute inset-0 rounded-2xl z-0 laser-border-effect"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

import { useMemo } from 'react';

// Memoized Pricing Card
const PricingCard = React.memo(function PricingCard({ plan, delay, popular, features }) {
  return (
    <ModernCard key={plan.name} delay={delay} className={`relative ${popular ? 'scale-105 border-blue-500/50' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold py-2 px-4 rounded-full">
          MOST POPULAR
        </div>
      )}
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 luxury-font">{plan.name}</h3>
        <div className="mb-10">
          <span className="text-5xl md:text-6xl font-bold glow-text luxury-font">${plan.price}</span>
          <span className="text-gray-300 ml-3 text-lg font-light">/month</span>
        </div>
        <ul className="space-y-4 mb-10 text-left">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-200 font-medium">{feature}</span>
            </li>
          ))}
        </ul>
        <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-500 ${
          popular 
            ? 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:shadow-xl hover:shadow-white/30 hover:scale-[1.02]' 
            : 'bg-gray-800/80 text-gray-100 hover:bg-gray-700/80 border border-gray-600/50 hover:border-white/30'
        }`}>
          Get Started
        </button>
      </div>
    </ModernCard>
  );
});

// Memoized Tech Card
const TechCard = React.memo(function TechCard({ item }) {
  const AnimatedCard = require('@/components/AnimatedCard').default;
  return (
    <AnimatedCard 
      glowColor={item.glowColor} 
      depth={15} 
      hoverScale={1.03}
      className="h-full"
    >
      <div className="text-center h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-center">{item.icon}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-4 luxury-font">{item.title}</h3>
          <p className="text-gray-300 font-light leading-relaxed mb-6">{item.description}</p>
        </div>
        <button className="mt-auto bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 border border-white/5 hover:border-white/20">
          Learn More
        </button>
      </div>
    </AnimatedCard>
  );
});

export default function Services() {
  const smootherRef = useRef(null);

  // Memoized static data
  const pricingPlans = useMemo(() => [
    { name: 'Basic', price: 99, popular: false },
    { name: 'Standard', price: 199, popular: true },
    { name: 'Premium', price: 299, popular: false }
  ], []);
  const pricingFeatures = useMemo(() => [
    [
      'Access to basic features',
      'Priority customer support',
      'Basic analytics',
      '5 projects',
      'Standard branding',
      'No API access'
    ],
    [
      'Access to basic features',
      'Priority customer support',
      'Advanced analytics',
      'Unlimited projects',
      'Standard branding',
      'No API access'
    ],
    [
      'Access to basic features',
      'Priority customer support',
      'Advanced analytics',
      'Unlimited projects',
      'Custom branding',
      'API access'
    ]
  ], []);
  const techCards = useMemo(() => [
    {
      title: "AI-Powered Analytics",
      description: "Leverage cutting-edge artificial intelligence to gain deep insights from your data and make informed decisions.",
      icon: (
        <svg className="w-12 h-12 text-purple-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      glowColor: "rgba(168, 85, 247, 0.4)"
    },
    {
      title: "Blockchain Integration",
      description: "Secure, transparent, and immutable data storage with our advanced blockchain technology integration.",
      icon: (
        <svg className="w-12 h-12 text-blue-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      glowColor: "rgba(59, 130, 246, 0.4)"
    },
    {
      title: "Immersive Experiences",
      description: "Create stunning, interactive user experiences with our advanced UI/UX technologies and frameworks.",
      icon: (
        <svg className="w-12 h-12 text-indigo-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      glowColor: "rgba(99, 102, 241, 0.4)"
    }
  ], []);

  useEffect(() => {
    let killed = false;
    // Dynamically import GSAP and plugins on client only
    import('gsap').then((_gsap) => {
      const gsap = _gsap.default || _gsap;
      Promise.all([
        import('gsap/ScrollTrigger'),
        import('gsap/ScrollSmoother')
      ]).then(([_ScrollTrigger, _ScrollSmoother]) => {
        const ScrollTrigger = _ScrollTrigger.default || _ScrollTrigger;
        const ScrollSmoother = _ScrollSmoother.default || _ScrollSmoother;
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        if (!smootherRef.current && !killed) {
          smootherRef.current = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.2,
            effects: true,
          });
        }
      });
    });
    return () => {
      killed = true;
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');
      
      html, body, * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        color-scheme: dark;
      }
      
      .luxury-font, .heading-font {
        font-family: 'Space Grotesk', 'Inter', Arial, sans-serif;
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes gridMove {
        0% { background-position: 0 0; }
        100% { background-position: 50px 50px; }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
      }
      
      /* Laser border animation */
      @keyframes laserBorder {
        0% {
          background-position: 0% 0%;
        }
        100% {
          background-position: 200% 0%;
        }
      }
      
      .laser-border {
        position: relative;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
      }
      
      .laser-border::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        background-size: 200% 100%;
        animation: laserBorder 4s linear infinite;
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }
      
      @keyframes revolve {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      
      .grid-lines {
        position: absolute;
        inset: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        background-image: 
          linear-gradient(to right, rgba(110, 60, 255, 0.11) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(63, 131, 248, 0.14) 1px, transparent 1px);
        background-size: 48px 48px;
        background-position: 0 0, 0 0;
        animation: gridMove 24s linear infinite;
        z-index: 2;
        mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
      }
      
      .floating-icon {
        animation: float 6s ease-in-out infinite;
      }
      
      .glow-text {
        text-shadow: 0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(59, 130, 246, 0.3);
        font-weight: 800;
      }
      
      .card-icon {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(59, 130, 246, 0.2));
        backdrop-filter: blur(15px);
        box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
      }
      
      .revolving-border {
        position: relative;
        overflow: hidden;
      }
      
      .revolving-border::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: conic-gradient(
          from 0deg,
          transparent 70deg,
          rgba(255, 255, 255, 0.8) 120deg,
          rgba(255, 255, 255, 0.4) 160deg,
          transparent 210deg,
          transparent
        );
        border-radius: inherit;
        animation: revolve 4s linear infinite;
        z-index: -1;
      }
      
      .revolving-border::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        border-radius: inherit;
        z-index: -1;
      }
      
      .premium-shimmer {
        position: relative;
        overflow: hidden;
      }
      
      .premium-shimmer::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent
        );
        animation: shimmer 3s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div id="smooth-wrapper">

      <div id="smooth-content" className="relative min-h-screen bg-black text-white overflow-hidden">
        <Navbar/>
        <GridBackground />
        <div className="relative z-10">
          <FloatingOrbs />
          {/* Header Section */}
          <div className="pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-8">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                KEY BENEFITS
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text luxury-font">
                KEY BENEFITS
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                Experience world-class digital services with premium features designed for your success
              </p>
            </div>
        </div>

        {/* Main Benefits Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {/* Top Row - 2 Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ModernCard delay={0.1}>
            <div className="flex items-start space-x-6">
              <div className="card-icon w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 floating-icon">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400 text-sm font-medium">Relax</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white font-semibold tracking-tight">No max or min evaluation days</h3>
                <p className="text-gray-300 text-base leading-relaxed font-light">
                  Unlimited trading days on all plan types and all phases. Get funded in as little as one trading day.
                </p>
              </div>
            </div>
          </ModernCard>

          <ModernCard delay={0.2}>
            <div className="flex items-start space-x-6">
              <div className="card-icon w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 floating-icon" style={{animationDelay: '1s'}}>
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-purple-400 text-sm font-medium">Your rules</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white font-semibold tracking-tight">No maximum request amount</h3>
                <p className="text-gray-300 text-base leading-relaxed font-light">
                  Request up to full above-buffer profit after 14 calendar days, exclusively on Expert.
                </p>
              </div>
            </div>
          </ModernCard>
        </div>

        {/* Bottom Row - 3 Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <ModernCard delay={0.3}>
            <div className="text-center">
              <div className="card-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 floating-icon" style={{animationDelay: '2s'}}>
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">Freedom</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-white font-semibold tracking-tight">No set days for payouts</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                After 14 days you may request and it will be processed in Blowmind within 24 hours.
              </p>
            </div>
          </ModernCard>

          <ModernCard delay={0.4}>
            <div className="text-center relative">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto floating-icon" style={{animationDelay: '3s'}}>
                  <span className="text-2xl font-bold">90%</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-xl"></div>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400 text-sm font-medium">Benefit</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-white font-semibold tracking-tight">Profits up to $10,000 is all yours</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                Your initial profits up to $10,000 above the withdrawal threshold are allocated entirely to you after fees.
              </p>
            </div>
          </ModernCard>

          <ModernCard delay={0.5}>
            <div className="text-center">
              <div className="card-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 floating-icon" style={{animationDelay: '4s'}}>
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-yellow-400 text-sm font-medium">Advantage</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-white font-semibold tracking-tight">Free level 1 data</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                Even when you get funded with our plans, you&apos;ll have access to premium data.
              </p>
            </div>
          </ModernCard>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
            PRICING PLANS
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text luxury-font">
            Choose Your Plan
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Select the perfect plan for your trading journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Basic', price: 99, popular: false },
            { name: 'Standard', price: 199, popular: true },
            { name: 'Premium', price: 299, popular: false }
          ].map((plan, index) => (
            <ModernCard key={plan.name} delay={0.6 + index * 0.1} className={`relative ${plan.popular ? 'scale-105 border-blue-500/50' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold py-2 px-4 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 luxury-font">{plan.name}</h3>
                <div className="mb-10">
                  <span className="text-5xl md:text-6xl font-bold glow-text luxury-font">${plan.price}</span>
                  <span className="text-gray-300 ml-3 text-lg font-light">/month</span>
                </div>
                <ul className="space-y-4 mb-10 text-left">
                  {[
                    'Access to basic features',
                    'Priority customer support',
                    `${index > 0 ? 'Advanced' : 'Basic'} analytics`,
                    `${index > 0 ? 'Unlimited' : '5'} projects`,
                    `${index > 1 ? 'Custom' : 'Standard'} branding`,
                    `${index > 1 ? 'API' : 'No API'} access`
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-200 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-500 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:shadow-xl hover:shadow-white/30 hover:scale-[1.02]' 
                    : 'bg-gray-800/80 text-gray-100 hover:bg-gray-700/80 border border-gray-600/50 hover:border-white/30'
                }`}>
                  Get Started
                </button>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <ModernCard delay={0.9} className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 glow-text luxury-font">
            Ready to elevate your experience?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Get started with our premium services today and join thousands of successful traders worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-gradient-to-r from-white to-gray-100 text-gray-900 py-4 px-10 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-white/30 hover:scale-[1.02] transition-all duration-500">
              Get Started Now
            </button>
            <button className="border-2 border-gray-600 text-gray-100 py-4 px-10 rounded-xl font-semibold text-lg hover:bg-gray-800/50 hover:border-white/50 transition-all duration-500">
              Contact Sales
            </button>
          </div>
        </ModernCard>
      </div>
      
      {/* Featured Technologies Section with AnimatedCard */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 glow-text luxury-font">
            Cutting-Edge Technologies
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Explore the advanced technologies that power our solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Import the AnimatedCard component */}
          {(() => {
            const AnimatedCard = require('@/components/AnimatedCard').default;
            
            return [
              {
                title: "AI-Powered Analytics",
                description: "Leverage cutting-edge artificial intelligence to gain deep insights from your data and make informed decisions.",
                icon: (
                  <svg className="w-12 h-12 text-purple-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                ),
                glowColor: "rgba(168, 85, 247, 0.4)"
              },
              {
                title: "Blockchain Integration",
                description: "Secure, transparent, and immutable data storage with our advanced blockchain technology integration.",
                icon: (
                  <svg className="w-12 h-12 text-blue-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                glowColor: "rgba(59, 130, 246, 0.4)"
              },
              {
                title: "Immersive Experiences",
                description: "Create stunning, interactive user experiences with our advanced UI/UX technologies and frameworks.",
                icon: (
                  <svg className="w-12 h-12 text-indigo-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                glowColor: "rgba(99, 102, 241, 0.4)"
              }
            ].map((item, index) => (
              <AnimatedCard 
                key={index} 
                glowColor={item.glowColor} 
                depth={15} 
                hoverScale={1.03}
                className="h-full"
              >
                <div className="text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-center">{item.icon}</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 luxury-font">{item.title}</h3>
                    <p className="text-gray-300 font-light leading-relaxed mb-6">{item.description}</p>
                  </div>
                  <button className="mt-auto bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 border border-white/5 hover:border-white/20">
                    Learn More
                  </button>
                </div>
              </AnimatedCard>
            ))
          })()}
        </div>
      </div>
    </div>
  </div>
  );

    </div>
    );
} 