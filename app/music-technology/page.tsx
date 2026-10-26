import type { Metadata } from 'next'
import { MusicPortfolioExperience } from '@/components/music-portfolio-experience'
import './portfolio.css'
import { PORTFOLIO_WORKS } from './works'

const title = 'Music & Technology'
const description =
  'I explore how technology can intertwine with music through Inkform 拳墨, 蝶戀花 — Butterflies in Love with Flowers, and Regrets.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/music-technology' },
  openGraph: {
    title: `${title} | Alan Shen`,
    description,
    url: '/music-technology',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: `${title} | Alan Shen`,
    description,
    images: [],
  },
}

export default function MusicTechnologyPage() {
  return <MusicPortfolioExperience works={PORTFOLIO_WORKS} />
}
