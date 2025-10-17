"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    requestType: "",
    deviceType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const requestTypes = [
    "Software Installation",
    "Game Installation",
    "Windows Repair",
    "Remote Assistance",
    "Other",
  ];

  const deviceTypes = ["Laptop", "Desktop", "Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const trimmedMessage = formData.message.trim();
    const trimmedName = formData.name.trim();
    const trimmedContact = formData.contact.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedContact || !formData.requestType || !formData.deviceType) {
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
      setErrorMessage("Please provide a detailed description of your request.");
      return;
    }

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: formData.email,
          contact: trimmedContact,
          requestType: formData.requestType,
          deviceType: formData.deviceType,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send request");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        contact: "",
        requestType: "",
        deviceType: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Full Name *
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
          Email Address *
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
        <label htmlFor="contact" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Contact Number / WhatsApp *
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          required
          value={formData.contact}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-midnight-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/60 focus:outline-none"
          placeholder="+1234567890"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="requestType" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Type of Request *
        </label>
        <select
          id="requestType"
          name="requestType"
          required
          value={formData.requestType}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-midnight-900/70 px-4 py-3 text-slate-100 transition-all duration-300 focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/60 focus:outline-none"
        >
          <option value="" disabled className="bg-midnight-900">
            Select a request type
          </option>
          {requestTypes.map((type) => (
            <option key={type} value={type} className="bg-midnight-900">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="deviceType" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Device Type *
        </label>
        <select
          id="deviceType"
          name="deviceType"
          required
          value={formData.deviceType}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-midnight-900/70 px-4 py-3 text-slate-100 transition-all duration-300 focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/60 focus:outline-none"
        >
          <option value="" disabled className="bg-midnight-900">
            Select your device type
          </option>
          {deviceTypes.map((type) => (
            <option key={type} value={type} className="bg-midnight-900">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Detailed Message / Request Description *
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="w-full min-h-[180px] rounded-2xl border border-white/10 bg-midnight-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/60 focus:outline-none resize-y"
          placeholder="Please provide detailed information about your request, including any specific software/games you need, issues you're experiencing, or any other relevant details..."
        />
      </div>

      {status === "success" && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-emerald-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>✅ Your request was sent successfully! Check your email for confirmation.</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-red-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>⚠️ {errorMessage}</span>
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
            Submit Request
          </>
        )}
      </button>
    </form>
  );
}
