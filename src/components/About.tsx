import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { stats, ownerInfo } from "../data";
import * as Lucide from "lucide-react";

// Dynamic stat counter component
interface CounterProps {
  value: number;
  suffix: string;
}

function StatCounter({ value, suffix }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500; // ms
    const increment = value / (duration / 16); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
      {count}
      <span className="text-cyan-400 font-extrabold">{suffix}</span>
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  // Dynamically resolve icon based on string name
  const renderIcon = (name: string) => {
    // Dynamically retrieve the component from the Lucide object
    const IconComponent = (Lucide as any)[name];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-cyan-400" />;
    }
    return <Lucide.Activity className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <Lucide.User className="w-3 h-3" />
            IDENTITY REPORT
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            About <span className="text-gradient">Rajesh</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Avatar Panel */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="relative group w-full max-w-[340px]"
            >
              {/* Glowing decorative gradient borders */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-3xl opacity-30 blur-md group-hover:opacity-60 transition duration-500" />
              
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={ownerInfo.avatar}
                  alt={ownerInfo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* HUD overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                
                {/* Tech overlays */}
                <div className="absolute bottom-4 left-4 right-4 p-4 glass-panel border border-slate-700/50 rounded-xl">
                  <div className="font-mono text-[10px] text-cyan-400 tracking-wider">STATUS: ACTIVE</div>
                  <div className="font-display text-sm font-semibold text-white mt-1">Rajesh</div>
                  <div className="font-mono text-[9px] text-slate-400 mt-0.5">ECE student • AI builder</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Information Block */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Electronics and Communication Engineering Student &amp; AI Builder
              </h3>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {ownerInfo.about}
              </p>

              <div className="h-px bg-slate-800/60 my-6" />

              {/* Sub-narrative points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Lucide.Sparkles className="w-4 h-4 text-yellow-400" />
                    <h4 className="font-display font-semibold text-xs text-white tracking-wide uppercase">My Passion for AI</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Engineering custom prompt pipelines, researching agent models, and translating visual context into machine action.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Lucide.GraduationCap className="w-4 h-4 text-blue-400" />
                    <h4 className="font-display font-semibold text-xs text-white tracking-wide uppercase">Future Vision</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    To engineer fully autonomous application ecosystems that assist in specialized medicine, global farming, and smart education.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Statistics section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-slate-950/30 border border-slate-800/60 rounded-2xl flex flex-col items-center text-center shadow-md relative hover:border-blue-500/20 transition-colors"
            >
              {/* Small glowing background dot */}
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping opacity-30" />
              
              <div className="mb-4 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                {renderIcon(stat.iconName)}
              </div>

              <StatCounter value={stat.value} suffix={stat.suffix} />

              <span className="mt-2 text-xs font-mono tracking-wider text-slate-400 uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
