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
      'I explore how my Sanda movements can shape music and ink visuals.',
    description: [
      'I made Inkform to combine Sanda, a Chinese martial art I practise, with Chinese instrumental sounds and traditional landscape painting. The idea grew from shadowboxing while listening to music, where footwork, level changes, and kicks began to feel like rhythm and expression. I connected strikes, combinations, and pauses to musical phrases, with volume following strike intensity.',
      'I designed the piece to follow a cycle of life, with the ending reflecting the beginning. I organised the approximately ninety-second piece into four sections: opening, development, turning, and closing. I chose a fixed structure so performers could experiment with changing textures and timbres within a familiar arc.',
      'In the opening, I introduce a motif through guqin and guzheng phrases. I expand it in development with a seven-note scale, percussion, and xiao responses to kicks. In the turning section, I add a rhythmic bassline, raise the xiao phrases by an octave, and apply flanger processing to the guzheng. In closing, I bring back the opening motif an octave higher, with C-major triads as the sound and landscape fade.',
      'I used an AI-generated Chinese landscape painting (山水画) as the background, with ink trails and an aura following the performer. To me, the soft ink strokes reflect the breathy sound of the xiao, while the sharper edges echo the plucked notes of a guzheng. I added colour inversions to accompany changes in the music.',
      'I built the piece in TypeScript and Web Audio with AI-assisted programming. Wrist-mounted phone sensors and MediaPipe pose tracking supply the motion, and shaders link each gesture to both the phrase and the image.',
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
      'I explore music as a conversation between a performer and Notate.',
    description: [
      'I made Butterflies in Love with Flowers after reading Su Shi’s poem “蝶戀花·春景”. I wanted to explore music as back-and-forth communication, with a performer and Notate taking turns to develop a melody in four-bar phrases. I was interested in how a reply could recognise an earlier phrase while leaving room for interpretation.',
      'I developed Notate with AI-assisted, human-led programming and connected it to that interface. The current model is a 44.3M-parameter encoder–decoder transformer with eight attention heads. Bidirectional attention is in the encoder, which reads the phrase around a gap; the decoder uses causal self-attention to write the reply. I pretrained it on classical performances, fine-tuned it on selected contemporary pieces, and used a REMI-style tokenizer for time signatures, timing, and dynamics in MIDI.',
      'I designed the interface around clicking and dragging: vertical cursor position adjusts pitch, while horizontal movement controls the pace of the melody. Faster movements and note progressions introduce changes in dynamics. Every four bars, control alternates between the performer and Notate.',
      'I chose guqin and guzheng as the lead voices, with xiao ambience and percussion from the jiangu and daluo. These sounds remind me of the Chinese instrumental textures in pop songs I listened to in my mother’s car, and I wanted to bring that familiar atmosphere to the piece.',
      'I paired the exchange with a painted branch that grows across the screen, adding leaves, blossoms, and butterflies. I wanted the changing image to give the musical exchange a visible form.',
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
    summary: 'I wrote Regrets about the difficulty of letting go after loss.',
    description: [
      'I wrote Regrets about the difficulty of letting go after loss. To me, part of that difficulty is wanting to move forward while fearing the loss of important memories. I chose a mid-tempo R&B ballad at 90 BPM in 4/4, opening with a faded sunset and passing moments to suggest the struggle to accept loss.',
      'I opened the track with layered piano sounds and spatial delay to suggest the space between remembering and imagining. I wrote the lyrics to move repeatedly between recognising the loss and resisting it: memories of laughter, old messages, things left unsaid, and broken promises. As the song progresses, the lyrics become more desperate, reflecting the attempt to hold on to a memory as it slips away.',
      'I added live-recorded acoustic guitar and adjusted its EQ to bring a warmer, more intimate sound to the arrangement.',
      'To complement the guitar and the floating piano textures, I created soft sine-wave synth sounds in Serum and added echo and delay. I gradually brought in bass, kicks, snares, hi-hats, toms, shakers, risers, and crashes to give the arrangement more movement.',
      'I included short violin fragments and repeated “come let me sing for you” towards the end of the song. I wanted to leave the longing unresolved.',
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
