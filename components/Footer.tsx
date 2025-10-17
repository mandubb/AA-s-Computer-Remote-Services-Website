"use client";

import { Facebook, MessageCircle, Mail } from "lucide-react";
import Logo from "./Logo";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com",
      color: "hover:text-blue-400",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/",
      color: "hover:text-green-400",
    },
  ];

  return (
    <footer className="relative mt-24 border-t border-white/5 bg-midnight-900/80 py-12 backdrop-blur-md dark:border-white/5 dark:bg-midnight-900/80 light:border-tech-cyan/10 light:bg-light-surface/80">
      {/* Glowing cyan separator line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-cyan/50 to-transparent" />
      
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/50 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 flex items-center gap-3">
              <Logo size="md" animated />
              <div>
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-tech-cyan">
                  AA&apos;s
                </h3>
                <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                  Computer Remote Services
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
              Professional remote computer support, software installation, and troubleshooting services.
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center">
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-tech-cyan">
              Contact Us
            </h4>
            <a
              href="mailto:aacomputerremoteservices@gmail.com"
              className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-tech-cyan dark:text-slate-400 dark:hover:text-tech-cyan light:text-slate-600 light:hover:text-tech-cyan"
            >
              <Mail className="h-4 w-4" />
              <span className="relative">
                aacomputerremoteservices@gmail.com
                <span className="absolute bottom-0 left-0 h-px w-0 bg-tech-cyan transition-all group-hover:w-full" />
              </span>
            </a>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-tech-cyan">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-tech-cyan/30 bg-midnight-800/50 text-slate-400 backdrop-blur-sm transition-all hover:border-tech-cyan/60 hover:bg-midnight-700/50 ${social.color} dark:border-tech-cyan/30 dark:bg-midnight-800/50 dark:hover:border-tech-cyan/60 dark:hover:bg-midnight-700/50 light:border-tech-cyan/40 light:bg-white/80 light:hover:border-tech-cyan/70`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500 light:text-slate-600">
            <a href="#" className="transition-colors hover:text-tech-cyan">
              Privacy
            </a>
            <span className="text-slate-700">•</span>
            <a href="#" className="transition-colors hover:text-tech-cyan">
              Terms
            </a>
            <span className="text-slate-700">•</span>
            <a href="#" className="transition-colors hover:text-tech-cyan">
              Support
            </a>
          </div>
          <p className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-600 light:text-slate-500">
            © {new Date().getFullYear()} AA&apos;s Remote Services. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
