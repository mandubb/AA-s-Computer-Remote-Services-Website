"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-tech-cyan/30 bg-midnight-800/50 backdrop-blur-sm transition-all hover:border-tech-cyan/60 hover:bg-midnight-700/50 dark:border-tech-cyan/30 dark:bg-midnight-800/50 dark:hover:border-tech-cyan/60 dark:hover:bg-midnight-700/50 light:border-tech-cyan/40 light:bg-white/80 light:hover:border-tech-cyan/70"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-tech-cyan" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -180,
          scale: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-tech-cyan" />
      </motion.div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-tech-cyan/0 blur-md transition-all group-hover:bg-tech-cyan/20" />
    </motion.button>
  );
}
