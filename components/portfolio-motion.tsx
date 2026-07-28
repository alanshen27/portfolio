'use client'

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react'
import type { ReactNode } from 'react'

export const easeOut = [0.22, 1, 0.36, 1] as const
export const easeSnap = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 40,
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
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px', amount: 0.2 }}
      transition={{ duration: 0.85, ease: easeSnap, delay }}
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
        hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.65, ease: easeSnap },
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

/** Image that clips open on scroll — no zoom / Ken Burns */
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

  const slideFrom =
    direction === 'left'
      ? { x: '-8%' }
      : direction === 'right'
        ? { x: '8%' }
        : { y: '10%' }

  if (reduce) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: clipFrom }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.15, ease: easeSnap }}
    >
      <motion.div
        className="h-full w-full"
        initial={slideFrom}
        whileInView={{ x: 0, y: 0 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 1.25, ease: easeSnap }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Corner L-brackets that draw in on view */
export function AnimatedCorners({
  className = '',
  tone = 'accent',
  inset = '1.25rem',
  /** Offset left corners past the fixed AS spine */
  clearSpine = true,
}: {
  className?: string
  tone?: 'accent' | 'white'
  inset?: string
  clearSpine?: boolean
}) {
  const reduce = useReducedMotion()
  const border =
    tone === 'white' ? 'border-white/70' : 'border-accent'

  const leftClass = clearSpine
    ? 'left-[var(--corner-inset)] md:left-[calc(4rem+var(--corner-inset))] lg:left-[calc(4.5rem+var(--corner-inset))]'
    : 'left-[var(--corner-inset)]'
  const rightClass = 'right-[var(--corner-inset)]'
  const topClass = 'top-[var(--corner-inset)]'
  const bottomClass = 'bottom-[var(--corner-inset)]'

  const corners = [
    {
      pos: `${topClass} ${leftClass}`,
      cls: `border-t-2 border-l-2 ${border}`,
    },
    {
      pos: `${topClass} ${rightClass}`,
      cls: `border-t-2 border-r-2 ${border}`,
    },
    {
      pos: `${bottomClass} ${leftClass}`,
      cls: `border-b-2 border-l-2 ${border}`,
    },
    {
      pos: `${bottomClass} ${rightClass}`,
      cls: `border-r-2 border-b-2 ${border}`,
    },
  ] as const

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 ${className}`}
      style={{ ['--corner-inset' as string]: inset }}
      aria-hidden
    >
      {corners.map((c, i) => (
        <motion.span
          key={i}
          className={`absolute h-10 w-10 md:h-14 md:w-14 ${c.pos} ${c.cls}`}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.15 + i * 0.08,
            ease: easeSnap,
          }}
        />
      ))}
    </div>
  )
}

export function ScrollCue({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={`pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 ${className}`}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      aria-hidden
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <span className="text-[10px] tracking-[0.28em] text-white/50 uppercase">
          Scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
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
            initial={{ y: '110%', rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{
              duration: 0.75,
              ease: easeSnap,
              delay: delay + i * 0.05,
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
  inView = false,
}: {
  text: string
  className?: string
  delay?: number
  inView?: boolean
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
            initial={{ y: '120%', opacity: 0, rotate: 6 }}
            {...(inView
              ? {
                  whileInView: { y: 0, opacity: 1, rotate: 0 },
                  viewport: { once: true, amount: 0.6 },
                }
              : { animate: { y: 0, opacity: 1, rotate: 0 } })}
            transition={{
              duration: 0.7,
              ease: easeSnap,
              delay: delay + i * 0.028,
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
