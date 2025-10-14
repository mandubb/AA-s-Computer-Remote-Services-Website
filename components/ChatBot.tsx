"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

type Sender = "user" | "bot";

type Message = {
  id: string;
  text: string;
  sender: Sender;
  createdAt: string;
};

type ProductDetail = {
  name: string;
  category: string;
  platforms: string[];
};

declare global {
  interface WindowEventMap {
    "aa-chat-product": CustomEvent<ProductDetail>;
  }
}

const SOFTWARE_CATEGORIES = [
  "Productivity",
  "Creative",
  "Design",
  "Development",
  "Communication",
  "Entertainment",
  "Media",
];

const GAME_CATEGORIES = [
  "Action",
  "RPG",
  "Shooter",
  "Strategy",
  "Sandbox",
  "Simulation",
];

const QUICK_REPLIES = [
  "What software do you install?",
  "What games do you install?",
  "How do I request installation?",
  "What are your prices?",
  "Which platforms do you support?",
  "Do you offer remote troubleshooting?",
  "How long does installation take?",
  "Do you provide Windows and Mac support?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  const welcomeMessage = useMemo<Message>(
    () => ({
      id: "welcome",
      text: "👋 Welcome to AA's Computer Remote Services! I can help you explore software, games, and installation requests.",
      sender: "bot",
      createdAt: new Date().toISOString(),
    }),
    []
  );

  useEffect(() => {
    const stored = sessionStorage.getItem("aas-chatbot-history");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Message[];
        setMessages(parsed);
        return;
      } catch (error) {
        console.warn("Failed to parse chatbot history", error);
      }
    }
    setMessages([welcomeMessage]);
  }, [welcomeMessage]);

  useEffect(() => {
    if (messages.length === 0) return;
    sessionStorage.setItem("aas-chatbot-history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const handler = (event: CustomEvent<ProductDetail>) => {
      const { name, category, platforms } = event.detail;
      setIsOpen(true);
      setIsMinimized(false);
      setHasNewMessage(false);

      const userMessage: Message = {
        id: crypto.randomUUID(),
        text: `Tell me about ${name}.`,
        sender: "user",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const botMessage: Message = {
          id: crypto.randomUUID(),
          text: `✨ **${name}** is part of our **${category}** collection and supports **${platforms.join(" & ")}**.

To request installation:
1. Click the "Request Installation" button on the product card
2. Complete the contact form with your details
3. Our experts will reach out to schedule your remote setup!

Need recommendations for something else?`,
          sender: "bot",
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        if (isMinimized) setHasNewMessage(true);
      }, 1000);
    };

    window.addEventListener("aa-chat-product", handler);
    return () => window.removeEventListener("aa-chat-product", handler);
  }, [isMinimized]);

  const respond = (prompt: string) => {
    const lower = prompt.toLowerCase();

    if (lower.includes("software")) {
      return "We install a broad range of software packages:\n\n📦 **Productivity**: Microsoft Office, Notion, Slack\n🎨 **Creative**: Adobe Creative Cloud, Blender\n🖥️ **Design**: AutoCAD, Figma\n💻 **Development**: Visual Studio Code\n📞 **Communication**: Zoom, Slack\n🎵 **Entertainment**: Spotify\n📹 **Media**: VLC, OBS Studio\n\nBrowse everything on our Products page!";
    }

    if (lower.includes("game")) {
      return "Our gaming catalog includes fan favorites across genres:\n\n🎮 **Action**: GTA V, Red Dead Redemption 2\n⚔️ **RPG**: Cyberpunk 2077, The Witcher 3, Elden Ring\n🔫 **Shooter**: Valorant, Fortnite, Counter-Strike 2\n🧠 **Strategy**: Civilization VI, League of Legends\n🏗️ **Sandbox**: Minecraft\n🌾 **Simulation**: Stardew Valley\n\nFilter by category on the Products page for more!";
    }

    if (lower.includes("how") && (lower.includes("request") || lower.includes("install"))) {
      return "Requesting installation is simple:\n\n1. Open the Products page\n2. Pick the software or game you need\n3. Click **Request Installation**\n4. Submit the contact form\n5. We arrange your remote setup 🚀\n\nNeed assistance selecting the right product?";
    }

    if (lower.includes("price") || lower.includes("cost") || lower.includes("quote")) {
      return "For pricing and custom quotes, please reach out via:\n\n📱 WhatsApp button\n💬 Facebook button\n📧 Contact page form\n\nWe'll tailor the service to your needs.";
    }

    if (lower.includes("platform") || lower.includes("windows") || lower.includes("mac")) {
      return "We support both **Windows** and **Mac** platforms. Every product card shows compatibility tags, and we call out when a product is limited to one platform.";
    }

    if (lower.includes("troubleshooting")) {
      return "Absolutely. We offer full remote troubleshooting for software issues, configuration conflicts, and performance problems. Just contact us with the issue you're facing.";
    }

    if (lower.includes("how long") || lower.includes("installation take") || lower.includes("time")) {
      return "Most installations take between **30-60 minutes**, depending on product size and system readiness. We'll give you an estimate when we schedule your session.";
    }

    if (lower.includes("windows") && lower.includes("mac")) {
      return "Yes! We regularly install on both Windows and Mac. If a product is available for both, you can choose during the installation request.";
    }

    for (const category of SOFTWARE_CATEGORIES) {
      if (lower.includes(category.toLowerCase())) {
        return `Great choice! Explore **${category}** software by selecting that category filter on the Products page. Need tailored suggestions? Just ask!`;
      }
    }

    for (const category of GAME_CATEGORIES) {
      if (lower.includes(category.toLowerCase())) {
        return `Game on! The **${category}** filter on our Products page reveals top picks. Want me to highlight a favorite?`; 
      }
    }

    return "I'm here to help! Ask me about our software, games, or how to request installation. You can also tap the quick buttons below.";
  };

  const pushUserMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: trimmed,
      sender: "user",
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply: Message = {
        id: crypto.randomUUID(),
        text: respond(trimmed),
        sender: "bot",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
      if (isMinimized) setHasNewMessage(true);
    }, 800);
  };

  const handleSubmit = () => pushUserMessage(inputValue);

  const handleQuickReply = (text: string) => {
    setInputValue(text);
    setTimeout(() => pushUserMessage(text), 80);
    setShowQuickReplies(false);
  };

  const formattedTime = (isoString: string) =>
    new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
            setHasNewMessage(false);
          }}
          className="fixed bottom-6 right-6 z-40 group"
          aria-label="Open chat"
        >
          <div className="relative">
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-neon-magenta text-[10px] font-bold text-midnight animate-pulse">
                !
              </span>
            )}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-midnight shadow-neon transition-transform duration-300 group-hover:scale-110">
              <MessageCircle className="h-7 w-7" />
            </span>
          </div>
        </button>
      )}

      {isOpen && !isMinimized && (
        <div className="fixed bottom-6 right-6 z-40 flex h-[580px] w-[360px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-midnight-900/95 shadow-[0_0_50px_rgba(25,249,255,0.35)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4">
          <header className="relative flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-neon-cyan/15 to-neon-blue/15 px-4 py-3">
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-neon-cyan blur-md opacity-40" />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neon-cyan/60 bg-midnight-800/90">
                  <Bot className="h-5 w-5 text-neon-cyan" />
                </span>
              </div>
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-neon-cyan">AA&apos;s Bot</p>
                <p className="text-[11px] text-slate-400">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-neon-cyan"
                aria-label="Minimize chat"
                title="Minimize"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-neon-cyan"
                aria-label="Close chat"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin" style={{ overscrollBehavior: "contain" }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex animate-in fade-in slide-in-from-bottom-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 text-slate-100 border border-neon-cyan/30"
                      : "bg-midnight-800/80 text-slate-300 border border-white/10"
                  }`}
                >
                  {message.text}
                  <span className="mt-2 block text-[11px] text-slate-500">
                    {formattedTime(message.createdAt)}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex animate-in fade-in justify-start">
                <div className="rounded-2xl border border-white/10 bg-midnight-800/80 px-4 py-3">
                  <span className="mr-1 inline-block h-2 w-2 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: "0ms" }} />
                  <span className="mr-1 inline-block h-2 w-2 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: "120ms" }} />
                  <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: "240ms" }} />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="px-4 pb-3">
            <button
              type="button"
              onClick={() => setShowQuickReplies((prev) => !prev)}
              className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500 hover:text-neon-cyan transition-colors"
            >
              <span>{showQuickReplies ? "Hide Quick Questions" : "Show Quick Questions"}</span>
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${showQuickReplies ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showQuickReplies && (
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => handleQuickReply(reply)}
                    className="text-[11px] uppercase tracking-[0.25em] rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1.5 text-neon-cyan transition-all duration-300 hover:border-neon-cyan/50 hover:bg-neon-cyan/20"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          <footer className="border-t border-white/10 bg-midnight-900/60 px-4 py-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Ask about software, games, or installation..."
                className="flex-1 rounded-xl border border-white/10 bg-midnight-800/80 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-300 focus:border-neon-cyan/60 focus:ring-2 focus:ring-neon-cyan/20"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className="rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue p-3 text-midnight shadow-neon transition-all duration-300 hover:scale-105 hover:shadow-neon-magenta disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
