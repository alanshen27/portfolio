'use client'
import { TextLoop } from '@/components/ui/text-loop'
import { ThemeSwitch } from '@/components/ui/theme-switch'
import { NAME } from './data'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <TextLoop className="text-xs text-zinc-500">
          <span>
            © {currentYear} {NAME}.
          </span>
          <span>Student & Developer.</span>
          <span>Built with Next.js & Motion-Primitives.</span>
        </TextLoop>
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
