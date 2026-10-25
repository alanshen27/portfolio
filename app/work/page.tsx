import Image from 'next/image'
import { Fade, Next, PageHead, Rise, SmartLink } from '@/components/beats'
import { ScrollRow } from '@/components/scroll-row'
import { PianoRoll } from '@/components/viz/piano-roll'
import { IMAGE_SIZES } from '@/app/image-sizes'
import { SCRIBE_SCREENS, STUDIOUS_SCREENS } from '@/app/screens'
import {
  NOTES,
  PROJECT_KIND_LABEL,
  PROJECTS,
  TAGLINE,
  type Project,
} from '../data'

type Shot = { src: string; alt: string; label: string }

const NOTE_KEY: Record<string, keyof typeof NOTES> = {
  project1: 'studious',
  project2: 'scribe',
  'project-notate': 'notate',
  'project-foundry': 'foundry',
  project3: 'synapse',
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
      'first-place award, HackHarvard China 2025',
      'The Scribe team on stage for the first-place award at HackHarvard China',
    ),
  ],
  'project-foundry': [
    shot('/media/projects/foundry/landing.jpg', 'creating a project'),
    shot('/media/projects/foundry/brief.jpg', 'project brief'),
    shot('/media/projects/foundry/cad.jpg', 'mechanical CAD'),
    shot('/media/projects/foundry/pcb.jpg', 'PCB design'),
    shot('/media/projects/foundry/firmware.jpg', 'firmware editor'),
    shot(
      '/media/projects/foundry/renders.jpg',
      'generating product images and videos',
    ),
    shot('/media/projects/foundry/storefront.jpg', 'storefront editor'),
  ],
  'project-nomad': [
    shot('/media/projects/nomad/calendar.jpg', 'weekly calendar'),
    shot('/media/projects/nomad/plan.jpg', 'course prerequisites'),
    shot('/media/projects/nomad/feed.jpg', 'community feed'),
    shot('/media/projects/nomad/group.jpg', 'community page'),
    shot('/media/projects/nomad/communities.jpg', 'communities'),
    shot('/media/projects/nomad/courses.jpg', 'courses and classmates'),
  ],
  project3: [
    shot(
      '/media/projects/synapse/chat.jpg',
      'group chat with colour-coded messages',
    ),
    shot(
      '/media/projects/synapse/voice.jpg',
      'Voice messages with estimated emotional cues',
    ),
    shot(
      '/media/projects/synapse/emotion.jpg',
      'estimated emotion breakdown for a message',
    ),
    shot('/media/projects/synapse/heatmap.jpg', 'emotion labels on a map'),
    shot('/media/projects/synapse/group.jpg', 'creating a group chat'),
    shot(
      '/media/hackathons/hackharvard-2025.jpg',
      'the team at HackHarvard 2025, Cambridge MA',
    ),
  ],
  project4: [
    shot('/media/projects/hive/explore.jpg', 'study groups to join'),
    shot('/media/projects/hive/overview.jpg', 'study group overview'),
    shot('/media/projects/hive/group.jpg', 'group chat'),
    shot('/media/projects/hive/chat.jpg', 'AI assistant in a study group'),
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
          illustration of a musical phrase and continuation
        </figcaption>
      </figure>
    )
  const shots = SHOTS[p.id] ?? []
  if (!shots.length) return null
  return (
    <ScrollRow
      label={`${p.name} · ${shots.length} images`}
      className="[--tile-h:clamp(11rem,40vw,14rem)] md:[--tile-h:clamp(14rem,20vw,19rem)]"
    >
      {shots.map((s) => {
        const [w, h] = IMAGE_SIZES[s.src] ?? [16, 10]
        return (
          <div
            key={s.src}
            className="shrink-0"
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
          </div>
        )
      })}
    </ScrollRow>
  )
}

export default function WorkPage() {
  return (
    <>
      <PageHead
        title="Work"
        standfirst={TAGLINE}
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

      <Next href="/tech" label="Tech" />
    </>
  )
}
