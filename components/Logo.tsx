"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export default function Logo({ size = "md", animated = false }: LogoProps) {
  const sizes = {
    sm: { container: "h-8 w-8", svg: "h-4 w-4" },
    md: { container: "h-12 w-12", svg: "h-6 w-6" },
    lg: { container: "h-16 w-16", svg: "h-8 w-8" },
  };

  const LogoSVG = (
    <svg
      className={sizes[size].svg}
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
  );

  if (animated) {
    return (
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* Outer glow ring */}
        <div className={`absolute inset-0 rounded-full border border-tech-cyan/30 blur-sm ${sizes[size].container}`} />
        
        {/* Main logo circle */}
        <div className={`relative rounded-full border border-tech-cyan bg-gradient-to-br from-tech-cyan/10 to-cyan-glow/10 backdrop-blur-sm ${sizes[size].container}`}>
          {/* Inner circuit pattern */}
          <div className="absolute inset-0 flex items-center justify-center text-tech-cyan">
            {LogoSVG}
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-tech-cyan/0 blur-md ${sizes[size].container}`}
          whileHover={{ backgroundColor: "rgba(0, 188, 212, 0.2)" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Outer glow ring */}
      <div className={`absolute inset-0 rounded-full border border-tech-cyan/30 blur-sm ${sizes[size].container}`} />
      
      {/* Main logo circle */}
      <div className={`relative rounded-full border border-tech-cyan bg-gradient-to-br from-tech-cyan/10 to-cyan-glow/10 backdrop-blur-sm ${sizes[size].container}`}>
        {/* Inner circuit pattern */}
        <div className="absolute inset-0 flex items-center justify-center text-tech-cyan">
          {LogoSVG}
        </div>
      </div>
    </div>
  );
}
