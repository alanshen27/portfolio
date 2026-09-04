'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/portfolio-motion'
import {
  Movement,
  Numeral,
  PageTitle,
  ProgrammeRow,
} from '@/components/programme'
import { ScrollProgress } from '@/components/scroll-progress'
import { NumbersInterlude, QuoteInterlude } from '@/components/interlude'
import { PianoRoll } from '@/components/viz/piano-roll'
import { dateRange } from '@/lib/utils'
import {
  LINES,
  NOTES,
  PROJECT_KIND_LABEL,
  PROJECTS,
  WORK_EXPERIENCE,
  type Project,
} from '../data'

function linkLabel(href: string) {
  if (href.includes('youtu')) return 'watch the demo'
  if (href.includes('github')) return 'source on GitHub'
  if (href.includes('linkedin')) return 'context'
  return 'open the live site'
}

const NOTE_KEY: Record<string, keyof typeof NOTES> = {
  project1: 'studious',
  project2: 'scribe',
  'project-notate': 'notate',
}

const STAGES = ['ideate', 'engineer', 'verify', 'launch']

function Pipeline() {
  return (
    <div
      className="bg-panel-wash flex aspect-[16/10] w-full flex-col justify-center gap-4 p-6"
      aria-hidden
    >
      <p className="eyebrow-faint">from brief to storefront</p>
      <ol className="border-line-strong flex items-center border-y py-4">
        {STAGES.map((s, i) => (
          <li key={s} className="flex flex-1 items-center">
            <span className="display-quiet text-ink text-[clamp(0.95rem,1.4vw,1.2rem)]">
              {s}
            </span>
            {i < STAGES.length - 1 && (
              <span className="text-ink-faint mx-2 flex-1 text-center text-sm">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="text-ink-faint text-[13px] leading-relaxed">
        CAD · PCB · code · verification gates · Shopify checkout
      </p>
    </div>
  )
}

function Visual({ p }: { p: Project }) {
  if (p.image) {
    return (
      <div className="bg-mist relative aspect-[16/10] overflow-hidden">
        <Image
          src={p.image}
          alt={`${p.name} screenshot`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    )
  }
  if (p.id === 'project-notate') return <PianoRoll className="aspect-[16/10]" />
  return <Pipeline />
}

export default function WorkPage() {
  const roles = WORK_EXPERIENCE.filter((w) => w.company !== 'Institut Le Rosey')

  return (
    <>
      <ScrollProgress />
      <PageTitle
        kicker="ii · works"
        title="complete programme notes"
        standfirst={`${PROJECTS.length} works — two companies, three hackathon podiums, and two research-grade side builds — each with what it is, what Alan did, and what came of it.`}
        contents={PROJECTS.map((p) => ({ label: p.name, href: `#${p.id}` }))}
      />

      {/* Listing */}
      <section className="py-12 md:py-16">
        <div className="section-max section-pad">
          <Reveal className="md:ml-[33.333%]" y={12}>
            <ol className="ledger border-line border-y">
              {PROJECTS.map((p, i) => (
                <li key={p.id}>
                  <ProgrammeRow
                    n={i + 1}
                    title={p.name}
                    subtitle={p.description}
                    right={p.outcome ?? p.role ?? ''}
                    href={`#${p.id}`}
                  />
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* beat — by the numbers */}
      <NumbersInterlude
        items={[
          { value: String(PROJECTS.length), label: 'works' },
          { value: '2', label: 'companies founded or co-founded' },
          { value: '3', label: 'hackathon podiums' },
          { value: '2', label: 'research-grade side builds' },
        ]}
      />

      {/* Notes */}
      <section className="bg-bg-elevated py-12 md:py-16">
        <div className="section-max section-pad">
          <Movement n={2} title="notes on the works" />
          <div className="mt-6">
            {PROJECTS.map((project, i) => {
              const key = NOTE_KEY[project.id]
              const paragraphs = key ? NOTES[key] : [project.description]
              const flip = i % 2 === 1
              return (
                <Reveal key={project.id} y={16}>
                  <article
                    id={project.id}
                    className="border-line grid scroll-mt-24 gap-6 border-t py-10 md:grid-cols-12 md:gap-10 md:py-12"
                  >
                    <div
                      className={`md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Visual p={project} />
                      </a>
                      {project.photo && (
                        <figure className="mt-3">
                          <div className="bg-mist relative aspect-[16/7] overflow-hidden">
                            <Image
                              src={project.photo}
                              alt={project.photoCaption ?? `${project.name}`}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 768px) 100vw, 40vw"
                            />
                          </div>
                          <figcaption className="text-ink-faint mt-2 text-[13px] leading-snug">
                            {project.photoCaption}
                          </figcaption>
                        </figure>
                      )}
                    </div>
                    <div
                      className={`md:col-span-7 ${flip ? 'md:order-1 md:col-start-1' : ''}`}
                    >
                      <p className="eyebrow">
                        <Numeral n={i + 1} className="text-accent mr-1.5" />
                        {project.kind
                          ? PROJECT_KIND_LABEL[project.kind]
                          : 'Build'}
                        <span className="text-ink-faint">
                          {' '}
                          · {project.role}
                          {project.timeframe ? ` · ${project.timeframe}` : ''}
                        </span>
                      </p>
                      <h3 className="display-quiet text-ink mt-2 text-[clamp(1.7rem,3.2vw,2.3rem)]">
                        {project.name}
                      </h3>
                      {project.outcome && (
                        <p className="text-accent-deep mt-2 text-base font-medium">
                          {project.outcome}
                        </p>
                      )}
                      <div className="mt-4">
                        {paragraphs.map((para, j) => (
                          <p
                            key={j}
                            className={`note-text ${j === 0 ? 'drop-cap' : ''}`}
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                      {project.points && (
                        <ul className="tick-list text-ink-soft mt-4 grid gap-x-6 gap-y-1.5 text-[13px] leading-snug sm:grid-cols-2">
                          {project.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                      <div className="border-line mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 border-t pt-3">
                        <p className="text-ink-faint text-[13px]">
                          {project.tags?.join(' · ')}
                        </p>
                        <span className="flex gap-4 text-sm">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="row-link"
                          >
                            {linkLabel(project.link)} →
                          </a>
                          {project.repo && project.repo !== project.link && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="row-link"
                            >
                              source →
                            </a>
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* beat — a line */}
      <QuoteInterlude source="Alan, on the work">
        “{LINES.systems}”
      </QuoteInterlude>

      {/* Appointments */}
      <section className="py-12 md:py-16">
        <div className="section-max section-pad">
          <Movement
            n={3}
            title="appointments"
            standfirst="where the works were made."
          />
          <Reveal className="mt-8 md:ml-[33.333%]" y={12}>
            <ol className="ledger border-line border-y">
              {roles.map((job, i) => (
                <li key={job.id}>
                  <ProgrammeRow
                    n={i + 1}
                    title={job.company}
                    subtitle={job.title}
                    right={dateRange(job.start, job.end)}
                    href={job.link}
                  />
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="border-line bg-bg-elevated border-t py-10">
        <div className="section-max section-pad flex flex-wrap items-baseline justify-between gap-4">
          <p className="display-quiet text-ink text-[clamp(1.2rem,2.4vw,1.6rem)]">
            next: the record — scores, honours, publications.
          </p>
          <Link href="/path" className="row-link text-sm">
            iii · record →
          </Link>
        </div>
      </section>
    </>
  )
}
