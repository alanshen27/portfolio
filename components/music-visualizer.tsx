'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import type { MusicRelease } from '@/app/data'

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function MusicVisualizer({ tracks }: { tracks: MusicRelease[] }) {
  const [activeId, setActiveId] = useState(tracks[0]?.id ?? '')
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ready, setReady] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const rafRef = useRef<number>(0)
  const dataRef = useRef<Uint8Array | null>(null)
  const smoothRef = useRef<Float32Array | null>(null)
  const pendingPlayRef = useRef(false)

  const track = tracks.find((t) => t.id === activeId) ?? tracks[0]

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
      analyser.smoothingTimeConstant = 0.82
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

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const analyser = analyserRef.current
    const data = dataRef.current
    const smooth = smoothRef.current
    if (!canvas || !analyser || !data || !smooth) {
      rafRef.current = requestAnimationFrame(draw)
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
    }

    const c = canvas.getContext('2d')
    if (!c) return

    c.setTransform(dpr, 0, 0, dpr, 0, 0)
    c.clearRect(0, 0, w, h)

    analyser.getByteFrequencyData(data as unknown as Uint8Array<ArrayBuffer>)

    const bins = Math.min(64, data.length)
    for (let i = 0; i < bins; i++) {
      const target = data[i] / 255
      smooth[i] += (target - smooth[i]) * 0.22
    }

    // Soft radial wash
    const cx = w * 0.5
    const cy = h * 0.52
    const glow = c.createRadialGradient(cx, cy, 20, cx, cy, Math.max(w, h) * 0.55)
    glow.addColorStop(0, 'rgba(15, 110, 110, 0.22)')
    glow.addColorStop(0.45, 'rgba(183, 205, 216, 0.12)')
    glow.addColorStop(1, 'rgba(18, 24, 31, 0)')
    c.fillStyle = glow
    c.fillRect(0, 0, w, h)

    // Mirrored frequency arcs
    const barCount = 48
    const radius = Math.min(w, h) * 0.18
    for (let i = 0; i < barCount; i++) {
      const t = i / barCount
      const idx = Math.floor(t * (bins - 1))
      const amp = smooth[idx] ?? 0
      const angle = -Math.PI / 2 + t * Math.PI * 2
      const len = 12 + amp * Math.min(w, h) * 0.22
      const x0 = cx + Math.cos(angle) * radius
      const y0 = cy + Math.sin(angle) * radius
      const x1 = cx + Math.cos(angle) * (radius + len)
      const y1 = cy + Math.sin(angle) * (radius + len)

      const grad = c.createLinearGradient(x0, y0, x1, y1)
      grad.addColorStop(0, `rgba(15, 110, 110, ${0.15 + amp * 0.55})`)
      grad.addColorStop(1, `rgba(220, 231, 238, ${0.2 + amp * 0.7})`)
      c.strokeStyle = grad
      c.lineWidth = 2.5
      c.lineCap = 'round'
      c.beginPath()
      c.moveTo(x0, y0)
      c.lineTo(x1, y1)
      c.stroke()
    }

    // Bottom waveform ribbon
    const ribbonY = h * 0.82
    c.beginPath()
    for (let i = 0; i < barCount; i++) {
      const x = (i / (barCount - 1)) * w
      const idx = Math.floor((i / barCount) * (bins - 1))
      const amp = smooth[idx] ?? 0
      const y = ribbonY - amp * h * 0.18
      if (i === 0) c.moveTo(x, y)
      else c.lineTo(x, y)
    }
    c.strokeStyle = 'rgba(15, 110, 110, 0.55)'
    c.lineWidth = 2
    c.stroke()

    // Mirror below
    c.beginPath()
    for (let i = 0; i < barCount; i++) {
      const x = (i / (barCount - 1)) * w
      const idx = Math.floor((i / barCount) * (bins - 1))
      const amp = smooth[idx] ?? 0
      const y = ribbonY + amp * h * 0.1
      if (i === 0) c.moveTo(x, y)
      else c.lineTo(x, y)
    }
    c.strokeStyle = 'rgba(183, 205, 216, 0.45)'
    c.lineWidth = 1.5
    c.stroke()

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track?.audio) return

    audio.src = track.audio
    audio.load()
    setProgress(0)
    setReady(false)
    setPlaying(false)

    const onMeta = async () => {
      setDuration(audio.duration || 0)
      setReady(true)
      if (pendingPlayRef.current) {
        pendingPlayRef.current = false
        try {
          await ensureGraph()
          await audio.play()
          setPlaying(true)
        } catch {
          setPlaying(false)
        }
      }
    }
    const onTime = () => setProgress(audio.currentTime || 0)
    const onEnded = () => setPlaying(false)

    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
    }
  }, [track?.audio, track?.id, ensureGraph])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || !track?.audio) return
    await ensureGraph()
    if (audio.paused) {
      await audio.play()
      setPlaying(true)
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

  const selectTrack = async (id: string) => {
    if (id === activeId) {
      await toggle()
      return
    }
    pendingPlayRef.current = true
    setActiveId(id)
  }

  if (!track) return null

  return (
    <div className="overflow-hidden border border-line bg-ink text-white">
      <audio ref={audioRef} preload="metadata" />

      <div ref={wrapRef} className="relative min-h-[420px] md:min-h-[520px]">
        {track.cover && (
          <Image
            src={track.cover}
            alt=""
            fill
            className="object-cover opacity-35 blur-sm scale-105"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />

        <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between p-6 md:min-h-[520px] md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.18em] text-lake uppercase">
                Now playing
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-5xl">
                {track.title}
              </h2>
              <p className="mt-2 text-sm text-white/70">
                {track.artist} · {track.type}
              </p>
            </div>
            <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-white/15 md:h-28 md:w-28">
              <Image
                src={track.cover}
                alt={`${track.title} cover`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
          </div>

          <div>
            <div
              className="group relative h-1.5 cursor-pointer bg-white/15"
              onPointerDown={seek}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={progress}
            >
              <div
                className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-75"
                style={{
                  width: `${duration ? (progress / duration) * 100 : 0}%`,
                }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/55">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggle}
                disabled={!ready && !track.audio}
                className="inline-flex min-w-28 items-center justify-center bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-mist disabled:opacity-50"
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              {track.hyperfollow && (
                <a
                  href={track.hyperfollow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Stream everywhere
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-ink/95">
        <ul>
          {tracks.map((t) => {
            const active = t.id === track.id
            return (
              <li key={t.id} className="border-b border-white/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() => selectTrack(t.id)}
                  className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors md:px-8 ${
                    active ? 'bg-white/8' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden bg-white/10">
                    <Image
                      src={t.cover}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-white">
                      {t.title}
                    </span>
                    <span className="block text-sm text-white/55">
                      {t.type}
                      {t.audio ? ' · Local preview' : ''}
                    </span>
                  </span>
                  <span className="text-sm text-accent">
                    {active && playing ? 'Playing' : 'Play'}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
