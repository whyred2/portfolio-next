"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

import { SkillsItem } from "@/types";

import { Icons } from "@/components/icons";
import { Card, CardDescription, CardTitle } from "./ui/card";

gsap.registerPlugin(ScrollTrigger, Draggable);

interface SkillsListProps {
  items?: SkillsItem[];
}

export function SkillsList({ items }: SkillsListProps) {
  useGSAP(() => {
    const track = document.querySelector(".card-track") as HTMLElement;
    const skillsScroll = document.querySelector(
      ".skills-scroll"
    ) as HTMLElement;
    const skillsTitle = document.querySelector(".skills-title") as HTMLElement;
    const skillsSubtitle = document.querySelector(
      ".skills-subtitle"
    ) as HTMLElement;
    const trackWidth = track.scrollWidth + window.innerWidth;

    const cardItemHeigth =
      document.querySelector(".card-item")?.clientHeight || 200;
    const pageHeigth = document.documentElement.clientHeight;

    console.log(pageHeigth, cardItemHeigth);

    gsap.to(track, {
      x: -trackWidth,
      ease: "none",
      scrollTrigger: {
        trigger: ".skills-trigger",
        start: "top top",
        end: `+=1500`,
        scrub: 1.5,
        pin: true,
      },
    });

    gsap.to(skillsScroll, {
      scrollTrigger: {
        trigger: ".skills-trigger",
      },
      ease: "none",
      y: "-450%",
    });

    gsap.to(skillsTitle, {
      x: () => window.innerWidth * 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: ".skills-trigger",
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    gsap.to(skillsSubtitle, {
      x: () => -window.innerWidth * 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".skills-trigger",
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    gsap.to(skillsScroll, {
      x: () => window.innerWidth * 0.5,
      ease: "power4",
      scrollTrigger: {
        trigger: ".skills-trigger",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });
  });

  return (
    <section className="skills-trigger flex h-screen overflow-hidden">
      <div className="pt-[14.375rem] pb-[7.5rem] min-w-full">
        <div className="container flex flex-col items-start justify-between h-full mx-auto px-[max(1.5rem,min(6.73139vw-.0776699rem,8rem))]">
          <div>
            <div className="skills-title text-4xl text-white w-fit p-5 bg-accent rounded-lg">
              Мои навыки, которые я освоил.
            </div>
            <div className="skills-subtitle text-3xl text-white w-fit p-5 bg-active rounded-lg">
              Разметка веб-страниц и работа с семантическими тегами и не только.
            </div>
          </div>
          <div className="flex items-center gap-3 bg-secondary px-5 py-3 rounded-full text-xl">
            Листай дальше <Icons.arrowRight />
          </div>
        </div>
      </div>

      <div className="card-track flex gap-5 items-center h-full">
        {items?.length ? (
          <>
            {items?.map((item, index) => (
              <Card key={index} className="card-item">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </Card>
            ))}
          </>
        ) : null}
      </div>
    </section>
  );
}
