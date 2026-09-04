import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f1eee8',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://alanshen.me/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Alan Shen — a programme of work',
    template: '%s | Alan Shen',
  },
  description:
    'High school founder and developer. Studious & Scribe, USACO Gold, VEX Worlds, research, and music.',
  openGraph: {
    type: 'website',
    url: 'https://alanshen.me/',
    title: 'Alan Shen | High School Founder & Developer',
    description:
      'Studious & Scribe founder. USACO Gold, VEX Worlds qualifier, forthcoming Cambridge University Press research, ABRSM Grade 8 violin & piano.',
    images: [
      {
        url: '/media/site/banner.jpg',
        width: 4032,
        height: 3024,
        alt: 'Alan Shen performing violin on stage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/media/site/banner.jpg'],
  },
}

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const instrument = Instrument_Sans({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['wdth'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrument.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
