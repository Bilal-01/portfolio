import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionTitle({ label, title, subtitle }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 md:mb-20"
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.span
          initial={{ width: 0 }}
          animate={inView ? { width: '2rem' } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px bg-violet-500 block"
        />
        <span className="font-mono text-xs text-violet-400 tracking-widest uppercase">
          {label}
        </span>
        <motion.span
          initial={{ width: 0 }}
          animate={inView ? { width: '2rem' } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px bg-violet-500 block"
        />
      </div>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-muted)] text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
