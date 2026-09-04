'use client'

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Glyph = {
  t: string
  x: string
  y: string
  size: string
  rotate?: number
  delay?: number
}

const GLYPHS: Glyph[] = [
  { t: 'O(n log n)', x: '8%', y: '18%', size: '0.7rem', rotate: -8, delay: 0 },
  { t: '∑', x: '78%', y: '22%', size: '1.6rem', rotate: 6, delay: 0.1 },
  { t: '∇', x: '22%', y: '72%', size: '1.25rem', rotate: -4, delay: 0.15 },
  { t: '2ⁿ', x: '88%', y: '68%', size: '0.85rem', rotate: 10, delay: 0.05 },
  { t: 'π', x: '48%', y: '12%', size: '1.1rem', rotate: 0, delay: 0.2 },
  { t: '∀ε', x: '62%', y: '80%', size: '0.65rem', rotate: -6, delay: 0.12 },
  { t: '√', x: '14%', y: '42%', size: '1.4rem', rotate: 12, delay: 0.08 },
  { t: '⌊n/2⌋', x: '70%', y: '48%', size: '0.6rem', rotate: 4, delay: 0.18 },
  { t: '⊕', x: '38%', y: '58%', size: '0.9rem', rotate: -10, delay: 0.22 },
  { t: 'mod p', x: '52%', y: '88%', size: '0.55rem', rotate: 3, delay: 0.14 },
]

/**
 * Soft decorative wash of math / CP glyphs — never compete with content.
 */
export function MathField({
  className = '',
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  const reduce = useReducedMotion()
  const gridId = useId().replace(/:/g, '')
  const color =
    tone === 'dark' ? 'rgba(157,185,201,0.14)' : 'rgba(21,101,93,0.11)'

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* faint coordinate grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]">
        <defs>
          <pattern
            id={gridId}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke={
                tone === 'dark'
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(16,22,28,0.05)'
              }
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>

      {GLYPHS.map((g) => (
        <motion.span
          key={`${g.t}-${g.x}-${g.y}`}
          className="absolute font-[family-name:var(--font-display)] select-none"
          style={{
            left: g.x,
            top: g.y,
            fontSize: g.size,
            color,
            transform: `rotate(${g.rotate ?? 0}deg)`,
          }}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: g.delay ?? 0 }}
        >
          {g.t}
        </motion.span>
      ))}
    </div>
  )
}
