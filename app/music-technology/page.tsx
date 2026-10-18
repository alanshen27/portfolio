import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SmartLink } from '@/components/beats'
import { PortfolioAudio } from '@/components/portfolio-audio'
import { PORTFOLIO_WORKS } from './works'

const title = 'Music & Technology'
const description =
  'Selected work by Alan Shen: Regrets, an original song; inkform 拳墨, movement turned into music; and 問答 Wèndá — Call & Blossom, a musical dialogue with notate.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/music-technology' },
  openGraph: {
    title: `${title} | Alan Shen`,
    description,
    url: '/music-technology',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: `${title} | Alan Shen`,
    description,
    images: [],
  },
}

export default function MusicTechnologyPage() {
  return (
    <div className="music-portfolio">
      <section className="section-max section-pad pt-28 pb-12 md:pt-36 md:pb-20">
        <p className="text-ink-soft text-sm">Alan Shen / selected work</p>
        <h1 className="display mt-8 text-[clamp(3rem,14vw,12rem)]">
          Music &amp;
          <br />
          technology.
        </h1>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-12">
          <p className="text-ink-soft text-sm md:col-span-4">
            Songwriting, movement &amp; interaction
            <br />
            Three selected works
          </p>
          <div className="md:col-span-8">
            <p className="display-soft max-w-[30ch] text-[clamp(1.5rem,2.8vw,2.75rem)]">
              Writing a song. Moving into sound. Making music through a
              dialogue.
            </p>
            <p className="text-ink-soft mt-5 max-w-[58ch] text-base leading-relaxed">
              These three works explore different ways of creating music: a song
              I wrote, produced, and mixed; martial arts movement translated
              into music; and a visual landscape where a cursor-led call
              receives a response from notate.
            </p>
          </div>
        </div>
        <nav
          aria-label="Selected works"
          className="border-line mt-10 border-t md:mt-14"
        >
          {PORTFOLIO_WORKS.map((work, index) => (
            <a
              key={work.id}
              href={`#${work.id}`}
              className="group border-line grid grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-3 border-b py-5 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-6"
            >
              <span className="text-accent text-sm">0{index + 1}</span>
              <span className="text-xl font-medium md:text-2xl">
                {work.title}
                {work.originalTitle && (
                  <>
                    {' '}
                    <span lang="zh">{work.originalTitle}</span>
                  </>
                )}
                {work.pronunciation && (
                  <>
                    {' '}
                    <i>{work.pronunciation}</i>
                  </>
                )}
                {work.subtitle && (
                  <span className="text-ink-soft mt-1 block text-sm font-normal">
                    {work.subtitle}
                  </span>
                )}
              </span>
              <span className="text-ink-soft col-start-2 text-sm md:col-start-auto">
                {work.summary}
              </span>
              <span
                aria-hidden
                className="col-start-3 row-start-1 transition-transform group-hover:translate-x-1 md:col-start-auto md:row-start-auto"
              >
                ↗
              </span>
            </a>
          ))}
        </nav>
      </section>

      {PORTFOLIO_WORKS.map((work, index) => (
        <section
          key={work.id}
          id={work.id}
          aria-labelledby={`${work.id}-title`}
          className="section-max section-pad scroll-mt-20 py-12 md:py-20"
        >
          <div className="border-ink border-t pt-6">
            <p className="text-ink-soft text-sm">
              0{index + 1} / {work.category}
            </p>
            <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-12">
              <div className="min-w-0 md:col-span-5">
                <h2
                  id={`${work.id}-title`}
                  className="display-soft text-[clamp(3rem,7vw,7rem)]"
                >
                  {work.title}
                  {work.originalTitle && (
                    <span lang="zh" className="mt-3 block text-[0.6em]">
                      {work.originalTitle}
                    </span>
                  )}
                  {work.pronunciation && (
                    <i className="mt-3 block text-[0.6em]">
                      {work.pronunciation}
                    </i>
                  )}
                  {work.subtitle && (
                    <span className="mt-5 block text-2xl tracking-normal md:text-3xl">
                      — {work.subtitle}
                    </span>
                  )}
                </h2>
                <dl className="mt-8 space-y-4 text-sm">
                  {work.details.map((detail) => (
                    <div key={detail.label}>
                      <dt className="text-ink-soft">{detail.label}</dt>
                      <dd className="mt-1 leading-relaxed">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="min-w-0 md:col-span-7">
                <p className="display-soft max-w-[30ch] text-2xl md:text-3xl">
                  {work.summary}
                </p>
                <p className="text-ink-soft mt-5 max-w-[60ch] text-base leading-relaxed">
                  {work.description}
                </p>
                {work.image && (
                  <figure className="mt-8">
                    <div className="bg-mist relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={work.image.src}
                        alt={work.image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-contain"
                      />
                    </div>
                  </figure>
                )}
                {work.audio && (
                  <PortfolioAudio title={work.title} src={work.audio} />
                )}
                {(work.audio || work.links?.length) && (
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    {work.links?.map((link) => (
                      <SmartLink
                        key={link.href}
                        href={link.href}
                        className="rule-link"
                      >
                        {link.label} ↗
                      </SmartLink>
                    ))}
                    {work.audio && (
                      <a href={work.audio} download className="rule-link">
                        Download audio ↓
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            {work.process && (
              <div className="bg-ink text-bg mt-10 p-6 md:mt-14 md:p-10">
                <p className="text-sm text-white/60">
                  Call &amp; Blossom / the interaction
                </p>
                <ol className="mt-7 grid gap-8 md:grid-cols-3">
                  {work.process.map((step, stepIndex) => (
                    <li
                      key={step.title}
                      className="border-t border-white/25 pt-4"
                    >
                      <span className="text-accent-bright text-sm">
                        0{stepIndex + 1}
                      </span>
                      <h3 className="mt-4 text-2xl font-medium">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/75">
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="section-max section-pad pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="border-line flex flex-wrap gap-x-6 gap-y-3 border-t pt-8 text-sm">
          <Link href="/music" className="rule-link">
            More music &amp; performance →
          </Link>
          <Link href="/work" className="rule-link">
            More projects →
          </Link>
        </div>
      </section>
    </div>
  )
}
