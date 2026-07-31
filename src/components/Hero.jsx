import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Download, Pause, Play, Volume2, VolumeX, ChevronDown } from 'lucide-react'
import { profile } from '../data/profile.js'

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative block h-[1.25em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.65, 0.28, 0.99] }}
          className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-flame to-[#ffb199]"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  // Play once → when the intro finishes, glide down to About
  // (only if the visitor is still up in the hero — never yank them mid-scroll)
  const handleEnded = () => {
    setPlaying(false)
    if (window.scrollY > window.innerHeight * 0.4) return
    const about = document.getElementById('about')
    if (!about) return
    if (window.lenis) {
      window.lenis.scrollTo(about, { offset: -72, duration: 1.6 })
    } else {
      about.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-brick">
      {/* ── Desktop: full-bleed video background ── */}
      <div className="absolute inset-0 hidden md:block">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
        </video>
        {/* left gradient for text readability — tuned to the video's red */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#471712]/95 via-[#5E211B]/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#3a120e]/90 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex items-center mx-auto w-full max-w-7xl px-5 md:px-8 pt-24 md:pt-20 pb-10">
        <div className="w-full grid md:grid-cols-2 gap-10 items-center">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display text-[11px] md:text-xs tracking-[0.4em] uppercase text-[#ffc9b8] mb-5"
            >
              {profile.location} · {profile.company}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="font-display font-bold text-cream leading-[1.04]"
            >
              <span className="block text-4xl sm:text-5xl lg:text-[4.2rem]">
                Hi, I&apos;m {profile.firstName}
                <span className="text-ember">.</span>
              </span>
              <span className="block mt-3 text-[1.7rem] sm:text-4xl lg:text-5xl">
                <RotatingRole />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-6 text-base md:text-lg text-[#ffd9cd]/90 leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.56 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-cream text-brick-dark font-semibold px-7 py-3.5 text-sm md:text-base transition-all duration-300 hover:shadow-[0_0_36px_rgba(255,246,242,0.35)]"
              >
                View My Work
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={profile.resumeFile}
                download
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 text-cream font-semibold px-7 py-3.5 text-sm md:text-base hover:bg-cream/10 transition-all duration-300"
              >
                <Download size={18} />
                Resume
              </a>
            </motion.div>
          </div>

          {/* ── Mobile: video card (desktop uses the background video) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="md:hidden rounded-2xl overflow-hidden border border-cream/15 shadow-2xl"
          >
            <video className="w-full" poster="/hero-poster.jpg" autoPlay muted playsInline onEnded={handleEnded}>
              <source src="/hero-video.mp4" type="video/mp4" />
              <source src="/hero-video.webm" type="video/webm" />
            </video>
          </motion.div>
        </div>
      </div>

      {/* ── Video controls (desktop) ── */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="w-11 h-11 rounded-full bg-ink/40 backdrop-blur border border-cream/20 text-cream flex items-center justify-center hover:bg-ember transition-colors"
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          title={muted ? 'Unmute — hear my intro' : 'Mute'}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <button
          onClick={togglePlay}
          className="w-11 h-11 rounded-full bg-ink/40 backdrop-blur border border-cream/20 text-cream flex items-center justify-center hover:bg-ember transition-colors"
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      {/* ── Scroll cue ── */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 text-cream/70 hover:text-cream transition-colors"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  )
}
