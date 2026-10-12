import Image from 'next/image'
import { Fade, Next, PageHead, Rise, SmartLink } from '@/components/beats'
import { PianoRoll } from '@/components/viz/piano-roll'
import { IMAGE_SIZES } from '@/app/image-sizes'
import { SCRIBE_SCREENS, STUDIOUS_SCREENS } from '@/app/screens'
import { NOTES, PROJECT_KIND_LABEL, PROJECTS, type Project } from '../data'

type Shot = { src: string; alt: string; label: string }

const NOTE_KEY: Record<string, keyof typeof NOTES> = {
  project1: 'studious',
  project2: 'scribe',
  'project-notate': 'notate',
}

const shot = (src: string, label: string, alt = label): Shot => ({
  src,
  alt,
  label,
})

const SHOTS: Record<string, Shot[]> = {
  project1: STUDIOUS_SCREENS,
  project2: [
    ...SCRIBE_SCREENS,
    shot(
      '/media/hackathons/hackharvard-china.jpg',
      'on stage, HackHarvard China 2025',
      'Presenting Scribe on stage at HackHarvard China',
    ),
  ],
  'project-foundry': [
    shot('/media/projects/foundry/landing.jpg', 'start from a sentence'),
    shot('/media/projects/foundry/brief.jpg', 'the product brief'),
    shot('/media/projects/foundry/cad.jpg', 'mechanical CAD'),
    shot('/media/projects/foundry/pcb.jpg', 'the PCB workspace'),
    shot('/media/projects/foundry/firmware.jpg', 'firmware in the editor'),
    shot('/media/projects/foundry/renders.jpg', 'product renders'),
    shot('/media/projects/foundry/storefront.jpg', 'the storefront editor'),
  ],
  'project-nomad': [
    shot('/media/projects/nomad/calendar.jpg', 'the week'),
    shot('/media/projects/nomad/plan.jpg', 'a plan as a prerequisite graph'),
    shot('/media/projects/nomad/feed.jpg', 'the feed'),
    shot('/media/projects/nomad/group.jpg', 'a community page'),
    shot('/media/projects/nomad/communities.jpg', 'communities'),
    shot('/media/projects/nomad/courses.jpg', 'courses and classmates'),
  ],
  project3: [
    shot(
      '/media/projects/synapse/chat.jpg',
      'text messages, with the emotion read',
    ),
    shot(
      '/media/projects/synapse/voice.jpg',
      'voice messages and their emotion',
    ),
    shot('/media/projects/synapse/emotion.jpg', 'emotion per message'),
    shot('/media/projects/synapse/heatmap.jpg', 'an emotion heatmap'),
    shot('/media/projects/synapse/group.jpg', 'group and direct messages'),
    shot(
      '/media/hackathons/hackharvard-2025.jpg',
      'the team at HackHarvard 2025, Cambridge MA',
    ),
  ],
  project4: [
    shot('/media/projects/hive/explore.jpg', 'exploring study groups'),
    shot('/media/projects/hive/overview.jpg', 'a group overview'),
    shot('/media/projects/hive/group.jpg', 'group chat'),
    shot('/media/projects/hive/chat.jpg', 'the assistant in a group'),
  ],
}

function linkLabel(href: string) {
  if (href.includes('youtu')) return 'demo'
  if (href.includes('github')) return 'source'
  return 'live site'
}

function Gallery({ p }: { p: Project }) {
  if (p.id === 'project-notate')
    return (
      <figure className="md:max-w-[58rem]">
        <PianoRoll className="aspect-[21/9] w-full" />
        <figcaption className="label mt-2">
          a sketched phrase in ink; the model’s continuation in amber
        </figcaption>
      </figure>
    )
  const shots = SHOTS[p.id] ?? []
  if (!shots.length) return null
  return (
    <div className="-mx-[clamp(1.5rem,5vw,4rem)] overflow-x-auto px-[clamp(1.5rem,5vw,4rem)] pb-3 [scrollbar-width:thin]">
      <ul className="flex snap-x snap-mandatory gap-3 [--tile-h:clamp(11rem,40vw,14rem)] md:[--tile-h:clamp(14rem,20vw,19rem)]">
        {shots.map((s) => {
          const [w, h] = IMAGE_SIZES[s.src] ?? [16, 10]
          return (
            <li
              key={s.src}
              className="shrink-0 snap-start"
              style={{ width: `calc(var(--tile-h) * ${w / h})` }}
            >
              <a
                href={s.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <figure>
                  <div
                    className="bg-mist relative overflow-hidden"
                    style={{ aspectRatio: `${w} / ${h}` }}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 80vw, 36vw"
                    />
                  </div>
                  <figcaption className="label mt-2">{s.label}</figcaption>
                </figure>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function WorkPage() {
  return (
    <>
      <PageHead
        title="Work"
        standfirst="Two companies, a handful of hackathon builds and two longer research projects — what each one is, what Alan did, and what came of it."
        contents={PROJECTS.map((p) => ({ label: p.name, href: `#${p.id}` }))}
      />

      {PROJECTS.map((p, i) => {
        const key = NOTE_KEY[p.id]
        const paragraphs = key ? NOTES[key] : [p.description]
        const links = [
          { href: p.link, label: linkLabel(p.link) },
          p.devpost && { href: p.devpost, label: 'devpost' },
          p.repo && p.repo !== p.link && { href: p.repo, label: 'source' },
        ].filter(Boolean) as { href: string; label: string }[]
        return (
          <article
            key={p.id}
            id={p.id}
            className="section-max section-pad scroll-mt-16 py-12 md:py-20"
          >
            <div className="border-ink flex items-baseline justify-between gap-6 border-t pt-4">
              <p className="label">
                {String(i + 1).padStart(2, '0')} ·{' '}
                {p.kind ? PROJECT_KIND_LABEL[p.kind] : 'build'}
              </p>
              <p className="label">{p.timeframe}</p>
            </div>
            <h2 className="mt-6 md:mt-8">
              <Rise>
                <span className="display block text-[clamp(3rem,7vw,7rem)]">
                  {p.name}
                </span>
              </Rise>
            </h2>

            <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12">
              <Fade className="md:col-span-4">
                {p.outcome && (
                  <p className="text-ink text-[18px] leading-snug font-medium">
                    {p.outcome}
                  </p>
                )}
                <p className="label mt-2">
                  {p.role}
                  {p.tags ? ` · ${p.tags.join(', ')}` : ''}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
                  {links.map((l) => (
                    <SmartLink
                      key={l.href}
                      href={l.href}
                      className="text-ink hover-line"
                    >
                      {l.label} →
                    </SmartLink>
                  ))}
                </div>
              </Fade>
              <Fade className="md:col-span-7 md:col-start-6" delay={0.1}>
                {paragraphs.map((para, j) => (
                  <p
                    key={j}
                    className="text-ink-soft max-w-[62ch] text-[17px] leading-relaxed [&+&]:mt-3"
                  >
                    {para}
                  </p>
                ))}
                {!key && p.points && p.points.length > 0 && (
                  <ul className="mt-5">
                    {p.points.map((point) => (
                      <li
                        key={point}
                        className="border-line text-ink border-t py-2 text-[15px] leading-snug"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </Fade>
            </div>

            <div className="mt-10 md:mt-12">
              <Gallery p={p} />
            </div>
          </article>
        )
      })}

      <Next href="/path" label="Record" />
    </>
  )
}
