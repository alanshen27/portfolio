import Link from 'next/link'
import { EMAIL, NAME, SITE_NAV, SOCIAL_LINKS } from './data'

export function Footer() {
  const year = new Date().getFullYear()
  const external = SOCIAL_LINKS.filter((l) =>
    ['LinkedIn', 'GitHub'].includes(l.label),
  )

  return (
    <footer className="border-line bg-bg border-t">
      <div className="section-max section-pad flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display-quiet text-ink text-[clamp(1.5rem,3.5vw,2.1rem)]">
            {NAME}
          </p>
          <p className="text-ink-faint mt-2 font-mono text-[11px] tracking-[0.12em] uppercase">
            Institut Le Rosey · Class of 2027
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="text-accent mt-4 inline-block text-sm transition-opacity hover:opacity-70"
          >
            {EMAIL}
          </a>
        </div>
        <div className="text-ink-soft flex flex-wrap gap-x-7 gap-y-3 text-sm">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-ink transition-colors"
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
              className="hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-line border-t">
        <div className="section-max section-pad text-ink-faint flex justify-between py-4 font-mono text-[11px] tracking-[0.08em] uppercase">
          <span>
            © {year} {NAME}
          </span>
          <span>Always building.</span>
        </div>
      </div>
    </footer>
  )
}
