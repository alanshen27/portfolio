import type { Metadata } from 'next'
import { MUSIC_INTRO } from '../data'

export const metadata: Metadata = {
  title: 'Music',
  description: MUSIC_INTRO,
}

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
