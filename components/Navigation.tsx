"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-midnight-900/70 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl uppercase tracking-[0.5em] text-neon-cyan transition-colors hover:text-neon-magenta"
          >
            AA&apos;s
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium uppercase tracking-[0.35em] transition-colors ${
                  pathname === link.href
                    ? "text-neon-cyan"
                    : "text-slate-400 hover:text-neon-cyan"
                }`}
              >
                <span>{link.label}</span>
                {pathname === link.href && (
                  <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan md:hidden"
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden space-y-2 border-t border-white/10 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2 font-medium uppercase tracking-[0.3em] transition-colors ${
                  pathname === link.href
                    ? "bg-neon-cyan/10 text-neon-cyan"
                    : "text-slate-400 hover:bg-neon-cyan/10 hover:text-neon-cyan"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
