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
    id: 'inkform',
    title: 'Inkform',
    originalTitle: '拳墨',
    category: 'movement / music',
    summary:
      'Inkform is an interactive music performance combining Sanda, a Chinese martial art; Chinese instrumental sounds; and traditional landscape painting.',
    description: [
      'Inkform is an interactive music performance combining Sanda, a Chinese martial art; Chinese instrumental sounds; and traditional landscape painting. It grew from hours of shadow boxing while listening to music, where quick footwork, varying level changes, and kicks transformed my movements into rhythm and expression. The music is shaped through strikes, combinations, and pauses, creating phrases played by a traditional instrument whose volume follows strike intensity.',
      'I designed this piece to follow a cycle of life, with the ending reflecting the beginning. I chose a predetermined structure to let performers experiment with changing textures and timbres in a coherent arc, bringing variation and novelty to each performance.',
      'I organized the approximately 90-second piece into four sections to develop the musicality, exploring turbulent and calm textures. The “opening” introduces a motif through guqin and guzheng phrases. This motif is expanded in “development” through the introduction of a seven-note scale, with percussion and xiao responses to kicks. In “turning”, I combined a rhythmic bassline with xiao phrases played an octave higher and flanger processing on the guzheng, creating a more turbulent texture. At the end, the closing reintroduces the opening motif an octave higher, with C-major triads as the sound and landscape fade.',
      "The background consists of an AI-generated Chinese landscape painting (山水画), with ink trails and an aura, both of which follow the performer's changing movements. I used an ink landscape and visual environment because I saw its connection to Chinese instrumental sounds: to me, the smudged yet translucent ink strokes reflect the breathy sound of the xiao, while the sharp edges of the strokes echo the plucked notes of a guzheng. I added inversions in color to introduce visual change and sustain interest throughout the performance.",
      'Using AI-assisted programming, I combined motion data from wrist-mounted phone sensors with MediaPipe pose tracking to link physical gestures to visual responses and musical phrases.',
    ],
    details: [
      { label: 'Input', value: 'Martial arts movement' },
      { label: 'Output', value: 'Music and ink visuals' },
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
        caption: '承 / Development — movement against a pale ink landscape.',
      },
      {
        src: '/media/music-technology/inkform/carrying-impact.webp',
        alt: 'A high kick surrounded by a red trail and radiating ink strokes during the Development section.',
        caption: '承 / Development — a kick framed by radiating ink.',
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
        src: '/media/music-technology/inkform/reverb-with-webaudio.png',
        alt: 'Inkform code in Cursor showing the WebAudio hall reverb network, stereo panning, diffusion, filtering and output gain.',
        caption: 'Inkform — Coding process: reverb with WebAudio',
      },
    ],
  },
  {
    id: 'wenda',
    title: '蝶戀花',
    subtitle: 'Butterflies in Love with Flowers',
    category: 'interactive music / visual landscape',
    summary:
      'Inspired by Su Shi’s poem “蝶戀花·春景”, Butterflies in Love with Flowers is an interactive musical piece that introduces a call-and-response melodic progression through cursor interactions.',
    description: [
      'Inspired by Su Shi’s poem “蝶戀花·春景”, Butterflies in Love with Flowers is an interactive musical piece that introduces a call-and-response melodic progression through cursor interactions.',
      'I created this piece to explore music as back-and-forth communication. I wanted to explore the recognition of larger phrases and movements in musicality, and how they can be acknowledged and developed while leaving room for interpretation. To create this exchange, I used AI-assisted, human-led programming to create Notate, an AI composition tool, and integrate it into an interface where it responds to the performer’s musical ideas in alternating four-bar phrases.',
      'Notate is a bidirectional 44.3M-parameter encoder-decoder transformer with eight attention heads that I developed. Pretrained on classical performances and fine-tuned on selected contemporary pieces, Notate can recognize, infill, and continue musical phrases across many genres. It uses a REMI-style tokenizer to preserve time signature, variations, and dynamics in its MIDI outputs.',
      'The performer creates a melody by clicking and dragging across the screen: the vertical positioning of the cursor adjusts pitch, while horizontal movement controls the speed of the created music. Faster movements and note progressions carry momentum, introducing varying dynamics throughout the performance. Every four bars, control over the musical progression alternates between the performer and the Notate AI model.',
      'The sound palette features the guqin and guzheng as the lead voices, with background ambience created using the xiao flute and percussion from the jiangu and daluo. These sounds remind me of the Chinese instrumental textures embedded inside the pop songs I listened to in my mother’s car—a familiar atmosphere that I wanted to bring to this performance.',
      'As the piece opens and closes, a visual exchange unfolds: a painted branch grows across the screen, accompanied by leaves, blossoms, and butterflies. The growing image gives the musical exchange a visible form representing changing musical intentions.',
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
        alt: 'A mostly bare ink branch stretches across the pale screen beside a vertical pitch guide.',
        caption: 'The ink branch and pitch guide.',
      },
      {
        src: '/media/music-technology/wenda/conversation.webp',
        alt: 'An ink branch curves upwards beside a vertical pitch guide and a circular cursor.',
        caption: 'The branch growing upwards beside the pitch guide.',
      },
      {
        src: '/media/music-technology/wenda/blossoms.webp',
        alt: 'Red, yellow and purple blossoms appear along the curved ink branch.',
        caption: 'Blossoms along the ink branch.',
      },
      {
        src: '/media/music-technology/wenda/interactive-pitch-indicator.png',
        alt: 'Butterflies in Love with Flowers code in Cursor showing the interactive pitch ladder, note labels and pointer controls.',
        caption:
          'Butterflies in Love with Flowers — Coding process: the interactive pitch indicator',
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
  {
    id: 'regrets',
    title: 'Regrets',
    category: 'songwriting / production',
    summary:
      'Regrets is a musical composition about the difficulty of letting go after loss.',
    description: [
      'Regrets is a musical composition about the difficulty of letting go after loss. To me, part of that difficulty is wanting to move forward while fearing that we might lose the memories most important to us. The song begins with longing and quiet reflection, using the faded sunset and passing moments to suggest the struggle to accept loss. This mid-tempo 90 bpm, 4/4 R&B-ish ballad pulls the listener straight into an emotional late-night reverie.',
      'To establish this atmosphere, I opened the track with atmospheric, multi-textured pianos drenched in spatial delay to evoke a misty and nostalgic soundscape. I wrote the lyrics to move repeatedly between recognizing the loss and resisting it: memories of laughter, old messages, things left unsaid, broken promises. As the song progresses, the lyrics become increasingly desperate, with the hazy instrumental textures reflecting the transitional phase between remembering and imagining, symbolizing the act of holding onto a memory in desperation as it slips away.',
      'To complement this emotional atmosphere, I added a warm, live-recorded acoustic guitar with carefully sculpted EQ to bring an intimate, human connection to the ethereal atmosphere.',
      'To complement the grounded acoustics and further support the floating piano textures, I crafted soft sine-wave synth textures using Serum, utilizing echo and delay effects to weave a psychedelic, floating ambient backdrop. As the track progresses, a rich bassline and dynamic drum arrangement—comprising crisp kicks, snares, hi-hats, toms, shakers, risers, and subtle crashes—build a steady, hypnotic groove.',
      'Complemented by weeping violin fragments, "Regrets" balances vulnerable intimacy with sweeping cinematic depth. Towards the end of the song, I repeated the invitation “come let me sing for you” to leave the longing and desperation reflected throughout the song unresolved.',
    ],
    details: [
      { label: 'Work', value: 'Original song' },
      { label: 'My role', value: 'Songwriting · production · mixing' },
    ],
    image: {
      src: '/media/music-technology/regrets/production-and-instrumentation.png',
      alt: 'The Regrets session in Logic Pro, showing piano, guitar, synth, bass, percussion and vocal tracks at 90 BPM.',
    },
    audio: '/media/music-technology/regrets/regrets.m4a',
    gallery: [
      {
        src: '/media/music-technology/regrets/production-and-instrumentation.png',
        alt: 'The Regrets arrangement in Logic Pro at 90 BPM, showing piano, guitar, synth, bass, percussion and vocal tracks.',
        caption: 'Regrets — Production and instrumentation',
      },
      {
        src: '/media/music-technology/regrets/mixing.png',
        alt: 'The Regrets mixer in Logic Pro, showing channel levels, panning, effects and shared sends.',
        caption: 'Regrets — Mixing',
      },
      {
        src: '/media/music-technology/regrets/mixing-vocals-and-sound-design.png',
        alt: 'The Regrets session in Ableton Live, showing the accompaniment, lead vocal edits, backing vocals and effects returns.',
        caption: 'Regrets — Mixing, vocals, and sound design',
      },
    ],
  },
]
