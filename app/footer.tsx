import Link from 'next/link'
import { EMAIL, NAME, SITE_NAV, SOCIAL_LINKS } from './data'

export function Footer() {
  const year = new Date().getFullYear()
  const external = SOCIAL_LINKS.filter((l) => l.label !== 'Email')

  return (
    <footer className="spine-pad bg-ink text-white">
      <div className="section-max section-pad grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-6">
          <p className="display-smash text-[clamp(2.5rem,6vw,4.5rem)]">
            {NAME}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
            Founder, developer, and musician — building education systems and
            releasing music as {NAME}.
          </p>
          <p className="mt-8 text-xs tracking-[0.2em] text-lake uppercase">
            Always building the next thing.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-medium tracking-[0.22em] text-white/40 uppercase">
            Pages
          </p>
          <ul className="mt-5 space-y-3 text-sm tracking-wide text-white/75 uppercase">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            {SITE_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-medium tracking-[0.22em] text-white/40 uppercase">
            Elsewhere
          </p>
          <ul className="mt-5 space-y-3 text-sm tracking-wide text-white/75 uppercase">
            {external.map((link) => (
              <li key={link.label}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="transition-colors hover:text-accent"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-max section-pad flex flex-col gap-2 py-5 text-xs tracking-[0.16em] text-white/40 uppercase sm:flex-row sm:justify-between">
          <span>
            © {year} {NAME}
          </span>
          <span>Geneva Metropolitan Area</span>
        </div>
      </div>
    </footer>
  )
}
