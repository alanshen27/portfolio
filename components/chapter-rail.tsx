'use client'

import { useEffect, useState } from 'react'

export type Chapter = { id: string; label: string }

/**
 * Fixed left rail tracking scroll position through page chapters.
 * mix-blend-difference keeps it legible over both light and dark sections.
 */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    for (const c of chapters) {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [chapters])

  return (
    <nav
      aria-label="Chapters"
      className="fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 flex-col gap-3.5 mix-blend-difference xl:flex"
    >
      {chapters.map((c, i) => {
        const on = active === c.id
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                on ? 'text-white' : 'text-white/35 group-hover:text-white/70'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                on
                  ? 'w-6 bg-white'
                  : 'w-3 bg-white/30 group-hover:bg-white/60'
              }`}
            />
            <span
              className={`text-[10px] tracking-[0.16em] text-white uppercase transition-opacity duration-300 ${
                on ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
              }`}
            >
              {c.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
