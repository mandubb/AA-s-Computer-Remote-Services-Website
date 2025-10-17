"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/request", label: "Request" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-midnight-900/70 backdrop-blur-md transition-colors dark:border-white/5 dark:bg-midnight-900/70 light:border-tech-cyan/10 light:bg-white/80">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform hover:scale-105"
          >
            <Logo size="sm" animated />
            <span className="font-display text-2xl uppercase tracking-[0.5em] text-tech-cyan transition-colors hover:text-cyan-glow">
              AA&apos;s
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative"
              >
                <span className={`font-medium uppercase tracking-[0.35em] transition-all ${
                  pathname === link.href
                    ? "text-tech-cyan"
                    : "text-slate-400 hover:text-tech-cyan dark:text-slate-400 dark:hover:text-tech-cyan light:text-slate-600 light:hover:text-tech-cyan"
                }`}>
                  {link.label}
                </span>
                {pathname === link.href ? (
                  <motion.span 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-3 left-0 right-0 h-[2px] bg-gradient-to-r from-tech-cyan via-cyan-glow to-tech-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute -bottom-3 left-0 h-[2px] w-0 bg-gradient-to-r from-tech-cyan to-cyan-glow transition-all group-hover:w-full" />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              className="rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:border-tech-cyan/40 hover:text-tech-cyan dark:border-white/10 dark:hover:border-tech-cyan/40 light:border-tech-cyan/20 light:hover:border-tech-cyan/60"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden space-y-2 border-t border-white/10 py-4 dark:border-white/10 light:border-tech-cyan/20"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2 font-medium uppercase tracking-[0.3em] transition-colors ${
                  pathname === link.href
                    ? "bg-tech-cyan/10 text-tech-cyan"
                    : "text-slate-400 hover:bg-tech-cyan/10 hover:text-tech-cyan dark:text-slate-400 dark:hover:bg-tech-cyan/10 dark:hover:text-tech-cyan light:text-slate-600 light:hover:bg-tech-cyan/10 light:hover:text-tech-cyan"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
