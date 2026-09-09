'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { SplitChars, easeOut } from '@/components/portfolio-motion'

export function PageHero({
  kicker,
  title,
  description,
  image,
  imagePosition = 'center 30%',
  video,
}: {
  kicker: string
  title: string
  description?: string
  image?: string
  imagePosition?: string
  /** Optional muted background loop — image is used as poster/fallback */
  video?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  const showVideo = video && !reduce

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#050607] pt-28 pb-12 text-white md:pt-32 md:pb-14"
    >
      {showVideo ? (
        <motion.div
          className="absolute inset-0 scale-125"
          style={reduce ? undefined : { y: imageY }}
        >
          <video
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="h-full w-full object-cover opacity-28"
            style={{ objectPosition: imagePosition }}
          />
        </motion.div>
      ) : (
        image && (
          <motion.div
            className="absolute inset-0 scale-105"
            style={reduce ? undefined : { y: imageY }}
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              className="object-cover opacity-35"
              style={{ objectPosition: imagePosition }}
              sizes="100vw"
            />
          </motion.div>
        )
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-[#050607]/60 to-[#050607]/35" />
      <div className="aurora opacity-50" aria-hidden />

      <div className="section-max section-pad relative z-10">
        <motion.p
          className="eyebrow text-accent-bright"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          {kicker}
        </motion.p>

        <h1 className="display-quiet mt-4 max-w-4xl text-[clamp(2.2rem,5.5vw,4rem)]">
          <SplitChars text={title} delay={0.12} />
        </h1>

        {description && (
          <motion.p
            className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-white/70 italic md:text-xl"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: easeOut }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
