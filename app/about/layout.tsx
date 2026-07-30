import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Alan Shen — Institut Le Rosey student, founder, developer, musician. Get in touch.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
