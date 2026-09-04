'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/portfolio-motion'
import { PageHero } from '@/components/page-hero'
import { Projection } from '@/components/projection'
import { ScrollProgress } from '@/components/scroll-progress'
import { MedalBars } from '@/components/viz/medal-bars'
import { ScoreRing } from '@/components/viz/score-ring'
import { CpGraph } from '@/components/viz/cp-graph'
import { UsacoBoard } from '@/components/viz/usaco-board'
import { MathField } from '@/components/viz/math-field'
import { dateRange } from '@/lib/utils'
import {
  AWARDS,
  CERTIFICATIONS,
  EDUCATION,
  PUBLICATIONS,
  VOLUNTEERING,
  WORK_EXPERIENCE,
} from '../data'

function Head({
  index,
  title,
  count,
  dark = false,
}: {
  index: string
  title: string
  count?: string
  dark?: boolean
}) {
  return (
    <div className={`section-head ${dark ? 'border-white/25' : ''}`}>
      <span className={`idx ${dark ? 'text-white/40' : ''}`}>{index}</span>
      <h2 className={`eyebrow ${dark ? 'text-accent-bright' : ''}`}>{title}</h2>
      {count && (
        <span className={`count ${dark ? 'text-white/40' : ''}`}>{count}</span>
      )}
    </div>
  )
}

const CHAPTERS = [
  { id: 'measured', label: 'Measured' },
  { id: 'experience', label: 'Experience' },
  { id: 'awards', label: 'Awards' },
  { id: 'research', label: 'Research' },
  { id: 'athletics', label: 'Athletics' },
  { id: 'service', label: 'Service' },
]

export default function PathPage() {
  const techWork = WORK_EXPERIENCE.filter(
    (w) => w.company !== 'Institut Le Rosey',
  )
  const swim = WORK_EXPERIENCE.find((w) => w.company === 'Institut Le Rosey')

  return (
    <>
      <ScrollProgress />
      <PageHero
        kicker="Path · competition, research, athletics, service"
        title="The record, measured."
        description="Contest scores, awards, publications, meets, and service — with dates, so every claim can be checked."
        image="/media/vex/worlds-arena.jpeg"
        imagePosition="center 55%"
        video="/media/vex/driver.mp4"
      />

      {/* Chapter strip */}
      <nav
        aria-label="Sections"
        className="border-line bg-bg-elevated/90 border-b backdrop-blur"
      >
        <div className="section-max section-pad flex flex-wrap gap-x-6 gap-y-2 py-3">
          {CHAPTERS.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="text-ink-soft hover:text-ink flex items-baseline gap-2 text-[13px] transition-colors"
            >
              <span className="text-ink-faint font-mono text-[10px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {c.label}
            </a>
          ))}
        </div>
      </nav>

      {/* 01 Measured */}
      <section
        id="measured"
        className="border-line bg-bg relative scroll-mt-24 overflow-hidden border-b py-10 md:py-14"
      >
        <MathField />
        <div className="section-max section-pad relative">
          <Reveal y={10}>
            <Head index="01" title="Measured" count="USACO · TOEFL · medals" />
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-6" delay={0.04} y={14}>
              <UsacoBoard />
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
              <Reveal className="card p-5" delay={0.08} y={14}>
                <ScoreRing
                  value={117}
                  max={120}
                  label="TOEFL iBT"
                  sublabel="Reading · Listening · Speaking · Writing"
                />
              </Reveal>
              <Reveal className="card p-5" delay={0.12} y={14}>
                <MedalBars />
              </Reveal>
              <Reveal className="card p-5 sm:col-span-2" delay={0.14} y={14}>
                <p className="eyebrow-faint">Graph search · BFS</p>
                <CpGraph className="mt-3 max-w-md" />
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-6" y={10}>
            <ul className="ledger border-line border-y">
              {CERTIFICATIONS.map((c) => (
                <li
                  key={c.id}
                  className="grid gap-x-5 gap-y-0.5 py-2.5 text-sm md:grid-cols-12"
                >
                  <span className="text-ink font-medium md:col-span-6">
                    {c.name}
                  </span>
                  <span className="text-ink-soft md:col-span-6">
                    {c.issuer}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 02 Experience + education */}
      <section
        id="experience"
        className="border-line bg-bg-elevated scroll-mt-24 border-b py-10 md:py-14"
      >
        <div className="section-max section-pad grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <Reveal y={10}>
              <Head
                index="02"
                title="Experience"
                count={`${techWork.length} positions`}
              />
            </Reveal>
            <ul className="ledger border-line border-b">
              {techWork.map((job, i) => (
                <Reveal key={job.id} delay={i * 0.03} y={12}>
                  <li className="grid gap-x-5 gap-y-1.5 py-4 md:grid-cols-12">
                    <p className="eyebrow-faint pt-[3px] md:col-span-3">
                      {dateRange(job.start, job.end)}
                    </p>
                    <div className="md:col-span-9">
                      <div className="flex flex-wrap items-baseline gap-x-2.5">
                        <h3 className="text-ink text-base font-semibold">
                          {job.company}
                        </h3>
                        <span className="text-ink-soft text-[13px]">
                          {job.title}
                        </span>
                        {job.link && (
                          <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="row-link ml-auto text-[12px]"
                          >
                            Visit ↗
                          </a>
                        )}
                      </div>
                      <ul className="tick-list text-ink-soft mt-2 space-y-1 text-[13px] leading-snug">
                        {job.bullets?.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <Reveal y={10}>
              <Head index="02b" title="Education" />
            </Reveal>
            <ul className="ledger border-line border-b">
              {EDUCATION.map((e) => (
                <li key={e.id} className="py-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-ink text-[15px] font-semibold">
                      {e.institution}
                    </h3>
                    <span className="eyebrow-faint whitespace-nowrap">
                      {dateRange(e.start, e.end)}
                    </span>
                  </div>
                  <p className="text-ink-soft mt-0.5 text-[13px]">
                    {e.degree}
                    {e.location ? ` · ${e.location}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 Awards */}
      <section
        id="awards"
        className="border-line bg-bg scroll-mt-24 border-b py-10 md:py-14"
      >
        <div className="section-max section-pad">
          <Reveal y={10}>
            <Head
              index="03"
              title="Awards & honors"
              count={`${AWARDS.length} entries · 2023–2026`}
            />
          </Reveal>
          <Reveal y={12}>
            <ul className="ledger border-line border-b">
              {AWARDS.map((award) => (
                <li
                  key={award.id}
                  className="grid gap-x-5 gap-y-1 py-3.5 md:grid-cols-[5.5rem_2.75rem_1fr]"
                >
                  <p className="eyebrow-faint pt-1">{award.date ?? '—'}</p>
                  {award.image ? (
                    <div className="bg-panel-wash relative hidden h-9 w-9 overflow-hidden md:block">
                      <Image
                        src={award.image}
                        alt=""
                        fill
                        className="object-contain p-1"
                        sizes="36px"
                      />
                    </div>
                  ) : (
                    <span className="hidden md:block" />
                  )}
                  <div className="min-w-0">
                    <h3 className="text-ink text-[15px] leading-snug font-semibold">
                      {award.title}
                    </h3>
                    {award.description && (
                      <p className="text-ink-soft mt-1 text-[13px] leading-snug">
                        {award.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 04 Research */}
      <section
        id="research"
        className="bg-ink scroll-mt-24 border-b border-white/10 py-10 text-white md:py-14"
      >
        <div className="section-max section-pad">
          <Reveal y={10}>
            <Head
              index="04"
              title="Research"
              count={`${PUBLICATIONS.length} papers · co-author`}
              dark
            />
          </Reveal>

          <ul className="ledger-dark border-b border-white/12">
            {PUBLICATIONS.map((pub, i) => (
              <Reveal key={pub.id} delay={i * 0.04} y={12}>
                <li className="grid gap-x-6 gap-y-1.5 py-4 md:grid-cols-12">
                  <div className="flex flex-wrap items-center gap-2 md:col-span-3 md:flex-col md:items-start">
                    <span className="pill pill-dark">{pub.status}</span>
                    <span className="font-mono text-[11px] text-white/45">
                      {pub.date}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-base leading-snug font-semibold md:text-lg">
                      {pub.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-white/65">
                      {pub.authors}
                    </p>
                    <p className="mt-0.5 text-[13px] text-white/45 italic">
                      {pub.venue}
                    </p>
                    {pub.presentation && (
                      <p className="mt-2 text-[13px] text-white/75">
                        <span className="pill pill-dark mr-2">Talk</span>
                        {pub.presentation}
                      </p>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 Athletics */}
      <Projection
        id="athletics"
        src="/media/swim/reel.mp4"
        className="border-line scroll-mt-24 border-b py-12 md:py-16"
      >
        <div className="section-max section-pad">
          <Reveal y={10}>
            <Head
              index="05"
              title="Athletics"
              count="14 medals · 2× MVP · school record"
              dark
            />
          </Reveal>

          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src="/media/swim/team.jpg"
                  alt="Le Rosey swim team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-white/55 uppercase">
                {swim?.title} · {swim ? dateRange(swim.start, swim.end) : ''}
              </p>
              <MedalBars className="mt-5" tone="dark" />
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.08}>
              <p className="eyebrow-faint text-white/50">Meet by meet</p>
              <ul className="ledger-dark mt-2 border-y border-white/12">
                {swim?.bullets?.map((bullet) => (
                  <li
                    key={bullet}
                    className="py-2.5 text-[13px] leading-snug text-white/80"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Projection>

      {/* 06 Service */}
      <section id="service" className="bg-bg scroll-mt-24 py-10 md:py-14">
        <div className="section-max section-pad">
          <Reveal y={10}>
            <Head
              index="06"
              title="Service"
              count={`${VOLUNTEERING.length} programmes`}
            />
          </Reveal>

          <ul className="ledger border-line border-b">
            {VOLUNTEERING.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.04} y={14}>
                <li className="grid gap-6 py-6 lg:grid-cols-12 lg:gap-8">
                  {v.id === 'vol-casa' && v.image && (
                    <div className="relative min-h-[160px] overflow-hidden lg:col-span-4">
                      <Image
                        src={v.image}
                        alt="Volunteers at a housing construction site in Oradea, Romania"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div
                    className={
                      v.id === 'vol-casa' ? 'lg:col-span-8' : 'lg:col-span-12'
                    }
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="eyebrow-faint">
                        {dateRange(v.start, v.end)}
                      </p>
                      <span className="pill">{v.cause}</span>
                      {v.link && (
                        <a
                          href={v.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="row-link ml-auto text-[12px]"
                        >
                          Visit ↗
                        </a>
                      )}
                    </div>
                    <h3 className="text-ink mt-2 text-lg font-semibold">
                      {v.organization}
                      <span className="text-ink-soft ml-2 text-sm font-normal">
                        {v.role}
                      </span>
                    </h3>
                    {v.description && (
                      <p className="text-ink-soft mt-2 max-w-3xl text-sm leading-snug">
                        {v.description}
                      </p>
                    )}
                    {v.bullets && (
                      <ul className="tick-list text-ink-soft mt-2 grid gap-x-8 gap-y-1.5 text-[13px] leading-snug md:grid-cols-2">
                        {v.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-line bg-bg-elevated border-t py-10">
        <div className="section-max section-pad flex flex-wrap items-end justify-between gap-6">
          <p className="display-quiet text-ink text-[clamp(1.3rem,2.6vw,1.8rem)]">
            Off the podium, onto the stage.
          </p>
          <Link href="/music" className="row-link text-sm">
            Open music →
          </Link>
        </div>
      </section>
    </>
  )
}
