import { Suspense } from "react";
import RequestForm from "@/components/RequestForm";
import SocialButtons from "@/components/SocialButtons";
import Reveal from "@/components/Reveal";
import { FileText, Zap, Shield, Headphones } from "lucide-react";

export default function RequestPage() {
  return (
    <div className="relative">
      <section className="container mx-auto px-6 py-16">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.6em] text-neon-cyan/80 mb-4">Service Request Portal</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-[0.35em] mb-6">
              <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta bg-clip-text text-transparent">
                Submit Request
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Need software installation, game setup, Windows repair, or remote assistance? Fill out the form below and our expert team will get back to you promptly.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex justify-center">
            <SocialButtons />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal delay={200}>
            {/* Request Form */}
            <div className="card border border-white/10 bg-midnight-900/70 backdrop-blur-xl">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold uppercase tracking-[0.4em] text-neon-cyan mb-3">
                  Customer Request Form
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Provide detailed information about your request. We&apos;ll review it and contact you via email or WhatsApp to discuss the next steps.
                </p>
              </div>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-16 text-slate-500">
                    Initializing secure form...
                  </div>
                }
              >
                <RequestForm />
              </Suspense>
            </div>
          </Reveal>

          <Reveal delay={250}>
            {/* Request Info */}
            <div className="space-y-6">
              <div className="card border border-white/10 bg-midnight-900/60 backdrop-blur-xl">
                <h3 className="font-display text-xl font-semibold uppercase tracking-[0.35em] text-neon-blue mb-6">
                  What Happens Next?
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-neon-cyan/50 bg-neon-cyan/10 p-3">
                      <FileText className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Request Review</h4>
                      <p className="text-slate-400 text-sm">We&apos;ll carefully review your request and requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-neon-blue/50 bg-neon-blue/10 p-3">
                      <Zap className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Quick Response</h4>
                      <p className="text-slate-400 text-sm">Expect a reply within a few hours via email or WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-neon-magenta/50 bg-neon-magenta/10 p-3">
                      <Shield className="w-5 h-5 text-neon-magenta" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Secure Process</h4>
                      <p className="text-slate-400 text-sm">Your information is protected and handled confidentially</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-neon-cyan/50 bg-neon-cyan/10 p-3">
                      <Headphones className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Expert Support</h4>
                      <p className="text-slate-400 text-sm">Professional remote assistance tailored to your needs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border border-white/10 bg-gradient-to-br from-midnight-900/80 via-midnight-800/60 to-midnight-900/80 backdrop-blur-xl">
                <h3 className="font-display text-xl font-semibold uppercase tracking-[0.35em] text-neon-magenta mb-4">
                  Services We Offer
                </h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-neon-cyan" />
                    <span>Software installation and configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-neon-magenta" />
                    <span>Game installation and optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-neon-blue" />
                    <span>Windows repair and troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-neon-cyan" />
                    <span>Remote technical assistance worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-neon-magenta" />
                    <span>System optimization and performance tuning</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
