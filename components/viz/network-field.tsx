'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

type Props = {
  className?: string
  nodeCount?: number
  tone?: 'light' | 'dark'
}

/**
 * Interactive particle network — mouse attracts nearby nodes.
 */
export function NetworkField({
  className = '',
  nodeCount = 48,
  tone = 'dark',
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
    const mouse = { x: -9999, y: -9999, active: false }
    const nodes: Node[] = []

    const accent =
      tone === 'dark' ? 'rgba(26, 106, 98, 0.9)' : 'rgba(26, 106, 98, 0.75)'
    const line =
      tone === 'dark' ? 'rgba(168, 196, 210, 0.22)' : 'rgba(18, 24, 30, 0.12)'
    const fill =
      tone === 'dark' ? 'rgba(238, 242, 244, 0.75)' : 'rgba(18, 24, 30, 0.55)'

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

      if (nodes.length === 0) {
        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: 1.2 + Math.random() * 1.8,
          })
        }
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        if (!reduce) {
          if (mouse.active) {
            const dx = mouse.x - n.x
            const dy = mouse.y - n.y
            const dist = Math.hypot(dx, dy) || 1
            if (dist < 180) {
              n.vx += (dx / dist) * 0.02
              n.vy += (dy / dist) * 0.02
            }
          }

          n.vx *= 0.985
          n.vy *= 0.985
          n.x += n.vx
          n.y += n.vy

          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          n.x = Math.max(0, Math.min(w, n.x))
          n.y = Math.max(0, Math.min(h, n.y))
        }

        ctx.beginPath()
        ctx.fillStyle = fill
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      const linkDist = Math.min(140, w * 0.18)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!
          const b = nodes[j]!
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDist) {
            ctx.beginPath()
            ctx.strokeStyle = line
            ctx.globalAlpha = 1 - dist / linkDist
            ctx.lineWidth = 1
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      if (mouse.active) {
        ctx.beginPath()
        ctx.strokeStyle = accent
        ctx.lineWidth = 1
        ctx.arc(mouse.x, mouse.y, 28, 0, Math.PI * 2)
        ctx.stroke()
      }

      raf = requestAnimationFrame(step)
    }

    resize()
    step()
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [nodeCount, tone])

  return (
    <div ref={wrapRef} className={`absolute inset-0 ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
