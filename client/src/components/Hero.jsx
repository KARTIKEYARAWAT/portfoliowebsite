import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div variants={item} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent-light text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
        >
          Hi, I&apos;m{' '}
          <span className="text-gradient">Alex Chen</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-xl sm:text-2xl text-text-secondary font-medium mb-4"
        >
          Full-Stack Engineer
        </motion.p>

        <motion.p
          variants={item}
          className="text-base sm:text-lg text-text-muted max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I build scalable web applications with modern technologies.
          Passionate about clean code, great UX, and solving real problems.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <motion.button
            onClick={() => handleScroll('#projects')}
            className="px-8 py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-semibold transition-all duration-200 glow"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
          </motion.button>
          <motion.button
            onClick={() => handleScroll('#contact')}
            className="px-8 py-3.5 rounded-xl border border-border hover:border-accent/50 text-text-secondary hover:text-text-primary font-semibold transition-all duration-200 bg-surface hover:bg-surface-2"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div variants={item} className="flex items-center justify-center gap-6">
          {[
            { icon: Github, href: 'https://github.com', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Mail, href: '#contact', label: 'Email', scroll: true },
          ].map(({ icon: Icon, href, label, scroll }) => (
            <motion.a
              key={label}
              href={href}
              onClick={scroll ? (e) => { e.preventDefault(); handleScroll('#contact'); } : undefined}
              target={!scroll ? '_blank' : undefined}
              rel={!scroll ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="p-3 rounded-xl border border-border hover:border-accent/40 text-text-muted hover:text-accent-light transition-all duration-200 bg-surface hover:bg-surface-2"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </div>
  );
}
