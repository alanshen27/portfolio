import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects by Alan Shen — Studious, Nomad, Scribe, Synapse, and Hive.',
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
