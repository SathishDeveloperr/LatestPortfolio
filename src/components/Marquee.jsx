import { marqueeSkills } from '../data/skills.js'

export default function Marquee() {
  const items = [...marqueeSkills, ...marqueeSkills]
  return (
    <div className="relative bg-ember overflow-hidden py-3.5 border-y border-brick-dark/40 -rotate-[0.6deg] scale-[1.01]">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {items.map((s, i) => (
          <span
            key={i}
            className="mx-6 font-display font-semibold text-sm md:text-base tracking-wide text-cream flex items-center gap-6"
          >
            {s} <span className="text-cream/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
