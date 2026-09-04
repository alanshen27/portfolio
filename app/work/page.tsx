'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/portfolio-motion'
import { PageHero } from '@/components/page-hero'
import { ScrollProgress } from '@/components/scroll-progress'
import { PianoRoll } from '@/components/viz/piano-roll'
import { dateRange } from '@/lib/utils'
import {
  PROJECT_KIND_LABEL,
  PROJECTS,
  WORK_EXPERIENCE,
  type Project,
} from '../data'

function linkLabel(href: string) {
  if (href.includes('youtu')) return 'Watch demo'
  if (href.includes('github')) return 'Source'
  if (href.includes('linkedin')) return 'Context'
  return 'Open live'
}

const STAGES = ['Ideate', 'Engineer', 'Verify', 'Launch']

/** Placeholder visual for image-less builds — Foundry's four-stage pipeline. */
function StageStrip() {
  return (
    <div
      className="bg-panel-wash flex h-full w-full flex-col justify-center gap-4 p-6"
      aria-hidden
    >
      <p className="eyebrow-faint">From brief to storefront</p>
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
      <p className="text-ink-faint text-[12px] leading-relaxed">
        CAD · PCB · code · verification gates · Shopify checkout
      </p>
    </div>
  )
}

function Visual({ p }: { p: Project }) {
  if (p.image) {
    return (
      <Image
        src={p.image}
        alt={`${p.name} screenshot`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
    )
  }
  if (p.id === 'project-notate') return <PianoRoll className="h-full w-full" />
  return <StageStrip />
}

export default function WorkPage() {
  const roles = WORK_EXPERIENCE.filter((w) => w.company !== 'Institut Le Rosey')

  return (
    <>
      <ScrollProgress />
      <PageHero
        kicker="Work · software & product"
        title="Every build, with the role and the result."
        description={`${PROJECTS.length} projects: two companies, three hackathon podiums, and research-grade side builds. Index first, details below.`}
        image="/media/hackathons/hackmit-workspace.jpg"
        imagePosition="center 45%"
      />

      {/* Index */}
      <section className="border-line bg-bg-elevated border-b py-8 md:py-10">
        <div className="section-max section-pad">
          <Reveal y={10}>
            <div className="section-head">
              <h2 className="title">Index</h2>
              <span className="count">{PROJECTS.length} entries</span>
            </div>
            <ul className="ledger border-line border-b">
              {PROJECTS.map((p, i) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="group grid gap-x-5 gap-y-1 py-2.5 text-sm md:grid-cols-12 md:items-baseline"
                  >
                    <span className="flex items-baseline gap-2.5 md:col-span-3">
                      <span className="text-ink-faint w-4 text-[12px]">
                        {i + 1}
                      </span>
                      <span className="display-quiet text-ink group-hover:text-accent text-lg">
                        {p.name}
                      </span>
                      <span className="pill">
                        {p.kind ? PROJECT_KIND_LABEL[p.kind] : 'Build'}
                      </span>
                    </span>
                    <span className="text-ink-soft md:col-span-3">
                      {p.role}
                    </span>
                    <span className="text-accent-deep text-[13px] font-medium md:col-span-4">
                      {p.outcome}
                    </span>
                    <span className="eyebrow-faint md:col-span-2 md:text-right">
                      {p.timeframe}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Detail blocks */}
      <section className="bg-bg py-10 md:py-14">
        <div className="section-max section-pad">
          <ul className="ledger">
            {PROJECTS.map((project) => (
              <li key={project.id} className="py-8 first:pt-0 md:py-10">
                <Reveal y={18}>
                  <article
                    id={project.id}
                    className="grid scroll-mt-24 gap-6 lg:grid-cols-12 lg:gap-10"
                  >
                    <div className="lg:col-span-5">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card bg-mist relative block aspect-[16/10] overflow-hidden"
                      >
                        <Visual p={project} />
                      </a>
                      {project.photo && (
                        <figure className="mt-2 flex items-center gap-3">
                          <div className="bg-mist relative h-14 w-24 shrink-0 overflow-hidden">
                            <Image
                              src={project.photo}
                              alt={
                                project.photoCaption ?? `${project.name} team`
                              }
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </div>
                          <figcaption className="eyebrow-faint leading-snug">
                            {project.photoCaption}
                          </figcaption>
                        </figure>
                      )}
                    </div>

                    <div className="lg:col-span-7">
                      <p className="eyebrow">
                        {project.kind
                          ? PROJECT_KIND_LABEL[project.kind]
                          : 'Build'}
                        <span className="text-ink-faint">
                          {' '}
                          · {project.role}
                          {project.timeframe ? ` · ${project.timeframe}` : ''}
                        </span>
                      </p>
                      <h2 className="display-quiet text-ink mt-1.5 text-[clamp(1.6rem,3vw,2.2rem)]">
                        {project.name}
                      </h2>
                      <p className="text-ink mt-2.5 text-base leading-snug">
                        {project.description}
                      </p>
                      {project.outcome && (
                        <p className="text-accent-deep mt-3 font-serif text-base italic">
                          {project.outcome}
                        </p>
                      )}
                      {project.points && (
                        <ul className="tick-list text-ink-soft mt-4 grid gap-x-8 gap-y-1.5 text-sm leading-snug md:grid-cols-2">
                          {project.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                      <div className="border-line mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-t pt-3">
                        <p className="text-ink-faint text-[12px]">
                          {project.tags?.join(' · ')}
                        </p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="row-link ml-auto text-sm"
                        >
                          {linkLabel(project.link)} ↗
                        </a>
                        {project.repo && project.repo !== project.link && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="row-link text-sm"
                          >
                            Source ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Roles — where the builds happened */}
      <section className="border-line bg-bg-elevated border-t py-10 md:py-14">
        <div className="section-max section-pad">
          <Reveal y={10}>
            <div className="section-head">
              <h2 className="title">Roles behind the builds</h2>
              <span className="count">{roles.length} positions</span>
            </div>
          </Reveal>
          <ul className="ledger border-line border-b">
            {roles.map((job) => (
              <li
                key={job.id}
                className="grid gap-x-5 gap-y-1 py-3.5 md:grid-cols-12 md:items-baseline"
              >
                <p className="eyebrow-faint md:col-span-3">
                  {dateRange(job.start, job.end)}
                </p>
                <p className="md:col-span-3">
                  <span className="text-ink font-medium">{job.company}</span>
                </p>
                <p className="text-ink-soft text-sm md:col-span-5">
                  {job.title}
                </p>
                <p className="md:col-span-1 md:text-right">
                  {job.link && (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="row-link text-[13px]"
                    >
                      Visit ↗
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-line bg-bg border-t py-10">
        <div className="section-max section-pad flex flex-wrap items-end justify-between gap-6">
          <p className="display-quiet text-ink text-[clamp(1.3rem,2.6vw,1.8rem)]">
            Next: scores, awards, research, athletics.
          </p>
          <Link href="/path" className="row-link text-sm">
            Open path →
          </Link>
        </div>
      </section>
    </>
  )
}
