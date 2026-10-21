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
      'I started Studious to help teachers organise coursework and explore AI-assisted lesson planning.',
    link: 'https://studious.ac',
    image: '/media/projects/studious.png',
    id: 'project1',
    role: 'project initiator & lead app developer',
    timeframe: 'Sep 2023 – present',
    device: 'laptop',
    kind: 'build',
    outcome: 'teacher pilot at Colegiul Economic Partenie Cosma',
    tags: ['Next.js', 'tRPC', 'Supabase', 'Pusher'],
    points: [
      'I lead a group of seven students working on the platform, including its Next.js frontend and tRPC backend.',
      'I added tools for scheduling, assignments, worksheets, feedback, and gradebook management.',
      'We began teacher testing at Colegiul Economic Partenie Cosma in Romania, with pilots planned at four other schools.',
    ],
  },
  {
    name: 'Scribe',
    description:
      'I built Scribe with friends to give students more ways to work through their notes and practise ideas in depth.',
    link: 'https://www.scribe.study',
    image: '/media/projects/scribe.png',
    id: 'project2',
    role: 'founder & lead app developer',
    timeframe: '2025 – present',
    device: 'tvModern',
    photo: '/media/hackathons/hackharvard-china.jpg',
    photoCaption: 'on stage · HackHarvard China 2025, 1st place overall',
    kind: 'build',
    outcome: '5,000+ users · 1st place overall, HackHarvard China 2025',
    tags: ['AI workflows', 'Inference', 'Full-stack'],
    points: [
      'Our team received 1st Place Overall at HackHarvard China 2025.',
      'I led three students in developing interactive learning aids, visualisations, and guided summaries.',
      'I used classmates’ feedback to revise navigation and added exercises that ask students to explain ideas in their own words.',
    ],
  },
  {
    name: 'Notate',
    description:
      'I am exploring musical call and response with Notate, a model that can infill and continue a phrase.',
    link: 'https://github.com/alanshen27/notate',
    repo: 'https://github.com/alanshen27/notate',
    id: 'project-notate',
    role: 'personal project · AI-assisted programming',
    timeframe: 'May 2026 – present',
    kind: 'research',
    outcome: '44.3M-parameter encoder-decoder transformer',
    tags: ['PyTorch', 'Transformer', 'FastAPI', 'Web Audio'],
    points: [
      'I developed a bidirectional encoder-decoder transformer with eight attention heads and a REMI-style MIDI tokenizer, using AI-assisted programming.',
      'I pretrained the model on classical performances and fine-tuned it on selected contemporary pieces.',
      'I connected Notate to Butterflies in Love with Flowers, where it exchanges four-bar phrases with the performer.',
    ],
  },
  {
    name: 'Foundry',
    description:
      'I built Foundry at Penn ESAP to explore how an AI workspace could connect a product brief with design and engineering tools.',
    link: 'https://github.com/alanshen27/foundry',
    repo: 'https://github.com/alanshen27/foundry',
    id: 'project-foundry',
    role: 'Penn ESAP 2026',
    timeframe: 'Jul – Aug 2026',
    kind: 'build',
    outcome: 'final project · Penn ESAP AI track',
    tags: ['TypeScript', 'KCL CAD', 'Yjs', 'Shopify'],
    points: [
      'I worked on an assistant that uses project context to call tools and run background tasks.',
      'I brought CAD, schematic and PCB workspaces, and a shared code editor into one interface.',
      'I experimented with connecting design checks to storefront generation and Shopify checkout.',
    ],
  },
  {
    name: 'Nomad',
    description:
      'I worked on Nomad, a campus planner that helps students explore course prerequisites and find classmates.',
    link: 'https://www.youtube.com/watch?v=zUIMYg8ByNI',
    devpost: 'https://devpost.com/software/nomad-j58qea',
    repo: 'https://github.com/usenomad',
    image: '/media/projects/nomad.png',
    id: 'project-nomad',
    role: 'HackMIT China 2026',
    timeframe: '36 hours',
    device: 'desk',
    kind: 'hackathon',
    outcome: '3rd Place, Education Track · Outstanding Impact Award',
    tags: ['Graphs', 'Planning', 'Social'],
    points: [
      'We built a course planner around prerequisite graphs.',
      'We added ways to find classmates and student communities.',
    ],
  },
  {
    name: 'Synapse',
    description:
      'At HackHarvard 2025, I worked on Synapse, an experiment in adding speech and facial-expression cues to messages.',
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
    tags: ['Emotion recognition', 'Speech', 'Voice cloning'],
    points: [
      'We transcribed voice messages and used tone, pitch, and rhythm to estimate emotional cues.',
      'We explored attaching estimated facial-expression cues to text messages.',
      'We added speech playback using voice cloning, with the estimated cues influencing delivery.',
    ],
  },
  {
    name: 'Hive',
    description:
      'I worked on Hive at Empower 3.0 Hacks to explore study groups with shared chat and an AI assistant.',
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
    tags: ['Collaboration', 'Realtime'],
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
      'I worked on the infrastructure using Pusher, Supabase, Render, and Vercel.',
      'I led seven students in starting a teacher pilot at Colegiul Economic Partenie Cosma; we have four further school pilots planned.',
      'I lead frontend development in Next.js and work on the backend with tRPC.',
      'I added AI-assisted course design and automated feedback tools for teachers to try.',
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
      'I built Scribe with friends and led three students working on learning aids, visualisations, and guided summaries.',
      'I redesigned the exercise navigation using feedback from classmates.',
      'I worked on the backend and used retrieval-augmented generation to help create study materials.',
      'The project has reached more than 5,000 users across 27 countries.',
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
      'I rebuilt the frontend and designed the user experience for web apps on the platform.',
      'I assisted with the relaunch at the 2026 CALICO Conference. The platform serves more than 30 U.S. institutions.',
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
      'I helped design and build the robot.',
      'I programmed the autonomous routines.',
      'I worked on the driver-control interface.',
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
      'MLS 2024 Lake Swim Relay: ~150 m per lap; Team 1st Place.',
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
    date: 'Nov 2025',
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
      'Our team received the Excellence Award at Alpine Robo Games and qualified for the VEX World Championship in Dallas.',
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
    date: '2026',
    presentation:
      'CALICO — Computer Assisted Language Instruction Consortium · Jun 15, 2026',
    description:
      'I worked with Professor Feng Xiao at Pomona College on fine-tuning and evaluation pipelines for pragmatics assessment. I am the fourth author of this forthcoming chapter.',
    id: 'pub-pragmatics',
  },
  {
    title: 'API endpoint and its value in Chinese international education',
    authors: 'Xiao, F. & Shen, X.',
    venue:
      'Journal of Research on International Chinese Teaching and Learning Resources, Vol. 3, pp. 111–118',
    status: 'accepted · forthcoming',
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
      'I helped build housing units with ten classmates in rural Romania, near Oradea.',
      'I joined visits to orphanages and a local school for cultural exchange.',
      'I prepared and performed violin music at Liceul de Arte Oradea and local orphanages.',
      'I spoke with students at Liceul de Arte Oradea about their learning experiences to inform my work on Studious.',
      'I wrote a song and performed it for more than sixty students during the visit.',
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
      'I helped research the needs of children in Dharia, India, and our fundraising raised CHF 2,500.',
      'I organised a school fundraising event with three classmates.',
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
    caption: 'solo · close',
  },
  {
    src: '/media/site/banner.jpg',
    alt: 'Wide shot of Alan Shen performing violin on a lit stage',
    caption: 'solo · stage',
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
  'I am exploring how software can give students and teachers more room to work through ideas.'

export const SUMMARY =
  'I am a student at Institut Le Rosey interested in computer science, education, and music. I started Studious and founded Scribe with friends, and I contribute to research on AI and language learning. Outside these projects, I swim, play violin and piano, and write music.'

/** One-sentence positioning — the first thing a reader should absorb. */
export const HOME_INTRO =
  'I am a student exploring how software can support learning. I also enjoy making music, swimming, and working on robots with my teammates.'

/** Slightly longer bio for the About block. */
export const HOME_BIO =
  'I am a student at Institut Le Rosey, interested in how people learn and how software might help. I started Studious and built Scribe with friends, learning from the teachers and classmates who try them. I also contribute to research on AI and language learning. Away from coding, I play violin and piano, write music, and swim with my school team.'

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
    detail: 'Training AI for Pragmatics Assessment · CALICO 2026 talk',
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
    subtitle: 'a learning-management system with a teacher pilot in Romania',
    right: 'project initiator & lead app developer · 2023 – present',
    href: '#note-studious',
  },
  {
    title: 'Scribe',
    subtitle: 'AI study assistant — 1st place overall, HackHarvard China 2025',
    right: 'founder & lead app developer · 2025 – present',
    href: '#note-scribe',
  },
  {
    title: 'Notate',
    subtitle: 'my experiment in musical call and response with a transformer',
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
      'fourth author of a forthcoming chapter; work presented at CALICO 2026',
    right: 'Cambridge University Press · forthcoming',
    href: '#note-research',
  },
  {
    title: 'Nomad',
    subtitle: 'campus planner and student network, built in 36 hours',
    right: '3rd Place · HackMIT China 2026',
    href: '/work#project-nomad',
  },
  {
    title: 'Foundry',
    subtitle: 'AI-native workspace from product brief to storefront',
    right: 'Penn ESAP · 2026',
    href: '/work#project-foundry',
  },
  {
    title: 'Luduan.ai',
    subtitle:
      'student internship in frontend development and UX; platform serving 30+ U.S. institutions',
    right: 'student intern · 2026 – present',
    href: '/path#appointments',
  },
  {
    title: 'two singles',
    subtitle: '‘I’d Stay’ and ‘Dreams of the Blue’, released as Alan Shen',
    right: 'ABRSM grade 8 violin & piano',
    href: '#interval',
  },
  {
    title: 'swimming, Le Rosey',
    subtitle: 'fourteen medals at ADISR and SGIS competitions',
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
    detail: 'project initiator & lead app developer — teacher pilot in Romania',
    href: '#note-studious',
  },
  {
    id: 'r-scribe',
    row: 'builds',
    label: 'Scribe',
    start: '2025',
    precision: 'year',
    end: 'now',
    detail: 'founder & lead app developer — AI study app',
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
    href: '/path#appointments',
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
    detail: 'my experiment in phrase infilling and continuation with Notate',
    href: '#note-notate',
  },
  {
    id: 'r-foundry',
    row: 'builds',
    label: 'Foundry',
    start: '2026-07',
    end: '2026-08',
    detail: 'Penn ESAP — AI-native workspace from product brief to storefront',
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
    start: '2025-11',
    result: true,
    detail: '1st place overall, “best overall hack” — with Scribe',
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
    start: '2026-06',
    result: true,
    detail:
      '“Training AI for Pragmatics Assessment” — talk at CALICO; forthcoming, Cambridge University Press',
    href: '#note-research',
  },
  {
    id: 'r-api',
    row: 'research',
    label: 'API endpoint paper',
    start: '2026',
    precision: 'year',
    detail:
      'accepted — Journal of Research on International Chinese Teaching and Learning Resources',
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
    detail: 'Beau Soleil — silver, 4×50 IM relay; lake swim relay, team 1st',
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
      'helped build housing with ten classmates; spoke with students at Liceul de Arte Oradea about learning',
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
  code: 'I like working through questions with other people, then building things that might help us understand them.',
  systems:
    'I am exploring how software can give students and teachers more room to work through ideas.',
}

/** First-person notes for the major projects and research contributions. */
export const NOTES: Record<string, string[]> = {
  studious: [
    'I started Studious in 2023 to make coursework easier to organise. It grew into a learning-management system with scheduling, assignments, worksheets, feedback, and gradebook tools. I lead a group of seven students and work on the Next.js frontend and tRPC backend. I also added an AI Labs feature so teachers can experiment with simulations, assignments, and course design.',
    'We began teacher testing at Colegiul Economic Partenie Cosma in Romania. I also spoke with students at Liceul de Arte Oradea during a service trip and at Chinese high schools to understand their experiences. We have pilots planned with four other schools, including in Nepal.',
  ],
  scribe: [
    'I began Scribe with a group of friends toward the end of Grade 10 in 2025 because we wanted more ways to practise topics in depth. I led three students working on interactive learning aids, visualisations, and guided summaries. I added long-form questions and exercises where students explain ideas in their own words, then revised the navigation using feedback from classmates.',
    'Our team received 1st Place Overall at HackHarvard China 2025. Scribe has reached more than 5,000 users across 27 countries. I am still interested in the question that started it: how can an app help someone stay with an idea long enough to understand it?',
  ],
  notate: [
    'I developed Notate using AI-assisted programming to explore how a model might respond to a musical phrase. The current model is a bidirectional, 44.3M-parameter encoder-decoder transformer with eight attention heads and a REMI-style MIDI tokenizer. I pretrained it on classical performances and fine-tuned it on selected contemporary pieces for phrase recognition, infilling, and continuation.',
    'In Butterflies in Love with Flowers, I connected Notate to a cursor-based interface so the performer and model can exchange four-bar phrases. I wanted to explore whether a generated reply could leave room for the performer to take the music somewhere else.',
  ],
  competition: [
    'I scored 1000 / 1000 in the February 2026 USACO Silver contest and was promoted to Gold. With VEX team 15520X, I help design the robot and program its autonomous routines and driver controls. Our team received the Excellence Award at Alpine Robo Games 2026 and qualified for the World Championship in Dallas. We also placed third in skills and qualifiers at Alpine Robo Games, and fourth in skills and seventh overall at the Swiss Regional.',
  ],
  research: [
    'I worked with Professor Feng Xiao at Pomona College on AI and pragmatics assessment in second-language learning, building fine-tuning and evaluation pipelines. I am the fourth author of “Training AI for Pragmatics Assessment”, a chapter in Generative AI for Pragmatics: Research, Teaching, and Assessment, edited by Naoko Taguchi and forthcoming from Cambridge University Press. The work was presented at CALICO in June 2026. I also contributed to a paper on API endpoints in Chinese international education and a conference paper on Luduan.ai.',
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

export const LOCATION = 'Geneva Metropolitan Area'

export const ROLE = 'Student · Developer · Violinist'
