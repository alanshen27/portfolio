'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { PortfolioWork } from '@/app/music-technology/works'
import { SmartLink } from '@/components/beats'
import { PortfolioAudio } from '@/components/portfolio-audio'

const cinematicQuery =
  '(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)'
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(cinematicQuery)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
const getSnapshot = () => window.matchMedia(cinematicQuery).matches
const getServerSnapshot = () => false

function WorkName({ work }: { work: PortfolioWork }) {
  return (
    <>
      <span lang={work.id === 'wenda' ? 'zh' : undefined}>{work.title}</span>
      {work.originalTitle && <span lang="zh"> {work.originalTitle}</span>}
      {work.pronunciation && <i> {work.pronunciation}</i>}
    </>
  )
}

// Abstract title treatments, kept separate from the project's actual media.
function TitleCard({
  work,
  demo = false,
}: {
  work: PortfolioWork
  demo?: boolean
}) {
  return (
    <div className={`mp-title-card mp-art-${work.id}`}>
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {work.id === 'regrets' && (
          <g fill="none" stroke="currentColor">
            {Array.from({ length: 12 }, (_, i) => (
              <ellipse
                key={i}
                cx="610"
                cy="250"
                rx={60 + i * 25}
                ry={90 + i * 22}
              />
            ))}
          </g>
        )}
        {work.id === 'inkform' && (
          <g fill="none" stroke="currentColor" strokeLinecap="round">
            <path
              d="M560 65 C240 70 275 430 635 385 C830 350 710 150 490 175"
              strokeWidth="26"
            />
            <path d="M590 55 C270 100 340 455 715 355" strokeWidth="3" />
            <path d="M650 140 Q490 280 455 450" strokeWidth="10" />
          </g>
        )}
        {work.id === 'wenda' && (
          <g fill="none" stroke="currentColor">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                d={`M-50 ${340 + i * 28} Q170 ${100 + i * 30} 420 ${320 + i * 13} T850 ${190 + i * 35}`}
              />
            ))}
            <circle cx="610" cy="130" r="43" />
            <circle cx="610" cy="130" r="8" fill="currentColor" />
          </g>
        )}
      </svg>
      <div className="mp-card-type">
        <p className="mp-card-category">{work.category}</p>
        <p className="mp-card-name">
          <WorkName work={work} />
        </p>
        {work.subtitle && <p className="mp-card-subtitle">{work.subtitle}</p>}
      </div>
      {demo && <p className="mp-media-pending">Demo video to follow</p>}
    </div>
  )
}

function Demo({
  work,
  active = false,
}: {
  work: PortfolioWork
  active?: boolean
}) {
  const video = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const player = video.current
    if (!player) return
    if (active) {
      // Scroll can start a muted preview; audible playback always stays user-controlled.
      player.muted = true
      void player.play().catch(() => {})
    } else {
      player.pause()
    }
  }, [active])

  if (!work.video || failed) {
    return (
      <div className="mp-demo-placeholder">
        <TitleCard work={work} demo={!work.video} />
        {failed && (
          <a className="mp-video-fallback" href={work.video?.src}>
            Open demo video ↗
          </a>
        )}
      </div>
    )
  }
  return (
    <video
      ref={video}
      src={work.video.src}
      poster={work.video.poster ?? work.image?.src}
      controls
      playsInline
      muted
      loop
      preload="metadata"
      aria-label={`${work.title} demo video`}
      onError={() => setFailed(true)}
    >
      {work.video.captions && (
        <track
          kind="captions"
          src={work.video.captions}
          srcLang="en"
          label="English"
          default
        />
      )}
    </video>
  )
}

function Details({ work }: { work: PortfolioWork }) {
  return (
    <dl className="mp-facts">
      {work.details.map((detail) => (
        <div key={detail.label}>
          <dt>{detail.label}</dt>
          <dd>{detail.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Description({ work }: { work: PortfolioWork }) {
  return (
    <>
      <h2 id={`${work.id}-title`} className="display-soft mp-work-title">
        <WorkName work={work} />
      </h2>
      {work.subtitle && <p className="mp-work-subtitle">{work.subtitle}</p>}
      <p className="mp-summary">{work.summary}</p>
      <p className="mp-description">{work.description}</p>
      {work.process && (
        <ol className="mp-process" aria-label="How Call & Blossom works">
          {work.process.map((step, i) => (
            <li key={step.title} title={step.description}>
              <span>0{i + 1}</span> {step.title}
            </li>
          ))}
        </ol>
      )}
      {work.audio && <PortfolioAudio title={work.title} src={work.audio} />}
      {!!work.links?.length && (
        <div className="mp-links">
          {work.links.map((link) => (
            <SmartLink key={link.href} href={link.href} className="rule-link">
              {link.label} ↗
            </SmartLink>
          ))}
        </div>
      )}
    </>
  )
}

function GalleryItems({ work }: { work: PortfolioWork }) {
  const images: NonNullable<PortfolioWork['gallery']> = work.gallery?.length
    ? work.gallery
    : work.image
      ? [work.image]
      : []
  return images.length
    ? images.map((item, i) => (
        <figure key={item.src} className="mp-gallery-item">
          <div className="mp-gallery-image">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 899px) 85vw, 55vw"
              className="object-contain"
            />
          </div>
          <figcaption>
            <span>0{i + 1}</span>
            {item.caption ?? item.alt}
          </figcaption>
        </figure>
      ))
    : [1, 2, 3].map((number) => (
        <figure key={number} className="mp-gallery-item mp-gallery-pending">
          <div className="mp-gallery-image">
            <span aria-hidden="true">0{number}</span>
            <p>Images to follow</p>
          </div>
          <figcaption>
            <span>0{number}</span>
            {work.title} / gallery
          </figcaption>
        </figure>
      ))
}

type ChapterProps = { work: PortfolioWork; index: number; next?: PortfolioWork }

function ChapterFooter({ next }: { next?: PortfolioWork }) {
  return (
    <a href={next ? `#${next.id}` : '#selected-works'}>
      {next ? (
        <>
          Up next: <WorkName work={next} /> ↓
        </>
      ) : (
        'Back to all works ↑'
      )}
    </a>
  )
}

function SimpleChapter({ work, index, next }: ChapterProps) {
  return (
    <section
      id={work.id}
      className="mp-simple-chapter section-max section-pad"
      aria-labelledby={`${work.id}-title`}
    >
      <p className="mp-eyebrow">
        0{index + 1} / {work.category}
      </p>
      <div className="mp-simple-demo">
        <Demo work={work} />
      </div>
      <div className="mp-simple-copy">
        <Details work={work} />
        <div>
          <Description work={work} />
        </div>
      </div>
      <div className="mp-gallery-heading">
        <span>Gallery</span>
        <span>Scroll to explore →</span>
      </div>
      <div
        className="mp-simple-gallery"
        tabIndex={0}
        role="region"
        aria-label={`${work.title} image gallery`}
      >
        <div className="mp-gallery-track">
          <GalleryItems work={work} />
        </div>
      </div>
      <div className="mp-simple-next">
        <ChapterFooter next={next} />
      </div>
    </section>
  )
}

function ScrollChapter({ work, index, next }: ChapterProps) {
  const section = useRef<HTMLElement>(null)
  const gallery = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [phase, setPhase] = useState<'intro' | 'demo' | 'details'>('intro')
  const { scrollYProgress: progress } = useScroll({
    target: section,
    offset: ['start 64px', 'end end'],
  })
  const scale = useTransform(
    progress,
    [0, 0.16, 0.35, 0.55, 1],
    [0.76, 1, 1, 0.34, 0.34],
  )
  const x = useTransform(
    progress,
    [0, 0.16, 0.35, 0.55],
    ['12%', '0%', '0%', '0%'],
  )
  const y = useTransform(progress, [0, 0.16], ['8%', '0%'])
  const copyOpacity = useTransform(progress, [0.43, 0.56], [0, 1])
  const copyY = useTransform(progress, [0.43, 0.56], [24, 0])
  const galleryOpacity = useTransform(progress, [0.54, 0.64], [0, 1])
  const galleryX = useTransform(progress, [0.65, 0.94], [0, -distance])

  useMotionValueEvent(progress, 'change', (value) => {
    const nextPhase = value < 0.1 ? 'intro' : value < 0.45 ? 'demo' : 'details'
    if (phase !== nextPhase) setPhase(nextPhase)
  })
  useEffect(() => {
    const measure = () => {
      if (gallery.current && track.current)
        setDistance(
          Math.max(0, track.current.scrollWidth - gallery.current.clientWidth),
        )
    }
    const observer = new ResizeObserver(measure)
    if (gallery.current) observer.observe(gallery.current)
    if (track.current) observer.observe(track.current)
    measure()
    return () => observer.disconnect()
  }, [])

  const skipToDetails = () => {
    if (!section.current) return
    const start =
      window.scrollY + section.current.getBoundingClientRect().top - 64
    const travel = section.current.offsetHeight - window.innerHeight + 64
    window.scrollTo({ top: start + travel * 0.63, behavior: 'smooth' })
  }

  return (
    <section
      ref={section}
      id={work.id}
      className="mp-scroll-chapter"
      aria-labelledby={`${work.id}-title`}
    >
      <div className="mp-stage">
        <div className="mp-chapter-bar">
          <p>
            0{index + 1} / <WorkName work={work} />
          </p>
          <button onClick={skipToDetails}>Skip to description ↓</button>
        </div>
        <div className="mp-stage-content">
          <motion.div
            className="mp-zoom-media"
            style={{ scale, x, y }}
            inert={phase === 'details'}
          >
            <Demo work={work} active={phase === 'demo'} />
          </motion.div>
          <motion.div
            className="mp-stage-facts"
            style={{ opacity: copyOpacity }}
            inert={phase !== 'details'}
          >
            <Details work={work} />
          </motion.div>
          <motion.div
            className="mp-stage-copy"
            style={{ opacity: copyOpacity, y: copyY }}
            inert={phase !== 'details'}
          >
            <Description work={work} />
          </motion.div>
          <motion.div
            className="mp-stage-gallery"
            style={{ opacity: galleryOpacity }}
            inert={phase !== 'details'}
          >
            <div className="mp-gallery-heading">
              <span>Gallery</span>
              <span>Keep scrolling to explore →</span>
            </div>
            <div ref={gallery} className="mp-gallery-window">
              <motion.div
                ref={track}
                className="mp-gallery-track"
                style={{ x: galleryX }}
              >
                <GalleryItems work={work} />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="mp-stage-footer">
          <span>
            {phase === 'details'
              ? 'Description & gallery'
              : 'Scroll into the work'}
          </span>
          <div className="mp-progress">
            <motion.div style={{ scaleX: progress }} />
          </div>
          <ChapterFooter next={next} />
        </div>
      </div>
    </section>
  )
}

export function MusicPortfolioExperience({
  works,
}: {
  works: PortfolioWork[]
}) {
  const canAnimate = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )
  const [simple, setSimple] = useState(false)
  const cinematic = canAnimate && !simple

  const restoredHash = useRef(false)
  useEffect(() => {
    // Hydration swaps the static chapters for taller scroll chapters. Restore a
    // direct project link once that layout is ready, without disturbing resizes.
    if (restoredHash.current || canAnimate !== getSnapshot()) return
    const id = window.location.hash.slice(1)
    if (id !== 'selected-works' && !works.some((work) => work.id === id)) return
    const frame = requestAnimationFrame(() => {
      restoredHash.current = true
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [canAnimate, works])
  return (
    <div
      className={`music-portfolio ${cinematic ? 'mp-cinematic' : 'mp-simple'}`}
    >
      <section
        id="selected-works"
        className="mp-overview section-max section-pad"
      >
        <div className="mp-overline">
          <p>Alan Shen / selected work</p>
          {canAnimate && (
            <button onClick={() => setSimple(!simple)} aria-pressed={simple}>
              Simple view {simple ? 'on' : 'off'}
            </button>
          )}
        </div>
        <h1 className="display">
          Music &amp;
          <br className="mp-mobile-break" /> technology.
        </h1>
        <div className="mp-intro">
          <p>
            Writing a song. Moving into sound.
            <br />
            Making music through a dialogue.
          </p>
          <span>Three works. Three ways into music.</span>
        </div>
        <nav aria-label="Selected works" className="mp-project-index">
          {works.map((work, index) => (
            <a href={`#${work.id}`} key={work.id} className="mp-index-link">
              <div className="mp-index-art">
                <TitleCard work={work} />
              </div>
              <div className="mp-index-caption">
                <span>0{index + 1}</span>
                <span>
                  <WorkName work={work} />
                  {work.subtitle && <small>{work.subtitle}</small>}
                </span>
                <span aria-hidden="true">↘</span>
              </div>
            </a>
          ))}
        </nav>
        <div className="mp-scroll-invite">
          <span>Scroll to enter the first work</span>
          <a href={`#${works[0].id}`} aria-label="Enter the first work">
            ↓
          </a>
        </div>
      </section>
      {works.map((work, index) =>
        cinematic ? (
          <ScrollChapter
            key={work.id}
            work={work}
            index={index}
            next={works[index + 1]}
          />
        ) : (
          <SimpleChapter
            key={work.id}
            work={work}
            index={index}
            next={works[index + 1]}
          />
        ),
      )}
      <div className="mp-end section-max section-pad">
        <p className="display-soft">
          Three ways into music.
          <br />
          One ongoing exploration.
        </p>
        <div>
          <Link href="/music" className="rule-link">
            More music &amp; performance →
          </Link>
          <Link href="/work" className="rule-link">
            More projects →
          </Link>
        </div>
      </div>
    </div>
  )
}
