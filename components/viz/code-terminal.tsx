'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type Line =
  | { kind: 'comment'; text: string }
  | { kind: 'code'; parts: { tone: 'kw' | 'str' | 'plain' | 'fn' | 'num'; text: string }[] }
  | { kind: 'ok'; text: string }

const LINES: Line[] = [
  { kind: 'comment', text: '// usaco silver → gold · binary search' },
  {
    kind: 'code',
    parts: [
      { tone: 'kw', text: 'bool ' },
      { tone: 'fn', text: 'ok' },
      { tone: 'plain', text: '(int mid) {' },
    ],
  },
  {
    kind: 'code',
    parts: [
      { tone: 'kw', text: '  return ' },
      { tone: 'fn', text: 'feasible' },
      { tone: 'plain', text: '(mid);' },
    ],
  },
  { kind: 'code', parts: [{ tone: 'plain', text: '}' }] },
  {
    kind: 'code',
    parts: [
      { tone: 'kw', text: 'while ' },
      { tone: 'plain', text: '(lo < hi) {' },
    ],
  },
  {
    kind: 'code',
    parts: [
      { tone: 'kw', text: '  int ' },
      { tone: 'plain', text: 'mid = lo + (hi - lo) / ' },
      { tone: 'num', text: '2' },
      { tone: 'plain', text: ';' },
    ],
  },
  {
    kind: 'code',
    parts: [
      { tone: 'kw', text: '  if ' },
      { tone: 'plain', text: '(ok(mid)) hi = mid;' },
    ],
  },
  {
    kind: 'code',
    parts: [{ tone: 'kw', text: '  else ' }, { tone: 'plain', text: 'lo = mid + 1;' }],
  },
  { kind: 'code', parts: [{ tone: 'plain', text: '}' }] },
  { kind: 'ok', text: '✓ 1000 / 1000 · promoted to Gold' },
]

const TONE: Record<string, string> = {
  kw: 'text-accent',
  str: 'text-lake',
  fn: 'text-white',
  num: 'text-lake',
  plain: 'text-white/80',
}

export function CodeTerminal({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(reduce ? LINES.length : 0)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    if (reduce) return
    if (visible >= LINES.length) return
    const id = window.setTimeout(() => setVisible((v) => v + 1), 220)
    return () => window.clearTimeout(id)
  }, [reduce, visible])

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setBlink((b) => !b), 530)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <div
      className={`overflow-hidden border border-line bg-ink text-[13px] leading-relaxed ${className}`}
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="ml-2 font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase">
          contest · usaco
        </span>
      </div>
      <pre className="min-h-[220px] overflow-x-auto p-4 font-mono md:p-5">
        {LINES.slice(0, visible).map((line, i) => (
          <div key={i} className="whitespace-pre">
            <span className="mr-3 select-none text-white/25">
              {String(i + 1).padStart(2, '0')}
            </span>
            {line.kind === 'comment' && (
              <span className="text-white/35">{line.text}</span>
            )}
            {line.kind === 'ok' && (
              <span className="text-accent">{line.text}</span>
            )}
            {line.kind === 'code' &&
              line.parts.map((p, j) => (
                <span key={j} className={TONE[p.tone]}>
                  {p.text}
                </span>
              ))}
          </div>
        ))}
        {(visible < LINES.length || blink) && (
          <div>
            <span className="mr-3 select-none text-white/25">
              {String(Math.min(visible + 1, LINES.length)).padStart(2, '0')}
            </span>
            <span className="inline-block h-4 w-2 translate-y-0.5 bg-accent" />
          </div>
        )}
      </pre>
    </div>
  )
}
