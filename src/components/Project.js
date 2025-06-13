import React from "react";

import { useEffect } from "react";
import gsap from "gsap";

const Project = () => {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    const projects = [
      {
        selector: ".project.outer-1",
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        selector: ".project.outer-2",
        img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
      },
      {
        selector: ".project.outer-3",
        img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=600&q=80"
      },
      {
        selector: ".project.outer-4",
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
      }
    ];

    // Move cursor
    function moveCircle(e) {
      gsap.to(cursor, {
        duration: 0.5,
        left: e.pageX,
        top: e.pageY,
        delay: 0.03,
        ease: "power2.out",
      });
    }
    window.addEventListener("mousemove", moveCircle);

    // Project hover image logic
    projects.forEach(({ selector, img }) => {
      const el = document.querySelector(selector);
      if (el) {
        el.addEventListener("mouseenter", () => {
          cursor.style.backgroundImage = `url('${img}')`;
        });
        el.addEventListener("mouseleave", () => {
          cursor.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80')";
        });
      }
    });

    // Overlay hover logic
    let flag = false;
    const overlays = document.querySelectorAll('.project-overlay');
    overlays.forEach(overlay => {
      overlay.addEventListener('mouseenter', () => {
        flag = true;
        gsap.to(cursor, { scale: 1, autoAlpha: 1, duration: 0.3 });
        overlay.addEventListener('mousemove', moveCircle);
      });
      overlay.addEventListener('mouseleave', () => {
        flag = false;
        gsap.to(cursor, { scale: 0.1, autoAlpha: 0, duration: 0.3 });
        overlay.removeEventListener('mousemove', moveCircle);
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCircle);
      projects.forEach(({ selector }) => {
        const el = document.querySelector(selector);
        if (el) {
          el.removeEventListener("mouseenter", () => {});
          el.removeEventListener("mouseleave", () => {});
        }
      });
      overlays.forEach(overlay => {
        overlay.removeEventListener('mouseenter', () => {});
        overlay.removeEventListener('mouseleave', () => {});
        overlay.removeEventListener('mousemove', moveCircle);
      });
    };
  }, []);

  return (
    <>
    <div className="custom-style-div">
      <style>{`
        .project-title h1 {
          font-weight: 300;
        }
        .project-categ {
          font-weight: lighter;
        }
        .cursor {
          position: absolute;
          width: 600px;
          height: 400px;
          top: 50%;
          left: 50%;
          transform: scale(0.1);
          opacity: 0;
          margin: -100px 0 0 -100px;
          background: url(image-1.jpg) no-repeat 50% 50%;
          background-size: cover;
          z-index: 1;
        }
        .wrapper {
          width: 80%;
          margin: 180px auto;
          height: 100%;
        }
        .project {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          flex-basis: 1;
          z-index: 2;
          color: white;
          mix-blend-mode: difference;
        }
        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
      `}</style>
    </div>
    <div className="cursor"></div>
    <div className="wrapper">
        <div className="projects-list">
    <div className="project outer-1">
      <h1 className="project-title">Project Title 1</h1>
        <div className="project-category">Project Category 1</div>
        <div className="project-overlay">Project Overlay 1</div>
      
    </div>
    <div className="project outer-2">
      <h1 className="project-title">Project Title 2</h1>
        <div className="project-category">Project Category 2</div>
        <div className="project-overlay">Project Overlay 2</div>
      
    </div>
    <div className="project outer-3">
      <h1 className="project-title">Project Title 3</h1>
        <div className="project-category">Project Category 3</div>
        <div className="project-overlay">Project Overlay 3</div>
      
    </div>
    <div className="project outer-4">
      <h1 className="project-title">Project Title 4</h1>
        <div className="project-category">Project Category 4</div>
        <div className="project-overlay">Project Overlay 4</div>
      
    </div>
    </div>
    </div>
    </>
  );
};

export default Project;
