import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { ThemeProvider } from "@/components/ThemeProvider";
import SplashIntro from "@/components/SplashIntro";
import Footer from "@/components/Footer";
import { generateOrganizationStructuredData, generateWebsiteStructuredData } from "@/lib/seo";
import PWAInstaller from "@/components/PWAInstaller";
import ChatBot2 from "@/components/ChatBot2";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
const orbitron = Orbitron({ 
  subsets: ["latin"], 
  variable: "--font-orbitron",
  display: "swap",
  preload: true,
});
const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: "600", 
  variable: "--font-rajdhani",
  display: "swap",
  preload: true,
});
const robotoMono = Roboto_Mono({ 
  subsets: ["latin"], 
  variable: "--font-roboto-mono",
  display: "swap",
  preload: true,
});

const SITE_NAME = "AA's Computer Remote Services";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aascomputer.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Professional remote computer support, software installation, and troubleshooting services. Browse hundreds of curated software and games with expert installation assistance.",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "Professional remote computer support, software installation, and troubleshooting services",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Professional remote computer support, software installation, and troubleshooting services",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@aascomputer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationStructuredData();
  const websiteSchema = generateWebsiteStructuredData();

  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00bcd4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.freetogame.com" />
        
        {/* DNS Prefetch for APIs */}
        <link rel="dns-prefetch" href="https://www.freetogame.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${orbitron.variable} ${rajdhani.variable} ${inter.variable} ${robotoMono.variable} font-body bg-midnight text-slate-100 dark:bg-midnight dark:text-slate-100 light:bg-light-bg light:text-light-text`}>
        <PWAInstaller />
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
