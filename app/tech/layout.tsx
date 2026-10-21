import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech',
  description:
    'The tools I work with, the maths I am exploring, and projects I have contributed to in robotics and hackathons.',
}

export default function TechLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
