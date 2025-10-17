import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import ChatBot2 from "@/components/ChatBot2";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: "600", variable: "--font-rajdhani" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  title: "AA's Computer Remote Services",
  description: "Professional remote computer support, software installation, and troubleshooting services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable} ${inter.variable} ${robotoMono.variable} font-body bg-midnight text-slate-100`}>
        <BackgroundAnimation />
        <Navigation />
        <main className="relative min-h-screen">
          {children}
        </main>
        <ChatBot2 />
        <footer className="relative mt-24 border-t border-white/5 bg-midnight-900/80 py-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
          <div className="container mx-auto px-6 text-center">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-6 text-sm uppercase tracking-[0.3em] text-slate-400">
              <span className="hover:text-neon-cyan transition-colors">Privacy</span>
              <span className="hover:text-neon-cyan transition-colors">Terms</span>
              <span className="hover:text-neon-cyan transition-colors">Support</span>
            </div>
            <p className="font-display text-2xl text-neon-cyan">AA&apos;s Computer Remote Services</p>
            <p className="mt-2 text-sm text-slate-500">High-tech remote support, installation, and troubleshooting</p>
            <p className="mt-6 text-xs uppercase tracking-[0.4em] text-slate-600">© {new Date().getFullYear()} AA&apos;s Remote Services. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
