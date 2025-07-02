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
const glassBorder = `1.5px solid ${accent}`;

const LuxuryGalleryImage = ({ src, alt, style, zIndex }) => (
  <div
    className="floating-wrapper"
    style={{
      position: "absolute",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow:
        "0 8px 32px 0 rgba(0,0,0,0.28), 0 1.5px 8px 0 rgba(229,199,122,0.08)",
      border: glassBorder,
      background: glassBg,
      backdropFilter: "blur(8px)",
      transition:
        "transform 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.4s cubic-bezier(.4,2,.6,1)",
      zIndex,
      ...style,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.045) translateY(-6px)";
      e.currentTarget.style.boxShadow = `0 16px 48px 0 rgba(0,0,0,0.38), 0 2px 16px 0 ${accent}44`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow =
        "0 8px 32px 0 rgba(0,0,0,0.28), 0 1.5px 8px 0 rgba(229,199,122,0.08)";
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        display: "block",
        width: 320,
        height: 200,
        objectFit: "cover",
        borderRadius: 18,
        filter: "brightness(0.98) contrast(1.08)",
        transition: "filter 0.4s cubic-bezier(.4,2,.6,1)",
      }}
    />
  </div>
);

const LuxuryGalleryHeader = () => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
      textAlign: "center",
      pointerEvents: "none",
      width: "min(90vw, 700px)",
    }}
  >
    <h1
      style={{
        fontFamily: "'Inter', 'DM Serif Display', serif",
        fontWeight: 900,
        fontSize: "3.8rem",
        letterSpacing: "-0.03em",
        color: "#fff",
        margin: 0,
        lineHeight: 1.08,
        textShadow: "0 6px 32px rgba(0,0,0,0.32)",
      }}
    >
      <span style={{ color: accent, fontWeight: 900 }}>Devstag</span> Signature
      Gallery
    </h1>
    <p
      style={{
        fontFamily: "'Inter', 'DM Serif Display', serif",
        fontWeight: 400,
        fontSize: "1.35rem",
        color: "#e5e5e5",
        margin: "18px 0 0 0",
        letterSpacing: "0.01em",
        textShadow: "0 2px 8px rgba(0,0,0,0.18)",
        opacity: 0.92,
      }}
    >
      Crafting Virtual Worlds with Precision
    </p>
    <div
      style={{
        margin: "32px auto 0 auto",
        display: "inline-block",
        padding: "0.7em 2.2em",
        borderRadius: 100,
        background: `linear-gradient(90deg, ${accent} 0%, #fffbe6 100%)`,
        color: "#222",
        fontWeight: 700,
        fontSize: "1.18rem",
        letterSpacing: "0.04em",
        boxShadow: "0 2px 16px 0 rgba(229,199,122,0.12)",
        border: `1.5px solid ${accent}`,
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

  useEffect(() => {
    const wrappers = gsap.utils.toArray(".floating-wrapper");

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      wrappers.forEach((wrapper, i) => {
        const depth = [1, 3, 6, 8].includes(i) ? 0.5 : 0.2;
        const maxShift = 30;

        gsap.to(wrapper, {
          x: x * maxShift * depth,
          y: y * maxShift * depth,
          ease: "power2.out",
          duration: 0.5,
          overwrite: true,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
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
            width: 320,
            height: 200,
          }}
        />
      ))}
    </section>
  );
};

export default FloatingGallery;