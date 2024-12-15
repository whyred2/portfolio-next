"use client";
import React from "react";
import gsap from "gsap";
import { skillsConfig } from "@/config/skills";

import { Intro } from "@/components/home-intro";
import { SendMail } from "@/components/home-send-email";
import { SkillsList } from "@/components/home-skills";
import Loading from "@/components/loader";

export default function Home() {
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
