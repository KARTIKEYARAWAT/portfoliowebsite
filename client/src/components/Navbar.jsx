import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = NAV_ITEMS.map(({ label, href }) => {
      const el = document.querySelector(href);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(label); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const handleNav = (e, label, href) => {
    e.preventDefault();
    setActive(label);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#home"
          onClick={(e) => handleNav(e, 'Home', '#home')}
          className="text-xl font-bold text-gradient"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AC
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNav(e, label, href)}
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg
                         text-text-secondary hover:text-text-primary"
            >
              {active === label && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent/10 rounded-lg border border-accent/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className={`relative z-10 ${active === label ? 'text-accent-light' : ''}`}>
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block w-5 h-0.5 bg-text-primary rounded-full"
              animate={{
                rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: menuOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleNav(e, label, href)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active === label
                      ? 'bg-accent/10 text-accent-light border border-accent/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
