'use client'

import { motion, useReducedMotion } from 'motion/react'
import { CountUp } from './count-up'
import { easeOut, easeSnap } from '@/components/portfolio-motion'

/**
 * Eye-catching USACO scoreboard — perfect 1000 → Gold.
 */
export function UsacoBoard({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`relative overflow-hidden bg-ink text-white ${className}`}
      aria-label="USACO Silver contest: 1000 out of 1000, promoted to Gold"
    >
      {/* ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(80% 70% at 80% 20%, rgba(15,92,86,0.55), transparent 55%), radial-gradient(60% 50% at 10% 90%, rgba(111,151,168,0.25), transparent 50%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase">
            USACO · Feb 2026
          </p>
          <motion.span
            className="bg-accent px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-white uppercase"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.4, ease: easeSnap }}
          >
            Gold
          </motion.span>
        </div>

        <div className="mt-6 flex items-end gap-2">
          <p className="text-[clamp(3.5rem,10vw,5rem)] leading-none font-bold tracking-[-0.05em] tabular-nums">
            <CountUp to={1000} duration={1800} />
          </p>
          <p className="mb-2 font-mono text-sm text-white/40">/ 1000</p>
        </div>

        <p className="mt-2 text-sm text-white/60">
          Perfect Silver · promoted straight to Gold
        </p>

        {/* score fill bar */}
        <div className="mt-6 h-1.5 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-accent"
            initial={reduce ? { width: '100%' } : { width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: easeOut, delay: 0.2 }}
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.12em] text-white/45 uppercase">
          <div>
            <p className="text-white/30">Division</p>
            <p className="mt-1 text-white/80">Silver → Gold</p>
          </div>
          <div>
            <p className="text-white/30">Score</p>
            <p className="mt-1 text-white/80">1000 / 1000</p>
          </div>
          <div>
            <p className="text-white/30">Method</p>
            <p className="mt-1 text-white/80">Binary search</p>
          </div>
        </div>

        {/* mini code flash */}
        <motion.pre
          className="mt-5 overflow-hidden border border-white/10 bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-white/55"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: easeOut }}
          aria-hidden
        >
          <span className="text-accent">while</span>
          {' (lo < hi) {\n  mid = lo + (hi - lo) / 2;\n  '}
          <span className="text-lake">if</span>
          {' (ok(mid)) hi = mid;\n  '}
          <span className="text-lake">else</span>
          {' lo = mid + 1;\n}'}
        </motion.pre>
      </div>
    </div>
  )
}
