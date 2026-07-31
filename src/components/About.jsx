import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { BriefcaseBusiness, Download } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { profile } from '../data/profile.js'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const dur = 1400
    const start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-cream">
      {n}
      <span className="text-ember">{suffix}</span>
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative bg-ink grain py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="About Me"
          title={
            <>
              Engineering products,
              <br />
              not just <span className="text-ember">code.</span>
            </>
          }
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-5 text-sand text-base md:text-lg leading-relaxed">
            <Reveal>
              <p>
                I&apos;m a full-stack engineer with{' '}
                <span className="text-cream font-medium">4+ years of experience</span> designing and
                building scalable enterprise web applications with .NET Core, ASP.NET Core Web API,
                SQL Server, React and Angular.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Right now at <span className="text-cream font-medium">{profile.company}</span>, I&apos;m
                shipping AI in production — an LLM-powered workflow that turns natural-language
                customer requirements into validated engineering calculations with plain-language
                summaries, cutting manual entry and specification errors.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                I care about performance and clean architecture:{' '}
                <span className="text-cream font-medium">25–30% faster</span> APIs and queries in
                production systems through optimization and thoughtful design. Beyond work, I build
                and ship my own products — from{' '}
                <span className="text-cream font-medium">RAG chatbots and multi-agent systems</span>{' '}
                to cinematic WebGL experiences.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href={profile.resumeFile}
                download
                className="inline-flex items-center gap-2 mt-2 rounded-full border border-ember/60 text-ember hover:bg-ember hover:text-cream font-semibold px-6 py-3 text-sm transition-all duration-300"
              >
                <Download size={16} />
                Download Resume
              </a>
            </Reveal>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {profile.stats.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={i * 0.08}
                  className="rounded-2xl bg-coal border border-smoke p-6 md:p-8 hover:border-ember/50 transition-colors duration-300"
                >
                  <Counter value={s.value} suffix={s.suffix} />
                  <p className="mt-2 text-sm text-sand">{s.label}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.35}>
              <div className="mt-4 md:mt-5 rounded-2xl bg-gradient-to-br from-brick to-brick-deep border border-ember/30 p-6 md:p-7 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-ember/20 border border-ember/40 flex items-center justify-center text-ember shrink-0">
                  <BriefcaseBusiness size={20} />
                </div>
                <div>
                  <p className="text-cream font-semibold">
                    Software Engineer @ {profile.company}
                  </p>
                  <p className="text-sm text-[#ffd9cd]/80">
                    Building AI-integrated engineering platforms · {profile.location}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
