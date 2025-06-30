"use client";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollPage() {
  useEffect(() => {
    const cardClasses = [".ek", ".doo", ".tin", ".char"];
    const cards = cardClasses.map(cls => document.querySelector(cls)).filter(Boolean);


    
    // Sticky pin logic (as before)
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

    // --- Animate previous card's wrapper as next card enters (scale/opacity) ---
    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const cardWrapper = card.querySelector('.card-wrapper');
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
            }
          });
        }
      }
    });

    // --- Animate card image and container (scale, borderRadius) ---
    cards.forEach((card, index) => {
      if (index > 0) {
        const cardImg = card.querySelector('.card-img img');
        const imgContainer = card.querySelector('.card-img');
        if (cardImg && imgContainer) {
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(cardImg, { scale: 2 - progress });
              gsap.set(imgContainer, { borderRadius: 150 - progress * 125 + "px" });
            }
          });
        }
      }
    });

    // Cleanup triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Merged global CSS from scrollPageStyles.css
  return (
    <>
      <style jsx global>{`
        .ek, .doo, .tin, .char, .panch {
          border-radius: 32px;
          overflow: hidden;
        }
         section {
          position: relative;
          background-color: inherit;
        }

        .intro {
          height: 100vh;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        } 
      
        .cards {
          min-height: 100vh;
          padding: 0;
          margin: 0;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .card {
          width: 90%;
          margin: 0 auto 2vh auto;
          height: 90%;
          border-radius: 32px;
          box-shadow: 0 10px 32px 0 rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          will-change: transform, opacity;
          transition: box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: inherit;
        }
        .card-img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 150px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
          border-radius: inherit;
          display: block;
        }
        .card-img {
          margin: 0 auto 24px auto;
          will-change: border-radius;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-img {
          width: 100%;
          height: 95%;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }
        .card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
          border-radius: inherit;
        }
      `}</style>

    <div className="cards" style={{ minHeight: '100vh', padding: 0, margin: 0, background: 'rgb(14, 2, 42)' }}>

  <div className="card ek" style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 32, margin: '2vh auto', background: 'transparent', boxShadow: 'none' }}>
    <div className="card-wrapper" style={{ background: 'rgb(14, 2, 42)', borderRadius: 32 }}>
      <div className="card-content">
        <div className="card-title"><h1>Curved Horizon</h1></div>
        <div className="card-description"><p>A futuristic residence that plays with curvature and flow, blending bold geometry with natural topography.</p></div>
      </div>
      <div className="card-img">
        <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Card 1" width={400} height={300} />
      </div>
    </div>
  </div>
  <div className="card doo" style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 32, margin: '2vh auto', background: 'transparent', boxShadow: 'none' }}>
    <div className="card-wrapper" style={{ background: 'rgb(14, 2, 42)', borderRadius: 32 }}>
      <div className="card-content">
        <div className="card-title"><h1>Indigo Vista</h1></div>
        <div className="card-description"><p>Modern living space inspired by the night sky, with deep indigo tones and serene lines for relaxation.</p></div>
      </div>
      <div className="card-img">
        <Image src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Card 2" width={400} height={300} />
      </div>
    </div>
  </div>
  <div className="card tin" style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 32, margin: '2vh auto', background: 'transparent', boxShadow: 'none' }}>
    <div className="card-wrapper" style={{ background: 'rgb(14, 2, 42)', borderRadius: 32 }}>
      <div className="card-content">
        <div className="card-title"><h1>Green Capsule</h1></div>
        <div className="card-description"><p>Eco-friendly design with lush green accents, merging indoor comfort and outdoor freshness seamlessly.</p></div>
      </div>
      <div className="card-img">
        <Image src="https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80" alt="Card 3" width={400} height={300} />
      </div>
    </div>
  </div>
  <div className="card char" style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 32, margin: '2vh auto', background: 'transparent', boxShadow: 'none' }}>
    <div className="card-wrapper" style={{ background: 'rgb(14, 2, 42)', borderRadius: 32 }}>
      <div className="card-content">
        <div className="card-title"><h1>Midnight Minimal</h1></div>
        <div className="card-description"><p>Minimalist black space for creative minds, where simplicity and contrast spark inspiration.</p></div>
      </div>
      <div className="card-img">
        <Image src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="Card 4" width={400} height={300} />
      </div>
    </div>
  </div>
    </div>

    </>
  );
}

