'use client'

import Image from 'next/image'
import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { Parallax, ParallaxPlane } from '@/components/parallax'

/**
 * Interludes — beats between movements. Flat paper, rules, and two planes
 * moving at different rates. Nothing decorative that isn't content.
 */

export function Figures({
  items,
  dark = false,
  className = '',
}: {
  items: { value: string; label: string }[]
  dark?: boolean
  className?: string
}) {
  return (
    <dl
      className={`grid gap-x-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`,
      }}
    >
      {items.map((f) => (
        <div
          key={f.label}
          className={`border-t pt-2 ${dark ? 'border-white/25' : 'border-ink'}`}
        >
          <dd
            className={`figure text-[clamp(1.5rem,2.6vw,2.1rem)] ${dark ? 'text-white' : 'text-ink'}`}
          >
            {f.value}
          </dd>
          <dt
            className={`mt-1 text-[13px] leading-snug ${dark ? 'text-white/55' : 'text-ink-soft'}`}
          >
            {f.label}
          </dt>
        </div>
      ))}
    </dl>
  )
}

/** Four figures on the grid, header at left — "by the numbers" beat. */
export function NumbersInterlude({
  items,
  label = 'by the numbers',
  note,
}: {
  items: { value: string; label: string }[]
  label?: string
  note?: string
}) {
  return (
    <section className="border-line border-t py-8 md:py-10">
      <div className="section-max section-pad grid gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="eyebrow">{label}</p>
          {note && (
            <p className="text-ink-faint mt-1 max-w-[16rem] text-[13px] leading-snug">
              {note}
            </p>
          )}
        </div>
        <Parallax depth={-16} className="md:col-span-9">
          <Figures items={items} />
        </Parallax>
      </div>
    </section>
  )
}

/** One sentence in Alan's words, set on the grid with a hanging attribution. */
export function QuoteInterlude({
  children,
  source,
  dark = false,
}: {
  children: ReactNode
  source?: string
  dark?: boolean
}) {
  return (
    <section
      className={`border-t py-10 md:py-14 ${dark ? 'bg-ink border-white/15 text-white' : 'border-line'}`}
    >
      <div className="section-max section-pad grid gap-4 md:grid-cols-12">
        <p
          className={`text-[13px] md:col-span-3 ${dark ? 'text-white/50' : 'text-ink-faint'}`}
        >
          {source}
        </p>
        <Parallax depth={-24} className="md:col-span-8">
          <blockquote>
            <p
              className={`display-quiet text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.15] ${dark ? 'text-white' : 'text-ink'}`}
            >
              {children}
            </p>
          </blockquote>
        </Parallax>
      </div>
    </section>
  )
}

/**
 * Full-bleed plate. The image plane drifts one way; the caption block,
 * set on paper and overlapping the plate's lower-left, drifts the other.
 */
export function PlateInterlude({
  src,
  video,
  alt,
  caption,
  credit,
  position = 'center',
  height = 'h-[52vw] max-h-[560px] min-h-[260px]',
}: {
  src: string
  video?: string
  alt: string
  caption: string
  credit?: string
  position?: string
  height?: string
}) {
  const reduce = useReducedMotion()
  const showVideo = video && !reduce
  return (
    <section className="border-line relative border-t">
      <div className={`bg-mist relative w-full overflow-hidden ${height}`}>
        <ParallaxPlane travel={0.14}>
          {showVideo ? (
            <video
              src={video}
              poster={src}
              autoPlay
              muted
              loop
              playsInline
              aria-label={alt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: position }}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              style={{ objectPosition: position }}
              sizes="100vw"
            />
          )}
        </ParallaxPlane>
      </div>
      <div className="section-max section-pad relative">
        <Parallax
          depth={-36}
          className="bg-bg relative -mt-10 max-w-md px-5 pt-4 pb-5 md:-mt-14 md:px-6"
        >
          <div className="rule-double" aria-hidden />
          <p className="text-ink mt-3 text-[15px] leading-snug">{caption}</p>
          {credit && (
            <p className="text-ink-faint mt-2 text-[13px]">{credit}</p>
          )}
        </Parallax>
      </div>
    </section>
  )
}

/** Muted loop as an aside inside a note, on its own plane. */
export function Loop({
  src,
  poster,
  alt,
  caption,
  ratio = 'aspect-[16/10]',
  position = 'center',
}: {
  src: string
  poster: string
  alt: string
  caption?: string
  ratio?: string
  position?: string
}) {
  const reduce = useReducedMotion()
  return (
    <figure>
      <div className={`bg-mist relative overflow-hidden ${ratio}`}>
        <ParallaxPlane travel={0.1}>
          {reduce ? (
            <Image
              src={poster}
              alt={alt}
              fill
              className="object-cover"
              style={{ objectPosition: position }}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          ) : (
            <video
              src={src}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={alt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: position }}
            />
          )}
        </ParallaxPlane>
      </div>
      {caption && (
        <figcaption className="text-ink-faint mt-2 text-[13px] leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
