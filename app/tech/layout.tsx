import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech',
  description:
    'I tinker with computers, build software, and work on robots with my team. Here are the tools and ideas behind those projects.',
}

export default function TechLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
