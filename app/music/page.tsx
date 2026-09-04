'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/portfolio-motion'
import { MusicVisualizer } from '@/components/music-visualizer'
import { PageHero } from '@/components/page-hero'
import { ScrollProgress } from '@/components/scroll-progress'
import { MUSIC_RELEASES, NAME, STAGE_PHOTOS } from '../data'

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

      <section className="border-line bg-bg-elevated border-t py-16 md:py-24">
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
            <p className="text-accent font-mono text-[11px] tracking-[0.2em] uppercase">
              Background
            </p>
            <h2 className="display-quiet text-ink mt-3 text-[clamp(1.8rem,4vw,2.5rem)]">
              ABRSM Grade 8, twice over.
            </h2>
            <p className="text-ink-soft mt-4 text-sm leading-relaxed">
              Grade 8 in both violin and piano, with orchestra and solo stage
              performance — from concert halls to orphanages in Romania.
            </p>

            <ul className="divide-line border-line mt-8 divide-y border-y">
              {MUSIC_RELEASES.filter((r) => r.hyperfollow).map((r) => (
                <li key={r.id}>
                  <a
                    href={r.hyperfollow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-ink-soft hover:text-ink flex items-center justify-between py-3.5 text-sm transition-colors"
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
                    className="group text-ink-soft hover:text-ink flex items-center justify-between py-3.5 text-sm transition-colors"
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

      {/* Stage strip */}
      <section className="border-line bg-bg border-t py-10 md:py-14">
        <div className="section-max section-pad">
          <Reveal y={10}>
            <div className="section-head">
              <span className="idx">→</span>
              <h2 className="eyebrow">On stage</h2>
              <span className="count">
                {STAGE_PHOTOS.length} photos · orchestra, section, solo
              </span>
            </div>
          </Reveal>
          <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-6">
            {STAGE_PHOTOS.map((p, i) => (
              <Reveal
                key={p.src}
                delay={i * 0.04}
                y={12}
                className={
                  i === 0
                    ? 'col-span-2 row-span-2 md:col-span-3'
                    : i === 1
                      ? 'col-span-2 md:col-span-3'
                      : i === 4
                        ? 'col-span-2 md:col-span-1'
                        : 'md:col-span-1'
                }
              >
                <figure className="group bg-mist relative h-full min-h-[160px] overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes={
                      i < 2
                        ? '(max-width: 768px) 100vw, 50vw'
                        : '(max-width: 768px) 50vw, 33vw'
                    }
                  />
                  <figcaption className="pill pill-ink absolute bottom-2 left-2">
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-line bg-bg-elevated border-t py-10">
        <div className="section-max section-pad flex flex-wrap items-end justify-between gap-6">
          <p className="display-quiet text-ink text-[clamp(1.4rem,3vw,2rem)]">
            Back home.
          </p>
          <Link
            href="/"
            className="text-accent text-sm transition-opacity hover:opacity-70"
          >
            Home →
          </Link>
        </div>
      </section>
    </>
  )
}
