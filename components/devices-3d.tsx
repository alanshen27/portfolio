'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  PresentationControls,
  useGLTF,
  useTexture,
} from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

export type DeviceModel =
  | 'laptop'
  | 'monitor'
  | 'tvModern'
  | 'tvVintage'
  | 'desk' // monitor + keyboard

const MODEL_SRC: Record<Exclude<DeviceModel, 'desk'>, string> = {
  laptop: '/models/kenney/laptop.glb',
  monitor: '/models/kenney/computerScreen.glb',
  tvModern: '/models/kenney/televisionModern.glb',
  tvVintage: '/models/kenney/televisionVintage.glb',
}

const KEYBOARD_SRC = '/models/kenney/computerKeyboard.glb'

/** Screen plane placement in each Kenney model’s local space (pre-scale). */
const SCREEN: Record<
  Exclude<DeviceModel, 'desk'>,
  {
    position: [number, number, number]
    rotation: [number, number, number]
    size: [number, number]
  }
> = {
  laptop: {
    position: [0.3, 0.235, -0.22],
    rotation: [-0.38, 0, 0],
    size: [0.48, 0.3],
  },
  monitor: {
    position: [0.196, 0.168, 0.002],
    rotation: [0, 0, 0],
    size: [0.34, 0.22],
  },
  tvModern: {
    position: [0, 0.28, 0.066],
    rotation: [0, 0, 0],
    size: [0.58, 0.32],
  },
  tvVintage: {
    position: [0.205, 0.155, 0.002],
    rotation: [0, 0, 0],
    size: [0.3, 0.2],
  },
}

function ScreenPlane({
  map,
  position,
  rotation,
  size,
}: {
  map: THREE.Texture
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={map} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

function KenneyMesh({
  src,
  map,
  kind,
}: {
  src: string
  map: THREE.Texture
  kind: Exclude<DeviceModel, 'desk'>
}) {
  const { scene } = useGLTF(src)
  const clone = useMemo(() => {
    const c = scene.clone(true)
    c.traverse((o) => {
      const m = o as THREE.Mesh
      if (m.isMesh) {
        m.castShadow = true
        m.receiveShadow = true
      }
    })
    return c
  }, [scene])

  const screen = SCREEN[kind]

  return (
    <group>
      <primitive object={clone} />
      <ScreenPlane map={map} {...screen} />
    </group>
  )
}

function DeskSetup({ map }: { map: THREE.Texture }) {
  const monitor = useGLTF(MODEL_SRC.monitor)
  const keyboard = useGLTF(KEYBOARD_SRC)
  const mon = useMemo(() => monitor.scene.clone(true), [monitor.scene])
  const key = useMemo(() => keyboard.scene.clone(true), [keyboard.scene])

  return (
    <group>
      <group position={[0, 0.02, 0]}>
        <primitive object={mon} />
        <ScreenPlane map={map} {...SCREEN.monitor} />
      </group>
      <primitive object={key} position={[0.05, 0, 0.12]} />
    </group>
  )
}

function SpinIn({
  active,
  spinKey,
  children,
}: {
  active: boolean
  spinKey: string | number
  children: React.ReactNode
}) {
  const ref = useRef<THREE.Group>(null)
  const progress = useRef(0)

  useEffect(() => {
    progress.current = 0
  }, [spinKey])

  useFrame((_, dt) => {
    if (!ref.current) return
    if (active) {
      progress.current = Math.min(1, progress.current + dt * 1.35)
    }
    const p = progress.current
    const ease = 1 - Math.pow(1 - p, 3)
    ref.current.rotation.y = (1 - ease) * Math.PI * 1.75
    ref.current.rotation.x = (1 - ease) * 0.55
    ref.current.position.y = (1 - ease) * 1.6
    ref.current.scale.setScalar(0.35 + ease * 0.65)
  })

  return <group ref={ref}>{children}</group>
}

function DeviceContent({
  model,
  image,
}: {
  model: DeviceModel
  image: string
}) {
  const map = useTexture(image)
  useMemo(() => {
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = 8
    map.needsUpdate = true
  }, [map])

  const kind = model === 'desk' ? 'monitor' : model
  const scale =
    kind === 'laptop' ? 5.2 : kind === 'tvModern' ? 4.4 : kind === 'tvVintage' ? 5.8 : 5.6

  return (
    <group
      scale={scale}
      position={[0, kind === 'laptop' ? -0.55 : -0.75, 0]}
      rotation={[0.15, -0.45, 0]}
    >
      {model === 'desk' ? (
        <DeskSetup map={map} />
      ) : (
        <KenneyMesh src={MODEL_SRC[kind]} map={map} kind={kind} />
      )}
    </group>
  )
}

function Scene({
  model,
  image,
  active,
  spinKey,
}: {
  model: DeviceModel
  image: string
  active: boolean
  spinKey: string | number
}) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight
        position={[4, 7, 3]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight intensity={0.4} groundColor="#b8c5d0" />

      <PresentationControls
        global
        cursor
        snap
        speed={1.05}
        zoom={1}
        polar={[-0.2, 0.35]}
        azimuth={[-0.65, 0.65]}
      >
        <SpinIn active={active} spinKey={spinKey}>
          <Suspense fallback={null}>
            <DeviceContent key={`${spinKey}-${image}`} model={model} image={image} />
          </Suspense>
        </SpinIn>
      </PresentationControls>

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.4}
        scale={12}
        blur={2.4}
        far={5}
      />
    </>
  )
}

export function ProjectDeviceCanvas({
  image,
  model = 'laptop',
  className = '',
  spinKey = 0,
  forceActive = false,
  minHeight = '100svh',
}: {
  image: string
  model?: DeviceModel
  className?: string
  spinKey?: string | number
  forceActive?: boolean
  minHeight?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const active = forceActive || inView

  useEffect(() => {
    if (forceActive) return
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.28, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [forceActive])

  return (
    <div
      ref={wrapRef}
      className={`relative h-full w-full ${className}`}
      style={{ minHeight }}
    >
      {active && (
        <Canvas
          camera={{ position: [0, 0.5, 5], fov: 32 }}
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
          shadows
          style={{ background: 'transparent', width: '100%', height: '100%' }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Scene
            model={model}
            image={image}
            active={active}
            spinKey={spinKey}
          />
        </Canvas>
      )}
    </div>
  )
}
