export type Project = {
  name: string
  description: string
  link: string
  video?: string
  image?: string
  id: string
}

export type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link?: string
  image?: string
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
  id: string
}

export type Publication = {
  title: string
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
      'A next-generation LMS integrating AI and LLMs into everyday learning — full-featured, fast, and built for a new generation of education. Sep 2023 – Present.',
    link: 'https://www.studious.sh',
    image: '/studious.png',
    id: 'project1',
  },
  {
    name: 'Nomad',
    description:
      'Campus-focused platform combining an interactive course planner (prerequisite graph, dependency-aware academic plans) with a student social network for discovering classmates, communities, and relevant peers. Built in 36 hours at HackMIT China 2026 — 3rd Place Education Track & Outstanding Impact Award.',
    link: 'https://www.linkedin.com/in/alanshen27/',
    image: '/nomad.png',
    id: 'project-nomad',
  },
  {
    name: 'Scribe',
    description:
      'AI study assistant that teaches students how to learn properly using structured methods. 1st Place Overall at HackHarvard China 2025. Aug 2025 – Jan 2026.',
    link: 'https://www.scribe.study',
    image: '/scribe.png',
    id: 'project2',
  },
  {
    name: 'Synapse',
    description: 'Neural network visualization and analysis platform.',
    link: 'https://youtu.be/nuEoH_5YOi4',
    image: '/synapsehackharvard2025.png',
    id: 'project3',
  },
  {
    name: 'Hive',
    description: 'Collaborative project management system.',
    link: 'https://www.youtube.com/watch?v=HJVGiYUyQoI',
    image: '/hiveempower3.0.png',
    id: 'project4',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Studious',
    title: 'Founder',
    start: 'September 2023',
    end: 'Present',
    link: 'https://www.studious.sh',
    image: 'https://www.studious.sh/logo.png',
    bullets: [
      'Led frontend development with Next.js.',
      'Led backend development with tRPC and React.',
      'Designed scalable infrastructure with sockets (Pusher.js), Supabase read replication, Render with load balancer, and Vercel for minimized geographical latency.',
      'Created the Studious School Development Program, intended to bring modern learning to underprivileged communities.',
    ],
    id: 'work1',
  },
  {
    company: 'Scribe',
    title: 'SWE and Co-Founder',
    start: 'August 2025',
    end: 'Present',
    link: 'https://www.scribe.study',
    image: '/logos/scribe.png',
    bullets: [
      'Worked as frontend and backend developer with AI-driven workflows to secure a 1st Place Best Overall Hack at HackHarvard China 2025.',
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
    image: '/logos/luduan.png',
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
    image: '/logos/vex.jpg',
    bullets: [
      'WORLDS QUALIFIER through Excellence Award at Alpine Robo Games 2026 — 3rd place skills, 3rd place qualifiers.',
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
    image: '/logos/lerosey.png',
    location: 'Switzerland',
    bullets: [
      '2-year Swimming MVP at Le Rosey.',
      'Total medals: 14 (8 Gold | 4 Silver | 2 Bronze).',
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
    image: '/logos/lerosey.png',
    id: 'edu1',
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
    image: '/logos/hackharvard.svg',
    id: 'award1',
  },
  {
    title: 'HackMIT China 2026 — 3rd Place (Education Track) & Outstanding Impact Award',
    description:
      'Podium finish out of 300+ participants during the 2026 HackMIT China Challenge. Built Nomad in 36 hours.',
    date: 'Mar 2026',
    image: '/logos/hackmit.png',
    id: 'award-hackmit',
  },
  {
    title: 'USACO Gold Division',
    description:
      'Achieved 1000 / 1000 in the USACO Silver contest to be directly promoted to USACO Gold.',
    date: 'Feb 2026',
    image: '/usaco.png',
    id: 'award4',
  },
  {
    title: 'Excellence Award | Alpine Robo Games 2026',
    description:
      'Won Excellence Award for VEX Robotics Swiss qualifications and qualified for VEX Worlds in Dallas, Texas. Issued by VEX Robotics.',
    date: 'Feb 2026',
    image: '/logos/vex.jpg',
    id: 'award-vex',
  },
  {
    title: 'HackHarvard 2025 — Compile the Decade (Invitational)',
    description:
      'Invited as one of only two high school teams to attend HackHarvard 2025.',
    date: 'Oct 2025',
    image: '/logos/hackharvard.svg',
    id: 'award2',
  },
  {
    title: 'Empower 3.0 Hacks — 3rd Place',
    description: '3rd Place, "Coding" track; 450+ participants in total.',
    image: '/empower3.0.png',
    id: 'award3',
  },
  {
    title: 'Swiss Group of International Schools Math Competition 2025 — 2nd Place',
    date: '2025',
    image: '/logos/sgis.png',
    id: 'award5',
  },
]

export const PUBLICATIONS: Publication[] = [
  {
    title: 'API endpoint and its value in Chinese international education',
    description: 'Feng Xiao, Xuren Shen (2026). Forthcoming.',
    date: '2026',
    id: 'pub1',
  },
  {
    title: 'Training AI for Pragmatics Assessment',
    description:
      'Xiao, F., Taguchi, N., Li, S. & Shen, A. (May 2025). Computer Assisted Language Learning Consortium (CALICO): San Diego, CA. Forthcoming with Cambridge University Press, 2026.',
    date: 'May 2025',
    id: 'pub2',
  },
]

export const VOLUNTEERING: Volunteering[] = [
  {
    role: 'Educator and Developer',
    organization: 'The Lost Food Project',
    start: 'October 2025',
    end: 'May 2026',
    cause: 'Environment',
    description:
      'Lead a team of students to develop a web-based game for Earth Day, spreading awareness about food waste.',
    image: '/logos/lostfood.png',
    link: 'https://www.thelostfoodproject.org',
    id: 'vol1',
  },
]

export const BLOG_POSTS: BlogPost[] = []

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
    label: 'Email',
    link: 'mailto:alan.shen27@gmail.com',
  },
]

export const EMAIL = 'alan.shen27@gmail.com'

export const HEADLINE =
  "USACO Gold ’26 | VEX Excellence Award, Worlds Qualifier ’26 | Forthcoming Cambridge University Press '25 | Aspiring National Second Class Athlete | 3x Hackathon Podium | 2x Founder"

export const SUMMARY =
  "High school student at Institut Le Rosey building at the intersection of computer science, education, and AI. 2× founder of Studious (a modern LMS built on Next.js / tRPC / Supabase) and Scribe (AI study assistant — 1st Place Overall at HackHarvard China 2025, 3rd Place at HackMIT China 2026). Competing in USACO Gold ’26 and VEX Robotics (Excellence Award, Worlds Qualifier ’26), with forthcoming research on AI-based pragmatics assessment (Cambridge University Press, 2026). Outside tech: competitive swimmer and ABRSM Grade 8 Piano & Violin."

export const NAME = 'Alan Shen'

export const LOCATION = 'Geneva Metropolitan Area'
