import React from "react";
import { motion } from "framer-motion";

export default function PageTransition() {
  return (
    <motion.div
      initial={{ left: "100%" }}
      animate={{ left: "0%" }}
      exit={{ left: "-100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#8662f3",
        zIndex: 10000,
      }}
    />
  );
}
