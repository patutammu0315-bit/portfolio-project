import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { achievements } from "../data";
import * as Lucide from "lucide-react";

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const renderIcon = (name: string) => {
    const IconComponent = (Lucide as any)[name];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-cyan-400" />;
    }
    return <Lucide.Activity className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <section id="achievements" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 left-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <Lucide.Trophy className="w-3.5 h-3.5" />
            MAJOR MILESTONES
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Honors &amp; <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/80 rounded-2xl flex items-start gap-5 transition-all group"
            >
              {/* Icon badge */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl group-hover:scale-105 group-hover:border-cyan-500/30 transition-all shrink-0">
                {renderIcon(ach.iconName)}
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
