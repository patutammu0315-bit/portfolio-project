import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing systems...");

  useEffect(() => {
    const statuses = [
      "Connecting to neural gateway...",
      "Mapping local vector stores...",
      "Configuring prompt frameworks...",
      "Loading tech assets...",
      "Rajesh Profile Ready."
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        
        // Progress text updates
        const nextProg = prev + Math.floor(Math.random() * 12) + 3;
        const boundedProg = Math.min(nextProg, 100);
        
        // Match status text to progress
        const index = Math.min(
          Math.floor((boundedProg / 100) * statuses.length),
          statuses.length - 1
        );
        setStatusText(statuses[index]);

        return boundedProg;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#090d16] text-white"
      >
        {/* Glowing grid effect in background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="w-full max-w-sm px-6 text-center z-10">
          {/* Logo badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-mono text-blue-400 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              SYSTEM CORE LOAD
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display text-3xl font-bold tracking-tight mb-2 text-white"
          >
            RAJESH<span className="text-cyan-400">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
            className="text-xs font-mono text-slate-400 mb-8 uppercase tracking-[0.2em]"
          >
            AI Full Stack Architect
          </motion.p>

          {/* Loading progress bar */}
          <div className="relative w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-3">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
              style={{ width: `${progress}%` }}
              layoutId="progressBar"
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span className="text-slate-400">{statusText}</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Binary numbers waterfall or neat decorative border decoration */}
        <div className="absolute bottom-6 font-mono text-[9px] text-slate-700 tracking-widest uppercase">
          [ ECE Student // prompt_engineer_v1.0.0 ]
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
