"use client";

import React, { createContext, useState } from "react";

interface TransitionContextProps {
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
}

export const TransitionContext = createContext<TransitionContextProps>({
  isTransitioning: false,
  startTransition: () => {},
});

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (callback: () => void) => {
    setIsTransitioning(true);

    setTimeout(() => {
      callback();
    }, 300);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};
