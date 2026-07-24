import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ownerInfo } from "../data";
import { Download, FileText, Printer, CheckCircle2, Eye, X, BookOpen, Briefcase, Award } from "lucide-react";

export default function ResumeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showFullView, setShowFullView] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Rajesh_Resume.pdf downloaded successfully in simulation mode.");
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const ResumeContent = () => (
    <div className="bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-2xl border border-slate-200/50 max-w-4xl mx-auto font-sans">
      {/* Header section */}
      <div className="border-b-2 border-blue-600 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">RAJESH</h1>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mt-1">
            AI-Powered Full Stack Developer
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
            <span>Tamil Nadu, India</span>
            <span>•</span>
            <span>demigodgamingawn@gmail.com</span>
          </div>
        </div>

        <div className="text-left sm:text-right text-xs text-slate-500">
          <p>github.com/rajesh-ai</p>
          <p>linkedin.com/in/rajesh-dev</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Skills & Ed) */}
        <div className="space-y-6 md:border-r md:border-slate-100 md:pr-6">
          {/* Education */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Education
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900">B.E. Electronics &amp; Communication Engineering</h4>
                <p className="text-[11px] text-slate-600">Expected Graduation: 2027</p>
              </div>
            </div>
          </div>

          {/* Technical Inventory */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              Technical Skillset
            </h3>
            <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed">
              <div>
                <span className="font-bold text-slate-800 block">Languages:</span>
                HTML, CSS, JavaScript, Python, C, Java
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Frontend:</span>
                React, Tailwind CSS
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Backend &amp; DB:</span>
                Node.js, Express.js, MySQL, MongoDB
              </div>
              <div>
                <span className="font-bold text-slate-800 block">AI &amp; Tools:</span>
                Prompt Engineering, Google AI Studio, Gemini API, OpenAI API, Git, GitHub, Figma, VS Code
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Projects & Experience) */}
        <div className="md:col-span-2 space-y-6">
          {/* Objective */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              Professional Summary
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Motivated ECE student and aspiring AI full-stack engineer. Experienced in integrating deep language model capabilities with robust React and Node architectures. Actively building products like crop diagnostics and resume scrapers, continuously improving ATS metrics and farmer experiences.
            </p>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-3.5 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Selected Engineering Projects
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-900">Aura AI</h4>
                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">NEXT.JS • GEMINI</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Unified multimodal creative workspace featuring Aura Canvas, Studio, Write, Voice, Vision, and image/video synthesis.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-900">Smart Leave Management System</h4>
                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">REACT • EXPRESS • PRISMA</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Full-stack college leave platform with multi-role RBAC, online mentor approval workflow, and PDFKit letter generation.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-900">AI Crop Doctor</h4>
                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">PYTHON • COMPUTER VISION</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Agritech computer vision platform for instant leaf disease diagnosis, Tamil voice recommendations, and weather insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="resume" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <FileText className="w-3.5 h-3.5" />
            RESUME PROTOCOL
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional <span className="text-gradient">Resume</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Action Controls & Preview */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Controls Menu */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white">Rajesh_Resume.pdf</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">SIZE: ~284 KB // SECURE ENCRYPTED</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* View full-screen button */}
              <button
                onClick={() => setShowFullView(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-white rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View Fullscreen</span>
              </button>

              {/* Download Resume button */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-semibold tracking-wide shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
              >
                <Download className={`w-4 h-4 ${downloading ? "animate-bounce" : ""}`} />
                <span>{downloading ? "Downloading..." : "Download PDF"}</span>
              </button>
            </div>
          </div>

          {/* Mini preview container */}
          <div className="relative group max-h-[420px] overflow-hidden rounded-2xl border border-slate-800/60 shadow-2xl relative">
            <div className="absolute inset-0 bg-slate-950/25 pointer-events-none z-10" />
            
            {/* Smooth scrolling visual mock */}
            <div className="origin-top scale-[0.95] sm:scale-100 transition-transform duration-500 pointer-events-none opacity-40 group-hover:opacity-60">
              <ResumeContent />
            </div>

            {/* Glowing inspect tag overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs opacity-100 group-hover:bg-slate-950/60 transition-all z-20">
              <button
                onClick={() => setShowFullView(true)}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>OPEN DIGITAL PORTAL SCANNER</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen modal view */}
      <AnimatePresence>
        {showFullView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Modal header actions */}
              <div className="p-4 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-widest pl-2">
                  [ Secure Document Gate ]
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                    title="Print Document"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleDownload}
                    className="p-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl transition-colors cursor-pointer"
                    title="Download Document"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setShowFullView(false)}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Scroll pane */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950">
                <ResumeContent />
              </div>

              <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-center">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                  © 2026 RAJESH • ELECTRONICS &amp; COMMUNICATION ENGINEERING CORES
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
