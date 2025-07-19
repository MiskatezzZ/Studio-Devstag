"use client";
// import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
// import { setupMarqueeAnimation } from "../marquee"; // adjust relative if needed

export default function Capsules() {
  const container = useRef();
    useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const cards = gsap.utils.toArray(".card");
  const introCard = cards[0];

  const titles = gsap.utils.toArray(".card-title h1");
  titles.forEach((title) => {
    const split = new SplitText(title, {
      type: "chars",
      charsClass: "char",
      tag: "div",
    });
    split.chars.forEach((char) => {
      char.innerHTML = `<span>${char.textContent}</span>`;
    });
  });

  const cardImgWrapper = introCard.querySelector(".card-img");
  const cardImg = introCard.querySelector(".card-img img");
  gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
  gsap.set(cardImg, { scale: 1.5 });

  function animateContentIn(titleChars, description) {
    gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
    gsap.to(description, {
      x: 0,
      opacity: 1,
      duration: 0.75,
      delay: 0.1,
      ease: "power4.out",
    });
  }

  function animateContentOut(titleChars, description) {
    gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
    gsap.to(description, {
      x: "40px",
      opacity: 0,
      duration: 0.5,
      ease: "power4.out",
    });
  }

  const marquee = introCard.querySelector(".card-marquee .marquee");
  const titleChars = introCard.querySelectorAll(".char span");
  const description = introCard.querySelector(".card-description");

  ScrollTrigger.create({
    trigger: introCard,
    start: "top top",
    end: "+=300vh",
    onUpdate: (self) => {
      const progress = self.progress;
      const imgScale = 0.5 + progress * 0.5;
      const borderRadius = 400 - progress * 375;
      const innerImgScale = 1.5 - progress * 0.5;

      gsap.set(cardImgWrapper, {
        scale: imgScale,
        borderRadius: borderRadius + "px",
      });
      gsap.set(cardImg, { scale: innerImgScale });

      if (imgScale >= 0.5 && imgScale <= 0.75) {
        const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
        gsap.set(marquee, { opacity: 1 - fadeProgress });
      } else if (imgScale < 0.5) {
        gsap.set(marquee, { opacity: 1 });
      } else if (imgScale > 0.75) {
        gsap.set(marquee, { opacity: 0 });
      }

      if (progress >= 1 && !introCard.contentRevealed) {
        introCard.contentRevealed = true;
        animateContentIn(titleChars, description);
      }
      if (progress < 1 && introCard.contentRevealed) {
        introCard.contentRevealed = false;
        animateContentOut(titleChars, description);
      }
    },
  });

  cards.forEach((card, index) => {
    const isLastCard = index === cards.length - 1;
    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      end: isLastCard ? "+=100vh" : "top top",
      endTrigger: isLastCard ? null : cards[cards.length - 1],
      pin: true,
      pinSpacing: isLastCard,
    });
  });

  cards.forEach((card, index) => {
    if (index < cards.length - 1) {
      const cardWrapper = card.querySelector(".card-wrapper");
      ScrollTrigger.create({
        trigger: cards[index + 1],
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
  });

  cards.forEach((card, index) => {
    if (index > 0) {
      const cardImg = card.querySelector(".card-img img");
      const imgContainer = card.querySelector(".card-img");
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardImg, { scale: 2 - progress });
          gsap.set(imgContainer, { borderRadius: 150 - progress * 125 + "px" });
        },
      });
    }
  });

  cards.forEach((card, index) => {
    if (index === 0) return;

    const cardDescription = card.querySelector(".card-description");
    const cardTitleChars = card.querySelectorAll(".char span");

    ScrollTrigger.create({
      trigger: card,
      start: "top top",
      onEnter: () => animateContentIn(cardTitleChars, cardDescription),
      onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
    });
  });
    // setupMarqueeAnimation();

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, { scope: container });

  return (
    <>
      <div ref={container}>
      {/* Global styles */}
      <style jsx>{`
 @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", sans-serif;
}

img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

h1 {
  font-size: 5rem;
  font-weight: 500;
  letter-spacing: -0.1rem;
  line-height: 1.25;
}

p {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.25;
}

section {
  position: relative;
  width: 100vw;
  background-color: #0f0f0f;
  color: #fff;
}

.intro,
.outro {
  height: 100svh;
  padding: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro h1,
.outro h1 {
  width: 60%;
  text-align: center;
  line-height: 1.1;
}

.cards {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 25svh;
}

.card-marquee {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  overflow: hidden;
}

.card-marquee .marquee {
  display: flex;
}

.card-marquee .marquee h1 {
  white-space: nowrap;
  font-size: 10vw;
  font-weight: 600;
  margin-right: 30px;
}

.card {
  position: relative;
  width: 100vw;
  height: 100svh;
  padding: 1.5em;
}

.card-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.card-img {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 150px;
  overflow: hidden;
}

.card-img img {
  transform: scale(2);
}

.card-content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1;
}

.card-content .card-title {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.card-content .card-description {
  text-align: center;
  width: 40%;
  margin-bottom: 3em;
  position: relative;
  transform: translateX(40px);
  opacity: 0;
}

.card:nth-child(2) {
  margin-top: 50vh;
}

.char {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.char span {
  transform: translateX(100%);
  display: inline-block;
  will-change: transform;
}

@media (max-width: 900px) {
  h1 {
    font-size: 2rem;
    letter-spacing: 0;
  }

  .intro h1,
  .outro h1 {
    width: 100%;
  }

  .card-content .card-description {
    width: 90%;
  }
}

      `}</style>

      {/* Sections */}
      <section className="intro">
      <h1>We design spaces that don’t just exist.</h1>
    </section>
    <section className="cards">
      <div className="card">
        <div className="card-marquee">
          <div className="marquee">
            <h1>Design Beyond Boundaries</h1>
            <h1>Built for Tomorrow</h1>
            <h1>Real Impact</h1>
            <h1>Digital Visions</h1>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card-content">
            <div className="card-title">
              <h1>Curved Horizon</h1>
            </div>
            <div className="card-description">
              <p>
                A futuristic residence that plays with curvature and flow,
                blending bold geometry with natural topography.
              </p>
            </div>
          </div>
          <div className="card-img">
            <img src="/card-img-1.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-wrapper">
          <div className="card-content">
            <div className="card-title">
              <h1>Glass Haven</h1>
            </div>
            <div className="card-description">
              <p>
                A sleek pavilion of pure transparency, openness and light,
                designed to dissolve into its environment.
              </p>
            </div>
          </div>
          <div className="card-img">
            <img src="/card-img-2.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-wrapper">
          <div className="card-content">
            <div className="card-title">
              <h1>Moss Cube</h1>
            </div>
            <div className="card-description">
              <p>
                A minimalist cube home crowned with a living moss dome, merging
                micro-architecture with ecological design.
              </p>
            </div>
          </div>
          <div className="card-img">
            <img src="/card-img-3.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-wrapper">
          <div className="card-content">
            <div className="card-title">
              <h1>Floating Shelter</h1>
            </div>
            <div className="card-description">
              <p>
                This design explores an ethereal structure perched on a grassy
                islet, seemingly hovering above water.
              </p>
            </div>
          </div>
          <div className="card-img">
            <img src="/card-img-4.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
    <section className="outro">
      <h1>Architecture reimagined for the virtual age.</h1>
    </section>
      </div>
    </>
  );
}





