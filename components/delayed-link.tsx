"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { TransitionContext } from "@/contexts/transition-context";

interface DelayedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function DelayedLink({
  href,
  children,
  className,
}: DelayedLinkProps) {
  const router = useRouter();
  const { startTransition } = useContext(TransitionContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
