import { useActiveSection } from './hooks/useActiveSection.js';
import ParticleCanvas from './components/ui/ParticleCanvas.jsx';
import CustomCursor from './components/ui/CustomCursor.jsx';
import ScrollProgress from './components/ui/ScrollProgress.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Experience from './components/sections/Experience.jsx';
import Projects from './components/sections/Projects.jsx';
import Blogs from './components/sections/Blogs.jsx';
import Achievements from './components/sections/Achievements.jsx';
import Contact from './components/sections/Contact.jsx';

const SECTIONS = ['hero', 'about', 'experience', 'projects', 'blogs', 'achievements', 'contact'];

export default function App() {
  const activeSection = useActiveSection(SECTIONS);

  return (
    <div className="relative min-h-screen bg-void text-white font-body">
      {/* Persistent background */}
      <ParticleCanvas />

      {/* Fixed UI elements */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar activeSection={activeSection} />

      {/* Ambient background gradient blobs (fixed, global) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #8b5cf6, transparent 70%)',
            top: '-10%',
            right: '-10%',
            animation: 'float 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
            bottom: '10%',
            left: '-5%',
            animation: 'float 15s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Blogs />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
