import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ownerInfo } from "../data";
import { Send, Github, Linkedin, Mail, MapPin, Sparkles, CheckCircle2, ArrowUpRight, Terminal, Instagram, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // hidden spam protection honeypot
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required sector fields before transmitting.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address format (e.g., user@example.com).");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to deliver contact message. Please try again.");
      }
    } catch (err: any) {
      console.error("Contact form transmission error:", err);
      setStatus("error");
      setErrorMessage("Network error connecting to backend contact server. Please verify your connection.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            DIRECT TRANSMISSION GATEWAY
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Let's Build <span className="text-gradient">Something Intelligent Together</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Have an idea, project, or opportunity? Let's connect and create something impactful.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left panel: Connect With Me section (lg:5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>CONNECT WITH ME</span>
              </div>

              <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                Direct Coordinates &amp; Social Channels
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                I am actively seeking internship opportunities, full-stack &amp; AI developer positions, hackathon collaborations, and open-source projects. Feel free to reach out via email or connect on social platforms!
              </p>
            </div>

            {/* Direct Coordinates card list */}
            <div className="space-y-4">
              {/* Primary Email */}
              <a
                href="mailto:demigodgamingawn@gmail.com"
                className="p-4 bg-slate-950/50 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl flex items-center gap-4 transition-all group shadow-md"
              >
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl group-hover:scale-105 transition-all text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">PRIMARY EMAIL ADDRESS</span>
                  <span className="block text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 group-hover:text-cyan-400 transition-colors truncate">
                    demigodgamingawn@gmail.com
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">LOCATION BASE</span>
                  <span className="block text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">{ownerInfo.socials.location}</span>
                </div>
              </div>
            </div>

            {/* Social handles CTAs */}
            <div className="grid grid-cols-3 gap-3">
              {/* GitHub */}
              <a
                href={ownerInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-950/50 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/30 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all group"
              >
                <Github className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-300">GITHUB</span>
              </a>

              {/* LinkedIn */}
              <a
                href={ownerInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-950/50 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/30 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all group"
              >
                <Linkedin className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-300">LINKEDIN</span>
              </a>

              {/* Instagram */}
              <a
                href={ownerInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-950/50 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/30 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all group"
              >
                <Instagram className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-300">INSTAGRAM</span>
              </a>
            </div>
          </div>

          {/* Right panel: Glassmorphism Contact Form (lg:7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md uppercase font-semibold">
                  SECURE TRANSMISSION ENDPOINT
                </span>
                <span className="text-[10px] font-mono text-slate-500">v2.4 ENCRYPTED</span>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
                    <CheckCircle2 className="w-12 h-12 animate-bounce" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-white">Transmission Successful</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                    Thank you for reaching out! Your message has been sent successfully to Rajesh's primary inbox.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  {/* Invisible Honeypot Field for Bot Spam Protection */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: "none" }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1 font-semibold">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/20 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1 font-semibold">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/20 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                        placeholder="e.g. john@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1 font-semibold">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/20 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                      placeholder="e.g. Internship Inquiry / AI Collaboration"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-1 font-semibold">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/20 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 outline-none resize-none transition-all"
                      placeholder="Write your message here..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[size:200%_auto] hover:bg-right hover:scale-[1.01] active:scale-[0.99] text-white font-semibold text-xs tracking-wider shadow-lg shadow-blue-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      <span>{status === "sending" ? "ROUTING ENCRYPTED DATA..." : "SEND MESSAGE"}</span>
                    </button>
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 bg-rose-950/60 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-mono"
                    >
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{errorMessage || "Delivery error. Please verify input fields and try again."}</span>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
