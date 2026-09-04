'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/portfolio-motion'
import {
  Movement,
  PageTitle,
  ProgrammeRow,
  roman,
} from '@/components/programme'
import { ScrollProgress } from '@/components/scroll-progress'
import { MedalBars } from '@/components/viz/medal-bars'
import { ScoreRing } from '@/components/viz/score-ring'
import { UsacoBoard } from '@/components/viz/usaco-board'
import { dateRange } from '@/lib/utils'
import {
  AWARDS,
  CERTIFICATIONS,
  EDUCATION,
  PUBLICATIONS,
  VOLUNTEERING,
  WORK_EXPERIENCE,
} from '../data'

const CONTENTS = [
  { label: 'scores', href: '#scores' },
  { label: 'honours', href: '#honours' },
  { label: 'publications', href: '#research' },
  { label: 'appointments', href: '#appointments' },
  { label: 'swimming', href: '#athletics' },
  { label: 'service', href: '#service' },
]

export default function PathPage() {
  const techWork = WORK_EXPERIENCE.filter(
    (w) => w.company !== 'Institut Le Rosey',
  )
  const swim = WORK_EXPERIENCE.find((w) => w.company === 'Institut Le Rosey')

  return (
    <>
      <ScrollProgress />
      <PageTitle
        kicker="iii · record"
        title="the record"
        standfirst="contest scores, honours, publications, meets and service — every entry dated so it can be checked."
        contents={CONTENTS}
      />

      {/* I. Scores */}
      <section id="scores" className="scroll-mt-24 py-14 md:py-20">
        <div className="section-max section-pad">
          <Movement
            n={1}
            title="scores"
            standfirst="three numbers that need no interpretation."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-6" y={14}>
              <UsacoBoard className="h-full" />
            </Reveal>
            <Reveal className="card p-6 md:col-span-3" y={14} delay={0.05}>
              <ScoreRing
                value={117}
                max={120}
                label="TOEFL iBT"
                sublabel="reading · listening · speaking · writing"
              />
            </Reveal>
            <Reveal className="card p-6 md:col-span-3" y={14} delay={0.1}>
              <MedalBars />
            </Reveal>
          </div>
          <Reveal className="mx-auto mt-8 max-w-4xl" y={10}>
            <p className="eyebrow">certificates</p>
            <ol className="ledger border-line mt-2 border-y">
              {CERTIFICATIONS.map((c) => (
                <li key={c.id}>
                  <ProgrammeRow title={c.name} right={c.issuer ?? ''} />
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* II. Honours */}
      <section
        id="honours"
        className="bg-bg-elevated border-line scroll-mt-24 border-t py-14 md:py-20"
      >
        <div className="section-max section-pad">
          <Movement
            n={2}
            title="honours"
            standfirst={`${AWARDS.length} awards, 2023 – 2026, most recent first.`}
          />
          <Reveal className="mx-auto mt-8 max-w-4xl" y={12}>
            <ol className="ledger border-line border-y">
              {AWARDS.map((a, i) => (
                <li
                  key={a.id}
                  className="grid gap-x-5 gap-y-1.5 py-4 md:grid-cols-[2rem_5.5rem_1fr_auto]"
                >
                  <span className="numeral text-ink-faint hidden text-[13px] md:block">
                    {roman(i + 1)}.
                  </span>
                  <span className="text-ink-faint pt-0.5 text-[12px]">
                    {a.date ?? '—'}
                  </span>
                  <div>
                    <p className="display-quiet text-ink text-[1.1rem] leading-snug">
                      {a.title}
                    </p>
                    {a.description && (
                      <p className="text-ink-soft mt-1 text-[13px] leading-snug">
                        {a.description}
                      </p>
                    )}
                  </div>
                  {a.photo && (
                    <div className="bg-mist relative h-16 w-24 overflow-hidden md:h-14 md:w-[5.5rem]">
                      <Image
                        src={a.photo}
                        alt={`${a.title} — photograph`}
                        fill
                        className="object-cover"
                        sizes="88px"
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* III. Publications */}
      <section
        id="research"
        className="bg-ink scroll-mt-24 py-14 text-white md:py-20"
      >
        <div className="section-max section-pad">
          <Movement
            n={3}
            title="publications"
            dark
            standfirst="AI-based pragmatics assessment and AI-enhanced pedagogy; contributing author on all three."
          />
          <Reveal className="mx-auto mt-8 max-w-4xl" y={12}>
            <ol className="ledger-dark border-y border-white/15">
              {PUBLICATIONS.map((pub, i) => (
                <li
                  key={pub.id}
                  className="grid gap-x-5 gap-y-1.5 py-5 md:grid-cols-[2rem_1fr_auto]"
                >
                  <span className="numeral hidden text-[13px] text-white/45 md:block">
                    {roman(i + 1)}.
                  </span>
                  <div>
                    <p className="display-quiet text-[1.2rem] leading-snug md:text-[1.35rem]">
                      {pub.title}
                    </p>
                    <p className="mt-1.5 text-[13px] text-white/65">
                      {pub.authors}
                    </p>
                    <p className="mt-0.5 text-[13.5px] text-white/50">
                      {pub.venue}
                    </p>
                    {pub.presentation && (
                      <p className="mt-2 text-[13px] text-white/75">
                        presented: {pub.presentation}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-[12px] text-white/55 md:pt-1">
                    <p className="text-accent-bright">{pub.status}</p>
                    <p className="mt-0.5">{pub.date}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* IV. Appointments & education */}
      <section
        id="appointments"
        className="border-line scroll-mt-24 border-t py-14 md:py-20"
      >
        <div className="section-max section-pad grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Movement n={4} title="appointments" align="left" />
            <ol className="ledger border-line mt-2 border-b">
              {techWork.map((job) => (
                <Reveal key={job.id} y={10}>
                  <li className="grid gap-x-5 gap-y-1.5 py-4 md:grid-cols-12">
                    <p className="text-ink-faint pt-1 text-[12px] md:col-span-3">
                      {dateRange(job.start, job.end)}
                    </p>
                    <div className="md:col-span-9">
                      <div className="flex flex-wrap items-baseline gap-x-2.5">
                        <h3 className="display-quiet text-ink text-[1.1rem]">
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
                            visit →
                          </a>
                        )}
                      </div>
                      <div className="mt-2 flex gap-4">
                        <ul className="tick-list text-ink-soft min-w-0 flex-1 space-y-1 text-[13px] leading-snug">
                          {job.bullets?.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                        {job.photo && (
                          <div className="bg-mist relative hidden h-28 w-24 shrink-0 overflow-hidden sm:block">
                            <Image
                              src={job.photo}
                              alt={`${job.company} team`}
                              fill
                              className="object-cover object-top"
                              sizes="96px"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="md:col-span-4">
            <div className="pt-[1.35rem]">
              <h2 className="display-quiet text-ink mt-1 text-[clamp(1.9rem,3.6vw,2.6rem)]">
                education
              </h2>
              <div className="rule-double mt-5 w-full" aria-hidden />
            </div>
            <ol className="ledger border-line mt-2 border-b">
              {EDUCATION.map((e) => (
                <li key={e.id} className="py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display-quiet text-ink text-[1.05rem] leading-snug">
                      {e.institution}
                    </h3>
                    <span className="text-ink-faint text-[12px] whitespace-nowrap">
                      {dateRange(e.start, e.end)}
                    </span>
                  </div>
                  <p className="text-ink-soft mt-0.5 text-[13px]">
                    {e.degree}
                    {e.location ? ` · ${e.location}` : ''}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* VI. Swimming */}
      <section
        id="athletics"
        className="bg-bg-elevated border-line scroll-mt-24 border-t py-14 md:py-20"
      >
        <div className="section-max section-pad">
          <Movement
            n={5}
            title="swimming"
            standfirst={`${swim?.title}, Le Rosey — 14 medals, two-year team mvp, one school record.`}
          />
          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-5" y={12}>
              <div className="grid grid-cols-5 gap-2">
                <div className="relative col-span-3 aspect-[4/3] overflow-hidden">
                  <Image
                    src="/media/swim/team.jpg"
                    alt="Le Rosey swim team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 60vw, 24vw"
                  />
                </div>
                <div className="relative col-span-2 overflow-hidden">
                  <Image
                    src="/media/swim/lake-medals.webp"
                    alt="Team with medals after the lake relay"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 16vw"
                  />
                </div>
              </div>
              <div className="relative mt-2 aspect-[16/7] overflow-hidden">
                <Image
                  src="/media/swim/medals-rooftop.png"
                  alt="Swimming medals"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <MedalBars className="mt-5" />
            </Reveal>
            <Reveal className="md:col-span-7" y={12} delay={0.05}>
              <p className="eyebrow">meet by meet</p>
              <ol className="ledger border-line mt-2 border-y">
                {swim?.bullets?.map((b) => (
                  <li
                    key={b}
                    className="text-ink py-2.5 text-[13.5px] leading-snug"
                  >
                    {b}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VII. Service */}
      <section
        id="service"
        className="border-line scroll-mt-24 border-t py-14 md:py-20"
      >
        <div className="section-max section-pad">
          <Movement n={6} title="service" />
          <ol className="ledger border-line mt-8 border-b">
            {VOLUNTEERING.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.04} y={14}>
                <li className="border-line grid gap-6 border-t py-8 md:grid-cols-12 md:gap-8">
                  {v.id === 'vol-casa' && v.image && (
                    <div className="relative min-h-[160px] overflow-hidden md:col-span-4">
                      <Image
                        src={v.image}
                        alt="Volunteers at a housing construction site in Oradea, Romania"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div
                    className={
                      v.id === 'vol-casa' ? 'md:col-span-8' : 'md:col-span-12'
                    }
                  >
                    <p className="eyebrow">
                      <span className="numeral mr-1.5">{roman(i + 1)}.</span>
                      {v.cause}
                      <span className="text-ink-faint">
                        {' '}
                        · {dateRange(v.start, v.end)}
                      </span>
                    </p>
                    <h3 className="display-quiet text-ink mt-2 text-[1.4rem]">
                      {v.organization}
                      <span className="text-ink-soft ml-2 font-sans text-sm">
                        {v.role}
                      </span>
                    </h3>
                    {v.description && (
                      <p className="note-text mt-3 max-w-3xl">
                        {v.description}
                      </p>
                    )}
                    {v.bullets && (
                      <ul className="tick-list text-ink-soft mt-3 grid gap-x-8 gap-y-1.5 text-[13px] leading-snug md:grid-cols-2">
                        {v.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {v.link && (
                      <a
                        href={v.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="row-link mt-3 inline-block text-[13px]"
                      >
                        visit →
                      </a>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-line bg-bg-elevated border-t py-10">
        <div className="section-max section-pad flex flex-wrap items-baseline justify-between gap-4">
          <p className="display-quiet text-ink text-[clamp(1.2rem,2.4vw,1.6rem)]">
            interval: the music.
          </p>
          <Link href="/music" className="row-link text-sm">
            iv · music →
          </Link>
        </div>
      </section>
    </>
  )
}
