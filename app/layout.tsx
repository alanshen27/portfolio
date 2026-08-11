import type { Metadata, Viewport } from 'next'
import { Fraunces, JetBrains_Mono, Outfit } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#eef2f4',
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
    'Institut Le Rosey, Class of 2027. 2× founder (Studious, Scribe), USACO Gold ’26, VEX Worlds qualifier, 3× hackathon podium, published researcher (Cambridge University Press, forthcoming), ABRSM Grade 8 violinist and pianist.',
}

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
      <body
        className={`${fraunces.variable} ${outfit.variable} ${jetbrains.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
