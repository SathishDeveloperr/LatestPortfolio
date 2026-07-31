import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-smoke overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <a href="#home" className="font-display text-2xl font-bold">
              {profile.firstName}
              <span className="text-ember">.</span>
            </a>
            <p className="mt-2 text-sm text-sand max-w-sm">
              {profile.role} · {profile.location} — building fast, scalable, AI-powered products.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: profile.socials.github, label: 'GitHub' },
              { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full border border-smoke text-sand hover:text-cream hover:border-ember hover:bg-ember/10 flex items-center justify-center transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
            <a
              href="#home"
              aria-label="Back to top"
              className="w-11 h-11 rounded-full bg-ember text-cream flex items-center justify-center hover:bg-flame transition-colors"
            >
              <ArrowUp size={18} />
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-sand/60 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Built with React, Tailwind CSS & Framer Motion.</span>
        </p>
      </div>

      {/* Giant wordmark */}
      <div className="select-none pointer-events-none -mb-6 md:-mb-10 lg:-mb-14 text-center">
        <span className="font-display font-bold uppercase tracking-tight text-outline leading-none text-[21vw] md:text-[17vw]">
          {profile.firstName}
        </span>
      </div>
    </footer>
  )
}
