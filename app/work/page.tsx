'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { DeviceStage } from '@/components/device-frame'
import { ScrollProgress } from '@/components/scroll-progress'
import { Reveal, easeSnap } from '@/components/portfolio-motion'
import { PROJECTS } from '../data'

function linkLabel(href: string) {
  if (href.includes('youtu')) return 'Watch demo'
  if (href.includes('linkedin')) return 'Context'
  return 'Open live'
}

export default function WorkPage() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(0)
  const total = PROJECTS.length
  const project = PROJECTS[index]

  const go = useCallback(
    (next: number, direction: number) => {
      setDir(direction)
      setIndex((next + total) % total)
    },
    [total],
  )

  const prev = useCallback(() => go(index - 1, -1), [go, index])
  const next = useCallback(() => go(index + 1, 1), [go, index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  if (!project) return null

  const n = String(index + 1).padStart(2, '0')

  return (
    <>
      <ScrollProgress />

      <section className="relative min-h-[100svh] bg-[#070b10] text-white md:pl-16 lg:pl-[4.5rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_55%_at_65%_40%,rgba(13,107,107,0.28),transparent_60%)]" />

        <div className="relative flex min-h-[100svh] flex-col lg:flex-row">
          {/* Side label — pops with each project */}
          <div className="relative z-20 flex w-full flex-col justify-end border-b border-white/10 px-5 pt-16 pb-6 sm:px-8 lg:w-[min(400px,36%)] lg:justify-start lg:border-r lg:border-b-0 lg:px-10 lg:pt-20 lg:pb-16">
            <p className="text-[10px] tracking-[0.28em] text-lake uppercase">
              Work · {total} builds
            </p>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={project.id}
                custom={dir}
                initial={
                  reduce
                    ? false
                    : {
                        opacity: 0,
                        x: dir >= 0 ? -32 : 32,
                        filter: 'blur(8px)',
                      }
                }
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{
                  opacity: 0,
                  x: dir >= 0 ? 28 : -28,
                  filter: 'blur(6px)',
                }}
                transition={{ duration: 0.4, ease: easeSnap }}
                className="mt-8"
              >
                <div className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-display)] text-sm font-bold text-accent">
                    {n}
                  </span>
                  <span className="h-px flex-1 bg-white/15" />
                </div>

                <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,3.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase">
                  {project.name}
                </h1>

                <p className="mt-2 text-[11px] tracking-[0.14em] text-lake uppercase">
                  {project.role}
                  {project.timeframe ? ` · ${project.timeframe}` : ''}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-white/70">
                  {project.description}
                </p>

                {project.points && project.points.length > 0 && (
                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                    {project.points.slice(0, 3).map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-white/60"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 border border-accent/50 bg-accent/10 px-4 py-2.5 text-xs font-semibold tracking-[0.16em] text-lake uppercase transition-colors hover:bg-accent hover:text-white"
                >
                  {linkLabel(project.link)}
                  <span aria-hidden>↗</span>
                </a>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous project"
                className="flex h-12 w-12 items-center justify-center border border-white/20 text-lg text-white transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                className="flex h-12 w-12 items-center justify-center border border-white/20 text-lg text-white transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                →
              </button>
              <div className="ml-2 flex gap-1.5">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`Show ${p.name}`}
                    onClick={() => go(i, i > index ? 1 : -1)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? 'w-5 bg-accent'
                        : 'w-1.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-auto text-[10px] tracking-[0.16em] text-white/35 uppercase">
                {n} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Device stage */}
          <div className="relative flex min-h-[50vh] flex-1 items-center justify-center lg:min-h-[100svh]">
            <AnimatePresence mode="wait" custom={dir}>
              <DeviceStage
                key={project.id}
                image={project.image ?? '/studious.png'}
                kind={project.device ?? 'laptop'}
                alt={project.name}
                direction={dir}
              />
            </AnimatePresence>

          </div>
        </div>
      </section>

      <section className="spine-pad border-t border-white/10 bg-[#070b10] px-5 py-12 text-white sm:px-8 md:px-12 lg:px-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.28em] text-white/40 uppercase">
                Next
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.4rem,3vw,2rem)] font-extrabold uppercase">
                Off the machine. Onto the stage.
              </p>
            </div>
            <Link
              href="/music"
              className="inline-flex border border-white/25 px-4 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:border-accent hover:text-accent"
            >
              Open music →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
