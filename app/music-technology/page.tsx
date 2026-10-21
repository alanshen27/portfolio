import type { Metadata } from 'next'
import { MusicPortfolioExperience } from '@/components/music-portfolio-experience'
import './portfolio.css'
import { PORTFOLIO_WORKS } from './works'

const title = 'Music & Technology'
const description =
  'Three ways I have explored making music: songwriting in Regrets, movement in Inkform 拳墨, and call and response with Notate in 蝶戀花 — Butterflies in Love with Flowers.'

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
