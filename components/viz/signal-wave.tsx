'use client'

import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  bars?: number
  tone?: 'ink' | 'accent' | 'white'
}

export function SignalWave({
  className = '',
  bars = 64,
  tone = 'accent',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let t = 0

    const color =
      tone === 'white'
        ? 'rgba(255,255,255,0.72)'
        : tone === 'ink'
          ? 'rgba(18,24,30,0.55)'
          : 'rgba(26,106,98,0.85)'

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      t += reduce ? 0 : 0.016
      ctx.clearRect(0, 0, w, h)
      const gap = 3
      const bw = Math.max(2, (w - gap * (bars - 1)) / bars)
      const mid = h / 2

      for (let i = 0; i < bars; i++) {
        const n =
          0.35 +
          0.35 * Math.sin(t * 2.1 + i * 0.28) +
          0.25 * Math.sin(t * 3.4 + i * 0.11) +
          0.15 * Math.sin(t * 0.9 + i * 0.45)
        const bh = Math.max(4, n * h * 0.85)
        const x = i * (bw + gap)
        ctx.fillStyle = color
        ctx.globalAlpha = 0.35 + n * 0.65
        ctx.fillRect(x, mid - bh / 2, bw, bh)
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [bars, tone])

  return (
    <div ref={wrapRef} className={`relative h-24 w-full ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
