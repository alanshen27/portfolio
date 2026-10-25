export type ProjectDeviceKind =
  | 'laptop'
  | 'monitor'
  | 'tvModern'
  | 'tvVintage'
  | 'desk'

export type ProjectKind = 'company' | 'hackathon' | 'research' | 'build'

export type Project = {
  name: string
  description: string
  link: string
  video?: string
  image?: string
  id: string
  role?: string
  timeframe?: string
  points?: string[]
  device?: ProjectDeviceKind
  /** What kind of thing this is — shown as a label so readers never have to guess */
  kind?: ProjectKind
  /** One-line result: placement, scale, or status */
  outcome?: string
  /** Stack / domain chips */
  tags?: string[]
  /** Source repository when public */
  repo?: string
  /** Hackathon submission page */
  devpost?: string
  /** Photo from the event or team, shown under the screenshot on /work */
  photo?: string
  photoCaption?: string
}

export type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link?: string
  image?: string
  /** Photo from the role, shown beside the row on the record pages */
  photo?: string
  description?: string
  bullets?: string[]
  location?: string
  id: string
}

export type Education = {
  institution: string
  degree: string
  start: string
  end: string
  image?: string
  location?: string
  id: string
}

export type Skill = {
  name: string
  level?: string
  image?: string
  id: string
}

export type Certification = {
  name: string
  issuer?: string
  date?: string
  image?: string
  id: string
}

export type Award = {
  title: string
  description?: string
  date?: string
  image?: string
  /** Photo evidence — ceremony, team, venue */
  photo?: string
  id: string
}

export type Publication = {
  title: string
  authors?: string
  venue?: string
  status?: string
  /** Attached conference talk / presentation of the same work */
  presentation?: string
  link?: string
  date?: string
  image?: string
  description?: string
  id: string
}

export type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
  image?: string
}

export type Volunteering = {
  role: string
  organization: string
  start: string
  end: string
  cause?: string
  description?: string
  bullets?: string[]
  image?: string
  link?: string
  id: string
}

export type SocialLink = {
  label: string
  link: string
  icon?: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Studious',
    description:
      'Studious began as an LMS to simplify coursework organisation.',
    link: 'https://studious.ac',
    image: '/media/projects/studious.png',
    id: 'project1',
    role: 'project initiator & lead app developer',
    timeframe: 'Sep 2023 – present',
    device: 'laptop',
    kind: 'build',
    outcome: 'teacher testing at Colegiul Economic Partenie Cosma',
    tags: ['Next.js, tRPC, Supabase and Pusher'],
    points: [
      'Led seven students from different disciplines to develop, research, and design its features.',
      'Built tools for scheduling classes, organising assignments, creating worksheets, managing grades, viewing class statistics, and sharing files, plus a marketplace for teaching materials.',
      'Created AI Labs to help teachers design simulations, create assignments, and monitor student performance, and added automated feedback.',
      'Started teacher testing at Colegiul Economic Partenie Cosma in Romania. Four more school pilots are planned, all in Nepal.',
    ],
  },
  {
    name: 'Scribe',
    description:
      'I built Scribe with a group of friends because we wanted more ways to practise topics in depth than we had found in other study apps.',
    link: 'https://www.scribe.study',
    image: '/media/projects/scribe.png',
    id: 'project2',
    role: 'founder & lead app developer',
    timeframe: '2025 – present',
    device: 'tvModern',
    photo: '/media/hackathons/hackharvard-china.jpg',
    photoCaption:
      'on stage · HackHarvard China, August 2025, 1st place overall',
    kind: 'build',
    outcome:
      '5,000+ users · 27 countries · ~US$5,000 ARR · 1st place, HackHarvard China',
    tags: ['Full-stack development and AI workflows'],
    points: [
      'Led three students in designing interactive learning aids, visuals, and guided summaries to help students study topics in depth.',
      'Added long-form questions, summaries where students explain definitions in their own words, and interactive visualisations to explore ideas from different perspectives.',
      'Used classmates’ feedback during beta testing to redesign the navigation and guide students from one exercise to the next.',
      'Scribe has 5,000+ users across 27 countries and approximately US$5,000 ARR. The team took first place overall at HackHarvard China in August 2025.',
    ],
  },
  {
    name: 'Notate',
    description:
      'I developed Notate as an AI co-writing tool for composition. It autocompletes phrases and fills gaps between written passages.',
    link: 'https://github.com/alanshen27/notate',
    repo: 'https://github.com/alanshen27/notate',
    id: 'project-notate',
    role: 'personal project · AI-assisted programming',
    timeframe: 'May 2026 – present',
    kind: 'research',
    outcome: '44.3M-parameter encoder–decoder · 8 attention heads',
    tags: ['PyTorch, FastAPI and Web Audio'],
    points: [
      'The current model is a 44.3M-parameter encoder–decoder transformer with eight attention heads. Bidirectional attention is in the encoder; the decoder’s self-attention is causal.',
      'I pretrained it on classical performances and fine-tuned it on selected contemporary pieces, using a REMI-style MIDI tokenizer. I developed it with AI-assisted programming.',
      'In Butterflies in Love with Flowers it exchanges four-bar phrases with the performer.',
    ],
  },
  {
    name: 'Foundry',
    description:
      'I built Foundry, an AI engineering workspace, with Jason Xiao, William Sun, and Zhiheng Li at the Penn ESAP summer programme as our final project.',
    link: 'https://github.com/alanshen27/foundry',
    repo: 'https://github.com/alanshen27/foundry',
    id: 'project-foundry',
    role: 'co-developer · Penn ESAP 2026',
    timeframe: 'Jul – Aug 2026',
    kind: 'build',
    outcome: 'final project · Penn ESAP AI track · team of four',
    tags: ['TypeScript, CAD, collaborative editing and Shopify'],
    points: [
      'Studied linear algebra, multivariable calculus, and applied AI, earning an A+ in the AI track.',
      'Worked on the assistant so it could use project context to call tools and run tasks in the background.',
      'Helped build the CAD, schematic, and PCB workspaces and the shared code editor.',
      'Helped connect design checks to storefront generation and Shopify checkout.',
    ],
  },
  {
    name: 'Nomad',
    description:
      'I worked on Nomad, a campus planner that helps students plan their courses and find classmates and student communities.',
    link: 'https://www.youtube.com/watch?v=zUIMYg8ByNI',
    devpost: 'https://devpost.com/software/nomad-j58qea',
    repo: 'https://github.com/usenomad',
    image: '/media/projects/nomad.png',
    id: 'project-nomad',
    role: 'HackMIT China 2026',
    timeframe: '36 hours',
    device: 'desk',
    kind: 'hackathon',
    outcome: '3rd place, Education Track · Outstanding Impact Award',
    tags: ['Prerequisite graphs, course planning and student communities'],
    points: [
      'We built a course planner around prerequisite graphs, with pages for classmates and student communities.',
      'Nomad received third place in the Education Track and the Outstanding Impact Award.',
    ],
  },
  {
    name: 'Synapse',
    description:
      'I built Synapse at HackHarvard to explore how a message could augment humanity by enhancing our digital communications, preserving more human characteristics while keeping the convenient typing interface unchanged.',
    link: 'https://youtu.be/nuEoH_5YOi4',
    devpost: 'https://devpost.com/software/synapse-n7hwr3',
    repo: 'https://github.com/gosynapse',
    image: '/media/projects/synapse.png',
    id: 'project3',
    role: 'HackHarvard 2025',
    timeframe: 'Oct 2025',
    device: 'monitor',
    photo: '/media/hackathons/hackharvard-2025.jpg',
    photoCaption: 'team at HackHarvard 2025, Cambridge MA',
    kind: 'hackathon',
    outcome: 'invitational · one of two high-school teams',
    tags: ['Emotion recognition, speech and voice cloning'],
    points: [
      'We transcribed voice messages and used tone, pitch, and rhythm to estimate emotional cues.',
      'For text messages, we used facial expressions to estimate those cues.',
      'We used voice cloning to play messages back, with the estimated cues shaping the delivery.',
    ],
  },
  {
    name: 'Hive',
    description:
      'I worked on Hive at Empower 3.0 Hacks, bringing study groups together with a shared chat and an AI assistant.',
    link: 'https://www.youtube.com/watch?v=HJVGiYUyQoI',
    devpost: 'https://devpost.com/software/hive-140hcn',
    repo: 'https://github.com/alanshen27/hive',
    image: '/media/projects/hive.png',
    id: 'project4',
    role: 'Empower 3.0',
    timeframe: '2025',
    device: 'tvVintage',
    kind: 'hackathon',
    outcome: '3rd Place, Coding track · 450+ participants',
    tags: ['Shared study groups and realtime chat'],
  },
]

export const PROJECT_KIND_LABEL: Record<ProjectKind, string> = {
  company: 'company',
  hackathon: 'hackathon',
  research: 'research build',
  build: 'build',
}

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Studious',
    title: 'project initiator & lead app developer',
    start: 'September 2023',
    end: 'present',
    link: 'https://studious.ac',
    image: 'https://www.studious.sh/logo.png',
    bullets: [
      'Led seven students in starting teacher testing at Colegiul Economic Partenie Cosma.',
      'Added AI tools for course design and automated feedback.',
      'Planned pilots with four more schools, all in Nepal.',
      'Work on the Next.js frontend and tRPC backend, using Pusher, Supabase, Render, and Vercel.',
      'Spoke with students at Liceul de Arte Oradea during a service trip and at Chinese high schools to inform the project.',
    ],
    id: 'work1',
  },
  {
    company: 'Scribe',
    title: 'founder & lead app developer',
    start: '2025',
    end: 'present',
    link: 'https://www.scribe.study',
    image: '/media/logos/scribe.png',
    bullets: [
      'Led three students in designing interactive learning aids, visuals, and guided summaries to help students study topics in depth.',
      'Added long-form questions, summaries where students explain definitions in their own words, and interactive visualisations to explore ideas from different perspectives.',
      'Used classmates’ feedback during beta testing to redesign the navigation and guide students from one exercise to the next.',
      'Worked on the backend, using retrieval-augmented generation (RAG) and agentic graph loops with subagent orchestration to generate study materials.',
      'Scribe has 5,000+ users across 27 countries and approximately US$5,000 ARR.',
    ],
    id: 'work2',
  },
  {
    company: 'Luduan.ai',
    title: 'student intern · frontend and UX',
    start: 'February 2026',
    end: 'present',
    link: 'https://www.luduan.ai',
    image: '/media/logos/luduan.png',
    bullets: [
      'Rebuilt the frontend and designed the user experience for the web apps.',
      'Helped with the relaunch at the 2026 CALICO Conference. The platform serves 30+ U.S. institutions.',
    ],
    id: 'work3',
  },
  {
    company: 'VEX Robotics',
    title: 'engineer and programmer — 15520X (MECH_IT_HAPPEN)',
    start: 'September 2025',
    end: 'present',
    image: '/media/logos/vex.jpg',
    photo: '/media/vex/team.png',
    bullets: [
      'Our team placed third in skills and qualifiers at Alpine Robo Games 2026.',
      'We placed fourth in skills and seventh overall at the Swiss Regional Competition (Santa Clash @ ISBasel).',
      'Helped design and build the robot, programmed its autonomous routines, and worked on the driver-control interface.',
    ],
    id: 'work4',
  },
  {
    company: 'Institut Le Rosey',
    title: 'competitive swimmer',
    start: 'September 2023',
    end: 'present',
    image: '/media/logos/lerosey.png',
    location: 'Switzerland',
    bullets: [
      'I received the Le Rosey swimming MVP award three consecutive times.',
      'Events: Individual Medley, Freestyle (100 m, 200 m relay, 50×4 IM relay), Medley Relay, Open Water.',
      'ADISR 2025 EHL: Silver 50 m Free; Gold 4×50 Free.',
      'MLS 2025 June/July: Silver (IM); Gold — 100 m Free | 200 m Freestyle Relay | 200 m Medley Relay.',
      'ADISR 2024 EHL: Bronze — 100 m Free; Gold — IM Relay & Freestyle Relay.',
      'MLS 2024 Beau Soleil: Silver — 50×4 IM Relay (Freestyle leg).',
      '2026 MLS open water relay: team 1st place, about 150 m a lap.',
      'ADISR 2023 EHL: 1st Place (Moyen Category) — 3 Gold Medals + 1 New School Record (Le Rosey).',
    ],
    id: 'work5',
  },
]

export const EDUCATION: Education[] = [
  {
    institution: 'Institut Le Rosey',
    degree: 'IB diploma',
    start: '2022',
    end: '2027',
    location: 'Rolle, Switzerland',
    image: '/media/logos/lerosey.png',
    id: 'edu1',
  },
  {
    institution:
      'University of Pennsylvania — Engineering Summer Academy (ESAP)',
    degree: 'AI track · three-week summer programme · A+',
    start: 'Jul 2026',
    end: 'Jul 2026',
    location: 'Philadelphia, PA',
    id: 'edu-esap',
  },
  {
    institution: 'Singapore American School',
    degree: 'School studies',
    start: 'August 2014',
    end: 'September 2022',
    location: 'Singapore',
    id: 'edu2',
  },
]

export const SKILLS: Skill[] = [
  { name: 'Business Ownership', id: 'skill-biz' },
  { name: 'Start-up Leadership', id: 'skill-lead' },
  { name: 'Start-ups Management', id: 'skill-mgmt' },
  { name: 'Next.js', id: 'skill-next' },
  { name: 'tRPC', id: 'skill-trpc' },
  { name: 'Supabase', id: 'skill-supabase' },
  { name: 'TypeScript', id: 'skill-ts' },
  { name: 'React', id: 'skill-react' },
  { name: 'AI / ML Systems', id: 'skill-ai' },
  { name: 'Distributed Infrastructure', id: 'skill-infra' },
  { name: 'Competitive Programming', id: 'skill-cp' },
]

/** Grouped skills for the home skills matrix */
export const SKILL_GROUPS: { label: string; items: string }[] = [
  {
    label: 'languages',
    items: 'TypeScript, C++, Python, JavaScript, SQL',
  },
  {
    label: 'frameworks',
    items: 'Next.js, React, tRPC, Motion',
  },
  {
    label: 'systems & tools',
    items: 'Supabase, Pusher, Vercel, Render, Git',
  },
  {
    label: 'focus',
    items: 'competitive programming, AI / ML systems, product design',
  },
  {
    label: 'music',
    items: 'ABRSM Grade 8 Violin & Piano, recording, orchestration',
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'ABRSM Grade 8 Piano',
    issuer: 'performance',
    image: 'https://upload.wikimedia.org/wikipedia/en/f/f6/ABRSM_logo.svg',
    id: 'cert1',
  },
  {
    name: 'ABRSM Grade 8 Violin',
    issuer: 'performance',
    image: 'https://upload.wikimedia.org/wikipedia/en/f/f6/ABRSM_logo.svg',
    id: 'cert2',
  },
]

export const AWARDS: Award[] = [
  {
    title: 'HackHarvard 2025 China — 1st Place',
    description:
      'Our Scribe team received 1st Place Overall, the “Best Overall Hack” award.',
    date: 'Aug 2025',
    image: '/media/logos/hackharvard.svg',
    photo: '/media/hackathons/hackharvard-win.jpg',
    id: 'award1',
  },
  {
    title:
      'HackMIT China 2026 — 3rd Place (Education Track) & Outstanding Impact Award',
    description:
      'We built Nomad in 36 hours and received third place in the Education Track and the Outstanding Impact Award.',
    date: 'Mar 2026',
    image: '/media/logos/hackmit.png',
    id: 'award-hackmit',
  },
  {
    title: 'USACO Gold division',
    description:
      'I scored 1000 / 1000 in the Silver contest and was promoted to Gold.',
    date: 'Feb 2026',
    image: '/media/projects/usaco.png',
    id: 'award4',
  },
  {
    title: 'Excellence Award | Alpine Robo Games 2026',
    description:
      'Our team received the Excellence Award at Alpine Robo Games and qualified for the VEX World Championship in St. Louis.',
    date: 'Feb 2026',
    image: '/media/logos/vex.jpg',
    photo: '/media/vex/worlds-team.jpeg',
    id: 'award-vex',
  },
  {
    title: 'HackHarvard 2025 — Compile the Decade (Invitational)',
    description:
      'I attended HackHarvard 2025 with one of the two high-school teams invited.',
    date: 'Oct 2025',
    image: '/media/logos/hackharvard.svg',
    photo: '/media/hackathons/hackharvard-2025.jpg',
    id: 'award2',
  },
  {
    title: 'Empower 3.0 Hacks — 3rd Place',
    description:
      'Our Hive project placed third in the Coding track; the event had more than 450 participants.',
    date: '2025',
    image: '/media/projects/empower.png',
    id: 'award3',
  },
  {
    title:
      'Swiss Group of International Schools Math Competition 2025 — 2nd Place',
    date: '2025',
    image: '/media/logos/sgis.png',
    id: 'award5',
  },
]

export const PUBLICATIONS: Publication[] = [
  {
    title: 'Training AI for Pragmatics Assessment',
    authors: 'Xiao, F., Taguchi, N., Li, S. & Shen, A.',
    venue:
      'Generative AI for Pragmatics: Research, Teaching, and Assessment · edited by Naoko Taguchi · Cambridge University Press',
    status: 'forthcoming',
    date: 'expected March 2027',
    presentation:
      'CALICO — Computer Assisted Language Instruction Consortium · May 30, 2025 (preliminary study)',
    description:
      'I worked with Professor Feng Xiao at Pomona College on fine-tuning and evaluation pipelines for pragmatics assessment. I am the fourth author of this forthcoming chapter.',
    id: 'pub-pragmatics',
  },
  {
    title: 'API endpoint and its value in Chinese international education',
    authors: 'Xiao, F. & Shen, X.',
    venue:
      'Journal of Research on International Chinese Teaching and Learning Resources, Vol. 3, pp. 111–118',
    status: 'published',
    date: '2026',
    id: 'pub-api',
  },
  {
    title: 'Luduan.ai: A System Solution to AI-Enhanced Pedagogy',
    authors: 'Xiao, F., Wojnicki, H. & Shen, X.',
    venue:
      'The 4th Conference on Artificial Intelligence Research in Applied Linguistics · Columbia University',
    status: 'conference paper',
    date: 'Sep 2026',
    id: 'pub-luduan',
  },
]

export const VOLUNTEERING: Volunteering[] = [
  {
    role: 'student volunteer',
    organization: 'Casa Draga Casa Concept Association Beius',
    start: 'Mar 2025',
    end: 'Jun 2025',
    cause: 'disaster & humanitarian relief',
    bullets: [
      'Helped build homes with ten classmates near Oradea, Romania.',
      'Took part in cultural exchanges at a local school and orphanages.',
      'Played violin at Liceul de Arte Oradea and local orphanages.',
      'Spoke with students at Liceul de Arte Oradea about how they learn, using their feedback to inform Studious.',
      'Wrote and performed an original song for more than 60 students.',
    ],
    image: '/media/service/romania-housing.png',
    id: 'vol-casa',
  },
  {
    role: 'educator & developer',
    organization: 'The Lost Food Project',
    start: 'Oct 2025',
    end: 'May 2026',
    cause: 'environment',
    description:
      'I led four students in building an Earth Day web game about food waste. More than thirty people played it, with over three hours of playtime in total.',
    image: '/media/logos/lostfood.png',
    link: 'https://www.thelostfoodproject.org',
    id: 'vol-lostfood',
  },
  {
    role: 'student volunteer',
    organization: "Association Sur Le Chemin de l'école",
    start: 'Apr 2023',
    end: 'Jul 2023',
    cause: 'poverty alleviation',
    bullets: [
      'Helped research the needs of children in Dharia, India. Our fundraising raised CHF 2,500.',
      'Organised a school fundraising event with three classmates.',
      'We hosted a talent show for 120 students and organised an Indian Night event.',
    ],
    id: 'vol-chemin',
  },
]

export const BLOG_POSTS: BlogPost[] = []

export type MusicRelease = {
  title: string
  artist: string
  type: string
  cover: string
  audio?: string
  hyperfollow?: string
  links: { label: string; href: string }[]
  id: string
}

export const MUSIC_RELEASES: MusicRelease[] = [
  {
    title: "I'd Stay",
    artist: 'Alan Shen',
    type: 'single',
    cover: '/media/audio/id-stay-cover.png',
    audio: '/media/audio/id-stay.mp3',
    hyperfollow: 'https://distrokid.com/hyperfollow/alanshen/id-stay',
    links: [
      {
        label: 'Spotify',
        href: 'https://open.spotify.com/album/5X1VFHbrMXlR5hUYKNsODZ',
      },
      {
        label: 'Apple Music',
        href: 'https://music.apple.com/us/album/id-stay-single/1859331014',
      },
      {
        label: 'Deezer',
        href: 'https://www.deezer.com/album/872144062',
      },
      {
        label: 'iHeartRadio',
        href: 'https://www.iheart.com/artist/id-48869184/albums/id-365429044',
      },
    ],
    id: 'id-stay',
  },
  {
    title: 'Dreams of the Blue',
    artist: 'Alan Shen',
    type: 'single',
    cover: '/media/audio/dreams-of-the-blue-cover.png',
    audio: '/media/audio/dreams-of-the-blue.mp3',
    hyperfollow:
      'https://distrokid.com/hyperfollow/alanshen/dreams-of-the-blue',
    links: [],
    id: 'dreams-of-the-blue',
  },
]

export const DISTROKID_ARTIST = 'alanshen'

/** Stage photos for the music page strip. Captions describe the shot, not the venue. */
export const STAGE_PHOTOS: { src: string; alt: string; caption: string }[] = [
  {
    src: '/media/music/violin-portrait.jpg',
    alt: 'Alan Shen playing violin on stage, close-up',
    caption: 'playing violin',
  },
  {
    src: '/media/site/banner.jpg',
    alt: 'Wide shot of Alan Shen performing violin on a lit stage',
    caption: 'performing on stage',
  },
  {
    src: '/media/music/orchestra.png',
    alt: 'Alan Shen playing in an orchestra violin section',
    caption: 'orchestra',
  },
  {
    src: '/media/music/violin-group.png',
    alt: 'Violin section in performance',
    caption: 'violin section',
  },
  {
    src: '/media/music/violin-stage.png',
    alt: 'Alan Shen performing violin in a dark hall',
    caption: 'recital',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/alanshen27',
  },
  {
    label: 'GitHub',
    link: 'https://github.com/alanshen27',
  },
  {
    label: 'Studious',
    link: 'https://studious.ac',
  },
  {
    label: 'Scribe',
    link: 'https://scribe.study',
  },
  {
    label: 'music',
    link: 'https://distrokid.com/hyperfollow/alanshen/id-stay',
  },
  {
    label: 'email',
    link: 'mailto:alan.shen27@gmail.com',
  },
]

export const SITE_NAV = [
  { label: 'home', href: '/' },
  { label: 'work', href: '/work' },
  { label: 'tech', href: '/tech' },
  { label: 'record', href: '/path' },
  { label: 'music', href: '/music' },
] as const

export const EMAIL = 'alan.shen27@gmail.com'

export const HEADLINE =
  'Student at Institut Le Rosey · education software, music, and swimming'

export const TAGLINE =
  'I explore how frontier technologies, especially AI, can contribute to more equitable education, and how technology can intertwine with music.'

export const SUMMARY =
  'I am a student based in Rolle, Switzerland, taking the IB Diploma at Institut Le Rosey. I build education software, contribute to research on AI and language learning, and write and perform music.'

/** One-sentence positioning — the first thing a reader should absorb. */
export const HOME_INTRO =
  'I build education software, contribute to research on AI and language learning, and write and perform music.'

export const MUSIC_INTRO =
  'I have played violin and piano for more than eight years each. I perform with the orchestra and compose my own music.'

/** Slightly longer bio for the About block. */
export const HOME_BIO =
  'I’m a student based in Rolle, Switzerland, taking the IB Diploma at Institut Le Rosey. My projects explore how AI can support education, from helping students work through their ideas to giving teachers freedom in planning courses. I built Scribe with a group of friends because our experiences with study apps made us want more opportunities to practice topics in depth. Studious began as an LMS to simplify coursework organization. I also contribute to research on AI and language learning. Away from the screen, I play the violin and piano, work on singing and songwriting, swim for my school team, and practise Sanda, a Chinese martial art.'

/** Proof strip — six numbers a reader can verify in ten seconds. */
export type Highlight = {
  value: string
  label: string
  detail: string
  href: string
  /** Long single-word values render one step smaller so they never break mid-word */
  compact?: boolean
}

export const HIGHLIGHTS: Highlight[] = [
  {
    value: '1000/1000',
    label: 'USACO',
    detail: '1000 / 1000 in Silver; promoted to Gold, Feb 2026',
    href: '/path',
  },
  {
    value: '1st',
    label: 'HackHarvard China ’25',
    detail: 'Best Overall Hack — Scribe',
    href: '/work#project2',
  },
  {
    value: '3rd',
    label: 'HackMIT China ’26',
    detail: 'Education Track + Outstanding Impact — Nomad',
    href: '/work#project-nomad',
  },
  {
    value: 'Worlds',
    label: 'VEX Robotics ’26',
    detail: 'Excellence Award, Alpine Robo Games — team 15520X',
    href: '/path',
  },
  {
    value: 'Forthcoming',
    compact: true,
    label: 'Cambridge Univ. Press',
    detail: 'Training AI for Pragmatics Assessment · CALICO 2025 talk',
    href: '/#research',
  },
  {
    value: 'Grade 8 ×2',
    label: 'ABRSM',
    detail: 'Violin and piano · two released singles',
    href: '/music',
  },
]

/**
 * The Programme — the ordered listing on the cover. Each row is a work or a
 * result a reader can verify; the right-hand entry is the outcome or role.
 */
export type ProgrammeEntry = {
  title: string
  subtitle: string
  right: string
  href: string
}

export const PROGRAMME: ProgrammeEntry[] = [
  {
    title: 'Studious',
    subtitle:
      'a learning-management system in teacher testing at a school in Romania',
    right: 'project initiator & lead app developer · 2023 – present',
    href: '#note-studious',
  },
  {
    title: 'Scribe',
    subtitle:
      'study app — 5,000+ users, 27 countries, ~US$5,000 ARR; 1st place, HackHarvard China',
    right: 'founder & lead app developer · 2025 – present',
    href: '#note-scribe',
  },
  {
    title: 'Notate',
    subtitle:
      '44.3M-parameter encoder–decoder for phrase infill and continuation',
    right: 'personal project · AI-assisted programming · 2026',
    href: '#note-notate',
  },
  {
    title: 'USACO Gold division',
    subtitle: '1000 / 1000 in the Silver contest, promoted directly to Gold',
    right: 'february 2026',
    href: '#note-competition',
  },
  {
    title: 'VEX Robotics, Team 15520X',
    subtitle:
      'Excellence Award at Alpine Robo Games → World Championship qualifier',
    right: 'engineer & programmer · 2025 – 26',
    href: '#note-competition',
  },
  {
    title: 'Training AI for Pragmatics Assessment',
    subtitle:
      'fourth author of a forthcoming chapter; preliminary work presented at CALICO 2025',
    right: 'Cambridge University Press · forthcoming',
    href: '#note-research',
  },
  {
    title: 'Nomad',
    subtitle:
      'campus planner and student communities, built in 36 hours — Education Track award',
    right: '3rd place · Outstanding Impact · HackMIT China 2026',
    href: '/work#project-nomad',
  },
  {
    title: 'Foundry',
    subtitle:
      'AI workspace from product brief to storefront, co-developed with three teammates',
    right: 'Penn ESAP · 2026',
    href: '/work#project-foundry',
  },
  {
    title: 'Luduan.ai',
    subtitle:
      'student internship in frontend development and UX; platform serving 30+ U.S. institutions',
    right: 'student intern · 2026 – present',
    href: '/path#experience',
  },
  {
    title: 'two singles',
    subtitle: 'two released singles, from five songs composed as Alan Shen',
    right: 'ABRSM Grade 8 violin and piano',
    href: '#interval',
  },
  {
    title: 'swimming, Le Rosey',
    subtitle:
      'fourteen medals at ADISR and MLS (Mountain and Lakes Schools) competitions',
    right: 'three-time team MVP · one school record',
    href: '#honours',
  },
]

/**
 * The roll — every event of the record as a note on a piano roll.
 * Rows are who he is; columns are time. Dates are as recorded; where only a
 * year is known the note is drawn hollow and centred in that year.
 */
export type RollRow =
  | 'builds'
  | 'competition'
  | 'research'
  | 'music'
  | 'athletics'
  | 'service'

export const ROLL_ROWS: { id: RollRow; label: string }[] = [
  { id: 'builds', label: 'builds' },
  { id: 'competition', label: 'competition' },
  { id: 'research', label: 'research' },
  { id: 'music', label: 'music' },
  { id: 'athletics', label: 'athletics' },
  { id: 'service', label: 'service' },
]

export type RollNote = {
  id: string
  row: RollRow
  label: string
  /** YYYY-MM, or YYYY when precision is 'year' */
  start: string
  /** YYYY-MM, or 'now' for ongoing; omit for a single moment */
  end?: string
  precision?: 'month' | 'year'
  /** A result — placement, award, release — rather than a span of work */
  result?: boolean
  detail: string
  href?: string
}

export const ROLL_START = '2022-09'
export const ROLL_END = '2027-06'
export const ROLL_NOW = '2026-09'

export const ROLL_NOTES: RollNote[] = [
  // builds
  {
    id: 'r-studious',
    row: 'builds',
    label: 'Studious',
    start: '2023-09',
    end: 'now',
    detail:
      'project initiator and lead app developer — teacher testing in Romania; four further pilots planned in Nepal',
    href: '#note-studious',
  },
  {
    id: 'r-scribe',
    row: 'builds',
    label: 'Scribe',
    start: '2025',
    precision: 'year',
    end: 'now',
    detail:
      'founder and lead app developer — 5,000+ users across 27 countries, approximately US$5,000 ARR',
    href: '#note-scribe',
  },
  {
    id: 'r-synapse',
    row: 'builds',
    label: 'Synapse',
    start: '2025-10',
    detail:
      'HackHarvard 2025 — an emotion-aware messaging app; one of two high-school teams invited',
    href: '/work#project3',
  },
  {
    id: 'r-hive',
    row: 'builds',
    label: 'Hive',
    start: '2025',
    precision: 'year',
    detail: 'Empower 3.0 Hacks — 3rd place, coding track',
    href: '/work#project4',
  },
  {
    id: 'r-luduan',
    row: 'builds',
    label: 'Luduan.ai',
    start: '2026-02',
    end: 'now',
    detail:
      'student intern in frontend development and UX — platform serving 30+ U.S. institutions',
    href: '/path#experience',
  },
  {
    id: 'r-nomad',
    row: 'builds',
    label: 'Nomad',
    start: '2026-03',
    result: true,
    detail:
      'HackMIT China 2026 — 3rd place, education track; outstanding impact award. 36 hours.',
    href: '/work#project-nomad',
  },
  {
    id: 'r-notate',
    row: 'builds',
    label: 'Notate',
    start: '2026-05',
    end: 'now',
    detail:
      '44.3M-parameter encoder–decoder for phrase infill and continuation; bidirectional attention in the encoder',
    href: '#note-notate',
  },
  {
    id: 'r-foundry',
    row: 'builds',
    label: 'Foundry',
    start: '2026-07',
    end: '2026-08',
    detail:
      'Penn ESAP — AI workspace from product brief to storefront, co-developed with three teammates',
    href: '/work#project-foundry',
  },
  // competition
  {
    id: 'r-vex',
    row: 'competition',
    label: 'VEX 15520X',
    start: '2025-09',
    end: 'now',
    detail: 'engineer & programmer — autonomous routines and driver control',
    href: '#note-competition',
  },
  {
    id: 'r-sgis',
    row: 'competition',
    label: 'SGIS maths · 2nd',
    start: '2025',
    precision: 'year',
    result: true,
    detail:
      'Swiss Group of International Schools mathematics competition — 2nd place',
    href: '/path#honours',
  },
  {
    id: 'r-hhc',
    row: 'competition',
    label: 'HackHarvard China · 1st',
    start: '2025-08',
    result: true,
    detail: 'August 2025 — 1st place overall, “best overall hack”, with Scribe',
    href: '#note-scribe',
  },
  {
    id: 'r-usaco',
    row: 'competition',
    label: 'USACO 1000/1000 → Gold',
    start: '2026-02',
    result: true,
    detail: '1000 / 1000 in the Silver contest; promoted to Gold',
    href: '#note-competition',
  },
  {
    id: 'r-alpine',
    row: 'competition',
    label: 'Excellence Award → Worlds',
    start: '2026-02',
    result: true,
    detail:
      'Alpine Robo Games 2026 — Excellence Award; World Championship qualifier',
    href: '#note-competition',
  },
  // research
  {
    id: 'r-calico',
    row: 'research',
    label: 'CALICO talk · Cambridge UP',
    start: '2025-05',
    result: true,
    detail:
      'preliminary pragmatics assessment study — CALICO 2025 talk; related chapter forthcoming, Cambridge University Press',
    href: '#note-research',
  },
  {
    id: 'r-api',
    row: 'research',
    label: 'API endpoint paper',
    start: '2026',
    precision: 'year',
    detail:
      'published — Journal of Research on International Chinese Teaching and Learning Resources',
    href: '#note-research',
  },
  {
    id: 'r-columbia',
    row: 'research',
    label: 'Luduan.ai paper · Columbia',
    start: '2026-09',
    result: true,
    detail:
      '4th Conference on AI Research in Applied Linguistics, Columbia University',
    href: '#note-research',
  },
  // music
  {
    id: 'r-romania-music',
    row: 'music',
    label: 'Oradea performances',
    start: '2025-03',
    end: '2025-06',
    detail:
      'violin for the Liceul de Arte Oradea and orphanages; wrote and performed a song for 60+ students',
    href: '#interval',
  },
  {
    id: 'r-idstay',
    row: 'music',
    label: '‘I’d Stay’',
    start: '2025-12',
    result: true,
    detail: 'single released as Alan Shen — 6 December 2025',
    href: '#interval',
  },
  // athletics
  {
    id: 'r-swim',
    row: 'athletics',
    label: 'swimming, Le Rosey',
    start: '2023-09',
    end: 'now',
    detail: 'competitive swimmer — three-time team MVP',
    href: '#honours',
  },
  {
    id: 'r-adisr23',
    row: 'athletics',
    label: 'ADISR · 1st, school record',
    start: '2023',
    precision: 'year',
    result: true,
    detail:
      'ADISR 2023 EHL — 1st place (moyen); three gold medals and a new school record',
    href: '/path#athletics',
  },
  {
    id: 'r-mls24',
    row: 'athletics',
    label: 'MLS 2024',
    start: '2024',
    precision: 'year',
    result: true,
    detail: 'Beau Soleil — silver, 4×50 IM relay',
    href: '/path#athletics',
  },
  {
    id: 'r-mls-openwater',
    row: 'athletics',
    label: 'MLS open water relay · 1st',
    start: '2026',
    precision: 'year',
    result: true,
    detail: '2026 MLS open water relay — team 1st place',
    href: '/path#athletics',
  },
  {
    id: 'r-adisr24',
    row: 'athletics',
    label: 'ADISR 2024',
    start: '2024',
    precision: 'year',
    result: true,
    detail: 'EHL — bronze 100 free; gold, IM relay and freestyle relay',
    href: '/path#athletics',
  },
  {
    id: 'r-mls25',
    row: 'athletics',
    label: 'MLS 2025',
    start: '2025-06',
    end: '2025-07',
    result: true,
    detail:
      'silver, IM; gold — 100 free, 200 freestyle relay, 200 medley relay',
    href: '/path#athletics',
  },
  {
    id: 'r-adisr25',
    row: 'athletics',
    label: 'ADISR 2025',
    start: '2025',
    precision: 'year',
    result: true,
    detail: 'EHL — silver 50 free; gold 4×50 free',
    href: '/path#athletics',
  },
  // service
  {
    id: 'r-chemin',
    row: 'service',
    label: 'Sur le Chemin de l’école',
    start: '2023-04',
    end: '2023-07',
    detail:
      'raised 2,500 CHF for children in Dharia, India; hosted a 120-student talent show',
    href: '/path#service',
  },
  {
    id: 'r-casa',
    row: 'service',
    label: 'Casa Draga Casa · Oradea',
    start: '2025-03',
    end: '2025-06',
    detail:
      'helped build housing with ten classmates in a suburban area near Oradea; spoke with students at Liceul de Arte Oradea about learning',
    href: '/path#service',
  },
  {
    id: 'r-lostfood',
    row: 'service',
    label: 'The Lost Food Project',
    start: '2025-10',
    end: '2026-05',
    detail: 'led four students building an Earth Day game — 30+ players',
    href: '/path#service',
  },
]

/** Lines in Alan's own words, from earlier versions of this site's copy. */
export const LINES = {
  code: 'Most of my time is spent tinkering with computers, making music, and swimming.',
  systems:
    'I enjoy figuring out how things work, from the software I build to the robots I programme.',
}

/** Notes on the major projects and research contributions. */
export const NOTES: Record<string, string[]> = {
  studious: [
    'Studious began as an LMS to simplify coursework organisation. I led seven students of different disciplines during the project to develop, research, and design different features.',
    'The platform combines class scheduling, assignment organisation, worksheet creation, gradebook management, class statistics, and file sharing, along with a marketplace for teachers to share materials.',
    'I later added AI Labs so teachers could use AI to design simulations, create assignments, and monitor student performance, as well as give automated feedback.',
    'To help shape the project, I spoke with students at Liceul de Arte Oradea during a service trip and at Chinese high schools about how they learn. We have begun teacher testing at Colegiul Economic Partenie Cosma in Romania, with four more school pilots planned in Nepal.',
  ],
  scribe: [
    'I started Scribe with a group of friends towards the end of Grade 10, in 2025. We wanted more ways to practise topics in depth than we had found in other study apps. I led three students in designing interactive learning aids, visuals, and guided summaries.',
    'On the backend, I used retrieval-augmented generation (RAG) and agentic graph loops with subagent orchestration to generate study materials.',
    'I added long-form questions, summaries where students explain definitions in their own words, and interactive visualisations to explore ideas from different perspectives. Based on classmates’ feedback during beta testing, I redesigned the navigation to guide students from one exercise to the next.',
    'Scribe has reached 5,000+ users across 27 countries and approximately US$5,000 ARR, with 47,600+ practice artifacts and 5,630+ study activities generated. Our team took first place overall at HackHarvard China in August 2025.',
  ],
  notate: [
    'I developed Notate as an AI co-writing tool for composition. It autocompletes phrases and fills gaps between written passages.',
    'The flagship model is a 44.3M-parameter bidirectional transformer, which was pretrained and fine-tuned through multiple stages using open-source datasets. It performs autoregressive and bidirectional generation effectively, and can adapt and return to some repeating themes as well as adapt to the music around it.',
  ],
  foundry: [
    'I built Foundry, an AI engineering workspace, with Jason Xiao, William Sun, and Zhiheng Li at the Penn ESAP summer programme as our final project.',
    'We built a multi-stage, tool-based workspace that allows agents to create physical engineering projects involving CAD, multiple components, schematics, simulations, PCB design, and marketing.',
    'Our goal was to explore and apply “vibe-coding” in physical engineering, experimenting with the limits of novel models and agent harness paradigms.',
  ],
  synapse: [
    'I built Synapse at HackHarvard to explore how a message could augment humanity by enhancing our digital communications, preserving more human characteristics while keeping the convenient typing interface unchanged.',
    'To do this, we transcribed voice messages into text and used neural networks to classify vocal cues and facial features. This let users see the estimated mood in which a message was sent. We also added realistic voice replication, using the emotion labels applied to sent texts to shape the playback.',
  ],
  competition: [
    'I scored 1000 / 1000 in the February 2026 USACO Silver contest and was promoted to Gold. With VEX team 15520X, I help design the robot and program its autonomous routines and driver controls. Our team received the Excellence Award at Alpine Robo Games 2026 and qualified for the World Championship in St. Louis. We also placed third in skills and in the qualifiers at Alpine Robo Games, and fourth in skills and seventh overall at the Swiss Regional.',
  ],
  research: [
    'I worked with Professor Feng Xiao at Pomona College on AI and pragmatics assessment in second-language learning, building fine-tuning and evaluation pipelines. I am the fourth author of “Training AI for Pragmatics Assessment”, a chapter in Generative AI for Pragmatics: Research, Teaching, and Assessment, edited by Naoko Taguchi and forthcoming from Cambridge University Press. Preliminary work was presented at CALICO in May 2025. I also contributed to a published piece on API endpoints in Chinese international education and a conference paper on Luduan.ai.',
  ],
}

/** Dossier facts — the ID-card column in the hero. */
export const FACTS: { label: string; value: string; href?: string }[] = [
  { label: 'School', value: 'Institut Le Rosey, Rolle CH' },
  { label: 'Programme', value: 'IB Diploma · Class of 2027' },
  { label: 'Roles', value: 'Student · Developer · Violinist' },
  { label: 'Focus', value: 'EdTech · AI/ML systems · CP' },
  { label: 'Summer ’26', value: 'Penn ESAP — AI & mathematics' },
  { label: 'Languages', value: 'TypeScript · C++ · Python' },
]

export const NAME = 'Alan Shen'

export const LOCATION = 'Rolle, Switzerland'

export const ROLE = 'Student · Developer · Violinist'
