'use client'

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react'
import type { ReactNode } from 'react'

export const easeOut = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 32,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`min-w-0 ${className}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: easeOut },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

const FRAME_MARK: Record<string, string> = {
  ink: 'border-ink/40',
  white: 'border-white/70',
  accent: 'border-accent',
}

const FRAME_FILL: Record<string, string> = {
  none: '',
  mist: 'bg-panel-mist',
  lake: 'bg-panel-lake',
  wash: 'bg-panel-wash',
  white: 'bg-bg-elevated',
  ink: 'bg-ink text-white',
}

/**
 * Colored panel with L-bracket crop marks.
 * Marks sit inset inside the panel so parents can safely use overflow:hidden.
 */
export function CropFrame({
  children,
  className = '',
  tone = 'accent',
  fill = 'none',
  marks = 'all',
}: {
  children: ReactNode
  className?: string
  tone?: 'ink' | 'white' | 'accent'
  fill?: 'none' | 'mist' | 'lake' | 'wash' | 'white' | 'ink'
  marks?: 'all' | 'corners' | 'tl' | 'tr' | 'bl' | 'br'
}) {
  const mark = FRAME_MARK[tone]
  const show = (pos: 'tl' | 'tr' | 'bl' | 'br') => {
    if (marks === 'all' || marks === 'corners') return true
    return marks === pos
  }

  return (
    <div className={`relative min-w-0 ${FRAME_FILL[fill]} ${className}`}>
      {show('tl') && (
        <span
          className={`pointer-events-none absolute top-3 left-3 z-20 h-5 w-5 border-t-2 border-l-2 ${mark}`}
          aria-hidden
        />
      )}
      {show('tr') && (
        <span
          className={`pointer-events-none absolute top-3 right-3 z-20 h-5 w-5 border-t-2 border-r-2 ${mark}`}
          aria-hidden
        />
      )}
      {show('bl') && (
        <span
          className={`pointer-events-none absolute bottom-3 left-3 z-20 h-5 w-5 border-b-2 border-l-2 ${mark}`}
          aria-hidden
        />
      )}
      {show('br') && (
        <span
          className={`pointer-events-none absolute right-3 bottom-3 z-20 h-5 w-5 border-r-2 border-b-2 ${mark}`}
          aria-hidden
        />
      )}
      {children}
    </div>
  )
}

/** Oversized index that clips past its row — overflow / underflow */
export function GhostIndex({
  value,
  className = '',
}: {
  value: string | number
  className?: string
}) {
  const label = typeof value === 'number' ? String(value).padStart(2, '0') : value

  return (
    <span
      className={`ghost-index pointer-events-none absolute top-1/2 right-0 z-0 -translate-y-1/2 select-none font-[family-name:var(--font-display)] text-[clamp(4.5rem,12vw,7.5rem)] leading-none font-extrabold tracking-[-0.06em] ${className}`}
      aria-hidden
    >
      {label}
    </span>
  )
}

/** Image that clips open on scroll — no zoom / parallax */
export function ClipImage({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right'
}) {
  const reduce = useReducedMotion()

  const clipFrom =
    direction === 'left'
      ? 'inset(0 100% 0 0)'
      : direction === 'right'
        ? 'inset(0 0 0 100%)'
        : 'inset(100% 0 0 0)'

  if (reduce) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: clipFrom }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.05, ease: easeOut }}
    >
      <div className="h-full w-full">{children}</div>
    </motion.div>
  )
}

export function SplitWords({
  text,
  className = '',
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              ease: easeOut,
              delay: delay + i * 0.055,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function SplitChars({
  text,
  className = '',
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const chars = text.split('')

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block overflow-hidden"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: '120%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.65,
              ease: easeOut,
              delay: delay + i * 0.035,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function DrawLine({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={`origin-top bg-accent ${className}`}
      initial={reduce ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease: easeOut }}
    />
  )
}

export function useParallax(
  value: MotionValue<number>,
  distance: number,
): MotionValue<number> {
  return useTransform(value, [0, 1], [-distance, distance])
}

export function Marquee({
  items,
  className = '',
}: {
  items: string[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const row = [...items, ...items]

  return (
    <div
      className={`relative overflow-hidden border-y border-line ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-elevated to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-elevated to-transparent" />
      <motion.div
        className="flex w-max gap-10 py-4 whitespace-nowrap"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={
          reduce
            ? undefined
            : { duration: 28, ease: 'linear', repeat: Infinity }
        }
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-[family-name:var(--font-display)] text-sm font-medium tracking-wide text-ink-soft"
          >
            {item}
            <span className="ml-10 text-accent" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
