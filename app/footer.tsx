import Link from 'next/link'
import { EMAIL, NAME, SITE_NAV, SOCIAL_LINKS } from './data'
import { roman } from '@/lib/utils'

/** Back cover: name, contents, links, and a single colophon line. */
export function Footer() {
  const year = new Date().getFullYear()
  const external = SOCIAL_LINKS.filter((l) =>
    ['LinkedIn', 'GitHub'].includes(l.label),
  )

  return (
    <footer className="border-line bg-bg border-t">
      <div className="section-max section-pad py-12 text-center">
        <div className="rule-double mx-auto w-16" aria-hidden />
        <p className="display-quiet text-ink mt-6 text-[clamp(1.6rem,3.5vw,2.2rem)]">
          {NAME}
        </p>
        <p className="eyebrow-faint mt-2">
          Institut Le Rosey · class of 2027 · programme of work
        </p>
        <nav
          aria-label="Footer"
          className="text-ink-soft mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
        >
          {SITE_NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-ink flex items-baseline gap-1.5 transition-colors"
            >
              <span className="numeral text-ink-faint text-[11px]">
                {roman(i + 1)}
              </span>
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
          <a
            href={`mailto:${EMAIL}`}
            className="hover:text-ink transition-colors"
          >
            {EMAIL}
          </a>
        </nav>
      </div>
      <div className="border-line border-t">
        <div className="section-max section-pad text-ink-faint flex justify-between py-4 text-[13px]">
          <span>
            © {year} {NAME}
          </span>
          <span>always building.</span>
        </div>
      </div>
    </footer>
  )
}
