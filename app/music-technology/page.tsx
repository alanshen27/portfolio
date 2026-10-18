import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SmartLink } from '@/components/beats'
import { PortfolioAudio } from '@/components/portfolio-audio'
import { MUSIC_RELEASES, PROJECTS } from '../data'

const title = 'Music & Technology'
const description =
  'Selected work by Alan Shen: a Transformer music co-writer, a custom synthesizer, and two released singles. Explore the process and listen directly.'

const SELECTED_RELEASES = ['id-stay', 'dreams-of-the-blue'].map(
  (id) => MUSIC_RELEASES.find((release) => release.id === id)!,
)

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/music-technology' },
  openGraph: {
    title: `${title} | Alan Shen`,
    description,
    url: '/music-technology',
    images: [
      { url: '/media/tech/midi.jpg', alt: 'A MIDI keyboard on Alan’s desk' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | Alan Shen`,
    description,
    images: ['/media/tech/midi.jpg'],
  },
}

const PROCESS = [
  {
    title: 'Sketch',
    detail: 'Write a melody or chord progression on the piano roll.',
  },
  {
    title: 'Continue',
    detail: 'A Transformer proposes the next phrase from those notes.',
  },
  {
    title: 'Shape',
    detail: 'Accept or edit the continuation, then build on it again.',
  },
  {
    title: 'Listen',
    detail: 'Play through the custom synthesizer or export a WAV.',
  },
]

// Keep release notes factual until Alan supplies composition and production credits.
const RELEASE_NOTES: Record<string, string> = {
  'id-stay':
    'A single released under Alan Shen’s own name. Presented here as a complete recording, alongside the software project that explores another side of making music.',
  'dreams-of-the-blue':
    'A second single released as Alan Shen. Listen to the full recording below, or open the release page to find it on streaming services.',
}

export default function MusicTechnologyPage() {
  const notate = PROJECTS.find((project) => project.id === 'project-notate')!

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
            Software, sound &amp; recorded music
            <br />
            Three selected works
          </p>
          <div className="md:col-span-8">
            <p className="display-soft max-w-[30ch] text-[clamp(1.5rem,2.8vw,2.75rem)]">
              A phrase to build on. An instrument to hear it through. A song to
              share.
            </p>
            <p className="text-ink-soft mt-5 max-w-[58ch] text-base leading-relaxed">
              I work across music and code: building a co-writer and its
              synthesizer, releasing songs, and performing on violin and piano.
              Here are three works, with the recordings and the process
              together.
            </p>
          </div>
        </div>
        <nav
          aria-label="Selected works"
          className="border-line mt-10 border-t md:mt-14"
        >
          {[
            {
              id: 'notate',
              name: 'notate',
              detail: 'AI co-writer + synthesizer',
            },
            ...SELECTED_RELEASES.map((release) => ({
              id: release.id,
              name: release.title,
              detail: 'Released single · listen here',
            })),
          ].map((work, index) => (
            <a
              key={work.id}
              href={`#${work.id}`}
              className="group border-line grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-b py-5 md:grid-cols-[3rem_1fr_1fr_auto] md:gap-6"
            >
              <span className="text-accent text-sm">0{index + 1}</span>
              <span className="text-xl font-medium md:text-2xl">
                {work.name}
              </span>
              <span className="text-ink-soft col-start-2 text-sm md:col-start-auto">
                {work.detail}
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

      <section
        id="notate"
        aria-labelledby="notate-title"
        className="section-max section-pad scroll-mt-20 py-12 md:py-20"
      >
        <div className="border-ink border-t pt-6">
          <p className="text-ink-soft text-sm">01 / music software</p>
          <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <h2
                id="notate-title"
                className="display text-[clamp(4rem,10vw,9rem)]"
              >
                notate
              </h2>
              <p className="text-ink-soft mt-5 max-w-[24ch] text-lg">
                An AI music co-writer with its own synthesizer.
              </p>
              <dl className="mt-8 space-y-4 text-sm">
                <div>
                  <dt className="text-ink-soft">My role</dt>
                  <dd className="mt-1">Solo developer</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Timeline</dt>
                  <dd className="mt-1">{notate.timeframe}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Tools</dt>
                  <dd className="mt-1 leading-relaxed">
                    {notate.tags?.join(' · ')}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="md:col-span-8">
              <h3 className="text-xl font-medium">
                From a sketch to the next phrase.
              </h3>
              <p className="text-ink-soft mt-4 max-w-[64ch] text-base leading-relaxed">
                Start with a melody or chord progression on a piano roll. A
                decoder-only Transformer continues the phrase; the musician can
                accept, edit, and continue again. The project brings model
                training, an editing interface, and sound synthesis into one
                workflow.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <SmartLink
                  href={notate.repo!}
                  className="bg-ink text-bg inline-flex min-h-12 items-center px-5 py-3 text-sm hover:opacity-80"
                >
                  Source &amp; documentation ↗
                </SmartLink>
              </div>
              <p className="text-ink-soft mt-3 text-sm">
                Explore the implementation and local setup in the project
                repository.
              </p>
            </div>
          </div>

          <div className="bg-ink text-bg mt-10 p-6 md:mt-14 md:p-10">
            <p className="text-sm text-white/60">
              Inside the co-writer / workflow
            </p>
            <ol className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((step, index) => (
                <li key={step.title} className="border-t border-white/25 pt-4">
                  <span className="text-accent-bright text-sm">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-2xl font-medium">{step.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/75">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
            <div>
              <h3 className="text-lg font-medium">The model</h3>
              <p className="text-ink-soft mt-3 text-sm leading-relaxed">
                A roughly 21-million-parameter Transformer: six layers, width
                512, and eight attention heads. MIDI becomes REMI tokens for
                bar, position, pitch, velocity, and duration.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">The instrument</h3>
              <p className="text-ink-soft mt-3 text-sm leading-relaxed">
                A polyphonic subtractive synthesizer written from scratch as a
                Web Audio AudioWorklet. Playback and WAV export use the same
                DSP.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">The interaction</h3>
              <p className="text-ink-soft mt-3 text-sm leading-relaxed">
                The continuation stays editable. A musician can keep a phrase,
                change individual notes, or return to the sketch before asking
                for another continuation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {SELECTED_RELEASES.map((release, index) => (
        <section
          key={release.id}
          id={release.id}
          aria-labelledby={`${release.id}-title`}
          className="section-max section-pad scroll-mt-20 py-12 md:py-20"
        >
          <div className="border-ink grid gap-8 border-t pt-6 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="text-ink-soft text-sm">
                0{index + 2} / recorded music
              </p>
              <div className="bg-mist relative mt-6 aspect-square max-w-80 overflow-hidden">
                <Image
                  src={release.cover}
                  alt={`${release.title} cover artwork`}
                  fill
                  sizes="(max-width: 768px) 80vw, 320px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-8 md:pt-11">
              <h2
                id={`${release.id}-title`}
                className="display-soft text-[clamp(2.5rem,6vw,6rem)]"
              >
                {release.title}
              </h2>
              <p className="text-ink-soft mt-4 text-sm">
                {release.artist} · {release.type}
              </p>
              <p className="text-ink-soft mt-6 max-w-[60ch] text-base leading-relaxed">
                {RELEASE_NOTES[release.id]}
              </p>
              {release.audio && (
                <PortfolioAudio title={release.title} src={release.audio} />
              )}
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                {release.hyperfollow && (
                  <SmartLink href={release.hyperfollow} className="rule-link">
                    Release &amp; streaming links ↗
                  </SmartLink>
                )}
                {release.audio && (
                  <a href={release.audio} download className="rule-link">
                    Download audio ↓
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section
        className="section-max section-pad pt-12 pb-24 md:pt-20 md:pb-32"
        aria-labelledby="background-title"
      >
        <div className="border-line grid gap-8 border-t pt-8 md:grid-cols-12 md:gap-12">
          <h2
            id="background-title"
            className="display-soft text-3xl md:col-span-4"
          >
            Behind the work
          </h2>
          <div className="md:col-span-8">
            <p className="text-ink-soft max-w-[60ch] text-base leading-relaxed">
              ABRSM Grade 8 on violin and piano, with experience in orchestral
              and solo performance. That musical practice sits alongside the
              software and recordings collected here.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/music#stage" className="rule-link">
                Performance &amp; musical background →
              </Link>
              <Link href="/work" className="rule-link">
                More projects →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
