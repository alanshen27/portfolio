'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal, SplitChars, easeOut } from '@/components/portfolio-motion'
import { FieldBackdrop } from '@/components/field-backdrop'
import { UsacoBoard } from '@/components/viz/usaco-board'
import { CpGraph } from '@/components/viz/cp-graph'
import {
  EMAIL,
  HOME_INTRO,
  NAME,
  PROJECTS,
  SKILL_GROUPS,
  SOCIAL_LINKS,
  WORK_EXPERIENCE,
} from './data'

const EXPERIENCE = WORK_EXPERIENCE.filter(
  (w) => w.company !== 'Institut Le Rosey',
)

const FEATURED = PROJECTS.filter((p) =>
  ['project1', 'project2'].includes(p.id),
)

const GATES = [
  {
    href: '/work',
    kicker: '01',
    title: 'Work',
    detail: 'Companies and builds that shipped.',
  },
  {
    href: '/path',
    kicker: '02',
    title: 'Path',
    detail: 'Scores, awards, research, athletics.',
  },
  {
    href: '/music',
    kicker: '03',
    title: 'Music',
    detail: 'Releases, violin, and piano.',
  },
] as const

export default function Home() {
  const reduce = useReducedMotion()
  const socials = SOCIAL_LINKS.filter((l) =>
    ['GitHub', 'LinkedIn', 'Email'].includes(l.label),
  )

  return (
    <div className="bg-atmosphere">
      {/* Hero — left-aligned editorial, not centered clone */}
      <section className="relative min-h-[100svh] overflow-hidden pt-20">
        <FieldBackdrop />
        <div className="section-max section-pad relative z-10 grid min-h-[calc(100svh-5rem)] items-end gap-12 pb-16 md:grid-cols-12 md:pb-20">
          <div className="md:col-span-7">
            <motion.p
              className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Institut Le Rosey · Geneva · ’27
            </motion.p>

            <h1 className="display-quiet mt-5 text-[clamp(3.5rem,10vw,6.75rem)] text-ink">
              <SplitChars text={NAME} delay={0.08} />
            </h1>

            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-ink-soft md:text-lg"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: easeOut }}
            >
              Founder and developer building education systems — with USACO
              Gold, VEX Worlds, and a violin on the side.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: easeOut }}
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-85"
              >
                See the work
                <span aria-hidden>→</span>
              </a>
              <div className="flex gap-5 text-sm text-ink-soft">
                {socials.map((l) => (
                  <a
                    key={l.label}
                    href={l.link}
                    target={l.label === 'Email' ? undefined : '_blank'}
                    rel={
                      l.label === 'Email' ? undefined : 'noopener noreferrer'
                    }
                    className="transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="md:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
          >
            <UsacoBoard />
          </motion.div>
        </div>
      </section>

      {/* About — asymmetric */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-line bg-bg-elevated py-20 md:py-28"
      >
        <div className="section-max section-pad grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              About
            </p>
            <h2 className="display-quiet mt-4 text-[clamp(1.9rem,4vw,2.8rem)] text-ink">
              {HOME_INTRO}
            </h2>
            <p className="mt-8 font-mono text-[12px] tracking-[0.1em] text-ink-faint">
              [ {NAME} ]
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/media/portrait/award-ceremony.png"
                alt="Alan Shen"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills — flat rows, no glass card */}
      <section className="border-t border-line py-16 md:py-20">
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Skills
            </p>
          </Reveal>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {SKILL_GROUPS.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.04} y={10}>
                <li className="grid gap-2 py-5 md:grid-cols-12 md:gap-8">
                  <span className="font-mono text-[11px] tracking-[0.12em] text-ink-faint uppercase md:col-span-3">
                    {g.label}
                  </span>
                  <span className="text-sm text-ink md:col-span-9 md:text-base">
                    {g.items}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience — open timeline */}
      <section className="border-t border-line bg-bg-elevated py-16 md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Experience
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.8rem,4vw,2.5rem)] text-ink">
              Founding. Building. Competing.
            </h2>
          </Reveal>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={job.id} delay={i * 0.04} y={14}>
                <li className="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <p className="font-mono text-[11px] text-ink-faint uppercase">
                      {job.start} – {job.end}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="display-quiet text-xl text-ink">
                      {job.company}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{job.title}</p>
                    {job.link && (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm text-accent hover:opacity-70"
                      >
                        Visit →
                      </a>
                    )}
                  </div>
                  <ul className="space-y-2 md:col-span-5">
                    {job.bullets?.slice(0, 3).map((b) => (
                      <li
                        key={b}
                        className="border-l border-accent/35 pl-3 text-sm leading-relaxed text-ink-soft"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured work */}
      <section
        id="work"
        className="scroll-mt-24 border-t border-line py-16 md:py-24"
      >
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Featured
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.8rem,4vw,2.5rem)] text-ink">
              Two companies. One mission.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {FEATURED.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06} y={18}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={`${p.name} screenshot`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    )}
                  </div>
                  <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
                    {p.role} · {p.timeframe}
                  </p>
                  <h3 className="display-quiet mt-1.5 text-2xl text-ink group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {p.description}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10" y={10}>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-accent hover:opacity-70"
            >
              Every build
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CP — dark signature band */}
      <section className="bg-ink py-16 text-white md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-lake uppercase">
              Competitive programming
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.8rem,4vw,2.6rem)]">
              Perfect Silver. Straight to Gold.
            </h2>
          </Reveal>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <Reveal delay={0.06}>
              <div className="border border-white/15 bg-white/[0.03] p-5 md:p-6">
                <p className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase">
                  Graph search · BFS
                </p>
                <CpGraph className="mt-3" tone="dark" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col justify-center">
              <p className="font-mono text-[12px] tracking-[0.1em] text-white/45 uppercase">
                USACO · Feb 2026 · 1000 / 1000
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
                Binary search until the answer snaps into place — then the
                division board updates. That score is how I got to Gold.
              </p>
              <Link
                href="/path"
                className="mt-8 inline-flex items-center gap-2 text-sm text-lake hover:opacity-70"
              >
                Full competition record
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Index / gates — editorial, not cards */}
      <section className="border-t border-line py-16 md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Index
            </p>
          </Reveal>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {GATES.map((g, i) => (
              <Reveal key={g.href} delay={i * 0.05} y={12}>
                <li>
                  <Link
                    href={g.href}
                    className="group flex flex-wrap items-baseline justify-between gap-4 py-7"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-[11px] text-ink-faint">
                        {g.kicker}
                      </span>
                      <span className="display-quiet text-3xl text-ink transition-colors group-hover:text-accent md:text-4xl">
                        {g.title}
                      </span>
                    </div>
                    <span className="text-sm text-ink-soft">{g.detail}</span>
                    <span
                      aria-hidden
                      className="text-accent transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 border-t border-line bg-bg-elevated py-20 md:py-28"
      >
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Contact
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.9rem,4.5vw,2.8rem)] text-ink">
              Let’s talk.
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="display-quiet mt-8 inline-block border-b border-ink/25 pb-1 text-[clamp(1.2rem,3.5vw,2rem)] break-all text-ink transition-colors hover:border-ink"
            >
              {EMAIL}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
