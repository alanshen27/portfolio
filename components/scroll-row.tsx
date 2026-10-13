'use client'

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * A row wider than the page, played as a beat: when it reaches the middle
 * of the screen it holds there, and the page's vertical scroll walks it
 * sideways through every item before letting go. Under reduced motion it
 * falls back to a plain horizontal scroller.
 */
export function ScrollRow({
  children,
  label,
  className = '',
}: {
  children: ReactNode
  /** shown above the row while it holds */
  label?: string
  className?: string
}) {
  const outer = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [size, setSize] = useState({ distance: 0, height: 0 })
  const x = useMotionValue(0)
  const progress = useMotionValue(0)
  const smooth = useSpring(x, { stiffness: 220, damping: 34, mass: 0.35 })
  const bar = useSpring(progress, { stiffness: 220, damping: 34, mass: 0.35 })

  useEffect(() => {
    const measure = () => {
      if (!stage.current || !track.current) return
      setSize({
        distance: Math.max(
          0,
          track.current.scrollWidth - stage.current.clientWidth,
        ),
        height: stage.current.offsetHeight,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (stage.current) ro.observe(stage.current)
    if (track.current) ro.observe(track.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (reduce) return
    const update = () => {
      if (!outer.current || !stage.current) return
      const pinAt = parseFloat(getComputedStyle(stage.current).top) || 0
      const travelled = pinAt - outer.current.getBoundingClientRect().top
      const p = size.distance
        ? Math.min(1, Math.max(0, travelled / size.distance))
        : 0
      x.set(-p * size.distance)
      progress.set(p)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [reduce, size.distance, x, progress])

  if (reduce)
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex w-max gap-3">{children}</div>
      </div>
    )

  return (
    <div
      ref={outer}
      className={className}
      style={{
        height: size.height ? size.height + size.distance : undefined,
      }}
    >
      <div
        ref={stage}
        className="sticky top-[calc(50svh-var(--tile-h)/2-3rem)] overflow-hidden"
      >
        {size.distance > 0 && (
          <div className="mb-4 flex items-center gap-4">
            {label && <p className="label shrink-0">{label}</p>}
            <div className="bg-line relative h-px flex-1">
              <motion.div
                className="bg-ink absolute inset-0 origin-left"
                style={{ scaleX: bar }}
              />
            </div>
          </div>
        )}
        <motion.div
          ref={track}
          style={{ x: smooth }}
          className="flex w-max gap-3"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
