'use client'

import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import type { ProjectDeviceKind } from '@/app/data'

/** Angles per project vibe — no fake laptop chrome. */
const POSE: Record<
  ProjectDeviceKind,
  { rx: number; ry: number; aspect: string; maxW: string }
> = {
  laptop: { rx: 8, ry: -18, aspect: '16 / 10', maxW: '740px' },
  desk: { rx: 12, ry: -22, aspect: '16 / 10', maxW: '700px' },
  monitor: { rx: 6, ry: -14, aspect: '16 / 10', maxW: '680px' },
  tvModern: { rx: 5, ry: -16, aspect: '16 / 9', maxW: '780px' },
  tvVintage: { rx: 7, ry: -20, aspect: '16 / 9', maxW: '720px' },
}

export function DeviceFrame({
  image,
  kind = 'laptop',
  alt = '',
  className = '',
}: {
  image: string
  kind?: ProjectDeviceKind
  alt?: string
  className?: string
}) {
  const pose = POSE[kind] ?? POSE.laptop
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })

  const rotateX = useTransform(sy, [-0.5, 0.5], [pose.rx + 7, pose.rx - 7])
  const rotateY = useTransform(sx, [-0.5, 0.5], [pose.ry - 10, pose.ry + 10])
  const glareX = useTransform(sx, [-0.5, 0.5], ['15%', '85%'])
  const glareY = useTransform(sy, [-0.5, 0.5], ['10%', '70%'])

  function onMove(e: PointerEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`shot-scene relative mx-auto w-full ${className}`}
      style={{ maxWidth: pose.maxW, perspective: 1600 }}
    >
      {/* Soft under-glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[12%] bottom-[2%] h-[28%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(13,107,107,0.35),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[18%] -bottom-2 h-10 rounded-[100%] bg-black/70 blur-3xl"
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          aspectRatio: pose.aspect,
        }}
        className="shot-panel relative w-full"
      >
        {/* Thin glass edge — not a plastic bezel */}
        <div className="absolute inset-0 rounded-[10px] bg-[#0a0e14] shadow-[0_40px_100px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08)]" />

        <div className="absolute inset-[3px] overflow-hidden rounded-[8px] bg-ink md:inset-[4px]">
          <Image
            src={image}
            alt={alt}
            fill
            className="shot-img object-cover object-top"
            sizes="(max-width: 1024px) 90vw, 55vw"
            priority
          />

          {/* LCD edge falloff */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]"
          />

          {/* Moving specular */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[140%] w-[55%] -translate-x-1/2 -translate-y-1/2 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] mix-blend-soft-light"
            style={{ left: glareX, top: glareY }}
          />

          {/* Corner highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_12%_0%,rgba(255,255,255,0.16),transparent_42%)]"
          />

          {/* Subtle film grain */}
          <div aria-hidden className="shot-grain pointer-events-none absolute inset-0" />
        </div>
      </motion.div>

      {/* Floor mirror reflection */}
      <div
        aria-hidden
        className="shot-mirror pointer-events-none relative mx-auto mt-3 h-[22%] w-[92%] overflow-hidden opacity-40"
        style={{
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 85%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 85%)',
        }}
      >
        <div
          className="relative h-[450%] w-full origin-top"
          style={{
            transform: `scaleY(-1) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg)`,
            transformStyle: 'preserve-3d',
            filter: 'blur(6px) saturate(0.85) brightness(0.55)',
          }}
        >
          <div className="relative w-full" style={{ aspectRatio: pose.aspect }}>
            <Image
              src={image}
              alt=""
              fill
              className="object-cover object-top"
              sizes="40vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function DeviceStage({
  image,
  kind = 'laptop',
  alt = '',
  direction = 0,
}: {
  image: string
  kind?: ProjectDeviceKind
  alt?: string
  direction?: number
}) {
  return (
    <motion.div
      key={image + kind}
      initial={{
        opacity: 0,
        x: direction >= 0 ? 48 : -48,
        filter: 'blur(10px)',
        scale: 0.96,
      }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
      exit={{
        opacity: 0,
        x: direction >= 0 ? -36 : 36,
        filter: 'blur(8px)',
        scale: 0.98,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full w-full items-center justify-center px-5 py-10 md:px-12 md:py-16"
    >
      <DeviceFrame image={image} kind={kind} alt={alt} />
    </motion.div>
  )
}
