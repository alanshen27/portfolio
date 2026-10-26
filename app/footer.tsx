import { NAME, SOCIAL_LINKS } from './data'

export function Footer() {
  const year = new Date().getFullYear()
  const external = SOCIAL_LINKS.filter((l) =>
    ['LinkedIn', 'GitHub'].includes(l.label),
  )

  return (
    <footer className="bg-bg">
      <div className="section-max section-pad label flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-8">
        <span>
          © {year} {NAME}
        </span>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
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
          <a href="#top" className="hover:text-ink transition-colors">
            top ↑
          </a>
        </nav>
      </div>
    </footer>
  )
}
