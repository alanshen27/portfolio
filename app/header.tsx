'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EMAIL, SITE_NAV } from './data'
import { easeOut } from '@/components/portfolio-motion'

export function Header() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/85 text-ink backdrop-blur-md">
        <div className="section-max section-pad flex h-16 items-center justify-between md:h-[4.25rem]">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight md:text-[1.35rem]"
            aria-label="Alan Shen — Home"
          >
            Alan Shen
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Primary"
          >
            {SITE_NAV.map((item, i) => {
              const isPage = !item.href.includes('#')
              const active = isPage && pathname.startsWith(item.href)
              const firstPage =
                isPage && SITE_NAV.findIndex((n) => !n.href.includes('#')) === i
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative text-[13px] transition-colors hover:text-ink ${
                    active ? 'text-ink' : 'text-ink-soft'
                  } ${firstPage ? 'ml-2 border-l border-line pl-6' : ''}`}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                    />
                  )}
                </Link>
              )
            })}
            <a
              href={`mailto:${EMAIL}`}
              className="border border-ink/20 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors hover:bg-ink hover:text-white"
            >
              Email
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="block h-px w-5 bg-current"
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-px w-5 bg-current"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-px w-5 bg-current"
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg text-ink md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col justify-end px-6 pt-28 pb-16">
              <ul>
                {SITE_NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.045,
                      duration: 0.4,
                      ease: easeOut,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-line py-3"
                    >
                      <span className="font-mono text-[11px] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="display-quiet text-[clamp(1.6rem,7vw,2.2rem)]">
                        {item.label}
                      </span>
                      <span className="ml-auto font-mono text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                        {item.href.includes('#') ? 'Home' : 'Page'}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="pill pill-accent"
                  onClick={() => setOpen(false)}
                >
                  Email ↗
                </a>
                <a
                  href="https://github.com/alanshen27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/alanshen27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
