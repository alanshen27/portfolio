'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal, easeOut } from '@/components/portfolio-motion'
import { Movement, Numeral, ProgrammeRow, roman } from '@/components/programme'
import { PianoRoll } from '@/components/viz/piano-roll'
import { dateRange } from '@/lib/utils'
import {
  AWARDS,
  EDUCATION,
  EMAIL,
  HOME_BIO,
  MUSIC_RELEASES,
  NAME,
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
  { label: 'Programme', href: '#programme' },
  { label: 'Notes', href: '#notes' },
  { label: 'Interval', href: '#interval' },
  { label: 'Biography', href: '#biography' },
  { label: 'Honours', href: '#honours' },
  { label: 'Contact', href: '#contact' },
]

const STUDIOUS = PROJECTS.find((p) => p.id === 'project1')!
const SCRIBE = PROJECTS.find((p) => p.id === 'project2')!
const NOTATE = PROJECTS.find((p) => p.id === 'project-notate')!
const ROLES = WORK_EXPERIENCE.filter((w) => w.company !== 'Institut Le Rosey')
const SWIM = WORK_EXPERIENCE.find((w) => w.company === 'Institut Le Rosey')
const CONTACT = SOCIAL_LINKS.filter((l) =>
  ['GitHub', 'LinkedIn', 'Email'].includes(l.label),
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
        <div
          className={`md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}
        >
          {aside}
        </div>
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
        <figcaption className="text-ink-faint mt-2 text-[12px] leading-snug">
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
      {/* Cover */}
      <section className="bg-cover-paper border-line relative border-b pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="section-max section-pad text-center">
          <motion.p className="eyebrow" {...fade(0)}>
            Institut Le Rosey · IB Diploma · Class of 2027
          </motion.p>
          <motion.h1
            className="display-quiet text-ink mt-5 text-[clamp(3.6rem,11vw,8.5rem)] leading-[0.95]"
            {...fade(0.08)}
          >
            {NAME}
          </motion.h1>
          <motion.p
            className="text-ink mx-auto mt-6 max-w-2xl font-serif text-[clamp(1.2rem,2.4vw,1.7rem)] leading-[1.3] font-light italic"
            {...fade(0.2)}
          >
            A programme of work, 2023 – 2026: education software, competitive
            programming, robotics, research — and the violin.
          </motion.p>
          <motion.p
            className="text-ink-soft mx-auto mt-5 max-w-2xl text-[13px] leading-relaxed tracking-[0.02em] md:text-sm"
            {...fade(0.3)}
          >
            Founder of Studious and Scribe · USACO Gold · VEX World Championship
            qualifier · Cambridge University Press, forthcoming · ABRSM Grade 8,
            violin and piano
          </motion.p>

          <motion.div
            className="rule-double mx-auto mt-8 w-32"
            aria-hidden
            {...fade(0.38)}
          />

          <motion.nav
            aria-label="Contents"
            className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px]"
            {...fade(0.44)}
          >
            {CONTENTS.map((c, i) => (
              <a
                key={c.href}
                href={c.href}
                className="text-ink-soft hover:text-ink flex items-baseline gap-1.5 transition-colors"
              >
                <span className="numeral text-ink-faint text-[11px]">
                  {roman(i + 1)}
                </span>
                {c.label}
              </a>
            ))}
            <span className="text-line-strong hidden sm:inline">|</span>
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
          </motion.nav>
        </div>

        <motion.div
          className="section-max section-pad mt-10 md:mt-14"
          {...fade(0.5)}
        >
          <div className="bg-mist relative aspect-[21/7] overflow-hidden md:aspect-[21/6]">
            <Image
              src="/media/site/banner.jpg"
              alt="Alan Shen performing violin on stage"
              fill
              priority
              className="object-cover object-[center_45%]"
              sizes="100vw"
            />
          </div>
          <p className="text-ink-faint mt-2 flex justify-between text-[12px]">
            <span>Cover photograph: on stage, violin.</span>
            <span>alanshen.me</span>
          </p>
        </motion.div>
      </section>

      {/* I. Programme */}
      <section className="py-14 md:py-20">
        <div className="section-max section-pad">
          <Movement
            n={1}
            id="programme"
            title="Programme"
            standfirst="Nine works and results, in the order a reader should meet them. Each line links to its note."
          />
          <Reveal className="mx-auto mt-8 max-w-4xl" y={12}>
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
            <p className="text-ink-faint mt-3 flex flex-wrap justify-between gap-2 text-[12px]">
              <span>
                Roles, dates and placements as listed; full detail under Notes
                and Honours.
              </span>
              <Link href="/work" className="row-link">
                Complete programme notes →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* II. Programme notes */}
      <section className="bg-bg-elevated border-line border-t py-14 md:py-20">
        <div className="section-max section-pad">
          <Movement
            n={2}
            id="notes"
            title="Programme notes"
            standfirst="What each of the major works is, what Alan did, and what came of it."
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
                <Plate
                  src={STUDIOUS.image!}
                  alt="Studious"
                  caption="Studious — the classroom view."
                  ratio="aspect-[16/10]"
                />
              }
            />
            <Note
              id="note-scribe"
              n={2}
              title="Scribe"
              meta={`${SCRIBE.role} · ${SCRIBE.timeframe}`}
              paragraphs={NOTES.scribe}
              link={{ href: SCRIBE.link, label: 'scribe.study' }}
              flip
              aside={
                <div className="grid gap-3">
                  <Plate
                    src={SCRIBE.image!}
                    alt="Scribe"
                    ratio="aspect-[16/10]"
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
              link={{ href: NOTATE.link, label: 'Source on GitHub' }}
              aside={
                <figure>
                  <PianoRoll className="aspect-[16/10] w-full" />
                  <figcaption className="text-ink-faint mt-2 text-[12px] leading-snug">
                    A sketched phrase (ink) and the model’s continuation
                    (green).
                  </figcaption>
                </figure>
              }
            />
            <Note
              id="note-competition"
              n={4}
              title="Competition"
              meta="USACO · VEX Robotics 15520X · 2025 – 26"
              paragraphs={NOTES.competition}
              flip
              link={{ href: '/path', label: 'Scores and standings' }}
              aside={
                <div className="grid gap-3">
                  <Plate
                    src="/media/vex/worlds-team.jpeg"
                    alt="VEX team 15520X"
                    caption="Team 15520X, MECH_IT_HAPPEN."
                    ratio="aspect-[16/9]"
                    position="object-[center_60%]"
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
              title="Research"
              meta="Co-author · three papers · 2026"
              paragraphs={NOTES.research}
              link={{ href: '/path#research', label: 'Published works' }}
              aside={
                <ol className="ledger border-line border-y">
                  {PUBLICATIONS.map((pub) => (
                    <li key={pub.id} className="py-3">
                      <p className="display-quiet text-ink text-[1.05rem] leading-snug">
                        {pub.title}
                      </p>
                      <p className="text-ink-soft mt-1 text-[12.5px]">
                        {pub.authors}
                      </p>
                      <p className="text-ink-faint mt-0.5 text-[12.5px] italic">
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

      {/* III. Interval */}
      <section
        id="interval"
        className="bg-ink scroll-mt-24 py-14 text-white md:py-20"
      >
        <div className="section-max section-pad">
          <Movement
            n={3}
            title="Interval"
            dark
            standfirst="ABRSM Grade 8 on both violin and piano; orchestra and solo stage; two singles released under his own name."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-start">
            <Reveal className="md:col-span-5" y={12}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/media/music/violin-portrait.jpg"
                  alt="Alan Shen playing violin on stage"
                  fill
                  className="object-cover"
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
                        <span className="text-[12.5px] text-white/55">
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
                          Stream →
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal className="mt-6" y={12} delay={0.05}>
                <div className="grid grid-cols-3 gap-2">
                  {[
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
                <p className="mt-4 font-serif text-[15px] leading-relaxed text-white/70 italic">
                  From concert halls to orphanages in Oradea, Romania, where he
                  prepared and performed for the Liceul de Arte and wrote a song
                  for more than sixty students.
                </p>
                <Link
                  href="/music"
                  className="text-accent-bright mt-4 inline-block text-sm hover:underline"
                >
                  Players, stores and stage photographs →
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* IV. Biography */}
      <section className="border-line border-t py-14 md:py-20">
        <div className="section-max section-pad">
          <Movement n={4} id="biography" title="Biography" />
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
                  ['School', 'Institut Le Rosey, Rolle, Switzerland'],
                  ['Programme', 'IB Diploma · Class of 2027'],
                  ['Summer 2026', 'Penn ESAP — AI and its mathematics'],
                  ['Languages', 'TypeScript · C++ · Python'],
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
                Outside the programme he swims for Le Rosey — two-year team MVP,
                fourteen medals across IM, freestyle, relays and open water —
                and has volunteered in Romania and for The Lost Food Project,
                where he led four students building an Earth Day game.
              </p>
              <div className="mt-6">
                <p className="eyebrow">Stack</p>
                <dl className="mt-2 text-[13px]">
                  {SKILL_GROUPS.filter((g) => g.label !== 'Music').map((g) => (
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
              <p className="eyebrow">Appointments</p>
              <ol className="ledger border-line mt-2 border-b">
                {ROLES.map((job) => (
                  <li key={job.id} className="py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="display-quiet text-ink text-base">
                        {job.company}
                      </span>
                      <span className="text-ink-faint text-[12px] whitespace-nowrap">
                        {dateRange(job.start, job.end)}
                      </span>
                    </div>
                    <p className="text-ink-soft text-[12.5px]">{job.title}</p>
                  </li>
                ))}
              </ol>
              <p className="eyebrow mt-6">Education</p>
              <ol className="ledger border-line mt-2 border-b">
                {EDUCATION.map((e) => (
                  <li key={e.id} className="py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="display-quiet text-ink text-base leading-snug">
                        {e.institution}
                      </span>
                      <span className="text-ink-faint text-[12px] whitespace-nowrap">
                        {dateRange(e.start, e.end)}
                      </span>
                    </div>
                    <p className="text-ink-soft text-[12.5px]">{e.degree}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* V. Honours */}
      <section className="bg-bg-elevated border-line border-t py-14 md:py-20">
        <div className="section-max section-pad">
          <Movement
            n={5}
            id="honours"
            title="Honours & off stage"
            standfirst="The back matter: every award with its date, and the swimming and service record."
          />
          <div className="mt-8 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-7" y={12}>
              <p className="eyebrow">Honours</p>
              <ol className="ledger border-line mt-2 border-y">
                {AWARDS.map((a) => (
                  <li
                    key={a.id}
                    className="grid gap-x-4 gap-y-1 py-3 md:grid-cols-[5.5rem_1fr_auto]"
                  >
                    <span className="text-ink-faint pt-0.5 text-[12px]">
                      {a.date ?? '—'}
                    </span>
                    <div>
                      <p className="text-ink text-[14.5px] leading-snug font-medium">
                        {a.title}
                      </p>
                      {a.description && (
                        <p className="text-ink-soft mt-0.5 text-[12.5px] leading-snug">
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
              <p className="text-ink-faint mt-2 text-[12px]">
                Also: ABRSM Grade 8 Piano and Violin · TOEFL iBT 117 / 120.{' '}
                <Link href="/path" className="row-link">
                  Full record →
                </Link>
              </p>
            </Reveal>

            <div className="md:col-span-5">
              <Reveal y={12} delay={0.04}>
                <p className="eyebrow">Off stage — swimming</p>
                <div className="border-line mt-2 grid grid-cols-3 border-y py-3 text-center">
                  {[
                    ['14', 'medals'],
                    ['2×', 'team MVP'],
                    ['1', 'school record'],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <p className="figure text-ink text-3xl">{v}</p>
                      <p className="text-ink-faint mt-1 text-[11px] tracking-[0.08em] uppercase">
                        {l}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-ink-soft mt-2 text-[12.5px] leading-snug">
                  {SWIM?.title}, Le Rosey, since 2023 — individual medley,
                  freestyle, relays and open water.
                </p>
              </Reveal>
              <Reveal className="mt-8" y={12} delay={0.08}>
                <p className="eyebrow">Off stage — service</p>
                <ol className="ledger border-line mt-2 border-y">
                  {VOLUNTEERING.map((v) => (
                    <li key={v.id} className="py-2.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-ink text-[14px] font-medium">
                          {v.organization}
                        </span>
                        <span className="text-ink-faint text-[12px] whitespace-nowrap">
                          {dateRange(v.start, v.end)}
                        </span>
                      </div>
                      <p className="text-ink-soft text-[12.5px] leading-snug">
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
        className="border-line scroll-mt-24 border-t py-14 md:py-20"
      >
        <div className="section-max section-pad text-center">
          <Movement n={6} title="Contact" />
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
            <p className="text-ink-faint mx-auto mt-10 max-w-md text-[12px] leading-relaxed">
              Set in Fraunces and Outfit. Built with Next.js and Motion. Every
              placement, score and date on this page appears as recorded;
              nothing is rounded up.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
