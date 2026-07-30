'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import {
  CropFrame,
  Marquee,
  Reveal,
  easeOut,
} from '@/components/portfolio-motion'
import { MegaTicker } from '@/components/mega-ticker'
import { PageHero } from '@/components/page-hero'
import { ScrollProgress } from '@/components/scroll-progress'
import {
  CERTIFICATIONS,
  EDUCATION,
  EMAIL,
  SKILLS,
  SOCIAL_LINKS,
  SUMMARY,
} from '../data'

export default function AboutPage() {
  const reduce = useReducedMotion()

  return (
    <>
      <ScrollProgress />
      <PageHero
        label="About"
        title="Student"
        titleLine2="Everywhere"
        description={SUMMARY}
        image="/alan/graduation.png"
        ticker={[
          'Le Rosey',
          'Founder',
          'Violin',
          'Piano',
          'Swimmer',
          'Builder',
          'Geneva',
        ]}
      />

      <section className="overflow-x-clip border-b border-line bg-bg-elevated py-16 md:py-24">
        <div className="section-max section-pad">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="relative min-h-[320px] overflow-hidden lg:col-span-5 lg:min-h-[520px]">
              <Image
                src="/alan/graduation.png"
                alt="Alan Shen"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <div className="absolute inset-4 border border-white/25" />
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs tracking-[0.28em] text-accent uppercase">
                  Bio
                </p>
                <h2 className="display-smash mt-4 text-[clamp(2.2rem,5vw,3.8rem)] text-ink">
                  Student at Le Rosey.
                  <span className="mt-2 block text-accent">
                    Builder everywhere else.
                  </span>
                </h2>
              </Reveal>

              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                <Reveal delay={0.05}>
                  <h3 className="text-xs font-medium tracking-[0.22em] text-ink-faint uppercase">
                    Education
                  </h3>
                  <ul className="mt-4 space-y-5">
                    {EDUCATION.map((edu) => (
                      <li key={edu.id}>
                        <p className="text-lg font-semibold text-ink">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-ink-soft">
                          {edu.degree} · {edu.start} – {edu.end}
                        </p>
                        {edu.location && (
                          <p className="text-sm text-ink-faint">
                            {edu.location}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.1}>
                  <h3 className="text-xs font-medium tracking-[0.22em] text-ink-faint uppercase">
                    Certifications
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {CERTIFICATIONS.map((cert) => (
                      <li key={cert.id} className="text-sm text-ink-soft">
                        <span className="font-medium text-ink">{cert.name}</span>
                        {cert.issuer ? ` — ${cert.issuer}` : ''}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-x-clip border-b border-line bg-bg py-12 md:py-16">
        <div className="section-max section-pad">
          <Reveal>
            <p className="text-xs tracking-[0.28em] text-accent uppercase">
              IRL
            </p>
          </Reveal>
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 md:gap-4">
            {[
              '/alan/graduation.png',
              '/alan/hackmit.jpg',
              '/alan/medals-rooftop.png',
              '/alan/hackharvard-win.jpg',
              '/alan/vex-team.png',
              '/alan/swim-team.jpg',
              '/alan/lake-medals.webp',
              '/alan/violin-group.png',
              '/alan/violin-2.png',
              '/alan/orchestra-hall.jpg',
              '/alan/orchestra-ensemble.jpg',
              '/alan/orchestra.png',
            ].map((src) => (
              <div
                key={src}
                className="relative h-36 w-48 shrink-0 overflow-hidden md:h-44 md:w-60"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-ink py-5">
        <MegaTicker
          items={['Connect', 'Collaborate', 'Build', 'Research', 'Create']}
          tone="white"
        />
      </div>

      <section className="bg-atmosphere py-16 md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <CropFrame
              fill="ink"
              tone="white"
              className="scroll-mt-24 p-8 md:p-12"
            >
              <div id="connect" className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="text-xs tracking-[0.28em] text-lake uppercase">
                    Connect
                  </p>
                  <h2 className="display-smash mt-4 text-[clamp(2.4rem,6vw,4.2rem)] text-white">
                    Open to research,
                    <span className="mt-2 block text-accent">
                      startups, and ambitious builds.
                    </span>
                  </h2>
                  <p className="mt-5 max-w-xl text-base text-white/70">
                    Reach out anytime — collaborations, questions, or just a
                    hello.
                  </p>
                  <div className="mt-8">
                    <Magnetic intensity={0.25} range={100}>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="inline-flex items-center bg-accent px-6 py-3.5 text-sm font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-accent-deep"
                      >
                        {EMAIL}
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <ul className="space-y-1 border-t border-white/15 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                  {SOCIAL_LINKS.filter((l) => l.label !== 'Email').map(
                    (link, i) => (
                      <motion.li
                        key={link.label}
                        initial={reduce ? false : { opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.1 + i * 0.06,
                          duration: 0.45,
                          ease: easeOut,
                        }}
                      >
                        <a
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between py-3 text-sm tracking-wide text-white/70 uppercase transition-colors hover:text-white"
                        >
                          <span>{link.label}</span>
                          <span
                            aria-hidden
                            className="transition-transform duration-300 group-hover:translate-x-1.5"
                          >
                            →
                          </span>
                        </a>
                      </motion.li>
                    ),
                  )}
                </ul>
              </div>
            </CropFrame>
          </Reveal>
        </div>

        <div className="mt-16">
          <Marquee items={SKILLS.map((s) => s.name)} />
        </div>
      </section>

      <section className="spine-pad bg-accent py-14 text-center text-white">
        <div className="section-pad">
          <p className="display-smash text-[clamp(1.6rem,5vw,3rem)]">
            Always building the next thing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/work"
              className="text-sm font-semibold tracking-[0.14em] uppercase underline-offset-4 hover:underline"
            >
              Work
            </Link>
            <Link
              href="/music"
              className="text-sm font-semibold tracking-[0.14em] uppercase underline-offset-4 hover:underline"
            >
              Music
            </Link>
            <Link
              href="/path"
              className="text-sm font-semibold tracking-[0.14em] uppercase underline-offset-4 hover:underline"
            >
              Path
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
