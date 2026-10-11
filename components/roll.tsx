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

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]
function fmt(ym: string) {
  if (ym === 'now') return 'present'
  const [y, m] = ym.split('-')
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y
}
function when(n: RollNote) {
  if (n.precision === 'year') return `${n.start} · month not recorded`
  if (n.end) return `${fmt(n.start)} → ${fmt(n.end)}`
  return fmt(n.start)
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

const LANE = 24 // px
const ROW_PAD = 8

export function Roll({
  rows,
  playback = true,
  className = '',
}: {
  rows?: RollRow[]
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

  const [pinned, setPinned] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const shownId = hovered ?? pinned
  const shown = shownId ? ROLL_NOTES.find((n) => n.id === shownId) : undefined
  const results = useMemo(
    () =>
      ROLL_NOTES.filter(
        (n) =>
          n.result &&
          n.precision !== 'year' &&
          byRow.some((r) => r.id === n.row),
      ).map((n) => monthIndex(n.start)),
    [byRow],
  )

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
          {/* ruler */}
          <div className="grid grid-cols-[9rem_1fr]">
            <div />
            <div className="relative h-9">
              {Array.from({ length: SPAN + 1 }, (_, k) => T0 + k).map((mi) => {
                const month = mi % 12
                const isYear = month === 0
                const isQuarter = month % 3 === 0
                return (
                  <span
                    key={mi}
                    className={`absolute bottom-0 w-px ${
                      isYear
                        ? 'bg-ink h-4'
                        : isQuarter
                          ? 'bg-line-strong h-2.5'
                          : 'bg-line h-1.5'
                    }`}
                    style={{ left: `${pct(mi)}%` }}
                    aria-hidden
                  />
                )
              })}
              {results.map((mi, k) => (
                <span
                  key={`r${k}`}
                  className="bg-amber absolute bottom-0 h-3 w-[2px] -translate-x-px"
                  style={{ left: `${pct(mi)}%` }}
                  aria-hidden
                />
              ))}
              {years.map((y) => (
                <span
                  key={y}
                  className="text-ink-soft absolute top-0 ml-1.5 text-[13px] tabular-nums"
                  style={{ left: `${pct(y * 12)}%` }}
                >
                  {y}
                </span>
              ))}
              <span
                className="text-accent absolute top-0 -translate-x-1/2 text-[13px] font-medium"
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
                  <div className="text-ink-soft border-line flex items-start border-r px-0 pt-2 text-[13px]">
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
                            className={`roll-note block h-[16px] w-full ${
                              n.precision === 'year'
                                ? 'roll-note-year'
                                : n.result
                                  ? 'roll-note-result'
                                  : ''
                            } ${sounded ? 'is-on' : ''}`}
                          />
                          <span
                            className={`roll-label absolute top-0 text-[12.5px] leading-[16px] whitespace-nowrap ${
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
                        </>
                      )
                      const isShown = shownId === n.id
                      return (
                        <button
                          key={n.id}
                          type="button"
                          className={`roll-hit absolute block text-left ${isShown ? 'is-shown' : ''}`}
                          style={{
                            left: `${left}%`,
                            top,
                            width: `${width}%`,
                            opacity: sounded ? 1 : 0.28,
                            transition: 'opacity 0.35s ease',
                          }}
                          aria-pressed={pinned === n.id}
                          aria-label={`${n.label}: ${n.detail}`}
                          onMouseEnter={() => setHovered(n.id)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(n.id)}
                          onBlur={() => setHovered(null)}
                          onClick={() =>
                            setPinned((p) => (p === n.id ? null : n.id))
                          }
                        >
                          {inner}
                        </button>
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

      {/* reading line — what the hovered or pinned note is */}
      <div
        className="border-line mt-3 grid min-h-[3.75rem] gap-x-6 gap-y-1 border-t pt-2 md:grid-cols-[9rem_1fr_auto]"
        aria-live="polite"
      >
        {shown ? (
          <>
            <p className="text-ink-faint text-[13px]">{when(shown)}</p>
            <p className="text-[15px] leading-snug">
              <span className="text-ink font-medium">{shown.label}</span>
              <span className="text-ink-soft"> — {shown.detail}</span>
            </p>
            {shown.href &&
              (shown.href.startsWith('/') ? (
                <Link href={shown.href} className="row-link text-[13px]">
                  read the note →
                </Link>
              ) : (
                <a href={shown.href} className="row-link text-[13px]">
                  read the note →
                </a>
              ))}
          </>
        ) : (
          <p className="text-ink-faint text-[13px] md:col-span-3">
            hover or tap a note to read it.
          </p>
        )}
      </div>
    </div>
  )
}
