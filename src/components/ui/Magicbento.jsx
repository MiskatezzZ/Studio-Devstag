import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

const DEFAULT_PARTICLE_COUNT = 0;
const DEFAULT_SPOTLIGHT_RADIUS = "15vw";
const DEFAULT_GLOW_COLOR = "132, 0, 255";

// 4 Responsive Breakpoints
const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440
};

const cardData = [
  {
    color: "#060010",
    title: "Studio DevStag",
    description: "Digital experiences crafted at the intersection of art, code, and performance.",
    label: "Studio",
  },
  {
    color: "#060010",
    title: "Interfaces & Interactions",
    description: "Fluid UI, motion systems, and micro-interactions that feel alive.",
    label: "UX",
  },
  {
    color: "#060010",
    title: "Real-Time 3D & Web",
    description: "WebGL, shaders, and high-fps visuals tuned for all devices.",
    label: "Immersive",
  },
  {
    color: "#060010",
    title: "Systems & Scale",
    description: "Design tokens, component libraries, and CI/CD for long-term velocity.",
    label: "Systems",
  },
  {
    color: "#060010",
    title: "Performance & Accessibility",
    description: "Core Web Vitals, a11y, and testing built into the process.",
    label: "Quality",
  },
  {
    color: "#060010",
    title: "Partnerships",
    description: "We embed with teams to ship, iterate, and grow products.",
    label: "Collab",
  },
];

const createParticleElement = (
  x,
  y,
  color = DEFAULT_GLOW_COLOR
) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: clamp(0.15vmin, 0.2vw, 0.35vmin);
    height: clamp(0.15vmin, 0.2vw, 0.35vmin);
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 clamp(0.2vmin, 0.35vw, 0.6vmin) rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}%;
    top: ${y}%;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => {
  const toPx = (r) => {
    if (typeof r === 'number') return r;
    if (typeof r !== 'string') return 0;
    const n = parseFloat(r);
    if (Number.isNaN(n)) return 0;
    if (typeof window === 'undefined') return n;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const vmin = Math.min(vw, vh);
    const vmax = Math.max(vw, vh);
    if (r.endsWith('vw')) return (n / 100) * vw;
    if (r.endsWith('vh')) return (n / 100) * vh;
    if (r.endsWith('vmin')) return (n / 100) * vmin;
    if (r.endsWith('vmax')) return (n / 100) * vmax;
    if (r.endsWith('%')) return (n / 100) * vmin;
    return n; // assume px-like numeric fallback
  };

  const radiusPx = toPx(radius);
  return {
    proximity: radiusPx * 0.5,
    fadeDistance: radiusPx * 0.75,
  };
};

const updateCardGlowProperties = (
  card,
  mouseX,
  mouseY,
  glow,
  radius
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty(
    "--glow-radius",
    typeof radius === 'string'
      ? radius
      : (typeof window !== 'undefined'
          ? `${(radius / Math.max(Math.min(window.innerWidth, window.innerHeight), 1)) * 100}vmin`
          : `${radius}`)
  );
};

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * 100,
        Math.random() * 100,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: `${((Math.random() - 0.5) * 4).toFixed(2)}vmin`,
          y: `${((Math.random() - 0.5) * 4).toFixed(2)}vmin`,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          xPercent: 0,
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const dx = x - centerX;
        const dy = y - centerY;
        const magnetXPercent = (dx / rect.width) * 5; // ±5% of width
        const magnetYPercent = (dy / rect.height) * 5; // ±5% of height

        magnetismAnimationRef.current = gsap.to(element, {
          xPercent: magnetXPercent,
          yPercent: magnetYPercent,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      const widthPct = ((maxDistance * 2) / rect.width) * 100;
      const heightPct = ((maxDistance * 2) / rect.height) * 100;
      const leftPct = ((x - maxDistance) / rect.width) * 100;
      const topPct = ((y - maxDistance) / rect.height) * 100;
      ripple.style.cssText = `
        position: absolute;
        width: ${widthPct}%;
        height: ${heightPct}%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${leftPct}%;
        top: ${topPct}%;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: clamp(24vmin, 40vw, 60vmin);
      height: clamp(24vmin, 40vw, 60vmin);
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll(".card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          card.style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius
        );
      });

      gsap.to(spotlightRef.current, {
        left: `${(e.clientX / window.innerWidth) * 100}vw`,
        top: `${(e.clientY / window.innerHeight) * 100}vh`,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll(".card").forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid = ({ children, gridRef, disableAnimations }) => (
  <div
    className={`bento-section select-none relative ${disableAnimations ? "no-anim" : ""}`}
    ref={gridRef}
    role="region"
    aria-labelledby="bento-heading"
    aria-describedby="bento-subheading"
  >
    {children}
  </div>
);

const useResponsiveDetection = () => {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= BREAKPOINTS.mobile) {
        setScreenSize('mobile');
      } else if (width <= BREAKPOINTS.tablet) {
        setScreenSize('tablet');
      } else if (width <= BREAKPOINTS.desktop) {
        setScreenSize('desktop');
      } else {
        setScreenSize('largeDesktop');
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

    const MagicBento = ({
      textAutoHide = true,
      enableStars = false,
      enableSpotlight = false,
      enableBorderGlow = false,
      disableAnimations = true,
      spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
      particleCount = DEFAULT_PARTICLE_COUNT,
      enableTilt = false,
      glowColor = DEFAULT_GLOW_COLOR,
      clickEffect = false,
      enableMagnetism = false,
      enableHoverLift = true,
    }) => {
      const gridRef = useRef(null);
      const screenSize = useResponsiveDetection();
      const shouldDisableAnimations = disableAnimations || screenSize === 'mobile';

      return (
        <>
          <style>
            {`
              .bento-section {
                --glow-x: 50%;
                --glow-y: 50%;
                --glow-intensity: 0;
                --glow-radius: clamp(8vmin, 14vw, 18vmin);
                --glow-color: ${glowColor};
                --border-color: #392e4e;
                --background-dark: #060010;
                --white: hsl(0, 0%, 100%);
                --purple-primary: rgba(132, 0, 255, 1);
                --purple-glow: rgba(132, 0, 255, 0.2);
                --purple-border: rgba(132, 0, 255, 0.8);
                --card-padding: clamp(1rem, 2.2vmin, 2.25rem);
                --card-gap: clamp(0.75rem, 1.8vmin, 1.25rem);
                --card-border-radius: clamp(0.75rem, 1.5vmin, 1.25rem);
                --card-min-height: clamp(18rem, 30vmin, 44rem);
                --spacing-xs: clamp(0.25rem, 1vmin, 0.5rem);
                --spacing-sm: clamp(0.5rem, 1.2vmin, 0.875rem);
                --spacing-md: clamp(0.75rem, 1.6vmin, 1.25rem);
                --spacing-lg: clamp(1rem, 2.2vmin, 1.75rem);
                --spacing-xl: clamp(1.5rem, 3vmin, 3rem);
                /* Fluid typography tokens */
                --title-size: clamp(1rem, 2.2vmin, 1.5rem);
                --desc-size: clamp(0.875rem, 1.6vmin, 1.125rem);
                --label-size: clamp(0.75rem, 1.2vmin, 0.9375rem);
              }
              
              /* Zoom-stable grid system */
              .card-responsive {
                display: grid;
                grid-template-columns: 1fr;
                gap: var(--card-gap);
                width: 100%;
                max-width: 96vw;
                margin: 0 auto;
                padding: 0 var(--card-padding);
                box-sizing: border-box;
              }
              
              /* Mobile (481px and up) */
              @media (min-width: 30rem) {
                .card-responsive {
                  grid-template-columns: 1fr;
                  max-width: 96vw;
                }
              }
              
              /* Tablet (769px and up) */
              @media (min-width: 48rem) {
                .card-responsive {
                  grid-template-columns: repeat(2, 1fr);
                  max-width: 94vw;
                }
              }
              
              /* Desktop (1025px and up) */
              @media (min-width: 64rem) {
                .card-responsive {
                  grid-template-columns: repeat(4, 1fr);
                  max-width: 92vw;
                }
                
                .card-responsive .card:nth-child(3) {
                  grid-column: span 2;
                  grid-row: span 2;
                }
                
                .card-responsive .card:nth-child(4) {
                  grid-column: 1 / span 2;
                  grid-row: 2 / span 2;
                }
                
                .card-responsive .card:nth-child(6) {
                  grid-column: 4;
                  grid-row: 3;
                }
              }
              
              /* Large Desktop (1441px and up) */
              @media (min-width: 90rem) {
                .card-responsive {
                  max-width: 90vw;
                }
              }
              
              .card--border-glow::after {
                content: '';
                position: absolute;
                inset: 0;
                padding: clamp(0.25rem, 0.5vw, 0.375rem);
                background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                    rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                    rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                    transparent 60%);
                border-radius: inherit;
                mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                mask-composite: subtract;
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                pointer-events: none;
                transition: opacity 0.3s ease;
                z-index: 1;
              }
              
              .card--border-glow:hover::after {
                opacity: 1;
              }
              
              .card--border-glow:hover {
                box-shadow: 0 clamp(0.25rem, 1vw, 1.25rem) clamp(1.25rem, 4vw, 2.5rem) rgba(46, 24, 78, 0.4), 
                           0 0 clamp(1.875rem, 6vw, 3.75rem) rgba(${glowColor}, 0.2);
              }
              
              .particle::before {
                content: '';
                position: absolute;
                top: -0.25vmin;
                left: -0.25vmin;
                right: -0.25vmin;
                bottom: -0.25vmin;
                background: rgba(${glowColor}, 0.2);
                border-radius: 50%;
                z-index: -1;
              }
              
              .particle-container:hover {
                box-shadow: 0 clamp(0.25rem, 1vw, 1.25rem) clamp(1.25rem, 4vw, 2.5rem) rgba(46, 24, 78, 0.2), 
                           0 0 clamp(1.875rem, 6vw, 3.75rem) rgba(${glowColor}, 0.2);
              }
              
              .text-clamp-1 {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              
              .text-clamp-2 {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              
              /* Enhanced Mobile Styles */
              @media (max-width: 30rem) {
                .card-responsive {
                  grid-template-columns: 1fr;
                  width: 100%;
                  margin: 0 auto;
                  padding: clamp(0.75rem, 4vw, 1rem);
                  gap: clamp(0.75rem, 4vw, 1rem);
                }
                
                .card-responsive .card {
                  width: 100%;
                  min-height: var(--card-min-height);
                  aspect-ratio: auto;
                }
              }
              
              /* Hard-disable any motion when animations are disabled */
              .no-anim .card,
              .no-anim .card:hover {
                transform: none !important;
                transition: none !important;
                box-shadow: none !important;
              }
              .no-anim .card--border-glow::after {
                opacity: 0 !important;
              }
              
              /* Fixed zoom-stable text styles */
              .card__title {
                font-size: var(--title-size) !important;
                line-height: 1.3 !important;
                letter-spacing: -0.01em !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
              }
              
              .card__description {
                font-size: var(--desc-size) !important;
                line-height: 1.5 !important;
                color: rgba(255, 255, 255, 0.92) !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
              }
              
              .card__label {
                font-size: var(--label-size) !important;
                word-wrap: break-word !important;
              }
              
              /* Responsive text scaling for different screen sizes */
              @media (min-width: 30rem) {
                .bento-section {
                  --title-size: clamp(1.0625rem, 2.2vmin, 1.5rem);
                  --desc-size: clamp(0.9rem, 1.6vmin, 1.125rem);
                  --label-size: clamp(0.75rem, 1.2vmin, 0.9375rem);
                }
              }
              
              @media (min-width: 48rem) {
                .bento-section {
                  --title-size: clamp(1.125rem, 2.3vmin, 1.625rem);
                  --desc-size: clamp(0.9375rem, 1.7vmin, 1.1875rem);
                  --label-size: clamp(0.8125rem, 1.3vmin, 1rem);
                }
              }
              
              @media (min-width: 64rem) {
                .bento-section {
                  --title-size: clamp(1.25rem, 2.4vmin, 1.75rem);
                  --desc-size: clamp(1rem, 1.9vmin, 1.25rem);
                  --label-size: clamp(0.875rem, 1.4vmin, 1.0625rem);
                  --card-min-height: clamp(20rem, 32vmin, 48rem);
                }
              }
              
              @media (min-width: 90rem) {
                .bento-section {
                  --title-size: clamp(1.5rem, 2.6vmin, 1.875rem);
                  --desc-size: clamp(1.0625rem, 2vmin, 1.3125rem);
                  --label-size: clamp(0.9375rem, 1.5vmin, 1.125rem);
                  --card-min-height: clamp(24rem, 36vmin, 56rem);
                }
              }
              
              /* Zoom-friendly responsive overrides */
              .card {
                min-height: var(--card-min-height) !important;
                padding: var(--card-padding) !important;
                border-radius: var(--card-border-radius) !important;
                overflow: hidden !important;
                word-wrap: break-word !important;
                box-sizing: border-box !important;
                width: 100% !important;
                max-width: 100% !important;
              }
              
              .card__header {
                gap: var(--spacing-sm) !important;
                margin-bottom: var(--spacing-sm) !important;
                flex-shrink: 0 !important;
                width: 100% !important;
              }
              
              .card__content {
                flex: 1 !important;
                min-height: 0 !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: flex-start !important;
                width: 100% !important;
              }
              
              /* Enhanced text clamping for all zoom levels */
              .text-clamp-1 {
                display: -webkit-box !important;
                -webkit-box-orient: vertical !important;
                -webkit-line-clamp: 1 !important;
                line-clamp: 1 !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                word-break: break-word !important;
                hyphens: auto !important;
              }
              
              .text-clamp-2 {
                display: -webkit-box !important;
                -webkit-box-orient: vertical !important;
                -webkit-line-clamp: 2 !important;
                line-clamp: 2 !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                word-break: break-word !important;
                hyphens: auto !important;
              }
              
              /* Zoom-stable container system */
              .bento-section {
                width: 100% !important;
                max-width: none !important;
                margin: 0 auto !important;
                padding: var(--card-padding) !important;
                box-sizing: border-box !important;
                overflow-x: hidden !important;
              }
              
              /* Fixed text clamping regardless of zoom */
              .text-clamp-1 {
                -webkit-line-clamp: 1 !important;
                line-clamp: 1 !important;
              }
              
              .text-clamp-2 {
                -webkit-line-clamp: 2 !important;
                line-clamp: 2 !important;
              }
              
              /* Screen size specific clamping */
              @media (min-width: 48rem) {
                .text-clamp-2 {
                  -webkit-line-clamp: 2 !important;
                  line-clamp: 2 !important;
                }
              }
              
              @media (min-width: 64rem) {
                .text-clamp-2 {
                  -webkit-line-clamp: 3 !important;
                  line-clamp: 3 !important;
                }
              }
              
              @media (min-width: 90rem) {
                .text-clamp-2 {
                  -webkit-line-clamp: 4 !important;
                  line-clamp: 4 !important;
                }
              }
            `}
          </style>

          {enableSpotlight && (
            <GlobalSpotlight
              gridRef={gridRef}
              disableAnimations={shouldDisableAnimations}
              enabled={enableSpotlight}
              spotlightRadius={spotlightRadius}
              glowColor={glowColor}
            />
          )}

          <div className="mx-auto max-w-4xl text-center mb-[var(--spacing-xl)]" style={{paddingInline: 'var(--card-padding)', maxWidth: 'min(84vw, 90ch)'}}>
            <span 
              className="inline-block py-[var(--spacing-xs)] px-[var(--spacing-sm)] font-medium tracking-widest uppercase text-yellow-300 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
              style={{
                fontSize: 'clamp(0.6875rem, 1.2vmin, 0.875rem)',
                letterSpacing: '0.1em',
                wordWrap: 'break-word'
              }}
            >
              Capabilities
            </span>
            <h2 
              id="bento-heading" 
              className="mt-[var(--spacing-md)] font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white hero-title"
            >
              DevStag Studio Capabilities
            </h2>
            <p 
              id="bento-subheading" 
              className="mx-auto max-w-3xl mt-[var(--spacing-sm)] text-blue-100/85 font-light hero-subtitle"
            >
              Interfaces, real‑time 3D, and scalable systems—designed for performance, accessibility, and long‑term velocity.
            </p>
          </div>

          <BentoCardGrid gridRef={gridRef} disableAnimations={shouldDisableAnimations}>
            <div className="card-responsive grid gap-[var(--card-gap)]">
              {cardData.map((card, index) => {
                const hoverLift = shouldDisableAnimations || !enableHoverLift ? "" : "hover:-translate-y-[0.2vh] hover:shadow-[0_clamp(0.3rem,1.5vw,0.8rem)_clamp(1rem,4vw,2rem)_rgba(0,0,0,0.15)]";
                const transitionClasses = shouldDisableAnimations ? "" : "transition-all duration-300 ease-in-out";
                const baseClassName = `card flex flex-col justify-between relative min-h-[var(--card-min-height)] w-full max-w-full p-[var(--card-padding)] rounded-[var(--card-border-radius)] border border-solid font-light overflow-hidden ${transitionClasses} ${hoverLift} ${enableBorderGlow ? "card--border-glow" : ""}`;

                const cardStyle = {
                  backgroundColor: card.color || "var(--background-dark)",
                  borderColor: "var(--border-color)",
                  color: "var(--white)",
                  "--glow-x": "50%",
                  "--glow-y": "50%",
                  "--glow-intensity": "0",
                  "--glow-radius": "var(--glow-radius)",
                };

                if (enableStars) {
                  return (
                    <ParticleCard
                      key={index}
                      className={baseClassName}
                      style={cardStyle}
                      disableAnimations={shouldDisableAnimations}
                      particleCount={particleCount}
                      glowColor={glowColor}
                      enableTilt={enableTilt}
                      clickEffect={clickEffect}
                      enableMagnetism={enableMagnetism}
                    >
                      <div className="card__header flex justify-between gap-[var(--spacing-sm)] relative text-white mb-[var(--spacing-sm)]">
                        <span className="card__label font-medium tracking-wider text-white/70">{card.label}</span>
                      </div>
                      <div className="card__content flex flex-col relative text-white flex-1">
                        <h3 className={`card__title font-medium m-0 mb-[var(--spacing-sm)] ${textAutoHide ? "text-clamp-1" : ""}`}>
                          {card.title}
                        </h3>
                        <p className={`card__description ${textAutoHide ? "text-clamp-2" : ""}`}>
                          {card.description}
                        </p>
                      </div>
                    </ParticleCard>
                  );
                }

                return (
                  <div
                    key={index}
                    className={baseClassName}
                    style={cardStyle}
                    ref={(el) => {
                      if (!el) return;

                      const handleMouseMove = (e) => {
                        if (shouldDisableAnimations) return;

                        const rect = el.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;

                        if (enableTilt) {
                          const rotateX = ((y - centerY) / centerY) * -10;
                          const rotateY = ((x - centerX) / centerX) * 10;

                          gsap.to(el, {
                            rotateX,
                            rotateY,
                            duration: 0.1,
                            ease: "power2.out",
                            transformPerspective: 1000,
                          });
                        }

                        if (enableMagnetism) {
                          const dx = x - centerX;
                          const dy = y - centerY;
                          const magnetXPercent = (dx / rect.width) * 5; // ±5% of width
                          const magnetYPercent = (dy / rect.height) * 5; // ±5% of height

                          gsap.to(el, {
                            xPercent: magnetXPercent,
                            yPercent: magnetYPercent,
                            duration: 0.3,
                            ease: "power2.out",
                          });
                        }
                      };

                      const handleMouseLeave = () => {
                        if (shouldDisableAnimations) return;

                        if (enableTilt) {
                          gsap.to(el, {
                            rotateX: 0,
                            rotateY: 0,
                            duration: 0.3,
                            ease: "power2.out",
                          });
                        }

                        if (enableMagnetism) {
                          gsap.to(el, {
                            xPercent: 0,
                            yPercent: 0,
                            duration: 0.3,
                            ease: "power2.out",
                          });
                        }
                      };

                      const handleClick = (e) => {
                        if (!clickEffect || shouldDisableAnimations) return;

                        const rect = el.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        const maxDistance = Math.max(
                          Math.hypot(x, y),
                          Math.hypot(x - rect.width, y),
                          Math.hypot(x, y - rect.height),
                          Math.hypot(x - rect.width, y - rect.height)
                        );

                        const ripple = document.createElement("div");
                        const widthPct = ((maxDistance * 2) / rect.width) * 100;
                        const heightPct = ((maxDistance * 2) / rect.height) * 100;
                        const leftPct = ((x - maxDistance) / rect.width) * 100;
                        const topPct = ((y - maxDistance) / rect.height) * 100;
                        ripple.style.cssText = `
                          position: absolute;
                          width: ${widthPct}%;
                          height: ${heightPct}%;
                          border-radius: 50%;
                          background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                          left: ${leftPct}%;
                          top: ${topPct}%;
                          pointer-events: none;
                          z-index: 1000;
                        `;

                        el.appendChild(ripple);

                        gsap.fromTo(
                          ripple,
                          {
                            scale: 0,
                            opacity: 1,
                          },
                          {
                            scale: 1,
                            opacity: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            onComplete: () => ripple.remove(),
                          }
                        );
                      };

                      el.addEventListener("mousemove", handleMouseMove);
                      el.addEventListener("mouseleave", handleMouseLeave);
                      el.addEventListener("click", handleClick);
                    }}
                  >
                    <div className="card__header flex justify-between gap-[var(--spacing-sm)] relative text-white mb-[var(--spacing-sm)]">
                      <span className="card__label font-medium tracking-wider text-white/70">{card.label}</span>
                    </div>
                    <div className="card__content flex flex-col relative text-white flex-1">
                      <h3 className={`card__title font-medium m-0 mb-[var(--spacing-sm)] ${textAutoHide ? "text-clamp-1" : ""}`}>
                        {card.title}
                      </h3>
                      <p className={`card__description ${textAutoHide ? "text-clamp-2" : ""}`}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </BentoCardGrid>
        </>
      );
    };

    export default MagicBento;
