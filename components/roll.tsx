'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import {
  ROLL_END,
  ROLL_NOTES,
  ROLL_NOW,
  ROLL_ROWS,
  ROLL_START,
  type RollNote,
  type RollRow,
} from '@/app/data'

/* ---- time helpers ------------------------------------------------------- */

function monthIndex(ym: string) {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + ((m || 1) - 1)
}
const T0 = monthIndex(ROLL_START)
const T1 = monthIndex(ROLL_END)
const SPAN = T1 - T0
const NOW = monthIndex(ROLL_NOW)

function pct(mi: number) {
  return ((mi - T0) / SPAN) * 100
}

type Placed = RollNote & {
  a: number
  b: number
  lane: number
  inside: boolean
  /** trailing label would run past the roll's end — hang it to the left */
  flip: boolean
}

/** Approximate months of horizontal room a trailing label needs. */
function labelMonths(n: RollNote) {
  return Math.ceil(n.label.length * 0.42) + 1
}

/** Resolve a note to [a, b) month indices; year-precision notes sit mid-year. */
function place(n: RollNote): { a: number; b: number } {
  if (n.precision === 'year') {
    const y = Number(n.start)
    return { a: y * 12, b: y * 12 + 12 }
  }
  const a = monthIndex(n.start)
  const b = n.end ? (n.end === 'now' ? NOW : monthIndex(n.end) + 1) : a + 1
  return { a, b: Math.max(b, a + 1) }
}

/** Greedy lane assignment so overlapping notes in a row stack. */
function lanes(notes: RollNote[]): Placed[] {
  const placed: Placed[] = notes
    .map((n) => {
      const { a, b } = place(n)
      const inside = b - a >= labelMonths(n) + 1
      const flip = !inside && b + labelMonths(n) > T1
      return { ...n, a, b, lane: 0, inside, flip }
    })
    .sort((x, y) => x.a - y.a || y.b - y.a - (x.b - x.a))
  const ends: number[] = []
  for (const p of placed) {
    const extent = p.inside || p.flip ? p.b : p.b + labelMonths(p)
    const startsAt = p.flip ? p.a - labelMonths(p) : p.a
    let l = ends.findIndex((e) => e <= startsAt)
    if (l === -1) {
      l = ends.length
      ends.push(extent)
    } else ends[l] = extent
    p.lane = l
  }
  return placed
}

/* ---- component --------------------------------------------------------- */

const LANE = 30 // px
const ROW_PAD = 10

export function Roll({
  rows,
  compact = false,
  playback = true,
  className = '',
}: {
  rows?: RollRow[]
  compact?: boolean
  /** Sweep the playhead from the start to now on mount */
  playback?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const rowsKey = rows ? rows.join(',') : 'all'
  const byRow = useMemo(() => {
    const wanted = rowsKey === 'all' ? null : rowsKey.split(',')
    return ROLL_ROWS.filter((r) => !wanted || wanted.includes(r.id)).map(
      (r) => ({
        ...r,
        notes: lanes(ROLL_NOTES.filter((n) => n.row === r.id)),
      }),
    )
  }, [rowsKey])

  // playhead sweep: 0 → 1 maps ROLL_START → NOW
  const [t, setT] = useState(playback && !reduce ? 0 : 1)
  useEffect(() => {
    if (!playback || reduce) return
    let raf = 0
    const start = performance.now()
    const dur = 2600
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - k, 2.2)
      setT(eased)
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playback, reduce])
  const head = T0 + (NOW - T0) * t

  const firstYear = Math.ceil(T0 / 12)
  const years = Array.from(
    { length: Math.floor(T1 / 12) - firstYear + 1 },
    (_, k) => firstYear + k,
  )

  return (
    <div className={`roll ${className}`}>
      <p className="text-ink-faint mb-2 text-[13px] md:hidden">
        swipe across the roll →
      </p>
      <div className="overflow-x-auto">
        <div className="min-w-[880px]">
          {/* axis */}
          <div className="grid grid-cols-[9rem_1fr]">
            <div className="text-ink-faint self-end pb-1 text-[13px]">
              {compact ? '' : 'sep 2022 → jun 2027'}
            </div>
            <div className="relative h-6">
              {years.map((y) => (
                <span
                  key={y}
                  className="text-ink-soft absolute bottom-1 -translate-x-1/2 text-[13px] tabular-nums"
                  style={{ left: `${pct(y * 12)}%` }}
                >
                  {y}
                </span>
              ))}
              <span
                className="text-accent absolute bottom-1 -translate-x-1/2 text-[13px] font-medium"
                style={{ left: `${pct(NOW)}%` }}
              >
                now
              </span>
            </div>
          </div>

          {/* rows */}
          <div className="border-ink border-t">
            {byRow.map((r) => {
              const laneCount = Math.max(1, ...r.notes.map((n) => n.lane + 1))
              const h = laneCount * LANE + ROW_PAD * 2
              return (
                <div
                  key={r.id}
                  className="border-line grid grid-cols-[9rem_1fr] border-b"
                  style={{ height: h }}
                >
                  <div className="text-ink border-line flex items-start border-r px-0 pt-2.5 text-[15px] font-medium">
                    {r.label}
                  </div>
                  <div className="relative">
                    {/* year lines */}
                    {years.map((y) => (
                      <span
                        key={y}
                        className="border-line absolute inset-y-0 border-l"
                        style={{ left: `${pct(y * 12)}%` }}
                        aria-hidden
                      />
                    ))}
                    {/* continuation */}
                    <span
                      className="roll-future absolute inset-y-0 right-0"
                      style={{ left: `${pct(NOW)}%` }}
                      aria-hidden
                    />
                    {/* notes */}
                    {r.notes.map((n) => {
                      const sounded = n.a <= head
                      const left = pct(n.a)
                      const width = Math.max(pct(n.b) - pct(n.a), 0.9)
                      const top = ROW_PAD + n.lane * LANE + 4
                      const inner = (
                        <>
                          <span
                            className={`roll-note block h-[22px] w-full ${
                              n.precision === 'year'
                                ? 'roll-note-year'
                                : n.result
                                  ? 'roll-note-result'
                                  : ''
                            } ${sounded ? 'is-on' : ''}`}
                          />
                          <span
                            className={`roll-label absolute top-0 text-[13px] leading-[22px] whitespace-nowrap ${
                              n.inside
                                ? n.precision === 'year' || n.result
                                  ? 'text-ink left-2'
                                  : 'left-2 text-white'
                                : n.flip
                                  ? 'text-ink right-full mr-1.5'
                                  : 'text-ink left-full ml-1.5'
                            }`}
                          >
                            {n.label}
                          </span>
                          <span className="roll-tip text-ink bg-bg border-line absolute top-[26px] left-0 z-20 hidden w-64 border p-2.5 text-[13px] leading-snug shadow-[0_1px_0_0_var(--color-line-strong)]">
                            <span className="text-accent block font-medium">
                              {n.label}
                            </span>
                            <span className="text-ink-faint block">
                              {n.precision === 'year'
                                ? n.start
                                : n.end
                                  ? `${n.start} → ${n.end}`
                                  : n.start}
                            </span>
                            <span className="mt-1 block">{n.detail}</span>
                          </span>
                        </>
                      )
                      const cls = 'roll-hit group absolute block'
                      const style = {
                        left: `${left}%`,
                        top,
                        width: `${width}%`,
                        opacity: sounded ? 1 : 0.28,
                        transition: 'opacity 0.35s ease',
                      }
                      return n.href?.startsWith('/') ? (
                        <Link
                          key={n.id}
                          href={n.href}
                          className={cls}
                          style={style}
                          aria-label={`${n.label}: ${n.detail}`}
                        >
                          {inner}
                        </Link>
                      ) : (
                        <a
                          key={n.id}
                          href={n.href}
                          className={cls}
                          style={style}
                          aria-label={`${n.label}: ${n.detail}`}
                        >
                          {inner}
                        </a>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* playhead */}
          <div className="grid grid-cols-[9rem_1fr]">
            <div />
            <div className="relative h-0">
              <span
                className="bg-accent pointer-events-none absolute bottom-0 w-px"
                style={{
                  left: `${pct(head)}%`,
                  height: byRow.reduce(
                    (s, r) =>
                      s +
                      Math.max(1, ...r.notes.map((n) => n.lane + 1)) * LANE +
                      ROW_PAD * 2,
                    0,
                  ),
                }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="text-ink-faint mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
          <span className="flex items-center gap-2">
            <span className="roll-note is-on inline-block h-[10px] w-6" /> a
            span of work, drawn to its length
          </span>
          <span className="flex items-center gap-2">
            <span className="roll-note roll-note-result is-on inline-block h-[10px] w-3" />{' '}
            a result — placement, award, release
          </span>
          <span className="flex items-center gap-2">
            <span className="roll-note roll-note-year is-on inline-block h-[10px] w-3" />{' '}
            year known, month not recorded
          </span>
          <span className="flex items-center gap-2">
            <span className="roll-future inline-block h-[10px] w-6" /> the
            continuation
          </span>
        </div>
      )}
    </div>
  )
}
