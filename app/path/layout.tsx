import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Record',
  description:
    'I work on projects and research, swim with my school team, and volunteer alongside my studies. Here is a record of that work.',
}

export default function PathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
