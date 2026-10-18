export type PortfolioWork = {
  id: string
  title: string
  originalTitle?: string
  pronunciation?: string
  subtitle?: string
  category: string
  summary: string
  description: string
  details: { label: string; value: string }[]
  process?: { title: string; description: string }[]
  // Add supplied assets here; absent media never renders an empty player or image.
  image?: { src: string; alt: string }
  video?: { src: string; poster?: string; captions?: string }
  gallery?: { src: string; alt: string; caption?: string }[]
  audio?: string
  links?: { label: string; href: string }[]
}

export const PORTFOLIO_WORKS: PortfolioWork[] = [
  {
    id: 'regrets',
    title: 'Regrets',
    category: 'songwriting / production',
    summary: 'An original song, from writing to the final mix.',
    description:
      'Regrets is a song I wrote, produced, and mixed. My work spans the songwriting, the production, and the mix that brings the recording together.',
    details: [
      { label: 'Work', value: 'Original song' },
      { label: 'My role', value: 'Songwriting · production · mixing' },
    ],
  },
  {
    id: 'inkform',
    title: 'inkform',
    originalTitle: '拳墨',
    category: 'movement / music',
    summary: 'Martial arts movement becomes music.',
    description:
      'inkform 拳墨 is a martial arts project that turns movement into music. Physical movement becomes the input for making sound, connecting martial arts with musical expression.',
    details: [
      { label: 'Input', value: 'Martial arts movement' },
      { label: 'Output', value: 'Music' },
    ],
    image: {
      src: '/media/music-technology/inkform/turning-climax.webp',
      alt: 'A white martial artist silhouette kicks through red and white ink effects against dark mountains in inkform.',
    },
    gallery: [
      {
        src: '/media/music-technology/inkform/carrying-kick.webp',
        alt: 'A black silhouette performs a high kick among soft ink trails in a pale mountain landscape.',
        caption: '承 / Carrying — movement against a pale ink landscape.',
      },
      {
        src: '/media/music-technology/inkform/carrying-impact.webp',
        alt: 'A high kick surrounded by a red trail and radiating ink strokes during the Carrying section.',
        caption: '承 / Carrying — a kick framed by radiating ink.',
      },
      {
        src: '/media/music-technology/inkform/turning-flow.webp',
        alt: 'A white martial artist silhouette with flowing pale ink and a red glow against dark mountains.',
        caption: '转 / Turning — the landscape shifts into darkness.',
      },
      {
        src: '/media/music-technology/inkform/turning-climax.webp',
        alt: 'A white silhouette at the height of a kick, surrounded by red and white strokes in the dark Turning section.',
        caption: '转 / Turning — a burst of colour and ink.',
      },
      {
        src: '/media/music-technology/inkform/closing-dark.webp',
        alt: 'A white silhouette extends an arm beneath a fading ink trail in the dark Closing section.',
        caption: '合 / Closing — a gesture in the dark landscape.',
      },
      {
        src: '/media/music-technology/inkform/closing-light.webp',
        alt: 'A dark silhouette performs a kick as the Closing section returns to a pale mountain landscape.',
        caption: '合 / Closing — returning to the pale landscape.',
      },
    ],
  },
  {
    id: 'wenda',
    title: '問答',
    pronunciation: 'Wèndá',
    subtitle: 'Call & Blossom',
    category: 'interactive music / visual landscape',
    summary: 'A cursor-led call. A musical response from notate.',
    description:
      '問答 Wèndá — Call & Blossom brings notate models into a visual landscape. Move your cursor to create a call; notate responds, and the exchange becomes a piece of music.',
    details: [
      { label: 'Interaction', value: 'Cursor movement → musical call' },
      { label: 'Response', value: 'notate models' },
      { label: 'Setting', value: 'A visual landscape' },
    ],
    process: [
      {
        title: 'Call',
        description: 'Move your cursor to create a musical call.',
      },
      { title: 'Respond', description: 'The notate models answer your call.' },
      {
        title: 'Compose',
        description: 'The call and response form a piece of music.',
      },
    ],
  },
]
