export type PortfolioWork = {
  id: string
  title: string
  originalTitle?: string
  pronunciation?: string
  subtitle?: string
  category: string
  summary: string
  description: string[]
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
    summary: 'A hazy R&B ballad at 90 BPM.',
    description: [
      'Titled "Regrets", this mid-tempo 90 bpm, and 4/4 R&B-ish ballad song creates a hazy, dreamlike atmosphere that can pulls listeners straight into an emotional late-night reverie. The track opens with atmospheric, multi-textured pianos drenched in spatial delay, instantly evoking a misty and nostalgic soundscape. This ethereal mood is wonderfully grounded by a warm, live-recorded acoustic guitar with carefully sculpted EQ, adding an intimate, human connection.',
      'The sound design features soft sine-wave synth textures crafted via Serum, utilizing echo and delay effects to weave a psychedelic, floating ambient backdrop. As the track progresses, a rich bassline and dynamic drum arrangement—comprising crisp kicks, snares, hi-hats, toms, shakers, risers, and subtle crashes—build a steady, hypnotic groove. Complemented by weeping violin fragments, "Regrets" effortlessly balances vulnerable intimacy with sweeping cinematic depth.',
    ],
    details: [
      { label: 'Work', value: 'Original song' },
      { label: 'My role', value: 'Songwriting · production · mixing' },
    ],
    image: {
      src: '/media/music-technology/regrets/logic-arrangement.webp',
      alt: 'The Regrets session in Logic Pro, showing piano, guitar, synth, bass, percussion and vocal tracks at 90 BPM.',
    },
    audio: '/media/music-technology/regrets/regrets.m4a',
    gallery: [
      {
        src: '/media/music-technology/regrets/logic-arrangement.webp',
        alt: 'The full Regrets arrangement in Logic Pro, with verse and chorus sections across its instrument and vocal tracks.',
        caption: 'Arrangement — the song taking shape in Logic Pro.',
      },
      {
        src: '/media/music-technology/regrets/logic-instrument-mixer.webp',
        alt: 'Logic Pro mixer channels for the piano, guitar, pads, plucks and bass, with instrument and effect plugins visible.',
        caption:
          'Instrument mix — balancing the piano, guitar, synths and bass.',
      },
      {
        src: '/media/music-technology/regrets/logic-vocal-effects.webp',
        alt: 'Logic Pro mixer channels showing percussion, vocal tracks, sends and effects returns.',
        caption: 'Mixing — percussion, vocals and shared effects.',
      },
      {
        src: '/media/music-technology/regrets/ableton-vocals.webp',
        alt: 'An Ableton Live session with the Regrets backing track, lead vocals, vocal layers and processing chain.',
        caption: 'Vocal work — lead and backing layers in Ableton Live.',
      },
    ],
  },
  {
    id: 'inkform',
    title: 'Inkform',
    originalTitle: '拳墨',
    category: 'movement / music',
    summary: 'Sanda movements become music and ink.',
    description: [
      'An interactive digital art installation that transforms Chinese kickboxing (Sanda) movements into traditional Chinese music with animated ink-wash painting effects. I used large language models in Cursor to help write and debug the code, and AI image generation to create the landscape background.',
      '“Inkform” combines “ink” with “form,” a word that refers both to a martial arts routine and to the structure of a piece of music. The performer appears on screen as an ink silhouette against a Chinese landscape painting, with trails and splashes following each movement. As the music develops, the image changes with it, shifting between pale paper with dark ink and a black background with white lines.',
      'The left fist triggers a guqin sound and the right a guzheng sound. Each punch triggers a complete musical phrase, rather than a single note. Kicks drive the harmony, while a stop in a held pose brings a phrase to a close. The piece moves on its own at 92 BPM through four sections—opening (起qǐ), carrying (承chéng), turning (转 zhuǎn), and closing (合hé). Rooted in the ancient Chinese poetry,  起承转合(Qǐ chéng zhuǎn hé)is a four-section musical structure that introduces a theme or a tone, develops it, takes a dramatic turn, and brings the piece to a unified ending. One round is one song in 90 seconds. When it ends, the world fades white and waits for the next martial artist.',
    ],
    details: [
      { label: 'Input', value: 'Martial arts movement' },
      { label: 'Output', value: 'Music' },
    ],
    image: {
      src: '/media/music-technology/inkform/turning-climax.webp',
      alt: 'A white martial artist silhouette kicks through red and white ink effects against dark mountains in Inkform.',
    },
    video: {
      src: '/media/music-technology/inkform/performance.mp4',
      poster: '/media/music-technology/inkform/turning-climax.webp',
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
      {
        src: '/media/music-technology/inkform/reverb-output.webp',
        alt: 'Inkform audio code in Cursor showing reverb diffusion, filtering and output gain.',
        caption: 'Audio development — shaping the hall reverb tail.',
      },
      {
        src: '/media/music-technology/inkform/reverb-network.webp',
        alt: 'Inkform audio code in Cursor showing the stereo delay network used for hall reverb.',
        caption: 'Audio development — the stereo reverb network.',
      },
    ],
  },
  {
    id: 'wenda',
    title: '蝶戀花',
    subtitle: 'Butterflies in Love with Flowers',
    category: 'interactive music / visual landscape',
    summary: 'Take turns making music with Notate.',
    description: [
      '“蝶戀花” (Butterflies in Love with Flowers) is an interactive music piece inspired by Su Shi’s poem “蝶戀花·春景.” The player takes turns with Notate, an autoregressive transformer model trained to generate music by predicting what comes next in a musical sequence. I used large language models in Cursor to help write and debug the code.',
      'The player creates a melody by clicking and dragging on the screen. Moving up or down changes the pitch, while faster gestures make the music louder, with the volume easing back as the movement slows. After four bars, Notate plays a four-bar reply based on the music so far, and the player takes another turn.',
      'The piece uses recorded sounds of guqin and guzheng, two Chinese string instruments, alongside the xiao, a bamboo flute, and percussion. It follows the four-part structure of 起承轉合: an opening, development, a contrasting turn and a conclusion. The music begins quietly, grows fuller and then returns to a gentle close. As the player and Notate exchange phrases, a painted branch grows across the screen, with leaves, blossoms and butterflies appearing along it.',
    ],
    details: [
      { label: 'Interaction', value: 'Click and drag to play a melody' },
      { label: 'Response', value: 'Notate music-generation model' },
      { label: 'Form', value: 'Four-bar call and response' },
    ],
    image: {
      src: '/media/music-technology/wenda/blossoms.webp',
      alt: 'A flowering ink branch curves across the screen beside the musical pitch guide in Butterflies in Love with Flowers.',
    },
    video: {
      src: '/media/music-technology/wenda/performance.mp4',
      poster: '/media/music-technology/wenda/blossoms.webp',
    },
    gallery: [
      {
        src: '/media/music-technology/wenda/opening.webp',
        alt: 'An ink branch with small leaves grows across the pale screen during a Notate reply.',
        caption: 'The opening — a branch begins to grow with the music.',
      },
      {
        src: '/media/music-technology/wenda/conversation.webp',
        alt: 'A rising ink branch follows the player’s melody beside a vertical pitch guide.',
        caption: 'The player’s turn — shaping the melody with the cursor.',
      },
      {
        src: '/media/music-technology/wenda/blossoms.webp',
        alt: 'Red, yellow and purple blossoms appear on the ink branch as Notate plays its answer.',
        caption: 'Notate’s reply — colour and blossoms join the scroll.',
      },
    ],
    process: [
      {
        title: 'Play',
        description: 'Click and drag to shape a four-bar melody.',
      },
      { title: 'Listen', description: 'Notate generates a four-bar reply.' },
      {
        title: 'Continue',
        description: 'Keep taking turns to build the piece.',
      },
    ],
  },
]
