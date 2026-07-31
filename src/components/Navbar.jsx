import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile.js'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-md border-b border-smoke shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
          : 'bg-transparent'
      }`}
    >
      {/* scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ember to-flame origin-left"
        style={{ scaleX: progress }}
      />
      <nav className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <a href="#home" className="font-display text-xl md:text-2xl font-bold tracking-tight">
          {profile.firstName}
          <span className="text-ember">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-cream/75 hover:text-cream transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-ember transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="hidden md:inline-flex items-center rounded-full bg-ember hover:bg-flame text-cream text-sm font-semibold px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_28px_rgba(232,68,46,0.5)]"
          >
            Hire Me
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-cream"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-ink/95 backdrop-blur-md border-b border-smoke"
          >
            <ul className="px-6 py-4 space-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-cream/85 hover:text-ember transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex rounded-full bg-ember text-cream text-sm font-semibold px-5 py-2.5"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
