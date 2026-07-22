import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Achievements from "./components/Achievements";
import GitHubSection from "./components/GitHubSection";
import ResumeSection from "./components/ResumeSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-400">
          {/* Custom Trail Cursor */}
          <CustomCursor />

          {/* Core Layout Navigation */}
          <Navbar />

          {/* Page Sections */}
          <main>
            {/* Hero Banner Section */}
            <Hero />

            {/* About Profile Section */}
            <About />

            {/* Skills Progress Inventory Section */}
            <Skills />

            {/* Featured Engineered Projects Section */}
            <Projects />

            {/* Learning Timelines & Experience Logs Section */}
            <Experience />

            {/* Certifications Credentials Section */}
            <Certificates />

            {/* Achievements Honors Section */}
            <Achievements />

            {/* GitHub Contributions Matrix Section */}
            <GitHubSection />

            {/* Professional Digital Resume Section */}
            <ResumeSection />

            {/* Secure Transmission Contact Section */}
            <Contact />
          </main>

          {/* Footer Coordinates & Scroll To Top */}
          <Footer />
        </div>
      )}
    </>
  );
}
