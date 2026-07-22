import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { skillCategories } from "../data";
import { Sparkles, Code2, Globe, Server, Database, Cloud, Terminal } from "lucide-react";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...skillCategories.map((c) => c.category)];

  // Helper to get category icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Programming Languages":
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case "Frontend":
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case "Backend":
        return <Server className="w-4 h-4 text-indigo-400" />;
      case "Database":
        return <Database className="w-4 h-4 text-emerald-400" />;
      case "AI & Tools":
        return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case "Deployment":
        return <Cloud className="w-4 h-4 text-purple-400" />;
      default:
        return <Terminal className="w-4 h-4 text-slate-400" />;
    }
  };

  // Filter skills based on tab selection
  const filteredSkills = activeCategory === "All"
    ? skillCategories
    : skillCategories.filter((c) => c.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Dynamic ambient blobs */}
      <div className="absolute top-1/4 right-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <Code2 className="w-3 h-3" />
            CORE CAPABILITIES
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Technical <span className="text-gradient">Skill Inventory</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeCategory === category
                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-[1.02]"
                  : "bg-slate-900 border-slate-800/80 text-slate-400 hover:text-slate-100 hover:border-slate-700 hover:bg-slate-800/50"
              }`}
            >
              {category !== "All" && getCategoryIcon(category)}
              <span>{category}</span>
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSkills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl shadow-xl hover:border-slate-700 transition-colors relative group"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3 className="font-display font-bold text-sm tracking-wide text-white uppercase">
                    {cat.category}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                  [{cat.skills.length} MODULES]
                </span>
              </div>

              {/* Skills Progress List */}
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-mono font-medium text-slate-300 group-hover/skill:text-cyan-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Visual proficiency bar */}
                    <div className="w-full h-1.5 bg-slate-950 border border-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full relative"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
