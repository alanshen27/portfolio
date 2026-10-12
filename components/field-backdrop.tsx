'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useId } from 'react'

/**
 * Coordinate-grid field with drifting CP marks — not concentric ripples.
 */
export function FieldBackdrop({
  className = '',
  math = true,
}: {
  className?: string
  math?: boolean
}) {
  const reduce = useReducedMotion()
  const gid = useId().replace(/:/g, '')

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id={`${gid}-grid`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(14,20,25,0.05)"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gid}-grid)`} />
        <motion.path
          d="M -40 180 C 120 40, 240 280, 420 120 S 720 40, 980 200"
          fill="none"
          stroke="rgba(15,92,86,0.14)"
          strokeWidth="1.2"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M -20 320 C 160 220, 300 400, 520 260 S 800 180, 1100 340"
          fill="none"
          stroke="rgba(111,151,168,0.18)"
          strokeWidth="1"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {math && (
        <div className="text-ink/[0.08] absolute inset-0 font-mono select-none">
          <span className="absolute top-[14%] right-[8%] text-2xl">∑</span>
          <span className="absolute bottom-[18%] left-[6%] text-[11px] tracking-wider">
            O(V+E)
          </span>
          <span className="absolute top-[62%] right-[14%] text-[11px]">
            mid = lo+(hi-lo)/2
          </span>
        </div>
      )}
    </div>
  )
}
