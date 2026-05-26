import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Star, GitFork, X, Sparkles } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle.jsx';
import { projects, personal } from '../../data/index.js';

function TiltCard({ project, index, onClick }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.02 }}
        onClick={() => onClick(project)}
        className="cursor-pointer glass border border-[var(--border)] rounded-2xl overflow-hidden group relative"
        data-cursor="pointer"
      >
        {/* Top gradient bar */}
        <div
          className={`h-1 w-full bg-gradient-to-r ${project.gradient.replace('/20', '')}`}
          style={{ background: `linear-gradient(90deg, ${project.color}99, ${project.color}33)` }}
        />

        <div className="p-5 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${project.color}18`, border: `1px solid ${project.color}35` }}
            >
              {project.icon}
            </div>
            <div className="flex items-center gap-3">
              {project.featured && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/25 text-amber-400">
                  <Sparkles size={9} /> Featured
                </span>
              )}
              <span
                className="px-2 py-0.5 rounded-full text-xs font-mono"
                style={{ background: `${project.color}12`, border: `1px solid ${project.color}30`, color: project.color }}
              >
                {project.status}
              </span>
            </div>
          </div>

          <h3 className="font-display font-bold text-white text-lg mb-0.5 group-hover:text-violet-300 transition-colors">
            {project.title}
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: project.color }}>
            {project.subtitle}
          </p>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="tag text-[11px] px-2 py-0.5">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="tag text-[11px] px-2 py-0.5">+{project.tech.length - 4}</span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-mono">
              <span className="flex items-center gap-1">
                <Star size={11} className="text-amber-400" />
                {project.stars.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={11} />
                {project.forks}
              </span>
            </div>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-white transition-colors">
                <Github size={14} />
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-white transition-colors">
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}55)` }} />
            <div className="p-7">
              <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors">
                <X size={18} />
              </button>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${project.color}18`, border: `1px solid ${project.color}35` }}>
                  {project.icon}
                </div>
                <div>
                  <h2 className="font-display font-bold text-white text-2xl">{project.title}</h2>
                  <p className="font-mono text-sm" style={{ color: project.color }}>{project.subtitle}</p>
                </div>
              </div>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                {project.longDescription || project.description}
              </p>
              <div className="mb-5">
                <h4 className="font-mono text-xs text-[var(--text-dim)] tracking-widest uppercase mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] font-mono flex-1">
                  <span className="flex items-center gap-1.5"><Star size={13} className="text-amber-400" /> {project.stars.toLocaleString()} stars</span>
                  <span className="flex items-center gap-1.5"><GitFork size={13} /> {project.forks} forks</span>
                </div>
                <div className="flex gap-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-[var(--border)] text-sm text-white font-medium hover:border-white/25 transition-colors">
                    <Github size={14} /> GitHub
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-medium transition-colors"
                      style={{ background: project.color }}>
                      <ExternalLink size={14} /> Live Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="section relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionTitle
          label="Projects"
          title="Things I've Built"
          subtitle={personal.tagline}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((p, i) => (
            <TiltCard key={p.id} project={p} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
