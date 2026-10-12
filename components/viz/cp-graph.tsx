'use client'

import { motion, useReducedMotion } from 'motion/react'
import { easeOut } from '@/components/portfolio-motion'

type Node = { id: string; x: number; y: number; label?: string }
type Edge = { from: string; to: string }

const NODES: Node[] = [
  { id: '0', x: 28, y: 72, label: 's' },
  { id: '1', x: 72, y: 28 },
  { id: '2', x: 118, y: 78 },
  { id: '3', x: 162, y: 32 },
  { id: '4', x: 208, y: 74 },
  { id: '5', x: 252, y: 30, label: 't' },
  { id: '6', x: 148, y: 118 },
]

const EDGES: Edge[] = [
  { from: '0', to: '1' },
  { from: '0', to: '2' },
  { from: '1', to: '3' },
  { from: '2', to: '3' },
  { from: '2', to: '6' },
  { from: '3', to: '4' },
  { from: '3', to: '5' },
  { from: '4', to: '5' },
  { from: '6', to: '4' },
]

/** BFS visit order for the animation */
const VISIT = ['0', '1', '2', '3', '6', '4', '5']

function nodeMap() {
  return Object.fromEntries(NODES.map((n) => [n.id, n]))
}

/**
 * Animated graph exploration — BFS-style node lighting for a CP feel.
 */
export function CpGraph({
  className = '',
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  const reduce = useReducedMotion()
  const map = nodeMap()
  const dark = tone === 'dark'
  const stroke = dark ? 'rgba(255,255,255,0.18)' : 'var(--color-line)'
  const accent = 'var(--color-accent)'
  const ink = dark ? 'rgba(255,255,255,0.85)' : 'var(--color-ink)'
  const faint = dark ? 'rgba(255,255,255,0.4)' : 'var(--color-ink-faint)'

  return (
    <div className={className}>
      <svg
        viewBox="0 0 280 140"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Graph search visualization — nodes explored in BFS order"
      >
        {EDGES.map((e, i) => {
          const a = map[e.from]
          const b = map[e.to]
          return (
            <motion.path
              key={`${e.from}-${e.to}`}
              d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
              fill="none"
              stroke={stroke}
              strokeWidth={1.2}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.06,
                ease: easeOut,
              }}
            />
          )
        })}

        {/* Active path highlight after visit */}
        {[
          ['0', '1'],
          ['1', '3'],
          ['3', '5'],
        ].map(([from, to], i) => {
          const a = map[from]
          const b = map[to]
          return (
            <motion.path
              key={`hl-${from}-${to}`}
              d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
              fill="none"
              stroke={accent}
              strokeWidth={1.8}
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.85 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                duration: 0.55,
                delay: 1.1 + i * 0.22,
                ease: easeOut,
              }}
            />
          )
        })}

        {VISIT.map((id, i) => {
          const n = map[id]
          return (
            <g key={id}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={8}
                fill={dark ? '#0a1014' : 'var(--color-bg-elevated)'}
                stroke={accent}
                strokeWidth={1.5}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.4,
                  delay: 0.35 + i * 0.14,
                  ease: easeOut,
                }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
              <motion.text
                x={n.x}
                y={n.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={ink}
                fontSize={8}
                fontFamily="var(--font-jetbrains), ui-monospace, monospace"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + i * 0.14, duration: 0.3 }}
              >
                {n.label ?? id}
              </motion.text>
            </g>
          )
        })}

        <text
          x={4}
          y={134}
          fill={faint}
          fontSize={8}
          fontFamily="var(--font-jetbrains), ui-monospace, monospace"
          letterSpacing="0.12em"
        >
          BFS · O(V + E)
        </text>
      </svg>
    </div>
  )
}
