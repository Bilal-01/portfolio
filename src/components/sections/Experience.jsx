import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle.jsx';
import { experiences, personal } from '../../data/index.js';

function ExperienceCard({ exp, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4 md:gap-8"
    >
      {/* Timeline dot */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg z-10 relative"
          style={{
            background: `${exp.color}18`,
            border: `1px solid ${exp.color}40`,
            boxShadow: `0 0 20px ${exp.color}20`,
          }}
        >
          {exp.logo}
        </motion.div>
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 mt-2 timeline-line min-h-8" />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-10">
        <motion.div
          whileHover={{ y: -2, boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}
          transition={{ duration: 0.2 }}
          className="glass border border-[var(--border)] rounded-2xl p-5 md:p-6 neon-border"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-0.5">{exp.role}</h3>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm" style={{ color: exp.color }}>
                  {exp.company}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-mono"
                  style={{
                    background: `${exp.color}15`,
                    color: exp.color,
                    border: `1px solid ${exp.color}30`,
                  }}
                >
                  {exp.type}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1 font-mono">
                <Calendar size={11} />
                {exp.period}
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={11} />
                {exp.location}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
            {exp.description}
          </p>

          {/* Bullets */}
          <ul className="space-y-2 mb-4">
            {exp.bullets.map((bullet, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + i * 0.06 + 0.3 }}
                className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
              >
                <ChevronRight
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: exp.color }}
                />
                {bullet}
              </motion.li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionTitle
          label="Experience"
          title="Where I've Worked"
          subtitle={personal.tagline}
        />

        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
