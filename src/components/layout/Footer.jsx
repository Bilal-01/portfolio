import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { personal } from '../../data/index.js';

const socials = [
  { icon: Github, href: personal.socials.github, label: 'GitHub' },
  { icon: Linkedin, href: personal.socials.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: personal.socials.twitter, label: 'Threads' },
  { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] py-12 md:py-16 mt-0">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="font-display text-2xl font-bold gradient-text-vio mb-2">
              {personal.initials}
            </div>
            <p className="text-[var(--text-muted)] text-sm max-w-xs leading-relaxed">
              {personal.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-[var(--text-muted)] hover:text-violet-400 text-sm transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl glass border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-violet-400 hover:border-violet-500/40 transition-colors"
                aria-label={label}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
