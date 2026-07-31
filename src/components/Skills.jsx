import { Sparkles, Server, Monitor, Database, Cloud } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { skillGroups } from '../data/skills.js'

const icons = { Sparkles, Server, Monitor, Database, Cloud }

export default function Skills() {
  return (
    <section id="skills" className="relative bg-ink py-24 md:py-32 border-t border-smoke">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Skills"
          title={
            <>
              A stack built for
              <br />
              <span className="text-ember">shipping.</span>
            </>
          }
          description="From .NET backends and React frontends to production LLM pipelines — the tools I use to take products from idea to scale."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon] || Server
            return (
              <Reveal
                key={g.title}
                delay={i * 0.07}
                className={`group rounded-2xl border p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 ${
                  g.highlight
                    ? 'bg-gradient-to-br from-brick to-brick-deep border-ember/40 hover:shadow-[0_16px_48px_rgba(232,68,46,0.25)] sm:col-span-2 lg:col-span-1'
                    : 'bg-coal border-smoke hover:border-ember/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      g.highlight ? 'bg-ember/25 text-flame' : 'bg-smoke text-ember'
                    }`}
                  >
                    <Icon size={19} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-cream">{g.title}</h3>
                  {g.highlight && (
                    <span className="ml-auto text-[10px] font-semibold tracking-widest uppercase bg-ember text-cream rounded-full px-2.5 py-1">
                      Core
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className={`text-xs md:text-[13px] rounded-full px-3 py-1.5 border transition-colors ${
                        g.highlight
                          ? 'border-cream/25 text-[#ffe3da] group-hover:border-cream/40'
                          : 'border-smoke text-sand group-hover:border-ember/30'
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
