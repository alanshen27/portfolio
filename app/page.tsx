'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import {
  Stream,
  Head,
  Paragraph,
  Quote,
  Bullet,
  Rule,
  Spacer,
  Node,
} from '@/components/ui/stream'
import { ThemeSwitch } from '@/components/ui/theme-switch'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  EDUCATION,
  SKILLS,
  CERTIFICATIONS,
  AWARDS,
  PUBLICATIONS,
  VOLUNTEERING,
  EMAIL,
  SOCIAL_LINKS,
  SUMMARY,
  HEADLINE,
  NAME,
  LOCATION,
} from './data'

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  const projectItems = PROJECTS.map((p) => (
    <Bullet
      key={p.id}
      href={p.link}
      hoverImage={p.image}
      alt={p.name}
    >
      {`**${p.name}** — ${p.description}`}
    </Bullet>
  ))

  const workItems = WORK_EXPERIENCE.flatMap((job) => {
    const nodes = [
      <Head
        key={`${job.id}-title`}
        level={3}
        image={job.image}
        alt={job.company}
        href={job.link}
      >
        {`${job.title} @ ${job.company}`}
      </Head>,
      <Paragraph key={`${job.id}-meta`} className="text-sm text-zinc-500 dark:text-zinc-500">
        {`${job.start} – ${job.end}${job.location ? ` · ${job.location}` : ''}`}
      </Paragraph>,
    ]
    if (job.bullets) {
      job.bullets.forEach((b, i) => {
        nodes.push(<Bullet key={`${job.id}-b-${i}`}>{b}</Bullet>)
      })
    } else if (job.description) {
      nodes.push(<Paragraph key={`${job.id}-desc`}>{job.description}</Paragraph>)
    }
    nodes.push(<Spacer key={`${job.id}-sp`} size="sm" />)
    return nodes
  })

  const educationItems = EDUCATION.flatMap((edu) => [
    <Head
      key={`${edu.id}-h`}
      level={3}
      image={edu.image}
      alt={edu.institution}
    >
      {edu.institution}
    </Head>,
    <Paragraph
      key={`${edu.id}-p`}
      className="text-sm text-zinc-500 dark:text-zinc-500"
    >
      {`${edu.degree} · ${edu.start} – ${edu.end}${edu.location ? ` · ${edu.location}` : ''}`}
    </Paragraph>,
    <Spacer key={`${edu.id}-sp`} size="sm" />,
  ])

  const awardItems = AWARDS.map((award) => (
    <Bullet key={award.id} image={award.image} alt={award.title} imageSize={40}>
      {`**${award.title}**${award.description ? ` — ${award.description}` : ''}`}
    </Bullet>
  ))

  const publicationItems = PUBLICATIONS.map((pub) => (
    <Bullet key={pub.id} href={pub.link}>
      {`**${pub.title}**${pub.description ? ` — ${pub.description}` : ''}`}
    </Bullet>
  ))

  const certItems = CERTIFICATIONS.map((cert) => (
    <Bullet key={cert.id} image={cert.image} alt={cert.name} imageSize={32}>
      {`**${cert.name}**${cert.issuer ? ` — ${cert.issuer}` : ''}`}
    </Bullet>
  ))

  const volunteerItems = VOLUNTEERING.flatMap((v) => [
    <Head
      key={`${v.id}-h`}
      level={3}
      image={v.image}
      alt={v.organization}
      href={v.link}
    >
      {`${v.role} @ ${v.organization}`}
    </Head>,
    <Paragraph
      key={`${v.id}-p`}
      className="text-sm text-zinc-500 dark:text-zinc-500"
    >
      {`${v.start} – ${v.end}${v.cause ? ` · ${v.cause}` : ''}`}
    </Paragraph>,
    ...(v.description
      ? [<Bullet key={`${v.id}-d`}>{v.description}</Bullet>]
      : []),
    <Spacer key={`${v.id}-sp`} size="sm" />,
  ])

  const skillItems = SKILLS.map((s) => `\`${s.name}\``).join(' · ')

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 overflow-hidden rounded-t-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
          <span className="h-3 w-3 shrink-0 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 shrink-0 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 shrink-0 rounded-full bg-green-400/80" />
          <span className="ml-3 min-w-0 flex-1 truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
            alanshen.me / profile.md
          </span>
          <div className="flex shrink-0 items-center">
            <ThemeSwitch size="sm" />
          </div>
        </div>
        <div className="bg-white px-4 pt-4 pb-6 dark:bg-zinc-950 sm:px-6">
          <Stream typingSpeed={5}>
            <Head level={1}>{NAME}</Head>
            <Quote>{HEADLINE}</Quote>
            <Paragraph>{`📍 ${LOCATION}`}</Paragraph>
            <Rule />

            <Head level={2}>Summary</Head>
            <Paragraph>{SUMMARY}</Paragraph>

            <Head level={2}>Selected Projects</Head>
            {projectItems}

            <Head level={2}>Experience</Head>
            {workItems}

            <Head level={2}>Education</Head>
            {educationItems}

            <Head level={2}>Awards & Honors</Head>
            {awardItems}

            <Head level={2}>Volunteering</Head>
            {volunteerItems}

            <Head level={2}>Publications</Head>
            {publicationItems}

            <Head level={2}>Skills</Head>
            <Paragraph>{skillItems}</Paragraph>

            <Head level={2}>Certifications</Head>
            {certItems}

            <Head level={2}>Connect</Head>
            <Paragraph>
              {`Feel free to reach out at [${EMAIL}](mailto:${EMAIL}) — always open to collaborating on research, startups, and ambitious technical projects.`}
            </Paragraph>
            <Node delay={100}>
              <div className="flex flex-wrap items-center gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <MagneticSocialLink key={link.label} link={link.link}>
                    {link.label}
                  </MagneticSocialLink>
                ))}
              </div>
            </Node>
          </Stream>
        </div>
      </div>
    </motion.main>
  )
}
