import Link from "next/link";
import { Package, Zap, Shield } from "lucide-react";
import SocialButtons from "@/components/SocialButtons";

export default function Home() {
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
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6 py-20">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-[0.3em] mb-6 reveal reveal-visible">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta bg-clip-text text-transparent">
              AA&apos;s
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-light tracking-[0.5em] uppercase text-slate-300 mb-4">
            Computer Remote Services
          </p>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Professional remote installation for software and games. Browse our catalog, request setup, and let our experts handle the rest.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link href="/products" className="btn-primary">
              Browse Products
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get Support
            </Link>
          </div>

          <SocialButtons />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-[0.4em] text-center mb-16 text-neon-cyan">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card text-center group">
                <div className="flex justify-center mb-6">
                  <div className="relative p-5 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/30 group-hover:border-neon-cyan/60 transition-all duration-300">
                    <Icon className="w-10 h-10 text-neon-cyan" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-200 uppercase tracking-[0.3em]">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="card max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-[0.4em] mb-6 text-neon-magenta">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
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
        </div>
      </section>
    </div>
  );
}
