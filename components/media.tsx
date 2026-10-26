'use client'

import Image from 'next/image'
import { useReducedMotion } from 'motion/react'
import { ParallaxPlane } from '@/components/parallax'

/**
 * A photograph or a muted loop in a plain frame. Under reduced motion the
 * loop is replaced by its poster.
 */
export function Media({
  src,
  video,
  alt,
  caption,
  ratio = 'aspect-[4/3]',
  position = 'center',
  zoom = 1,
  travel = 0,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
}: {
  /** image, or the poster when `video` is set */
  src: string
  video?: string
  alt: string
  caption?: string
  ratio?: string
  position?: string
  /** display-only crop, preserving the original photograph */
  zoom?: number
  /** parallax drift of the picture inside its frame, as a fraction */
  travel?: number
  sizes?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const imageStyle = {
    objectPosition: position,
    transform: zoom === 1 ? undefined : `scale(${zoom})`,
  }
  const picture =
    video && !reduce ? (
      <video
        src={video}
        poster={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={imageStyle}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={imageStyle}
        sizes={sizes}
      />
    )
  return (
    <figure className={className}>
      <div className={`bg-mist relative overflow-hidden ${ratio}`}>
        {travel ? (
          <ParallaxPlane travel={travel}>{picture}</ParallaxPlane>
        ) : (
          picture
        )}
      </div>
      {caption && <figcaption className="label mt-2">{caption}</figcaption>}
    </figure>
  )
}
