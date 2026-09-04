'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { MusicRelease } from '@/app/data'

function fmt(sec: number) {
  if (!Number.isFinite(sec) || sec <= 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function TrackPlayer({ track }: { track: MusicRelease }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setProgress(audio.currentTime || 0)
    const onMeta = () => setDuration(audio.duration || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onPause)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onPause)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      // Only one track at a time
      document.querySelectorAll('audio').forEach((a) => {
        if (a !== audio) a.pause()
      })
      void audio.play()
    } else {
      audio.pause()
    }
  }

  const seek = (e: PointerEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
  }

  const streamLink = track.hyperfollow ?? track.links[0]?.href

  return (
    <div className="border-line bg-bg-elevated flex gap-4 border p-4 md:gap-5 md:p-5">
      {track.audio && (
        <audio ref={audioRef} src={track.audio} preload="metadata" />
      )}

      <div className="relative h-20 w-20 shrink-0 overflow-hidden md:h-24 md:w-24">
        <Image
          src={track.cover}
          alt={`${track.title} cover art`}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="display-quiet text-ink truncate text-lg md:text-xl">
            {track.title}
          </p>
          <span className="text-ink-faint shrink-0 text-[10px] font-medium tracking-[0.12em] uppercase">
            {track.type}
          </span>
        </div>

        {track.audio ? (
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              aria-label={
                playing ? `Pause ${track.title}` : `Play ${track.title}`
              }
              className="bg-ink hover:bg-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors"
            >
              {playing ? (
                <span className="flex gap-[3px]" aria-hidden>
                  <span className="h-3 w-[3px] bg-current" />
                  <span className="h-3 w-[3px] bg-current" />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="ml-0.5 border-y-[6px] border-l-[9px] border-y-transparent border-l-current"
                />
              )}
            </button>
            <div
              className="group relative h-6 flex-1 cursor-pointer"
              onPointerDown={seek}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={progress}
            >
              <div className="bg-line absolute top-1/2 right-0 left-0 h-[3px] -translate-y-1/2" />
              <div
                className="bg-accent absolute top-1/2 left-0 h-[3px] -translate-y-1/2"
                style={{
                  width: `${duration ? (progress / duration) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="text-ink-faint shrink-0 text-[11px] tabular-nums">
              {fmt(progress)} / {fmt(duration)}
            </span>
          </div>
        ) : null}

        {streamLink && (
          <a
            href={streamLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent mt-2 inline-flex items-center gap-1 self-start text-[12px] transition-opacity hover:opacity-70"
          >
            Stream everywhere
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </div>
  )
}
