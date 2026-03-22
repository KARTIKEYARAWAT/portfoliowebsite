import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fetchSkills } from '../api.js';
import SectionWrapper from './SectionWrapper.jsx';

function SkillBar({ skill, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">{skill.icon}</span>
        <span className="text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors flex-1">
          {skill.name}
        </span>
        <span className="text-xs font-mono text-accent">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.07 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    fetchSkills()
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categoryColors = {
    Frontend: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
    Backend: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
    Tools: 'text-amber-400 border-amber-400/20 bg-amber-400/5',
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
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-text-primary">
            Skills &amp; Technologies
          </h2>
          <p className="text-text-muted mt-3 max-w-lg mx-auto">
            Tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((k) => (
              <div key={k} className="p-6 rounded-2xl bg-surface border border-border animate-pulse space-y-4">
                <div className="h-5 bg-surface-2 rounded w-1/3" />
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-3 bg-surface-2 rounded w-2/3" />
                    <div className="h-1.5 bg-surface-2 rounded" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(grouped).map(([category, categorySkills], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-colors duration-300"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold tracking-widest uppercase mb-6 ${categoryColors[category] || 'text-text-secondary border-border bg-surface-2'}`}>
                  {category}
                </div>
                <div className="space-y-5">
                  {categorySkills.map((skill, i) => (
                    <SkillBar key={skill._id || skill.name} skill={skill} index={i} isInView={isInView} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
