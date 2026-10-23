import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Studious, Scribe, Notate, Foundry, Nomad, Synapse, and Hive: what each project does, who I worked with, and the result.',
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
