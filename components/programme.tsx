'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { roman } from '@/lib/utils'

export { roman }

/** Small Roman numeral, serif, as used on concert programmes. */
export function Numeral({
  n,
  className = '',
}: {
  n: number
  className?: string
}) {
  return (
    <span className={`numeral ${className}`} aria-hidden>
      {roman(n)}.
    </span>
  )
}

/**
 * Movement opener. A full-width double rule, then numeral + title in the
 * left third and the standfirst in the right two-thirds. `align="center"`
 * is kept only for the cover-voice moments (contact).
 */
export function Movement({
  title,
  standfirst,
  align = 'left',
  dark = false,
  id,
  className = '',
}: {
  /** kept for call-site compatibility; numerals are no longer drawn */
  n?: number
  title: string
  standfirst?: ReactNode
  align?: 'center' | 'left'
  dark?: boolean
  id?: string
  className?: string
}) {
  const centered = align === 'center'
  return (
    <header
      id={id}
      className={`scroll-mt-24 ${centered ? 'text-center' : ''} ${className}`}
    >
      <h2
        className={`text-[13px] ${dark ? 'text-white/55' : 'text-ink-faint'}`}
      >
        {title}
      </h2>
      {standfirst && (
        <p
          className={`mt-2 max-w-[62ch] text-[16px] leading-relaxed ${
            centered ? 'mx-auto' : ''
          } ${dark ? 'text-white/70' : 'text-ink-soft'}`}
        >
          {standfirst}
        </p>
      )}
    </header>
  )
}

/** Leader-dotted programme row: title (+ subtitle) ...... right-hand meta. */
export function ProgrammeRow({
  n,
  title,
  subtitle,
  right,
  href,
  dark = false,
}: {
  n?: number
  title: string
  subtitle?: string
  right: string
  href?: string
  dark?: boolean
}) {
  const inner = (
    <>
      <div className="flex items-baseline gap-3 md:gap-4">
        {n !== undefined && (
          <span
            className={`numeral w-7 shrink-0 text-[13px] ${dark ? 'text-white/45' : 'text-ink-faint'}`}
            aria-hidden
          >
            {roman(n)}.
          </span>
        )}
        <span
          className={`display-quiet text-[1.15rem] leading-tight md:text-[1.3rem] ${
            dark ? 'text-white' : 'text-ink'
          } ${href ? 'group-hover:text-accent' : ''}`}
        >
          {title}
        </span>
        <span
          className={`leaders hidden flex-1 md:block ${dark ? 'leaders-dark' : ''}`}
          aria-hidden
        />
        <span
          className={`hidden shrink-0 text-right text-[13px] md:block ${
            dark ? 'text-white/65' : 'text-ink-soft'
          }`}
        >
          {right}
        </span>
      </div>
      {(subtitle || right) && (
        <div
          className={`mt-0.5 flex flex-wrap gap-x-3 pl-10 text-[13px] leading-snug md:pl-11 ${
            dark ? 'text-white/55' : 'text-ink-soft'
          }`}
        >
          {subtitle && <span>{subtitle}</span>}
          <span className={`md:hidden ${dark ? 'text-white/70' : 'text-ink'}`}>
            {right}
          </span>
        </div>
      )}
    </>
  )

  const cls = 'group block py-3'
  if (href?.startsWith('/')) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    )
  }
  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    )
  }
  return <div className={cls}>{inner}</div>
}

/** Page opener for sub-pages: same voice as the cover, on the grid. */
export function PageTitle({
  title,
  standfirst,
  contents,
}: {
  /** kept for call-site compatibility; not drawn */
  kicker?: string
  title: string
  standfirst?: string
  contents?: { label: string; href: string }[]
}) {
  return (
    <section className="section-max section-pad pt-28 pb-6 md:pt-36 md:pb-8">
      <h1 className="text-ink text-[clamp(2rem,4vw,2.75rem)] leading-tight font-medium tracking-[-0.02em]">
        {title}
      </h1>
      {standfirst && (
        <p className="text-ink-soft mt-3 max-w-[58ch] text-[18px] leading-relaxed">
          {standfirst}
        </p>
      )}
      {contents && (
        <nav
          aria-label="Contents"
          className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]"
        >
          {contents.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="text-ink-soft hover:text-ink transition-colors"
            >
              {c.label}
            </a>
          ))}
        </nav>
      )}
    </section>
  )
}
