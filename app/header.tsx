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
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const light = isHome && !scrolled && !open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          light
            ? 'bg-transparent text-white'
            : 'border-b border-line/80 bg-bg/90 text-ink backdrop-blur-md'
        }`}
      >
        <div className="section-max section-pad flex h-16 items-center justify-between md:h-[4.25rem]">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight md:text-[1.3rem]"
            aria-label="Alan Shen — Home"
          >
            Alan Shen
          </Link>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Primary"
          >
            {SITE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] tracking-[0.04em] opacity-60 transition-opacity hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className={`border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors ${
                light
                  ? 'border-white/40 hover:bg-white hover:text-ink'
                  : 'border-ink/25 hover:bg-ink hover:text-white'
              }`}
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
                      className="flex items-baseline gap-4 border-b border-line py-4"
                    >
                      <span className="font-mono text-[11px] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="display-quiet text-[clamp(1.9rem,9vw,2.6rem)]">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: easeOut }}
                >
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-8 inline-flex font-mono text-[12px] tracking-[0.08em] text-accent uppercase"
                  >
                    {EMAIL}
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
