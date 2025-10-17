"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";

type Sender = "user" | "bot";

type Message = {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
};

// Keyword-based response system (No backend, no API)
const responses: Record<string, string> = {
  repair: "We offer remote repair services for Windows laptops and PCs. We can fix system issues, reinstall Windows, or optimize performance.",
  software: "We can install a wide range of software — from Office tools to productivity suites. Just contact us to request your installation.",
  game: "We install and configure PC games remotely. Visit our Products > Games page to see available titles and system requirements.",
  remote: "We use trusted tools like UltraViewer, AnyDesk, and TeamViewer for secure remote connections.",
  contact: "You can reach us through our Contact page, Facebook page, or WhatsApp for faster support!",
  price: "Pricing depends on the service. Message us your concern and we'll give you a quote!",
  install: "Yes! We can remotely install software or games depending on your system specifications.",
  windows: "We provide Windows installation and repair services. That includes system optimization, updates, and driver setup.",
  mac: "Currently, most of our services are focused on Windows systems. But some software works for Mac — check the product details.",
  service: "We offer computer repair, Windows installation, software/game installation, and remote support. You can find everything on our website!",
  laptop: "We offer remote repair services for Windows laptops and PCs. We can fix system issues, reinstall Windows, or optimize performance.",
  cost: "Pricing depends on the service. Message us your concern and we'll give you a quote!",
  support: "Currently, most of our services are focused on Windows systems. But some software works for Mac — check the product details.",
  tool: "We use trusted tools like UltraViewer, AnyDesk, and TeamViewer for secure remote connections.",
};

// Predefined clickable questions
const PREDEFINED_QUESTIONS = [
  "Do you offer laptop repair?",
  "Can you install games remotely?",
  "How can I contact you?",
  "Do you support Mac?",
  "What remote tools do you use?",
  "How much does your service cost?",
];

export default function ChatBot2() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("aa-chatbot-history");
    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages) as Message[];
        setMessages(parsed);
      } catch (error) {
        console.warn("Failed to parse chat history:", error);
        initializeChat();
      }
    } else {
      initializeChat();
    }

    // Detect system theme preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("aa-chatbot-history", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to newest message
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      text: "👋 Welcome to AA's Computer Remote Services! How can I help you today?",
      sender: "bot",
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Keyword matching function
  const findResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerInput.includes(keyword)) {
        return response;
      }
    }
    
    // Default response if no keyword matches
    return "I'm not sure about that, but you can contact us directly through our Contact page or WhatsApp!";
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: messageText,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate "typing..." delay before bot response
    setTimeout(() => {
      const botResponse = findResponse(messageText);
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: botResponse,
        sender: "bot",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200); // Typing animation duration
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
    setShowQuestions(false); // Minimize questions after clicking
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const clearHistory = () => {
    localStorage.removeItem("aa-chatbot-history");
    initializeChat();
  };

  const isDark = theme === "dark";

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open chatbot"
        >
          <div className="relative">
            {/* Glowing effect */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
            
            {/* Icon button */}
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-midnight shadow-neon transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-neon-magenta">
              <MessageCircle className="h-7 w-7" />
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 flex flex-col w-[95vw] max-w-[400px] h-[600px] max-h-[85vh] rounded-3xl border shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${
            isDark 
              ? "bg-midnight-900/95 border-white/10 shadow-[0_0_60px_rgba(25,249,255,0.4)]" 
              : "bg-white/95 border-slate-200 shadow-[0_0_60px_rgba(77,124,254,0.3)]"
          }`}
        >
          {/* Header */}
          <div className={`relative flex items-center justify-between px-5 py-4 border-b ${
            isDark 
              ? "bg-gradient-to-r from-neon-cyan/15 to-neon-blue/15 border-white/10" 
              : "bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border-slate-200"
          }`}>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
            
            <div className="flex items-center gap-3">
              {/* Bot Avatar */}
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-neon-cyan blur-md opacity-50 animate-pulse-slow" />
                <span className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 ${
                  isDark 
                    ? "border-neon-cyan/60 bg-midnight-800/90" 
                    : "border-neon-cyan/40 bg-white"
                }`}>
                  <Bot className="h-6 w-6 text-neon-cyan" />
                </span>
              </div>
              
              <div>
                <p className={`font-display text-sm font-bold uppercase tracking-wider ${
                  isDark ? "text-neon-cyan" : "text-neon-blue"
                }`}>
                  AA&apos;s Bot 2.0
                </p>
                <p className={`text-xs flex items-center gap-1.5 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`rounded-lg p-2 transition-colors ${
                  isDark 
                    ? "text-slate-400 hover:bg-white/5 hover:text-neon-cyan" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-neon-blue"
                }`}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {isDark ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Clear History */}
              <button
                onClick={clearHistory}
                className={`rounded-lg p-2 transition-colors ${
                  isDark 
                    ? "text-slate-400 hover:bg-white/5 hover:text-neon-magenta" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-neon-magenta"
                }`}
                aria-label="Clear chat history"
                title="Clear history"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className={`rounded-lg p-2 transition-colors ${
                  isDark 
                    ? "text-slate-400 hover:bg-white/5 hover:text-neon-cyan" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-neon-blue"
                }`}
                aria-label="Close chat"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 animate-in fade-in slide-in-from-bottom-2 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 ${message.sender === "user" ? "order-2" : "order-1"}`}>
                  {message.sender === "bot" ? (
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isDark 
                        ? "bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/40" 
                        : "bg-gradient-to-br from-neon-cyan/30 to-neon-blue/30 border border-neon-cyan/50"
                    }`}>
                      <Bot className="h-4 w-4 text-neon-cyan" />
                    </div>
                  ) : (
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isDark 
                        ? "bg-gradient-to-br from-neon-magenta/20 to-neon-blue/20 border border-neon-magenta/40" 
                        : "bg-gradient-to-br from-neon-magenta/30 to-neon-blue/30 border border-neon-magenta/50"
                    }`}>
                      <User className="h-4 w-4 text-neon-magenta" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col max-w-[75%] ${message.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg transition-all duration-300 hover:shadow-xl ${
                      message.sender === "user"
                        ? isDark
                          ? "bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 text-slate-100 border border-neon-cyan/30"
                          : "bg-gradient-to-r from-neon-cyan/30 to-neon-blue/30 text-slate-900 border border-neon-cyan/40"
                        : isDark
                        ? "bg-midnight-800/80 text-slate-300 border border-white/10"
                        : "bg-slate-100 text-slate-800 border border-slate-200"
                    }`}
                  >
                    {message.text}
                  </div>
                  <span className={`mt-1 text-[10px] px-2 ${
                    isDark ? "text-slate-500" : "text-slate-600"
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2 animate-in fade-in">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isDark 
                    ? "bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/40" 
                    : "bg-gradient-to-br from-neon-cyan/30 to-neon-blue/30 border border-neon-cyan/50"
                }`}>
                  <Bot className="h-4 w-4 text-neon-cyan" />
                </div>
                <div className={`rounded-2xl px-5 py-3 ${
                  isDark 
                    ? "bg-midnight-800/80 border border-white/10" 
                    : "bg-slate-100 border border-slate-200"
                }`}>
                  <div className="flex gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Predefined Questions */}
          {showQuestions && messages.length <= 1 && (
            <div className={`px-4 pb-3 border-t ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}>
              <button
                onClick={() => setShowQuestions(!showQuestions)}
                className={`mt-3 mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider transition-colors ${
                  isDark 
                    ? "text-slate-500 hover:text-neon-cyan" 
                    : "text-slate-600 hover:text-neon-blue"
                }`}
              >
                <span>Quick Questions</span>
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${showQuestions ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="flex flex-wrap gap-2">
                {PREDEFINED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuestionClick(question)}
                    className={`text-[11px] rounded-full px-3 py-1.5 transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? "border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/20"
                        : "border border-neon-blue/40 bg-neon-blue/10 text-neon-blue hover:border-neon-blue/60 hover:bg-neon-blue/20"
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className={`px-4 py-4 border-t ${
            isDark 
              ? "bg-midnight-900/60 border-white/10" 
              : "bg-slate-50 border-slate-200"
          }`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={`flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 ${
                  isDark
                    ? "bg-midnight-800/80 border border-white/10 text-slate-200 placeholder-slate-500 focus:border-neon-cyan/60 focus:ring-2 focus:ring-neon-cyan/20"
                    : "bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
                }`}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className={`rounded-xl p-3 transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 ${
                  isDark
                    ? "bg-gradient-to-r from-neon-cyan to-neon-blue text-midnight shadow-neon hover:shadow-neon-magenta"
                    : "bg-gradient-to-r from-neon-cyan to-neon-blue text-white shadow-lg hover:shadow-xl"
                }`}
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
