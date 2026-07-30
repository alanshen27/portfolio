'use client'

import Image from 'next/image'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'
import { MegaTicker } from '@/components/mega-ticker'
import {
  AnimatedCorners,
  SplitChars,
  SplitWords,
  easeSnap,
} from '@/components/portfolio-motion'

export function PageHero({
  label,
  title,
  titleLine2,
  description,
  image,
  ticker,
}: {
  label: string
  title: string
  titleLine2?: string
  description?: string
  image?: string
  ticker?: string[]
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-line bg-ink pt-20 pb-0 text-white md:pt-24 md:pl-16 lg:pl-[4.5rem]"
    >
      {image && (
        <>
          <motion.div
            className="absolute inset-0 scale-110"
            style={reduce ? undefined : { y: imageY }}
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              className="object-cover object-[center_22%]"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </>
      )}

      <AnimatedCorners tone="accent" inset="1.5rem" />

      <motion.div
        className="relative z-10 px-5 pb-10 sm:px-8 md:px-10 md:pb-14 lg:px-12"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="mb-5 text-xs font-medium tracking-[0.28em] text-lake uppercase"
          initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.55, ease: easeSnap }}
        >
          {label}
        </motion.p>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.8rem,12vw,9rem)] leading-[0.85] font-extrabold tracking-[-0.04em] uppercase">
          <span className="block">
            <SplitChars text={title} delay={0.08} />
          </span>
          {titleLine2 && (
            <span className="mt-1 block text-accent">
              <SplitChars text={titleLine2} delay={0.22} />
            </span>
          )}
        </h1>

        {description && (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl">
            <SplitWords text={description} delay={0.45} />
          </p>
        )}
      </motion.div>

      {ticker && ticker.length > 0 && (
        <div className="relative z-10 border-t border-white/10 py-3">
          <MegaTicker items={ticker} tone="white" speed={22} />
        </div>
      )}
    </section>
  )
}
