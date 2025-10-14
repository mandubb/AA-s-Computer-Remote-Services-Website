"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      setFormData((prev) => ({ ...prev, subject: `Installation request: ${productParam}` }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const trimmedMessage = formData.message.trim();
    const trimmedName = formData.name.trim();
    const trimmedSubject = formData.subject.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedSubject) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!trimmedMessage) {
      setStatus("error");
      setErrorMessage("Your message cannot be empty.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: formData.email,
          subject: trimmedSubject,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-midnight-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/60 focus:outline-none"
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-midnight-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/60 focus:outline-none"
          placeholder="your.email@example.com"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-midnight-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/60 focus:outline-none"
          placeholder="How can we assist you?"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full min-h-[160px] rounded-2xl border border-white/10 bg-midnight-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/60 focus:outline-none resize-y"
          placeholder="Tell us how we can help you..."
        />
      </div>

      {status === "success" && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-emerald-200">
          <CheckCircle className="w-5 h-5" />
          <span>Your message has been sent. Thank you!</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-red-200">
          <AlertCircle className="w-5 h-5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-8 py-3 font-semibold uppercase tracking-[0.4em] text-midnight shadow-neon transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(25,249,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
