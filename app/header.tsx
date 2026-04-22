'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { NAME, LOCATION } from './data'
import Image from 'next/image'

export function Header() {
  const subtitle = `Student & Developer · ${LOCATION}`
  
  return (
    <div className="relative mb-12">
      <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg">
        <Image 
          src="/banner.jpg" 
          alt="Background" 
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>
      
      <header className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <div>
          <Link 
            href="/" 
            className="font-semibold text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            {NAME}
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] mt-1"
            delay={0.5}
          >
            {subtitle}
          </TextEffect>
        </div>
      </header>
    </div>
  )
}
