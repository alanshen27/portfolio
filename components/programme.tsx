'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/portfolio-motion'
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
 * Section opener: numeral, serif title, optional standfirst, double rule.
 * Centered like a programme heading; left-aligned variant for dense back matter.
 */
export function Movement({
  n,
  title,
  standfirst,
  align = 'center',
  dark = false,
  id,
  className = '',
}: {
  n: number
  title: string
  standfirst?: ReactNode
  align?: 'center' | 'left'
  dark?: boolean
  id?: string
  className?: string
}) {
  const centered = align === 'center'
  return (
    <Reveal y={10} className={className}>
      <header
        id={id}
        className={`scroll-mt-24 ${centered ? 'mx-auto max-w-3xl text-center' : ''}`}
      >
        <p
          className={`numeral text-[13px] ${dark ? 'text-accent-bright' : 'text-accent'}`}
        >
          {roman(n)}
        </p>
        <h2
          className={`display-quiet mt-1 text-[clamp(1.9rem,3.6vw,2.6rem)] ${dark ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h2>
        {standfirst && (
          <p
            className={`mt-3 font-serif text-[15px] leading-relaxed italic md:text-base ${
              dark ? 'text-white/65' : 'text-ink-soft'
            } ${centered ? 'mx-auto max-w-xl' : 'max-w-2xl'}`}
          >
            {standfirst}
          </p>
        )}
        <div
          className={`rule-double mt-5 ${dark ? 'rule-double-dark' : ''} ${centered ? 'mx-auto w-24' : 'w-full'}`}
          aria-hidden
        />
      </header>
    </Reveal>
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

/** Page opener for sub-pages: same voice as the cover, no photographic hero. */
export function PageTitle({
  kicker,
  title,
  standfirst,
  contents,
}: {
  kicker: string
  title: string
  standfirst?: string
  contents?: { label: string; href: string }[]
}) {
  return (
    <section className="border-line border-b pt-28 pb-10 md:pt-32 md:pb-12">
      <div className="section-max section-pad text-center">
        <p className="eyebrow">{kicker}</p>
        <h1 className="display-quiet text-ink mt-3 text-[clamp(2.4rem,6vw,4.2rem)]">
          {title}
        </h1>
        {standfirst && (
          <p className="text-ink-soft mx-auto mt-4 max-w-2xl font-serif text-base leading-relaxed italic md:text-lg">
            {standfirst}
          </p>
        )}
        <div className="rule-double mx-auto mt-6 w-24" aria-hidden />
        {contents && (
          <nav
            aria-label="Contents"
            className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px]"
          >
            {contents.map((c, i) => (
              <a
                key={c.href}
                href={c.href}
                className="text-ink-soft hover:text-ink flex items-baseline gap-1.5 transition-colors"
              >
                <span className="numeral text-ink-faint text-[11px]">
                  {roman(i + 1)}
                </span>
                {c.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
