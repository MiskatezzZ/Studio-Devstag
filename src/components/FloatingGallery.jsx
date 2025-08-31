"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const images = [
  "/images/floating_1.jpg",
  "/images/floating_2.jpg",
  "/images/floating_3.jpg",
  "/images/floating_4.jpg",
  "/images/floating_5.jpg",
  "/images/floating_6.jpg",
  "/images/floating_7.jpg",
  "/images/floating_8.jpg",
];

const positions = [
  { top: "5%", left: "-8%" },
  { top: "8%", left: "18%" },
  { top: "2%", left: "45%" },
  { top: "10%", left: "75%" },
  { top: "50%", left: "-5%" },
  { top: "77%", left: "30%" },
  { top: "65%", left: "60%" },
  { top: "40%", left: "85%" },
];

const accent = "#E5C77A"; // Gold accent
const glassBg = "rgba(30, 30, 40, 0.55)";
const glassBorder = `var(--border-w) solid ${accent}`;

const LuxuryGalleryImage = ({ src, alt, style, zIndex }) => (
  <div
    className="floating-wrapper"
    style={{
      position: "absolute",
      borderRadius: "var(--radius)",
      overflow: "hidden",
      boxShadow:
        "var(--shadow-default)",
      border: glassBorder,
      background: glassBg,
      backdropFilter: "blur(var(--blur))",
      transition:
        "transform 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.4s cubic-bezier(.4,2,.6,1)",
      zIndex,
      ...style,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.045) translateY(calc(-1 * var(--hover-rise)))";
      e.currentTarget.style.boxShadow = "var(--shadow-hover)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow =
        "var(--shadow-default)";
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        display: "block",
        width: "var(--img-w)",
        height: "var(--img-h)",
        objectFit: "cover",
        borderRadius: "var(--radius-inner)",
        filter: "brightness(0.98) contrast(1.08)",
        transition: "filter 0.4s cubic-bezier(.4,2,.6,1)",
      }}
    />
  </div>
);

const LuxuryGalleryHeader = () => (
  <div
    className="floating-header"
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
      textAlign: "center",
      pointerEvents: "none",
      width: "var(--header-wrap-w)",
    }}
  >
    <h1
      style={{
        fontFamily: "'Inter', 'DM Serif Display', serif",
        fontWeight: 900,
        fontSize: "var(--header-size)",
        letterSpacing: "-0.15vw",
        color: "#fff",
        margin: 0,
        lineHeight: 1.08,
        textShadow: "var(--header-shadow)",
      }}
    >
      <span style={{ color: accent, fontWeight: 900 }}>Devstag</span> Signature
      Gallery
    </h1>
    <p
      style={{
        fontFamily: "'Inter', 'DM Serif Display', serif",
        fontWeight: 400,
        fontSize: "var(--sub-size)",
        color: "#e5e5e5",
        margin: "var(--sub-margin-top) 0 0 0",
        letterSpacing: "0.05vw",
        textShadow: "var(--sub-shadow)",
        opacity: 0.92,
      }}
    >
      Crafting Virtual Worlds with Precision
    </p>
    <div
      style={{
        margin: "var(--button-margin-top) auto 0 auto",
        display: "inline-block",
        padding: "var(--btn-pad-y) var(--btn-pad-x)",
        borderRadius: "var(--button-radius)",
        background: `linear-gradient(90deg, ${accent} 0%, #fffbe6 100%)`,
        color: "#222",
        fontWeight: 700,
        fontSize: "var(--button-font)",
        letterSpacing: "0.2vw",
        boxShadow: "var(--button-shadow)",
        border: `var(--border-w) solid ${accent}`,
        opacity: 0.98,
        pointerEvents: "auto",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      Experience Our Work
    </div>
  </div>
);

const LuxuryGalleryBackground = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 0,
      background: "radial-gradient(ellipse at 60% 40%, #23232b 60%, #18181c 100%)",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 60%, #e5c77a22 0%, transparent 70%)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, transparent 60%, #18181c 100%)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  </div>
);

const FloatingGallery = () => {
  const containerRef = useRef(null);
  const parallaxEnabledRef = useRef(false);

  useEffect(() => {
    const wrappers = gsap.utils.toArray(".floating-wrapper");

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      wrappers.forEach((wrapper, i) => {
        const depth = [1, 3, 6, 8].includes(i) ? 0.5 : 0.2;
        const maxShiftPercent = 2.5; // percentage-based parallax for responsiveness

        gsap.to(wrapper, {
          xPercent: x * maxShiftPercent * depth,
          yPercent: y * maxShiftPercent * depth,
          ease: "power2.out",
          duration: 0.5,
          overwrite: true,
        });
      });
    };

    const enableParallax = () => {
      if (!parallaxEnabledRef.current) {
        window.addEventListener("mousemove", handleMouseMove);
        parallaxEnabledRef.current = true;
      }
    };

    const disableParallax = () => {
      if (parallaxEnabledRef.current) {
        window.removeEventListener("mousemove", handleMouseMove);
        parallaxEnabledRef.current = false;
      }
      // Reset any transforms applied by parallax
      wrappers.forEach((w) => gsap.set(w, { xPercent: 0, yPercent: 0 }));
    };

    const onResize = () => {
      if (window.innerWidth <= 1024) {
        disableParallax();
      } else {
        enableParallax();
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      disableParallax();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="floating-gallery"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        marginLeft: "calc(50% - 50vw)",
        fontFamily: "'Inter', 'DM Serif Display', serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        userSelect: "none",
        background: "#18181c",
        zIndex: 0,
      }}
    >
      <LuxuryGalleryBackground />
      <LuxuryGalleryHeader />
      {images.map((src, index) => (
        <LuxuryGalleryImage
          key={index}
          src={src}
          alt={`Gallery ${index}`}
          zIndex={[1, 3, 6, 8].includes(index) ? 3 : 2}
          style={{
            top: positions[index].top,
            left: positions[index].left,
            width: "var(--img-w)",
            height: "var(--img-h)",
          }}
        />
      ))}
      <style jsx>{`
        .floating-gallery {
          /* Design tokens using only vw, vh, and % */
          --accent: ${accent};
          --accent-08: rgba(229,199,122,0.08);
          --accent-27: rgba(229,199,122,0.27);

          /* XL ≥ 1441px (default) */
          --border-w: 0.15vw;
          --radius: 1.5vw;
          --radius-inner: 1.2vw;
          --img-w: 22vw;
          --img-h: 13.75vw; /* 16:10 */
          --blur: 1vh;
          --hover-rise: 1vh;

          --header-wrap-w: 80vw;
          --header-size: 3.8vw;
          --header-shadow: 0 0.8vh 3.6vh rgba(0,0,0,0.32);

          --sub-size: 1.2vw;
          --sub-margin-top: 2vh;
          --sub-shadow: 0 0.3vh 1.2vh rgba(0,0,0,0.18);

          --button-font: 1.1vw;
          --btn-pad-y: 1.2vh;
          --btn-pad-x: 2.4vw;
          --button-radius: 6vw;
          --button-margin-top: 3vh;
          --button-shadow: 0 0.3vh 1.6vh 0 var(--accent-08);

          --shadow-default: 0 1vh 3vh 0 rgba(0,0,0,0.28), 0 0.2vw 1vh 0 var(--accent-08);
          --shadow-hover: 0 2vh 6vh 0 rgba(0,0,0,0.38), 0 0.2vw 2vh 0 var(--accent-27);
        }

        /* LG: ≤ 1440px */
        @media (max-width: 90em) {
          .floating-gallery {
            --img-w: 28vw;
            --img-h: 17.5vw;
            --radius: 1.6vw;
            --radius-inner: 1.3vw;
            --border-w: 0.2vw;
            --header-size: 4.5vw;
            --sub-size: 1.4vw;
            --button-font: 1.3vw;
            --btn-pad-y: 1.6vh;
            --btn-pad-x: 3vw;
            --button-radius: 7vw;
            --header-wrap-w: 80vw;
          }
        }

        /* MD: ≤ 1024px */
        @media (max-width: 64em) {
          .floating-gallery {
            --img-w: 40vw;
            --img-h: 25vw;
            --radius: 2.2vw;
            --radius-inner: 1.8vw;
            --border-w: 0.25vw;
            --header-size: 6vw;
            --sub-size: 2vw;
            --button-font: 2.2vw;
            --btn-pad-y: 2vh;
            --btn-pad-x: 4vw;
            --button-radius: 8vw;
            --header-wrap-w: 85vw;
            --hover-rise: 1.6vh;
            --stack-gap: 2.5vh;

            /* Switch to stacked flow on MD */
            height: auto !important;
            width: 100% !important;
            margin-left: 0 !important;
            padding: 6vw 0;
          }

          :global(.floating-wrapper) {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            margin: var(--stack-gap) auto 0 auto;
          }

          :global(.floating-header) {
            position: static !important;
            transform: none !important;
            top: auto !important;
            left: auto !important;
            margin: 0 auto 3vh auto;
            padding: 0 4vw;
            text-align: center;
            pointer-events: auto !important;
          }
        }

        /* SM: ≤ 640px */
        @media (max-width: 40em) {
          .floating-gallery {
            --img-w: 80vw;
            --img-h: 50vw;
            --radius: 4.5vw;
            --radius-inner: 4vw;
            --border-w: 0.5vw;
            --header-size: 8.5vw;
            --sub-size: 3vw;
            --button-font: 3.6vw;
            --btn-pad-y: 2.2vh;
            --btn-pad-x: 6vw;
            --button-radius: 10vw;
            --header-wrap-w: 88vw;
            --sub-margin-top: 2.5vh;
            --stack-gap: 3vh;

            /* Ensure stacked flow padding is generous on SM */
            height: auto !important;
            width: 100% !important;
            margin-left: 0 !important;
            padding: 8vw 0;
          }

          :global(.floating-wrapper) {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            margin: var(--stack-gap) auto 0 auto;
          }

          :global(.floating-header) {
            position: static !important;
            transform: none !important;
            top: auto !important;
            left: auto !important;
            margin: 0 auto 4vh auto;
            padding: 0 5vw;
            text-align: center;
            pointer-events: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FloatingGallery;