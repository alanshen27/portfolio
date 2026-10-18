'use client'

import { useEffect, useRef, useState } from 'react'

const PLAY_EVENT = 'portfolio-audio-play'

/** Native playback controls keep the recordings usable by keyboard and on mobile. */
export function PortfolioAudio({ title, src }: { title: string; src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const pauseOtherTrack = (event: Event) => {
      if (event.target !== audioRef.current) audioRef.current?.pause()
    }
    document.addEventListener(PLAY_EVENT, pauseOtherTrack)
    return () => document.removeEventListener(PLAY_EVENT, pauseOtherTrack)
  }, [])

  return (
    <div className="border-line mt-8 border-t pt-5">
      <p className="mb-3 text-sm">Listen / full recording</p>
      <audio
        ref={audioRef}
        controls
        preload="metadata"
        aria-label={`Listen to ${title}`}
        className="w-full"
        src={src}
        onPlay={(event) => {
          setFailed(false)
          event.currentTarget.dispatchEvent(
            new Event(PLAY_EVENT, { bubbles: true }),
          )
        }}
        onError={() => setFailed(true)}
      >
        <a href={src}>Open the recording of {title}</a>
      </audio>
      {failed && (
        <p role="status" className="text-ink-soft mt-3 text-sm">
          The recording could not load.{' '}
          <a href={src} className="rule-link">
            Open the audio file
          </a>{' '}
          or use the streaming link below.
        </p>
      )}
    </div>
  )
}
