import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Eye, ArrowUpRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle.jsx';
import { blogs, personal } from '../../data/index.js';

const colorMap = {
  violet: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', text: '#a78bfa' },
  cyan: { bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.2)', text: '#22d3ee' },
  amber: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', text: '#fbbf24' },
};

function BlogCard({ blog, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const c = colorMap[blog.color] || colorMap.violet;

  return (
    <motion.a
      ref={ref}
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="block group glass border border-[var(--border)] rounded-2xl p-5 md:p-6 hover:border-white/15 transition-all duration-300"
    >
      {/* Emoji icon */}
      <div className="text-3xl mb-4">{blog.emoji}</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-mono"
            style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
            {tag}
          </span>
        ))}
      </div>

      <h3 className="font-display font-bold text-white text-base md:text-lg leading-snug mb-3 group-hover:text-violet-300 transition-colors line-clamp-2">
        {blog.title}
      </h3>

      <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5 line-clamp-3">
        {blog.excerpt}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-4 text-xs text-[var(--text-dim)] font-mono">
          <span>{blog.date}</span>
          <span className="flex items-center gap-1"><Clock size={10} />{blog.readTime}</span>
          <span className="flex items-center gap-1"><Eye size={10} />{blog.views}</span>
        </div>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-muted)] group-hover:text-violet-400 group-hover:bg-violet-500/10 transition-all">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </motion.a>
  );
}

export default function Blogs() {
  return (
    <section id="blogs" className="section relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionTitle
          label="Writing"
          title="Technical Deep Dives"
          subtitle={personal.tagline}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {blogs.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
}
