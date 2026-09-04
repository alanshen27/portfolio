'use client'

import { motion, useReducedMotion } from 'motion/react'
import { CountUp } from './count-up'
import { easeSnap } from '@/components/portfolio-motion'

const MEDALS = [
  { label: 'Gold', count: 8, color: '#c9a227' },
  { label: 'Silver', count: 4, color: '#9aa5ae' },
  { label: 'Bronze', count: 2, color: '#b08d57' },
]

/** One dot per medal — a tally, not a progress bar. */
export function MedalBars({
  className = '',
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  const reduce = useReducedMotion()
  const dark = tone === 'dark'

  return (
    <div className={className}>
      <div className="flex items-baseline gap-3">
          <p
            className={`text-5xl font-bold tracking-tight tabular-nums ${dark ? 'text-white' : 'text-ink'}`}
          >
          <CountUp to={14} />
        </p>
        <p
          className={`font-mono text-[11px] tracking-[0.14em] uppercase ${
            dark ? 'text-white/55' : 'text-ink-faint'
          }`}
        >
          medals · 2× team MVP
        </p>
      </div>
      <ul className="mt-6 space-y-3.5">
        {MEDALS.map((m, row) => (
          <li
            key={m.label}
            className="grid grid-cols-[3.5rem_1fr_1.5rem] items-center gap-3"
          >
            <span
              className={`font-mono text-[11px] tracking-[0.1em] uppercase ${
                dark ? 'text-white/70' : 'text-ink-soft'
              }`}
            >
              {m.label}
            </span>
            <span className="flex flex-wrap gap-1.5">
              {Array.from({ length: m.count }).map((_, i) => (
                <motion.span
                  key={i}
                  className={`h-3.5 w-3.5 rounded-full border ${
                    dark ? 'border-white/25' : 'border-black/15'
                  }`}
                  style={{ background: m.color }}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + row * 0.15 + i * 0.05,
                    ease: easeSnap,
                  }}
                />
              ))}
            </span>
            <span
              className={`text-right font-mono text-sm tabular-nums ${
                dark ? 'text-white' : 'text-ink'
              }`}
            >
              {m.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
