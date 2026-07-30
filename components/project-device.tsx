'use client'

import dynamic from 'next/dynamic'
import type { DeviceModel } from '@/components/devices-3d'

const ProjectDeviceCanvas = dynamic(
  () =>
    import('@/components/devices-3d').then((m) => m.ProjectDeviceCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full min-h-[50vh] w-full items-center justify-center text-[10px] tracking-[0.2em] text-white/30 uppercase"
        aria-hidden
      >
        Loading machine…
      </div>
    ),
  },
)

export function ProjectDevice({
  image,
  model = 'laptop',
  className = '',
  alwaysOn = false,
  spinKey = 0,
}: {
  image: string
  model?: DeviceModel
  className?: string
  alwaysOn?: boolean
  spinKey?: string | number
}) {
  return (
    <ProjectDeviceCanvas
      image={image}
      model={model}
      className={className}
      forceActive={alwaysOn}
      spinKey={spinKey}
      minHeight={alwaysOn ? '100%' : '100svh'}
    />
  )
}
