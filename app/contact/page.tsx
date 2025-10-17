import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import SocialButtons from "@/components/SocialButtons";
import Reveal from "@/components/Reveal";
import { Mail, Clock, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative">
      <section className="container mx-auto px-6 py-16">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.6em] text-tech-cyan/80 mb-4">Connect With Us</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-[0.35em] mb-6">
              <span className="bg-gradient-to-r from-tech-cyan via-cyan-glow to-neon-blue bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed dark:text-slate-400 light:text-slate-600">
              Have a question or need assistance with software and game installations? Our remote technicians are ready to help worldwide.
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
            {/* Contact Form */}
            <div className="card border border-white/10 bg-midnight-900/70 backdrop-blur-xl dark:border-white/10 dark:bg-midnight-900/70 light:border-tech-cyan/20 light:bg-white/90">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold uppercase tracking-[0.4em] text-tech-cyan mb-3">
                  Send Us a Message
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed dark:text-slate-400 light:text-slate-600">
                  Let us know what you need installed, fixed, or configured. We&apos;ll respond with a tailored plan and schedule your remote session.
                </p>
              </div>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-16 text-slate-500">
                    Preparing secure channel...
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>

          <Reveal delay={250}>
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card border border-white/10 bg-midnight-900/60 backdrop-blur-xl dark:border-white/10 dark:bg-midnight-900/60 light:border-tech-cyan/20 light:bg-white/90">
                <h3 className="font-display text-xl font-semibold uppercase tracking-[0.35em] text-tech-cyan mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-tech-cyan/50 bg-tech-cyan/10 p-3">
                      <Mail className="w-5 h-5 text-tech-cyan" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300 dark:text-slate-300 light:text-slate-700">Email</h4>
                      <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">aacomputerremoteservices@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-cyan-glow/50 bg-cyan-glow/10 p-3">
                      <Clock className="w-5 h-5 text-cyan-glow" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300 dark:text-slate-300 light:text-slate-700">Response Time</h4>
                      <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">Typically within a few hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-neon-blue/50 bg-neon-blue/10 p-3">
                      <MapPin className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300 dark:text-slate-300 light:text-slate-700">Service Area</h4>
                      <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">100% Remote • Global Coverage</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border border-white/10 bg-gradient-to-br from-midnight-900/80 via-midnight-800/60 to-midnight-900/80 backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-midnight-900/80 dark:via-midnight-800/60 dark:to-midnight-900/80 light:border-tech-cyan/20 light:bg-gradient-to-br light:from-white/90 light:via-light-surface/80 light:to-white/90">
                <h3 className="font-display text-xl font-semibold uppercase tracking-[0.35em] text-cyan-glow mb-4">
                  Why Reach Out
                </h3>
                <ul className="space-y-3 text-slate-300 text-sm dark:text-slate-300 light:text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-tech-cyan" />
                    <span>Remote installation of premium software and games</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-glow" />
                    <span>Expert troubleshooting and optimization support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-neon-blue" />
                    <span>Flexible scheduling that works across time zones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-tech-cyan" />
                    <span>Secure remote sessions with trusted technicians</span>
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
