'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import {
  CropFrame,
  DrawLine,
  Reveal,
  Stagger,
  StaggerItem,
  easeOut,
} from '@/components/portfolio-motion'
import { MegaTicker } from '@/components/mega-ticker'
import { PageHero } from '@/components/page-hero'
import { ScrollProgress } from '@/components/scroll-progress'
import {
  AWARDS,
  PUBLICATIONS,
  VOLUNTEERING,
  WORK_EXPERIENCE,
} from '../data'

export default function PathPage() {
  const techWork = WORK_EXPERIENCE.filter(
    (w) => w.company !== 'Institut Le Rosey',
  )
  const swimming = WORK_EXPERIENCE.find(
    (w) => w.company === 'Institut Le Rosey',
  )
  const reduce = useReducedMotion()

  return (
    <>
      <ScrollProgress />
      <PageHero
        label="Path"
        title="The"
        titleLine2="Path"
        description="Founding, competing, research, athletics — the long arc from classroom to podium."
        image="/alan/graduation.png"
        ticker={[
          'Founder',
          'USACO Gold',
          'HackHarvard',
          'HackMIT',
          'VEX Worlds',
          'Swimming',
          'Research',
        ]}
      />

      <section className="overflow-x-clip border-b border-line bg-bg-elevated py-16 md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <p className="text-xs tracking-[0.28em] text-accent uppercase">
              Experience
            </p>
            <h2 className="display-smash mt-4 max-w-3xl text-[clamp(2.4rem,7vw,4.5rem)] text-ink">
              Founding.
              <span className="mt-2 block text-accent">Building. Competing.</span>
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <DrawLine className="absolute top-2 bottom-2 left-[7px] hidden w-px md:block" />

            <div className="divide-y divide-line">
              {techWork.map((job, index) => (
                <Reveal key={job.id} delay={index * 0.04}>
                  <article className="group relative grid gap-4 py-12 md:grid-cols-12 md:gap-8">
                    <div className="absolute top-14 left-0 z-10 hidden md:block">
                      <motion.span
                        className="block h-4 w-4 rounded-full border-2 border-accent bg-bg-elevated"
                        initial={reduce ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1,
                          ease: easeOut,
                        }}
                      />
                    </div>

                    <div className="relative z-10 md:col-span-4 md:pl-10">
                      <h3 className="display-smash text-3xl text-accent normal-case md:text-4xl">
                        {job.company}
                      </h3>
                      <p className="mt-2 text-sm text-ink-soft">{job.title}</p>
                      <p className="mt-3 text-sm tracking-wide text-ink-faint uppercase">
                        {job.start} – {job.end}
                        {job.location ? ` · ${job.location}` : ''}
                      </p>
                      {job.link && (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block text-sm font-semibold tracking-[0.12em] text-accent uppercase hover:text-accent-deep"
                        >
                          Visit →
                        </a>
                      )}
                    </div>

                    <Stagger
                      className="relative z-10 space-y-3 md:col-span-8"
                      delay={0.06}
                      stagger={0.04}
                    >
                      {job.bullets?.map((bullet) => (
                        <StaggerItem key={bullet}>
                          <p className="relative border-l-2 border-accent/35 pl-4 text-base leading-relaxed text-ink-soft">
                            {bullet}
                          </p>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {swimming && (
            <Reveal className="mt-12">
              <CropFrame
                fill="mist"
                tone="accent"
                className="panel-bokeh overflow-hidden p-0"
              >
                <div className="grid md:grid-cols-12">
                  <div className="relative min-h-[220px] md:col-span-4 md:min-h-full">
                    <Image
                      src="/alan/swim-team.jpg"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-ink/35" />
                  </div>
                  <div className="p-6 md:col-span-8 md:p-10">
                    <p className="text-xs tracking-[0.28em] text-accent uppercase">
                      Athletics
                    </p>
                    <h3 className="display-smash mt-3 text-3xl text-ink normal-case md:text-5xl">
                      Competitive Swimming
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">
                      {swimming.title} · {swimming.start} – {swimming.end}
                      {swimming.location ? ` · ${swimming.location}` : ''}
                    </p>
                    <Stagger
                      className="mt-6 grid gap-3 sm:grid-cols-2"
                      stagger={0.05}
                    >
                      {swimming.bullets?.slice(0, 6).map((bullet) => (
                        <StaggerItem key={bullet}>
                          <p className="border-l-2 border-accent/40 pl-3 text-sm leading-relaxed text-ink-soft">
                            {bullet}
                          </p>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                </div>
              </CropFrame>
            </Reveal>
          )}
        </div>
      </section>

      <div className="border-y border-line bg-bg py-4">
        <MegaTicker
          items={['Podium', 'Gold', 'Worlds', 'Research', 'Impact']}
          tone="accent"
        />
      </div>

      <section className="overflow-x-clip bg-bg py-16 md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <p className="text-xs tracking-[0.28em] text-accent uppercase">
              Recognition
            </p>
            <h2 className="display-smash mt-4 max-w-3xl text-[clamp(2.4rem,7vw,4.5rem)] text-ink">
              Awards.
              <span className="mt-2 block text-accent">Research. Honors.</span>
            </h2>
          </Reveal>

          <div className="relative mt-12 grid min-w-0 gap-8 lg:grid-cols-12">
            <CropFrame
              fill="white"
              tone="accent"
              className="min-w-0 p-1 lg:col-span-7"
            >
              <ul>
                {AWARDS.map((award) => (
                  <li
                    key={award.id}
                    className="flex min-w-0 items-start gap-4 border-b border-line px-5 py-6 last:border-b-0 md:px-7"
                  >
                    {award.image && (
                      <div className="relative mt-0.5 h-12 w-12 shrink-0 overflow-hidden bg-panel-wash">
                        <Image
                          src={award.image}
                          alt=""
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-lg font-semibold break-words text-accent">
                          {award.title}
                        </h3>
                        {award.date && (
                          <span className="shrink-0 text-sm text-ink-faint">
                            {award.date}
                          </span>
                        )}
                      </div>
                      {award.description && (
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CropFrame>

            <div className="min-w-0 space-y-6 lg:col-span-5">
              <Reveal delay={0.08}>
                <CropFrame fill="ink" tone="white" className="p-7">
                  <h3 className="display-smash text-2xl text-white normal-case">
                    Publications
                  </h3>
                  <ul className="mt-5 space-y-5">
                    {PUBLICATIONS.map((pub) => (
                      <li key={pub.id}>
                        <p className="font-medium text-white">{pub.title}</p>
                        {pub.description && (
                          <p className="mt-1 text-sm leading-relaxed text-white/65">
                            {pub.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </CropFrame>
              </Reveal>
              <Reveal delay={0.12}>
                <CropFrame fill="lake" tone="accent" className="p-7">
                  <h3 className="display-smash text-2xl text-ink normal-case">
                    Volunteering
                  </h3>
                  <ul className="mt-5 space-y-5">
                    {VOLUNTEERING.map((v) => (
                      <li key={v.id}>
                        <p className="font-medium text-ink">
                          {v.role} · {v.organization}
                        </p>
                        <p className="mt-1 text-sm text-ink-faint">
                          {v.start} – {v.end}
                          {v.cause ? ` · ${v.cause}` : ''}
                        </p>
                        {v.description && (
                          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                            {v.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </CropFrame>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="spine-pad bg-accent py-16 text-center text-white md:py-20">
        <div className="section-pad">
          <p className="display-smash text-[clamp(2rem,6vw,4rem)]">
            Meet the person behind it
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center bg-white px-6 py-3.5 text-sm font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-mist"
          >
            About & connect →
          </Link>
        </div>
      </section>
    </>
  )
}
