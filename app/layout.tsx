import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Outfit } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#e9eef3',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://alanshen.me/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Alan Shen | High School Founder & Developer',
    template: '%s | Alan Shen',
  },
  description:
    'High school founder and developer. Studious & Scribe, USACO Gold, VEX Worlds, research, and music.',
}

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetbrains.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
