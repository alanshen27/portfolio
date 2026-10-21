import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Projects I have started or contributed to, including Studious, Scribe, Notate, Foundry, Nomad, Synapse, and Hive.',
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
