'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { SITE_NAV } from './data'
import { easeSnap } from '@/components/portfolio-motion'

const NAV = SITE_NAV.map((item, i) => ({
  ...item,
  index: String(i + 1).padStart(2, '0'),
}))

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
      {/* Desktop: vertical spine — not a top bar */}
      <motion.aside
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeSnap }}
        className="pointer-events-none fixed top-0 bottom-0 left-0 z-50 hidden w-16 flex-col items-center border-r border-white/10 bg-ink py-6 md:flex lg:w-[4.5rem]"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="pointer-events-auto group relative flex h-11 w-11 items-center justify-center border border-white/40 text-white transition-colors hover:border-accent hover:bg-accent"
          aria-label="Home"
        >
          <span className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-tight">
            AS
          </span>
        </Link>

        <nav className="pointer-events-auto mt-10 flex flex-1 flex-col items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex h-14 w-full items-center justify-center"
                title={item.label}
              >
                <span
                  className={`font-[family-name:var(--font-display)] text-[11px] font-bold tracking-wider transition-colors ${
                    active
                      ? 'text-accent'
                      : 'text-white/40 group-hover:text-white'
                  }`}
                >
                  {item.index}
                </span>
                <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap bg-ink px-3 py-1.5 text-xs tracking-[0.14em] text-white uppercase opacity-0 shadow-lg transition-opacity group-hover:opacity-100 xl:block">
                  {item.label}
                </span>
                {active && (
                  <span
                    className="absolute top-1/2 right-0 h-6 w-0.5 -translate-y-1/2 bg-accent"
                    aria-hidden
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/about#connect"
          className="pointer-events-auto text-[10px] tracking-[0.18em] text-lake uppercase transition-colors hover:text-white"
        >
          ✉
        </Link>
      </motion.aside>

      {/* Mobile: corner trigger + full-stage menu */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 border border-white/30 bg-ink/70 text-white backdrop-blur-md"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="block h-px w-5 bg-current"
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-px w-5 bg-current"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block h-px w-5 bg-current"
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex h-12 w-12 items-center justify-center border border-white/30 bg-ink/70 font-[family-name:var(--font-display)] text-sm font-extrabold text-white backdrop-blur-md md:hidden"
        aria-label="Home"
      >
        AS
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink text-white md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col justify-end px-6 pb-16 pt-28">
              <p className="mb-8 text-xs tracking-[0.28em] text-lake uppercase">
                Index
              </p>
              <ul>
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.05,
                      duration: 0.45,
                      ease: easeSnap,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-5 border-b border-white/15 py-5"
                    >
                      <span className="font-[family-name:var(--font-display)] text-sm font-bold text-accent">
                        {item.index}
                      </span>
                      <span className="display-smash text-[clamp(2.6rem,14vw,4rem)]">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.45, ease: easeSnap }}
                >
                  <Link
                    href="/about#connect"
                    onClick={() => setOpen(false)}
                    className="mt-8 inline-flex text-sm tracking-[0.16em] text-lake uppercase"
                  >
                    Connect →
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
