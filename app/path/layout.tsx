import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Record',
  description:
    'Studies, roles, research, swimming, and volunteering, with dates and results.',
}

export default function PathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
