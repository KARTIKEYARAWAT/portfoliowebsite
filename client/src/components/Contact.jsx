import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Mail, Github, Linkedin } from 'lucide-react';
import { postContact } from '../api.js';
import SectionWrapper from './SectionWrapper.jsx';

const INITIAL_FORM = { name: '', email: '', message: '' };
const INITIAL_ERRORS = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    let valid = true;
    if (!form.name.trim()) { newErrors.name = 'Name is required'; valid = false; }
    if (!form.email.trim()) { newErrors.email = 'Email is required'; valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { newErrors.email = 'Enter a valid email'; valid = false; }
    if (!form.message.trim()) { newErrors.message = 'Message is required'; valid = false; }
    else if (form.message.trim().length < 10) { newErrors.message = 'Message must be at least 10 characters'; valid = false; }
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await postContact(form);
      if (res.message) {
        setServerMessage(res.message);
        setStatus('success');
        setForm(INITIAL_FORM);
      } else {
        setServerMessage(res.errors?.[0]?.msg || 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      setServerMessage('Failed to send message. Please try again later.');
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-surface border ${
      errors[field] ? 'border-red-500/60' : 'border-border focus:border-accent/60'
    } text-text-primary placeholder-text-muted text-sm focus:outline-none focus:ring-2 ${
      errors[field] ? 'focus:ring-red-500/20' : 'focus:ring-accent/20'
    } transition-all duration-200`;

  return (
    <SectionWrapper className="bg-surface/30">
      <div ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent text-sm font-mono font-semibold tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-text-primary">
            Let&apos;s Work Together
          </h2>
          <p className="text-text-muted mt-3 max-w-lg mx-auto">
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Left: links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Get in Touch</h3>
              <p className="text-text-muted leading-relaxed">
                I&apos;m always open to discussing new opportunities, interesting projects,
                or just connecting with fellow developers.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'alex@example.com', href: 'mailto:alex@example.com' },
                { icon: Github, label: 'GitHub', value: 'github.com/alexchen', href: 'https://github.com' },
                { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/alexchen', href: 'https://linkedin.com' },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 text-text-muted hover:text-text-primary transition-all duration-200 group"
                  whileHover={{ x: 6 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted font-medium uppercase tracking-wider">{label}</div>
                    <div className="text-sm text-text-secondary group-hover:text-text-primary">{value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-surface border border-emerald-500/20"
                >
                  <CheckCircle2 className="text-emerald-400 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-text-muted mb-6">{serverMessage}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent-light text-sm font-semibold hover:bg-accent/20 transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className={`${inputClass('message')} resize-none`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle size={16} />
                      {serverMessage}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 glow disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={status !== 'loading' ? { scale: 1.02, y: -2 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
