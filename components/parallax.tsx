'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Scroll parallax as a layering device. `depth` is the total travel (px)
 * across the element's pass through the viewport; negative moves against
 * the scroll. Layers with different depths read as different planes.
 * Honors prefers-reduced-motion by rendering static.
 */
export function Parallax({
  children,
  depth = 40,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  depth?: number
  className?: string
  as?: 'div' | 'figure' | 'span'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [depth / 2, -depth / 2])
  const Tag = motion[as] as typeof motion.div

  if (reduce) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }
  return (
    <Tag ref={ref} className={className} style={{ y, willChange: 'transform' }}>
      {children}
    </Tag>
  )
}

/**
 * Image plane inside a clipped frame. The child (an absolutely positioned
 * image or video) is oversized by `scale` so its vertical drift never shows
 * an edge. Use inside a `relative overflow-hidden` frame.
 */
export function ParallaxPlane({
  children,
  travel = 0.12,
  className = '',
}: {
  children: ReactNode
  /** Fraction of frame height the plane drifts across the pass (0.12 = 12%) */
  travel?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const pct = (travel * 100) / 2
  const y = useTransform(scrollYProgress, [0, 1], [`${pct}%`, `-${pct}%`])
  const inset = -(travel * 100) / 2

  if (reduce) {
    return (
      <div ref={ref} className={`absolute inset-0 ${className}`}>
        {children}
      </div>
    )
  }
  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div
        className={`absolute inset-x-0 ${className}`}
        style={{
          top: `${inset}%`,
          bottom: `${inset}%`,
          y,
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
