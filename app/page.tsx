'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/portfolio-motion'
import { PianoRoll } from '@/components/viz/piano-roll'
import { Roll } from '@/components/roll'
import { AppPlate } from '@/components/app-plate'
import { SCRIBE_SCREENS, STUDIOUS_SCREENS } from '@/app/screens'
import { dateRange } from '@/lib/utils'
import {
  AWARDS,
  EDUCATION,
  EMAIL,
  HOME_BIO,
  MUSIC_RELEASES,
  NOTES,
  PROGRAMME,
  PROJECTS,
  SKILL_GROUPS,
  SOCIAL_LINKS,
  VOLUNTEERING,
  WORK_EXPERIENCE,
} from './data'

const STUDIOUS = PROJECTS.find((p) => p.id === 'project1')!
const SCRIBE = PROJECTS.find((p) => p.id === 'project2')!
const NOTATE = PROJECTS.find((p) => p.id === 'project-notate')!
const ROLES = WORK_EXPERIENCE.filter((w) => w.company !== 'Institut Le Rosey')

function ext(href: string) {
  return href.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
}

/* ---- primitives: a section is a small label and a hairline ---------------- */

function Section({
  id,
  label,
  children,
  className = '',
}: {
  id?: string
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`section-max section-pad scroll-mt-24 py-14 md:py-20 ${className}`}
    >
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <h2 className="text-ink-faint text-[13px] md:col-span-2">{label}</h2>
        <div className="min-w-0 md:col-span-10">{children}</div>
      </div>
    </section>
  )
}

function Row({
  title,
  subtitle,
  right,
  href,
}: {
  title: string
  subtitle?: string
  right?: string
  href?: string
}) {
  const body = (
    <div className="border-line grid gap-x-6 gap-y-0.5 border-b py-3.5 md:grid-cols-[1fr_auto]">
      <div className="min-w-0">
        <p className="text-ink text-[16px] leading-snug font-medium">{title}</p>
        {subtitle && (
          <p className="text-ink-soft text-[15px] leading-snug">{subtitle}</p>
        )}
      </div>
      {right && (
        <p className="text-ink-faint text-[13px] md:pt-0.5 md:text-right">
          {right}
        </p>
      )}
    </div>
  )
  if (!href) return body
  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href} className="hover:bg-bg-elevated -mx-2 block px-2">
      {body}
    </Link>
  ) : (
    <a
      href={href}
      {...ext(href)}
      className="hover:bg-bg-elevated -mx-2 block px-2"
    >
      {body}
    </a>
  )
}

function Note({
  id,
  title,
  meta,
  paragraphs,
  link,
  figure,
}: {
  id: string
  title: string
  meta: string
  paragraphs: string[]
  link?: { href: string; label: string }
  figure?: React.ReactNode
}) {
  return (
    <article id={id} className="scroll-mt-24 py-10 first:pt-0 last:pb-0">
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h3 className="text-ink text-[22px] leading-tight font-medium">
            {title}
          </h3>
          <p className="text-ink-faint mt-1 text-[13px]">{meta}</p>
          {link && (
            <a
              href={link.href}
              {...ext(link.href)}
              className="row-link mt-3 inline-block text-[13px]"
            >
              {link.label} →
            </a>
          )}
        </div>
        <div className="md:col-span-8">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-ink-soft max-w-[62ch] text-[16px] leading-relaxed [&+&]:mt-3"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
      {figure && <div className="mt-8">{figure}</div>}
    </article>
  )
}

/* ---- page ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="bg-bg text-ink">
      {/* cover: a name, a line, the roll */}
      <section className="section-max section-pad pt-28 md:pt-36">
        <Reveal y={8}>
          <h1 className="text-ink text-[clamp(2rem,4vw,2.75rem)] leading-tight font-medium tracking-[-0.02em]">
            Alan Shen
          </h1>
          <p className="text-ink-soft mt-3 max-w-[58ch] text-[18px] leading-relaxed">
            Student at Institut Le Rosey, class of 2027. He builds education
            software, competes in programming and robotics, contributes to
            research on AI in language assessment, and plays the violin.
          </p>
        </Reveal>
        <Reveal className="mt-14 md:mt-20" y={8} delay={0.1}>
          <Roll />
          <p className="text-ink-faint mt-3 text-[13px]">
            everything since arriving at Le Rosey, drawn to its length on the
            piano roll he built for notate. amber is a result; the hatch is what
            comes next.
          </p>
        </Reveal>
      </section>

      <Section id="work" label="work" className="mt-6 md:mt-10">
        <div className="border-line border-t">
          {PROGRAMME.map((p) => (
            <Row
              key={p.title}
              title={p.title}
              subtitle={p.subtitle}
              right={p.right}
              href={p.href}
            />
          ))}
        </div>
        <p className="text-ink-faint mt-3 text-[13px]">
          <Link href="/work" className="row-link">
            all works, with notes →
          </Link>
        </p>
      </Section>

      <Section id="notes" label="notes">
        <div className="divide-line divide-y">
          <Note
            id="note-studious"
            title="Studious"
            meta={`${STUDIOUS.role} · ${STUDIOUS.timeframe}`}
            paragraphs={NOTES.studious}
            link={{ href: STUDIOUS.link, label: 'studious.sh' }}
            figure={
              <AppPlate
                domain="studious.sh"
                screens={STUDIOUS_SCREENS}
                spread
              />
            }
          />
          <Note
            id="note-scribe"
            title="Scribe"
            meta={`co-founder & engineer · ${SCRIBE.timeframe}`}
            paragraphs={NOTES.scribe}
            link={{ href: SCRIBE.link, label: 'scribe.study' }}
            figure={
              <AppPlate
                domain="scribe.study"
                screens={SCRIBE_SCREENS}
                ratio="aspect-[4/3]"
                spread
              />
            }
          />
          <Note
            id="note-notate"
            title="notate"
            meta={`${NOTATE.role} · ${NOTATE.timeframe}`}
            paragraphs={NOTES.notate}
            link={{ href: NOTATE.link, label: 'source on GitHub' }}
            figure={
              <figure className="grid gap-6 md:grid-cols-12 md:gap-10">
                <div className="border-line border md:col-span-8">
                  <PianoRoll className="aspect-[16/9] w-full" />
                </div>
                <figcaption className="text-ink-soft text-[15px] leading-snug md:col-span-4">
                  a sketched phrase in ink; the model’s continuation in amber.
                </figcaption>
              </figure>
            }
          />
          <Note
            id="note-competition"
            title="Competition"
            meta="USACO · VEX Robotics · 2025 – 2026"
            paragraphs={NOTES.competition}
          />
          <Note
            id="note-research"
            title="Research"
            meta="Luduan.ai · Cambridge University Press · CALICO"
            paragraphs={NOTES.research}
          />
        </div>
      </Section>

      <Section id="interval" label="music">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="text-ink-soft max-w-[62ch] text-[16px] leading-relaxed">
              ABRSM grade 8 on both violin and piano; orchestra and solo stage,
              from concert halls to orphanages in Oradea, Romania, where he
              wrote and performed a song for more than sixty students. Two
              singles released under his own name.
            </p>
            <div className="border-line mt-6 border-t">
              {MUSIC_RELEASES.map((r) => (
                <div
                  key={r.id}
                  className="border-line flex items-center gap-4 border-b py-3"
                >
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden">
                    <Image
                      src={r.cover}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block text-[16px] font-medium">
                      {r.title}
                    </span>
                    <span className="text-ink-faint text-[13px]">
                      {r.type} · {r.artist}
                    </span>
                  </span>
                  {r.hyperfollow && (
                    <a
                      href={r.hyperfollow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="row-link text-[13px]"
                    >
                      listen →
                    </a>
                  )}
                </div>
              ))}
            </div>
            <p className="text-ink-faint mt-3 text-[13px]">
              <Link href="/music" className="row-link">
                players, stores and stage photographs →
              </Link>
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/media/site/banner.jpg"
                alt="Alan Shen performing violin on stage"
                fill
                className="object-cover object-[35%_center]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section id="honours" label="record">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="border-line border-t">
              {AWARDS.map((a) => (
                <div
                  key={a.id}
                  className="border-line grid gap-x-6 gap-y-0.5 border-b py-3 md:grid-cols-[5.5rem_1fr]"
                >
                  <p className="text-ink-faint text-[13px] md:pt-0.5">
                    {a.date ?? '—'}
                  </p>
                  <div>
                    <p className="text-ink text-[16px] leading-snug font-medium">
                      {a.title}
                    </p>
                    {a.description && (
                      <p className="text-ink-soft text-[15px] leading-snug">
                        {a.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-ink-faint mt-3 text-[13px]">
              also ABRSM grade 8 piano and violin · TOEFL iBT 117 / 120.{' '}
              <Link href="/path" className="row-link">
                full record →
              </Link>
            </p>
          </div>
          <div className="md:col-span-5">
            <h3 className="text-ink-faint text-[13px]">swimming</h3>
            <p className="text-ink-soft mt-2 text-[15px] leading-snug">
              competitive swimmer for Le Rosey since 2023 — fourteen medals
              across IM, freestyle, relays and open water; two-year team mvp;
              one school record.
            </p>
            <h3 className="text-ink-faint mt-8 text-[13px]">service</h3>
            <div className="border-line mt-2 border-t">
              {VOLUNTEERING.map((v) => (
                <div key={v.id} className="border-line border-b py-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-ink text-[16px] leading-snug font-medium">
                      {v.organization}
                    </p>
                    <p className="text-ink-faint text-[13px] whitespace-nowrap">
                      {dateRange(v.start, v.end)}
                    </p>
                  </div>
                  <p className="text-ink-soft text-[15px] leading-snug">
                    {v.role} · {v.cause}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="biography" label="about">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="text-ink-soft max-w-[62ch] text-[16px] leading-relaxed">
              {HOME_BIO}
            </p>
            <dl className="mt-6 text-[15px]">
              {[
                ['school', 'Institut Le Rosey, Rolle, Switzerland'],
                ['programme', 'IB diploma · class of 2027'],
                ['summer 2026', 'Penn ESAP — AI and its mathematics'],
                ...SKILL_GROUPS.filter((g) => g.label !== 'music').map((g) => [
                  g.label,
                  g.items,
                ]),
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="border-line grid grid-cols-[7rem_1fr] gap-4 border-b py-2"
                >
                  <dt className="text-ink-faint">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="md:col-span-5">
            <h3 className="text-ink-faint text-[13px]">appointments</h3>
            <div className="border-line mt-2 border-t">
              {ROLES.map((job) => (
                <div key={job.id} className="border-line border-b py-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-ink text-[16px] leading-snug font-medium">
                      {job.company}
                    </p>
                    <p className="text-ink-faint text-[13px] whitespace-nowrap">
                      {dateRange(job.start, job.end)}
                    </p>
                  </div>
                  <p className="text-ink-soft text-[15px]">{job.title}</p>
                </div>
              ))}
            </div>
            <h3 className="text-ink-faint mt-8 text-[13px]">education</h3>
            <div className="border-line mt-2 border-t">
              {EDUCATION.map((e) => (
                <div key={e.id} className="border-line border-b py-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-ink text-[16px] leading-snug font-medium">
                      {e.institution}
                    </p>
                    <p className="text-ink-faint text-[13px] whitespace-nowrap">
                      {dateRange(e.start, e.end)}
                    </p>
                  </div>
                  <p className="text-ink-soft text-[15px]">{e.degree}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" label="contact" className="pb-24">
        <a
          href={`mailto:${EMAIL}`}
          className="text-ink hover:text-accent text-[clamp(1.4rem,3vw,2rem)] font-medium tracking-[-0.01em] break-all transition-colors"
        >
          {EMAIL}
        </a>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {SOCIAL_LINKS.filter((l) => l.label !== 'email').map((l) => (
            <a
              key={l.label}
              href={l.link}
              {...ext(l.link)}
              className="row-link"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Section>
    </div>
  )
}
