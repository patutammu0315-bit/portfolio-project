import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { experience } from "../data";
import { BookOpen, Calendar, Milestone, Terminal } from "lucide-react";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-1/4 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <BookOpen className="w-3 h-3" />
            TIMELINE LOGS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Learning <span className="text-gradient">Journey</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Experience Timeline Grid */}
        <div className="relative border-l border-slate-800/80 ml-4 md:ml-12 max-w-4xl mx-auto pl-8 sm:pl-12 space-y-12">
          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-6 h-6 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center group-hover:border-cyan-500/60 group-hover:bg-blue-950/20 transition-all z-10">
                <Milestone className="w-3.5 h-3.5 text-cyan-400" />
              </div>

              {/* Time card */}
              <div className="p-6 bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 rounded-2xl shadow-xl transition-all relative">
                {/* Duration Badge */}
                <div className="absolute top-6 right-6 inline-flex items-center gap-1 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[9px] font-mono text-slate-400">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{item.duration.toUpperCase()}</span>
                </div>

                <div className="mb-4">
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    {item.role}
                  </h3>
                  <p className="font-mono text-xs text-cyan-400 mt-1">
                    {item.company}
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex gap-2 items-start text-xs text-slate-300 leading-relaxed">
                      <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags footer */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-900/40">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded-md font-mono text-[9px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
