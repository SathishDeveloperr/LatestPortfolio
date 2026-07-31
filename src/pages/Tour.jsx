import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ChevronDown,
  MonitorPlay,
  X,
  Mail,
  Clapperboard,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { projects } from '../data/projects.js'
import { profile } from '../data/profile.js'

const pad = (n) => String(n + 1).padStart(2, '0')

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.lenis) window.lenis.scrollTo(el, { duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/* ── One full-screen project section (hero-style) ───────────── */
function TourSection({ p, index, onEnded, registerVideo, pauseOthers, openEmbed }) {
  const vref = useRef(null)
  const sref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const contentLeft = (p.contentSide || 'left') === 'left'

  useEffect(() => {
    registerVideo(index, vref.current)
  }, [index, registerVideo])

  const tryPlay = useCallback(() => {
    const v = vref.current
    if (!v || !v.paused) return
    pauseOthers(index)
    v.muted = false
    setMuted(false)
    v.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Browser blocked sound (no user gesture yet) — start muted instead
        v.muted = true
        setMuted(true)
        v.play()
          .then(() => setPlaying(true))
          .catch(() => {})
      })
  }, [index, pauseOthers])

  const stopAndReset = useCallback(() => {
    const v = vref.current
    if (!v) return
    v.pause()
    v.currentTime = 0
    setPlaying(false)
  }, [])

  // Auto-play when the section fills the screen; stop + rewind when it leaves
  useEffect(() => {
    if (!p.video) return
    const el = sref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.6) tryPlay()
        else if (e.intersectionRatio <= 0.3 && vref.current && vref.current.currentTime > 0)
          stopAndReset()
      },
      { threshold: [0.3, 0.6] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [p.video, tryPlay, stopAndReset])

  const toggleMute = () => {
    const v = vref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    if (v.paused) tryPlay()
  }

  const togglePlay = () => {
    const v = vref.current
    if (!v) return
    if (v.paused) tryPlay()
    else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section
      ref={sref}
      id={`tour-s${index}`}
      data-index={index}
      className="relative h-screen min-h-[620px] overflow-hidden bg-brick-dark"
    >
      {/* ── Full-bleed video (or poster for projects without one) ── */}
      {p.video ? (
        <video
          ref={vref}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          poster={p.videoPoster || undefined}
          playsInline
          preload="metadata"
          onClick={togglePlay}
          onEnded={() => {
            setPlaying(false)
            onEnded(index)
          }}
        >
          <source src={p.video} type="video/mp4" />
          <source src={p.video.replace('.mp4', '.webm')} type="video/webm" />
        </video>
      ) : (
        <img
          src={p.image}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* ── Readability gradients (over the text side, like the hero) ── */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          contentLeft
            ? 'bg-gradient-to-r from-[#2e0e09]/95 via-[#2e0e09]/60 to-transparent'
            : 'bg-gradient-to-l from-[#2e0e09]/95 via-[#2e0e09]/60 to-transparent'
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
      {!p.video && <div className="absolute inset-0 bg-ink/45 pointer-events-none" />}

      {/* ── Overlaid content ── */}
      <div className="relative z-10 h-full mx-auto max-w-7xl px-5 md:px-8 flex items-end lg:items-center pb-24 lg:pb-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7 }}
          className={`max-w-xl pointer-events-auto ${contentLeft ? '' : 'lg:ml-auto'}`}
        >
          <p className="font-display text-6xl md:text-8xl font-bold text-cream/15 leading-none select-none">
            {pad(index)}
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-cream -mt-4 md:-mt-7 drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
            {p.title}
          </h2>
          <p className="text-flame font-semibold mt-2 md:text-lg">{p.tagline}</p>
          <p className="mt-4 text-cream/85 leading-relaxed text-sm md:text-base drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            {p.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] md:text-xs rounded-full border border-cream/30 bg-ink/30 backdrop-blur text-cream/90 px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {!p.video && (
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase bg-ink/60 backdrop-blur border border-cream/25 text-cream/90 rounded-full px-4 py-2.5">
                <Clapperboard size={14} className="text-flame" />
                Video explainer coming soon
              </span>
            )}

            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cream text-brick-dark font-semibold px-6 py-3 text-sm transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,246,242,0.4)]"
            >
              Open Live <ArrowUpRight size={16} />
            </a>
            <button
              onClick={() => openEmbed(p)}
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-ink/30 backdrop-blur text-cream/90 hover:text-cream font-semibold px-6 py-3 text-sm hover:bg-ink/50 transition-colors"
            >
              <MonitorPlay size={16} /> Try it right here
            </button>
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} source code`}
                className="inline-flex w-11 h-11 items-center justify-center rounded-full border border-cream/40 bg-ink/30 backdrop-blur text-cream/90 hover:text-cream hover:bg-ink/50 transition-colors"
              >
                <Github size={17} />
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Sound control — bottom right */}
      {p.video && playing && (
        <div className="absolute bottom-8 right-8 z-20">
          {muted ? (
            <button
              onClick={toggleMute}
              className="inline-flex items-center gap-2 rounded-full bg-ember text-cream font-semibold px-5 py-3 text-sm shadow-[0_0_32px_rgba(232,68,46,0.6)] animate-pulse"
            >
              <Volume2 size={17} /> Tap for sound
            </button>
          ) : (
            <button
              onClick={toggleMute}
              aria-label="Mute"
              className="w-11 h-11 rounded-full bg-ink/40 backdrop-blur border border-cream/20 text-cream flex items-center justify-center hover:bg-ember transition-colors"
            >
              <VolumeX size={18} />
            </button>
          )}
        </div>
      )}
    </section>
  )
}

/* ── Live preview modal ─────────────────────────────────────── */
function EmbedModal({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[70] bg-ink/85 backdrop-blur-sm flex items-center justify-center p-3 md:p-8">
      <div className="w-full max-w-6xl h-[84vh] rounded-2xl overflow-hidden border border-smoke bg-coal flex flex-col shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-smoke bg-ink/70">
          <span className="w-2.5 h-2.5 rounded-full bg-ember/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-sand/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-sand/40" />
          <span className="ml-3 text-xs text-sand/80 truncate font-mono">
            {p.live.replace('https://', '')}
          </span>
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-sand hover:text-cream transition-colors"
          >
            Open in new tab <ArrowUpRight size={13} />
          </a>
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="ml-4 w-8 h-8 rounded-full border border-smoke text-sand hover:text-cream hover:border-ember flex items-center justify-center transition-colors"
          >
            <X size={15} />
          </button>
        </div>
        <iframe
          src={p.live}
          title={`${p.title} live preview`}
          className="flex-1 w-full bg-ink"
          allow="fullscreen"
        />
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────── */
export default function Tour() {
  const [current, setCurrent] = useState(-1)
  const [embed, setEmbed] = useState(null)
  const videosRef = useRef({})

  useEffect(() => {
    document.title = 'Guided Tour — Sathish Kumar'
  }, [])

  const registerVideo = useCallback((i, el) => {
    videosRef.current[i] = el
  }, [])

  const pauseOthers = useCallback((except) => {
    Object.entries(videosRef.current).forEach(([k, v]) => {
      if (Number(k) !== except && v && !v.paused) v.pause()
    })
  }, [])

  // track the active section for the progress rail
  useEffect(() => {
    const els = projects.map((_, i) => document.getElementById(`tour-s${i}`)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(Number(e.target.dataset.index))
        })
      },
      { threshold: 0.55 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // when a clip finishes → glide to the next project
  const handleEnded = (i) => {
    const nextId = i + 1 < projects.length ? `tour-s${i + 1}` : 'tour-outro'
    scrollToSection(nextId)
  }

  return (
    <div className="bg-ink min-h-screen">
      {/* Slim header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-ink/60 backdrop-blur-md border-b border-cream/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cream/75 hover:text-cream transition-colors"
          >
            <ArrowLeft size={16} /> Back home
          </Link>
          <span className="font-display font-bold text-lg text-cream">
            {profile.firstName}
            <span className="text-ember">.</span>{' '}
            <span className="hidden sm:inline text-cream/60 font-normal text-sm ml-2 tracking-[0.25em] uppercase">
              Guided tour
            </span>
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-ember hover:bg-flame text-cream text-sm font-semibold px-5 py-2 transition-colors"
          >
            Hire Me
          </a>
        </div>
      </header>

      {/* Progress rail (desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
        {projects.map((p, i) => (
          <button
            key={p.title}
            onClick={() => scrollToSection(`tour-s${i}`)}
            aria-label={`Go to ${p.title}`}
            title={p.title}
            className={`rounded-full transition-all duration-300 ${
              current === i ? 'w-3 h-8 bg-ember' : 'w-3 h-3 bg-cream/25 hover:bg-cream/50'
            }`}
          />
        ))}
      </div>

      {/* Counter (desktop) */}
      <div className="fixed left-6 bottom-6 z-40 hidden lg:block font-display text-sm text-cream/70 tracking-[0.3em] drop-shadow">
        {current >= 0 ? pad(current) : '--'} / {pad(projects.length - 1)}
      </div>

      {/* Intro */}
      <section className="h-screen min-h-[620px] flex flex-col items-center justify-center text-center px-5 relative grain bg-gradient-to-b from-brick-dark via-ink to-ink">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-xs md:text-sm tracking-[0.4em] uppercase text-[#ffc9b8] mb-5"
        >
          {projects.length} projects · presented in person
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.05] max-w-4xl"
        >
          Don&apos;t read my work.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-flame to-[#ffb199]">
            Watch me present it.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="mt-6 text-sand max-w-xl text-base md:text-lg leading-relaxed"
        >
          Just scroll — each project plays automatically with my voice presenting it. When a clip
          ends, we glide to the next one on our own.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => scrollToSection('tour-s0')}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-cream text-brick-dark font-semibold px-8 py-4 hover:shadow-[0_0_36px_rgba(255,246,242,0.35)] transition-all"
        >
          Start the tour <ChevronDown size={18} />
        </motion.button>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-8 text-sand/60"
        >
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* Full-screen project sections */}
      {projects.map((p, i) => (
        <TourSection
          key={p.title}
          p={p}
          index={i}
          onEnded={handleEnded}
          registerVideo={registerVideo}
          pauseOthers={pauseOthers}
          openEmbed={setEmbed}
        />
      ))}

      {/* Outro */}
      <section
        id="tour-outro"
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 bg-gradient-to-br from-brick via-brick-deep to-brick-dark relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-ember/25 blur-[120px]" />
        <h2 className="font-display text-3xl md:text-5xl font-bold text-cream leading-tight max-w-3xl">
          That&apos;s the tour — and I&apos;m just getting started.
        </h2>
        <p className="mt-5 text-[#ffd9cd]/85 max-w-xl text-base md:text-lg">
          More explainer videos are on the way, and 15+ projects are on the roadmap. If what you saw
          fits what you&apos;re building, let&apos;s talk.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-cream text-brick-dark font-semibold px-7 py-3.5 hover:shadow-[0_0_36px_rgba(255,246,242,0.4)] transition-all"
          >
            <Mail size={18} /> {profile.email}
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-cream/40 text-cream font-semibold px-7 py-3.5 hover:bg-cream/10 transition-all"
          >
            <ArrowLeft size={18} /> Back to home
          </Link>
        </div>
      </section>

      {embed && <EmbedModal p={embed} onClose={() => setEmbed(null)} />}
    </div>
  )
}
