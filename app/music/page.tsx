'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/portfolio-motion'
import { MusicVisualizer } from '@/components/music-visualizer'
import { PageHero } from '@/components/page-hero'
import { ScrollProgress } from '@/components/scroll-progress'
import { MUSIC_RELEASES, NAME } from '../data'

export default function MusicPage() {
  const streamLinks = MUSIC_RELEASES.flatMap((r) =>
    r.links.map((l) => ({ ...l, release: r.title })),
  )

  return (
    <>
      <ScrollProgress />
      <PageHero
        kicker="Music"
        title="Stage & releases."
        description={`Singles released as ${NAME} — play them here, or stream on any store.`}
        image="/media/music/orchestra-hall.jpg"
        imagePosition="center 40%"
      />

      <section className="bg-bg py-14 md:py-20">
        <div className="section-max section-pad">
          <Reveal>
            <MusicVisualizer tracks={MUSIC_RELEASES} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-bg-elevated py-16 md:py-24">
        <div className="section-max section-pad grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="relative aspect-[4/3] overflow-hidden lg:col-span-6">
            <Image
              src="/media/music/orchestra-ensemble.jpg"
              alt="Alan Shen performing with orchestra ensemble"
              fill
              className="object-cover object-[center_35%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Background
            </p>
            <h2 className="display-quiet mt-3 text-[clamp(1.8rem,4vw,2.5rem)] text-ink">
              ABRSM Grade 8, twice over.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Grade 8 in both violin and piano, with orchestra and solo stage
              performance — from concert halls to orphanages in Romania.
            </p>

            <ul className="mt-8 divide-y divide-line border-y border-line">
              {MUSIC_RELEASES.filter((r) => r.hyperfollow).map((r) => (
                <li key={r.id}>
                  <a
                    href={r.hyperfollow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    <span>{r.title} — every store</span>
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
              {streamLinks.map((link) => (
                <li key={`${link.release}-${link.label}`}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    <span>
                      {link.label}
                      <span className="text-ink-faint"> · {link.release}</span>
                    </span>
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-bg py-14">
        <div className="section-max section-pad flex flex-wrap items-end justify-between gap-6">
          <p className="display-quiet text-[clamp(1.4rem,3vw,2rem)] text-ink">
            Back home.
          </p>
          <Link
            href="/"
            className="text-sm text-accent transition-opacity hover:opacity-70"
          >
            Home →
          </Link>
        </div>
      </section>
    </>
  )
}
