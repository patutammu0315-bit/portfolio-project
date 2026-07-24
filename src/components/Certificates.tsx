import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { certificates } from "../data";
import { Certificate } from "../types";
import { Award, Calendar, ExternalLink, ShieldCheck, CheckCircle2, X, Sparkles, Cpu, BookOpen } from "lucide-react";

export default function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCertModal, setActiveCertModal] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[250px] h-[250px] bg-blue-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            VERIFIED TECHNICAL CREDENTIALS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Licenses &amp; <span className="text-gradient">Certifications</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-xl">
            Formal technical certifications, hackathon recognitions, and specialized engineering training.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Certificate Cards Grid (5 items grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveCertModal(cert)}
              className="p-6 bg-slate-950/50 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 rounded-3xl flex flex-col justify-between group transition-all cursor-pointer relative overflow-hidden shadow-xl"
            >
              <div>
                {/* Visual Certificate Badge Header */}
                <div className="h-36 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 relative mb-5 flex flex-col items-center justify-center p-4 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950/50 to-cyan-950/30 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Issuer Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-slate-950/80 border border-slate-800 rounded-md font-mono text-[9px] text-cyan-400 font-bold tracking-wider uppercase z-10">
                    {cert.issuer}
                  </div>

                  <Award className="w-10 h-10 text-cyan-400/80 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300 z-10 my-auto" />
                  
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest z-10 z-10">
                    CERTIFIED CREDENTIAL
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors tracking-tight line-clamp-1 mb-2">
                  {cert.title}
                </h3>

                {/* Focus text */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  <strong className="text-slate-300 font-medium">Focus:</strong> {cert.focus}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.skills.slice(0, 3).map((sk) => (
                    <span key={sk} className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded font-mono text-[9px] text-slate-400">
                      {sk}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded font-mono text-[9px] text-cyan-400">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-900/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{cert.date}</span>
                </div>

                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                  VIEW RECORD <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certification Details Modal */}
      <AnimatePresence>
        {activeCertModal && (
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
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setActiveCertModal(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    {activeCertModal.issuer}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">
                    {activeCertModal.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block font-semibold">
                  CORE CURRICULUM FOCUS
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeCertModal.focus}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block">
                  TECHNICAL SKILLS &amp; CONCEPTS COVERED
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCertModal.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg font-mono text-xs text-cyan-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="font-mono text-[11px] text-slate-400">
                  Issued: <strong className="text-white">{activeCertModal.date}</strong>
                </div>

                <button
                  onClick={() => {
                    alert(`Official certificate credential record for ${activeCertModal.title} issued by ${activeCertModal.issuer}.`);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>OFFICIAL RECORD</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
