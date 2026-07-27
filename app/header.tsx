'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { NAME } from './data'

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Path', href: '#path' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'About', href: '#about' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-line/80 bg-bg/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="section-max section-pad flex h-16 items-center justify-between">
        <Link
          href="/"
          className={`font-[family-name:var(--font-display)] text-lg font-bold tracking-tight transition-colors ${
            scrolled ? 'text-ink' : 'text-white'
          }`}
        >
          {NAME}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative text-sm transition-colors ${
                scrolled
                  ? 'text-ink-soft hover:text-ink'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  scrolled ? 'bg-accent' : 'bg-white'
                }`}
              />
            </a>
          ))}
          <a
            href="#connect"
            className={`text-sm font-medium transition-colors ${
              scrolled
                ? 'text-accent hover:text-accent-deep'
                : 'text-white hover:text-white/90'
            }`}
          >
            Connect
          </a>
        </nav>

        <a
          href="#connect"
          className={`text-sm font-medium md:hidden ${
            scrolled ? 'text-accent' : 'text-white'
          }`}
        >
          Connect
        </a>
      </div>
    </motion.header>
  )
}
