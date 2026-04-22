'use client'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { cn } from '@/lib/utils'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type ThemeSwitchProps = {
  /** Control the button/icon scale. */
  size?: 'sm' | 'md'
  className?: string
}

export function ThemeSwitch({ size = 'md', className }: ThemeSwitchProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const buttonSize = size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'

  const options = [
    { label: 'Light', id: 'light', icon: <SunIcon className={iconSize} /> },
    { label: 'Dark', id: 'dark', icon: <MoonIcon className={iconSize} /> },
    {
      label: 'System',
      id: 'system',
      icon: <MonitorIcon className={iconSize} />,
    },
  ]

  if (!mounted) {
    return (
      <div
        className={cn('inline-flex gap-1 opacity-0', className)}
        aria-hidden
      >
        {options.map((o) => (
          <span key={o.id} className={buttonSize} />
        ))}
      </div>
    )
  }

  return (
    <AnimatedBackground
      className="pointer-events-none rounded-md bg-zinc-200/70 dark:bg-zinc-700/70"
      defaultValue={theme}
      transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
      enableHover={false}
      onValueChange={(id) => {
        setTheme(id as string)
      }}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-label={`Switch to ${o.label} theme`}
          data-id={o.id}
          className={cn(
            'inline-flex items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50',
            buttonSize,
          )}
        >
          {o.icon}
        </button>
      ))}
    </AnimatedBackground>
  )
}
