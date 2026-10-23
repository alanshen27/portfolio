import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech',
  description:
    'The stack behind Studious, Scribe, and Notate, plus VEX Robotics and hackathon projects.',
}

export default function TechLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
