"use client";

import React from "react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import SplitText from "gsap/SplitText";

export default function SplitPage() {

  useEffect(() => {
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".8, 0, .3, 1");

      const splitTextElements = (
        selector,
        type = "words,chars",
        addFirstChar = false
      ) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          const splitText = new SplitText(element, {
            type,
            wordsClass: "word",
            charsClass: "char",
          });
          if (type.includes("chars")) {
            splitText.chars.forEach((char, index) => {
              const originalText = char.textContent;
              char.innerHTML = `<span>${originalText}</span>`;
              if (addFirstChar && index === 0) {
                char.classList.add("first-char");
              }
            });
          }
        });
      };
      splitTextElements(".intro-title h1", "words,chars", true);
      splitTextElements(".outro-title h1");
      splitTextElements(".tag p", "words");
      splitTextElements(".card h1", "words, chars", true);
  
      const isMobile = window.innerWidth < 1000;
  
      gsap.set(
        [
          ".split-overlay .intro-title .first-char span",
          ".split-overlay .outro-title .char span",
        ],
        {
          y: "0%",
        }
      );
  
      gsap.set(".split-overlay .intro-title .first-char", {
        x: isMobile ? "7.5rem" : "18rem",
        y: isMobile ? "-1rem" : "-2.75rem",
        fontWeight: "900",
        scale: 0.75,
      });
  
      gsap.set(".split-overlay .outro-title .char", {
        x: isMobile ? "-3rem" : "-8rem",
        fontSize: isMobile ? "6rem" : "14rem",
        fontWeight: "500",
      });
  
      const tl = gsap.timeline({ defaults: { ease: "hop" } });
      const tags = gsap.utils.toArray(".tag");
  
      tags.forEach((tag, index) => {
        tl.to(
          tag.querySelectorAll("p .word"),
          {
            y: "0%",
            duration: 0.75,
          },
          0.5 + index * 0.1
        );
      });
  
      tl.to(
        ".preloader .intro-title .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
        },
        0.5
      )
      .to(
        ".preloader .intro-title .char:not(.first-char) span",
        {
          y: "100%",
          duration: 0.75,
          stagger: 0.05,
        },
        2
      )
      .to(
        ".preloader .outro-title .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.075,
        },
        2.5
      )
      .to(
        ".preloader .intro-title .first-char",
        {
          x: isMobile ? "9rem" : "21.25rem",
          duration: 1,
        },
        3.5
      )
      .to(
        ".preloader .outro-title .char",
        {
          x: isMobile ? "-3rem" : "-8rem",
          duration: 1,
        },
        3.5
      ).to(
          ".preloader .intro-title .first-char",
           {
              x: isMobile ? "7.5rem" : "18rem",
              y: isMobile ? "-1rem" : "-2.75rem",
              fontWeight: "900",
              scale: 0.75,
              duration: 0.75,
          },
          4.5
      )
      .to(
          ".preloader .outro-title .char",
          {
              x: isMobile ? "-3rem" : "-8rem",
              fontSize: isMobile ? "6rem" : "14rem",
              fontWeight: "500",
              duration: 0.75,
              onComplete: () => {
                  gsap.set(".preloader", {
                      clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                  });
                  gsap.set(".split-overlay", {
                      clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                  });
              },
          },
          4.5
      )
      .to(
          ".container",
          {
              clipPath: "polygon(0 48%, 100% 48%, 100% 52%, 0 52%)",
              duration: 1,
          },
          5
      );
       
      tags.forEach((tag, index) => {
          tl.to(
              tag.querySelectorAll("p .word"),
              {
                  y: "100%",
                  duration: 0.75,
              },
              5.5 + index * 0.1
          )
      })
  
      tl.to(
          [".preloader", ".split-overlay"],
          {
              y: (i) => (i === 0 ? "-50%" : "50%"),
              duration: 1,
          },
          6
      ).to(
          ".container",
          {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
              duration: 1,
          },
          6
      )
    }
  , []);

  return (
    <>
     <style jsx>{`

       *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
       } 

        img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        }

        h1{
        text-transform: uppercase;
        font-size: 6rem;
        font-weight: 600;
        line-height: 1;
        }

       p{
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 600;
       } 

       .preloader, .split-overlay, .tags-overlay{
        position: fixed;
        width: 100vw;
        height: 100svh;
       }

       .preloader, .split-overlay {
        background-color: #000;
        color: #fff;
       }

       .preloader, .tags-overlay{
       z-index: 2;
     }

    .split-overlay{
      z-index: 1;
    }

    .intro-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
    }

    .outro-title {
      position: absolute;
      top: 50%;
      left: calc(50% + 10rem);
      transform: translate(-50%, -50%);
    }

    .tag {
      position: absolute;
      width: max-content;
      color: #5a5a5a;
      overflow: hidden;
    }

    .tag-1 {
      top: 15%;
      left: 15%;
    }
    .tag-2 {
      bottom: 15%;
      left: 25%;
    }
    .tag-3 {
      bottom: 30%;
      right: 15%;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      clip-path: polygon(0 48%, 0 48%, 0 52%, 0 52%);
      z-index: 2;
    }

    .container .hero-img {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    nav,
    footer {
      position: relative;
      width: 100vw;
      padding: 2em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      z-index: 2;
    }

    nav p#logo {
      font-weight: 600;
      font-size: 20px;
    }

    .card {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30%;
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      clip-path: polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%);
    }

    .card h1 {
      text-align: center;
      width: 100%;
      font-size: 3rem;
    }

    .card .char span {
      position: relative;
      display: inline-block;
      transform: translateY(100%);
      will-change: transform;
    }

    .intro-title .char,
    .outro-title .char,
    .card .char {
      position: relative;
      display: inline-block;
      overflow: hidden;
    }

    .intro-title .char,
    .outro-title .char {
      margin-top: 0.75rem;
    }

    .intro-title .char span,
    .outro-title .char span,
    .tag .word {
      position: relative;
      display: inline-block;
      transform: translateY(-100%);
      will-change: transform;
    }

    .intro-title .first-char{
     transform-origin: top left;
    }

    @media (max-width: 1000px) {
      h1 {
        font-size: 2.5rem;
      }
      .outro-title {
        left: calc(50% + 4rem);
      }
      .card {
        width: 75%;
      }
      .card h1 {
        font-size: 2.5rem;
      }
      .intro-title .char,
      .outro-title .char {
        margin-top: 0.5rem;
      }
    }

`}</style>

      <div className="preloader">
        <div className="intro-title">
          <h1>Nullspace Studio</h1>
        </div>
        <div className="outro-title">
          <h1>10</h1>
        </div>

      </div>

      <div className="split-overlay">
        <div className="intro-title">
          <h1>Nullspace Studio</h1>
        </div>
        <div className="outro-title">
          <h1>10</h1>
        </div>
      </div>
      <div className="tags-overlay">
        <div className="tag tag-1"><p>Negative Space</p></div>
        <div className="tag tag-2"><p>Form & Void</p></div>
        <div className="tag tag-3"><p>Light Studies</p></div>
      </div>
      
      <div className="container">
        <nav>
          <p id="logo">N10</p>
          <p>Menu</p>
        </nav>
        <div className="hero-img">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Hero" />
        </div>
        <div className="card">
          <h1>Nullspace</h1>
        </div>
        <footer>
          <p>Scroll Down</p>
          <p>Made by Codegrid</p>
        </footer>
      </div>
    </>
  );
}