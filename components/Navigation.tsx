"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Trigger pulse animation on mount
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide/reveal logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Background fade logic
      setScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/request", label: "Request" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'border-tech-cyan/20 bg-midnight-900/95 backdrop-blur-xl shadow-lg shadow-tech-cyan/5 dark:border-tech-cyan/20 dark:bg-midnight-900/95 light:border-tech-cyan/30 light:bg-white/95'
          : 'border-white/5 bg-midnight-900/40 backdrop-blur-md dark:border-white/5 dark:bg-midnight-900/40 light:border-tech-cyan/10 light:bg-white/60'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform hover:scale-105"
          >
            <Logo size="sm" animated />
            <span className="font-display text-2xl uppercase tracking-[0.5em] text-tech-cyan transition-all duration-300 group-hover:text-cyan-glow group-hover:drop-shadow-[0_0_12px_rgba(29,233,182,0.8)]">
              AA&apos;s
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative py-2"
                >
                  <span className={`font-medium uppercase tracking-[0.35em] transition-all duration-300 ${
                    isActive
                      ? "text-tech-cyan drop-shadow-[0_0_8px_rgba(0,188,212,0.8)]"
                      : "text-slate-400 hover:text-tech-cyan hover:drop-shadow-[0_0_8px_rgba(0,188,212,0.6)] dark:text-slate-400 dark:hover:text-tech-cyan light:text-slate-600 light:hover:text-tech-cyan"
                  }`}>
                    {link.label}
                  </span>
                  {isActive ? (
                    <motion.span 
                      layoutId="navbar-indicator"
                      className={`absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-tech-cyan via-cyan-glow to-tech-cyan rounded-full shadow-[0_0_12px_rgba(0,188,212,0.8)] ${
                        !hasAnimated ? 'animate-pulse-once' : ''
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-gradient-to-r from-tech-cyan to-cyan-glow rounded-full shadow-[0_0_12px_rgba(0,188,212,0.8)] transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="relative rounded-lg border border-white/10 p-2 text-slate-300 transition-all duration-300 hover:border-tech-cyan/60 hover:text-tech-cyan hover:shadow-[0_0_15px_rgba(0,188,212,0.4)] dark:border-white/10 dark:hover:border-tech-cyan/60 light:border-tech-cyan/20 light:hover:border-tech-cyan/80"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden border-t border-white/10 dark:border-white/10 light:border-tech-cyan/20"
            >
              <div className="space-y-2 py-4">
                {links.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={`block rounded-lg px-3 py-3 font-medium uppercase tracking-[0.3em] transition-all duration-300 ${
                          isActive
                            ? "bg-tech-cyan/15 text-tech-cyan shadow-[0_0_15px_rgba(0,188,212,0.3)] border border-tech-cyan/30"
                            : "text-slate-400 hover:bg-tech-cyan/10 hover:text-tech-cyan hover:shadow-[0_0_10px_rgba(0,188,212,0.2)] dark:text-slate-400 dark:hover:bg-tech-cyan/10 dark:hover:text-tech-cyan light:text-slate-600 light:hover:bg-tech-cyan/10 light:hover:text-tech-cyan"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
