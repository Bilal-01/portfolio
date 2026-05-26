import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { personal } from '../../data/index.js';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-4 md:mx-8 lg:mx-auto lg:max-w-6xl px-4 md:px-6 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? 'glass border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="font-display font-bold text-lg tracking-tight"
          >
            <span className="gradient-text-vio">{personal.initials}</span>
            <span className="text-[var(--text-dim)] font-mono text-xs ml-2">
              /&gt;
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={`relative px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-[var(--text-muted)] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-violet-500/10 border border-violet-500/25 rounded-lg"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href={personal.resumeUrl}
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/90 hover:bg-violet-500 text-white text-sm font-semibold transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <Download size={14} />
              Resume
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl glass border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-violet-500/15 text-violet-300 border border-violet-500/25'
                        : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              <a
                href={personal.resumeUrl}
                download
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold"
              >
                <Download size={14} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
