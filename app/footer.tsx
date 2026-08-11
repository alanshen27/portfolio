import Link from 'next/link'
import { EMAIL, NAME, SITE_NAV, SOCIAL_LINKS } from './data'

export function Footer() {
  const year = new Date().getFullYear()
  const external = SOCIAL_LINKS.filter(
    (l) => l.label === 'LinkedIn' || l.label === 'GitHub' || l.label === 'Music',
  )

  return (
    <footer className="border-t border-line bg-bg-elevated">
      <div className="section-max section-pad flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display-quiet text-[clamp(1.6rem,4vw,2.25rem)] text-ink">
            {NAME}
          </p>
          <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-ink-faint uppercase">
            Institut Le Rosey · Class of 2027 · Geneva
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 inline-block text-sm text-accent transition-opacity hover:opacity-70"
          >
            {EMAIL}
          </a>
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-ink-soft">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          {external.map((link) => (
            <a
              key={link.label}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="section-max section-pad flex flex-col gap-1 py-4 font-mono text-[11px] tracking-[0.08em] text-ink-faint uppercase sm:flex-row sm:justify-between">
          <span>
            © {year} {NAME}
          </span>
          <span>Always building the next thing.</span>
        </div>
      </div>
    </footer>
  )
}
