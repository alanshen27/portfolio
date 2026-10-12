import Image from 'next/image'
import { BigRow, Block, Fade, Line, Next, PageHead } from '@/components/beats'
import { MusicVisualizer } from '@/components/music-visualizer'
import { ParallaxPlane } from '@/components/parallax'
import { MUSIC_RELEASES, STAGE_PHOTOS } from '../data'

export default function MusicPage() {
  const streamLinks = MUSIC_RELEASES.flatMap((r) =>
    r.links.map((l) => ({ ...l, release: r.title })),
  )

  return (
    <>
      <PageHead
        title="Music"
        standfirst="ABRSM grade 8 on violin and piano; orchestra and solo stage; two singles released under his own name."
        contents={[
          { label: 'listen', href: '#listen' },
          { label: 'releases', href: '#releases' },
          { label: 'on stage', href: '#stage' },
        ]}
      />

      <section
        id="listen"
        className="section-max section-pad scroll-mt-16 pb-16 md:pb-24"
      >
        <Fade>
          <MusicVisualizer tracks={MUSIC_RELEASES} />
        </Fade>
      </section>

      <Block id="releases" label="releases">
        {MUSIC_RELEASES.map((r) => (
          <BigRow
            key={r.id}
            title={r.title}
            detail={`${r.type} · ${r.artist}`}
            meta="every store"
            href={r.hyperfollow}
          />
        ))}
        {streamLinks.length > 0 && (
          <div className="mt-12">
            <h3 className="text-ink mb-4 text-[20px] font-medium">stores</h3>
            {streamLinks.map((l) => (
              <Line
                key={`${l.release}-${l.label}`}
                title={l.label}
                right={l.release}
                href={l.href}
              />
            ))}
          </div>
        )}
      </Block>

      <section className="relative h-[70vh] min-h-[360px] overflow-hidden">
        <ParallaxPlane travel={0.18}>
          <Image
            src="/media/music/orchestra-ensemble.jpg"
            alt="Alan Shen performing with orchestra ensemble"
            fill
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        </ParallaxPlane>
      </section>

      <Block id="stage" label="on stage">
        <Fade className="border-line border-t pt-8 md:pt-10">
          <p className="display-soft max-w-[26ch] text-[clamp(1.8rem,4vw,4rem)]">
            From concert halls to orphanages in Oradea, Romania, where he wrote
            and performed a song for more than sixty students.
          </p>
        </Fade>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-6">
          {STAGE_PHOTOS.map((p, i) => (
            <li
              key={p.src}
              className={
                i < 2 ? 'col-span-2 md:col-span-3' : 'col-span-1 md:col-span-2'
              }
            >
              <Fade delay={i * 0.04}>
                <figure>
                  <div
                    className={`bg-mist relative overflow-hidden ${i < 2 ? 'aspect-[4/3]' : 'aspect-square'}`}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      className="object-cover"
                      sizes={
                        i < 2
                          ? '(max-width: 768px) 100vw, 50vw'
                          : '(max-width: 768px) 50vw, 33vw'
                      }
                    />
                  </div>
                  <figcaption className="label mt-2">{p.caption}</figcaption>
                </figure>
              </Fade>
            </li>
          ))}
        </ul>
      </Block>

      <Next href="/" label="Home" />
    </>
  )
}
