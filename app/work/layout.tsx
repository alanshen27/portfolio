import type { Metadata } from 'next'
import { TAGLINE } from '../data'

export const metadata: Metadata = {
  title: 'Work',
  description: TAGLINE,
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
