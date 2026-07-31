import Reveal from './Reveal.jsx'

export default function SectionHeading({ kicker, title, description, light = false }) {
  return (
    <div className="mb-12 md:mb-16 max-w-3xl">
      <Reveal>
        <p className="font-display text-xs md:text-sm tracking-[0.35em] uppercase text-ember mb-4">
          — {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] ${
            light ? 'text-cream' : 'text-cream'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base md:text-lg text-sand leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
