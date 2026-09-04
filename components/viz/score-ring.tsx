'use client'

import { motion, useReducedMotion } from 'motion/react'
import { CountUp } from './count-up'
import { easeOut } from '@/components/portfolio-motion'

/**
 * Radial gauge for a real score (e.g. USACO 1000/1000, TOEFL 117/120).
 */
export function ScoreRing({
  value,
  max,
  label,
  sublabel,
  tone = 'light',
}: {
  value: number
  max: number
  label: string
  sublabel?: string
  tone?: 'light' | 'dark'
}) {
  const reduce = useReducedMotion()
  const size = 168
  const stroke = 6
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const ratio = Math.min(1, value / max)

  const track = tone === 'dark' ? 'rgba(255,255,255,0.12)' : 'var(--color-line)'
  const ink = tone === 'dark' ? 'text-white' : 'text-ink'
  const faint = tone === 'dark' ? 'text-white/45' : 'text-ink-faint'

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={track}
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={
              reduce
                ? { strokeDashoffset: c * (1 - ratio) }
                : { strokeDashoffset: c }
            }
            whileInView={{ strokeDashoffset: c * (1 - ratio) }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.6, ease: easeOut }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className={`figure text-4xl ${ink}`}>
            <CountUp to={value} duration={1600} />
          </p>
          <p className={`mt-0.5 font-serif text-sm italic ${faint}`}>/ {max}</p>
        </div>
      </div>
      <p className={`mt-4 text-sm font-medium ${ink}`}>{label}</p>
      {sublabel && <p className={`mt-0.5 text-[12px] ${faint}`}>{sublabel}</p>}
    </div>
  )
}
