'use client'

import { motion, useReducedMotion } from 'motion/react'
import { easeOut } from '@/components/portfolio-motion'

const STOPS = [
  { label: 'Studious', year: '23', x: 8 },
  { label: 'HackHarvard', year: '25', x: 32 },
  { label: 'USACO Gold', year: '26', x: 56 },
  { label: 'VEX Worlds', year: '26', x: 78 },
  { label: 'Cambridge University Press', year: '26', x: 96 },
]

export function PathTrace({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 36"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Timeline of milestones"
      >
        <motion.path
          d="M 4 22 C 18 8, 28 30, 40 16 S 60 6, 72 20 S 88 28, 96 12"
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="0.6"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: easeOut }}
        />
        <motion.path
          d="M 4 22 C 18 8, 28 30, 40 16 S 60 6, 72 20 S 88 28, 96 12"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="0.9"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.15, ease: easeOut }}
        />

        {STOPS.map((stop, i) => (
          <g key={stop.label}>
            <motion.circle
              cx={stop.x}
              cy={i % 2 === 0 ? 14 : 22}
              r="1.4"
              fill="var(--color-bg)"
              stroke="var(--color-accent)"
              strokeWidth="0.6"
              initial={reduce ? false : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.35 }}
            />
            <text
              x={stop.x}
              y={i % 2 === 0 ? 8 : 30}
              textAnchor="middle"
              fill="var(--color-ink)"
              fontSize="3.2"
              fontFamily="var(--font-outfit), sans-serif"
            >
              {stop.label}
            </text>
            <text
              x={stop.x}
              y={i % 2 === 0 ? 11.2 : 33.2}
              textAnchor="middle"
              fill="var(--color-ink-faint)"
              fontSize="2.4"
              fontFamily="ui-monospace, monospace"
            >
              ’{stop.year}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
