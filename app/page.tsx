'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'
import { Magnetic } from '@/components/ui/magnetic'
import { MegaTicker } from '@/components/mega-ticker'
import { NowPlaying } from '@/components/now-playing'
import { WorldPanel } from '@/components/world-panel'
import {
  AnimatedCorners,
  Reveal,
  ScrollCue,
  SplitChars,
  easeOut,
  easeSnap,
} from '@/components/portfolio-motion'
import { ScrollProgress } from '@/components/scroll-progress'
import {
  EMAIL,
  MUSIC_RELEASES,
  TAGLINE,
} from './data'

const FEATURED = MUSIC_RELEASES[0]

const WHO_MOSAIC = [
  { src: '/alan/orchestra.png', pos: '70% 28%', className: 'md:col-span-2 md:row-span-2' },
  { src: '/alan/graduation.png', pos: 'center 18%', className: '' },
  { src: '/alan/hackmit.jpg', pos: 'center 45%', className: '' },
  { src: '/alan/medals-rooftop.png', pos: 'center 30%', className: 'md:col-span-2' },
]

export default function Home() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const whoRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const { scrollYProgress: whoProgress } = useScroll({
    target: whoRef,
    offset: ['start end', 'end start'],
  })
  const mosaicA = useTransform(whoProgress, [0, 1], ['10%', '-12%'])
  const mosaicB = useTransform(whoProgress, [0, 1], ['-8%', '14%'])

  return (
    <>
      <ScrollProgress />

      <section
        ref={ref}
        className="noise-overlay relative min-h-[100svh] overflow-hidden bg-ink"
      >
        <motion.div
          className="absolute inset-0 scale-[1.15]"
          style={reduce ? undefined : { y: imageY }}
        >
          <Image
            src="/alan/orchestra.png"
            alt="Alan Shen playing violin in orchestra"
            fill
            priority
            className="object-cover object-[72%_28%]"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/35" />

        <div className="pointer-events-none absolute inset-5 border border-white/20 md:inset-8 md:left-[calc(4rem+1.5rem)] lg:left-[calc(4.5rem+1.5rem)]" />
        <AnimatedCorners tone="accent" inset="1.25rem" />
        <ScrollCue />

        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-20 sm:px-8 md:pb-12 md:pl-24 lg:pl-28"
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="display-smash text-white">
                <span className="block overflow-hidden">
                  <SplitChars
                    text="Alan"
                    delay={0.1}
                    className="whitespace-nowrap text-[clamp(2.8rem,14vw,6.5rem)]"
                  />
                </span>
                <span className="mt-0.5 block overflow-hidden">
                  <SplitChars
                    text="Shen"
                    delay={0.26}
                    className="whitespace-nowrap text-[clamp(2.8rem,14vw,6.5rem)]"
                  />
                </span>
              </h1>

              <motion.p
                className="mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.5, ease: easeSnap }}
              >
                {TAGLINE}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: easeOut }}
              >
                <Magnetic intensity={0.28} range={90}>
                  <Link
                    href="/work"
                    className="inline-flex items-center bg-accent px-5 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-accent-deep"
                  >
                    Work
                  </Link>
                </Magnetic>
                <Magnetic intensity={0.22} range={90}>
                  <Link
                    href="/music"
                    className="inline-flex items-center border border-white/45 px-5 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-white/10"
                  >
                    Music
                  </Link>
                </Magnetic>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              {FEATURED?.audio && <NowPlaying track={FEATURED} />}
            </div>
          </div>
        </motion.div>
      </section>

      <div className="border-y border-line bg-bg py-2 md:pl-16 lg:pl-[4.5rem]">
        <MegaTicker
          speed={16}
          items={[
            'Alan Shen',
            'Studious',
            'Scribe',
            'USACO',
            'VEX',
            'Violin',
            'HackHarvard',
            'Le Rosey',
          ]}
        />
      </div>

      {/* Mosaic who — images woven through, facts not paragraphs */}
      <section
        ref={whoRef}
        className="overflow-x-clip border-b border-line bg-bg md:pl-16 lg:pl-[4.5rem]"
      >
        <div className="grid md:grid-cols-12">
          <div className="relative grid grid-cols-2 gap-0 md:col-span-7 md:grid-cols-4 md:grid-rows-2">
            {WHO_MOSAIC.map((shot, i) => (
              <motion.div
                key={shot.src}
                className={`relative min-h-[160px] overflow-hidden sm:min-h-[200px] ${shot.className}`}
                style={
                  reduce
                    ? undefined
                    : { y: i % 2 === 0 ? mosaicA : mosaicB }
                }
              >
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: shot.pos }}
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
              </motion.div>
            ))}
          </div>

          <Reveal className="flex flex-col justify-center px-5 py-12 sm:px-8 md:col-span-5 md:px-8 lg:px-10">
            <p className="text-[10px] tracking-[0.28em] text-accent uppercase">
              About
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.2vw,2.4rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-ink uppercase">
              Student at Le Rosey.
              <span className="mt-1 block text-accent">Builder everywhere else.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
              I build education products, compete in CS and robotics, swim for
              the school, and play violin and piano — same person across all of
              it.
            </p>
            <ul className="mt-6 space-y-3 border-t border-line pt-5">
              {[
                { k: 'Founded', v: 'Studious LMS' },
                { k: 'Co-built', v: 'Scribe' },
                { k: 'Podium', v: '3× hackathon' },
                { k: 'Athletic', v: 'Competitive swim' },
                { k: 'Research', v: 'Cambridge UP ’26' },
              ].map((row) => (
                <li key={row.k} className="flex gap-4 text-sm">
                  <span className="w-20 text-[10px] tracking-[0.14em] text-ink-faint uppercase">
                    {row.k}
                  </span>
                  <span className="font-medium text-ink">{row.v}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 text-xs font-semibold tracking-[0.14em] text-accent uppercase hover:text-accent-deep"
            >
              Full bio →
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="border-b border-line bg-bg px-5 py-10 sm:px-8 md:pl-24 lg:pl-28">
        <Reveal>
          <p className="text-[10px] tracking-[0.28em] text-accent uppercase">
            Explore
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.03em] text-ink uppercase">
            Three worlds.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft md:text-base">
            Products I ship, music I release, and the path that connects
            classrooms to podiums.
          </p>
        </Reveal>
      </div>

      <WorldPanel
        href="/work"
        index="01"
        title="Build"
        lede="Education products and hackathon builds — Studious for schools, Scribe and Nomad from the floor."
        image="/alan/hackmit.jpg"
        imagePosition="center 45%"
        facts={[
          { label: 'Studious', value: 'Modern LMS' },
          { label: 'Scribe', value: 'HackHarvard 1st' },
          { label: 'Nomad', value: 'HackMIT 3rd' },
          { label: 'Stack', value: 'Next · tRPC · AI' },
        ]}
        previews={[
          { src: '/alan/hackharvard-win.jpg', position: 'center 30%' },
          { src: '/hackharvardchina.JPG', position: 'center 25%' },
          { src: '/alan/vex-team.png', position: 'center 30%' },
        ]}
        cta="See projects"
      />

      <WorldPanel
        href="/music"
        index="02"
        title="Stage"
        invert
        flip
        lede="Singles as Alan Shen, plus live orchestra and ABRSM Grade 8 violin and piano."
        image="/alan/orchestra-hall.jpg"
        imagePosition="center 40%"
        facts={[
          { label: 'Single', value: "I'd Stay" },
          { label: 'Single', value: 'Dreams of the Blue' },
          { label: 'Grade', value: 'ABRSM 8' },
          { label: 'Live', value: 'Orchestra · Solo' },
        ]}
        previews={[
          { src: '/alan/orchestra-ensemble.jpg', position: 'center 35%' },
          { src: '/alan/orchestra.png', position: '72% 28%' },
          { src: '/alan/violin-stage.png', position: '55% 25%' },
        ]}
        cta="Open music"
      />

      <WorldPanel
        href="/path"
        index="03"
        title="Path"
        lede="Competition, research, and athletics — the long arc from classroom to podium."
        image="/alan/graduation.png"
        imagePosition="center 18%"
        facts={[
          { label: 'USACO', value: 'Gold ’26' },
          { label: 'VEX', value: 'Worlds qualifier' },
          { label: 'Swim', value: 'Medals · Team' },
          { label: 'Paper', value: 'Cambridge UP ’26' },
        ]}
        previews={[
          { src: '/alan/medals-rooftop.png', position: 'center 30%' },
          { src: '/alan/lake-medals.webp', position: 'center 40%' },
          { src: '/alan/swim-team.jpg', position: 'center 25%' },
        ]}
        cta="Open path"
      />

      <section className="spine-pad relative overflow-hidden bg-ink py-16 text-white md:py-20">
        <Image
          src="/alan/violin-stage.png"
          alt=""
          fill
          className="object-cover object-[55%_25%] opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative z-10 px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.28em] text-lake uppercase">
                Next
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold uppercase">
                Always building the next thing.
              </p>
              <p className="mt-2 max-w-md text-sm text-white/65">
                More on education, competition, and how to reach me.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="bg-white px-5 py-3 text-xs font-semibold tracking-[0.14em] text-ink uppercase hover:bg-mist"
              >
                About
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                className="border border-white/35 px-5 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase hover:bg-white/10"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
