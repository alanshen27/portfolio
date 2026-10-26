import type { Metadata } from 'next'
import { SUMMARY } from '../data'

export const metadata: Metadata = {
  title: 'About',
  description: SUMMARY,
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
