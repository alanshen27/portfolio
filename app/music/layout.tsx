import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Violin and piano, concertmaster of the Le Rosey Orchestra and Camerata in Grades 11 and 12, five composed songs, and two released singles.',
}

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
