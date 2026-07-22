import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { pinnedProjects } from "../data";
import { GitPullRequest, GitFork, Star, Github, ExternalLink, Calendar, Info } from "lucide-react";

export default function GitHubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);

  // Generate mock contribution graph data (18 columns, 7 rows for standard preview grid)
  const generateMockGrid = () => {
    const grid: number[][] = [];
    const seed = [0, 0, 1, 0, 2, 0, 0, 3, 4, 1, 2, 0, 3, 0, 1, 2, 3, 4, 0, 1, 2, 0, 0, 1, 2, 3, 0, 0, 4, 1, 2];
    
    for (let row = 0; row < 7; row++) {
      const rowData: number[] = [];
      for (let col = 0; col < 28; col++) {
        const index = (row * col + col + row) % seed.length;
        rowData.push(seed[index]);
      }
      grid.push(rowData);
    }
    return grid;
  };

  const contributionGrid = generateMockGrid();

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0: return "bg-slate-900 border-slate-950 hover:bg-slate-800";
      case 1: return "bg-emerald-950/60 border-emerald-950 hover:bg-emerald-900";
      case 2: return "bg-emerald-800/80 border-emerald-800 hover:bg-emerald-700";
      case 3: return "bg-emerald-600 border-emerald-600 hover:bg-emerald-500";
      case 4: return "bg-cyan-400 border-cyan-400 hover:bg-cyan-300 shadow-sm shadow-cyan-500/20";
      default: return "bg-slate-900";
    }
  };

  const handleCellHover = (intensity: number, colIndex: number, rowIndex: number) => {
    const commits = intensity * 3 + (intensity > 0 ? Math.floor(Math.random() * 2) : 0);
    const dateObj = new Date(2026, 5, colIndex * 7 + rowIndex);
    const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setHoveredDay({ count: commits, date: formattedDate });
  };

  return (
    <section id="github" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative cyber grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono tracking-wider text-cyan-400 uppercase mb-3">
            <Github className="w-3.5 h-3.5" />
            COMMUNITY TELEMETRY
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Left panel: Statistics & Graph (lg:8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* 1. Contribution Graph Placeholder Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="p-6 bg-slate-950/40 border border-slate-800/80 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-display font-bold text-sm text-white uppercase tracking-wide">
                      Activity Matrix
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] text-slate-500">
                    UTC DATA GRID
                  </span>
                </div>

                {/* The Contribution grid */}
                <div className="overflow-x-auto pb-4 scrollbar-thin">
                  <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-max">
                    {contributionGrid.map((row, rIdx) => 
                      row.map((intensity, cIdx) => (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          onMouseEnter={() => handleCellHover(intensity, cIdx, rIdx)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-3.5 h-3.5 rounded-sm border transition-all cursor-pointer ${getIntensityColor(intensity)}`}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Grid footer / tooltip display */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-900 gap-3">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <Info className="w-4 h-4 text-slate-500" />
                  {hoveredDay ? (
                    <span className="text-cyan-400 font-semibold">
                      {hoveredDay.count} commits on {hoveredDay.date}
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      Hover over grids to analyze daily commit telemetry
                    </span>
                  )}
                </div>

                {/* Graph legends */}
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 bg-slate-900 border border-slate-950 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-emerald-950/60 border border-emerald-950 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-emerald-800/80 border border-emerald-800 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-emerald-600 border border-emerald-600 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-cyan-400 border border-cyan-400 rounded-sm shadow-sm shadow-cyan-500/20" />
                  <span>More</span>
                </div>
              </div>
            </motion.div>

            {/* 2. GitHub Stats Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Total Stars", val: "81", desc: "Across open repos" },
                { label: "Pull Requests", val: "42", desc: "Merged changes" },
                { label: "Followers", val: "120+", desc: "Active community" },
                { label: "Total Commits", val: "1,240+", desc: "Over past 12mo" }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-xl"
                >
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">{stat.label}</span>
                  <span className="block text-xl font-display font-extrabold text-white mt-1">{stat.val}</span>
                  <span className="block text-[9px] font-mono text-slate-400 mt-1">{stat.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right panel: Pinned Projects list (lg:4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
            <div className="space-y-4">
              <span className="block text-xs font-mono text-slate-400 uppercase tracking-widest pl-2">
                📌 Pinned Repositories
              </span>

              {pinnedProjects.map((repo, idx) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/30 rounded-2xl shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display font-bold text-sm text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                    >
                      <GitPullRequest className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{repo.name}</span>
                    </a>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {repo.description}
                  </p>

                  <div className="flex items-center gap-4 pt-3 border-t border-slate-900/40 text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                      <span className="text-slate-400">{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400">
                      <Star className="w-3.5 h-3.5 text-yellow-500" />
                      <span>{repo.stars}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400">
                      <GitFork className="w-3.5 h-3.5 text-blue-400" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View Full profile CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="pt-2"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-200 hover:text-white font-semibold text-xs tracking-wider transition-all"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>EXPLORE ALL REPOSITORIES</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
