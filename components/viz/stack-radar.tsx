'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { easeOut } from '@/components/portfolio-motion'

export type RadarAxis = {
  label: string
  value: number
}

const DEFAULT_AXES: RadarAxis[] = [
  { label: 'Next.js', value: 0.92 },
  { label: 'tRPC', value: 0.84 },
  { label: 'AI / ML', value: 0.78 },
  { label: 'Systems', value: 0.8 },
  { label: 'CP', value: 0.86 },
  { label: 'Product', value: 0.88 },
]

function point(cx: number, cy: number, r: number, i: number, n: number) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
}

export function StackRadar({
  axes = DEFAULT_AXES,
  className = '',
}: {
  axes?: RadarAxis[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const size = 300
  const cx = size / 2
  const cy = size / 2
  const maxR = 108
  const n = axes.length

  const rings = [0.25, 0.5, 0.75, 1]
  const polygon = useMemo(() => {
    return axes
      .map((a, i) => {
        const p = point(cx, cy, a.value * maxR, i, n)
        return `${p.x},${p.y}`
      })
      .join(' ')
  }, [axes, cx, cy, maxR, n])

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto h-auto w-full max-w-[320px] overflow-visible"
        role="img"
        aria-label="Skills radar chart"
      >
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={axes
              .map((_, i) => {
                const p = point(cx, cy, ring * maxR, i, n)
                return `${p.x},${p.y}`
              })
              .join(' ')}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth={1}
          />
        ))}

        {axes.map((_, i) => {
          const p = point(cx, cy, maxR, i, n)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="var(--color-line)"
              strokeWidth={1}
            />
          )
        })}

        <motion.polygon
          points={polygon}
          fill="color-mix(in oklab, var(--color-accent) 22%, transparent)"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {axes.map((a, i) => {
          const p = point(cx, cy, a.value * maxR, i, n)
          const label = point(cx, cy, maxR + 22, i, n)
          const on = active === i
          return (
            <g
              key={a.label}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              className="cursor-default"
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={on ? 5 : 3.5}
                fill={on ? 'var(--color-accent-deep)' : 'var(--color-accent)'}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={on ? 'var(--color-accent)' : 'var(--color-ink-soft)'}
                fontSize="11"
                fontFamily="var(--font-outfit), sans-serif"
              >
                {a.label}
              </text>
            </g>
          )
        })}
      </svg>

      <p className="mt-2 text-center font-mono text-[11px] tracking-[0.12em] text-ink-faint uppercase">
        {active !== null
          ? `${axes[active]!.label} · ${Math.round(axes[active]!.value * 100)}`
          : 'Stack signal · hover an axis'}
      </p>
    </div>
  )
}
