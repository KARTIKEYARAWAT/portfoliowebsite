import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { fetchProjects } from '../api.js';
import SectionWrapper from './SectionWrapper.jsx';

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-surface border border-border overflow-hidden animate-pulse">
      <div className="h-52 bg-surface-2" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-surface-2 rounded w-2/3" />
        <div className="h-3 bg-surface-2 rounded w-full" />
        <div className="h-3 bg-surface-2 rounded w-4/5" />
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((k) => (
            <div key={k} className="h-5 w-16 bg-surface-2 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl bg-surface border border-border overflow-hidden group hover:border-accent/30 transition-all duration-300"
      whileHover={{ y: -6 }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-surface-2">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 via-purple-500/10 to-indigo-500/20 flex items-center justify-center text-5xl">
            🚀
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.links?.live && (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold flex items-center gap-2 glow-sm"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={15} /> Live Demo
            </motion.a>
          )}
          {project.links?.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-surface-2 border border-border text-text-secondary text-sm font-semibold flex items-center gap-2 hover:text-text-primary"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={15} /> Code
            </motion.a>
          )}
        </div>
        {project.featured && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent/90 text-white text-xs font-semibold backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-light transition-colors">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent-light text-xs font-medium border border-accent/15"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
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
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-text-primary">
            Things I&apos;ve Built
          </h2>
          <p className="text-text-muted mt-3 max-w-lg mx-auto">
            A selection of projects that showcase my skills across the full stack.
          </p>
        </motion.div>

        {error && (
          <div className="text-center py-20 text-text-muted">
            <p className="text-red-400 mb-2">⚠️ Could not load projects</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : projects.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
