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
    summary: 'Sanda movement, played as music for guqin, guzheng, and xiao.',
    description: [
      'Inkform turns Sanda, a Chinese martial art I practise, into music. The idea came from shadowboxing with music on: footwork, level changes, and kicks already had a rhythm. Strikes, combinations, and pauses trigger phrases on Chinese instruments, and the volume follows how hard I strike.',
      'The piece runs about ninety seconds, in four sections: opening, development, turning, and closing. The structure stays fixed so a performer can change texture and timbre inside a familiar arc. The ending brings the opening motif back an octave higher, as a cycle of life rather than a final stop.',
      'The opening states a motif on guqin and guzheng. Development expands it with a seven-note scale, percussion, and xiao answers to the kicks. In the turning section I add a rhythmic bassline, raise the xiao phrases by an octave, and put a flanger on the guzheng. The closing returns to that opening motif over C-major triads as the sound and the landscape fade.',
      'The background is an AI-generated Chinese landscape painting (山水画). Ink trails and an aura follow the performer. Soft ink strokes sit with the breathy xiao; sharper edges sit with the plucked guzheng. Colour inversions follow changes in the music.',
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
    summary: 'A four-bar exchange between the performer and Notate.',
    description: [
      'I made Butterflies in Love with Flowers after reading Su Shi’s poem “蝶戀花·春景”. The performer and Notate take turns with a melody, four bars at a time. A reply has to recognise the phrase it answers and still leave the next turn open.',
      'I developed Notate with AI-assisted, human-led programming and connected it to that interface. The current model is a 44.3M-parameter encoder–decoder transformer with eight attention heads. Bidirectional attention is in the encoder, which reads the phrase around a gap; the decoder uses causal self-attention to write the reply. I pretrained it on classical performances, fine-tuned it on selected contemporary pieces, and used a REMI-style tokenizer for time signatures, timing, and dynamics in MIDI.',
      'The performer clicks and drags. Vertical cursor position sets the pitch. Horizontal movement sets the pace of the melody. Faster movements, and faster note progressions, change the dynamics. After four bars, Notate writes a four-bar reply and hands the next turn back.',
      'The lead voices are guqin and guzheng, with xiao in the background and percussion from the jiangu and daluo. Those are the Chinese instrumental colours I remember from pop songs in my mother’s car.',
      'A painted branch grows across the screen as the turns continue, picking up leaves, blossoms, and butterflies.',
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
    summary: 'A 90 BPM R&B ballad about holding on after loss.',
    description: [
      'Regrets is about how hard it is to let go. The song sits in the pull between moving on and keeping a memory close: a mid-tempo R&B ballad at 90 BPM in 4/4, opening on a faded sunset and moments passing.',
      'Layered piano and spatial delay open that uncertain space between remembering and imagining. The lyric comes back to laughter, old messages, things left unsaid, and broken promises, and the swing between acceptance and resistance gets more insistent as the song goes on.',
      'I recorded acoustic guitar and shaped the EQ so it sits warmer and closer than the delayed piano.',
      'Soft sine-wave textures from Serum, with echo and delay, stay underneath. Bass, kicks, snares, hi-hats, toms, shakers, risers, and crashes bring the arrangement forward without covering those textures.',
      'Short violin fragments and the repeated line “come let me sing for you” end the song with the longing still open.',
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
