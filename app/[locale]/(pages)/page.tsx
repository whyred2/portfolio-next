"use client";

import React from "react";
import gsap from "gsap";
import { skillsConfig } from "@/config/skills";

import { Intro } from "@/components/home-intro";
import { SendMail } from "@/components/home-send-email";
import { SkillsList } from "@/components/home-skills";
import Loading from "@/components/loader";

import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) {
        const timer = setTimeout(() => {
          gsap.to(loader, {
            y: "-100%",
            ease: "power4.out",
            duration: 1,
          });
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-2 bg-active origin-[0%] z-50"
        style={{ scaleX }}
      />
      <div id="globalLoader" className="fixed inset-0 z-50 bg-inherit">
        <Loading />
      </div>
      <div className="main">
        <Intro />
        <div className="border-black/30 dark:border-white/30 border-t" />
        <SkillsList items={skillsConfig.skills} />
        <div className="border-black/30 dark:border-white/30 border-t" />
        <SendMail />
      </div>
    </>
  );
}
