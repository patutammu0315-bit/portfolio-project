import { motion } from "motion/react";
import { ArrowRight, Download, Mail, Terminal, Sparkles } from "lucide-react";
import TypingAnimation from "./TypingAnimation";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  const typingWords = [
    "AI Developer",
    "Full Stack Developer",
    "Prompt Engineer",
    "Problem Solver"
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950"
    >
      {/* 1. Interactive Particle Canvas Background */}
      <ParticleBackground />

      {/* 2. Custom Neon Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. Sleek cyber background pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Hero Content */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Dynamic AI system badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 hover:border-cyan-500/30 transition-colors rounded-full text-xs font-mono tracking-wide text-cyan-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>INTELLIGENT SYSTEMS PORTFOLIO // v1.2</span>
          </div>
        </motion.div>

        {/* Hello Greeting */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-lg md:text-xl font-medium text-slate-300 mb-2 tracking-wide"
        >
          👋 Hello, I'm <span className="text-white font-semibold">Rajesh</span>
        </motion.h2>

        {/* Role Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
        >
          <span className="text-white">AI-Powered</span> <br className="sm:hidden" />
          <span className="text-gradient">Full Stack Developer</span>
        </motion.h1>

        {/* Sub-Tagline with Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-base md:text-xl text-slate-400 max-w-2xl mb-12 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 leading-relaxed"
        >
          <span>Focusing as a specialized</span>
          <div className="bg-slate-900/50 px-3 py-0.5 border border-slate-800/80 rounded-md shadow-inner">
            <TypingAnimation words={typingWords} />
          </div>
        </motion.div>

        {/* Call to Actions Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* View Projects */}
          <button
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Download Resume */}
          <button
            onClick={() => handleScrollTo("resume")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 text-slate-200 hover:text-white font-semibold text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>

          {/* Contact Me */}
          <button
            onClick={() => handleScrollTo("contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-500/5 border border-blue-500/20 hover:border-cyan-500/40 text-cyan-400 hover:text-cyan-300 font-semibold text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Decorative Grid Line Footer Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 flex flex-col items-center gap-1.5 font-mono text-[10px] text-slate-500"
        >
          <span className="animate-bounce font-sans text-xs">↓</span>
          <span>SCROLL DOWN TO INITIATE INVENTORY SCAN</span>
        </motion.div>
      </div>
    </section>
  );
}
