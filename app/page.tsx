'use client'

import Image from 'next/image'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'
import { Magnetic } from '@/components/ui/magnetic'
import {
  ClipImage,
  CropFrame,
  DrawLine,
  Marquee,
  Reveal,
  SplitChars,
  SplitWords,
  Stagger,
  StaggerItem,
  easeOut,
} from '@/components/portfolio-motion'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  EDUCATION,
  AWARDS,
  PUBLICATIONS,
  VOLUNTEERING,
  SKILLS,
  CERTIFICATIONS,
  EMAIL,
  SOCIAL_LINKS,
  SUMMARY,
  TAGLINE,
  NAME,
  LOCATION,
  ROLE,
} from './data'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      className="mb-4 text-xs font-medium tracking-[0.18em] text-accent uppercase"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      {children}
    </motion.p>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imageY }}
      >
        <Image
          src="/banner.jpg"
          alt="Alan Shen performing violin on stage"
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, rgba(8,14,22,0.88) 0%, rgba(8,14,22,0.62) 38%, rgba(8,14,22,0.35) 72%, rgba(8,14,22,0.2) 100%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />

      {/* Aperture frame */}
      <div className="pointer-events-none absolute inset-6 border border-white/15 md:inset-10" />
      <motion.div
        className="pointer-events-none absolute top-6 left-6 h-10 w-10 border-t border-l border-white/55 md:top-10 md:left-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
      />
      <motion.div
        className="pointer-events-none absolute top-6 right-6 h-10 w-10 border-t border-r border-white/55 md:top-10 md:right-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.28, ease: easeOut }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b border-l border-white/55 md:bottom-10 md:left-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.36, ease: easeOut }}
      />
      <motion.div
        className="pointer-events-none absolute right-6 bottom-6 h-10 w-10 border-r border-b border-white/55 md:right-10 md:bottom-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.44, ease: easeOut }}
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="section-max section-pad relative flex min-h-[100svh] flex-col justify-end pb-28 pt-28 md:pb-36"
      >
        <div className="relative z-10 max-w-3xl">
          <motion.p
            className="mb-4 text-sm tracking-[0.14em] text-white/75 uppercase"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
          >
            {ROLE} · {LOCATION}
          </motion.p>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.6rem,11vw,7.5rem)] leading-[0.9] font-extrabold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
            <SplitChars text={NAME} delay={0.25} />
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">
            <SplitWords text={TAGLINE} delay={0.55} />
          </p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: easeOut }}
          >
            <Magnetic intensity={0.25} range={80}>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-mist"
              >
                Get in touch
              </a>
            </Magnetic>
            <Magnetic intensity={0.2} range={80}>
              <a
                href="#work"
                className="inline-flex items-center border border-white/55 bg-black/20 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/15"
              >
                View selected work
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="absolute right-6 bottom-10 hidden items-center gap-3 text-xs tracking-[0.2em] text-white/55 uppercase md:flex"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span>Scroll</span>
          <motion.span
            className="block h-10 w-px bg-white/45"
            animate={reduce ? undefined : { scaleY: [0.35, 1, 0.35], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProjectBlock({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number]
  index: number
}) {
  const flip = index % 2 === 1
  const direction = flip ? 'right' : 'left'
  const fills = ['mist', 'lake', 'wash'] as const

  return (
    <article className="relative py-2">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid min-w-0 items-center gap-8 lg:grid-cols-12 lg:gap-10"
      >
        <CropFrame
          className={`min-w-0 p-3 sm:p-4 lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
          tone="accent"
          fill={fills[index % fills.length]}
        >
          <ClipImage
            direction={direction}
            className="relative aspect-[16/10] bg-bg-elevated"
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </ClipImage>
        </CropFrame>

        <Reveal
          className={`min-w-0 lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}
          delay={0.12}
        >
          <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight break-words text-ink md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
            {project.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
            Visit project
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </Reveal>
      </a>
    </article>
  )
}

export default function Home() {
  const featured = PROJECTS.slice(0, 3)
  const moreProjects = PROJECTS.slice(3)
  const techWork = WORK_EXPERIENCE.filter(
    (w) => w.company !== 'Institut Le Rosey',
  )
  const swimming = WORK_EXPERIENCE.find(
    (w) => w.company === 'Institut Le Rosey',
  )
  const reduce = useReducedMotion()

  return (
    <>
      <ScrollProgress />
      <Hero />

      {/* Work */}
      <section id="work" className="scroll-mt-20 overflow-x-clip bg-bg py-16 md:py-24">
        <div className="section-max section-pad">
          <Reveal>
            <CropFrame
              fill="mist"
              tone="accent"
              className="panel-bokeh px-8 py-10 md:px-14 md:py-14"
            >
              <SectionLabel>Selected work</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] max-w-2xl text-4xl font-semibold tracking-tight break-words text-ink md:text-5xl">
                Products and prototypes{' '}
                <span className="text-accent">built for learning.</span>
              </h2>
            </CropFrame>
          </Reveal>

          <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
            {featured.map((project, index) => (
              <ProjectBlock
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {moreProjects.length > 0 && (
            <Reveal className="mt-20">
              <CropFrame fill="lake" tone="accent" className="p-6 md:p-8">
                <p className="mb-2 text-sm tracking-[0.16em] text-ink-faint uppercase">
                  Also built
                </p>
                <Stagger stagger={0.1}>
                  {moreProjects.map((project) => (
                    <StaggerItem key={project.id}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-w-0 flex-col gap-1 border-b border-line/80 py-7 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                      >
                        <span className="font-[family-name:var(--font-display)] text-xl font-semibold break-words text-ink transition-colors group-hover:text-accent">
                          {project.name}
                        </span>
                        <span className="max-w-xl text-sm text-ink-soft sm:text-right">
                          {project.description}
                        </span>
                      </a>
                    </StaggerItem>
                  ))}
                </Stagger>
              </CropFrame>
            </Reveal>
          )}
        </div>
      </section>

      {/* Path */}
      <section
        id="path"
        className="scroll-mt-20 overflow-x-clip border-t border-line bg-bg-elevated py-16 md:py-24"
      >
        <div className="section-max section-pad">
          <Reveal>
            <CropFrame fill="wash" tone="accent" className="px-6 py-8 md:px-10 md:py-10">
              <SectionLabel>Path</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] max-w-2xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Founding, building, and competing.
              </h2>
            </CropFrame>
          </Reveal>

          <div className="relative mt-12">
            <DrawLine className="absolute top-2 bottom-2 left-[7px] hidden w-px md:block" />

            <div className="divide-y divide-line">
              {techWork.map((job, index) => (
                <Reveal key={job.id} delay={index * 0.05}>
                  <article className="group relative grid gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-12">
                    <div className="absolute top-12 left-0 z-10 hidden md:block">
                      <motion.span
                        className="block h-4 w-4 rounded-full border-2 border-accent bg-bg-elevated"
                        initial={reduce ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1, ease: easeOut }}
                      />
                    </div>

                    <div className="relative z-10 md:col-span-4 md:pl-10">
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-accent">
                        {job.company}
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft">{job.title}</p>
                      <p className="mt-3 text-sm text-ink-faint">
                        {job.start} – {job.end}
                        {job.location ? ` · ${job.location}` : ''}
                      </p>
                      {job.link && (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block text-sm font-medium text-accent hover:text-accent-deep"
                        >
                          Visit →
                        </a>
                      )}
                    </div>

                    <Stagger
                      className="relative z-10 space-y-2.5 md:col-span-8"
                      delay={0.08}
                      stagger={0.05}
                    >
                      {job.bullets?.map((bullet) => (
                        <StaggerItem key={bullet}>
                          <p className="relative pl-4 text-base leading-relaxed text-ink-soft before:absolute before:top-[0.7em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-accent">
                            {bullet}
                          </p>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {swimming && (
            <Reveal className="mt-10">
              <CropFrame fill="mist" tone="accent" className="panel-bokeh p-6 md:p-10">
                <div className="grid gap-4 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-4">
                    <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
                      Athletics
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink">
                      Competitive Swimming
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">
                      {swimming.title}
                    </p>
                    <p className="mt-3 text-sm text-ink-faint">
                      {swimming.start} – {swimming.end}
                      {swimming.location ? ` · ${swimming.location}` : ''}
                    </p>
                  </div>
                  <Stagger
                    className="grid gap-3 sm:grid-cols-2 md:col-span-8"
                    stagger={0.06}
                  >
                    {swimming.bullets?.slice(0, 6).map((bullet) => (
                      <StaggerItem key={bullet}>
                        <p className="border-l-2 border-accent/40 pl-3 text-sm leading-relaxed text-ink-soft">
                          {bullet}
                        </p>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </CropFrame>
            </Reveal>
          )}
        </div>
      </section>

      {/* Recognition */}
      <section
        id="recognition"
        className="scroll-mt-20 overflow-x-clip border-t border-line bg-bg py-16 md:py-24"
      >
        <div className="section-max section-pad">
          <Reveal>
            <CropFrame
              fill="lake"
              tone="accent"
              className="px-8 py-8 md:px-12 md:py-10"
            >
              <SectionLabel>Recognition</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] max-w-2xl text-4xl font-semibold tracking-tight break-words text-ink md:text-5xl">
                Awards, research, and honors.
              </h2>
            </CropFrame>
          </Reveal>

          <div className="relative mt-12 grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-8">
            <CropFrame
              fill="white"
              tone="accent"
              marks="all"
              className="min-w-0 p-1 lg:col-span-7"
            >
              <ul>
                {AWARDS.map((award) => (
                  <li
                    key={award.id}
                    className="group flex min-w-0 items-start gap-4 border-b border-line px-5 py-5 last:border-b-0 md:gap-5 md:px-6 md:py-6"
                  >
                    {award.image && (
                      <div className="relative mt-0.5 h-11 w-11 shrink-0 overflow-hidden bg-panel-wash">
                        <Image
                          src={award.image}
                          alt=""
                          fill
                          className="object-contain p-1"
                          sizes="44px"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-semibold break-words text-accent">
                          {award.title}
                        </h3>
                        {award.date && (
                          <span className="shrink-0 text-sm text-ink-faint">
                            {award.date}
                          </span>
                        )}
                      </div>
                      {award.description && (
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CropFrame>

            <div className="min-w-0 space-y-8 lg:col-span-5 lg:pt-10">
              <Reveal delay={0.08}>
                <CropFrame
                  fill="mist"
                  tone="accent"
                  marks="bl"
                  className="p-6 md:p-7"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                    Publications
                  </h3>
                  <ul className="mt-5 space-y-5">
                    {PUBLICATIONS.map((pub) => (
                      <li key={pub.id} className="min-w-0">
                        <p className="font-medium break-words text-ink">
                          {pub.title}
                        </p>
                        {pub.description && (
                          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                            {pub.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </CropFrame>
              </Reveal>

              <Reveal delay={0.14}>
                <CropFrame
                  fill="wash"
                  tone="accent"
                  marks="tr"
                  className="p-6 md:p-7"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                    Volunteering
                  </h3>
                  <ul className="mt-5 space-y-5">
                    {VOLUNTEERING.map((v) => (
                      <li key={v.id} className="min-w-0">
                        <p className="font-medium break-words text-ink">
                          {v.role} · {v.organization}
                        </p>
                        <p className="mt-1 text-sm text-ink-faint">
                          {v.start} – {v.end}
                          {v.cause ? ` · ${v.cause}` : ''}
                        </p>
                        {v.description && (
                          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                            {v.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </CropFrame>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* About + Connect */}
      <section
        id="about"
        className="scroll-mt-20 border-t border-line bg-bg-elevated py-24 md:py-32"
      >
        <div className="section-max section-pad">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <SectionLabel>About</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                <span className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: '100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: easeOut }}
                  >
                    Student at Le Rosey.
                  </motion.span>
                </span>
                <br />
                <span className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: '100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
                  >
                    Builder everywhere else.
                  </motion.span>
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {SUMMARY}
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-medium tracking-[0.18em] text-ink-faint uppercase">
                    Education
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {EDUCATION.map((edu) => (
                      <li key={edu.id}>
                        <p className="font-medium text-ink">{edu.institution}</p>
                        <p className="text-sm text-ink-soft">
                          {edu.degree} · {edu.start} – {edu.end}
                        </p>
                        {edu.location && (
                          <p className="text-sm text-ink-faint">
                            {edu.location}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-medium tracking-[0.18em] text-ink-faint uppercase">
                    Certifications
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {CERTIFICATIONS.map((cert) => (
                      <li key={cert.id} className="text-sm text-ink-soft">
                        <span className="font-medium text-ink">{cert.name}</span>
                        {cert.issuer ? ` — ${cert.issuer}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.08}>
              <CropFrame
                fill="ink"
                tone="white"
                className="scroll-mt-24 p-8 md:p-10"
              >
                <div id="connect">
                  <p className="mb-4 text-xs font-medium tracking-[0.18em] text-lake uppercase">
                    Connect
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
                    Open to research, startups, and ambitious builds.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    Reach out anytime — collaborations, questions, or just a
                    hello.
                  </p>
                  <div>
                    <Magnetic intensity={0.2} range={90}>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="mt-8 inline-flex items-center bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-mist"
                      >
                        {EMAIL}
                      </a>
                    </Magnetic>
                  </div>
                  <ul className="mt-8 space-y-1 border-t border-white/15 pt-8">
                    {SOCIAL_LINKS.filter((l) => l.label !== 'Email').map(
                      (link, i) => (
                        <motion.li
                          key={link.label}
                          initial={reduce ? false : { opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.1 + i * 0.06,
                            duration: 0.45,
                            ease: easeOut,
                          }}
                        >
                          <a
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between py-2 text-sm text-white/70 transition-colors hover:text-white"
                          >
                            <span>{link.label}</span>
                            <span
                              aria-hidden
                              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                            >
                              →
                            </span>
                          </a>
                        </motion.li>
                      ),
                    )}
                  </ul>
                </div>
              </CropFrame>
            </Reveal>
          </div>
        </div>

        <div className="mt-20">
          <Marquee items={SKILLS.map((s) => s.name)} />
        </div>
      </section>
    </>
  )
}
