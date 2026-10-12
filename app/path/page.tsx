import Image from 'next/image'
import { Block, Fade, Line, Next, PageHead } from '@/components/beats'
import { Media } from '@/components/media'
import { dateRange } from '@/lib/utils'
import {
  AWARDS,
  EDUCATION,
  PUBLICATIONS,
  VOLUNTEERING,
  WORK_EXPERIENCE,
} from '../data'

const CONTENTS = [
  { label: 'honours', href: '#honours' },
  { label: 'publications', href: '#research' },
  { label: 'appointments', href: '#appointments' },
  { label: 'swimming', href: '#athletics' },
  { label: 'service', href: '#service' },
]

export default function PathPage() {
  const techWork = WORK_EXPERIENCE.filter(
    (w) => w.company !== 'Institut Le Rosey',
  )
  const swim = WORK_EXPERIENCE.find((w) => w.company === 'Institut Le Rosey')
  const meets = (swim?.bullets ?? [])
    .filter((b) => b.includes(':'))
    .map((b) => {
      const at = b.indexOf(':')
      return {
        meet: b.slice(0, at).trim(),
        result: b
          .slice(at + 1)
          .trim()
          .replace(/\.$/, ''),
      }
    })

  return (
    <>
      <PageHead
        title="Record"
        standfirst="Honours, publications, meets and service — every entry dated so it can be checked."
        contents={CONTENTS}
      />

      <Block id="honours" label="honours" aside={`${AWARDS.length} awards`}>
        {AWARDS.map((a) => (
          <Line
            key={a.id}
            date={a.date}
            title={a.title}
            detail={a.description}
          />
        ))}
      </Block>

      <Block id="research" label="publications">
        {PUBLICATIONS.map((pub) => (
          <Fade key={pub.id}>
            <div className="border-line grid gap-x-8 gap-y-3 border-t py-8 md:grid-cols-12 md:py-10">
              <p className="label md:col-span-2 md:pt-2">
                {pub.date}
                <br />
                <span className="text-accent">{pub.status}</span>
              </p>
              <div className="md:col-span-10">
                <p className="display-soft text-[clamp(1.4rem,2.4vw,2.25rem)] leading-[1.15]">
                  {pub.title}
                </p>
                <p className="text-ink-soft mt-4 text-[15px]">{pub.authors}</p>
                <p className="label">{pub.venue}</p>
                {pub.presentation && (
                  <p className="text-ink mt-2 text-[15px]">
                    presented at {pub.presentation}
                  </p>
                )}
              </div>
            </div>
          </Fade>
        ))}
      </Block>

      <Block id="appointments" label="appointments">
        {techWork.map((job) => (
          <Fade key={job.id}>
            <div className="border-line grid gap-x-8 gap-y-2 border-t py-6 md:grid-cols-12">
              <p className="label md:col-span-2 md:pt-1">
                {dateRange(job.start, job.end)}
              </p>
              <div className="md:col-span-7">
                <p className="text-ink text-[20px] leading-snug font-medium">
                  {job.company}
                </p>
                <p className="text-ink-soft text-[15px]">{job.title}</p>
                <ul className="mt-3 space-y-1">
                  {job.bullets?.map((b) => (
                    <li
                      key={b}
                      className="text-ink-soft text-[15px] leading-snug"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Fade>
        ))}
        <div className="mt-12">
          <h3 className="text-ink mb-4 text-[20px] font-medium">education</h3>
          {EDUCATION.map((e) => (
            <Line
              key={e.id}
              date={dateRange(e.start, e.end)}
              title={e.institution}
              detail={`${e.degree}${e.location ? ` · ${e.location}` : ''}`}
            />
          ))}
        </div>
      </Block>

      <Block id="athletics" label="swimming">
        <div className="border-line border-t pt-8 md:pt-10">
          <p className="text-ink-soft max-w-[52ch] text-[18px] leading-relaxed">
            {swim?.title ?? 'competitive swimmer'} for Le Rosey since 2023 —
            fourteen medals, one school record, team mvp two years running.
          </p>
          <div className="mt-10 grid gap-3 md:grid-cols-12">
            <Media
              className="md:col-span-6"
              src="/media/loops/reel.jpg"
              video="/media/swim/reel.mp4"
              alt="Racing at a swim meet"
              caption="race footage"
              ratio="aspect-[16/9]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <Media
              className="md:col-span-6"
              src="/media/loops/freestyle.jpg"
              video="/media/loops/freestyle.mp4"
              alt="Alan swimming butterfly down a lane"
              caption="butterfly"
              ratio="aspect-[16/9]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            ['/media/swim/team.jpg', 'Le Rosey swim team'],
            [
              '/media/swim/lake-medals.webp',
              'Team with medals after the lake relay',
            ],
            ['/media/swim/medals-rooftop.png', 'Swimming medals'],
          ].map(([src, alt], i) => (
            <div
              key={src}
              className={`bg-mist relative aspect-[4/3] overflow-hidden ${i === 0 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <div className="mt-12">
          <h3 className="text-ink mb-4 text-[20px] font-medium">
            meet by meet
          </h3>
          {meets.map((m) => (
            <Line key={m.meet} date={m.meet} title={m.result} />
          ))}
        </div>
      </Block>

      <Block id="service" label="service">
        {VOLUNTEERING.map((v) => (
          <Fade key={v.id}>
            <div className="border-line grid gap-x-8 gap-y-3 border-t py-8 md:grid-cols-12">
              <p className="label md:col-span-2 md:pt-1">
                {dateRange(v.start, v.end)}
                <br />
                {v.cause}
              </p>
              <div className="md:col-span-7">
                <p className="text-ink text-[20px] leading-snug font-medium">
                  {v.organization}
                </p>
                <p className="text-ink-soft text-[15px]">{v.role}</p>
                {v.description && (
                  <p className="text-ink-soft mt-3 max-w-[62ch] text-[15px] leading-relaxed">
                    {v.description}
                  </p>
                )}
                {v.bullets && (
                  <ul className="mt-3 space-y-1">
                    {v.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-ink-soft text-[15px] leading-snug"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Fade>
        ))}
      </Block>

      <Next href="/music" label="Music" />
    </>
  )
}
