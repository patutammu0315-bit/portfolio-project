import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Code, Terminal } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Journey", href: "#journey" },
    { label: "GitHub", href: "#github" },
    { label: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active link detection
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-blue-950/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2 group font-display font-bold text-lg tracking-wider"
        >
          <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg group-hover:border-cyan-500/40 transition-colors">
            <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-white group-hover:text-cyan-400 transition-colors">
            RAJESH<span className="text-blue-500">.</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 border border-slate-800/40 rounded-full backdrop-blur-sm">
          {navItems.map((item) => {
            const isItemActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full tracking-wide transition-all duration-300 relative ${
                  isItemActive
                    ? "text-cyan-400 font-semibold"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {isItemActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button: Get in touch */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide border border-blue-500/30 text-white hover:text-cyan-400 bg-blue-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 rounded-full transition-all duration-300"
          >
            <Code className="w-3.5 h-3.5" />
            Connect AI
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 text-slate-400 hover:text-white md:hidden border border-slate-800 rounded-lg bg-slate-900/50"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-lg absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navItems.map((item) => {
                const isItemActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-4 py-2 text-sm font-medium rounded-xl tracking-wide transition-all ${
                      isItemActive
                        ? "bg-blue-500/10 border border-blue-500/20 text-cyan-400 font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="h-px bg-slate-800/80 my-2" />
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full text-center px-4 py-2.5 text-xs font-semibold tracking-wider bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white font-medium"
              >
                Let's Connect
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
