import { Fade } from '@/components/beats'
import { Media } from '@/components/media'

export type Tile = {
  src: string
  video?: string
  alt: string
  caption: string
  ratio: string
  /** stretches to meet the bottom of the tallest column */
  grow?: boolean
  position?: string
}

/**
 * Three columns of pictures at their own proportions. Exactly one column
 * should have no `grow` tile; it sets the height the others stretch to.
 */
export function Masonry({ columns }: { columns: Tile[][] }) {
  return (
    <div className="grid gap-x-3 gap-y-6 md:grid-cols-3">
      {columns.map((column, c) => (
        <div key={c} className="flex flex-col gap-6">
          {column.map((m) => (
            <Fade
              key={m.src}
              delay={c * 0.06}
              className={m.grow ? 'flex flex-col md:flex-1' : ''}
            >
              <Media
                src={m.src}
                video={m.video}
                alt={m.alt}
                caption={m.caption}
                position={m.position}
                ratio={
                  m.grow
                    ? `${m.ratio} md:aspect-auto md:min-h-0 md:flex-1`
                    : m.ratio
                }
                className={m.grow ? 'flex flex-col md:flex-1' : ''}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </Fade>
          ))}
        </div>
      ))}
    </div>
  )
}
