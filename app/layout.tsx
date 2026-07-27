import type { Metadata, Viewport } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f3f6f8',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://alanshen.me/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Alan Shen — Founder, Developer & Student',
    template: '%s | Alan Shen',
  },
  description:
    'High school student at Institut Le Rosey. 2× founder (Studious, Scribe), USACO Gold ’26, VEX Worlds Qualifier, hackathon podium finisher, and research author forthcoming with Cambridge University Press 2026.',
}

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
