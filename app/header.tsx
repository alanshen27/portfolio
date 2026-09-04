'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EMAIL, SITE_NAV } from './data'
import { roman } from '@/components/programme'
import { easeOut } from '@/components/portfolio-motion'

/**
 * Running head, like the folio line of a printed programme:
 * name at left, section at centre, contents at right.
 */
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

  const current =
    SITE_NAV.find((n) => n.href !== '/' && pathname.startsWith(n.href)) ??
    SITE_NAV[0]

  return (
    <>
      <header className="border-line/70 bg-bg/90 text-ink fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
        <div className="section-max section-pad grid h-14 grid-cols-[1fr_auto] items-center md:h-16 md:grid-cols-3">
          <Link
            href="/"
            className="display-quiet text-[1.2rem] md:text-[1.3rem]"
            aria-label="Alan Shen — Programme"
          >
            Alan Shen
          </Link>

          <p className="eyebrow-faint hidden text-center md:block">
            programme of work · {current.label}
          </p>

          <nav
            className="hidden items-center justify-end gap-5 md:flex"
            aria-label="Primary"
          >
            {SITE_NAV.map((item, i) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`hover:text-ink flex items-baseline gap-1.5 text-[13px] transition-colors ${
                    active ? 'text-ink' : 'text-ink-soft'
                  }`}
                >
                  <span className="numeral text-ink-faint text-[10.5px]">
                    {roman(i + 1)}
                  </span>
                  <span className={active ? 'rule-link' : ''}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
            <a
              href={`mailto:${EMAIL}`}
              className="text-ink-soft hover:text-ink ml-1 text-[13px] transition-colors"
            >
              email
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 justify-self-end md:hidden"
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
            className="bg-bg text-ink fixed inset-0 z-40 md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col justify-end px-6 pt-28 pb-16">
              <p className="eyebrow-faint mb-4">contents</p>
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
                      className="border-line flex items-baseline gap-4 border-b py-3"
                    >
                      <span className="numeral text-ink-faint text-[13px]">
                        {roman(i + 1)}.
                      </span>
                      <span className="display-quiet text-[clamp(1.6rem,7vw,2.2rem)]">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a
                  href={`mailto:${EMAIL}`}
                  className="rule-link"
                  onClick={() => setOpen(false)}
                >
                  email
                </a>
                <a
                  href="https://github.com/alanshen27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rule-link"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/alanshen27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rule-link"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
