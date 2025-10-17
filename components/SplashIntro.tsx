"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashIntro() {
  const [showSplash, setShowSplash] = useState(false);
  const [bootSequence, setBootSequence] = useState(0);

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem("splashShown");
    
    if (!splashShown) {
      setShowSplash(true);
      sessionStorage.setItem("splashShown", "true");

      // Boot sequence timing
      const timers = [
        setTimeout(() => setBootSequence(1), 300),
        setTimeout(() => setBootSequence(2), 900),
        setTimeout(() => setBootSequence(3), 1500),
        setTimeout(() => setBootSequence(4), 2100),
        setTimeout(() => setShowSplash(false), 4000),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-deep-dark"
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,188,212,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(0,188,212,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative z-10 text-center">
            {/* Boot Sequence Text */}
            <div className="mb-12 space-y-3 font-mono text-sm text-tech-cyan">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: bootSequence >= 1 ? 1 : 0, x: bootSequence >= 1 ? 0 : -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-cyan-glow">&gt;</span>
                <span>Initializing system...</span>
                {bootSequence >= 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-cyan-glow"
                  >
                    [OK]
                  </motion.span>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: bootSequence >= 2 ? 1 : 0, x: bootSequence >= 2 ? 0 : -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-cyan-glow">&gt;</span>
                <span>Loading AA&apos;s Computer Remote Services...</span>
                {bootSequence >= 2 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-cyan-glow"
                  >
                    [OK]
                  </motion.span>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: bootSequence >= 3 ? 1 : 0, x: bootSequence >= 3 ? 0 : -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-cyan-glow">&gt;</span>
                <span className="text-cyan-glow font-semibold">System Ready.</span>
              </motion.div>
            </div>

            {/* Logo Animation */}
            {bootSequence >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Glowing Logo */}
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: 0,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  {/* Circuit-style logo */}
                  <div className="relative mx-auto h-32 w-32">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-tech-cyan opacity-30 blur-md" />
                    
                    {/* Main logo circle */}
                    <div className="absolute inset-2 rounded-full border-2 border-tech-cyan bg-gradient-to-br from-tech-cyan/20 to-cyan-glow/20 backdrop-blur-sm">
                      {/* Inner circuit pattern */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="h-16 w-16 text-tech-cyan"
                          viewBox="0 0 64 64"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Circuit paths */}
                          <path
                            d="M32 8 L32 24 M32 40 L32 56 M8 32 L24 32 M40 32 L56 32"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                          <circle cx="32" cy="8" r="3" fill="currentColor" />
                          <circle cx="32" cy="56" r="3" fill="currentColor" />
                          <circle cx="8" cy="32" r="3" fill="currentColor" />
                          <circle cx="56" cy="32" r="3" fill="currentColor" />
                        </svg>
                      </div>
                    </div>

                    {/* Pulsing glow effect */}
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: 0,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full bg-tech-cyan/20 blur-xl"
                    />
                  </div>

                  {/* AA's text below logo */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-6 font-display text-3xl font-bold uppercase tracking-[0.3em] text-tech-cyan"
                  >
                    AA&apos;s
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
