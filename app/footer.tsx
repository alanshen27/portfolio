import { EMAIL, NAME, SOCIAL_LINKS } from './data'

export function Footer() {
  const year = new Date().getFullYear()
  const links = SOCIAL_LINKS.filter((l) => l.label !== 'Email')

  return (
    <footer className="border-t border-line bg-bg">
      <div className="section-max section-pad flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-ink">
            {NAME}
          </p>
          <p className="mt-1 text-sm text-ink-faint">
            © {year} · Geneva Metropolitan Area
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${EMAIL}`}
            className="transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
