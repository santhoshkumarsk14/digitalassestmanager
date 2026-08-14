import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type GalleryProject = {
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
};

const categories = [
  'All work',
  'Landscape',
  'Green Wall',
  'Planting',
  'Tree Pruning',
  'Grass Cutting',
  'Indoor Plants',
  'Turfing',
  'Artificial Turf',
  'Construction',
  'Maintenance',
];

export default function ProjectGallery({ projects }: { projects: GalleryProject[] }) {
  const [filter, setFilter] = useState('All work');
  const available = useMemo(() => new Set(projects.map((project) => project.category)), [projects]);
  const visibleCategories = categories.filter((category) => category === 'All work' || available.has(category));

  const filtered = filter === 'All work' ? projects : projects.filter((project) => project.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {visibleCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              filter === category
                ? 'border-primary bg-primary text-surface'
                : 'border-ink/15 text-ink/70 hover:border-primary hover:text-primary'
            }`}
            aria-pressed={filter === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title}, ${project.location}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                  {project.category}
                </span>
                <h3 className="font-display mt-3 text-xl text-ink">{project.title}</h3>
                <p className="mt-1 text-sm text-ink/60">{project.location}</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 border-t border-ink/10 pt-8 text-sm text-ink/60">
          No projects in this category yet. Try another view.
        </p>
      )}
    </div>
  );
}
