'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import type { MusicRelease } from '@/app/data'
import { easeSnap } from '@/components/portfolio-motion'

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function NowPlaying({
  track,
  className = '',
}: {
  track: MusicRelease
  className?: string
}) {
  const reduce = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const stickyCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const dataRef = useRef<Uint8Array | null>(null)
  const smoothRef = useRef<Float32Array | null>(null)
  const rafRef = useRef(0)

  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [needsGesture, setNeedsGesture] = useState(false)
  const [sticky, setSticky] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSticky(y > 520)
  })

  const ensureGraph = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return null

    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      ctxRef.current = new Ctx()
    }

    const ctx = ctxRef.current
    if (ctx.state === 'suspended') await ctx.resume()

    if (!sourceRef.current) {
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8
      const source = ctx.createMediaElementSource(audio)
      source.connect(analyser)
      analyser.connect(ctx.destination)
      analyserRef.current = analyser
      sourceRef.current = source
      dataRef.current = new Uint8Array(analyser.frequencyBinCount)
      smoothRef.current = new Float32Array(analyser.frequencyBinCount)
    }

    return analyserRef.current
  }, [])

  const paint = useCallback(
    (canvas: HTMLCanvasElement | null, compact = false) => {
      const analyser = analyserRef.current
      const data = dataRef.current
      const smooth = smoothRef.current
      if (!canvas || !analyser || !data || !smooth) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w < 2 || h < 2) return

      if (
        canvas.width !== Math.floor(w * dpr) ||
        canvas.height !== Math.floor(h * dpr)
      ) {
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
      }

      const c = canvas.getContext('2d')
      if (!c) return

      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.clearRect(0, 0, w, h)

      analyser.getByteFrequencyData(data as unknown as Uint8Array<ArrayBuffer>)

      const bins = Math.min(48, data.length)
      for (let i = 0; i < bins; i++) {
        const target = data[i] / 255
        smooth[i] += (target - smooth[i]) * 0.28
      }

      const barCount = compact ? 36 : 52
      const gap = compact ? 2 : 3
      const barW = (w - gap * (barCount - 1)) / barCount
      const mid = h * 0.55

      for (let i = 0; i < barCount; i++) {
        const idx = Math.floor((i / barCount) * (bins - 1))
        const amp = smooth[idx] ?? 0
        const barH = Math.max(2, amp * h * (compact ? 0.7 : 0.85))
        const x = i * (barW + gap)
        const y = mid - barH * 0.65

        const grad = c.createLinearGradient(x, y + barH, x, y)
        grad.addColorStop(0, `rgba(13, 107, 107, ${0.25 + amp * 0.75})`)
        grad.addColorStop(1, `rgba(183, 205, 216, ${0.35 + amp * 0.65})`)
        c.fillStyle = grad
        c.fillRect(x, y, Math.max(1.5, barW), barH)

        // faint mirror below
        c.fillStyle = `rgba(183, 205, 216, ${0.08 + amp * 0.18})`
        c.fillRect(x, mid + 2, Math.max(1.5, barW), barH * 0.28)
      }
    },
    [],
  )

  const draw = useCallback(() => {
    paint(canvasRef.current, false)
    paint(stickyCanvasRef.current, true)
    rafRef.current = requestAnimationFrame(draw)
  }, [paint])

  useEffect(() => {
    if (reduce) return
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw, reduce])

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !track.audio) return false
    try {
      await ensureGraph()
      await audio.play()
      setPlaying(true)
      setNeedsGesture(false)
      return true
    } catch {
      setNeedsGesture(true)
      setPlaying(false)
      return false
    }
  }, [track.audio, ensureGraph])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track.audio) return

    audio.src = track.audio
    audio.crossOrigin = 'anonymous'
    audio.load()

    const onMeta = () => setDuration(audio.duration || 0)
    const onTime = () => setProgress(audio.currentTime || 0)
    const onEnded = () => setPlaying(false)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    void tryPlay()

    return () => {
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [track.audio, tryPlay])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      void ctxRef.current?.close()
      ctxRef.current = null
      sourceRef.current = null
      analyserRef.current = null
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || !track.audio) return
    if (audio.paused) {
      await tryPlay()
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const seek = (e: ReactPointerEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setProgress(audio.currentTime)
  }

  const pct = duration ? (progress / duration) * 100 : 0

  const controls = (
    <>
      <button
        type="button"
        onClick={toggle}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-white text-ink transition-colors hover:bg-mist"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <span className="flex gap-1" aria-hidden>
            <span className="h-3.5 w-1 bg-ink" />
            <span className="h-3.5 w-1 bg-ink" />
          </span>
        ) : (
          <span
            className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-ink"
            aria-hidden
          />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {track.title}
            </p>
            <p className="truncate text-xs text-white/55">
              {track.artist} · {track.type}
            </p>
          </div>
          <span className="shrink-0 text-[10px] tracking-[0.16em] text-lake uppercase">
            {needsGesture && !playing ? 'Tap play' : 'Now playing'}
          </span>
        </div>
        <div
          className="mt-2 h-1 cursor-pointer bg-white/15"
          onPointerDown={seek}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={progress}
        >
          <div
            className="h-full bg-accent transition-[width] duration-75"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-white/45">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </>
  )

  return (
    <>
      <audio ref={audioRef} preload="auto" playsInline crossOrigin="anonymous" />

      <motion.div
        className={`relative overflow-hidden border border-white/15 bg-ink/75 backdrop-blur-md ${className}`}
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85, ease: easeSnap }}
      >
        {needsGesture && !playing && (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 z-20 flex items-center justify-center bg-ink/55 text-sm font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-[2px]"
          >
            Tap to play — {track.title}
          </button>
        )}

        {!reduce && (
          <div className="relative h-20 w-full border-b border-white/10 md:h-24">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
        )}

        <div className="flex items-center gap-3 p-3 md:gap-4 md:p-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden md:h-16 md:w-16">
            <Image
              src={track.cover}
              alt={`${track.title} cover`}
              fill
              className="object-cover"
              sizes="64px"
              priority
            />
            {playing && (
              <span className="absolute inset-0 flex items-end justify-center gap-0.5 bg-ink/20 pb-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-0.5 bg-white"
                    animate={{ height: ['4px', '12px', '4px'] }}
                    transition={{
                      duration: 0.55,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </span>
            )}
          </div>
          {controls}
          <Link
            href="/music"
            className="hidden shrink-0 text-xs tracking-[0.14em] text-accent uppercase hover:text-white sm:inline"
          >
            More →
          </Link>
        </div>
      </motion.div>

      {sticky && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 backdrop-blur-md md:left-16 lg:left-[4.5rem]"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.35, ease: easeSnap }}
        >
          {!reduce && (
            <div className="relative h-10 w-full border-b border-white/5">
              <canvas
                ref={stickyCanvasRef}
                className="absolute inset-0 h-full w-full opacity-80"
                aria-hidden
              />
            </div>
          )}
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 md:px-8">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden">
              <Image
                src={track.cover}
                alt=""
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            {controls}
            <Link
              href="/music"
              className="hidden shrink-0 text-xs tracking-[0.14em] text-accent uppercase hover:text-white sm:inline"
            >
              Music →
            </Link>
          </div>
        </motion.div>
      )}
    </>
  )
}
