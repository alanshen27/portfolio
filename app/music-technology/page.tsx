import type { Metadata } from 'next'
import { MusicPortfolioExperience } from '@/components/music-portfolio-experience'
import './portfolio.css'
import { PORTFOLIO_WORKS } from './works'

const title = 'Music & Technology'
const description =
  'Selected work by Alan Shen: Regrets, an original song; inkform 拳墨, movement turned into music; and 問答 Wèndá — Call & Blossom, a musical dialogue with notate.'

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
