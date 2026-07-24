import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { projects } from "../data";
import { Project } from "../types";
import {
  Sparkles,
  ExternalLink,
  Github,
  CheckCircle2,
  ChevronRight,
  X,
  Cpu,
  Layers,
  Workflow,
  AlertCircle,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Terminal,
  FileText,
  Activity,
  Volume2,
  Zap,
  Eye,
  Scan,
  Leaf,
  Clock,
  UserCheck,
  FileCheck,
  Bot,
  Layout,
  MessageSquare,
  Wand2,
  CloudSun,
  ShieldAlert,
  Sliders,
  Maximize2
} from "lucide-react";

// Framer Motion Staggered Reveal Variants for Project Showcase Cards
const cardRevealVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)"
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const innerStaggerLeft = {
  hidden: { opacity: 0, x: -25, y: 15 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

const innerStaggerRight = {
  hidden: { opacity: 0, x: 25, y: 15, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      delay: 0.35,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

// Interactive Cursor-Glow Card Container
function GlowCard({
  children,
  className = "",
  glowColor = "rgba(56, 189, 248, 0.15)",
  onClick,
  id
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  id?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative rounded-[32px] overflow-hidden transition-all duration-500 ${className}`}
      style={{
        background: "rgba(15, 23, 42, 0.65)"
      }}
    >
      {/* Dynamic Cursor Light Glow Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-10 opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 40%)`
          }}
        />
      )}

      {/* Subtle Border Highlight */}
      <div className="absolute inset-0 rounded-[32px] border border-slate-800/80 pointer-events-none transition-colors duration-500 group-hover:border-slate-700/80" />

      {/* Content wrapper */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const isCompleted = status.toLowerCase().includes("completed") || status.toLowerCase().includes("production");
  const isActive = status.toLowerCase().includes("active") || status.toLowerCase().includes("development");

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-semibold tracking-wider uppercase border backdrop-blur-md ${
        isCompleted
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          : isActive
          ? "bg-blue-500/10 border-blue-500/30 text-cyan-400"
          : "bg-purple-500/10 border-purple-500/30 text-purple-300"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isCompleted ? "bg-emerald-400" : isActive ? "bg-cyan-400 animate-pulse" : "bg-purple-400"
        }`}
      />
      {status}
    </span>
  );
}

export default function Projects() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [linkNotice, setLinkNotice] = useState<string | null>(null);
  const [activeTabAura, setActiveTabAura] = useState<"canvas" | "write" | "vision" | "voice">("canvas");
  const [activeProjectNav, setActiveProjectNav] = useState<number>(0);

  const auraProject = projects.find((p) => p.id === "aura-ai") || projects[0];
  const leaveProject = projects.find((p) => p.id === "smart-leave-management") || projects[1];
  const cropProject = projects.find((p) => p.id === "ai-crop-doctor") || projects[2];

  // IntersectionObserver to sync floating right side indicator
  useEffect(() => {
    const handleScroll = () => {
      const p1 = document.getElementById("project-01");
      const p2 = document.getElementById("project-02");
      const p3 = document.getElementById("project-03");

      if (!p1 || !p2 || !p3) return;

      const scrollPos = window.scrollY + window.innerHeight / 2;

      if (scrollPos >= p3.offsetTop - 100) {
        setActiveProjectNav(2);
      } else if (scrollPos >= p2.offsetTop - 100) {
        setActiveProjectNav(1);
      } else {
        setActiveProjectNav(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProject = (index: number) => {
    const targetId = `project-0${index + 1}`;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveProjectNav(index);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, type: "github" | "demo", project: Project) => {
    e.stopPropagation();
    if (type === "github" && project.githubUrl && project.githubUrl !== "#") {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
    } else if (type === "demo" && project.liveUrl && project.liveUrl !== "#") {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      setLinkNotice(
        `The public repository & production environment for "${project.title}" will be accessible upon deployment authorization.`
      );
      setTimeout(() => setLinkNotice(null), 4500);
    }
  };

  return (
    <section id="projects" className="py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Atmosphere - Animated Grid & Subtle Glowing Radial Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Soft Ambient Radial Lights */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-100px] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Blurred Light Particles */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 left-[15%] w-3 h-3 rounded-full bg-cyan-400 blur-sm pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-96 right-[20%] w-4 h-4 rounded-full bg-blue-500 blur-md pointer-events-none"
      />

      {/* Floating Project Navigation Indicator (Desktop Right Side) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-4 pointer-events-auto">
        <div className="p-3 bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col gap-3">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest px-2 pb-1 border-b border-slate-800/80">
            NAVIGATE
          </div>

          {[
            { id: 0, label: "01 — Aura AI" },
            { id: 1, label: "02 — Smart Leave" },
            { id: 2, label: "03 — Crop Doctor" }
          ].map((item) => {
            const isActive = activeProjectNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToProject(item.id)}
                className={`group flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? "bg-cyan-400 scale-125" : "bg-slate-600"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HERO HEADER */}
        <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/90 text-[11px] font-mono tracking-widest text-cyan-400 uppercase mb-6 shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SELECTED WORKS / 03 PROJECTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            Building Ideas Into <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
              Intelligent Products.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-light"
          >
            From AI-powered creative platforms to real-world full-stack systems, I build technology designed to solve meaningful problems.
          </motion.p>

          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full mt-8" />
        </div>

        {/* Global Toast Notification */}
        <AnimatePresence>
          {linkNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-12 p-4 bg-slate-900/95 border border-cyan-500/40 rounded-2xl flex items-center justify-between text-xs font-mono text-cyan-200 max-w-2xl mx-auto shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{linkNotice}</span>
              </div>
              <button onClick={() => setLinkNotice(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================================================================== */}
        {/* FEATURED PROJECT 01 — AURA AI */}
        {/* ==================================================================== */}
        <motion.div
          id="project-01"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={cardRevealVariants}
          className="mb-24 group"
        >
          {/* Animated Gradient Border Outer Wrapper */}
          <div className="p-[1px] rounded-[34px] bg-gradient-to-r from-blue-500/40 via-cyan-400/50 to-indigo-500/40 shadow-2xl shadow-cyan-500/10 group-hover:shadow-cyan-500/20 transition-all duration-700">
            <GlowCard
              glowColor="rgba(56, 189, 248, 0.18)"
              className="bg-slate-950/90 backdrop-blur-3xl p-6 sm:p-10 lg:p-12"
            >
              <div className="flex flex-col lg:flex-row gap-12 items-stretch justify-between">
                
                {/* Left Side: Project Details */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={innerStaggerLeft}
                  className="flex-1 flex flex-col justify-between space-y-6"
                >
                  <div>
                    {/* Project Label & Status */}
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                      <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        {auraProject.label || "01 / AI CREATIVE INTELLIGENCE"}
                      </span>
                      <StatusBadge status={auraProject.status} />
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {auraProject.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-cyan-300 font-medium mt-2 tracking-wide">
                      "{auraProject.tagline || "One Intelligence. Infinite Possibilities."}"
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 font-light">
                      {auraProject.description}
                    </p>
                  </div>

                  {/* Feature Modules as Elegant Pills */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold block">
                      CREATIVE INTELLIGENCE MODULES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(auraProject.featurePills || [
                        "Aura Create",
                        "Aura Canvas",
                        "Aura Studio",
                        "Aura Write",
                        "Aura Voice",
                        "Aura Vision"
                      ]).map((pill) => (
                        <span
                          key={pill}
                          className="px-3 py-1.5 bg-slate-900/90 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/30 rounded-xl font-mono text-xs text-cyan-200 transition-colors flex items-center gap-1.5"
                        >
                          <Zap className="w-3 h-3 text-cyan-400" />
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technology Tags */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      TECHNOLOGY ARCHITECTURE
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {auraProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-slate-900/80 border border-slate-800/80 rounded-lg font-mono text-[10px] text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => setSelectedCaseStudy(auraProject)}
                      className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer group/btn"
                    >
                      <span>Explore Aura AI</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => setSelectedCaseStudy(auraProject)}
                      className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>View Case Study</span>
                    </button>
                  </div>
                </motion.div>

                {/* Right Side: Interactive AI Interface Visual Showcase */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={innerStaggerRight}
                  className="w-full lg:w-[500px] shrink-0 flex flex-col justify-center"
                >
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative group/preview">
                    
                    {/* Header Bar */}
                    <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 font-mono text-[10px] text-slate-400 font-semibold tracking-wider">
                          AURA_STUDIO_V2.4.EXE
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        LIVE AI CANVAS
                      </span>
                    </div>

                    {/* Studio Navigation Tabs */}
                    <div className="flex border-b border-slate-800 bg-slate-950/50">
                      {[
                        { id: "canvas", label: "Aura Canvas", icon: Layout },
                        { id: "write", label: "Aura Write", icon: MessageSquare },
                        { id: "vision", label: "Aura Vision", icon: Eye },
                        { id: "voice", label: "Aura Voice", icon: Volume2 }
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTabAura === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTabAura(tab.id as any)}
                            className={`flex-1 py-2.5 px-2 font-mono text-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                              isActive
                                ? "bg-slate-900 text-cyan-400 border-b-2 border-cyan-400 font-bold"
                                : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <Icon className="w-3 h-3" />
                            <span className="hidden sm:inline">{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Interactive Tab Visual Body */}
                    <div className="p-5 h-[260px] bg-slate-950/80 flex flex-col justify-between relative overflow-hidden">
                      {/* Background grid mockup lines */}
                      <div className="absolute inset-0 bg-[radial-gradient(#38bdf810_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                      {activeTabAura === "canvas" && (
                        <div className="space-y-3 my-auto relative z-10">
                          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                              <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                                <Wand2 className="w-3 h-3" /> Aura Canvas Generation
                              </span>
                              <span>98.4% Confidence</span>
                            </div>
                            <p className="text-xs text-slate-200 font-mono">
                              &gt; Synthesizing 3D vector illustration for high-converting landing section...
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="aspect-video bg-gradient-to-tr from-blue-900/40 to-cyan-900/40 border border-cyan-500/30 rounded-lg flex items-center justify-center text-[9px] font-mono text-cyan-300">
                              [Canvas #1]
                            </div>
                            <div className="aspect-video bg-gradient-to-tr from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-lg flex items-center justify-center text-[9px] font-mono text-purple-300">
                              [Canvas #2]
                            </div>
                            <div className="aspect-video bg-gradient-to-tr from-emerald-900/40 to-cyan-900/40 border border-emerald-500/30 rounded-lg flex items-center justify-center text-[9px] font-mono text-emerald-300">
                              [Canvas #3]
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTabAura === "write" && (
                        <div className="space-y-3 my-auto relative z-10 font-mono text-xs">
                          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-500 block">&gt; PROMPT INPUT</span>
                            <p className="text-slate-300">"Draft a product overview for an AI startup..."</p>
                          </div>
                          <div className="p-3 bg-blue-950/40 border border-cyan-500/30 rounded-xl text-cyan-200 text-[11px] leading-relaxed">
                            Aura AI brings generation, vision, and reasoning into a unified creative workspace...
                          </div>
                        </div>
                      )}

                      {activeTabAura === "vision" && (
                        <div className="space-y-3 my-auto relative z-10">
                          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center gap-3">
                            <Scan className="w-8 h-8 text-cyan-400 shrink-0 animate-pulse" />
                            <div>
                              <span className="text-xs font-mono text-white block font-bold">Multimodal Vision Inspection</span>
                              <span className="text-[10px] font-mono text-slate-400">Analyzed 1200x800 resolution image input</span>
                            </div>
                          </div>
                          <div className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-lg text-[10px] font-mono text-emerald-400">
                            ✓ Detected: UI Layout Wireframe, Glassmorphism, Dark Atmosphere
                          </div>
                        </div>
                      )}

                      {activeTabAura === "voice" && (
                        <div className="space-y-3 my-auto relative z-10 flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                            <Volume2 className="w-6 h-6 animate-pulse" />
                          </div>
                          <span className="text-xs font-mono text-cyan-300 font-bold">Aura Neural Voice Pipeline</span>
                          <div className="flex gap-1 items-center justify-center h-6">
                            {[40, 70, 30, 90, 60, 100, 50, 80, 40].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-cyan-400 rounded-full animate-pulse"
                                style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer Prompt Input Bar */}
                      <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono text-slate-400">
                        <span className="truncate pr-2">Ask Aura AI anything...</span>
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-[9px] font-bold">⌘ ENTER</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </GlowCard>
          </div>
        </motion.div>

        {/* ==================================================================== */}
        {/* FEATURED PROJECT 02 — SMART LEAVE MANAGEMENT */}
        {/* ==================================================================== */}
        <motion.div
          id="project-02"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={cardRevealVariants}
          className="mb-24 group"
        >
          <GlowCard
            glowColor="rgba(59, 130, 246, 0.15)"
            className="bg-slate-950/90 backdrop-blur-3xl p-6 sm:p-10 lg:p-12 border border-slate-800/80"
          >
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-stretch justify-between">
              
              {/* Details Column */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={innerStaggerLeft}
                className="flex-1 flex flex-col justify-between space-y-6"
              >
                <div>
                  {/* Label & Status */}
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      <Workflow className="w-3.5 h-3.5 text-blue-400" />
                      {leaveProject.label || "02 / FULL-STACK SYSTEM"}
                    </span>
                    <StatusBadge status={leaveProject.status} />
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    {leaveProject.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-blue-300 font-medium mt-2 tracking-wide">
                    "{leaveProject.tagline || "From Request to Approval. Completely Digital."}"
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 font-light">
                    {leaveProject.description}
                  </p>
                </div>

                {/* Workflow Sequence Visual Pills */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold block">
                    AUTOMATED APPROVAL WORKFLOW SEQUENCE
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      "STUDENT",
                      "APPLY LEAVE",
                      "MENTOR REVIEW",
                      "APPROVE / REJECT",
                      "AUTO-GENERATED PDF LETTER"
                    ].map((step, idx, arr) => (
                      <React.Fragment key={step}>
                        <span className="px-2.5 py-1 bg-slate-900/90 border border-slate-800 rounded-lg font-mono text-[10px] text-blue-300 font-semibold">
                          {step}
                        </span>
                        {idx < arr.length - 1 && (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Highlight Features */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    CORE SYSTEM CAPABILITIES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(leaveProject.featurePills || [
                      "Role-Based Authentication",
                      "Student Dashboard",
                      "Mentor Approval Workflow",
                      "Admin Management",
                      "PDF Leave Letter Generation",
                      "Approval Reference Number"
                    ]).map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Tags */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {leaveProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-900/80 border border-slate-800/80 rounded-lg font-mono text-[10px] text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => setSelectedCaseStudy(leaveProject)}
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer group/btn"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setSelectedCaseStudy(leaveProject)}
                    className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>View Case Study</span>
                  </button>
                </div>
              </motion.div>

              {/* Realistic Dashboard & PDF Letter Preview */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={innerStaggerRight}
                className="w-full lg:w-[480px] shrink-0 flex flex-col justify-center"
              >
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
                  
                  {/* Header Bar */}
                  <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-blue-400 font-bold flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      INSTITUTIONAL PORTAL
                    </span>
                    <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                      ROLE: MENTOR / ADMIN
                    </span>
                  </div>

                  {/* Mock Dashboard Layout */}
                  <div className="p-5 space-y-4 bg-slate-950/80">
                    {/* Status Stats Row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 block uppercase">PENDING APPROVALS</span>
                        <span className="text-lg font-mono font-bold text-amber-400">02 Requests</span>
                      </div>
                      <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 block uppercase">VERIFIED LETTERS</span>
                        <span className="text-lg font-mono font-bold text-emerald-400">148 Approved</span>
                      </div>
                    </div>

                    {/* PDF Document Preview Card */}
                    <div className="p-4 bg-slate-900 border border-blue-500/30 rounded-xl space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-blue-400" />
                          <span className="font-mono text-xs text-white font-bold">APPROVED LEAVE PERMIT</span>
                        </div>
                        <span className="font-mono text-[9px] text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded">
                          #REF-2026-8894
                        </span>
                      </div>

                      <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Student:</span>
                          <span className="text-slate-200 font-semibold">Rajesh A. (21CS042)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Reason:</span>
                          <span>Hackathon Participation</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Status:</span>
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            ✓ Mentor Approved
                          </span>
                        </div>
                      </div>

                      {/* Mock PDF Seal Badge */}
                      <div className="p-2 bg-blue-950/50 border border-blue-500/20 rounded-lg flex items-center justify-between text-[10px] font-mono text-cyan-300">
                        <span>Digital PDF Stamp Attached</span>
                        <span className="underline cursor-pointer">Download PDF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </GlowCard>
        </motion.div>

        {/* ==================================================================== */}
        {/* FEATURED PROJECT 03 — AI CROP DOCTOR */}
        {/* ==================================================================== */}
        <motion.div
          id="project-03"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={cardRevealVariants}
          className="mb-12 group"
        >
          <GlowCard
            glowColor="rgba(34, 197, 94, 0.15)"
            className="bg-slate-950/90 backdrop-blur-3xl p-6 sm:p-10 lg:p-12 border border-slate-800/80"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-stretch justify-between">
              
              {/* Left Side: Details */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={innerStaggerLeft}
                className="flex-1 flex flex-col justify-between space-y-6"
              >
                <div>
                  {/* Label & Status */}
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      {cropProject.label || "03 / AI FOR AGRICULTURE"}
                    </span>
                    <StatusBadge status={cropProject.status} />
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    {cropProject.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-emerald-300 font-medium mt-2 tracking-wide">
                    "{cropProject.tagline || "Technology That Helps Every Farmer."}"
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 font-light">
                    {cropProject.description}
                  </p>
                </div>

                {/* AI Diagnostic Workflow Sequence */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold block">
                    AI COMPUTER VISION PIPELINE
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      "UPLOAD CROP IMAGE",
                      "AI VISION ANALYSIS",
                      "DISEASE DETECTION",
                      "TREATMENT RECOMMENDATION"
                    ].map((step, idx, arr) => (
                      <React.Fragment key={step}>
                        <span className="px-2.5 py-1 bg-slate-900/90 border border-slate-800 rounded-lg font-mono text-[10px] text-emerald-300 font-semibold">
                          {step}
                        </span>
                        {idx < arr.length - 1 && (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Highlight Feature Pills */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    KEY CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(cropProject.featurePills || [
                      "AI Crop Disease Detection",
                      "Tamil Voice Support",
                      "Offline AI Capability",
                      "Weather Prediction",
                      "Fertilizer Suggestions"
                    ]).map((feat) => (
                      <span
                        key={feat}
                        className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-mono text-xs text-emerald-200 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technology Tags */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cropProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-900/80 border border-slate-800/80 rounded-lg font-mono text-[10px] text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => setSelectedCaseStudy(cropProject)}
                    className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer group/btn"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setSelectedCaseStudy(cropProject)}
                    className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Explore Innovation</span>
                  </button>
                </div>
              </motion.div>

              {/* Right Side: AI Scanning Simulation Panel */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={innerStaggerRight}
                className="w-full lg:w-[480px] shrink-0 flex flex-col justify-center"
              >
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
                  
                  {/* Top Bar */}
                  <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1.5">
                      <Scan className="w-3.5 h-3.5 animate-pulse" />
                      AI LEAF DIAGNOSTIC SCAN
                    </span>
                    <span className="font-mono text-[9px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ACCURACY: 98.7%
                    </span>
                  </div>

                  {/* Leaf Scanning Image Mockup with Overlay */}
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                    <img
                      src={cropProject.image}
                      alt="Crop Scanning"
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Animated Scanning Grid Line */}
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse top-1/2 -translate-y-1/2 shadow-lg shadow-emerald-400" />

                    {/* Scanning Target Bounding Box */}
                    <div className="absolute inset-12 border border-emerald-400/60 rounded-xl flex items-center justify-center pointer-events-none">
                      <span className="px-2.5 py-1 bg-slate-950/90 text-emerald-400 font-mono text-[10px] rounded border border-emerald-500/30 font-bold">
                        DISEASE DETECTED: BACTERIAL SPOT
                      </span>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="p-4 bg-slate-950/90 space-y-3">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span className="font-mono text-xs text-slate-200">Tamil Voice Support:</span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-300 font-medium">
                        "மருந்து தெளிக்கும் விவரம்..."
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[10px]">
                        <span className="text-slate-500 block">WEATHER FORECAST</span>
                        <span className="text-cyan-300 font-semibold flex items-center gap-1 mt-0.5">
                          <CloudSun className="w-3 h-3 text-cyan-400" /> 28°C • Optimal Spray
                        </span>
                      </div>
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[10px]">
                        <span className="text-slate-500 block">OFFLINE AI MODE</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                          ✓ Local Inference Ready
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </GlowCard>
        </motion.div>

      </div>

      {/* ==================================================================== */}
      {/* CASE STUDY MODAL — FULL-SCREEN HIGH-END PRESENTATION */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh] text-slate-100"
            >
              {/* Header Bar */}
              <div className="p-6 sm:p-8 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
                <div className="space-y-1.5 pr-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                      {selectedCaseStudy.label || selectedCaseStudy.category}
                    </span>
                    <StatusBadge status={selectedCaseStudy.status} />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                    {selectedCaseStudy.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-2xl transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Scroll Container */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10 font-light">
                
                {/* 1. Hero Image / Interactive Preview Banner */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative group">
                  <img
                    src={selectedCaseStudy.image}
                    alt={selectedCaseStudy.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-300 font-semibold bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800">
                      SYSTEM ARCHITECTURE PREVIEW
                    </span>
                  </div>
                </div>

                {/* 2. Overview */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    1. Project Overview
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedCaseStudy.overview || selectedCaseStudy.description}
                  </p>
                </div>

                {/* 3. Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Problem */}
                  <div className="p-6 bg-slate-950/80 border border-rose-500/30 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4" />
                      2. Problem Statement
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {selectedCaseStudy.problemStatement}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-6 bg-slate-950/80 border border-emerald-500/30 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" />
                      3. Architectural Solution
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {selectedCaseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* 4. Key Features Grid */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    4. Key Capabilities &amp; Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCaseStudy.features.map((feat) => (
                      <div
                        key={feat}
                        className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. System Workflow */}
                {selectedCaseStudy.workflow && selectedCaseStudy.workflow.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <Workflow className="w-5 h-5 text-cyan-400" />
                      5. System Workflow Architecture
                    </h4>
                    <div className="space-y-3">
                      {selectedCaseStudy.workflow.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-start gap-4"
                        >
                          <span className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                            0{idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-0.5">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Technology Stack */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    6. Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseStudy.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs font-mono text-cyan-200 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 7 & 8. Challenges & Roadmap */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {selectedCaseStudy.challengesSolved && (
                    <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                      <h5 className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">
                        7. Engineering Challenges Solved
                      </h5>
                      <ul className="space-y-2 list-disc list-inside text-xs text-slate-300">
                        {selectedCaseStudy.challengesSolved.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCaseStudy.futureImprovements && (
                    <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                      <h5 className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">
                        8. Future Product Roadmap
                      </h5>
                      <ul className="space-y-2 list-disc list-inside text-xs text-slate-300">
                        {selectedCaseStudy.futureImprovements.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                    SYSTEM STATUS:
                  </span>
                  <StatusBadge status={selectedCaseStudy.status} />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={(e) => handleLinkClick(e, "github", selectedCaseStudy)}
                    className="flex-1 sm:flex-initial px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>GITHUB REPOSITORY</span>
                  </button>

                  <button
                    onClick={(e) => handleLinkClick(e, "demo", selectedCaseStudy)}
                    className="flex-1 sm:flex-initial px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>LAUNCH DEMO</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
