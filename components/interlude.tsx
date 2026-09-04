'use client'

import Image from 'next/image'
import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/portfolio-motion'

/**
 * Interludes — short beats between movements. Each is one screen-fraction
 * tall, dense, and a different kind of moment: numbers, a line, a plate.
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
      className={`grid grid-cols-2 sm:grid-cols-4 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`,
      }}
    >
      {items.map((f, i) => (
        <div
          key={f.label}
          className={`px-3 py-3 text-center ${
            i > 0
              ? dark
                ? 'border-l border-white/15'
                : 'border-line border-l'
              : ''
          }`}
        >
          <dd
            className={`figure text-[clamp(1.6rem,3vw,2.4rem)] ${dark ? 'text-white' : 'text-ink'}`}
          >
            {f.value}
          </dd>
          <dt
            className={`mt-1 text-[12px] leading-snug ${dark ? 'text-white/55' : 'text-ink-faint'}`}
          >
            {f.label}
          </dt>
        </div>
      ))}
    </dl>
  )
}

/** A row of numbers on a wash — "by the numbers" beat. */
export function NumbersInterlude({
  items,
  note,
}: {
  items: { value: string; label: string }[]
  note?: string
}) {
  return (
    <section className="bg-panel-wash border-line border-y py-6 md:py-8">
      <div className="section-max section-pad">
        <Reveal y={10}>
          <Figures items={items} />
          {note && (
            <p className="text-ink-faint mt-3 text-center text-[12px]">
              {note}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}

/** A single line in Alan's voice, set large, with an attribution. */
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
      className={`border-line border-y py-10 md:py-14 ${dark ? 'bg-ink text-white' : 'bg-bg-elevated'}`}
    >
      <div className="section-max section-pad">
        <Reveal y={10}>
          <blockquote className="mx-auto max-w-3xl text-center">
            <p
              className={`display-quiet text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.2] font-medium ${dark ? 'text-white' : 'text-ink'}`}
            >
              {children}
            </p>
            {source && (
              <footer
                className={`mt-4 text-[12.5px] ${dark ? 'text-white/50' : 'text-ink-faint'}`}
              >
                {source}
              </footer>
            )}
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

/** A wide photograph or muted loop with a caption line — a plate beat. */
export function PlateInterlude({
  src,
  video,
  alt,
  caption,
  credit,
  position = 'center',
  ratio = 'aspect-[21/7] md:aspect-[21/6]',
}: {
  src: string
  video?: string
  alt: string
  caption: string
  credit?: string
  position?: string
  ratio?: string
}) {
  const reduce = useReducedMotion()
  const showVideo = video && !reduce
  return (
    <section className="border-line border-y py-6 md:py-8">
      <div className="section-max section-pad">
        <Reveal y={12}>
          <figure>
            <div className={`bg-mist relative overflow-hidden ${ratio}`}>
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
            </div>
            <figcaption className="text-ink-faint mt-2 flex flex-wrap justify-between gap-x-4 text-[12px]">
              <span>{caption}</span>
              {credit && <span>{credit}</span>}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

/** Muted loop as an aside inside a note. */
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
      </div>
      {caption && (
        <figcaption className="text-ink-faint mt-2 text-[12px] leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
