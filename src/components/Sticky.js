"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollPage() {
  useEffect(() => {
    const cardClasses = [".ek", ".doo", ".tin", ".char"];
    const cards = cardClasses.map((cls) => document.querySelector(cls)).filter(Boolean);

    const iframes = [];

    cards.forEach((card, index) => {
      const isLastCard = index === cards.length - 1;
      const iframe = card.querySelector("iframe");
      iframes.push(iframe);

      ScrollTrigger.create({
        trigger: card,
        start: "top 10%",
        end: isLastCard ? "+=100vh" : "top top",
        endTrigger: isLastCard ? null : cards[cards.length - 1],
        pin: true,
        pinSpacing: isLastCard,
        scrub: true,
        onEnter: () => iframe?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*'),
        onLeave: () => iframe?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'),
        onEnterBack: () => iframe?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*'),
        onLeaveBack: () => iframe?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      });

      if (index < cards.length - 1) {
        const cardWrapper = card.querySelector(".card-wrapper");
        const nextCard = cards[index + 1];
        if (cardWrapper && nextCard) {
          ScrollTrigger.create({
            trigger: nextCard,
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(cardWrapper, {
                scale: 1 - progress * 0.25,
                opacity: 1 - progress,
              });
            },
          });
        }
      }

      if (index > 0) {
        const cardImg = card.querySelector(".card-img iframe");
        const imgContainer = card.querySelector(".card-img");
        if (cardImg && imgContainer) {
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(cardImg, { scale: 2 - progress });
              gsap.set(imgContainer, {
                borderRadius: 150 - progress * 125 + "px",
              });
            },
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const videoSrc = (autoplay = false) =>
    `https://www.youtube.com/embed/pXJ2qoGU88g?enablejsapi=1&autoplay=${autoplay ? 1 : 0}&mute=1&loop=1&playlist=pXJ2qoGU88g&modestbranding=1&rel=0&controls=0`;

  const cardsData = [
    {
      class: "ek",
      title: "Curved Horizon",
      desc:
        "A futuristic residence that plays with curvature and flow, blending bold geometry with natural topography.",
    },
    {
      class: "doo",
      title: "Indigo Vista",
      desc:
        "Modern living space inspired by the night sky, with deep indigo tones and serene lines for relaxation.",
    },
    {
      class: "tin",
      title: "Green Capsule",
      desc:
        "Eco-friendly design with lush green accents, merging indoor comfort and outdoor freshness seamlessly.",
    },
    {
      class: "char",
      title: "Midnight Minimal",
      desc:
        "Minimalist black space for creative minds, where simplicity and contrast spark inspiration.",
    },
  ];

  return (
    <>
      <style jsx global>{`
        .cards {
          min-height: 100vh;
          padding: 0;
          margin: 0;
          background: #0e022a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .card {
          width: 90%;
          height: 90vh;
          margin: 2vh auto;
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 32px;
          background: #0e022a;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
        }
        .card-content {
          z-index: 2;
          text-align: center;
          color: white;
          display: none;
        }
        .card-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 32px;
          overflow: hidden;
        }
        .card-img iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 32px;
          object-fit: cover;
        }
      `}</style>

      <div className="cards">
        {cardsData.map((card, i) => (
          <div key={card.class} className={`card ${card.class}`}>
            <div className="card-wrapper">
              <div className="card-content">
                <h1>{card.title}</h1>
                <p>{card.desc}</p>
              </div>
              <div className="card-img">
                <iframe
                  src={videoSrc(i === 0)}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
