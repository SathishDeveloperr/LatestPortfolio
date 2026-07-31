import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { experience } from '../data/experience.js'

export default function Experience() {
  return (
    <section id="experience" className="relative bg-ink py-24 md:py-32 border-t border-smoke">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Experience"
          title={
            <>
              4+ years of
              <br />
              production <span className="text-ember">impact.</span>
            </>
          }
        />

        <div className="relative max-w-4xl">
          {/* timeline line */}
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-ember via-smoke to-transparent" />

          <div className="space-y-12">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.08} className="relative pl-10 md:pl-14">
                {/* dot */}
                <span
                  className={`absolute left-0 top-2 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 ${
                    job.current
                      ? 'bg-ember border-ember shadow-[0_0_18px_rgba(232,68,46,0.8)]'
                      : 'bg-ink border-smoke'
                  }`}
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-cream">
                    {job.role}
                  </h3>
                  <span className="text-ember font-semibold">@ {job.company}</span>
                  {job.current && (
                    <span className="text-[10px] font-semibold tracking-widest uppercase bg-ember/15 border border-ember/40 text-flame rounded-full px-2.5 py-1">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-sand/80">
                  {job.period} · {job.location}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-sm md:text-[15px] text-sand leading-relaxed">
                      <span className="text-ember mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-ember" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
