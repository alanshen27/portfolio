'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal, easeOut } from '@/components/portfolio-motion'
import { Movement, Numeral, ProgrammeRow, roman } from '@/components/programme'
import { PianoRoll } from '@/components/viz/piano-roll'
import { Parallax } from '@/components/parallax'
import { Roll } from '@/components/roll'
import { AppPlate } from '@/components/app-plate'
import { SCRIBE_SCREENS, STUDIOUS_SCREENS } from '@/app/screens'
import {
  Figures,
  Loop,
  NumbersInterlude,
  PlateInterlude,
  QuoteInterlude,
} from '@/components/interlude'
import { dateRange } from '@/lib/utils'
import {
  AWARDS,
  EDUCATION,
  EMAIL,
  HOME_BIO,
  LINES,
  MUSIC_RELEASES,
  NOTES,
  PROGRAMME,
  PROJECTS,
  PUBLICATIONS,
  SKILL_GROUPS,
  SOCIAL_LINKS,
  VOLUNTEERING,
  WORK_EXPERIENCE,
} from './data'

const CONTENTS = [
  { label: 'programme', href: '#programme' },
  { label: 'notes', href: '#notes' },
  { label: 'interval', href: '#interval' },
  { label: 'biography', href: '#biography' },
  { label: 'honours', href: '#honours' },
  { label: 'contact', href: '#contact' },
]

const STUDIOUS = PROJECTS.find((p) => p.id === 'project1')!
const SCRIBE = PROJECTS.find((p) => p.id === 'project2')!
const NOTATE = PROJECTS.find((p) => p.id === 'project-notate')!
const ROLES = WORK_EXPERIENCE.filter((w) => w.company !== 'Institut Le Rosey')
const SWIM = WORK_EXPERIENCE.find((w) => w.company === 'Institut Le Rosey')
const CONTACT = SOCIAL_LINKS.filter((l) =>
  ['GitHub', 'LinkedIn', 'email'].includes(l.label),
)

function ext(href: string) {
  return href.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
}

/* ------------------------------------------------------------------------ */

function Note({
  id,
  n,
  title,
  meta,
  paragraphs,
  bullets,
  aside,
  link,
  flip = false,
}: {
  id: string
  n: number
  title: string
  meta: string
  paragraphs: string[]
  bullets?: string[]
  aside: React.ReactNode
  link?: { href: string; label: string }
  flip?: boolean
}) {
  return (
    <Reveal y={16}>
      <article
        id={id}
        className="border-line grid scroll-mt-24 gap-6 border-t py-10 md:grid-cols-12 md:gap-10 md:py-12"
      >
        <Parallax
          depth={-28}
          className={`md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}
        >
          {aside}
        </Parallax>
        <div
          className={`md:col-span-7 ${flip ? 'md:order-1 md:col-start-1' : ''}`}
        >
          <p className="eyebrow">
            <Numeral n={n} className="text-accent mr-1.5" />
            {meta}
          </p>
          <h3 className="display-quiet text-ink mt-2 text-[clamp(1.7rem,3.2vw,2.3rem)]">
            {title}
          </h3>
          <div className="mt-4">
            {paragraphs.map((para, i) => (
              <p key={i} className={`note-text ${i === 0 ? 'drop-cap' : ''}`}>
                {para}
              </p>
            ))}
          </div>
          {bullets && (
            <ul className="tick-list text-ink-soft mt-4 grid gap-x-6 gap-y-1.5 text-[13px] leading-snug sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {link && (
            <a
              href={link.href}
              {...ext(link.href)}
              className="row-link mt-4 inline-block text-sm"
            >
              {link.label} →
            </a>
          )}
        </div>
      </article>
    </Reveal>
  )
}

function Plate({
  src,
  alt,
  caption,
  ratio = 'aspect-[4/3]',
  position = 'object-top',
}: {
  src: string
  alt: string
  caption?: string
  ratio?: string
  position?: string
}) {
  return (
    <figure>
      <div className={`bg-mist relative overflow-hidden ${ratio}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${position}`}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      {caption && (
        <figcaption className="text-ink-faint mt-2 text-[13px] leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ------------------------------------------------------------------------ */

export default function Home() {
  const reduce = useReducedMotion()
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: easeOut },
  })

  return (
    <div className="bg-atmosphere">
      {/* Cover — asymmetric: name at the foot of the left column, the
          particulars in the right column, photograph full-bleed below */}
      <section className="border-line border-b pt-24 md:pt-28">
        <div className="section-max section-pad grid gap-8 md:grid-cols-12 md:gap-6">
          <div className="flex flex-col justify-between md:col-span-6">
            <motion.p className="eyebrow" {...fade(0)}>
              Institut Le Rosey · IB diploma · class of 2027
            </motion.p>
            <motion.h1
              className="display-quiet text-ink mt-10 text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.04em] md:mt-16"
              {...fade(0.08)}
            >
              Alan
              <br />
              Shen
            </motion.h1>
          </div>
          <div className="flex flex-col justify-end md:col-span-5 md:col-start-8 md:pb-2">
            <motion.p
              className="text-ink text-[clamp(1.15rem,1.9vw,1.45rem)] leading-[1.3] tracking-[-0.01em]"
              {...fade(0.16)}
            >
              a programme of work, 2023 – 2026: education software, competitive
              programming, robotics, research — and the violin.
            </motion.p>
            <motion.p
              className="text-ink-soft mt-4 max-w-md text-[13px] leading-relaxed"
              {...fade(0.24)}
            >
              founder of Studious and Scribe · USACO Gold · VEX World
              Championship qualifier · Cambridge University Press, forthcoming ·
              ABRSM grade 8, violin and piano
            </motion.p>
            <motion.nav
              aria-label="Contents"
              className="border-line mt-6 grid grid-cols-2 gap-x-6 gap-y-1.5 border-t pt-4 text-[13px] sm:grid-cols-3"
              {...fade(0.32)}
            >
              {CONTENTS.map((c, i) => (
                <a
                  key={c.href}
                  href={c.href}
                  className="text-ink-soft hover:text-ink flex items-baseline gap-1.5 transition-colors"
                >
                  <span className="numeral text-ink-faint w-5 text-[11px]">
                    {roman(i + 1)}
                  </span>
                  {c.label}
                </a>
              ))}
            </motion.nav>
            <motion.p
              className="mt-3 flex flex-wrap gap-x-5 text-[13px]"
              {...fade(0.36)}
            >
              {CONTACT.map((l) => (
                <a
                  key={l.label}
                  href={l.link}
                  {...ext(l.link)}
                  className="rule-link"
                >
                  {l.label}
                </a>
              ))}
            </motion.p>
          </div>
        </div>

        <motion.div
          className="section-max section-pad mt-10 md:mt-12"
          {...fade(0.4)}
        >
          <div className="border-line flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t pt-3 pb-4">
            <p className="text-ink text-[15px]">
              <span className="font-medium">the record, as a piano roll.</span>{' '}
              <span className="text-ink-soft">
                rows are what he does; time runs left to right; every note is an
                event drawn to its real length. the amber hatch is the
                continuation — the phrase isn’t finished.
              </span>
            </p>
            <p className="text-ink-faint text-[13px]">
              the roll is the interface he built for notate, turned on his own
              record
            </p>
          </div>
          <Roll />
        </motion.div>
      </section>

      {/* beat — by the numbers */}
      <NumbersInterlude
        items={[
          { value: '1000/1000', label: 'USACO Silver contest, feb 2026' },
          { value: '1st', label: 'HackHarvard China 2025, overall' },
          { value: '3', label: 'papers · one forthcoming, Cambridge UP' },
          { value: '14', label: 'swimming medals · two-year team mvp' },
        ]}
        note="counted, not rounded — each figure appears again below with its date."
      />

      {/* I. Programme */}
      <section className="py-12 md:py-16">
        <div className="section-max section-pad">
          <Movement
            n={1}
            id="programme"
            title="programme"
            standfirst={`${PROGRAMME.length} works and results, in the order a reader should meet them. each line links to its note.`}
          />
          <Reveal className="mt-8 md:ml-[33.333%]" y={12}>
            <ol className="ledger border-line border-y">
              {PROGRAMME.map((e, i) => (
                <li key={e.title}>
                  <ProgrammeRow
                    n={i + 1}
                    title={e.title}
                    subtitle={e.subtitle}
                    right={e.right}
                    href={e.href}
                  />
                </li>
              ))}
            </ol>
            <p className="text-ink-faint mt-3 flex flex-wrap justify-between gap-2 text-[13px]">
              <span>
                roles, dates and placements as listed; full detail under notes
                and honours.
              </span>
              <Link href="/work" className="row-link">
                complete programme notes →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* beat — a line */}
      <QuoteInterlude source="Alan, on why he builds">
        “{LINES.code}”
      </QuoteInterlude>

      {/* II. Programme notes */}
      <section className="bg-bg-elevated py-12 md:py-16">
        <div className="section-max section-pad">
          <Movement
            n={2}
            id="notes"
            title="programme notes"
            standfirst="what each of the major works is, what Alan did, and what came of it."
          />

          <div className="mt-8">
            <Note
              id="note-studious"
              n={1}
              title="Studious"
              meta={`${STUDIOUS.role} · ${STUDIOUS.timeframe}`}
              paragraphs={NOTES.studious}
              link={{ href: STUDIOUS.link, label: 'studious.sh' }}
              aside={
                <div className="grid gap-3">
                  <AppPlate domain="studious.sh" screens={STUDIOUS_SCREENS} />
                  <Figures
                    className="border-line border-t pt-1"
                    items={[
                      { value: '2023', label: 'founded' },
                      { value: 'live', label: 'in classrooms' },
                      { value: '2', label: 'schools in Romania' },
                    ]}
                  />
                </div>
              }
            />
            <Note
              id="note-scribe"
              n={2}
              title="Scribe"
              meta={`SWE & co-founder · ${SCRIBE.timeframe}`}
              paragraphs={NOTES.scribe}
              link={{ href: SCRIBE.link, label: 'scribe.study' }}
              flip
              aside={
                <div className="grid gap-3">
                  <AppPlate
                    domain="scribe.study"
                    screens={SCRIBE_SCREENS}
                    ratio="aspect-[4/3]"
                  />
                  <Plate
                    src="/media/hackathons/hackharvard-china.jpg"
                    alt="On stage at HackHarvard China 2025"
                    caption="HackHarvard China 2025 — 1st Place Overall."
                    ratio="aspect-[16/7]"
                    position="object-center"
                  />
                </div>
              }
            />
            <Note
              id="note-notate"
              n={3}
              title="notate"
              meta={`${NOTATE.role} · ${NOTATE.timeframe}`}
              paragraphs={NOTES.notate}
              link={{ href: NOTATE.link, label: 'source on GitHub' }}
              aside={
                <div className="grid gap-3">
                  <figure>
                    <PianoRoll className="aspect-[16/10] w-full" />
                    <figcaption className="text-ink-faint mt-2 text-[13px] leading-snug">
                      a sketched phrase (ink) and the model’s continuation
                      (amber).
                    </figcaption>
                  </figure>
                  <Figures
                    className="border-line border-t pt-1"
                    items={[
                      { value: '21M', label: 'parameters' },
                      { value: '6×512', label: 'layers × width' },
                      { value: '8', label: 'attention heads' },
                    ]}
                  />
                </div>
              }
            />
            <Note
              id="note-competition"
              n={4}
              title="competition"
              meta="USACO · VEX Robotics 15520X · 2025 – 26"
              paragraphs={NOTES.competition}
              flip
              link={{ href: '/path', label: 'scores and standings' }}
              aside={
                <div className="grid gap-3">
                  <Loop
                    src="/media/vex/driver.mp4"
                    poster="/media/vex/worlds-arena.jpeg"
                    alt="VEX robot under driver control"
                    caption="driver control — the interface Alan programmed, on the loop."
                    ratio="aspect-[16/9]"
                  />
                  <div className="border-line grid grid-cols-2 border-t pt-3 text-center">
                    <div className="border-line border-r">
                      <p className="figure text-ink text-4xl">1000</p>
                      <p className="eyebrow-faint mt-1">
                        of 1000 · USACO Silver
                      </p>
                    </div>
                    <div>
                      <p className="figure text-ink text-4xl">Worlds</p>
                      <p className="eyebrow-faint mt-1">
                        VEX · Excellence Award
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
            <Note
              id="note-research"
              n={5}
              title="research"
              meta="co-author · three papers · 2026"
              paragraphs={NOTES.research}
              link={{ href: '/path#research', label: 'published works' }}
              aside={
                <ol className="ledger border-line border-y">
                  {PUBLICATIONS.map((pub) => (
                    <li key={pub.id} className="py-3">
                      <p className="display-quiet text-ink text-[1.05rem] leading-snug">
                        {pub.title}
                      </p>
                      <p className="text-ink-soft mt-1 text-[13px]">
                        {pub.authors}
                      </p>
                      <p className="text-ink-faint mt-0.5 text-[13px]">
                        {pub.venue} · {pub.status}
                      </p>
                    </li>
                  ))}
                </ol>
              }
            />
          </div>
        </div>
      </section>

      {/* beat — plate */}
      <PlateInterlude
        src="/media/hackathons/hackmit-workspace.jpg"
        alt="The HackMIT China 2026 workspace"
        caption="HackMIT China 2026 — the workspace. Nomad came out of it in 36 hours: 3rd place, education track, outstanding impact award."
        credit="ii · notes, continued on the works page"
        position="center 45%"
      />

      {/* III. Interval */}
      <section
        id="interval"
        className="bg-ink scroll-mt-24 py-12 text-white md:py-16"
      >
        <div className="section-max section-pad">
          <Movement
            n={3}
            title="interval"
            dark
            standfirst="ABRSM grade 8 on both violin and piano; orchestra and solo stage; two singles released under his own name."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-start">
            <Reveal className="md:col-span-5" y={12}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/media/site/banner.jpg"
                  alt="Alan Shen performing violin on stage"
                  fill
                  className="object-cover object-[35%_center]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </Reveal>
            <div className="md:col-span-7">
              <Reveal y={12}>
                <ol className="ledger-dark border-y border-white/15">
                  {MUSIC_RELEASES.map((r, i) => (
                    <li key={r.id} className="flex items-center gap-4 py-3.5">
                      <span className="numeral w-6 text-[13px] text-white/45">
                        {roman(i + 1)}.
                      </span>
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden">
                        <Image
                          src={r.cover}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="display-quiet block text-lg">
                          {r.title}
                        </span>
                        <span className="text-[13px] text-white/55">
                          {r.type} · {r.artist}
                        </span>
                      </span>
                      <span className="leaders leaders-dark hidden flex-1 md:block" />
                      {r.hyperfollow && (
                        <a
                          href={r.hyperfollow}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-bright text-[13px] hover:underline"
                        >
                          stream →
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal className="mt-6" y={12} delay={0.05}>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    '/media/music/violin-portrait.jpg',
                    '/media/music/orchestra.png',
                    '/media/music/violin-group.png',
                    '/media/music/violin-stage.png',
                  ].map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt="Performance photograph"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 15vw"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  from concert halls to orphanages in Oradea, Romania, where he
                  prepared and performed for the Liceul de Arte and wrote a song
                  for more than sixty students.
                </p>
                <Link
                  href="/music"
                  className="text-accent-bright mt-4 inline-block text-sm hover:underline"
                >
                  players, stores and stage photographs →
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* beat — plate */}
      <PlateInterlude
        src="/media/music/orchestra-hall.jpg"
        alt="Orchestra in a concert hall"
        caption="with the orchestra."
        credit="iii · interval"
        position="center 40%"
      />

      {/* IV. Biography */}
      <section className="py-12 md:py-16">
        <div className="section-max section-pad">
          <Movement n={4} id="biography" title="biography" />
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-3" y={12}>
              <div className="bg-mist relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/media/portrait/award-ceremony.png"
                  alt="Alan Shen"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <dl className="mt-4 text-[13px]">
                {[
                  ['school', 'Institut Le Rosey, Rolle, Switzerland'],
                  ['programme', 'IB diploma · class of 2027'],
                  ['summer 2026', 'Penn ESAP — AI and its mathematics'],
                  ['languages', 'TypeScript · C++ · Python'],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="border-line flex justify-between gap-3 border-b py-1.5"
                  >
                    <dt className="text-ink-faint">{k}</dt>
                    <dd className="text-ink text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="md:col-span-5" y={12} delay={0.04}>
              <p className="note-text drop-cap">{HOME_BIO}</p>
              <p className="note-text">
                outside the programme he swims for Le Rosey — two-year team MVP,
                fourteen medals across IM, freestyle, relays and open water —
                and has volunteered in Romania and for The Lost Food Project,
                where he led four students building an Earth Day game.
              </p>
              <div className="mt-6">
                <p className="eyebrow">stack</p>
                <dl className="mt-2 text-[13px]">
                  {SKILL_GROUPS.filter((g) => g.label !== 'music').map((g) => (
                    <div
                      key={g.label}
                      className="border-line grid grid-cols-[6.5rem_1fr] gap-3 border-b py-1.5"
                    >
                      <dt className="text-ink-faint">{g.label}</dt>
                      <dd className="text-ink">{g.items}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal className="md:col-span-4" y={12} delay={0.08}>
              <p className="eyebrow">appointments</p>
              <ol className="ledger border-line mt-2 border-b">
                {ROLES.map((job) => (
                  <li key={job.id} className="py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="display-quiet text-ink text-base">
                        {job.company}
                      </span>
                      <span className="text-ink-faint text-[13px] whitespace-nowrap">
                        {dateRange(job.start, job.end)}
                      </span>
                    </div>
                    <p className="text-ink-soft text-[13px]">{job.title}</p>
                  </li>
                ))}
              </ol>
              <p className="eyebrow mt-6">education</p>
              <ol className="ledger border-line mt-2 border-b">
                {EDUCATION.map((e) => (
                  <li key={e.id} className="py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="display-quiet text-ink text-base leading-snug">
                        {e.institution}
                      </span>
                      <span className="text-ink-faint text-[13px] whitespace-nowrap">
                        {dateRange(e.start, e.end)}
                      </span>
                    </div>
                    <p className="text-ink-soft text-[13px]">{e.degree}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* beat — loop */}
      <PlateInterlude
        src="/media/swim/team.jpg"
        video="/media/swim/reel.mp4"
        alt="Swimming meet footage"
        caption="off stage — the pool. fourteen medals, two-year team mvp, one school record."
        credit="v · honours, below"
      />

      {/* V. Honours */}
      <section className="bg-bg-elevated py-12 md:py-16">
        <div className="section-max section-pad">
          <Movement
            n={5}
            id="honours"
            title="honours & off stage"
            standfirst="the back matter: every award with its date, and the swimming and service record."
          />
          <div className="mt-8 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-7" y={12}>
              <p className="eyebrow">honours</p>
              <ol className="ledger border-line mt-2 border-y">
                {AWARDS.map((a) => (
                  <li
                    key={a.id}
                    className="grid gap-x-4 gap-y-1 py-3 md:grid-cols-[5.5rem_1fr_auto]"
                  >
                    <span className="text-ink-faint pt-0.5 text-[13px]">
                      {a.date ?? '—'}
                    </span>
                    <div>
                      <p className="text-ink text-[15px] leading-snug font-medium">
                        {a.title}
                      </p>
                      {a.description && (
                        <p className="text-ink-soft mt-0.5 text-[13px] leading-snug">
                          {a.description}
                        </p>
                      )}
                    </div>
                    {a.photo && (
                      <div className="bg-mist relative hidden h-12 w-20 overflow-hidden md:block">
                        <Image
                          src={a.photo}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              <p className="text-ink-faint mt-2 text-[13px]">
                also: ABRSM grade 8 piano and violin · TOEFL iBT 117 / 120.{' '}
                <Link href="/path" className="row-link">
                  full record →
                </Link>
              </p>
            </Reveal>

            <div className="md:col-span-5">
              <Reveal y={12} delay={0.04}>
                <p className="eyebrow">off stage — swimming</p>
                <div className="border-line mt-2 grid grid-cols-3 border-y py-3 text-center">
                  {[
                    ['14', 'medals'],
                    ['2×', 'team mvp'],
                    ['1', 'school record'],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <p className="figure text-ink text-3xl">{v}</p>
                      <p className="text-ink-faint mt-1 text-[13px]">{l}</p>
                    </div>
                  ))}
                </div>
                <p className="text-ink-soft mt-2 text-[13px] leading-snug">
                  {SWIM?.title}, Le Rosey, since 2023 — individual medley,
                  freestyle, relays and open water.
                </p>
              </Reveal>
              <Reveal className="mt-8" y={12} delay={0.08}>
                <p className="eyebrow">off stage — service</p>
                <ol className="ledger border-line mt-2 border-y">
                  {VOLUNTEERING.map((v) => (
                    <li key={v.id} className="py-2.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-ink text-[14px] font-medium">
                          {v.organization}
                        </span>
                        <span className="text-ink-faint text-[13px] whitespace-nowrap">
                          {dateRange(v.start, v.end)}
                        </span>
                      </div>
                      <p className="text-ink-soft text-[13px] leading-snug">
                        {v.role} · {v.cause}
                        {v.description ? ` — ${v.description}` : ''}
                        {v.bullets ? ` — ${v.bullets[0]}` : ''}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* VI. Contact / colophon */}
      <section
        id="contact"
        className="border-line scroll-mt-24 border-t py-12 md:py-16"
      >
        <div className="section-max section-pad text-center">
          <Movement n={6} title="contact" align="center" />
          <Reveal className="mt-6" y={10}>
            <a
              href={`mailto:${EMAIL}`}
              className="display-quiet text-ink hover:text-accent inline-block text-[clamp(1.4rem,3.4vw,2.4rem)] break-all transition-colors"
            >
              {EMAIL}
            </a>
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {SOCIAL_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.link}
                  {...ext(l.link)}
                  className="rule-link"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <p className="text-ink-faint mx-auto mt-10 max-w-md text-[13px] leading-relaxed">
              set in Instrument Sans. built with Next.js and Motion. every
              placement, score and date on this page appears as recorded;
              nothing is rounded up.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
