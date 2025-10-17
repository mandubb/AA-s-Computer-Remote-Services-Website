"use client";

import { motion } from "framer-motion";

export default function AnimatedGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-tech-cyan/10 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-[10%] top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-glow/10 blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[50%] h-[450px] w-[450px] rounded-full bg-neon-blue/10 blur-[110px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
