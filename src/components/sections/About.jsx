import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle.jsx';
import { personal, skillGroups, stats } from '../../data/index.js';

function SkillTag({ skill, index, color }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`tag ${color === 'cyan' ? 'tag-cyan' : color === 'amber' ? 'tag-amber' : ''}`}
    >
      {skill}
    </motion.span>
  );
}

function StatCard({ value, label, suffix, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="text-center"
    >
      <div className="font-display font-bold text-3xl md:text-4xl gradient-text-vio">
        {inView ? value : 0}{suffix}
      </div>
      <div className="text-[var(--text-muted)] text-xs font-mono mt-1 tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionTitle
          label="About Me"
          title="Bridging AI Research & Production"
          subtitle={personal.tagline}
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Bio + Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="space-y-5 mb-10"
            >
              <p className="text-[var(--text-muted)] leading-relaxed text-base">
                As an M.Sc. Artificial Intelligence student at FAU Erlangen‑Nürnberg, I'm actively
                seeking Werkstudent opportunities in AI infrastructure, LLM systems, and applied ML.
                I bring two years of hands-on experience as a Software Development Engineer at
                Securiti.ai, where I helped build production-grade developer tooling and low-latency
                graph infrastructure—balancing rigorous evaluation with pragmatic engineering.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-6 p-6 rounded-2xl glass border border-[var(--border)]"
            >
              {stats.map((stat, i) => (
                <StatCard key={stat.label} {...stat} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Right: Skills */}
          <div className="space-y-6">
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.label}
                custom={groupIndex}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      group.color === 'violet'
                        ? 'bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]'
                        : group.color === 'cyan'
                        ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                        : 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                    }`}
                  />
                  <h3 className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
                    {group.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <SkillTag key={skill} skill={skill} index={i} color={group.color} />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Currently learning */}
            <motion.div
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="mt-4 p-4 rounded-xl glass border border-emerald-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase">
                  Currently Exploring
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Mamba SSMs', 'DiffTransformer', 'Test-Time Training', 'World Models'].map(
                  (item, i) => (
                    <span
                      key={item}
                      className="tag"
                      style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        borderColor: 'rgba(16, 185, 129, 0.2)',
                        color: '#34d399',
                      }}
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
