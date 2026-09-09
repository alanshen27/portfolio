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
 * Movement opener. A full-width double rule, then numeral + title in the
 * left third and the standfirst in the right two-thirds. `align="center"`
 * is kept only for the cover-voice moments (contact).
 */
export function Movement({
  n,
  title,
  standfirst,
  align = 'left',
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
  const rule = `rule-double ${dark ? 'rule-double-dark' : ''}`
  if (centered) {
    return (
      <Reveal y={8} className={className}>
        <header id={id} className="mx-auto max-w-2xl scroll-mt-24 text-center">
          <div className={`${rule} mx-auto w-16`} aria-hidden />
          <p
            className={`numeral mt-4 text-[13px] ${dark ? 'text-accent-bright' : 'text-accent'}`}
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
              className={`mx-auto mt-3 max-w-xl text-[15px] leading-relaxed ${dark ? 'text-white/65' : 'text-ink-soft'}`}
            >
              {standfirst}
            </p>
          )}
        </header>
      </Reveal>
    )
  }
  return (
    <Reveal y={8} className={className}>
      <header id={id} className="scroll-mt-24">
        <div className={rule} aria-hidden />
        <div className="grid gap-3 pt-4 md:grid-cols-12 md:gap-6">
          <div className="flex items-baseline gap-3 md:col-span-4">
            <span
              className={`numeral text-[13px] ${dark ? 'text-accent-bright' : 'text-accent'}`}
            >
              {roman(n)}
            </span>
            <h2
              className={`display-quiet text-[clamp(1.9rem,3.6vw,2.6rem)] ${dark ? 'text-white' : 'text-ink'}`}
            >
              {title}
            </h2>
          </div>
          {standfirst && (
            <p
              className={`max-w-2xl text-[15px] leading-relaxed md:col-span-8 md:pt-2 ${dark ? 'text-white/65' : 'text-ink-soft'}`}
            >
              {standfirst}
            </p>
          )}
        </div>
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

/** Page opener for sub-pages: same voice as the cover, on the grid. */
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
    <section className="border-line border-b pt-24 pb-8 md:pt-28 md:pb-10">
      <div className="section-max section-pad">
        <p className="eyebrow">{kicker}</p>
        <div className="mt-3 grid gap-5 md:grid-cols-12 md:gap-8">
          <h1 className="display-quiet text-ink text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[0.95] md:col-span-7">
            {title}
          </h1>
          <div className="md:col-span-5 md:pt-2">
            {standfirst && (
              <p className="text-ink-soft max-w-md text-[15px] leading-relaxed">
                {standfirst}
              </p>
            )}
            {contents && (
              <nav
                aria-label="Contents"
                className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]"
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
        </div>
      </div>
    </section>
  )
}
