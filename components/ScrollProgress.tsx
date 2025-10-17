"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScroll = documentHeight - windowHeight;
      const progress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      
      setScrollProgress(progress);
      setIsComplete(progress >= 99);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1">
      <motion.div
        className={`h-full bg-gradient-to-r from-tech-cyan via-cyan-glow to-tech-cyan transition-shadow duration-300 ${
          isComplete 
            ? 'shadow-[0_0_20px_rgba(0,188,212,1),0_0_40px_rgba(29,233,182,0.8)] animate-pulse-glow' 
            : 'shadow-[0_0_15px_rgba(0,188,212,0.8),0_0_30px_rgba(29,233,182,0.6)]'
        }`}
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  );
}
