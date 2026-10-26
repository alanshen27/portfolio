'use client'

import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { easeSnap } from '@/components/portfolio-motion'

function isInternal(href: string) {
  return href.startsWith('/') || href.startsWith('#')
}

export function SmartLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  if (isInternal(href))
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={className}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

/** Content rises out of a mask — on load (`now`) or when scrolled into view. */
export function Rise({
  children,
  className = '',
  delay = 0,
  now = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  now?: boolean
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={`overflow-hidden pb-[0.06em] ${className}`}
      initial="hidden"
      {...(now
        ? { animate: 'shown' }
        : {
            whileInView: 'shown',
            viewport: { once: true, amount: 0.3 },
          })}
    >
      <motion.div
        variants={{ hidden: { y: '115%' }, shown: { y: 0 } }}
        transition={{ duration: 1, ease: easeSnap, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Plain fade-up, for running text and rows. */
export function Fade({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: easeSnap, delay }}
    >
      {children}
    </motion.div>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

/** A statement whose words fill in as it is scrolled through. */
export function Words({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.5'],
  })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {reduce
        ? text
        : words.map((w, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {w}
            </Word>
          ))}
    </p>
  )
}

/** One oversized line that slides sideways with the scroll. */
export function Drift({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-hidden>
      <motion.p
        style={reduce ? undefined : { x }}
        className="display text-[clamp(5rem,19vw,22rem)] whitespace-nowrap"
      >
        {text} {text}
      </motion.p>
    </div>
  )
}

/** A section: a small label on a hairline, then the content. */
export function Block({
  id,
  label,
  aside,
  children,
  className = '',
}: {
  id?: string
  label: string
  aside?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`section-max section-pad scroll-mt-16 py-14 md:py-20 ${className}`}
    >
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <h2 className="display-soft text-ink text-[clamp(1.75rem,2.6vw,2.5rem)]">
          {label}
        </h2>
        {aside && <div className="text-ink-soft text-[15px]">{aside}</div>}
      </div>
      {children}
    </section>
  )
}

/** A row in a big list: oversized title, a line of detail, a date. */
export function BigRow({
  title,
  detail,
  meta,
  href,
}: {
  title: string
  detail?: string
  meta?: string
  href?: string
}) {
  const inner = (
    <div className="border-line grid gap-x-8 gap-y-2 border-t py-6 md:grid-cols-12 md:items-baseline md:py-8">
      <span className="display text-[clamp(2.75rem,7.5vw,8rem)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 md:col-span-7">
        {title}
      </span>
      {detail && (
        <span className="text-ink-soft group-hover:text-ink max-w-[36ch] text-[16px] leading-snug transition-colors md:col-span-4">
          {detail}
        </span>
      )}
      {meta && (
        <span className="label md:col-span-1 md:text-right">{meta}</span>
      )}
    </div>
  )
  return (
    <Fade>
      {href ? (
        <SmartLink href={href} className="group block">
          {inner}
        </SmartLink>
      ) : (
        inner
      )}
    </Fade>
  )
}

/** A small row: date at left, title and line at right. */
export function Line({
  date,
  title,
  detail,
  right,
  href,
}: {
  date?: string
  title: string
  detail?: string
  right?: string
  href?: string
}) {
  const aside = right || href
  const span = date
    ? aside
      ? 'md:col-span-8'
      : 'md:col-span-10'
    : aside
      ? 'md:col-span-10'
      : 'md:col-span-12'
  const inner = (
    <div className="border-line grid gap-x-8 gap-y-1 border-t py-4 md:grid-cols-12">
      {date && <p className="label md:col-span-2 md:pt-1">{date}</p>}
      <div className={span}>
        <p className="text-ink text-[18px] leading-snug font-medium md:text-[20px]">
          {title}
        </p>
        {detail && (
          <p className="text-ink-soft mt-1 max-w-[62ch] text-[15px] leading-snug">
            {detail}
          </p>
        )}
      </div>
      {aside && (
        <p className="label md:col-span-2 md:pt-1 md:text-right">
          {right ?? '→'}
        </p>
      )}
    </div>
  )
  return href ? (
    <SmartLink href={href} className="hover:bg-bg-elevated block">
      {inner}
    </SmartLink>
  ) : (
    inner
  )
}

/** Sub-page opener: the page name, as big as it will go. */
export function PageHead({
  title,
  standfirst,
  contents,
}: {
  title: string
  standfirst?: string
  contents?: { label: string; href: string }[]
}) {
  return (
    <section className="section-max section-pad pt-28 pb-16 md:pt-36 md:pb-24">
      <h1>
        <Rise now>
          <span className="display block text-[clamp(5.5rem,24vw,26rem)] leading-[0.8]">
            {title}
          </span>
        </Rise>
      </h1>
      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
        {contents && (
          <nav
            aria-label="Contents"
            className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] md:col-span-5 md:flex-col"
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
        {standfirst && (
          <Fade delay={0.25} className="md:col-span-7 md:col-start-6">
            <p className="display-soft text-[clamp(1.5rem,2.6vw,2.4rem)]">
              {standfirst}
            </p>
          </Fade>
        )}
      </div>
    </section>
  )
}

/** Closing link to the next page, set big. */
export function Next({ href, label }: { href: string; label: string }) {
  return (
    <section className="section-max section-pad pb-20 md:pb-28">
      <Link href={href} className="group border-ink block border-t pt-6">
        <span className="label">next</span>
        <span className="display mt-3 block text-[clamp(3.5rem,12vw,12rem)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
          {label} →
        </span>
      </Link>
    </section>
  )
}
