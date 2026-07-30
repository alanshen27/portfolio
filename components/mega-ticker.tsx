'use client'

import { motion, useReducedMotion } from 'motion/react'

export function MegaTicker({
  items,
  className = '',
  tone = 'ink',
  speed = 22,
  reverse = false,
}: {
  items: string[]
  className?: string
  tone?: 'ink' | 'accent' | 'white'
  speed?: number
  reverse?: boolean
}) {
  const reduce = useReducedMotion()
  const row = [...items, ...items, ...items]
  const color =
    tone === 'white'
      ? 'text-white/25'
      : tone === 'accent'
        ? 'text-accent/25'
        : 'text-ink/10'

  return (
    <div className={`overflow-hidden select-none ${className}`} aria-hidden>
      <motion.div
        className={`flex w-max gap-8 whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(3.5rem,10vw,8rem)] font-extrabold tracking-tight uppercase ${color}`}
        animate={
          reduce
            ? undefined
            : reverse
              ? { x: ['-33.333%', '0%'] }
              : { x: ['0%', '-33.333%'] }
        }
        transition={
          reduce
            ? undefined
            : { duration: speed, ease: 'linear', repeat: Infinity }
        }
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            {item}
            <motion.span
              className="text-[0.35em] text-accent"
              animate={reduce ? undefined : { rotate: [0, 90, 180, 270, 360] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 8, ease: 'linear', repeat: Infinity }
              }
            >
              ◆
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
