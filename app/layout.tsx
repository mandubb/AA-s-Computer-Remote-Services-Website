import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import ChatBot2 from "@/components/ChatBot2";
import { ThemeProvider } from "@/components/ThemeProvider";
import SplashIntro from "@/components/SplashIntro";
import Footer from "@/components/Footer";

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
      <body className={`${orbitron.variable} ${rajdhani.variable} ${inter.variable} ${robotoMono.variable} font-body bg-midnight text-slate-100 dark:bg-midnight dark:text-slate-100 light:bg-light-bg light:text-light-text`}>
        <ThemeProvider>
          <SplashIntro />
          <BackgroundAnimation />
          <ScrollProgress />
          <Navigation />
          <main className="relative min-h-screen">
            {children}
          </main>
          <ChatBot2 />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
