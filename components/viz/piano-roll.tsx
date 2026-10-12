'use client'

import { motion, useReducedMotion } from 'motion/react'
import { easeOut } from '@/components/portfolio-motion'

type Note = { t: number; p: number; d: number; ai?: boolean }

/* Sketch (ink) followed by a model continuation (accent) — same idea as the notate UI. */
const NOTES: Note[] = [
  { t: 0, p: 7, d: 2 },
  { t: 0, p: 3, d: 2 },
  { t: 2, p: 8, d: 1 },
  { t: 3, p: 9, d: 1 },
  { t: 4, p: 7, d: 2 },
  { t: 4, p: 2, d: 2 },
  { t: 6, p: 5, d: 1 },
  { t: 7, p: 6, d: 1 },
  { t: 8, p: 8, d: 2, ai: true },
  { t: 8, p: 3, d: 2, ai: true },
  { t: 10, p: 10, d: 1, ai: true },
  { t: 11, p: 9, d: 1, ai: true },
  { t: 12, p: 7, d: 2, ai: true },
  { t: 12, p: 1, d: 2, ai: true },
  { t: 14, p: 8, d: 1, ai: true },
  { t: 15, p: 6, d: 1, ai: true },
]

const COLS = 16
const ROWS = 12

export function PianoRoll({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const w = 320
  const h = 180
  const cw = w / COLS
  const rh = h / ROWS

  return (
    <div
      className={`bg-panel-wash relative overflow-hidden ${className}`}
      aria-hidden
    >
      <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full">
        {Array.from({ length: ROWS }).map((_, r) => (
          <rect
            key={`row-${r}`}
            x={0}
            y={r * rh}
            width={w}
            height={rh}
            fill={r % 2 === 0 ? 'rgba(23,25,28,0.03)' : 'transparent'}
          />
        ))}
        {Array.from({ length: COLS + 1 }).map((_, c) => (
          <line
            key={`col-${c}`}
            x1={c * cw}
            x2={c * cw}
            y1={0}
            y2={h}
            stroke={c % 4 === 0 ? 'rgba(23,25,28,0.16)' : 'rgba(23,25,28,0.06)'}
            strokeWidth={1}
          />
        ))}
        {NOTES.map((n, i) => (
          <motion.rect
            key={i}
            x={n.t * cw + 1.5}
            y={(ROWS - 1 - n.p) * rh + 1.5}
            width={n.d * cw - 3}
            height={rh - 3}
            fill={n.ai ? 'var(--color-accent)' : 'rgba(23,25,28,0.78)'}
            initial={reduce ? false : { opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 0.35,
              delay: 0.1 + n.t * 0.05,
              ease: easeOut,
            }}
            style={{ transformOrigin: `${n.t * cw}px 0px` }}
          />
        ))}
        <motion.line
          x1={8 * cw}
          x2={8 * cw}
          y1={0}
          y2={h}
          stroke="var(--color-ink-faint)"
          strokeWidth={1.2}
          strokeDasharray="3 3"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
      </svg>
      <div className="text-ink-faint pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2 text-[11px]">
        <span>sketch</span>
        <span className="text-accent">continued by the model →</span>
      </div>
    </div>
  )
}
