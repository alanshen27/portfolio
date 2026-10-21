import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Record',
  description:
    'My studies, research contributions, team activities, swimming, and volunteering, with dates and details.',
}

export default function PathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
