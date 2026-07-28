import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Path',
  description:
    'Experience, athletics, awards, and research — Alan Shen’s path as founder, competitor, and student.',
}

export default function PathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
