import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, Plus, Play } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { projects, CATEGORIES } from '../data/projects.js'

function ProjectCard({ p, wide }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-2xl overflow-hidden bg-coal border border-smoke hover:border-ember/50 transition-colors duration-300 flex flex-col ${
        wide ? 'md:col-span-2' : ''
      }`}
    >
      {/* Screenshot */}
      <a
        href={p.live}
        target="_blank"
        rel="noreferrer"
        className="relative block overflow-hidden aspect-[16/10] bg-smoke"
      >
        <img
          src={p.image}
          alt={`${p.title} — ${p.tagline}`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70" />
        <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream text-ink flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight size={18} />
        </span>
        <span className="absolute bottom-4 left-4 text-[10px] font-semibold tracking-[0.2em] uppercase bg-ink/70 backdrop-blur border border-cream/15 text-cream/90 rounded-full px-3 py-1.5">
          {CATEGORIES.find((c) => c.id === p.category)?.label ?? p.category}
        </span>
      </a>

      {/* Body */}
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-cream">
              {p.title}
            </h3>
            <p className="text-sm text-ember font-medium mt-0.5">{p.tagline}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} source code`}
                className="w-9 h-9 rounded-full border border-smoke text-sand hover:text-cream hover:border-ember flex items-center justify-center transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.title} live demo`}
              className="w-9 h-9 rounded-full border border-smoke text-sand hover:text-cream hover:border-ember flex items-center justify-center transition-colors"
            >
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <p className="mt-3 text-sm md:text-[15px] text-sand leading-relaxed flex-1">
          {p.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] md:text-xs rounded-full border border-smoke text-sand px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const visible = projects.filter((p) => filter === 'all' || p.category === filter)

  return (
    <section id="projects" className="relative bg-ink grain py-24 md:py-32 border-t border-smoke">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Projects"
            title={
              <>
                Work that speaks
                <br />
                louder than a <span className="text-ember">resume.</span>
              </>
            }
            description="Every project below is live — click through and try them. From production-grade GenAI systems to cinematic web experiences."
          />
        </div>

        {/* Guided tour CTA */}
        <Reveal className="mb-8 -mt-2">
          <Link
            to="/projects"
            className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-gradient-to-r from-brick to-brick-deep border border-ember/40 p-5 md:p-6 hover:border-ember transition-all duration-300 hover:shadow-[0_12px_44px_rgba(232,68,46,0.25)]"
          >
            <span className="relative flex shrink-0 w-14 h-14 items-center justify-center">
              <span className="absolute w-14 h-14 rounded-full bg-ember/40 animate-ping" />
              <span className="relative w-14 h-14 rounded-full bg-ember text-cream flex items-center justify-center transition-transform group-hover:scale-105">
                <Play size={22} className="ml-0.5" />
              </span>
            </span>
            <span className="flex-1">
              <span className="block font-display text-lg md:text-xl font-bold text-cream">
                Prefer watching? Take the guided tour.
              </span>
              <span className="block text-sm text-[#ffd9cd]/85 mt-0.5">
                Every project auto-plays with me presenting it — then try the live app right there.
              </span>
            </span>
            <span className="inline-flex items-center gap-2 self-start sm:self-center rounded-full bg-cream text-brick-dark font-semibold px-6 py-3 text-sm transition-transform group-hover:translate-x-1">
              Start the tour <ArrowUpRight size={16} />
            </span>
          </Link>
        </Reveal>

        {/* Filters */}
        <Reveal className="mb-10 -mt-4 flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium border transition-all duration-300 ${
                filter === c.id
                  ? 'bg-ember border-ember text-cream shadow-[0_0_24px_rgba(232,68,46,0.35)]'
                  : 'border-smoke text-sand hover:border-ember/50 hover:text-cream'
              }`}
            >
              {c.label}
              {c.id === 'all' && (
                <span className="ml-2 text-xs opacity-70">{projects.length}</span>
              )}
            </button>
          ))}
        </Reveal>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.title} p={p} wide={p.featured && filter === 'all' && i === 0} />
            ))}
          </AnimatePresence>

          {/* More coming card */}
          <motion.a
            layout
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-dashed border-smoke hover:border-ember/60 min-h-[280px] flex flex-col items-center justify-center gap-4 text-sand hover:text-cream transition-colors duration-300 group"
          >
            <span className="w-14 h-14 rounded-full border border-smoke group-hover:border-ember flex items-center justify-center transition-colors">
              <Plus size={22} />
            </span>
            <span className="font-display font-semibold">More shipping soon</span>
            <span className="text-xs text-sand/70 px-8 text-center">
              New projects land here regularly — 15+ on the roadmap.
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
