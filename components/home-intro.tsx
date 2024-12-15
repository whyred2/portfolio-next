import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";

import { Icons } from "@/components/icons";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function Intro() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".intro_root",
      },
    });

    tl.from(".intro_title", {
      opacity: 0,
      y: -50,
      duration: 1,
      delay: 0.2,
    })
      .from(
        ".intro_subtitle",
        {
          opacity: 0,
          y: -30,
          duration: 1,
        },
        "-=0.8"
      )
      .from(
        ".intro_button",
        {
          opacity: 0,
          duration: 0.5,
        },
        "-=0.5"
      );
  });

  useGSAP(() => {
    gsap.to("[data-speed]", {
      y: (i, el) =>
        -(
          (1 - parseFloat(el.getAttribute("data-speed"))) *
          ScrollTrigger.maxScroll(window)
        ),
      ease: "none",
      scrollTrigger: {
        trigger: ".intro_root",
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0.5,
      },
    });

    gsap.to(".asterisk", {
      y: -window.innerHeight * 0.5,
      rotation: 360,
      duration: 5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".intro_root",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(".square", {
      y: -window.innerHeight * 0.5,
      rotation: -360,
      duration: 5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".intro_root",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  function scrollToMail() {
    gsap.to(window, { duration: 2, scrollTo: { y: "max", autoKill: true } });
  }

  return (
    <div className="relative intro_root h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-5 text-center mt-[64px]">
      <div className="absolute inset-0 m-5 rounded-lg backdrop-blur-xl shadow-lg border-border" />
      <div className="absolute bg-gradient animate-gradient gradiend -z-[10] inset-[30px] w-[calc(100%-60px)] h-[calc(100%-60px)] rounded-2xl bg-[length:1000%_1000%]" />
      <Icons.asterisk className="asterisk absolute left-[200px] top-[200px] w-[300px] h-[300px] text-active rotate-45" />
      <Icons.square className="square absolute right-[300px] bottom-[200px] w-[200px] h-[200px] text-success fill-current rotate-12" />
      <h1
        className="intro_title text-4xl text-white md:text-6xl font-bold text-primary"
        data-speed="0.2"
      >
        React Frontend Developer
      </h1>
      <p
        className="intro_subtitle text-lg md:text-2xl text-white bg-info p-4 rounded-lg"
        data-speed="0.7"
      >
        Создаю удобные и современные интерфейсы.
      </p>
      <div className="intro_button flex gap-4 mt-5" data-speed="0.8">
        <button className={cn(buttonVariants({ variant: "default" }))}>
          Обо мне
        </button>
        <button
          className={cn(buttonVariants({ variant: "secondary" }), "text-white")}
          onClick={scrollToMail}
        >
          Связаться
        </button>
      </div>
    </div>
  );
}
