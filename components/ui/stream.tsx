'use client'

import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type StreamContextValue = {
  currentIndex: number
  advance: (fromIndex: number) => void
  skipped: boolean
  skip: () => void
  typingSpeed: number
}

const StreamContext = createContext<StreamContextValue | null>(null)

function useStream(): StreamContextValue {
  const ctx = useContext(StreamContext)
  if (!ctx) {
    throw new Error('Stream children must be rendered inside <Stream>')
  }
  return ctx
}

type StreamChildProps = {
  __streamIndex?: number
}

export function Stream({
  children,
  className,
  typingSpeed = 4,
  showSkip = true,
}: {
  children: ReactNode
  className?: string
  /** Characters typed per animation tick (~16ms). Higher = faster. */
  typingSpeed?: number
  showSkip?: boolean
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [skipped, setSkipped] = useState(false)

  const advance = (fromIndex: number) => {
    setCurrentIndex((prev) => (fromIndex >= prev ? fromIndex + 1 : prev))
  }

  const skip = () => setSkipped(true)

  const items = useMemo(() => {
    return Children.toArray(children).filter(isValidElement) as ReactElement<
      StreamChildProps
    >[]
  }, [children])

  const total = items.length
  const done = skipped || currentIndex >= total

  return (
    <StreamContext.Provider
      value={{ currentIndex, advance, skipped, skip, typingSpeed }}
    >
      <div className={cn('font-mono text-[15px] leading-relaxed', className)}>
        {items.map((child, i) =>
          cloneElement(child, { __streamIndex: i, key: child.key ?? i }),
        )}
        {showSkip && !done && (
          <button
            type="button"
            onClick={skip}
            className="fixed bottom-4 right-4 z-50 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs text-zinc-600 shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            skip ▸
          </button>
        )}
      </div>
    </StreamContext.Provider>
  )
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-[1px] inline-block w-[0.55ch] translate-y-[1px] animate-pulse bg-zinc-800 dark:bg-zinc-100"
      style={{ height: '1em' }}
    >
      &nbsp;
    </span>
  )
}

/** Inline markdown-ish renderer: supports **bold**, `code`, [text](url) */
function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = []
  const regex = /(\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[2] !== undefined) {
      nodes.push(
        <strong
          key={key++}
          className="font-semibold text-zinc-900 dark:text-zinc-50"
        >
          {match[2]}
        </strong>,
      )
    } else if (match[3] !== undefined) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-zinc-100 px-1 py-0.5 text-[0.9em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
        >
          {match[3]}
        </code>,
      )
    } else if (match[4] !== undefined) {
      nodes.push(
        <a
          key={key++}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 underline decoration-sky-400/40 underline-offset-[3px] transition hover:decoration-sky-600 dark:text-sky-400 dark:decoration-sky-400/40 dark:hover:decoration-sky-300"
        >
          {match[4]}
        </a>,
      )
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

/** Shared typewriter effect for a single text block. */
function useTypewriter({
  text,
  index,
  charsPerTick,
  tickMs = 16,
}: {
  text: string
  index: number
  charsPerTick?: number
  tickMs?: number
}) {
  const { currentIndex, advance, skipped, typingSpeed } = useStream()
  const speed = charsPerTick ?? typingSpeed
  const active = currentIndex === index
  const past = currentIndex > index || skipped
  const [displayed, setDisplayed] = useState('')
  const doneRef = useRef(false)

  useEffect(() => {
    if (past) {
      setDisplayed(text)
      if (!doneRef.current) {
        doneRef.current = true
      }
      return
    }
    if (!active) {
      setDisplayed('')
      doneRef.current = false
      return
    }
    let i = 0
    setDisplayed('')
    doneRef.current = false
    const id = window.setInterval(() => {
      i = Math.min(text.length, i + speed)
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        window.clearInterval(id)
        doneRef.current = true
        // small pause before advancing so the caret rests at line end
        window.setTimeout(() => advance(index), 120)
      }
    }, tickMs)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, past])

  return { displayed, active, past, visible: active || past }
}

type BaseProps = StreamChildProps & {
  children?: ReactNode
}

/** A markdown heading. `level` controls h1/h2/h3. */
export function Head({
  children,
  level = 2,
  image,
  alt,
  href,
  imageBg,
  __streamIndex = 0,
}: BaseProps & {
  level?: 1 | 2 | 3
  image?: string
  alt?: string
  href?: string
  imageBg?: string
}) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const hash = '#'.repeat(level) + ' '
  const { displayed, active, visible } = useTypewriter({
    text,
    index: __streamIndex,
  })
  if (!visible) return null

  const sizeClass =
    level === 1
      ? 'text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-2 mb-2 tracking-tight'
      : level === 2
        ? 'text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3'
        : 'text-base font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-2'

  const Tag = (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3') as
    | 'h1'
    | 'h2'
    | 'h3'

  const iconSize = level === 1 ? 32 : level === 2 ? 22 : 18

  const titleBody = (
    <>
      {renderInline(displayed)}
      {active && <Caret />}
    </>
  )

  return (
    <Tag className={cn(sizeClass, 'flex items-center gap-2')}>
      <span className="select-none text-zinc-400 dark:text-zinc-600">
        {hash.trim()}
      </span>
      {image && (
        <span
          style={{ width: iconSize, height: iconSize }}
          className={cn(
            'inline-flex shrink-0 items-center justify-center rounded p-0.5 ring-1 ring-zinc-200 dark:ring-zinc-800',
            imageBg ?? 'bg-white dark:bg-zinc-100',
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt ?? ''}
            className="h-full w-full object-contain"
          />
        </span>
      )}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {titleBody}
        </a>
      ) : (
        titleBody
      )}
    </Tag>
  )
}

/** A plain paragraph block. Accepts a string for typing. */
export function Paragraph({
  children,
  className,
  __streamIndex = 0,
}: BaseProps & { className?: string }) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const { displayed, active, visible } = useTypewriter({
    text,
    index: __streamIndex,
  })
  if (!visible) return null
  return (
    <p
      className={cn(
        'my-2 whitespace-pre-wrap text-zinc-700 dark:text-zinc-300',
        className,
      )}
    >
      {renderInline(displayed)}
      {active && <Caret />}
    </p>
  )
}

/** Blockquote (`> ...`). */
export function Quote({
  children,
  __streamIndex = 0,
}: BaseProps) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const { displayed, active, visible } = useTypewriter({
    text,
    index: __streamIndex,
  })
  if (!visible) return null
  return (
    <blockquote className="my-3 border-l-2 border-zinc-300 pl-3 italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
      <span className="mr-1 select-none not-italic text-zinc-400 dark:text-zinc-600">
        &gt;
      </span>
      {renderInline(displayed)}
      {active && <Caret />}
    </blockquote>
  )
}

/** A list item (`- ...`). Optionally shows an inline thumbnail/logo or a hover preview. */
export function Bullet({
  children,
  image,
  alt,
  href,
  imageSize = 36,
  imageBg,
  hoverImage,
  hoverImageSize = 280,
  __streamIndex = 0,
}: BaseProps & {
  image?: string
  alt?: string
  href?: string
  imageSize?: number
  imageBg?: string
  hoverImage?: string
  hoverImageSize?: number
}) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const { displayed, active, visible } = useTypewriter({
    text,
    index: __streamIndex,
  })
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null)

  if (!visible) return null

  const body = (
    <span className="flex-1">
      {renderInline(displayed)}
      {active && <Caret />}
    </span>
  )

  const linkClass = hoverImage
    ? 'flex-1 text-sky-600 underline decoration-sky-400/40 underline-offset-[3px] hover:decoration-sky-600 dark:text-sky-400 dark:decoration-sky-400/40 dark:hover:decoration-sky-300'
    : 'flex-1 hover:underline'

  const handleMove = hoverImage
    ? (e: React.MouseEvent) => {
        const pad = 16
        const size = hoverImageSize
        const maxX = window.innerWidth - size - pad
        const maxY = window.innerHeight - (size * 9) / 16 - pad
        setHover({
          x: Math.min(e.clientX + pad, maxX),
          y: Math.min(e.clientY + pad, maxY),
        })
      }
    : undefined

  const handleLeave = hoverImage ? () => setHover(null) : undefined

  return (
    <div className="my-1 flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
      <span className="mt-[0.35em] select-none text-zinc-400 dark:text-zinc-600">
        -
      </span>
      {image && (
        <span
          style={{ width: imageSize, height: imageSize }}
          className={cn(
            'mt-[0.15em] inline-flex shrink-0 items-center justify-center rounded p-1 ring-1 ring-zinc-200 dark:ring-zinc-800',
            imageBg ?? 'bg-white dark:bg-zinc-100',
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt ?? ''}
            className="h-full w-full object-contain"
          />
        </span>
      )}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {body}
        </a>
      ) : (
        body
      )}
      {hoverImage && hover && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.12 }}
          style={{
            position: 'fixed',
            top: hover.y,
            left: hover.x,
            width: hoverImageSize,
            pointerEvents: 'none',
            zIndex: 60,
          }}
          className="overflow-hidden rounded-lg bg-white/90 p-1 shadow-xl ring-1 ring-zinc-200 backdrop-blur dark:bg-zinc-900/90 dark:ring-zinc-700"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hoverImage}
            alt={alt ?? ''}
            className="block w-full rounded-md object-cover"
          />
        </motion.div>
      )}
    </div>
  )
}

/** Horizontal rule (`---`). Auto-advances. */
export function Rule({ __streamIndex = 0 }: BaseProps) {
  const { currentIndex, advance, skipped } = useStream()
  const active = currentIndex === __streamIndex
  const visible = currentIndex >= __streamIndex || skipped
  useEffect(() => {
    if (!active) return
    const id = window.setTimeout(() => advance(__streamIndex), 60)
    return () => window.clearTimeout(id)
  }, [active, advance, __streamIndex])
  if (!visible) return null
  return (
    <div className="my-6 flex items-center gap-2 text-zinc-300 dark:text-zinc-700">
      <span className="select-none">---</span>
      <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
    </div>
  )
}

/** Empty vertical space. Auto-advances. */
export function Spacer({
  __streamIndex = 0,
  size = 'md',
}: BaseProps & { size?: 'sm' | 'md' | 'lg' }) {
  const { currentIndex, advance, skipped } = useStream()
  const active = currentIndex === __streamIndex
  const visible = currentIndex >= __streamIndex || skipped
  useEffect(() => {
    if (!active) return
    const id = window.setTimeout(() => advance(__streamIndex), 0)
    return () => window.clearTimeout(id)
  }, [active, advance, __streamIndex])
  if (!visible) return null
  const h = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-8' : 'h-4'
  return <div className={h} />
}

/** A larger inline figure (e.g. a project screenshot). Fades in, auto-advances. */
export function Figure({
  src,
  alt,
  href,
  caption,
  __streamIndex = 0,
  delay = 150,
}: BaseProps & {
  src: string
  alt?: string
  href?: string
  caption?: string
  delay?: number
}) {
  const { currentIndex, advance, skipped } = useStream()
  const active = currentIndex === __streamIndex
  const visible = currentIndex >= __streamIndex || skipped
  useEffect(() => {
    if (!active) return
    const id = window.setTimeout(() => advance(__streamIndex), delay)
    return () => window.clearTimeout(id)
  }, [active, advance, __streamIndex, delay])
  if (!visible) return null

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ''}
      className="w-full rounded-lg object-cover ring-1 ring-zinc-200 transition hover:ring-zinc-300 dark:ring-zinc-800 dark:hover:ring-zinc-700"
    />
  )

  return (
    <motion.figure
      initial={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.35 }}
      className="my-3"
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {img}
        </a>
      ) : (
        img
      )}
      {caption && (
        <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}

/** A rich node that fades in when it's its turn, then auto-advances. */
export function Node({
  children,
  __streamIndex = 0,
  delay = 200,
}: BaseProps & { delay?: number }) {
  const { currentIndex, advance, skipped } = useStream()
  const active = currentIndex === __streamIndex
  const visible = currentIndex >= __streamIndex || skipped
  useEffect(() => {
    if (!active) return
    const id = window.setTimeout(() => advance(__streamIndex), delay)
    return () => window.clearTimeout(id)
  }, [active, advance, __streamIndex, delay])
  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.35 }}
      className="my-3"
    >
      {children}
    </motion.div>
  )
}
