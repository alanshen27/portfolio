'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { easeOut } from '@/components/portfolio-motion'

export type Metric = {
  label: string
  value: number
  suffix?: string
  prefix?: string
  detail: string
  /** 0–1 sparkline points */
  spark?: number[]
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!active) return
    if (reduce) {
      setValue(target)
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, duration, reduce, target])

  return value
}

function Sparkline({ points, accent }: { points: number[]; accent: boolean }) {
  const w = 88
  const h = 28
  const max = Math.max(...points, 0.001)
  const min = Math.min(...points, 0)
  const range = max - min || 1
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / range) * (h - 4) - 2
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <path
        d={d}
        fill="none"
        stroke={accent ? 'var(--color-accent)' : 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={accent ? '' : 'text-ink/25'}
      />
    </svg>
  )
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const count = useCountUp(metric.value, inView)
  const reduce = useReducedMotion()

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: easeOut }}
      className="group relative overflow-hidden border border-line bg-bg-elevated/80 p-5 backdrop-blur-sm md:p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(80% 80% at 100% 0%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent)',
        }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
          {metric.label}
        </p>
        {metric.spark && <Sparkline points={metric.spark} accent />}
      </div>
      <p className="relative mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] leading-none tracking-tight text-ink tabular-nums">
        {metric.prefix}
        {count}
        {metric.suffix}
      </p>
      <p className="relative mt-2 text-sm text-ink-soft">{metric.detail}</p>
    </motion.li>
  )
}

export function MetricBoard({ metrics }: { metrics: Metric[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, i) => (
        <MetricCard key={m.label} metric={m} index={i} />
      ))}
    </ul>
  )
}
