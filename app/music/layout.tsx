import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music',
  description:
    "Alan Shen’s music on DistroKid — listen to the single I'd Stay on Spotify, Apple Music, and more.",
}

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
