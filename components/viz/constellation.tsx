'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { easeOut } from '@/components/portfolio-motion'

export type OrbitNode = {
  id: string
  label: string
  href: string
  detail: string
  angle: number
  radius: number
}

const DEFAULT_NODES: OrbitNode[] = [
  {
    id: 'work',
    label: 'Work',
    href: '/work',
    detail: 'Studious · Scribe · Nomad',
    angle: -20,
    radius: 0.72,
  },
  {
    id: 'path',
    label: 'Path',
    href: '/path',
    detail: 'USACO · VEX · Research',
    angle: 95,
    radius: 0.68,
  },
  {
    id: 'music',
    label: 'Music',
    href: '/music',
    detail: "I'd Stay · Dreams",
    angle: 210,
    radius: 0.74,
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    detail: 'Le Rosey · Connect',
    angle: 300,
    radius: 0.62,
  },
]

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export function Constellation({
  nodes = DEFAULT_NODES,
  className = '',
}: {
  nodes?: OrbitNode[]
  className?: string
}) {
  const router = useRouter()
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(420)
  const [hover, setHover] = useState<string | null>(null)
  const [t, setT] = useState(0)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry?.contentRect.width ?? 420
      setSize(Math.min(520, Math.max(280, w)))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (reduce) return
    let raf = 0
    const start = performance.now()
    const loop = (now: number) => {
      setT((now - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  const cx = size / 2
  const cy = size / 2
  const maxR = size * 0.38

  const placed = useMemo(
    () =>
      nodes.map((n) => {
        const wobble = reduce ? 0 : Math.sin(t * 0.6 + n.angle) * 4
        const p = polar(cx, cy, n.radius * maxR + wobble, n.angle + t * 3)
        return { ...n, ...p }
      }),
    [nodes, cx, cy, maxR, t, reduce],
  )

  return (
    <div
      ref={wrapRef}
      className={`relative mx-auto w-full max-w-[520px] ${className}`}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Interactive map of portfolio sections"
      >
        <circle
          cx={cx}
          cy={cy}
          r={maxR * 0.95}
          fill="none"
          stroke="var(--color-line)"
          strokeDasharray="3 7"
          opacity={0.8}
        />
        <circle
          cx={cx}
          cy={cy}
          r={maxR * 0.55}
          fill="none"
          stroke="var(--color-line)"
          strokeDasharray="2 8"
          opacity={0.55}
        />

        {placed.map((n) => (
          <line
            key={`l-${n.id}`}
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke={
              hover === n.id ? 'var(--color-accent)' : 'var(--color-line)'
            }
            strokeWidth={hover === n.id ? 1.5 : 1}
            opacity={hover === n.id ? 0.9 : 0.55}
          />
        ))}

        {placed.map((a, i) =>
          placed.slice(i + 1).map((b) => {
            const dist = Math.hypot(a.x - b.x, a.y - b.y)
            if (dist > maxR * 1.15) return null
            return (
              <line
                key={`${a.id}-${b.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--color-accent)"
                strokeWidth={1}
                opacity={0.12}
              />
            )
          }),
        )}

        <motion.circle
          cx={cx}
          cy={cy}
          r={18}
          fill="var(--color-ink)"
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: easeOut }}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="11"
          fontFamily="var(--font-outfit), sans-serif"
          letterSpacing="0.08em"
        >
          AS
        </text>

        {placed.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={hover === n.id ? 14 : 12}
              fill="transparent"
              className="cursor-pointer"
              onPointerEnter={() => setHover(n.id)}
              onPointerLeave={() => setHover(null)}
              onClick={() => router.push(n.href)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') router.push(n.href)
              }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={hover === n.id ? 11 : 8}
              fill={
                hover === n.id
                  ? 'var(--color-accent)'
                  : 'var(--color-bg-elevated)'
              }
              stroke="var(--color-accent)"
              strokeWidth={1.5}
              className="pointer-events-none"
            />
            <text
              x={n.x}
              y={n.y + 22}
              textAnchor="middle"
              fill="var(--color-ink)"
              fontSize="12"
              fontFamily="var(--font-outfit), ui-sans-serif, system-ui, sans-serif"
              className="pointer-events-none"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="text-ink-faint mt-2 min-h-[1.25rem] text-center font-mono text-[11px] tracking-[0.12em] uppercase">
        {hover
          ? placed.find((n) => n.id === hover)?.detail
          : 'Hover a node · click to enter'}
      </div>
    </div>
  )
}
