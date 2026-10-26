'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

/**
 * A "projection room" section: the video is cast full-bleed across the
 * background with a slow scroll parallax, and content floats above it.
 */
export function Projection({
  id,
  src,
  className = '',
  videoOpacity = 0.45,
  videoPosition = 'center',
  children,
}: {
  id?: string
  src: string
  className?: string
  videoOpacity?: number
  videoPosition?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden bg-[#050607] text-white ${className}`}
    >
      {/* Oversized so the parallax drift never reveals an edge */}
      <motion.div
        className="absolute inset-x-0 -inset-y-[10%]"
        style={reduce ? undefined : { y }}
      >
        <video
          src={src}
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="h-full w-full object-cover"
          style={{ opacity: videoOpacity, objectPosition: videoPosition }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050607]/85 via-[#050607]/30 to-[#050607]/85" />

      <div className="relative z-10">{children}</div>
    </section>
  )
}
