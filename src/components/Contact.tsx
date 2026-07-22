import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { ownerInfo } from "../data";
import { Send, Github, Linkedin, Mail, MapPin, Sparkles, CheckCircle, ArrowUpRight, Terminal } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Simulate standard server API transmission lag
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Radiant glows */}
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <Mail className="w-3.5 h-3.5" />
            CONTACT GATEWAY
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left panel: Info & Socials (lg:5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-white tracking-tight">
                Let's construct something intelligent together
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                I am actively seeking internship opportunities, collaborative hackathon teammates, open-source projects, and full-stack software development challenges. Drop me a line, and let's integrate!
              </p>
            </div>

            {/* Direct Coordinates card list */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href={ownerInfo.socials.email}
                className="p-4 bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800/80 hover:border-blue-500/30 rounded-2xl flex items-center gap-4 transition-all group"
              >
                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl group-hover:scale-105 transition-all">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">EMAIL ADDRESS</span>
                  <span className="block text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 group-hover:text-white transition-colors">patutammu0315@gmail.com</span>
                </div>
              </a>

              {/* Location */}
              <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl flex items-center gap-4 transition-all">
                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">COORDINATES</span>
                  <span className="block text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">{ownerInfo.socials.location}</span>
                </div>
              </div>
            </div>

            {/* Social handles CTAs */}
            <div className="flex gap-3">
              {/* GitHub */}
              <a
                href={ownerInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3.5 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/30 rounded-xl flex items-center justify-center gap-2 transition-all text-xs font-semibold tracking-wider text-slate-300 hover:text-white"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>

              {/* LinkedIn */}
              <a
                href={ownerInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3.5 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/30 rounded-xl flex items-center justify-center gap-2 transition-all text-xs font-semibold tracking-wider text-slate-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Right panel: The contact form (lg:7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-slate-950/40 border border-slate-800/80 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-600">SECURE SHELL v1.2</div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Transmission Complete</h4>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    Thank you! Your message has been successfully encrypted and routed to Rajesh's terminal inbox.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">
                        Full Name <span className="text-blue-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">
                        Email Address <span className="text-blue-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                        placeholder="e.g. john@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                      placeholder="e.g. Internship Inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">
                      Message <span className="text-blue-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-600 outline-none resize-none transition-all"
                      placeholder="Write your transmission coordinates..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[size:200%_auto] hover:bg-right hover:scale-[1.01] active:scale-[0.99] text-white font-semibold text-xs tracking-wider shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{status === "sending" ? "ROUTING ENCRYPTED DATA..." : "SEND TRANSMISSION MESSAGE"}</span>
                    </button>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-xs font-mono text-rose-500 pt-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>FAILED: Please fill in all required (*) sectors before sending.</span>
                    </div>
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
