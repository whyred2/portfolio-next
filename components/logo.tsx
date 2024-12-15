"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  useGSAP(() => {
    const cls1 = ".cls-1";
    const cls2 = ".cls-2";

    if (document.querySelector(cls1) && document.querySelector(cls2)) {
      gsap.fromTo(
        cls1,
        {
          stroke: "#6b3ee0",
          strokeDasharray: 600,
          strokeDashoffset: 600,
        },
        {
          stroke: "#6b3ee0",
          fill: "#8662f3",
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.1,
          ease: "power1.inOut",
        }
      );
      gsap.fromTo(
        cls2,
        {
          stroke: "#6b3ee0",
          strokeDasharray: 200,
          strokeDashoffset: 200,
        },
        {
          stroke: "#6b3ee0",
          fill: "#8662f3",
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power1.inOut",
        }
      );
    }
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 118 102"
      className={className}
    >
      <g
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polygon
          className="cls-1"
          points="69 1 69 101 1 101 1 1 21 1 21 81 25 81 25 41 45 41 45 81 49 81 49 1 69 1"
        />
        <polygon
          className="cls-2"
          points="117 1 117 41 97 41 97 21 77 21 77 1 117 1"
        />
        <rect className="cls-2" x="97" y="61" width="20" height="40" />
        <rect className="cls-2" x="77" y="41" width="20" height="20" />
      </g>
    </svg>
  );
}
