'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'
import { easeSnap } from '@/components/portfolio-motion'

export type WorldFact = { label: string; value: string }

export function WorldPanel({
  href,
  index,
  title,
  lede,
  facts = [],
  image,
  imagePosition = 'center',
  previews = [],
  cta = 'Enter',
  invert = false,
  flip = false,
}: {
  href: string
  index: string
  title: string
  lede?: string
  facts?: WorldFact[]
  image: string
  imagePosition?: string
  previews?: { src: string; position?: string }[]
  cta?: string
  invert?: boolean
  flip?: boolean
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const mainY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const aY = useTransform(scrollYProgress, [0, 1], ['8%', '-10%'])
  const bY = useTransform(scrollYProgress, [0, 1], ['-6%', '12%'])

  const shots = [
    { src: image, position: imagePosition },
    ...previews.filter((p) => p.src !== image),
  ].slice(0, 3)

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden border-b ${
        invert ? 'border-white/10 bg-ink' : 'border-line bg-bg'
      }`}
    >
      <Link href={href} className="group block md:pl-16 lg:pl-[4.5rem]">
        <div className="grid md:grid-cols-12">
          {/* Copy — spans must live on the grid child */}
          <motion.div
            className={`flex flex-col justify-center px-5 py-12 sm:px-8 md:col-span-5 md:px-8 md:py-16 lg:col-span-4 lg:px-10 ${
              flip ? 'md:order-2' : ''
            } ${invert ? 'bg-ink text-white' : 'bg-bg text-ink'}`}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: easeSnap }}
          >
            <p className="font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.28em] text-accent uppercase">
              {index}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.5vw,3.4rem)] leading-none font-extrabold tracking-[-0.03em] uppercase">
              {title}
            </h2>
            {lede && (
              <p
                className={`mt-4 text-sm leading-relaxed md:text-base ${
                  invert ? 'text-white/75' : 'text-ink-soft'
                }`}
              >
                {lede}
              </p>
            )}
            {facts.length > 0 && (
              <ul
                className={`mt-6 space-y-2.5 border-t pt-5 ${
                  invert ? 'border-white/15' : 'border-line'
                }`}
              >
                {facts.map((f) => (
                  <li
                    key={f.label + f.value}
                    className="flex items-baseline gap-4 text-sm"
                  >
                    <span
                      className={`w-24 shrink-0 text-[10px] tracking-[0.16em] uppercase ${
                        invert ? 'text-white/45' : 'text-ink-faint'
                      }`}
                    >
                      {f.label}
                    </span>
                    <span
                      className={`font-medium ${
                        invert ? 'text-white' : 'text-ink'
                      }`}
                    >
                      {f.value}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-accent uppercase">
              {cta}
              <span aria-hidden>→</span>
            </span>
          </motion.div>

          {/* Gallery fills the remaining columns */}
          <div
            className={`grid min-h-[50vh] grid-cols-2 grid-rows-2 md:col-span-7 md:min-h-[85svh] lg:col-span-8 ${
              flip ? 'md:order-1' : ''
            }`}
          >
            <div className="relative col-span-2 overflow-hidden md:col-span-1 md:row-span-2">
              <motion.div
                className="absolute inset-0 scale-110"
                style={reduce ? undefined : { y: mainY }}
              >
                <Image
                  src={shots[0].src}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: shots[0].position ?? 'center' }}
                  sizes="(max-width: 768px) 100vw, 42vw"
                  priority
                />
              </motion.div>
            </div>

            <div className="relative overflow-hidden">
              {shots[1] && (
                <motion.div
                  className="absolute inset-0 scale-110"
                  style={reduce ? undefined : { y: aY }}
                >
                  <Image
                    src={shots[1].src}
                    alt=""
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: shots[1].position ?? 'center',
                    }}
                    sizes="25vw"
                  />
                </motion.div>
              )}
            </div>

            <div className="relative overflow-hidden">
              {shots[2] && (
                <motion.div
                  className="absolute inset-0 scale-110"
                  style={reduce ? undefined : { y: bY }}
                >
                  <Image
                    src={shots[2].src}
                    alt=""
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: shots[2].position ?? 'center',
                    }}
                    sizes="25vw"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
