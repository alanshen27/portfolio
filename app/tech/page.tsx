import Image from 'next/image'
import {
  Block,
  Drift,
  Fade,
  Line,
  Next,
  PageHead,
  Words,
} from '@/components/beats'
import { ScrollRow } from '@/components/scroll-row'
import { Masonry, type Tile } from '@/components/masonry'
import { Media } from '@/components/media'
import { AWARDS, LINES, SKILL_GROUPS, WORK_EXPERIENCE } from '../data'

const VEX = WORK_EXPERIENCE.find((w) => w.id === 'work4')!

const BUILT: { title: string; detail: string; tags: string; href: string }[] = [
  {
    title: 'Studious',
    detail:
      'I work on the Next.js frontend and tRPC backend, with Pusher for live updates and Supabase, Render, and Vercel for hosting and data.',
    tags: 'infrastructure',
    href: '/work#project1',
  },
  {
    title: 'Notate',
    detail:
      'Using AI-assisted programming, I developed a bidirectional, 44.3M-parameter encoder-decoder transformer with eight attention heads and a REMI-style MIDI tokenizer.',
    tags: 'ML · audio',
    href: '/work#project-notate',
  },
  {
    title: 'Foundry',
    detail:
      'I brought an AI assistant, CAD and PCB workspaces, a shared code editor, and storefront tools into one project at Penn ESAP.',
    tags: 'AI · hardware',
    href: '/work#project-foundry',
  },
  {
    title: 'Synapse',
    detail:
      'We experimented with estimating emotional cues from speech and facial expressions, then using those cues in message labels and speech playback.',
    tags: 'speech · vision',
    href: '/work#project3',
  },
  {
    title: 'Scribe',
    detail:
      'I worked with friends on the frontend, backend, and AI study workflows, using feedback from classmates to revise the exercise navigation.',
    tags: 'AI · full-stack',
    href: '/work#project2',
  },
  {
    title: 'Nomad',
    detail:
      'We used prerequisite graphs for course planning and added ways to find classmates and student communities.',
    tags: 'graphs',
    href: '/work#project-nomad',
  },
]

const ROBOT: Tile[][] = [
  [
    {
      src: '/media/loops/driver.jpg',
      video: '/media/vex/driver.mp4',
      alt: 'The VEX robot driving across the field',
      caption: 'driver control',
      ratio: 'aspect-[16/10]',
    },
    {
      src: '/media/tech/robot-build.jpg',
      alt: 'The VEX robot partway through its build',
      caption: 'the robot, mid-build',
      ratio: 'aspect-[3/4]',
    },
    {
      src: '/media/tech/hall.jpg',
      alt: 'A wide, bright competition hall',
      caption: 'the competition hall',
      ratio: 'aspect-[4/3]',
    },
  ],
  [
    {
      src: '/media/tech/check-in.jpg',
      video: '/media/tech/check-in.mp4',
      alt: 'Walking in through team check-in at a VEX competition',
      caption: 'team check-in',
      ratio: 'aspect-[16/9]',
    },
    {
      src: '/media/tech/gear.jpg',
      alt: 'A red drive gear held up to the camera',
      caption: 'a drive gear',
      ratio: 'aspect-[3/4]',
    },
    {
      src: '/media/tech/robot-close.jpg',
      alt: 'A close-up of the robot’s metal frame and wheels',
      caption: 'the frame, up close',
      ratio: 'aspect-[4/3]',
      grow: true,
    },
  ],
  [
    {
      src: '/media/tech/drivetrain-pair.jpg',
      alt: 'Two drivetrain modules side by side',
      caption: 'the drivetrain, left and right',
      ratio: 'aspect-[3/4]',
    },
    {
      src: '/media/tech/intake.jpg',
      alt: 'The robot’s intake holding a blue ball',
      caption: 'the intake',
      ratio: 'aspect-[3/4]',
      grow: true,
    },
  ],
]

const BOARD = [
  ['/media/tech/board-gradient.jpg', 'the gradient'],
  ['/media/tech/board-field.jpg', 'a vector field'],
  ['/media/tech/board-svd.jpg', 'singular values'],
]

const HACKS = AWARDS.filter((a) =>
  ['award1', 'award-hackmit', 'award2', 'award3'].includes(a.id),
)

export default function TechPage() {
  return (
    <>
      <PageHead
        title="Tech"
        standfirst="Some of the tools I use, the projects I am working on, and what I have learned alongside my teammates."
        contents={[
          { label: 'stack', href: '#stack' },
          { label: 'how it’s built', href: '#built' },
          { label: 'the robot', href: '#robot' },
          { label: 'on the board', href: '#board' },
          { label: 'hackathons', href: '#hackathons' },
        ]}
      />

      <Drift
        text="typescript — c++ — python — next.js —"
        className="pb-6 md:pb-10"
      />

      <Block id="stack" label="stack">
        {SKILL_GROUPS.filter((g) => g.label !== 'music').map((g) => (
          <Fade key={g.label}>
            <div className="border-line grid gap-x-8 gap-y-1 border-t py-5 md:grid-cols-12 md:items-baseline md:py-7">
              <p className="label md:col-span-3">{g.label}</p>
              <p className="display-soft text-[clamp(1.5rem,3vw,2.75rem)] md:col-span-9">
                {g.items}
              </p>
            </div>
          </Fade>
        ))}
      </Block>

      <section className="section-max section-pad py-20 md:py-36">
        <Words
          text={LINES.systems}
          className="display-soft max-w-[20ch] text-[clamp(2.25rem,5.6vw,5.75rem)]"
        />
      </section>

      <Block id="built" label="how it’s built">
        {BUILT.map((b) => (
          <Line
            key={b.title}
            date={b.tags}
            title={b.title}
            detail={b.detail}
            href={b.href}
          />
        ))}
      </Block>

      <Media
        className="mt-10 md:mt-16"
        src="/media/loops/driver.jpg"
        video="/media/vex/driver.mp4"
        alt="The VEX robot driving across the field"
        ratio="h-[80vh] min-h-[360px]"
        travel={0.15}
        sizes="100vw"
      />

      <Block id="robot" label="the robot">
        <div className="border-line grid gap-8 border-t pt-8 md:grid-cols-12 md:pt-10">
          <Fade className="md:col-span-5">
            <p className="text-ink text-[20px] leading-snug font-medium">
              VEX team 15520X
            </p>
            <p className="label mt-1">{VEX.title}</p>
          </Fade>
          <Fade className="md:col-span-7" delay={0.1}>
            <ul>
              {VEX.bullets?.map((b) => (
                <li
                  key={b}
                  className="border-line text-ink border-t py-2.5 text-[16px] leading-snug first:border-t-0 first:pt-0"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        <div className="mt-12 md:mt-16">
          <Masonry columns={ROBOT} />
        </div>
      </Block>

      <Block id="board" label="on the board">
        <div className="border-line border-t pt-8 md:pt-10">
          <ScrollRow
            label="on the board · 3 images"
            className="[--tile-h:clamp(13rem,55vw,18rem)] md:[--tile-h:clamp(20rem,34vw,30rem)]"
          >
            {BOARD.map(([src, caption]) => (
              <figure
                key={src}
                className="shrink-0"
                style={{ width: 'calc(var(--tile-h) * 4 / 3)' }}
              >
                <div className="bg-mist relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={`Handwritten maths on a smartboard: ${caption}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 45vw"
                  />
                </div>
                <figcaption className="label mt-2">{caption}</figcaption>
              </figure>
            ))}
          </ScrollRow>
        </div>
      </Block>

      <Media
        src="/media/tech/hack-letters.jpg"
        alt="Large lit-up letters spelling HACK in a lobby"
        ratio="h-[70vh] min-h-[340px]"
        travel={0.16}
        sizes="100vw"
      />

      <Block id="hackathons" label="hackathons">
        {HACKS.map((a) => (
          <Line
            key={a.id}
            date={a.date}
            title={a.title}
            detail={a.description}
          />
        ))}
        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4">
          {[
            [
              '/media/hackathons/hackmit-workspace.jpg',
              'Laptops and hardware on the HackMIT China workspace',
              'the HackMIT China table',
            ],
            [
              '/media/tech/pair-coding.jpg',
              'Two students working together at a laptop',
              'pair programming',
            ],
            [
              '/media/hackathons/hackharvard-win.jpg',
              'Alan holding a certificate in front of the HackHarvard backdrop',
              'HackHarvard China, 2025',
            ],
            [
              '/media/hackathons/hackharvard-2025.jpg',
              'The team at HackHarvard 2025',
              'HackHarvard 2025, Cambridge MA',
            ],
          ].map(([src, alt, caption], i) => (
            <Fade key={src} delay={i * 0.05}>
              <Media
                src={src}
                alt={alt}
                caption={caption}
                ratio="aspect-[4/5]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </Fade>
          ))}
        </div>
      </Block>

      <Next href="/path" label="Record" />
    </>
  )
}
