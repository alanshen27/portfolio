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
    summary: 'I wanted to hear how my Sanda movements could shape music.',
    description: [
      'I made Inkform to explore how Sanda, a Chinese martial art I practise, could shape music. The idea grew from shadowboxing while listening to music and noticing how footwork, level changes, and kicks could suggest a rhythm. I connected strikes, combinations, and pauses to phrases played with Chinese instrumental sounds, with volume responding to strike intensity.',
      'I wanted the ending to echo the beginning, suggesting a cycle of life. I chose a fixed structure so that a performer could vary the textures and timbres within a familiar musical arc.',
      'I arranged the approximately 90-second piece in four sections: opening, development, turning, and closing. In the opening, I introduced a motif through guqin and guzheng phrases. In development, I expanded it with a seven-note scale, percussion, and xiao responses to kicks. For turning, I added a rhythmic bassline, raised the xiao phrases by an octave, and applied flanger processing to the guzheng. In closing, I brought back the opening motif an octave higher, with C-major triads as the sound and landscape fade.',
      'I used an AI-generated Chinese landscape painting (山水画) as the background, with ink trails and an aura following the performer. To me, soft ink strokes suggested the breathy sound of the xiao, while sharper edges recalled the plucked notes of a guzheng. I experimented with colour inversions to accompany changes in the music.',
      'I used AI-assisted programming to build the piece in TypeScript and Web Audio, combining motion data from wrist-mounted phone sensors with MediaPipe pose tracking. I also worked on shaders for the visual effects, linking gestures to both musical phrases and changes in the image.',
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
    summary: 'I wanted to explore an exchange of melodies with Notate.',
    description: [
      'I made Butterflies in Love with Flowers after reading Su Shi’s poem “蝶戀花·春景”. I wanted to explore music as a conversation, with a performer and a model taking turns to develop a melody.',
      'I was interested in how a musical reply might acknowledge an earlier phrase while leaving room for a different interpretation. Using AI-assisted, human-led programming, I developed Notate and connected it to an interface that alternates between the performer and the model every four bars.',
      'I built Notate as a bidirectional, 44.3M-parameter encoder-decoder transformer with eight attention heads. I pretrained it on classical performances and fine-tuned it on selected contemporary pieces to explore phrase recognition, infilling, and continuation. I used a REMI-style tokenizer to represent time signatures, timing variations, and dynamics in MIDI.',
      'I designed the interface around clicking and dragging: vertical cursor position adjusts pitch, while horizontal movement controls the pace of the melody. Faster movements and note progressions introduce changes in dynamics. After four bars, Notate generates a four-bar reply before returning control to the performer.',
      'I chose guqin and guzheng as the lead voices, with xiao ambience and percussion from the jiangu and daluo. These sounds remind me of the Chinese instrumental textures in pop songs I listened to in my mother’s car, and I wanted to bring something of that familiar atmosphere to the piece.',
      'I paired the exchange with a painted branch that grows across the screen, adding leaves, blossoms, and butterflies. I hoped the changing image would give a visible form to the musical ideas being passed back and forth.',
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
    summary: 'I wrote this ballad about holding on after loss.',
    description: [
      'I wrote Regrets to explore the difficulty of letting go after loss. I was interested in the tension between wanting to move forward and wanting to keep a memory close. I chose a mid-tempo, 90 BPM R&B ballad in 4/4, with images of a faded sunset and passing moments in the opening lyrics.',
      'I began with layered piano sounds and spatial delay, hoping to suggest the uncertain space between remembering and imagining. In the lyrics, I returned to laughter, old messages, things left unsaid, and broken promises. I wanted the repeated movement between acceptance and resistance to become more insistent as the song continued.',
      'I added live-recorded acoustic guitar and adjusted its EQ to give the arrangement a warmer, more intimate sound alongside the delayed piano.',
      'I used Serum to make soft sine-wave synth textures, then added echo and delay. I gradually brought in bass, kicks, snares, hi-hats, toms, shakers, risers, and crashes to give the song more movement while keeping the floating textures underneath.',
      'I included short violin fragments and repeated “come let me sing for you” near the end. I wanted to leave the longing unresolved, as though the speaker still had something to say.',
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
