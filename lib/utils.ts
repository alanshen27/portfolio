import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "September 2023" → "Sep 2023"; leaves already-short strings alone. */
export function shortDate(value: string) {
  return value.replace(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g,
    (m) => m.slice(0, 3),
  )
}

export function dateRange(start: string, end: string) {
  const s = shortDate(start)
  const e = shortDate(end)
  return s === e ? s : `${s} – ${e}`
}

const ROMAN = [
  '',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
]

/** 1 → "I", 4 → "IV" — programme numbering. */
export function roman(n: number) {
  return ROMAN[n] ?? String(n)
}
