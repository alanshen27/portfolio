import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'I am Alan, a student at Institut Le Rosey interested in learning, software, and music. Here is a little about me and how to get in touch.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
