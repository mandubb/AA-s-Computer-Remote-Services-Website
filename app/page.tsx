"use client";

import Link from "next/link";
import { Package, Zap, Shield, ArrowRight } from "lucide-react";
import SocialButtons from "@/components/SocialButtons";
import ParticleNetwork from "@/components/ParticleNetwork";
import CircuitGrid from "@/components/CircuitGrid";
import AnimatedGradient from "@/components/AnimatedGradient";
import ScrollReveal from "@/components/ScrollReveal";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Package,
      title: "Software & Games",
      description: "Browse hundreds of curated software and games, organized by category for easy discovery.",
    },
    {
      icon: Zap,
      title: "Instant Installation",
      description: "Request professional remote installation with just one click. Fast, secure, and hassle-free.",
    },
    {
      icon: Shield,
      title: "Expert Support",
      description: "Get help from experienced technicians. We handle setup, troubleshooting, and optimization.",
    },
  ];

  return (
    <div className="relative">
      {/* Animated Background Layers */}
      <AnimatedGradient />
      <ParticleNetwork />
      <CircuitGrid />

      {/* Hero Landing Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="container mx-auto text-center relative z-10">
          {/* Animated Title */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h1 className="font-display text-7xl md:text-9xl font-bold uppercase tracking-[0.3em] mb-8">
              <span className="bg-gradient-to-r from-tech-cyan via-cyan-glow to-neon-blue bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                AA&apos;s
              </span>
            </h1>
          </div>

          {/* Animated Subtitle */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="text-2xl md:text-4xl font-light tracking-[0.5em] uppercase text-slate-200 mb-3 dark:text-slate-200 light:text-slate-700">
              Computer and Remote Services
            </p>
          </div>

          {/* Animated Tagline */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <p className="text-lg md:text-xl text-tech-cyan font-light tracking-[0.2em] uppercase mb-12">
              Reliable Remote Support for All Your Computer Needs
            </p>
          </div>

          {/* Animated Divider */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-tech-cyan to-transparent mx-auto mb-12" />
          </div>

          {/* Animated CTA Buttons */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
              <Link
                href="/products"
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/contact" className="btn-secondary group">
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* Animated Social Buttons */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <SocialButtons />
          </div>

          {/* Scroll Indicator */}
          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "1400ms" }}
          >
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <div className="w-6 h-10 border-2 border-tech-cyan/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-3 bg-tech-cyan rounded-full animate-pulse" />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500 light:text-slate-600">
                Scroll
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-[0.4em] text-center mb-16 text-tech-cyan">
            What We Offer
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.2}>
                <motion.div 
                  className="card text-center group"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center mb-6">
                    <motion.div 
                      className="relative p-5 rounded-full bg-gradient-to-br from-tech-cyan/20 to-cyan-glow/20 border border-tech-cyan/30 group-hover:border-tech-cyan/60 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-10 h-10 text-tech-cyan" />
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full bg-tech-cyan/0 blur-xl transition-all group-hover:bg-tech-cyan/30" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-200 uppercase tracking-[0.3em] dark:text-slate-200 light:text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed dark:text-slate-400 light:text-slate-600">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <ScrollReveal>
          <motion.div 
            className="card max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-[0.4em] mb-6 bg-gradient-to-r from-tech-cyan to-cyan-glow bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed dark:text-slate-300 light:text-slate-600">
              Explore our product catalog or contact us for personalized assistance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/products" className="btn-primary">
                View Products
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </ScrollReveal>
      </section>
    </div>
  );
}
