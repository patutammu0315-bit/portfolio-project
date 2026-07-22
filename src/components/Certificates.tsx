import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { certificates } from "../data";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";

export default function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            VERIFIED CREDENTIALS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Licenses &amp; <span className="text-gradient">Certifications</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 bg-slate-950/40 border border-slate-800/60 hover:border-blue-500/30 rounded-2xl flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Visual placeholder badge header */}
                <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-900 relative mb-5 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-950/20" />
                  <Award className="w-10 h-10 text-cyan-500/30 group-hover:scale-110 group-hover:text-cyan-400/50 transition-all duration-300 z-10" />
                  
                  {/* Digital glow lines */}
                  <div className="absolute inset-x-4 bottom-4 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
                  
                  {/* Overlay tags */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-slate-900/90 border border-slate-800 rounded font-mono text-[8px] text-slate-400">
                    {cert.issuer.toUpperCase()}
                  </div>
                </div>

                <h3 className="font-display font-bold text-sm text-white group-hover:text-cyan-400 transition-colors tracking-tight line-clamp-1">
                  {cert.title}
                </h3>
                <p className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                  Issued by: {cert.issuer}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-400">
                  <Calendar className="w-3 h-3 text-cyan-500" />
                  <span>{cert.date}</span>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Retrieving verified credential record for ${cert.title}.`);
                  }}
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
                >
                  VERIFY RECORD <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
