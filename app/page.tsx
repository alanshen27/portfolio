'use client'

import Image from 'next/image'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'
import { Reveal, easeOut } from '@/components/portfolio-motion'
import { ScrollProgress } from '@/components/scroll-progress'
import { ChapterRail } from '@/components/chapter-rail'
import { TrackPlayer } from '@/components/track-player'
import {
  AWARDS,
  EDUCATION,
  EMAIL,
  MUSIC_RELEASES,
  NAME,
  PROJECTS,
  PUBLICATIONS,
  SOCIAL_LINKS,
  TAGLINE,
  VOLUNTEERING,
  WORK_EXPERIENCE,
} from './data'

const CHAPTERS = [
  { id: 'ventures', label: 'Ventures' },
  { id: 'competition', label: 'Competition' },
  { id: 'research', label: 'Research' },
  { id: 'music', label: 'Music' },
  { id: 'athletics', label: 'Athletics' },
  { id: 'service', label: 'Service' },
  { id: 'contact', label: 'Contact' },
]

const CREDENTIALS = [
  '2× Founder',
  'USACO Gold ’26',
  'VEX Worlds ’26',
  'Cambridge University Press',
  'ABRSM Grade 8',
]

const GLANCE = [
  { value: '2×', label: 'Founder', detail: 'Studious · Scribe' },
  { value: '1000', label: 'USACO Silver, perfect', detail: 'Promoted straight to Gold' },
  { value: 'Worlds', label: 'VEX Robotics ’26', detail: 'Excellence Award qualifier' },
  { value: '3×', label: 'Hackathon podium', detail: 'HackHarvard · HackMIT · Empower' },
  { value: '3', label: 'Publications', detail: 'Incl. Cambridge University Press' },
  { value: '14', label: 'Swim medals', detail: '2-year team MVP' },
  { value: 'Gr. 8', label: 'ABRSM ×2', detail: 'Violin & piano' },
  { value: '117', label: 'TOEFL iBT', detail: 'out of 120' },
]

const project = (id: string) => PROJECTS.find((p) => p.id === id)!

const HACK_BUILDS = [
  { p: project('project-nomad'), badge: '3rd Place · HackMIT China ’26' },
  { p: project('project3'), badge: 'HackHarvard 2025 · Invitational' },
  { p: project('project4'), badge: '3rd Place · Empower 3.0' },
]

function SectionHead({
  no,
  kicker,
  title,
  tone = 'light',
}: {
  no: string
  kicker: string
  title: string
  tone?: 'light' | 'dark'
}) {
  return (
    <Reveal className="relative">
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-10 right-0 font-[family-name:var(--font-display)] text-[clamp(5rem,11vw,8.5rem)] leading-none font-medium select-none ${
          tone === 'dark' ? 'text-white/[0.05]' : 'text-ink/[0.045]'
        }`}
      >
        {no}
      </span>
      <p
        className={`font-mono text-[11px] tracking-[0.2em] uppercase ${
          tone === 'dark' ? 'text-lake' : 'text-accent'
        }`}
      >
        {no} · {kicker}
      </p>
      <h2
        className={`display-quiet mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,2.9rem)] ${
          tone === 'dark' ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
    </Reveal>
  )
}

export default function Home() {
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const studious = project('project1')
  const scribe = project('project2')
  const luduan = WORK_EXPERIENCE.find((w) => w.id === 'work3')
  const swim = WORK_EXPERIENCE.find((w) => w.id === 'work5')
  const casa = VOLUNTEERING.find((v) => v.id === 'vol-casa')
  const otherService = VOLUNTEERING.filter((v) => v.id !== 'vol-casa')

  return (
    <>
      <ScrollProgress />
      <ChapterRail chapters={CHAPTERS} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden bg-[#050607]"
      >
        <motion.div
          className="absolute inset-0 scale-[1.06]"
          style={reduce ? undefined : { y: imageY }}
        >
          <Image
            src="/alan/violin-2.png"
            alt="Alan Shen performing on violin"
            fill
            priority
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-[#050607]/35 to-transparent" />

        <motion.div
          style={reduce ? undefined : { opacity: heroOpacity }}
          className="relative flex min-h-[100svh] flex-col justify-end px-6 pt-28 pb-14 sm:px-10 md:pb-16 lg:px-16"
        >
          <motion.p
            className="font-mono text-[11px] tracking-[0.2em] text-white/55 uppercase"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
          >
            Institut Le Rosey · Class of 2027 · Geneva
          </motion.p>

          <motion.h1
            className="display-quiet mt-4 max-w-3xl text-[clamp(3.25rem,11vw,7rem)] text-white"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: easeOut }}
          >
            {NAME}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: easeOut }}
          >
            Founder, developer, and violinist. {TAGLINE}
          </motion.p>

          <motion.ul
            className="mt-8 flex flex-wrap gap-2"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.52, ease: easeOut }}
          >
            {CREDENTIALS.map((c) => (
              <li
                key={c}
                className="border border-white/25 px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-white/85 uppercase backdrop-blur-sm"
              >
                {c}
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-6 text-sm"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: easeOut }}
          >
            <a
              href="#glance"
              className="inline-flex items-center gap-2 border-b border-white/50 pb-1 tracking-[0.04em] text-white transition-colors hover:border-white"
            >
              Start the dossier
              <span aria-hidden>↓</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-white/55 transition-colors hover:text-white"
            >
              {EMAIL}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* At a glance */}
      <section id="glance" className="scroll-mt-24 border-b border-line bg-bg">
        <div className="section-max section-pad py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              At a glance
            </p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
            {GLANCE.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.04} y={16}>
                <li className="h-full bg-bg-elevated p-5 md:p-6">
                  <p className="display-quiet text-[clamp(1.6rem,3.5vw,2.4rem)] text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[13px] font-medium text-ink">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-faint">
                    {stat.detail}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-soft md:flex-row md:items-baseline md:gap-8">
              {EDUCATION.map((edu) => (
                <p key={edu.id}>
                  <span className="font-medium text-ink">
                    {edu.institution}
                  </span>{' '}
                  — {edu.degree}, {edu.start}–{edu.end}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 01 Ventures */}
      <section
        id="ventures"
        className="scroll-mt-24 border-b border-line bg-bg-elevated"
      >
        <div className="section-max section-pad py-20 md:py-28">
          <SectionHead
            no="01"
            kicker="Founded & shipped"
            title="Two companies, one mission: better ways to learn."
          />

          <div className="mt-14 space-y-16 md:space-y-20">
            {[studious, scribe].map((p, i) => (
              <Reveal key={p.id} y={26}>
                <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative block aspect-[16/10] overflow-hidden border border-line bg-mist lg:col-span-7 ${
                      i % 2 === 1 ? 'lg:order-2 lg:col-start-6' : ''
                    }`}
                  >
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={`${p.name} product screenshot`}
                        fill
                        className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                      />
                    )}
                  </a>

                  <div
                    className={`lg:col-span-5 ${
                      i % 2 === 1 ? 'lg:order-1 lg:col-start-1' : ''
                    }`}
                  >
                    <p className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
                      {p.role} · {p.timeframe}
                    </p>
                    <h3 className="display-quiet mt-3 text-[clamp(1.7rem,3.5vw,2.4rem)] text-ink">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-soft">
                      {p.description}
                    </p>
                    {p.points && (
                      <ul className="mt-5 space-y-2.5">
                        {p.points.map((point) => (
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
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm text-accent transition-opacity hover:opacity-70"
                    >
                      Open live
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {luduan && (
            <Reveal className="mt-16" y={20}>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-y border-line py-6">
                <div>
                  <h3 className="display-quiet text-xl text-ink">
                    {luduan.company}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {luduan.title} · {luduan.start} – {luduan.end} — migrating
                    features to a new codebase serving 30+ U.S. institutions.
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

          <Reveal className="mt-16" y={20}>
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">
              Built in under 48 hours
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {HACK_BUILDS.map(({ p, badge }) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-line bg-bg p-5 transition-colors hover:border-accent/50"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={`${p.name} screenshot`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    )}
                  </div>
                  <p className="mt-4 font-mono text-[10px] tracking-[0.1em] text-accent uppercase">
                    {badge}
                  </p>
                  <h3 className="display-quiet mt-1.5 text-xl text-ink group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                    {p.description}
                  </p>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 Competition */}
      <section id="competition" className="scroll-mt-24 border-b border-line bg-bg">
        <div className="section-max section-pad py-20 md:py-28">
          <SectionHead
            no="02"
            kicker="The record"
            title="Awards & honors."
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ul className="divide-y divide-line border-y border-line">
                {AWARDS.map((award) => (
                  <li
                    key={award.id}
                    className="grid gap-1 py-5 md:grid-cols-12 md:gap-6"
                  >
                    <span className="font-mono text-[11px] text-ink-faint uppercase md:col-span-2 md:pt-1">
                      {award.date ?? '—'}
                    </span>
                    <div className="md:col-span-10">
                      <h3 className="font-medium text-ink">{award.title}</h3>
                      {award.description && (
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.08}>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden border border-line">
                  <Image
                    src="/alan/vex-worlds.jpeg"
                    alt="Team 15520X MECH_IT_HAPPEN at the VEX Robotics World Championship 2026"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-[11px] tracking-[0.1em] text-ink-faint uppercase">
                  15520X MECH_IT_HAPPEN · VEX Worlds 2026, St. Louis
                </figcaption>
              </figure>
              <figure className="mt-6">
                <div className="relative aspect-[16/9] overflow-hidden border border-line">
                  <Image
                    src="/alan/stage.jpeg"
                    alt="VEX Robotics World Championship 2026 arena"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-[11px] tracking-[0.1em] text-ink-faint uppercase">
                  Worlds arena · qualified via Excellence Award
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 Research */}
      <section id="research" className="scroll-mt-24 bg-ink text-white">
        <div className="section-max section-pad py-20 md:py-28">
          <SectionHead
            no="03"
            kicker="Publications"
            title="Published & forthcoming."
            tone="dark"
          />

          <ul className="mt-14 border-t border-white/15">
            {PUBLICATIONS.map((pub, i) => (
              <Reveal key={pub.id} delay={i * 0.05} y={20}>
                <li className="grid gap-3 border-b border-white/15 py-8 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <span className="inline-block border border-lake/40 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-lake uppercase">
                      {pub.status}
                    </span>
                    <p className="mt-2 font-mono text-[11px] text-white/45">
                      {pub.date}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="display-quiet text-xl text-white md:text-2xl">
                      {pub.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/65">{pub.authors}</p>
                    <p className="mt-1 text-sm text-white/45 italic">
                      {pub.venue}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 Music */}
      <section id="music" className="scroll-mt-24 border-b border-line bg-bg">
        <div className="section-max section-pad py-20 md:py-28">
          <SectionHead
            no="04"
            kicker="Released"
            title="Written, recorded, released."
          />

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-7">
              {MUSIC_RELEASES.map((track, i) => (
                <Reveal key={track.id} delay={i * 0.06} y={18}>
                  <TrackPlayer track={track} />
                </Reveal>
              ))}
            </div>

            <Reveal className="lg:col-span-5" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden border border-line">
                <Image
                  src="/alan/orchestra-ensemble.jpg"
                  alt="Alan Shen performing with orchestra ensemble"
                  fill
                  className="object-cover object-[center_35%]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                Two singles released as {NAME}, distributed to every major
                store. Off the mic: ABRSM Grade 8 in both violin and piano,
                with orchestra and solo stage performance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 Athletics */}
      <section
        id="athletics"
        className="scroll-mt-24 border-b border-line bg-bg-elevated"
      >
        <div className="section-max section-pad py-20 md:py-28">
          <SectionHead
            no="05"
            kicker="In the water"
            title="Fourteen medals deep."
          />

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
            <Reveal className="relative aspect-[16/10] overflow-hidden border border-line lg:col-span-6">
              <Image
                src="/alan/swim-team.jpg"
                alt="Le Rosey swim team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>

            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
                {swim?.title} · {swim?.start} – {swim?.end}
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  '2-year Swimming MVP at Le Rosey.',
                  '14 medals — 8 gold, 4 silver, 2 bronze.',
                  'ADISR 2023: 1st place (Moyen), 3 golds and a new school record.',
                  'Events: IM, freestyle sprints, relays, and open water.',
                ].map((line) => (
                  <li
                    key={line}
                    className="border-l border-accent/40 pl-3 text-sm leading-relaxed text-ink-soft md:text-base"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 Service */}
      <section id="service" className="scroll-mt-24 border-b border-line bg-bg">
        <div className="section-max section-pad py-20 md:py-28">
          <SectionHead
            no="06"
            kicker="Giving back"
            title="Code, violin, and concrete."
          />

          {casa && (
            <Reveal className="mt-14" y={24}>
              <article className="grid gap-8 border border-line bg-bg-elevated lg:grid-cols-12">
                <div className="relative min-h-[240px] lg:col-span-6">
                  <Image
                    src={casa.image!}
                    alt="Volunteers in hard hats at a housing construction site in Oradea, Romania"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 lg:col-span-6 lg:p-10">
                  <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                    {casa.cause} · {casa.start} – {casa.end}
                  </p>
                  <h3 className="display-quiet mt-3 text-2xl text-ink">
                    {casa.organization}
                  </h3>
                  <p className="mt-1 text-sm text-ink-faint">{casa.role}</p>
                  <ul className="mt-5 space-y-2.5">
                    {casa.bullets?.map((b) => (
                      <li
                        key={b}
                        className="border-l border-accent/40 pl-3 text-sm leading-relaxed text-ink-soft"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {otherService.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.06} y={18}>
                <article className="h-full border border-line bg-bg-elevated p-6 md:p-8">
                  <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                    {v.cause} · {v.start} – {v.end}
                  </p>
                  <h3 className="display-quiet mt-3 text-xl text-ink">
                    {v.organization}
                  </h3>
                  <p className="mt-1 text-sm text-ink-faint">{v.role}</p>
                  {v.description && (
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {v.description}
                    </p>
                  )}
                  {v.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {v.bullets.map((b) => (
                        <li
                          key={b}
                          className="border-l border-accent/40 pl-3 text-sm leading-relaxed text-ink-soft"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Contact */}
      <section id="contact" className="scroll-mt-24 bg-ink text-white">
        <div className="section-max section-pad py-20 md:py-28">
          <SectionHead no="07" kicker="Say hello" title="Let’s talk." tone="dark" />

          <Reveal className="mt-10" y={18}>
            <a
              href={`mailto:${EMAIL}`}
              className="display-quiet inline-block border-b border-white/30 pb-2 text-[clamp(1.4rem,4.5vw,2.75rem)] break-all text-white transition-colors hover:border-white"
            >
              {EMAIL}
            </a>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {SOCIAL_LINKS.filter((l) =>
                ['LinkedIn', 'GitHub', 'Music'].includes(l.label),
              ).map((link) => (
                <a
                  key={link.label}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
            <p className="mt-12 font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">
              Open to research, startups, and ambitious builds · Geneva ·
              Class of 2027
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
