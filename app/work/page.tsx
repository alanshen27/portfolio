'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Reveal } from '@/components/portfolio-motion'
import { PageHero } from '@/components/page-hero'
import { ScrollProgress } from '@/components/scroll-progress'
import { PROJECTS, WORK_EXPERIENCE } from '../data'

function linkLabel(href: string) {
  if (href.includes('youtu')) return 'Watch demo'
  if (href.includes('linkedin')) return 'Context'
  return 'Open live'
}

export default function WorkPage() {
  const luduan = WORK_EXPERIENCE.find((w) => w.id === 'work3')

  return (
    <>
      <ScrollProgress />
      <PageHero
        kicker="Work"
        title="Software & product."
        description="Companies I founded and projects I shipped — what each one is, what I built, and where it placed."
        image="/media/hackathons/hackmit-workspace.jpg"
        imagePosition="center 45%"
      />

      <section className="bg-bg py-16 md:py-24">
        <div className="section-max section-pad space-y-20 md:space-y-28">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} y={26}>
              <article
                id={project.id}
                className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`relative block aspect-[16/10] overflow-hidden bg-mist lg:col-span-7 ${
                    i % 2 === 1 ? 'lg:order-2 lg:col-start-6' : ''
                  }`}
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  )}
                </motion.a>

                <div
                  className={`lg:col-span-5 ${
                    i % 2 === 1 ? 'lg:order-1 lg:col-start-1' : ''
                  }`}
                >
                  <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                    {String(i + 1).padStart(2, '0')} · {project.role}
                    {project.timeframe ? ` · ${project.timeframe}` : ''}
                  </p>
                  <h2 className="display-quiet mt-3 text-[clamp(1.8rem,4vw,2.6rem)] text-ink">
                    {project.name}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {project.description}
                  </p>
                  {project.points && (
                    <ul className="mt-5 space-y-2.5">
                      {project.points.map((point) => (
                        <li
                          key={point}
                          className="border-l border-accent/40 pl-3 text-sm leading-relaxed text-ink-soft"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-accent transition-opacity hover:opacity-70"
                  >
                    {linkLabel(project.link)}
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}

          {luduan && (
            <Reveal y={20}>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-y border-line py-7">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                    Also contributing
                  </p>
                  <h2 className="display-quiet mt-2 text-2xl text-ink">
                    {luduan.company}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                    {luduan.title} · {luduan.start} – {luduan.end}.{' '}
                    {luduan.bullets?.join(' ')}
                  </p>
                </div>
                <a
                  href={luduan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent transition-opacity hover:opacity-70"
                >
                  Visit ↗
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-bg-elevated py-14">
        <div className="section-max section-pad flex flex-wrap items-end justify-between gap-6">
          <p className="display-quiet text-[clamp(1.4rem,3vw,2rem)] text-ink">
            Next: competition & scores.
          </p>
          <Link
            href="/path"
            className="text-sm text-accent transition-opacity hover:opacity-70"
          >
            Open path →
          </Link>
        </div>
      </section>
    </>
  )
}
