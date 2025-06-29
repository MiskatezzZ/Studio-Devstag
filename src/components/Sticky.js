"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollPage() {
  useEffect(() => {
    const cardClasses = [".ek", ".doo", ".tin", ".char"];
    const cards = cardClasses.map((cls) =>
      document.querySelector(cls)
    ).filter(Boolean);
    const players = [];

    // Load YouTube IFrame API
    const loadYouTubeAPI = () => {
      return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve(window.YT);
        } else {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(tag);
          window.onYouTubeIframeAPIReady = () => {
            resolve(window.YT);
          };
        }
      });
    };

    loadYouTubeAPI().then((YT) => {
      cards.forEach((card, index) => {
        const iframe = card.querySelector("iframe");
        if (!iframe) return;

        const player = new YT.Player(iframe, {
          events: {
            onReady: () => {
              players[index] = player;

              ScrollTrigger.create({
                trigger: card,
                start: "top 10%",
                end: "bottom 10%",
                onEnter: () => {
                  player.playVideo();
                },
                onEnterBack: () => {
                  player.playVideo();
                },
                onLeave: () => {
                  player.pauseVideo();
                },
                onLeaveBack: () => {
                  player.pauseVideo();
                }
              });
            }
          }
        });
      });
    });

    // Sticky pin
    cards.forEach((card, index) => {
      const isLastCard = index === cards.length - 1;
      ScrollTrigger.create({
        trigger: card,
        start: "top 10%",
        end: isLastCard ? "+=100vh" : "top top",
        endTrigger: isLastCard ? null : cards[cards.length - 1],
        pin: true,
        pinSpacing: isLastCard,
        scrub: true
      });
    });

    // Animate card wrapper
    cards.forEach((card, index) => {
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
                opacity: 1 - progress
              });
            }
          });
        }
      }
    });

    // Animate video styling
    cards.forEach((card, index) => {
      if (index > 0) {
        const iframe = card.querySelector("iframe");
        const imgContainer = card.querySelector(".card-img");
        if (iframe && imgContainer) {
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(iframe, { scale: 2 - progress });
              gsap.set(imgContainer, {
                borderRadius: 150 - progress * 125 + "px"
              });
            }
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .ek, .doo, .tin, .char {
          border-radius: 32px;
          overflow: hidden;
        }
        .cards {
          background: #000;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .card {
          width: 90%;
          height: 90vh;
          margin: 2vh auto;
          border-radius: 32px;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-wrapper {
          width: 100%;
          height: 100%;
          background: rgb(14, 2, 42);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .card-img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 150px;
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-img iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: inherit;
        }
      `}</style>

      <div className="cards">
        {["ek", "doo", "tin", "char"].map((cls, i) => (
          <div key={cls} className={`card ${cls}`}>
            <div className="card-wrapper">
              <div className="card-content">
                <h1>
                  {["Curved Horizon", "Indigo Vista", "Green Capsule", "Midnight Minimal"][i]}
                </h1>
                <p>
                  {[
                    "A futuristic residence that plays with curvature and flow, blending bold geometry with natural topography.",
                    "Modern living space inspired by the night sky, with deep indigo tones and serene lines for relaxation.",
                    "Eco-friendly design with lush green accents, merging indoor comfort and outdoor freshness seamlessly.",
                    "Minimalist black space for creative minds, where simplicity and contrast spark inspiration.",
                  ][i]}
                </p>
              </div>
              <div className="card-img">
                <iframe
                  id={`player-${i}`}
                  src="https://www.youtube.com/embed/vOXZkm9p_zY?enablejsapi=1&mute=1"
                  title="YouTube Video"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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