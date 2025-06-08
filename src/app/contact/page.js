"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

function StickyScrollInline({ content }) {
  const [activeCard, setActiveCard] = React.useState(0);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });
  const backgroundColors = ["#0f172a", "#000000", "#171717"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];
  const [backgroundGradient, setBackgroundGradient] = React.useState(linearGradients[0]);
  React.useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex w-full min-h-[60vh] justify-center items-center"
    >
      <div className="flex items-center w-full justify-center">
        <div className="w-full flex flex-col items-center">
          {content.map((item, index) =>
            activeCard === index && (
              <div
                key={item.title + index}
                className="w-full flex flex-col items-center justify-center min-h-[40vh] md:min-h-[60vh]"
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-kg text-slate-300 mt-4"
                >
                  {item.description}
                </motion.p>
              </div>
            )
          )}
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className="sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block"
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const content = [
    { title: "Sticky Card 1", description: "This is the first sticky card." },
    { title: "Sticky Card 2", description: "This is the second sticky card." },
    { title: "Sticky Card 3", description: "This is the third sticky card." },
  ];
  return (
    <div className="min-h-[200vh] bg-[#0A0F2C]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          Contact Us
        </h1>
        <StickyScrollInline content={content} />
      </div>
    </div>
  );
}