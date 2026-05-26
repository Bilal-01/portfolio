import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Github, Linkedin, Twitter, Sparkles, MapPin } from 'lucide-react';
import { personal } from '../../data/index.js';

function MagneticButton({ children, className, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.button
        whileTap={{ scale: 0.96 }}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

const typeSequence = personal.roles.flatMap((role) => [role, 2000]);

const socialLinks = [
  { icon: Github, href: personal.socials.github, label: 'GitHub' },
  { icon: Linkedin, href: personal.socials.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: personal.socials.twitter, label: 'Threads' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="bg-blob w-96 h-96 opacity-20"
          style={{ background: '#7c3aed', top: '10%', left: '15%', animationDelay: '0s' }}
        />
        <div
          className="bg-blob w-80 h-80 opacity-15"
          style={{ background: '#06b6d4', top: '60%', right: '10%', animationDelay: '-3s' }}
        />
        <div
          className="bg-blob w-64 h-64 opacity-10"
          style={{ background: '#f59e0b', bottom: '15%', left: '5%', animationDelay: '-6s' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid opacity-30"
          style={{ maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-mono text-xs font-medium">
                Available for opportunities
              </span>
              <span className="text-[var(--text-dim)] mx-1">·</span>
              <MapPin size={11} className="text-[var(--text-dim)]" />
              <span className="text-[var(--text-dim)] text-xs">{personal.location}</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold leading-[1.05] mb-6"
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl text-white mb-1">
              {personal.name.split(' ')[0]}
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl gradient-text">
              {personal.name.split(' ')[1]}
            </span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-mono text-[var(--text-dim)] text-lg">&gt;_</span>
            <span className="font-mono text-xl md:text-2xl text-cyan-400 font-medium min-h-[2rem]">
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={50}
                deletionSpeed={65}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed max-w-2xl mb-10"
          >
            {personal.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <MagneticButton
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]"
              onClick={handleContact}
            >
              <Sparkles size={15} />
              Let's Work Together
            </MagneticButton>

            <MagneticButton
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/15 hover:border-white/30 text-white font-semibold text-sm transition-all"
              onClick={handleProjects}
            >
              View Projects
              <ArrowRight size={15} />
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-[var(--text-muted)] hover:text-violet-400 hover:border-violet-500/40 transition-all duration-200"
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <div className="h-px w-8 bg-[var(--border)]" />
            <span className="text-[var(--text-dim)] text-xs font-mono">
              {personal.email}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[var(--text-dim)] text-xs font-mono tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-violet-500/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
