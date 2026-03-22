import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Layers, Zap, Users } from 'lucide-react';
import SectionWrapper from './SectionWrapper.jsx';

const highlights = [
  { icon: Code2, value: '5+', label: 'Years Experience', color: 'text-accent' },
  { icon: Layers, value: '40+', label: 'Projects Shipped', color: 'text-purple-400' },
  { icon: Zap, value: '20+', label: 'Technologies', color: 'text-emerald-400' },
  { icon: Users, value: '10+', label: 'Happy Clients', color: 'text-amber-400' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

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
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-text-primary">
            Crafting Digital Experiences
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Profile image placeholder */}
            <div className="relative w-56 h-56 mb-8 mx-auto lg:mx-0">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent/30 via-purple-500/20 to-indigo-500/30 border border-accent/20 flex items-center justify-center text-6xl">
                👨‍💻
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl bg-accent/10 border border-accent/10 -z-10" />
            </div>

            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                I&apos;m a full-stack engineer with over 5 years of experience building products that scale.
                I specialize in the JavaScript ecosystem — from React frontends to Node.js backends —
                and I care deeply about writing maintainable, well-tested code.
              </p>
              <p>
                I&apos;ve worked across startups and agencies, shipping everything from SaaS platforms to
                real-time collaboration tools. I thrive in fast-paced environments and love tackling
                complex architectural challenges.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m contributing to open source, writing technical articles,
                or exploring the latest in AI and distributed systems.
              </p>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, value, label, color }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Icon className={`${color} mb-3 group-hover:scale-110 transition-transform duration-300`} size={28} />
                <div className={`text-3xl font-extrabold mb-1 ${color}`}>{value}</div>
                <div className="text-text-muted text-sm font-medium">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
