import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Building2 } from 'lucide-react';
import { fetchExperience } from '../api.js';
import SectionWrapper from './SectionWrapper.jsx';

function ExperienceCard({ exp, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-accent border-4 border-background mt-1 flex-shrink-0 z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
        {/* Line */}
        <div className="w-px flex-1 bg-border mt-2" />
      </div>

      {/* Content */}
      <motion.div
        className="pb-12 flex-1"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-300 group">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-light transition-colors">
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-accent font-semibold">
                <Building2 size={14} />
                <span className="text-sm">{exp.company}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-1.5 text-text-muted text-xs">
                <Calendar size={12} />
                <span className="font-mono">{exp.startDate} – {exp.endDate}</span>
              </div>
              {exp.location && (
                <div className="flex items-center gap-1.5 text-text-muted text-xs">
                  <MapPin size={12} />
                  <span>{exp.location}</span>
                </div>
              )}
            </div>
          </div>

          <ul className="space-y-2.5">
            {exp.descriptionBullets?.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-muted leading-relaxed">
                <span className="text-accent mt-1.5 flex-shrink-0">▸</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    fetchExperience()
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper>
      <div ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent text-sm font-mono font-semibold tracking-widest uppercase">
            Career
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-text-primary">
            Work Experience
          </h2>
          <p className="text-text-muted mt-3 max-w-lg mx-auto">
            My professional journey building products that matter.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((k) => (
                <div key={k} className="flex gap-6 animate-pulse">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-surface-2 mt-1 flex-shrink-0" />
                    <div className="w-px flex-1 bg-surface-2 mt-2" />
                  </div>
                  <div className="pb-12 flex-1">
                    <div className="p-6 rounded-2xl bg-surface border border-border space-y-3">
                      <div className="h-5 bg-surface-2 rounded w-2/5" />
                      <div className="h-4 bg-surface-2 rounded w-1/3" />
                      <div className="space-y-2 pt-2">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="h-3 bg-surface-2 rounded" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {experiences.map((exp, i) => (
                <ExperienceCard key={exp._id} exp={exp} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
