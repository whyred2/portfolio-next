"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { ArrowDown } from "lucide-react";

interface CommentSectionProps {
  id: string;
  title: string;
  subtitle: string;
  className?: string;
  children?: ReactNode;
  headerHeight: number;
  sectionSpacing: number;
  totalSections: number;
  isOpen: boolean;
  isAnimating: boolean;
  onToggle: (id: string, type: string) => void;
}

export function CommentSection({
  id,
  title,
  subtitle,
  className,
  children,
  headerHeight,
  sectionSpacing,
  totalSections,
  isOpen,
  isAnimating,
  onToggle,
}: CommentSectionProps) {
  const SCREEN_HEIGHT =
    typeof window !== "undefined" ? window.innerHeight : 800;
  const collapsedHeight =
    (SCREEN_HEIGHT - headerHeight - sectionSpacing * totalSections) /
    totalSections;
  const expandedHeight = SCREEN_HEIGHT - headerHeight - sectionSpacing;

  const topPosition = isOpen
    ? headerHeight
    : headerHeight + collapsedHeight * Number(id) + sectionSpacing * Number(id);

  const type = title.toLowerCase();

  return (
    <motion.div
      className={cn(
        " absolute left-5 right-5 text-white rounded-lg p-5 overflow-hidden bg-opacity-85 backdrop-filter backdrop-blur-lg flex flex-col items-center gap-5",
        className
      )}
      layout
      layoutId={id}
      style={{
        zIndex: isOpen || isAnimating ? 50 : 1,
      }}
      initial={{ height: "300px" }}
      animate={{
        top: topPosition,
        height: isOpen ? expandedHeight : collapsedHeight,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="flex flex-col gap-1 self-start">
        <h2 className="text-4xl">{title}</h2>
        <p className="text-2xl opacity-80">{subtitle}</p>
      </div>
      <button
        className={cn(
          "absolute top-5 bottom-5 right-5 flex items-center gap-2 bg-neutral-200/20 px-5 py-2 border-2 border-neutral-200/20 rounded-lg select-none",
          "hover:bg-neutral-200/40 active:bg-active active:border-active active:transition-none transition-all duration-300"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id, type);
        }}
      >
        <ArrowDown
          className={cn(
            isOpen ? "rotate-180" : "rotate-0",
            "h-10 w-10 duration-700"
          )}
        />
      </button>

      <motion.div
        className={cn("flex flex-col gap-3 items-center h-full")}
        initial={{ opacity: 0, y: 500 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 500,
        }}
        transition={{
          opacity: { duration: 1.2, ease: "easeInOut" },
          y: { duration: 1, ease: "easeInOut" },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
