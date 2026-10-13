import Image from 'next/image'
import {
  Block,
  Drift,
  Fade,
  Next,
  PageHead,
  Rise,
  SmartLink,
  Words,
} from '@/components/beats'
import { Masonry, type Tile } from '@/components/masonry'
import { Media } from '@/components/media'
import { MusicVisualizer } from '@/components/music-visualizer'
import { MUSIC_RELEASES } from '../data'

const STAGE: Tile[][] = [
  [
    {
      src: '/media/music/violin-portrait.jpg',
      alt: 'Alan playing violin on stage, close-up',
      caption: 'solo, close',
      ratio: 'aspect-square',
    },
    {
      src: '/media/music/orchestra-hall.jpg',
      alt: 'The orchestra rehearsing in a concert hall',
      caption: 'rehearsal, in the hall',
      ratio: 'aspect-[3/2]',
    },
  ],
  [
    {
      src: '/media/site/banner.jpg',
      alt: 'Wide shot of Alan performing violin on a lit stage',
      caption: 'solo, stage',
      ratio: 'aspect-[4/3]',
      position: '35% center',
    },
    {
      src: '/media/music/violin-stage.png',
      alt: 'Alan performing violin in a dark hall',
      caption: 'recital',
      ratio: 'aspect-[16/9]',
      grow: true,
    },
  ],
  [
    {
      src: '/media/music/violin-performance.png',
      alt: 'Alan playing violin on a dark stage',
      caption: 'at the stand',
      ratio: 'aspect-[16/9]',
      position: '40% center',
    },
    {
      src: '/media/music/violin-group.png',
      alt: 'The violin section in performance',
      caption: 'the violin section',
      ratio: 'aspect-[16/9]',
    },
    {
      src: '/media/music/orchestra.png',
      alt: 'Alan playing in an orchestra violin section',
      caption: 'orchestra',
      ratio: 'aspect-[16/9]',
      grow: true,
    },
  ],
]

export default function MusicPage() {
  return (
    <>
      <PageHead
        title="Music"
        standfirst="ABRSM grade 8 on violin and piano; orchestra and solo stage; two singles released under his own name."
        contents={[
          { label: 'releases', href: '#releases' },
          { label: 'listen', href: '#listen' },
          { label: 'on stage', href: '#stage' },
        ]}
      />

      <Block id="releases" label="releases">
        {MUSIC_RELEASES.map((r, i) => (
          <div
            key={r.id}
            className="border-line grid items-end gap-6 border-t py-8 md:grid-cols-12 md:gap-8 md:py-10"
          >
            <Fade className="w-40 md:col-span-3 md:w-auto">
              <div className="bg-mist relative aspect-square max-w-[15rem] overflow-hidden">
                <Image
                  src={r.cover}
                  alt={`${r.title} cover`}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            </Fade>
            <div className="md:col-span-9">
              <p className="label">
                {String(i + 1).padStart(2, '0')} · {r.type} · {r.artist}
              </p>
              <Rise className="mt-2">
                <span className="display block text-[clamp(3rem,9vw,9rem)]">
                  {r.title}
                </span>
              </Rise>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
                {r.hyperfollow && (
                  <SmartLink
                    href={r.hyperfollow}
                    className="text-ink hover-line"
                  >
                    every store →
                  </SmartLink>
                )}
                {r.links.map((l) => (
                  <SmartLink
                    key={l.href}
                    href={l.href}
                    className="text-ink-soft hover:text-ink transition-colors"
                  >
                    {l.label}
                  </SmartLink>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Block>

      <section
        id="listen"
        className="section-max section-pad scroll-mt-16 pb-16 md:pb-24"
      >
        <Fade>
          <MusicVisualizer tracks={MUSIC_RELEASES} />
        </Fade>
      </section>

      <Media
        src="/media/music/orchestra-ensemble.jpg"
        alt="Alan with the orchestra ensemble"
        ratio="h-[70vh] min-h-[360px]"
        position="center 35%"
        travel={0.18}
        sizes="100vw"
      />

      <Drift
        text="violin — piano — orchestra — songs —"
        className="py-10 md:py-16"
      />

      <section className="section-max section-pad py-16 md:py-28">
        <Words
          text="From concert halls to orphanages in Oradea, Romania, where he wrote and performed a song for more than sixty students."
          className="display-soft max-w-[24ch] text-[clamp(2rem,4.8vw,4.75rem)]"
        />
      </section>

      <Block id="stage" label="on stage">
        <div className="border-line border-t pt-8 md:pt-10">
          <Masonry columns={STAGE} />
        </div>
      </Block>

      <Next href="/" label="Home" />
    </>
  )
}
