"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const innerCursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0;
    let y = 0;
    let mouseX = 0;
    let mouseY = 0;
    const speed = 0.15;

    let isHover = false;
    let isText = false;

    const mouseOverHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const hoverElement = target.closest("button, a, label, .cursor-pointer");
      if (hoverElement) {
        isHover = true;
      } else {
        isHover = false;
      }

      const textElement = target.closest("input, textarea");
      if (textElement) {
        isText = true;
      } else {
        isText = false;
      }
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mousemove", mouseOverHandler);

    const render = () => {
      x += (mouseX - x) * speed;
      y += (mouseY - y) * speed;

      if (innerCursorDotRef.current && innerCursorRef.current) {
        innerCursorDotRef.current.style.left = `${mouseX}px`;
        innerCursorDotRef.current.style.top = `${mouseY}px`;
        innerCursorRef.current.style.left = `${x}px`;
        innerCursorRef.current.style.top = `${y}px`;

        innerCursorDotRef.current.style.width = `12px`;
        innerCursorDotRef.current.style.height = `12px`;
        innerCursorRef.current.style.height = `30px`;
        innerCursorRef.current.style.width = `30px`;

        innerCursorDotRef.current.style.borderRadius = `50%`;
        innerCursorRef.current.style.borderRadius = `50%`;
        if (isHover) {
          innerCursorDotRef.current.style.width = `24px`;
          innerCursorDotRef.current.style.height = `24px`;

          innerCursorRef.current.style.height = `48px`;
          innerCursorRef.current.style.width = `48px`;
        } else if (isText) {
          innerCursorDotRef.current.style.width = `4px`;
          innerCursorDotRef.current.style.height = `30px`;
          innerCursorDotRef.current.style.borderRadius = `6px`;

          innerCursorRef.current.style.height = `60px`;
          innerCursorRef.current.style.borderRadius = `12px`;
        }

        requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mousemove", mouseOverHandler);
    };
  }, []);

  return (
    <div className="pointer-events-none">
      <div
        className="fixed z-[10000] -translate-x-2/4 -translate-y-2/4 border-2 border-accent bg-neutral-500/20 transition-[width,height,border-radius] duration-300"
        ref={innerCursorRef}
      />
      <div
        className="fixed z-[10000] -translate-x-2/4 -translate-y-2/4 bg-active transition-[width,height,border-radius] duration-300"
        ref={innerCursorDotRef}
      />
    </div>
  );
}
