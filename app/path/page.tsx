'use client'

import Image from 'next/image'
import Link from 'next/link'
import { DrawLine, Reveal } from '@/components/portfolio-motion'
import { PageHero } from '@/components/page-hero'
import { Projection } from '@/components/projection'
import { ScrollProgress } from '@/components/scroll-progress'
import { MedalBars } from '@/components/viz/medal-bars'
import { ScoreRing } from '@/components/viz/score-ring'
import { CpGraph } from '@/components/viz/cp-graph'
import { UsacoBoard } from '@/components/viz/usaco-board'
import { MathField } from '@/components/viz/math-field'
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
  const swim = WORK_EXPERIENCE.find((w) => w.company === 'Institut Le Rosey')

  return (
    <>
      <ScrollProgress />
      <PageHero
        kicker="Path"
        title="The competition record."
        description="Scores, timelines, awards, research, athletics, and service — everything measured."
        image="/media/vex/worlds-arena.jpeg"
        imagePosition="center 55%"
        video="/media/vex/driver.mp4"
      />

      {/* Measured */}
      <section className="relative overflow-hidden border-b border-line bg-bg py-16 md:py-20">
        <MathField />
        <div className="section-max section-pad relative">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Measured
            </p>
            <p className="mt-3 max-w-md text-sm text-ink-soft">
              Contest scores and athletic tally.
            </p>
          </Reveal>

          <Reveal className="mt-10" delay={0.05}>
            <UsacoBoard />
          </Reveal>

          <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
            <Reveal delay={0.08}>
              <ScoreRing
                value={117}
                max={120}
                label="TOEFL iBT"
                sublabel="Reading · Listening · Speaking · Writing"
              />
            </Reveal>
            <Reveal delay={0.12}>
              <MedalBars />
            </Reveal>
          </div>

          <Reveal className="mt-14" delay={0.08}>
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
              Graph search · BFS
            </p>
            <CpGraph className="mt-4 max-w-xl" />
          </Reveal>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="border-b border-line bg-bg-elevated py-16 md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Experience
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.9rem,4.5vw,2.9rem)] text-ink">
              Founding. Building. Competing.
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <DrawLine className="absolute top-2 bottom-2 left-[3px] hidden w-px opacity-40 md:block" />
            <div className="divide-y divide-line">
              {techWork.map((job) => (
                <Reveal key={job.id} y={20}>
                  <article className="relative grid gap-4 py-10 md:grid-cols-12 md:gap-8 md:pl-10">
                    <span
                      className="absolute top-12 left-0 hidden h-[7px] w-[7px] rounded-full bg-accent md:block"
                      aria-hidden
                    />
                    <div className="md:col-span-4">
                      <h3 className="display-quiet text-2xl text-ink">
                        {job.company}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-soft">{job.title}</p>
                      <p className="mt-1.5 font-mono text-[11px] text-ink-faint uppercase">
                        {job.start} – {job.end}
                      </p>
                      {job.link && (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block text-sm text-accent transition-opacity hover:opacity-70"
                        >
                          Visit →
                        </a>
                      )}
                    </div>
                    <ul className="space-y-2.5 md:col-span-8">
                      {job.bullets?.map((bullet) => (
                        <li
                          key={bullet}
                          className="border-l border-accent/40 pl-3 text-sm leading-relaxed text-ink-soft"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="border-b border-line bg-bg py-16 md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Recognition
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.9rem,4.5vw,2.9rem)] text-ink">
              Awards & honors.
            </h2>
          </Reveal>

          <Reveal className="mt-12">
            <ul className="divide-y divide-line border-y border-line">
              {AWARDS.map((award) => (
                <li key={award.id} className="flex gap-4 py-6">
                  {award.image && (
                    <div className="relative mt-0.5 h-11 w-11 shrink-0 overflow-hidden bg-panel-wash">
                      <Image
                        src={award.image}
                        alt=""
                        fill
                        className="object-contain p-1"
                        sizes="44px"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-medium text-ink">{award.title}</h3>
                      {award.date && (
                        <span className="font-mono text-[11px] text-ink-faint uppercase">
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
          </Reveal>
        </div>
      </section>

      {/* Research */}
      <section className="border-b border-white/10 bg-ink py-16 text-white md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-lake uppercase">
              Research
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.9rem,4.5vw,2.9rem)]">
              Published & forthcoming.
            </h2>
          </Reveal>

          <ul className="mt-12 border-t border-white/15">
            {PUBLICATIONS.map((pub, i) => (
              <Reveal key={pub.id} delay={i * 0.05} y={18}>
                <li className="grid gap-3 border-b border-white/15 py-7 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <p className="font-mono text-[11px] tracking-[0.12em] text-lake uppercase">
                      {pub.status}
                    </p>
                    <p className="mt-2 font-mono text-[11px] text-white/45">
                      {pub.date}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="display-quiet text-xl md:text-2xl">
                      {pub.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/65">{pub.authors}</p>
                    <p className="mt-1 text-sm text-white/45 italic">
                      {pub.venue}
                    </p>
                    {pub.presentation && (
                      <p className="mt-4 text-sm text-white/70">
                        <span className="font-mono text-[10px] tracking-[0.12em] text-lake uppercase">
                          Talk
                        </span>
                        <span className="mx-2 text-white/30">·</span>
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

      {/* Athletics */}
      <Projection
        id="athletics"
        src="/media/swim/reel.mp4"
        className="scroll-mt-24 border-b border-line py-20 md:py-28"
      >
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-lake uppercase">
              Athletics
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.9rem,4.5vw,2.9rem)] text-white">
              Every meet, every medal.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
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
              <p className="mt-4 font-mono text-[11px] tracking-[0.1em] text-white/55 uppercase">
                {swim?.title} · {swim?.start} – {swim?.end}
              </p>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
              <ul className="space-y-3">
                {swim?.bullets?.map((bullet) => (
                  <li
                    key={bullet}
                    className="border-l border-lake/50 pl-3 text-sm leading-relaxed text-white/75"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Projection>

      {/* Service */}
      <section id="service" className="scroll-mt-24 bg-bg py-16 md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Service
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.9rem,4.5vw,2.9rem)] text-ink">
              Code, violin, and concrete.
            </h2>
          </Reveal>

          <div className="mt-12 divide-y divide-line border-y border-line">
            {VOLUNTEERING.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.05} y={20}>
                <article className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                  {v.id === 'vol-casa' && v.image && (
                    <div className="relative min-h-[200px] overflow-hidden lg:col-span-5">
                      <Image
                        src={v.image}
                        alt="Volunteers at a housing construction site in Oradea, Romania"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  )}
                  <div
                    className={
                      v.id === 'vol-casa' ? 'lg:col-span-7' : 'lg:col-span-12'
                    }
                  >
                    <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                      {v.cause} · {v.start} – {v.end}
                    </p>
                    <h3 className="display-quiet mt-2.5 text-xl text-ink md:text-2xl">
                      {v.organization}
                    </h3>
                    <p className="mt-1 text-sm text-ink-faint">{v.role}</p>
                    {v.description && (
                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">
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
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg-elevated py-14">
        <div className="section-max section-pad flex flex-wrap items-end justify-between gap-6">
          <p className="display-quiet text-[clamp(1.4rem,3vw,2rem)] text-ink">
            Off the podium, onto the stage.
          </p>
          <Link
            href="/music"
            className="text-sm text-accent transition-opacity hover:opacity-70"
          >
            Open music →
          </Link>
        </div>
      </section>
    </>
  )
}
