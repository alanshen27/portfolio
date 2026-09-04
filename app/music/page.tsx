'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/portfolio-motion'
import { MusicVisualizer } from '@/components/music-visualizer'
import { Movement, PageTitle, ProgrammeRow } from '@/components/programme'
import { ScrollProgress } from '@/components/scroll-progress'
import { PlateInterlude } from '@/components/interlude'
import { MUSIC_RELEASES, STAGE_PHOTOS } from '../data'

export default function MusicPage() {
  const streamLinks = MUSIC_RELEASES.flatMap((r) =>
    r.links.map((l) => ({ ...l, release: r.title })),
  )

  return (
    <>
      <ScrollProgress />
      <PageTitle
        kicker="iv · music"
        title="interval"
        standfirst="ABRSM grade 8 on violin and piano; orchestra and solo stage; two singles released under his own name."
        contents={[
          { label: 'listen', href: '#listen' },
          { label: 'releases', href: '#releases' },
          { label: 'on stage', href: '#stage' },
        ]}
      />

      {/* I. Listen */}
      <section id="listen" className="scroll-mt-24 py-12 md:py-16">
        <div className="section-max section-pad">
          <Reveal>
            <MusicVisualizer tracks={MUSIC_RELEASES} />
          </Reveal>
        </div>
      </section>

      {/* beat — plate */}
      <PlateInterlude
        src="/media/music/violin-performance.png"
        alt="Alan Shen performing on violin"
        caption="solo, on stage."
        credit="ii · releases, below"
        position="center 30%"
      />

      {/* II. Releases */}
      <section
        id="releases"
        className="bg-bg-elevated scroll-mt-24 py-12 md:py-16"
      >
        <div className="section-max section-pad grid gap-10 md:grid-cols-12 md:items-start">
          <Reveal className="md:col-span-5" y={12}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/media/music/orchestra-ensemble.jpg"
                alt="Alan Shen performing with orchestra ensemble"
                fill
                className="object-cover object-[center_35%]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <p className="note-text drop-cap mt-5">
              grade 8 in both violin and piano, with orchestra and solo stage
              performance — from concert halls to orphanages in Romania, where
              he prepared and performed for the Liceul de Arte Oradea and wrote
              a song for more than sixty students.
            </p>
          </Reveal>
          <div className="md:col-span-7">
            <Movement n={2} title="releases" align="left" />
            <Reveal y={12}>
              <ol className="ledger border-line mt-2 border-b">
                {MUSIC_RELEASES.map((r, i) => (
                  <li key={r.id} className="flex items-center gap-4 py-3.5">
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden">
                      <Image
                        src={r.cover}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <ProgrammeRow
                        n={i + 1}
                        title={r.title}
                        subtitle={`${r.type} · ${r.artist}`}
                        right={r.hyperfollow ? 'every store' : ''}
                        href={r.hyperfollow}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal className="mt-6" y={12} delay={0.04}>
              <p className="eyebrow">stores</p>
              <ol className="ledger border-line mt-2 border-y">
                {streamLinks.map((l) => (
                  <li key={`${l.release}-${l.label}`}>
                    <ProgrammeRow
                      title={l.label}
                      right={l.release}
                      href={l.href}
                    />
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* III. On stage */}
      <section
        id="stage"
        className="border-line scroll-mt-24 border-t py-14 md:py-20"
      >
        <div className="section-max section-pad">
          <Movement
            n={3}
            title="on stage"
            standfirst="orchestra, section and solo — five photographs."
          />
          <ul className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-6">
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
                <figure className="group relative h-full min-h-[160px] overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes={
                      i < 2
                        ? '(max-width: 768px) 100vw, 50vw'
                        : '(max-width: 768px) 50vw, 17vw'
                    }
                  />
                  <figcaption className="text-ink absolute bottom-2 left-2 bg-[color-mix(in_oklab,var(--color-bg-elevated)_92%,transparent)] px-2 py-0.5 text-[13px]">
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-line bg-bg-elevated border-t py-10">
        <div className="section-max section-pad flex flex-wrap items-baseline justify-between gap-4">
          <p className="display-quiet text-ink text-[clamp(1.2rem,2.4vw,1.6rem)]">
            back to the programme.
          </p>
          <Link href="/" className="row-link text-sm">
            i · programme →
          </Link>
        </div>
      </section>
    </>
  )
}
