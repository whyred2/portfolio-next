"use client";

import React, { useContext, useEffect, useState } from "react";
import { TransitionContext } from "@/contexts/transition-context";
import PageTransition from "@/components/page-transition";
import { AnimatePresence } from "framer-motion";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isTransitioning } = useContext(TransitionContext);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setDisplayChildren(children);
  }, [children]);

  return (
    <>
      {displayChildren}
      <AnimatePresence>{isTransitioning && <PageTransition />}</AnimatePresence>
    </>
  );
}
