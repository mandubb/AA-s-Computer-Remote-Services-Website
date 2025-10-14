"use client";

import { MessageCircle, Facebook } from "lucide-react";

export default function SocialButtons() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com";

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const handleFacebook = () => {
    window.open(facebookUrl, "_blank");
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <button
        onClick={handleWhatsApp}
        className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-neon-cyan/30 bg-midnight-800/70 px-7 py-3 font-medium uppercase tracking-[0.3em] text-neon-cyan transition-all duration-300 hover:border-neon-cyan/60 hover:text-white"
      >
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-neon-cyan/30 via-neon-blue/30 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </button>
      <button
        onClick={handleFacebook}
        className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-neon-magenta/30 bg-midnight-800/70 px-7 py-3 font-medium uppercase tracking-[0.3em] text-neon-magenta transition-all duration-300 hover:border-neon-magenta/60 hover:text-white"
      >
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-neon-magenta/30 via-neon-blue/20 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
        <Facebook className="h-5 w-5" />
        Facebook
      </button>
    </div>
  );
}
