'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import type { DeviceModel } from '@/components/devices-3d'
import { easeSnap } from '@/components/portfolio-motion'
import { PROJECTS } from '@/app/data'

const ProjectDeviceCanvas = dynamic(
  () =>
    import('@/components/devices-3d').then((m) => m.ProjectDeviceCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[70svh] w-full items-center justify-center">
        <span className="text-[10px] tracking-[0.2em] text-white/35 uppercase">
          Loading machine…
        </span>
      </div>
    ),
  },
)

function linkLabel(href: string) {
  if (href.includes('youtu')) return 'Watch demo'
  if (href.includes('linkedin')) return 'Context'
  return 'Open live'
}

export function WorkStage() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const project = PROJECTS[index]
  const total = PROJECTS.length

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + total) % total)
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  if (!project) return null

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#070b10] text-white md:pl-16 lg:pl-[4.5rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_40%,rgba(13,107,107,0.28),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[56px_56px] opacity-50" />

      {/* 3D machine */}
      <div className="absolute inset-0 z-0 md:left-[8%] lg:left-[5%]">
        <ProjectDeviceCanvas
          image={project.image ?? '/studious.png'}
          model={(project.device ?? 'laptop') as DeviceModel}
          spinKey={project.id}
          forceActive
          minHeight="100svh"
          className="h-full min-h-[100svh] w-full"
        />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[42%] bg-gradient-to-r from-[#070b10] via-[#070b10]/75 to-transparent md:w-[38%]" />

      {/* Side label — pops on each project */}
      <div className="pointer-events-none relative z-20 flex min-h-[100svh] items-center px-5 py-24 sm:px-8 md:px-10 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.aside
            key={project.id}
            className="pointer-events-auto w-full max-w-sm border border-white/15 bg-[#070b10]/80 p-6 backdrop-blur-md md:p-7"
            initial={
              reduce
                ? false
                : { opacity: 0, x: -36, filter: 'blur(8px)' }
            }
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={
              reduce
                ? undefined
                : { opacity: 0, x: -20, filter: 'blur(6px)' }
            }
            transition={{ duration: 0.45, ease: easeSnap }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(total).padStart(2, '0')}
              </span>
              <span className="text-[10px] tracking-[0.16em] text-white/40 uppercase">
                {project.device ?? 'laptop'}
              </span>
            </div>

            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] leading-none font-extrabold tracking-[-0.03em] uppercase">
              {project.name}
            </h2>

            <p className="mt-2 text-[10px] tracking-[0.14em] text-lake uppercase">
              {project.role}
              {project.timeframe ? ` · ${project.timeframe}` : ''}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {project.description}
            </p>

            {project.points && project.points.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                {project.points.slice(0, 3).map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-xs leading-relaxed text-white/55"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-accent/50 bg-accent/15 px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-lake uppercase transition-colors hover:bg-accent hover:text-white"
            >
              {linkLabel(project.link)}
              <span aria-hidden>↗</span>
            </a>
          </motion.aside>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 px-5 py-6 sm:px-8 md:px-10 lg:px-12">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-accent hover:bg-accent"
          aria-label="Previous project"
        >
          ←
        </button>

        <div className="flex flex-1 items-center justify-center gap-2">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={p.name}
              aria-current={i === index}
              className={`h-1.5 transition-all ${
                i === index
                  ? 'w-8 bg-accent'
                  : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-accent hover:bg-accent"
          aria-label="Next project"
        >
          →
        </button>
      </div>

      <p className="pointer-events-none absolute top-6 right-6 z-20 hidden text-[10px] tracking-[0.2em] text-white/35 uppercase md:block lg:right-10">
        Work · Drag to orbit · ← →
      </p>

      <Link
        href="/music"
        className="absolute top-6 left-5 z-30 text-[10px] tracking-[0.18em] text-white/50 uppercase transition-colors hover:text-accent sm:left-8 md:left-24 lg:left-28"
      >
        Exit → Music
      </Link>
    </section>
  )
}
