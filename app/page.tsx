import Link from 'next/link'
import {
  BigRow,
  Block,
  Drift,
  Fade,
  Line,
  Rise,
  SmartLink,
  Words,
} from '@/components/beats'
import { Masonry, type Tile } from '@/components/masonry'
import { Media } from '@/components/media'
import {
  AWARDS,
  EMAIL,
  HOME_BIO,
  LINES,
  MUSIC_RELEASES,
  PROJECTS,
  SOCIAL_LINKS,
} from './data'

const SELECTED: { id: string; year: string }[] = [
  { id: 'project1', year: '2023 —' },
  { id: 'project2', year: '2025' },
  { id: 'project-notate', year: '2026' },
  { id: 'project-foundry', year: '2026' },
  { id: 'project-nomad', year: '2026' },
]

const WORK_PHOTOS = [
  {
    src: '/media/projects/studious/home.jpg',
    alt: 'Studious teacher home screen',
    caption: 'Studious, a teacher’s home',
    position: 'top left',
  },
  {
    src: '/media/hackathons/hackharvard-china.jpg',
    alt: 'Presenting Scribe on stage at HackHarvard China',
    caption: 'Scribe, on stage at HackHarvard China',
  },
  {
    src: '/media/hackathons/hackmit-workspace.jpg',
    alt: 'Laptops and hardware on the HackMIT China workspace',
    caption: 'the Nomad table, HackMIT China',
  },
]

const MOMENTS = [
  {
    src: '/media/hackathons/hackharvard-win.jpg',
    alt: 'Alan holding a certificate in front of the HackHarvard backdrop',
    caption: 'HackHarvard China, 2025',
    place: 'md:col-span-7',
    ratio: 'aspect-[3/2]',
  },
  {
    src: '/media/portrait/award-ceremony.png',
    alt: 'Alan walking back from the stage at a school prize-giving',
    caption: 'prize-giving',
    place: 'md:col-span-5',
    ratio: 'aspect-[3/2] md:aspect-auto md:h-full',
  },
  {
    src: '/media/service/romania-housing.png',
    alt: 'Volunteers at a housing construction site in Oradea, Romania',
    caption: 'building houses in Oradea, Romania, 2025',
    place: 'md:col-span-12',
    ratio: 'aspect-[16/9] md:aspect-[21/8]',
  },
]

const MASONRY: Tile[][] = [
  [
    {
      src: '/media/loops/driver.jpg',
      video: '/media/vex/driver.mp4',
      alt: 'The VEX robot driving across the field',
      caption: 'driver control, VEX team 15520X',
      ratio: 'aspect-[16/10]',
    },
    {
      src: '/media/swim/team.jpg',
      alt: 'The Le Rosey swim team on deck',
      caption: 'the Le Rosey swim team',
      ratio: 'aspect-[1290/941]',
    },
    {
      src: '/media/swim/lake-medals.webp',
      alt: 'The team with medals after the lake relay',
      caption: 'after the lake relay',
      ratio: 'aspect-[4/3]',
      grow: true,
    },
  ],
  [
    {
      src: '/media/loops/reel.jpg',
      video: '/media/swim/reel.mp4',
      alt: 'Racing at a swim meet',
      caption: 'race footage, Le Rosey',
      ratio: 'aspect-[4/5]',
    },
    {
      src: '/media/vex/worlds-arena.jpeg',
      alt: 'The arena at the VEX Robotics World Championship',
      caption: 'the World Championship arena, Dallas',
      ratio: 'aspect-[4/3]',
      grow: true,
    },
  ],
  [
    {
      src: '/media/vex/team.png',
      alt: 'VEX team 15520X with their robot',
      caption: 'team 15520X',
      ratio: 'aspect-square',
    },
    {
      src: '/media/vex/worlds-team.jpeg',
      alt: 'The team at the VEX World Championship',
      caption: 'at Worlds',
      ratio: 'aspect-[16/9]',
    },
    {
      src: '/media/swim/medals-rooftop.png',
      alt: 'The swim team with their medals on a rooftop',
      caption: 'medals, on the roof',
      ratio: 'aspect-[4/3]',
    },
  ],
]

const FACTS = [
  ['school', 'Institut Le Rosey, Rolle'],
  ['programme', 'IB diploma, class of 2027'],
  ['summer 2026', 'Penn ESAP — AI and its mathematics'],
  ['languages', 'TypeScript, C++, Python'],
]

export default function Home() {
  return (
    <div className="bg-bg text-ink">
      {/* cover */}
      <section className="section-max section-pad flex min-h-[100svh] flex-col justify-end pt-28 pb-10 md:pb-14">
        <div className="mb-8 grid gap-6 md:mb-12 md:grid-cols-12">
          <Fade delay={0.5} className="md:col-span-5">
            <p className="text-ink text-[clamp(1.125rem,1.5vw,1.375rem)] leading-snug">
              Builds education software, competes in programming and robotics,
              writes research on AI, and plays the violin.
            </p>
          </Fade>
          <Fade
            delay={0.6}
            className="label md:col-span-3 md:col-start-10 md:text-right"
          >
            <p>Institut Le Rosey</p>
            <p>class of 2027</p>
          </Fade>
        </div>
        <h1 className="sr-only">Alan Shen</h1>
        <div aria-hidden>
          <Rise now delay={0.05}>
            <span className="display -ml-[0.04em] block text-[clamp(4rem,26vw,26rem)] leading-[0.8] whitespace-nowrap">
              Alan Shen
            </span>
          </Rise>
        </div>
      </section>

      {/* statement */}
      <section className="section-max section-pad py-28 md:py-44">
        <Words
          text={LINES.code}
          className="display-soft max-w-[22ch] text-[clamp(2.25rem,5.6vw,5.75rem)]"
        />
      </section>

      {/* robotics and swimming, as a masonry */}
      <section className="section-max section-pad pb-12 md:pb-20">
        <Masonry columns={MASONRY} />
      </section>

      <Block
        id="work"
        label="selected work"
        aside={
          <Link href="/work" className="hover:text-ink transition-colors">
            all work →
          </Link>
        }
      >
        {SELECTED.map(({ id, year }) => {
          const p = PROJECTS.find((x) => x.id === id)!
          return (
            <BigRow
              key={id}
              title={p.name}
              detail={p.description}
              meta={year}
              href={`/work#${id}`}
            />
          )
        })}
        <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-3">
          {WORK_PHOTOS.map((ph, i) => (
            <Fade key={ph.src} delay={i * 0.06}>
              <Media
                src={ph.src}
                alt={ph.alt}
                caption={ph.caption}
                position={ph.position}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </Fade>
          ))}
        </div>
      </Block>

      <Drift
        text="build — compete — research — play —"
        className="py-6 md:py-10"
      />

      {/* music */}
      <Block
        id="music"
        label="music"
        aside={
          <Link href="/music" className="hover:text-ink transition-colors">
            listen →
          </Link>
        }
      >
        <Fade className="border-line border-t pt-8 md:pt-10">
          <p className="display-soft max-w-[24ch] text-[clamp(2rem,4.4vw,4.5rem)]">
            Violin and piano. Orchestra and solo stage. Two singles of his own.
          </p>
        </Fade>
        <Media
          className="mt-12 md:mt-16"
          src="/media/site/banner.jpg"
          alt="Alan Shen performing violin on stage"
          ratio="aspect-[4/5] md:aspect-[21/9]"
          position="35% center"
          travel={0.16}
          sizes="100vw"
        />
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[
            [
              '/media/music/violin-performance.png',
              'Alan playing violin on a dark stage',
              'solo',
            ],
            [
              '/media/music/orchestra-ensemble.jpg',
              'Alan with the orchestra ensemble',
              'orchestra',
            ],
            [
              '/media/music/violin-group.png',
              'The violin section in performance',
              'the violin section',
            ],
          ].map(([src, alt, caption]) => (
            <Media
              key={src}
              src={src}
              alt={alt}
              caption={caption}
              ratio="aspect-[4/3]"
              sizes="33vw"
            />
          ))}
        </div>
        <div className="mt-10 md:mt-14">
          {MUSIC_RELEASES.map((r) => (
            <BigRow
              key={r.id}
              title={r.title}
              detail={`${r.type} · ${r.artist}`}
              meta="listen"
              href={r.hyperfollow ?? '/music'}
            />
          ))}
        </div>
      </Block>

      {/* moments */}
      <Block id="moments" label="moments">
        <div className="border-line grid gap-3 border-t pt-8 md:grid-cols-12 md:pt-10">
          {MOMENTS.map((m, i) => (
            <Fade key={m.src} className={m.place} delay={(i % 2) * 0.08}>
              <Media
                src={m.src}
                alt={m.alt}
                caption={m.caption}
                ratio={m.ratio}
                className="flex h-full flex-col [&>div]:flex-1"
              />
            </Fade>
          ))}
        </div>
      </Block>

      {/* about */}
      <Block id="about" label="about">
        <div className="border-line grid gap-12 border-t pt-8 md:grid-cols-12 md:gap-8 md:pt-10">
          <Fade className="md:col-span-7">
            <p className="display-soft text-[clamp(1.4rem,2.2vw,2.1rem)] leading-[1.18]">
              {HOME_BIO}
            </p>
          </Fade>
          <Fade className="md:col-span-4 md:col-start-9" delay={0.1}>
            <dl>
              {FACTS.map(([k, v]) => (
                <div
                  key={k}
                  className="border-line border-t py-3 first:border-t-0 first:pt-0"
                >
                  <dt className="label">{k}</dt>
                  <dd className="text-ink mt-0.5 text-[16px]">{v}</dd>
                </div>
              ))}
            </dl>
          </Fade>
        </div>
      </Block>

      <Block
        id="record"
        label="honours"
        aside={
          <Link href="/path" className="hover:text-ink transition-colors">
            full record →
          </Link>
        }
        className="pt-0 md:pt-0"
      >
        {AWARDS.map((a) => (
          <Line
            key={a.id}
            date={a.date}
            title={a.title}
            detail={a.description}
          />
        ))}
      </Block>

      {/* contact */}
      <section
        id="contact"
        className="section-max section-pad scroll-mt-16 pt-16 pb-24 md:pt-24 md:pb-32"
      >
        <h2 className="display-soft text-ink mb-6 text-[clamp(1.75rem,2.6vw,2.5rem)]">
          contact
        </h2>
        <a href={`mailto:${EMAIL}`} className="group block">
          <Rise>
            <span className="display group-hover:text-accent block text-[clamp(3.5rem,13vw,14rem)] transition-colors">
              Say hello.
            </span>
          </Rise>
          <span className="text-ink-soft group-hover:text-ink mt-6 block text-[clamp(1.125rem,2vw,1.75rem)] break-all transition-colors">
            {EMAIL}
          </span>
        </a>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {SOCIAL_LINKS.filter((l) => l.label !== 'email').map((l) => (
            <SmartLink
              key={l.label}
              href={l.link}
              className="text-ink-soft hover:text-ink transition-colors"
            >
              {l.label}
            </SmartLink>
          ))}
        </div>
      </section>
    </div>
  )
}
