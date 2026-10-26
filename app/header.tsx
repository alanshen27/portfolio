'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EMAIL, SITE_NAV } from './data'
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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <div className="section-max section-pad flex h-14 items-center justify-between gap-6 md:h-16">
          <Link
            href="/"
            className="text-[14px] font-medium"
            aria-label="Alan Shen — home"
          >
            Alan Shen
          </Link>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Primary"
          >
            {SITE_NAV.filter((item) => item.href !== '/').map((item) => {
              const active = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-[14px] transition-opacity hover:opacity-100 ${
                    active ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <a
              href={`mailto:${EMAIL}`}
              className="text-[14px] opacity-60 transition-opacity hover:opacity-100"
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
                      className="block py-1"
                    >
                      <span className="display block text-[clamp(3.5rem,17vw,5.5rem)]">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="text-ink-soft mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
                <a href={`mailto:${EMAIL}`} onClick={() => setOpen(false)}>
                  email
                </a>
                <a
                  href="https://github.com/alanshen27"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/alanshen27"
                  target="_blank"
                  rel="noopener noreferrer"
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
