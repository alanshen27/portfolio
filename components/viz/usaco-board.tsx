'use client'

import { motion, useReducedMotion } from 'motion/react'
import { CountUp } from './count-up'
import { easeOut, easeSnap } from '@/components/portfolio-motion'

/**
 * USACO plaque — a perfect Silver contest and direct promotion to Gold.
 * Dark paper, serif figure, no code decoration.
 */
export function UsacoBoard({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`bg-ink relative overflow-hidden text-white ${className}`}
      aria-label="USACO Silver contest: 1000 out of 1000, promoted to Gold"
    >
      <div className="relative z-10 p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow text-accent-bright">USACO · february 2026</p>
          <motion.span
            className="text-accent-bright border-accent-bright/40 border px-2.5 py-0.5 text-[12px] font-medium"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.4, ease: easeSnap }}
          >
            gold division
          </motion.span>
        </div>

        <div className="mt-6 flex items-baseline gap-3">
          <p className="figure text-[clamp(3.5rem,9vw,5rem)]">
            <CountUp to={1000} duration={1800} />
          </p>
          <p className="text-lg text-white/45">of 1000</p>
        </div>

        <p className="mt-2 max-w-sm text-[15px] leading-snug text-white/70">
          a perfect score in the Silver contest, promoting straight to Gold.
        </p>

        <div className="mt-6 h-px overflow-hidden bg-white/10">
          <motion.div
            className="bg-accent-bright h-full"
            initial={reduce ? { width: '100%' } : { width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: easeOut, delay: 0.2 }}
          />
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-3 text-[13px]">
          <div>
            <dt className="text-[12px] text-white/40">division</dt>
            <dd className="mt-1 text-white/85">Silver → Gold</dd>
          </div>
          <div>
            <dt className="text-[12px] text-white/40">score</dt>
            <dd className="mt-1 text-white/85">1000 / 1000</dd>
          </div>
          <div>
            <dt className="text-[12px] text-white/40">promotion</dt>
            <dd className="mt-1 text-white/85">direct</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
