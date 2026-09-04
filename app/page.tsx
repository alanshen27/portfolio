'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal, SplitChars, easeOut } from '@/components/portfolio-motion'
import { FieldBackdrop } from '@/components/field-backdrop'
import { UsacoBoard } from '@/components/viz/usaco-board'
import { MedalBars } from '@/components/viz/medal-bars'
import { PianoRoll } from '@/components/viz/piano-roll'
import { dateRange } from '@/lib/utils'
import {
  AWARDS,
  EDUCATION,
  EMAIL,
  FACTS,
  HIGHLIGHTS,
  HOME_BIO,
  HOME_INTRO,
  MUSIC_RELEASES,
  NAME,
  PROJECT_KIND_LABEL,
  PROJECTS,
  PUBLICATIONS,
  SKILL_GROUPS,
  SOCIAL_LINKS,
  VOLUNTEERING,
  WORK_EXPERIENCE,
  type Project,
} from './data'

const FLAGSHIP_IDS = ['project1', 'project2', 'project-notate']
const FLAGSHIP = FLAGSHIP_IDS.map(
  (id) => PROJECTS.find((p) => p.id === id) as Project,
)
const MORE_BUILDS = PROJECTS.filter((p) => !FLAGSHIP_IDS.includes(p.id))

const ROLES = WORK_EXPERIENCE.filter((w) => w.company !== 'Institut Le Rosey')
const SWIM = WORK_EXPERIENCE.find((w) => w.company === 'Institut Le Rosey')

const CONTACT_LINKS = SOCIAL_LINKS.filter((l) =>
  ['GitHub', 'LinkedIn', 'Email'].includes(l.label),
)

function external(href: string) {
  return href.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
}

function linkLabel(href: string) {
  if (href.includes('youtu')) return 'Demo'
  if (href.includes('github')) return 'Source'
  if (href.includes('linkedin')) return 'Context'
  return 'Live'
}

function SectionHead({
  title,
  count,
  dark = false,
}: {
  title: string
  count?: string
  dark?: boolean
}) {
  return (
    <div className={`section-head ${dark ? 'border-white/25' : ''}`}>
      <h2 className={`title ${dark ? 'text-white' : ''}`}>{title}</h2>
      {count && (
        <span className={`count ${dark ? 'text-white/45' : ''}`}>{count}</span>
      )}
    </div>
  )
}

function DossierCard() {
  return (
    <div className="card relative p-5 md:p-6">
      <div className="flex items-start gap-4">
        <div className="bg-mist relative h-16 w-16 shrink-0 overflow-hidden md:h-20 md:w-20">
          <Image
            src="/media/portrait/award-ceremony.png"
            alt="Alan Shen"
            fill
            priority
            className="origin-[50%_24%] scale-[1.9] object-cover object-[50%_24%]"
            sizes="160px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="eyebrow-faint">Dossier</p>
            <p className="eyebrow-faint">alanshen.me</p>
          </div>
          <p className="display-quiet text-ink mt-1.5 text-xl">{NAME}</p>
          <p className="text-ink-soft mt-0.5 text-sm">
            Founder · Engineer · Violinist
          </p>
        </div>
      </div>

      <dl className="ledger mt-5 text-sm">
        {FACTS.map((f) => (
          <div
            key={f.label}
            className="grid grid-cols-[6rem_1fr] gap-3 py-2 first:pt-0"
          >
            <dt className="eyebrow-faint pt-[3px]">{f.label}</dt>
            <dd className="text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="border-line mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t pt-4">
        {CONTACT_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.link}
            {...external(l.link)}
            className="rule-link text-sm"
          >
            {l.label}
          </a>
        ))}
        <Link href="/path" className="row-link ml-auto text-sm">
          Full record →
        </Link>
      </div>
    </div>
  )
}

function ProjectCard({ p, delay = 0 }: { p: Project; delay?: number }) {
  return (
    <Reveal delay={delay} y={16} className="h-full">
      <article
        id={p.id}
        className="card card-hover flex h-full scroll-mt-28 flex-col"
      >
        <a
          href={p.link}
          {...external(p.link)}
          className="group bg-mist relative block aspect-[16/9] overflow-hidden"
        >
          {p.image ? (
            <Image
              src={p.image}
              alt={`${p.name} screenshot`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <PianoRoll className="h-full w-full" />
          )}
        </a>

        <div className="flex flex-1 flex-col p-4 md:p-5">
          <p className="eyebrow">
            {p.kind ? PROJECT_KIND_LABEL[p.kind] : 'Build'}
            <span className="text-ink-faint"> · {p.role}</span>
          </p>
          <div className="mt-1.5 flex items-baseline justify-between gap-3">
            <h3 className="display-quiet text-ink text-[1.45rem]">{p.name}</h3>
            <p className="text-ink-faint text-[12px] whitespace-nowrap">
              {p.timeframe}
            </p>
          </div>
          <p className="text-ink mt-2.5 text-sm leading-snug">
            {p.description}
          </p>
          {p.outcome && (
            <p className="text-accent-deep mt-3 font-serif text-[15px] italic">
              {p.outcome}
            </p>
          )}
          <ul className="tick-list text-ink-soft mt-3 space-y-1.5 text-[13px] leading-snug">
            {p.points?.slice(0, 3).map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
          <div className="border-line mt-auto flex items-baseline justify-between gap-3 border-t pt-3">
            <p className="text-ink-faint text-[12px]">{p.tags?.join(' · ')}</p>
            <a
              href={p.link}
              {...external(p.link)}
              className="row-link text-[13px]"
            >
              {linkLabel(p.link)} ↗
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Home() {
  const reduce = useReducedMotion()

  return (
    <div className="bg-atmosphere">
      {/* 00 — Hero: who, one sentence, dossier card, proof strip */}
      <section className="relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-14">
        <FieldBackdrop math={false} />
        <div className="section-max section-pad relative z-10 grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.p
              className="eyebrow"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Institut Le Rosey · IB Diploma · Class of 2027 · Switzerland
            </motion.p>

            <h1 className="display-quiet text-ink mt-4 text-[clamp(3rem,8vw,5.75rem)]">
              <SplitChars text={NAME} delay={0.06} />
            </h1>

            <motion.p
              className="display-quiet text-ink mt-5 max-w-2xl text-[1.25rem] leading-[1.25] font-normal md:text-[1.65rem]"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: easeOut }}
            >
              {HOME_INTRO}
            </motion.p>

            <motion.p
              className="text-ink-soft mt-4 max-w-xl text-sm leading-relaxed"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
            >
              {HOME_BIO}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: easeOut }}
            >
              <a
                href="#builds"
                className="bg-ink inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              >
                See the builds
                <span aria-hidden>↓</span>
              </a>
              <Link
                href="/path"
                className="border-ink/25 text-ink hover:border-ink inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-medium transition-colors"
              >
                Full record
                <span aria-hidden>→</span>
              </Link>
              <div className="text-ink-soft flex gap-4 text-sm">
                {CONTACT_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.link}
                    {...external(l.link)}
                    className="hover:text-ink transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
          >
            <DossierCard />
          </motion.div>
        </div>

        {/* Proof strip */}
        <motion.div
          className="section-max section-pad relative z-10 mt-10 md:mt-12"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
        >
          <ul className="border-line bg-line grid grid-cols-2 gap-px border sm:grid-cols-3 lg:grid-cols-6">
            {HIGHLIGHTS.map((h) => (
              <li key={h.label} className="bg-bg-elevated">
                <Link
                  href={h.href}
                  className="group hover:bg-panel-wash block h-full p-4 transition-colors"
                >
                  <p
                    className={`figure text-ink group-hover:text-accent ${
                      h.compact
                        ? 'text-[1.2rem] md:text-[1.3rem]'
                        : 'text-[1.45rem] md:text-[1.6rem]'
                    }`}
                  >
                    {h.value}
                  </p>
                  <p className="eyebrow mt-2">{h.label}</p>
                  <p className="text-ink-soft mt-1 text-[12px] leading-snug">
                    {h.detail}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* 01 — Builds */}
      <section
        id="builds"
        className="border-line bg-bg-elevated scroll-mt-20 border-t py-12 md:py-16"
      >
        <div className="section-max section-pad">
          <Reveal y={10}>
            <SectionHead
              title="Builds"
              count={`${PROJECTS.length} projects · 2 companies · 3 hackathon podiums`}
            />
            <p className="text-ink-soft mt-4 max-w-2xl text-sm">
              What I make: education software that runs in real classrooms,
              hackathon builds that placed, and research-grade side projects.
              Three flagships first, then everything else.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FLAGSHIP.map((p, i) => (
              <ProjectCard key={p.id} p={p} delay={i * 0.05} />
            ))}
          </div>

          <Reveal className="mt-8" y={12}>
            <p className="eyebrow-faint">More builds</p>
            <ul className="ledger border-line mt-2 border-y">
              {MORE_BUILDS.map((p) => (
                <li
                  key={p.id}
                  id={p.id}
                  className="grid scroll-mt-28 gap-x-6 gap-y-1.5 py-3.5 md:grid-cols-12 md:items-baseline"
                >
                  <div className="flex items-baseline gap-2.5 md:col-span-3">
                    <h3 className="display-quiet text-ink text-lg">{p.name}</h3>
                    <span className="pill">
                      {p.kind ? PROJECT_KIND_LABEL[p.kind] : 'Build'}
                    </span>
                  </div>
                  <p className="text-ink-soft text-sm leading-snug md:col-span-4">
                    {p.description}
                  </p>
                  <p className="text-accent-deep font-serif text-[14px] italic md:col-span-3">
                    {p.outcome}
                  </p>
                  <div className="flex items-baseline justify-between gap-3 md:col-span-2 md:justify-end">
                    <span className="eyebrow-faint">{p.role}</span>
                    <a
                      href={p.link}
                      {...external(p.link)}
                      className="row-link text-[13px]"
                    >
                      {linkLabel(p.link)} ↗
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between text-[13px]">
              <span className="text-ink-faint">
                Roles, stack, and placements for each build →
              </span>
              <Link href="/work" className="row-link">
                Open work portfolio →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — Honors */}
      <section
        id="honors"
        className="border-line scroll-mt-20 border-t py-12 md:py-16"
      >
        <div className="section-max section-pad">
          <Reveal y={10}>
            <SectionHead
              title="Honors & competition"
              count={`${AWARDS.length} awards · 2023–2026`}
            />
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-7" y={14}>
              <ul className="ledger border-line border-y">
                {AWARDS.map((a) => (
                  <li
                    key={a.id}
                    className="grid gap-x-5 gap-y-1 py-3.5 md:grid-cols-[5.5rem_2.75rem_1fr_auto]"
                  >
                    <p className="eyebrow-faint pt-1">{a.date ?? '—'}</p>
                    {a.image ? (
                      <div className="bg-panel-wash relative hidden h-9 w-9 overflow-hidden md:block">
                        <Image
                          src={a.image}
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
                      <h3 className="text-ink text-[15px] leading-snug font-medium">
                        {a.title}
                      </h3>
                      {a.description && (
                        <p className="text-ink-soft mt-1 text-[13px] leading-snug">
                          {a.description}
                        </p>
                      )}
                    </div>
                    {/* VEX photo already sits in the card to the right */}
                    {a.photo && a.id !== 'award-vex' && (
                      <div className="bg-mist relative mt-1 h-16 w-24 overflow-hidden md:mt-0 md:h-14 md:w-[5.25rem]">
                        <Image
                          src={a.photo}
                          alt={`${a.title} — photo`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 84px"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-[13px]">
                <p className="text-ink-faint">
                  Also: ABRSM Grade 8 Violin & Piano · TOEFL iBT 117 / 120
                </p>
                <Link href="/path" className="row-link">
                  Scores, timeline, athletics →
                </Link>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" y={14} delay={0.06}>
              <UsacoBoard />
              <div className="card mt-4">
                <div className="relative aspect-[16/7]">
                  <Image
                    src="/media/vex/worlds-team.jpeg"
                    alt="VEX team 15520X at their competition booth"
                    fill
                    className="object-cover object-[center_60%]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <span className="pill pill-ink absolute bottom-2 left-2">
                    Team 15520X
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="eyebrow">VEX Robotics · 15520X</p>
                    <p className="eyebrow-faint">Sep 2025 – present</p>
                  </div>
                  <p className="text-ink mt-2 text-sm leading-snug">
                    Engineer and programmer. Autonomous routines plus the
                    driver-control interface.
                  </p>
                  <ul className="tick-list text-ink-soft mt-2.5 space-y-1 text-[13px]">
                    <li>
                      Excellence Award, Alpine Robo Games 2026 → VEX Worlds,
                      Dallas.
                    </li>
                    <li>3rd skills · 3rd qualifiers at Alpine Robo Games.</li>
                    <li>4th skills · 7th overall, Swiss Regional (ISBasel).</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — Research (dark band) */}
      <section
        id="research"
        className="bg-ink scroll-mt-20 py-12 text-white md:py-16"
      >
        <div className="section-max section-pad">
          <Reveal y={10}>
            <SectionHead
              title="Research"
              count={`${PUBLICATIONS.length} papers · co-author`}
              dark
            />
            <p className="mt-4 max-w-2xl text-sm text-white/65">
              AI-based pragmatics assessment and AI-enhanced pedagogy.
              Contributing author on all three; one forthcoming from Cambridge
              University Press with a CALICO conference talk attached.
            </p>
          </Reveal>

          <ul className="ledger-dark mt-6 border-y border-white/12">
            {PUBLICATIONS.map((pub, i) => (
              <Reveal key={pub.id} delay={i * 0.04} y={12}>
                <li className="grid gap-x-6 gap-y-1.5 py-4 md:grid-cols-12">
                  <div className="flex flex-wrap items-center gap-2 md:col-span-3 md:flex-col md:items-start">
                    <span className="pill pill-dark">{pub.status}</span>
                    <span className="text-[12px] text-white/45">
                      {pub.date}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="display-quiet text-lg leading-snug md:text-xl">
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

      {/* 04 — Roles & education */}
      <section
        id="roles"
        className="border-line bg-bg-elevated scroll-mt-20 border-t py-12 md:py-16"
      >
        <div className="section-max section-pad grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal y={10}>
              <SectionHead title="Roles" count={`${ROLES.length} positions`} />
            </Reveal>
            <ul className="ledger border-line mt-4 border-b">
              {ROLES.map((job, i) => (
                <Reveal key={job.id} delay={i * 0.03} y={10}>
                  <li className="grid gap-x-5 gap-y-1.5 py-4 md:grid-cols-12">
                    <p className="eyebrow-faint pt-[3px] md:col-span-3">
                      {dateRange(job.start, job.end)}
                    </p>
                    <div className="md:col-span-9">
                      <div className="flex flex-wrap items-baseline gap-x-2.5">
                        <h3 className="text-ink text-base font-medium">
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
                      <ul className="tick-list text-ink-soft mt-1.5 space-y-1 text-[13px] leading-snug">
                        {job.bullets
                          ?.slice(0, 2)
                          .map((b) => <li key={b}>{b}</li>)}
                      </ul>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <Reveal y={10}>
              <SectionHead title="Education" />
            </Reveal>
            <ul className="ledger border-line mt-4 border-b">
              {EDUCATION.map((e) => (
                <li key={e.id} className="py-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-ink text-[15px] font-medium">
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

            <Reveal className="mt-8" y={10}>
              <SectionHead title="Stack" />
            </Reveal>
            <ul className="ledger border-line mt-4 border-b">
              {SKILL_GROUPS.filter((g) => g.label !== 'Music').map((g) => (
                <li
                  key={g.label}
                  className="grid grid-cols-[6.5rem_1fr] gap-3 py-2.5"
                >
                  <span className="eyebrow-faint pt-[3px]">{g.label}</span>
                  <span className="text-ink text-[13px] leading-snug">
                    {g.items}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 — Music & athletics */}
      <section
        id="beyond"
        className="border-line scroll-mt-20 border-t py-12 md:py-16"
      >
        <div className="section-max section-pad">
          <Reveal y={10}>
            <SectionHead
              title="Music & athletics"
              count="ABRSM Grade 8 ×2 · 14 medals"
            />
          </Reveal>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Reveal y={14}>
              <div className="card card-hover grid h-full gap-0 sm:grid-cols-5">
                <div className="relative min-h-[180px] sm:col-span-2">
                  <Image
                    src="/media/music/violin-performance.png"
                    alt="Alan Shen performing on violin"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 20vw"
                  />
                </div>
                <div className="p-4 sm:col-span-3 md:p-5">
                  <div className="flex items-baseline justify-between">
                    <p className="eyebrow">Music</p>
                    <Link href="/music" className="row-link text-[12px]">
                      Listen →
                    </Link>
                  </div>
                  <h3 className="display-quiet text-ink mt-2 text-xl">
                    Violin & piano, ABRSM Grade 8 in both.
                  </h3>
                  <p className="text-ink-soft mt-2 text-[13px] leading-snug">
                    Orchestra and solo stage performance, from concert halls to
                    orphanages in Romania. Two singles released under my own
                    name.
                  </p>
                  <ul className="ledger border-line mt-3 border-t">
                    {MUSIC_RELEASES.map((r) => (
                      <li
                        key={r.id}
                        className="flex items-center gap-3 py-2 text-[13px]"
                      >
                        <span className="bg-mist relative h-8 w-8 shrink-0 overflow-hidden">
                          <Image
                            src={r.cover}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </span>
                        <span className="text-ink font-medium">{r.title}</span>
                        <span className="eyebrow-faint">{r.type}</span>
                        {r.hyperfollow && (
                          <a
                            href={r.hyperfollow}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="row-link ml-auto text-[12px]"
                          >
                            Stream ↗
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal y={14} delay={0.05}>
              <div className="card card-hover grid h-full gap-0 sm:grid-cols-5">
                <div className="p-4 sm:col-span-3 md:p-5">
                  <div className="flex items-baseline justify-between">
                    <p className="eyebrow">Athletics</p>
                    <Link
                      href="/path#athletics"
                      className="row-link text-[12px]"
                    >
                      Every meet →
                    </Link>
                  </div>
                  <h3 className="display-quiet text-ink mt-2 text-xl">
                    Competitive swimmer, 2× team MVP.
                  </h3>
                  <p className="text-ink-soft mt-2 text-[13px] leading-snug">
                    {SWIM?.title} at Le Rosey since {SWIM?.start.split(' ')[1]}.
                    IM, freestyle, relays, open water. School record in 2023.
                  </p>
                  <MedalBars className="mt-4" />
                </div>
                <div className="relative order-first min-h-[180px] sm:order-none sm:col-span-2">
                  <Image
                    src="/media/swim/medals-rooftop.png"
                    alt="Swimming medals"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 20vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 — Service */}
      <section
        id="service"
        className="border-line bg-bg-elevated scroll-mt-20 border-t py-12 md:py-16"
      >
        <div className="section-max section-pad">
          <Reveal y={10}>
            <SectionHead
              title="Service"
              count={`${VOLUNTEERING.length} programmes`}
            />
          </Reveal>
          <ul className="ledger border-line mt-4 border-b">
            {VOLUNTEERING.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.03} y={10}>
                <li className="grid gap-x-5 gap-y-1.5 py-4 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <p className="eyebrow-faint">{dateRange(v.start, v.end)}</p>
                    <p className="text-ink-faint mt-1 text-[12px]">{v.cause}</p>
                  </div>
                  <div className="md:col-span-9">
                    <div className="flex flex-wrap items-baseline gap-x-2.5">
                      <h3 className="text-ink text-base font-medium">
                        {v.organization}
                      </h3>
                      <span className="text-ink-soft text-[13px]">
                        {v.role}
                      </span>
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
                    {v.description && (
                      <p className="text-ink-soft mt-1.5 text-[13px] leading-snug">
                        {v.description}
                      </p>
                    )}
                    {v.bullets && (
                      <ul className="tick-list text-ink-soft mt-1.5 space-y-1 text-[13px] leading-snug">
                        {v.bullets.slice(0, 3).map((b) => (
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

      {/* 07 — Contact */}
      <section
        id="contact"
        className="border-line scroll-mt-20 border-t py-14 md:py-20"
      >
        <div className="section-max section-pad grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" y={10}>
            <SectionHead title="Contact" />
            <h2 className="display-quiet text-ink mt-5 text-[clamp(1.7rem,4vw,2.6rem)]">
              Happy to talk about any of this.
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="display-quiet border-ink/25 text-ink hover:border-ink mt-4 inline-block border-b pb-1 text-[clamp(1.1rem,3vw,1.7rem)] break-all transition-colors"
            >
              {EMAIL}
            </a>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {SOCIAL_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.link}
                  {...external(l.link)}
                  className="rule-link"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" y={10} delay={0.05}>
            <p className="eyebrow-faint">Deep dives</p>
            <ul className="ledger border-line mt-2 border-y">
              {[
                {
                  href: '/work',
                  title: 'Work',
                  detail: 'Every build with role, stack, and placement',
                },
                {
                  href: '/path',
                  title: 'Path',
                  detail: 'Scores, awards, research, athletics, service',
                },
                {
                  href: '/music',
                  title: 'Music',
                  detail: 'Releases with players and store links',
                },
              ].map((g) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="display-quiet text-ink group-hover:text-accent text-lg">
                      {g.title}
                    </span>
                    <span className="text-ink-soft text-[13px]">
                      {g.detail}
                    </span>
                    <span
                      aria-hidden
                      className="text-accent transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
