'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
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
        {work.image ? (
          <Image
            src={work.image.src}
            alt={work.image.alt}
            fill
            sizes="90vw"
            className="object-contain"
          />
        ) : (
          <TitleCard work={work} demo={!work.video} />
        )}
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
      {work.description.map((paragraph, index) => (
        <p key={`${work.id}-description-${index}`} className="mp-description">
          {paragraph}
        </p>
      ))}
      {work.process && (
        <ol
          className="mp-process"
          aria-label={`How ${work.subtitle ?? work.title} works`}
        >
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
          <a
            className="mp-gallery-image"
            href={item.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full-size image: ${item.caption ?? item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 899px) 85vw, 76vw"
              quality={90}
              className="object-contain"
            />
          </a>
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

function SimpleGallery({ work }: { work: PortfolioWork }) {
  const gallery = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(1)
  const count = work.gallery?.length || (work.image ? 1 : 3)
  const { scrollXProgress: progress } = useScroll({ container: gallery })

  useMotionValueEvent(progress, 'change', (value) => {
    setCurrent(Math.min(count, Math.round(value * (count - 1)) + 1))
  })

  return (
    <div className="mp-gallery">
      <div className="mp-gallery-heading">
        <span>Screenshots</span>
        <span>Swipe or scroll to see screenshots →</span>
        <span
          className="mp-gallery-count"
          aria-label={`Screenshot ${current} of ${count}`}
        >
          {String(current).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>
      <div className="mp-gallery-progress" aria-hidden="true">
        <motion.div style={{ scaleX: progress }} />
      </div>
      <div
        ref={gallery}
        className="mp-simple-gallery"
        tabIndex={0}
        role="region"
        aria-label={`${work.title} screenshot gallery`}
      >
        <div className="mp-gallery-track">
          <GalleryItems work={work} />
        </div>
      </div>
      <p className="mp-gallery-help">Select an image to view it full size.</p>
    </div>
  )
}

function ScrollGallery({
  work,
  top = 88,
}: {
  work: PortfolioWork
  top?: number
}) {
  const section = useRef<HTMLDivElement>(null)
  const gallery = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [current, setCurrent] = useState(1)
  const count = work.gallery?.length || (work.image ? 1 : 3)
  const { scrollYProgress: progress } = useScroll({
    target: section,
    offset: [`start ${top}px`, 'end end'],
  })
  const x = useTransform(progress, [0, 1], [0, -distance])

  useMotionValueEvent(progress, 'change', (value) => {
    setCurrent(Math.min(count, Math.round(value * (count - 1)) + 1))
  })

  useEffect(() => {
    const measure = () => {
      if (gallery.current && track.current) {
        setDistance(
          Math.max(0, track.current.scrollWidth - gallery.current.clientWidth),
        )
      }
    }
    const observer = new ResizeObserver(measure)
    if (gallery.current) observer.observe(gallery.current)
    if (track.current) observer.observe(track.current)
    measure()
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={section}
      className="mp-scroll-gallery"
      style={
        {
          height: `calc(100svh - ${top}px + ${distance}px)`,
          '--mp-gallery-top': `${top}px`,
        } as CSSProperties
      }
      role="region"
      aria-label={`${work.title} screenshot gallery`}
    >
      <div className="mp-gallery-stage">
        <div className="mp-gallery-heading">
          <span>Screenshots</span>
          <p className="mp-gallery-cue">
            <span aria-hidden="true">↓</span> Scroll to see screenshots
          </p>
          <span
            className="mp-gallery-count"
            aria-label={`Screenshot ${current} of ${count}`}
          >
            {String(current).padStart(2, '0')} /{' '}
            {String(count).padStart(2, '0')}
          </span>
        </div>
        <div ref={gallery} className="mp-gallery-window">
          <motion.div ref={track} className="mp-gallery-track" style={{ x }}>
            <GalleryItems work={work} />
          </motion.div>
        </div>
        <p className="mp-gallery-help">Select an image to view it full size.</p>
      </div>
    </div>
  )
}

function WorkChapter({ work, index, next }: ChapterProps) {
  return (
    <section
      id={work.id}
      className="mp-work-chapter section-max section-pad"
      aria-labelledby={`${work.id}-title`}
    >
      <p className="mp-eyebrow">
        0{index + 1} / {work.category}
      </p>
      <div className="mp-reading-layout">
        <div className="mp-reading-media">
          <div className="mp-reading-demo">
            <Demo work={work} />
          </div>
          <Details work={work} />
        </div>
        <div className="mp-reading-copy">
          <Description work={work} />
        </div>
      </div>
      <SimpleGallery work={work} />
      <div className="mp-simple-next">
        <ChapterFooter next={next} />
      </div>
    </section>
  )
}

const stageTop = 144
const chapterPhases = ['Image', 'Description', 'Screenshots'] as const

function CinematicChapter({ work, index, next }: ChapterProps) {
  const section = useRef<HTMLElement>(null)
  const reading = useRef<HTMLDivElement>(null)
  const mediaColumn = useRef<HTMLDivElement>(null)
  const screenshots = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState({
    width: 0,
    height: 600,
    scale: 0.42,
    lead: 720,
    travel: 1,
    descriptionAt: 720,
    screenshotsAt: Infinity,
  })
  const [status, setStatus] = useState({ phase: 0, percent: 0 })
  const [copyVisible, setCopyVisible] = useState(false)
  const { scrollYProgress: progress } = useScroll({
    target: section,
    offset: ['start 64px', 'end end'],
  })
  const { scrollYProgress: reveal } = useScroll({
    target: reading,
    offset: [`start ${stageTop}px`, `${layout.lead}px ${stageTop}px`],
  })
  const scale = useTransform(reveal, [0, 0.72], [1, layout.scale])
  const copyOpacity = useTransform(reveal, [0.76, 0.98], [0, 1])
  const factsOpacity = useTransform(reveal, [0.72, 0.84], [0, 1])

  useMotionValueEvent(reveal, 'change', (value) => {
    setCopyVisible(value >= 0.76)
  })

  useEffect(() => {
    const measure = () => {
      if (
        !section.current ||
        !reading.current ||
        !mediaColumn.current ||
        !screenshots.current
      )
        return
      const width = reading.current.clientWidth
      const lead = Math.round(window.innerHeight * 0.85)
      const nextLayout = {
        width,
        height: Math.min(width / 1.6, window.innerHeight - stageTop - 32),
        scale: mediaColumn.current.clientWidth / Math.max(1, width),
        lead,
        travel: Math.max(
          1,
          section.current.offsetHeight - window.innerHeight + 64,
        ),
        descriptionAt:
          reading.current.offsetTop - (stageTop - 64) + lead * 0.72,
        screenshotsAt: screenshots.current.offsetTop - (stageTop - 64),
      }
      setLayout((previous) =>
        Object.keys(nextLayout).every(
          (key) =>
            previous[key as keyof typeof previous] ===
            nextLayout[key as keyof typeof nextLayout],
        )
          ? previous
          : nextLayout,
      )
    }
    const observer = new ResizeObserver(measure)
    for (const element of [
      section.current,
      reading.current,
      mediaColumn.current,
      screenshots.current,
    ]) {
      if (element) observer.observe(element)
    }
    window.addEventListener('resize', measure)
    measure()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const updateStatus = useCallback(
    (value: number) => {
      const distance = value * layout.travel
      const phase =
        distance >= layout.screenshotsAt
          ? 2
          : distance >= layout.descriptionAt
            ? 1
            : 0
      const percent = Math.round(Math.max(0, Math.min(1, value)) * 100)
      setStatus((previous) =>
        previous.phase === phase && previous.percent === percent
          ? previous
          : { phase, percent },
      )
    },
    [layout],
  )
  useMotionValueEvent(progress, 'change', updateStatus)
  useEffect(() => {
    updateStatus(progress.get())
    setCopyVisible(reveal.get() >= 0.76)
  }, [updateStatus, progress, reveal]) // Recalculate after fonts, resizing, or a direct chapter link.

  const goToPhase = (phase: number) => {
    if (!reading.current || !screenshots.current) return
    const element = phase === 2 ? screenshots.current : reading.current
    const top = window.scrollY + element.getBoundingClientRect().top - stageTop
    window.scrollTo({
      top: top + (phase === 1 ? layout.lead : 0),
      behavior: 'smooth',
    })
  }

  return (
    <section
      ref={section}
      id={work.id}
      className="mp-work-chapter mp-cinematic-chapter section-max section-pad"
      aria-label={work.subtitle ?? work.title}
    >
      <div className="mp-chapter-status">
        <div className="mp-chapter-status-row">
          <p>
            0{index + 1} / <WorkName work={work} />
          </p>
          <ol aria-label={`${work.title} sections`}>
            {chapterPhases.map((phase, i) => (
              <li key={phase}>
                <button
                  onClick={() => goToPhase(i)}
                  aria-current={status.phase === i ? 'step' : undefined}
                >
                  <span>0{i + 1}</span> {phase}
                </button>
              </li>
            ))}
          </ol>
          <span className="mp-chapter-percent">{status.percent}%</span>
        </div>
        <div
          className="mp-chapter-progress"
          role="progressbar"
          aria-label={`${work.title} scroll progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={status.percent}
          aria-valuetext={`${chapterPhases[status.phase]}, ${status.percent}%`}
        >
          <motion.div style={{ scaleX: progress }} />
        </div>
      </div>
      <div ref={reading} className="mp-cinematic-reading mp-reading-layout">
        <div ref={mediaColumn} className="mp-cinematic-media mp-reading-media">
          <div className="mp-media-anchor">
            <div
              className="mp-media-slot"
              style={{ height: layout.height * layout.scale }}
            >
              <motion.div
                className="mp-shrink-frame"
                style={{
                  width: layout.width || '100%',
                  height: layout.height,
                  scale,
                }}
              >
                <Demo work={work} />
              </motion.div>
            </div>
            <motion.div style={{ opacity: factsOpacity }}>
              <Details work={work} />
            </motion.div>
          </div>
        </div>
        <motion.div
          className="mp-reading-copy mp-cinematic-copy"
          style={{ paddingTop: layout.lead, opacity: copyOpacity }}
          inert={!copyVisible}
        >
          <Description work={work} />
        </motion.div>
      </div>
      <div ref={screenshots} className="mp-screenshots-section">
        <ScrollGallery work={work} top={stageTop} />
      </div>
      <div className="mp-simple-next">
        <ChapterFooter next={next} />
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
    // Hydration adds the taller scroll galleries. Restore a
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
            I write songs and experiment with movement,
            <br />
            sound, and musical conversation.
          </p>
          <span>Three projects I have been exploring.</span>
        </div>
        <nav aria-label="Selected works" className="mp-project-index">
          {works.map((work, index) => (
            <a href={`#${work.id}`} key={work.id} className="mp-index-link">
              <div className="mp-index-art">
                {work.image ? (
                  <Image
                    src={work.image.src}
                    alt={work.image.alt}
                    fill
                    sizes="(max-width: 899px) 30vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <TitleCard work={work} />
                )}
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
          <CinematicChapter
            key={work.id}
            work={work}
            index={index}
            next={works[index + 1]}
          />
        ) : (
          <WorkChapter
            key={work.id}
            work={work}
            index={index}
            next={works[index + 1]}
          />
        ),
      )}
      <div className="mp-end section-max section-pad">
        <p className="display-soft">
          I am still exploring
          <br />
          how these ideas can become music.
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
