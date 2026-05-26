import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin, Github, Linkedin, Threads, Twitter, MessageSquare, Loader2, Phone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import SectionTitle from '../ui/SectionTitle.jsx';
import { personal } from '../../data/index.js';

const INITIAL = { name: '', email: '', subject: '', message: '' };

function WhatsAppIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.75 12.01C21.75 17.22 17.21 21.76 12 21.76C8.98 21.76 6.3 20.41 4.55 18.36L3 21.75L6.48 20.2C8.44 21.58 10.96 22.35 13.62 22.35C18.83 22.35 23.37 17.81 23.37 12.6C23.37 7.39 18.83 2.85 13.62 2.85C8.41 2.85 3.87 7.39 3.87 12.6C3.87 14.87 4.6 16.99 5.9 18.66" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.2 14.2C16.6 15.1 15.7 15.6 14.6 15.8C13.4 16 12.2 15.6 11.3 14.9C10.1 13.9 9.2 12.1 9.1 10.8C8.9 9.6 9.2 8.5 9.9 7.6C10.1 7.3 10.2 7 10 6.8C9.8 6.6 9.5 6.6 9.1 6.8C8 7.5 7.1 8.9 6.9 10.6C6.6 13 8 15.1 9.7 16.6C11.1 17.8 13.1 18.6 15.1 18.4C16.3 18.3 17.3 17.8 17.9 17.1C18.1 16.8 18 16.5 17.7 16.3C17.4 16.2 17.1 16.2 16.9 16.4Z" fill="currentColor"/>
    </svg>
  );
}

const contacts = [
  { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: MapPin, label: 'Location', value: personal.location, href: '#' },
  { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
];
const socials = [
  { icon: Github, label: 'GitHub', href: personal.socials.github },
  { icon: Linkedin, label: 'LinkedIn', href: personal.socials.linkedin },
  { icon: Twitter, label: 'Threads', href: personal.socials.twitter },
  { icon: WhatsAppIcon, label: 'WhatsApp', href: `https://wa.me/${personal.phone.replace(/\D/g, '')}` },
];

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all required fields.');
      return;
    }
    setLoading(true);
    const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const EMAILJS_USER = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_USER) {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE,
            template_id: EMAILJS_TEMPLATE,
            user_id: EMAILJS_USER,
            template_params: {
              name: form.name,
              from_email: form.email,
              time: new Date().toLocaleString(),
              title: form.subject || 'Website message',
              message: form.message,
            },
          }),
        });
        if (!res.ok) throw new Error('Email send failed');
      } else {
        // Fallback: open user's mail client if EmailJS not configured
        const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
        const subject = encodeURIComponent(form.subject || 'Website message');
        window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      }

      setForm(INITIAL);
      toast.custom(() => (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="flex items-center gap-3 px-5 py-4 rounded-2xl glass border border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
        >
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <MessageSquare size={14} className="text-violet-400" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Message sent!</p>
            <p className="text-[var(--text-muted)] text-xs">I'll get back to you within 24h.</p>
          </div>
        </motion.div>
      ), { duration: 4000 });
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <section id="contact" className="section relative">
      <Toaster position="bottom-right" toastOptions={{ style: { background: 'transparent', boxShadow: 'none', padding: 0 } }} />
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionTitle
          label="Contact"
          title="Let's Build Something Together"
          subtitle={personal.tagline}
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            {contacts.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                custom={i}
                variants={itemVariant}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex items-center gap-4 p-4 rounded-2xl glass border border-[var(--border)] hover:border-violet-500/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                  <Icon size={16} className="text-violet-400" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-dim)] mb-0.5">{label}</div>
                  <div className="text-sm text-white font-medium">{value}</div>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <motion.div
              custom={2}
              variants={itemVariant}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="p-4 rounded-2xl glass border border-[var(--border)]"
            >
              <p className="text-xs font-mono text-[var(--text-dim)] tracking-widest uppercase mb-4">
                Find me on
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center min-w-0 gap-2 px-3 py-2 rounded-xl glass border border-[var(--border)] hover:border-violet-500/40 text-[var(--text-muted)] hover:text-violet-400 transition-all text-xs font-medium"
                  >
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                      <Icon size={14} />
                    </span>
                    <span className="truncate hidden sm:inline">{label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              custom={3}
              variants={itemVariant}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 text-xs font-mono font-medium tracking-wide uppercase">
                  Available
                </span>
              </div>
              <p className="text-[var(--text-muted)] text-sm">
                Open to senior/staff roles in AI infrastructure, LLM systems, and applied ML.
              </p>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.form
            custom={1}
            variants={itemVariant}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass border border-[var(--border)] rounded-3xl p-6 md:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 tracking-wide">
                  Name <span className="text-violet-400">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Linus Torvalds"
                  className="floating-input"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 tracking-wide">
                  Email <span className="text-violet-400">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="floating-input"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 tracking-wide">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project collaboration, job opportunity..."
                className="floating-input"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 tracking-wide">
                Message <span className="text-violet-400">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                className="floating-input"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold text-sm transition-all shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Sending…</>
              ) : (
                <><Send size={15} /> Send Message</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
