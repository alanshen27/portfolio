'use client'

import Image from 'next/image'
import { useState } from 'react'

export type Callout = {
  /** percent of the frame, from the left */
  x: number
  /** percent of the frame, from the top */
  y: number
  text: string
}

export type Screen = {
  src: string
  alt: string
  /** the path within the app, e.g. "home" */
  route: string
  /** what a reader is looking at, in a few words */
  label: string
  callouts: Callout[]
  position?: string
}

/**
 * A product screen drawn as ink on paper. Screenshots are exported in
 * greyscale and multiplied onto the page, so every app — whatever its brand
 * colour — sits in the site's own palette; amber is reserved for the
 * annotations, the same way the roll reserves it for the continuation.
 */
export function AppPlate({
  domain,
  screens,
  ratio = 'aspect-[16/10]',
  className = '',
}: {
  domain: string
  screens: Screen[]
  ratio?: string
  className?: string
}) {
  const [i, setI] = useState(0)
  const s = screens[i]
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="border-line border">
        <div className="border-line text-ink-faint flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b px-3 py-1.5 text-[13px]">
          <span className="text-ink font-medium">{domain}</span>
          {screens.length > 1 ? (
            <div
              className="flex flex-wrap gap-x-3"
              role="tablist"
              aria-label="screens"
            >
              {screens.map((sc, k) => (
                <button
                  key={sc.route}
                  role="tab"
                  aria-selected={k === i}
                  onClick={() => setI(k)}
                  className={`hover:text-ink transition-colors ${
                    k === i ? 'text-ink rule-link' : ''
                  }`}
                >
                  /{sc.route}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-ink">/{s.route}</span>
          )}
          <span className="ml-auto truncate">{s.label}</span>
        </div>
        <div className={`bg-bg relative overflow-hidden ${ratio}`}>
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            className={`object-cover mix-blend-multiply ${s.position ?? 'object-top'}`}
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          {s.callouts.map((c, k) => (
            <span
              key={k}
              className="app-callout absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              aria-hidden
            >
              {k + 1}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 grid gap-1">
        {s.callouts.map((c, k) => (
          <p
            key={k}
            className="text-ink-soft grid grid-cols-[1.25rem_1fr] text-[13px] leading-snug"
          >
            <span className="text-accent font-medium tabular-nums">
              {k + 1}
            </span>
            <span>{c.text}</span>
          </p>
        ))}
      </figcaption>
    </figure>
  )
}

/** A single screenshot given the same ink-on-paper treatment, in CSS. */
export function InkShot({
  src,
  alt,
  head,
  ratio = 'aspect-[16/10]',
  position = 'object-top',
}: {
  src: string
  alt: string
  head?: string
  ratio?: string
  position?: string
}) {
  return (
    <div className="border-line border">
      {head && (
        <div className="border-line text-ink border-b px-3 py-1.5 text-[13px] font-medium">
          {head}
        </div>
      )}
      <div className={`bg-bg relative overflow-hidden ${ratio}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className={`ink-shot object-cover ${position}`}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    </div>
  )
}
