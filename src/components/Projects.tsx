import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "../data";
import { Project } from "../types";
import { Sparkles, ArrowRight, ExternalLink, Github, CheckCircle2, ChevronRight, X, AlertCircle } from "lucide-react";

// Interactive 3D Card wrapper
function TiltCard({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void; key?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Scale to small rotation angles (-10 to 10 deg)
    const rX = -(mouseY / height) * 15;
    const rY = (mouseX / width) * 15;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
      onClick={onClick}
    >
      <div style={{ transform: "translateZ(30px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "AI", "Full Stack", "System"];

  const getFilteredProjects = () => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "AI") {
      return projects.filter(p => p.title.toLowerCase().includes("ai") || p.techStack.includes("Gemini AI"));
    }
    if (activeFilter === "Full Stack") {
      return projects.filter(p => p.techStack.includes("Node.js") || p.techStack.includes("Express") || p.techStack.includes("React"));
    }
    if (activeFilter === "System") {
      return projects.filter(p => p.techStack.includes("Python") || p.techStack.includes("OpenCV"));
    }
    return projects;
  };

  return (
    <section id="projects" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Visual neon light beams in corner */}
      <div className="absolute top-0 left-1/4 w-[1px] h-[500px] bg-gradient-to-b from-blue-500/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[1px] h-[500px] bg-gradient-to-t from-cyan-500/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
            ENGINEERED SYSTEMS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Featured <span className="text-gradient">Innovations</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Project Filters */}
        <div className="flex justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-xl border transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-cyan-500 border-cyan-400 text-slate-950 font-bold scale-[1.02]"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {getFilteredProjects().map((project) => (
            <TiltCard
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer group h-full"
            >
              <div className="h-full p-6 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl shadow-xl transition-all flex flex-col relative overflow-hidden">
                
                {/* Image panel */}
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 bg-slate-900 border border-slate-800 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle scan line gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                  
                  {/* Technology Tag overlay */}
                  <div className="absolute top-3 right-3 flex gap-1.5 flex-wrap justify-end">
                    {project.techStack.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-slate-950/80 border border-slate-800 rounded-md font-mono text-[9px] text-cyan-400 tracking-wider"
                      >
                        {tech.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info and text */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-400 transition-colors mb-2 tracking-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-6">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-900/60 flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-[9px] font-mono text-slate-500">
                          #{tech}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                      EXPLORE DETAILS <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Project Details Modal Drawer Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header Close trigger */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Banner screenshot */}
              <div className="aspect-video w-full bg-slate-950 relative overflow-hidden border-b border-slate-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
                  <span className="px-2.5 py-1 text-[9px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                    Core Asset Scan
                  </span>
                </div>
              </div>

              {/* Body info scroll pane */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white tracking-tight mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Interactive feature grid */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider">
                    Key Features &amp; System Integration
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feat) => (
                      <div
                        key={feat}
                        className="p-3 bg-slate-950/50 border border-slate-800/80 rounded-xl flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack used */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider">
                    Development Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/5 border border-blue-500/20 rounded-lg text-xs font-mono text-slate-300 tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                  [ build_ready_to_deploy ]
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold tracking-wide transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Opening secure AI preview deployment sandbox.");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-semibold tracking-wide shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
