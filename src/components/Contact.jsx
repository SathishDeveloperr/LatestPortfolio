import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { profile } from '../data/profile.js'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-brick via-brick-deep to-brick-dark py-24 md:py-32">
      {/* glow */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-ember/25 blur-[140px]" />
      <div className="absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full bg-flame/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <p className="font-display text-xs md:text-sm tracking-[0.35em] uppercase text-[#ffc9b8] mb-4">
                — Contact
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.03] text-cream">
                Have a project
                <br />
                in mind? <span className="text-transparent bg-clip-text bg-gradient-to-r from-flame to-[#ffb199]">Let&apos;s talk.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-base md:text-lg text-[#ffd9cd]/85 leading-relaxed max-w-lg">
                I&apos;m open to software engineering roles and collaborations — especially where
                full-stack meets AI. Reach out and I&apos;ll get back within a day.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-cream text-brick-dark font-semibold px-7 py-3.5 transition-all duration-300 hover:shadow-[0_0_36px_rgba(255,246,242,0.4)]"
              >
                <Mail size={18} />
                {profile.email}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
              { icon: MapPin, label: 'Location', value: profile.location, href: null },
              { icon: Github, label: 'GitHub', value: 'View my code', href: profile.socials.github },
              { icon: Linkedin, label: 'LinkedIn', value: 'Connect with me', href: https://www.linkedin.com/in/sathish-kumar-s-3a23b430b/ },
            ].map(({ icon: Icon, label, value, href }, i) => {
              const Tag = href ? 'a' : 'div'
              return (
                <Reveal key={label} delay={0.1 + i * 0.07}>
                  <Tag
                    {...(href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' } : {})}
                    className={`block rounded-2xl bg-ink/25 backdrop-blur border border-cream/15 p-6 h-full transition-all duration-300 ${
                      href ? 'hover:border-cream/40 hover:bg-ink/40 hover:-translate-y-1' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-cream/10 border border-cream/20 text-[#ffc9b8] flex items-center justify-center mb-4">
                      <Icon size={18} />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-[#ffc9b8]/80">{label}</p>
                    <p className="mt-1 font-medium text-cream break-all">{value}</p>
                  </Tag>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
