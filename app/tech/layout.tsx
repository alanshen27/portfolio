import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech',
  description:
    'Alan Shen at the workbench — maths on the board, VEX robot builds, and hackathons.',
}

export default function TechLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
