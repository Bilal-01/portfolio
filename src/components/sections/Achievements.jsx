import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { ExternalLink, Trophy } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle.jsx';
import { achievements, stats, personal } from '../../data/index.js';

const colorMap = {
  violet: { glow: 'rgba(139,92,246,0.25)', border: 'rgba(139,92,246,0.25)', text: '#a78bfa', bg: 'rgba(139,92,246,0.08)' },
  cyan: { glow: 'rgba(34,211,238,0.2)', border: 'rgba(34,211,238,0.25)', text: '#22d3ee', bg: 'rgba(34,211,238,0.07)' },
  amber: { glow: 'rgba(245,158,11,0.2)', border: 'rgba(245,158,11,0.25)', text: '#fbbf24', bg: 'rgba(245,158,11,0.07)' },
};

function AnimatedStat({ value, label, suffix, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative group flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl glass border border-[var(--border)] hover:border-violet-500/30 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="font-display font-extrabold text-4xl md:text-5xl gradient-text-vio relative z-10">
        {inView ? (
          <CountUp end={value} duration={2.5} separator="," suffix={suffix} />
        ) : (
          `0${suffix}`
        )}
      </div>
      <div className="text-[var(--text-muted)] text-xs font-mono mt-2 tracking-widest uppercase text-center">
        {label}
      </div>
    </motion.div>
  );
}

function AchievementCard({ achievement, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const c = colorMap[achievement.color] || colorMap.violet;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass border border-[var(--border)] rounded-2xl p-5 hover:border-opacity-60 transition-all duration-300 overflow-hidden"
      style={{ '--hover-border': c.border }}
      whileHover={{ y: -3, boxShadow: `0 12px 40px ${c.glow}` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at top left, ${c.bg}, transparent 70%)` }}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: c.bg, border: `1px solid ${c.border}` }}
            >
              {achievement.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-sm">{achievement.title}</h3>
              <span className="text-xs font-mono" style={{ color: c.text }}>
                {achievement.year}
              </span>
            </div>
          </div>
          <a
            href={achievement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-[var(--text-dim)] hover:text-white hover:bg-white/5 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} />
          </a>
        </div>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="section relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionTitle
          label="Achievements"
          title="Milestones & Recognition"
          subtitle={personal.tagline}
        />

        {/* Animated stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* Achievement badge header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <Trophy size={16} className="text-amber-400" />
          <h3 className="font-display font-bold text-white text-xl">Notable Highlights</h3>
        </motion.div>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach, i) => (
            <AchievementCard key={ach.id} achievement={ach} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
