import { useEffect, useState } from "react";
import { ChevronUp, Terminal } from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-8 bg-slate-950 border-t border-slate-900/80 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
          <Terminal className="w-3.5 h-3.5 text-cyan-500" />
          <span>Designed &amp; Developed by <span className="text-slate-300 font-semibold">Rajesh</span></span>
        </div>

        {/* Right */}
        <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
          © 2026 Rajesh • All Rights Reserved.
        </span>

        {/* Floating Back to Top Button */}
        {showScrollTop && (
          <button
            onClick={handleScrollTop}
            className="fixed bottom-6 right-6 p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl shadow-2xl z-40 transition-all hover:scale-105 cursor-pointer"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4 text-cyan-400" />
          </button>
        )}
      </div>
    </footer>
  );
}
