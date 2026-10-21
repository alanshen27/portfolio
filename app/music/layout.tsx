import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'I play violin and piano, write songs, and experiment with interactive music. Listen to my releases and explore my performances and projects.',
}

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
