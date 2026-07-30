'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CropFrame, Reveal } from '@/components/portfolio-motion'
import { MegaTicker } from '@/components/mega-ticker'
import { MusicVisualizer } from '@/components/music-visualizer'
import { PageHero } from '@/components/page-hero'
import { ScrollProgress } from '@/components/scroll-progress'
import { DISTROKID_ARTIST, MUSIC_RELEASES, NAME } from '../data'

export default function MusicPage() {
  const streamLinks = MUSIC_RELEASES.flatMap((r) =>
    r.links.map((l) => ({ ...l, release: r.title })),
  )

  return (
    <>
      <ScrollProgress />
      <PageHero
        label="Music"
        title="Off"
        titleLine2="Stage"
        description={`Releases as ${NAME} on DistroKid (${DISTROKID_ARTIST}) — local previews with a live visualizer.`}
        image="/alan/orchestra-hall.jpg"
        ticker={[
          "I'd Stay",
          'Dreams of the Blue',
          'Violin',
          'Piano',
          'DistroKid',
          'HyperFollow',
        ]}
      />

      <section className="overflow-x-clip bg-bg py-10 md:py-16">
        <div className="section-max section-pad">
          <Reveal>
            <MusicVisualizer tracks={MUSIC_RELEASES} />
          </Reveal>

          <div className="mt-16 grid gap-0 overflow-hidden border border-line lg:grid-cols-12">
            <Reveal className="relative min-h-[340px] lg:col-span-7 lg:min-h-[480px]">
              <Image
                src="/alan/orchestra-ensemble.jpg"
                alt="Alan Shen with orchestra ensemble"
                fill
                className="object-cover object-[center_35%]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-5 border border-white/25" />
            </Reveal>

            <Reveal className="bg-ink p-8 text-white md:p-10 lg:col-span-5" delay={0.08}>
              <p className="text-xs tracking-[0.28em] text-lake uppercase">
                DistroKid
              </p>
              <h3 className="display-smash mt-4 text-4xl text-white normal-case md:text-5xl">
                {DISTROKID_ARTIST}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                Stream beyond this page — HyperFollow routes every major store.
              </p>

              <ul className="mt-8 space-y-1 border-t border-white/15 pt-6">
                {MUSIC_RELEASES.filter((r) => r.hyperfollow).map((r) => (
                  <li key={r.id}>
                    <a
                      href={r.hyperfollow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-3 text-sm text-white/75 transition-colors hover:text-white"
                    >
                      <span>{r.title} · HyperFollow</span>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
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
                      className="group flex items-center justify-between py-3 text-sm text-white/75 transition-colors hover:text-white"
                    >
                      <span>
                        {link.label}
                        <span className="text-white/35"> · {link.release}</span>
                      </span>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="spine-pad bg-accent py-4">
        <MegaTicker
          items={['Play it loud', 'Write it honest', 'Ship the song']}
          tone="white"
        />
      </div>

      <section className="spine-pad bg-ink py-16 text-center text-white md:py-20">
        <div className="section-pad">
          <p className="display-smash text-[clamp(2rem,6vw,4rem)]">
            Still curious? <span className="text-accent">Path</span>
          </p>
          <Link
            href="/path"
            className="mt-8 inline-flex items-center bg-white px-6 py-3.5 text-sm font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-mist"
          >
            Open path →
          </Link>
        </div>
      </section>
    </>
  )
}
