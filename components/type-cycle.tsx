'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const DEFAULT_PHRASES = [
  'Founder & developer',
  'USACO Gold',
  'VEX Worlds ’26',
  'Education systems',
  'Violinist & pianist',
]

export function TypeCycle({
  phrases = DEFAULT_PHRASES,
  className = '',
}: {
  phrases?: string[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(reduce ? phrases[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const full = phrases[index % phrases.length]
    const done = !deleting && text === full
    const empty = deleting && text === ''

    let delay = deleting ? 36 : 58
    if (done) delay = 1600
    if (empty) delay = 280

    const id = window.setTimeout(() => {
      if (done) {
        setDeleting(true)
        return
      }
      if (empty) {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
        return
      }
      const next = deleting
        ? full.slice(0, text.length - 1)
        : full.slice(0, text.length + 1)
      setText(next)
    }, delay)

    return () => window.clearTimeout(id)
  }, [text, deleting, index, phrases, reduce])

  return (
    <span className={className}>
      {text}
      <span
        className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.12em] bg-ink/55 align-baseline"
        aria-hidden
      />
    </span>
  )
}
