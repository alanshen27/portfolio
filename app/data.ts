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
      'A modern LMS for schools — AI in the daily workflow, not bolted on as a demo.',
    link: 'https://www.studious.sh',
    image: '/media/projects/studious.png',
    id: 'project1',
    role: 'Founder',
    timeframe: 'Sep 2023 – Present',
    device: 'laptop',
    kind: 'company',
    outcome: 'Live product · School Development Program',
    tags: ['Next.js', 'tRPC', 'Supabase', 'Pusher'],
    points: [
      'Led frontend in Next.js and backend with tRPC.',
      'Scaled with Pusher sockets, Supabase read replicas, Render load balancing, and Vercel edge delivery.',
      'Started the Studious School Development Program for under-resourced classrooms.',
    ],
  },
  {
    name: 'Scribe',
    description:
      'AI study assistant that teaches how to learn — structured methods, not just answers.',
    link: 'https://www.scribe.study',
    image: '/media/projects/scribe.png',
    id: 'project2',
    role: 'SWE & Co-Founder',
    timeframe: 'Aug 2025 – Jan 2026',
    device: 'tvModern',
    photo: '/media/hackathons/hackharvard-china.jpg',
    photoCaption: 'On stage · HackHarvard China 2025, 1st Place Overall',
    kind: 'company',
    outcome: '1st Place Overall · HackHarvard China 2025',
    tags: ['AI workflows', 'Inference', 'Full-stack'],
    points: [
      '1st Place Overall at HackHarvard China 2025.',
      'Led frontend redesign and backend infrastructure.',
      'Supported inference design for AI-driven study workflows.',
    ],
  },
  {
    name: 'notate',
    description:
      'AI music co-writer: sketch on a piano roll, a Transformer continues the phrase, and it plays back through a synth written from scratch.',
    link: 'https://github.com/alanshen27/notate',
    repo: 'https://github.com/alanshen27/notate',
    id: 'project-notate',
    role: 'Solo build',
    timeframe: 'May 2026 – Present',
    kind: 'research',
    outcome: '~21M-param Transformer · Prelude / Canon / Sinfonia models',
    tags: ['PyTorch', 'Transformer', 'FastAPI', 'Web Audio'],
    points: [
      'Decoder-only Transformer (6×512, 8 heads) trained on REMI-tokenised MIDI — POP909 and larger piano corpora.',
      'Polyphonic subtractive synth built as a Web Audio AudioWorklet; same DSP drives playback and WAV export.',
      'Piano-roll UI: sketch → continue with AI → accept / edit → continue again.',
    ],
  },
  {
    name: 'Foundry',
    description:
      'AI-native workspace that takes a physical-product idea from brief to CAD, PCB, verification, storefront, and checkout.',
    link: 'https://github.com/alanshen27/foundry',
    repo: 'https://github.com/alanshen27/foundry',
    id: 'project-foundry',
    role: 'Penn ESAP 2026',
    timeframe: 'Jul – Aug 2026',
    kind: 'build',
    outcome: 'Ideate → Engineer → Verify → Launch pipeline',
    tags: ['TypeScript', 'KCL CAD', 'Yjs', 'Shopify'],
    points: [
      'Project-aware AI copilot with streaming tool execution and background jobs.',
      'Mechanical CAD (KCL / Zoo), schematic and PCB workspaces, Monaco editor with Yjs multiplayer.',
      'Verification gates, then v0-generated storefront and Shopify-backed checkout.',
    ],
  },
  {
    name: 'Nomad',
    description:
      'Campus planner plus student network — prerequisite graphs, dependency-aware plans, and people discovery.',
    link: 'https://www.linkedin.com/in/alanshen27/',
    image: '/media/projects/nomad.png',
    id: 'project-nomad',
    role: 'HackMIT China 2026',
    timeframe: '36 hours',
    device: 'desk',
    kind: 'hackathon',
    outcome: '3rd Place, Education Track · Outstanding Impact Award',
    tags: ['Graphs', 'Planning', 'Social'],
    points: [
      '3rd Place, Education Track — Outstanding Impact Award.',
      'Interactive course planner with prerequisite dependency graphs.',
      'Social layer for finding classmates, communities, and relevant peers.',
    ],
  },
  {
    name: 'Synapse',
    description:
      'Neural network visualization and analysis — built for HackHarvard.',
    link: 'https://youtu.be/nuEoH_5YOi4',
    image: '/media/projects/synapse.png',
    id: 'project3',
    role: 'HackHarvard 2025',
    timeframe: 'Oct 2025',
    device: 'monitor',
    photo: '/media/hackathons/hackharvard-2025.jpg',
    photoCaption: 'Team at HackHarvard 2025, Cambridge MA',
    kind: 'hackathon',
    outcome: 'Invitational · one of two high-school teams',
    tags: ['Visualization', 'ML'],
    points: [
      'Interactive viz for inspecting network structure and behavior.',
      'Full demo walkthrough on YouTube.',
    ],
  },
  {
    name: 'Hive',
    description:
      'Collaborative project management — built for Empower 3.0 Hacks.',
    link: 'https://www.youtube.com/watch?v=HJVGiYUyQoI',
    image: '/media/projects/hive.png',
    id: 'project4',
    role: 'Empower 3.0',
    timeframe: '2025',
    device: 'tvVintage',
    kind: 'hackathon',
    outcome: '3rd Place, Coding track · 450+ participants',
    tags: ['Collaboration', 'Realtime'],
    points: [
      '3rd Place, Coding track (450+ participants).',
      'Shared workspace for coordinating collaborative builds.',
    ],
  },
]

export const PROJECT_KIND_LABEL: Record<ProjectKind, string> = {
  company: 'Company',
  hackathon: 'Hackathon',
  research: 'Research build',
  build: 'Build',
}

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Studious',
    title: 'Founder',
    start: 'September 2023',
    end: 'Present',
    link: 'https://www.studious.sh',
    image: 'https://www.studious.sh/logo.png',
    bullets: [
      'Designed scalable infrastructure with sockets (Pusher.js), Supabase read replication, Render with load balancer, and Vercel for minimized geographical latency.',
      'Created the Studious School Development Program, intended to bring modern learning to underprivileged communities.',
      'Led frontend development with Next.js.',
      'Led backend development with tRPC and React.',
    ],
    id: 'work1',
  },
  {
    company: 'Scribe',
    title: 'SWE and Co-Founder',
    start: 'August 2025',
    end: 'Present',
    link: 'https://www.scribe.study',
    image: '/media/logos/scribe.png',
    bullets: [
      'Worked as frontend and backend developer with AI-driven workflows.',
      'Led frontend redesign.',
      'Developed backend infrastructure.',
      'Assisted in inferencing infrastructure and design.',
    ],
    id: 'work2',
  },
  {
    company: 'Luduan.ai',
    title: 'Frontend and UI/UX Design Contributor',
    start: 'February 2026',
    end: 'Present',
    link: 'https://www.luduan.ai',
    image: '/media/logos/luduan.png',
    bullets: [
      'Assisting in frontend rebuild ideation and architecture (unpublished).',
      'Working on migrating features to a new codebase to serve 30+ U.S. institutions.',
    ],
    id: 'work3',
  },
  {
    company: 'VEX Robotics',
    title: 'Engineer and Programmer — 15520X (MECH_IT_HAPPEN)',
    start: 'September 2025',
    end: 'Present',
    image: '/media/logos/vex.jpg',
    photo: '/media/vex/team.png',
    bullets: [
      '3rd place skills and 3rd place qualifiers at Alpine Robo Games 2026.',
      'Ranked 4th Skills, 7th Overall at Swiss Regional Competition (Santa Clash @ ISBasel).',
      'Assisted in robot creation and design.',
      'Engineered autonomous control mode.',
      'Programmed interface for human interactions (controller).',
    ],
    id: 'work4',
  },
  {
    company: 'Institut Le Rosey',
    title: 'Competitive Swimmer',
    start: 'September 2023',
    end: 'Present',
    image: '/media/logos/lerosey.png',
    location: 'Switzerland',
    bullets: [
      '2-year Swimming MVP at Le Rosey.',
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
    degree: 'IB Diploma',
    start: '2022',
    end: '2027',
    location: 'Rolle, Switzerland',
    image: '/media/logos/lerosey.png',
    id: 'edu1',
  },
  {
    institution:
      'University of Pennsylvania — Engineering Summer Academy (ESAP)',
    degree: 'AI and its mathematics · three-week intensive',
    start: 'Jul 2026',
    end: 'Jul 2026',
    location: 'Philadelphia, PA',
    id: 'edu-esap',
  },
  {
    institution: 'Singapore American School',
    degree: 'K–10',
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
    label: 'Languages',
    items: 'TypeScript, C++, Python, JavaScript, SQL',
  },
  {
    label: 'Frameworks',
    items: 'Next.js, React, tRPC, Motion',
  },
  {
    label: 'Systems & Tools',
    items: 'Supabase, Pusher, Vercel, Render, Git',
  },
  {
    label: 'Focus',
    items: 'Competitive programming, AI / ML systems, product design',
  },
  {
    label: 'Music',
    items: 'ABRSM Grade 8 Violin & Piano, recording, orchestration',
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'ABRSM Grade 8 Piano',
    issuer: 'Performance',
    image: 'https://upload.wikimedia.org/wikipedia/en/f/f6/ABRSM_logo.svg',
    id: 'cert1',
  },
  {
    name: 'ABRSM Grade 8 Violin',
    issuer: 'Performance',
    image: 'https://upload.wikimedia.org/wikipedia/en/f/f6/ABRSM_logo.svg',
    id: 'cert2',
  },
  {
    name: 'Building Biosensor Software for Public Health Research',
    issuer: 'Pre-college Course',
    id: 'cert3',
  },
  {
    name: 'TOEFL iBT',
    issuer: 'Score: 117 / 120',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNmS9EYfLaBhhQnpC3-ShH-eOu6PjkzPAyYQ&s',
    id: 'cert4',
  },
]

export const AWARDS: Award[] = [
  {
    title: 'HackHarvard 2025 China — 1st Place',
    description: '1st Place Overall, "Best Overall Hack" Winner.',
    date: 'Nov 2025',
    image: '/media/logos/hackharvard.svg',
    photo: '/media/hackathons/hackharvard-win.jpg',
    id: 'award1',
  },
  {
    title:
      'HackMIT China 2026 — 3rd Place (Education Track) & Outstanding Impact Award',
    description:
      'Podium finish out of 300+ participants during the 2026 HackMIT China Challenge. Built Nomad in 36 hours.',
    date: 'Mar 2026',
    image: '/media/logos/hackmit.png',
    id: 'award-hackmit',
  },
  {
    title: 'USACO Gold Division',
    description:
      'Achieved 1000 / 1000 in the USACO Silver contest to be directly promoted to USACO Gold.',
    date: 'Feb 2026',
    image: '/media/projects/usaco.png',
    id: 'award4',
  },
  {
    title: 'Excellence Award | Alpine Robo Games 2026',
    description:
      'Won Excellence Award for VEX Robotics Swiss qualifications and qualified for VEX Worlds in Dallas, Texas. Issued by VEX Robotics.',
    date: 'Feb 2026',
    image: '/media/logos/vex.jpg',
    photo: '/media/vex/worlds-team.jpeg',
    id: 'award-vex',
  },
  {
    title: 'HackHarvard 2025 — Compile the Decade (Invitational)',
    description:
      'Invited as one of only two high school teams to attend HackHarvard 2025.',
    date: 'Oct 2025',
    image: '/media/logos/hackharvard.svg',
    photo: '/media/hackathons/hackharvard-2025.jpg',
    id: 'award2',
  },
  {
    title: 'Empower 3.0 Hacks — 3rd Place',
    description: '3rd Place, "Coding" track; 450+ participants in total.',
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
    venue: 'Cambridge University Press',
    status: 'Forthcoming',
    date: '2026',
    presentation:
      'CALICO — Computer Assisted Language Instruction Consortium · Jun 15, 2026',
    id: 'pub-pragmatics',
  },
  {
    title: 'API endpoint and its value in Chinese international education',
    authors: 'Xiao, F. & Shen, X.',
    venue:
      'Journal of Research on International Chinese Teaching and Learning Resources, Vol. 3, pp. 111–118',
    status: 'Accepted · forthcoming',
    date: '2026',
    id: 'pub-api',
  },
  {
    title: 'Luduan.ai: A System Solution to AI-Enhanced Pedagogy',
    authors: 'Xiao, F., Wojnicki, H. & Shen, X.',
    venue:
      'The 4th Conference on Artificial Intelligence Research in Applied Linguistics · Columbia University',
    status: 'Conference',
    date: 'Sep 2026',
    id: 'pub-luduan',
  },
]

export const VOLUNTEERING: Volunteering[] = [
  {
    role: 'Student Volunteer',
    organization: 'Casa Draga Casa Concept Association Beius',
    start: 'Mar 2025',
    end: 'Jun 2025',
    cause: 'Disaster & Humanitarian Relief',
    bullets: [
      'Built and worked on multiple housing units with 10 classmates in rural Romania (Oradea).',
      'Visited orphanages and the local liceul for cultural exchange.',
      'Prepared and performed violin music for the Liceul De Arte Oradea and orphanages.',
      'Initiated the Studious Student Development Program, bringing AI-empowered education to two local schools.',
      'Wrote a song and performed it for 60+ students to raise awareness.',
    ],
    image: '/media/service/romania-housing.png',
    id: 'vol-casa',
  },
  {
    role: 'Educator & Developer',
    organization: 'The Lost Food Project',
    start: 'Oct 2025',
    end: 'May 2026',
    cause: 'Environment',
    description:
      'Led a team of 4 students building a web-based game for Earth Day to spread awareness about food waste — 3+ hours of playtime across 30+ players, with largely positive feedback.',
    image: '/media/logos/lostfood.png',
    link: 'https://www.thelostfoodproject.org',
    id: 'vol-lostfood',
  },
  {
    role: 'Student Volunteer',
    organization: "Association Sur Le Chemin de l'école",
    start: 'Apr 2023',
    end: 'Jul 2023',
    cause: 'Poverty Alleviation',
    bullets: [
      'Researched the needs and situation of children in Dharia, India, raising 2,500 CHF.',
      'Organised a school-wide fundraising event with 3 classmates.',
      'Hosted a 120-student cadet talent show, organised Indian Night and themed decoration.',
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
    type: 'Single',
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
    type: 'Single',
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
    caption: 'Solo · close',
  },
  {
    src: '/media/music/violin-wide.png',
    alt: 'Wide shot of Alan Shen performing violin on a lit stage',
    caption: 'Solo · stage',
  },
  {
    src: '/media/music/orchestra.png',
    alt: 'Alan Shen playing in an orchestra violin section',
    caption: 'Orchestra',
  },
  {
    src: '/media/music/violin-group.png',
    alt: 'Violin section in performance',
    caption: 'Violin section',
  },
  {
    src: '/media/music/violin-stage.png',
    alt: 'Alan Shen performing violin in a dark hall',
    caption: 'Recital',
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
    link: 'https://www.studious.sh',
  },
  {
    label: 'Scribe',
    link: 'https://scribe.study',
  },
  {
    label: 'Music',
    link: 'https://distrokid.com/hyperfollow/alanshen/id-stay',
  },
  {
    label: 'Email',
    link: 'mailto:alan.shen27@gmail.com',
  },
]

export const SITE_NAV = [
  { label: 'Builds', href: '/#builds' },
  { label: 'Honors', href: '/#honors' },
  { label: 'Research', href: '/#research' },
  { label: 'Work', href: '/work' },
  { label: 'Path', href: '/path' },
  { label: 'Music', href: '/music' },
] as const

export const EMAIL = 'alan.shen27@gmail.com'

export const HEADLINE =
  'USACO Gold ’26 | VEX Excellence Award, Worlds Qualifier ’26 | Forthcoming Cambridge University Press ’26 | Aspiring National Second Class Athlete | 3x Hackathon Podium | 2x Founder'

export const TAGLINE =
  'Building education systems at the intersection of AI, product, and competition.'

export const SUMMARY =
  'High school student at Institut Le Rosey building at the intersection of computer science, education, and AI. 2× founder of Studious (a modern LMS built on Next.js / tRPC / Supabase) and Scribe (AI study assistant — 1st Place Overall at HackHarvard China 2025, 3rd Place at HackMIT China 2026). Competing in USACO Gold ’26 and VEX Robotics (Excellence Award, Worlds Qualifier ’26), with forthcoming research on AI-based pragmatics assessment (Cambridge University Press, 2026). Outside tech: competitive swimmer and ABRSM Grade 8 Piano & Violin.'

/** One-sentence positioning — the first thing a reader should absorb. */
export const HOME_INTRO =
  'I build education software that students actually use. Also: USACO Gold, VEX Worlds qualifier, forthcoming Cambridge University Press research, and ABRSM Grade 8 on violin and piano.'

/** Slightly longer bio for the About block. */
export const HOME_BIO =
  'Founder of Studious (a modern LMS, live since 2023) and co-founder of Scribe (AI study assistant, 1st Place Overall at HackHarvard China 2025). Lately: a Transformer music co-writer, an AI hardware-product workspace built at Penn ESAP, and a VEX robot that qualified for Worlds. Research contributor on AI-based pragmatics assessment. Also a competitive swimmer and violinist.'

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
    detail: 'Perfect Silver → promoted to Gold, Feb 2026',
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

/** Dossier facts — the ID-card column in the hero. */
export const FACTS: { label: string; value: string; href?: string }[] = [
  { label: 'School', value: 'Institut Le Rosey, Rolle CH' },
  { label: 'Programme', value: 'IB Diploma · Class of 2027' },
  { label: 'Roles', value: 'Founder · Engineer · Violinist' },
  { label: 'Focus', value: 'EdTech · AI/ML systems · CP' },
  { label: 'Summer ’26', value: 'Penn ESAP — AI & mathematics' },
  { label: 'Languages', value: 'TypeScript · C++ · Python' },
]

export const NAME = 'Alan Shen'

export const LOCATION = 'Geneva Metropolitan Area'

export const ROLE = 'Founder · Developer · Violinist'
