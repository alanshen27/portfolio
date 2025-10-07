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

export type SocialLink = {
  label: string
  link: string
  icon?: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Scribe',
    description: 'AI-powered note-taking and transcription tool. Winner of HackHarvard 2025 China.',
    link: '',
    image: 'https://media.licdn.com/dms/image/v2/D4E2DAQFtundNWVST4w/profile-treasury-image-shrink_800_800/B4EZkKIpHhHgAc-/0/1756811671926?e=1760450400&v=beta&t=pWaIc6FXh6D5llLNZ3t8k8P03wZm2Ji0rn7gxDeEJmU',
    id: 'project1',
  },
  {
    name: 'Synapse',
    description: 'Neural network visualization and analysis platform.',
    link: '',
    image: '/synapsehackharvard2025.png',
    id: 'project2',
  },
  {
    name: 'Hive',
    description: 'Collaborative project management system.',
    link: 'https://www.youtube.com/watch?v=HJVGiYUyQoI',
    image: '/hiveempower3.0.png',
    id: 'project3',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Studious',
    title: 'Founder – Studious LMS',
    start: 'September 2024',
    end: 'Present',
    link: 'https://www.studious.sh',
    image: 'https://www.studious.sh/logo.png',
    id: 'work1',
  },
]

export const EDUCATION: Education[] = [
  {
    institution: 'Institut Le Rosey',
    degree: 'High School Student',
    start: '2022',
    end: '2027',
    location: 'Rolle, Switzerland',
    image: 'https://www.rosey.ch/wp-content/uploads/blason-rvb-01-min.png',
    id: 'edu1',
  },
]

export const SKILLS: Skill[] = [
  {
    name: 'IT Infrastructure Management',
    id: 'skill1',
  },
  {
    name: 'Project Management',
    id: 'skill2',
  },
  {
    name: 'Next.js',
    id: 'skill3',
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
    name: 'TOEFL iBT',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNmS9EYfLaBhhQnpC3-ShH-eOu6PjkzPAyYQ&s',
    id: 'cert3',
  },
]

export const AWARDS: Award[] = [
  {
    title: 'HackHarvard 2025 China – 1st Place',
    description: '1rst place; "Best Overall Hack" Winner',
    image: '/hackharvardchina.JPG',
    id: 'award1',
  },
  {
    title: 'Empower 3.0 Hacks – 3rd place',
    description: '3rd place; "Coding" track; 450+ participants in total;',
    image: '/empower3.0.png',
    id: 'award2',
  },
  {
    title: 'USACO Silver',
    description: 'Ranked 603 / 1883 among all pre-college participants in this division',
    image: '/usaco.png',
    id: 'award3',
  },
  {
    title: 'HackHarvard 2025 – Compile the Decade Invitational',
    description: 'Invited as one of only 2 high school teams to participate.',
    image: '/hackharvard2025.JPG',
    id: 'award4',
  },
]

export const PUBLICATIONS: Publication[] = [
  {
    title: 'Training AI for Pragmatics Assessment',
    description: 'Xiao, F., Taguchi, N., Li, S. & Shen, A. (May 2025). Computer Assisted Language Learning Consortium (CALICO): San Diego, CA.',
    date: 'May 2025',
    id: 'pub1',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  // {
  //   title: 'Exploring the Intersection of Design, AI, and Design Engineering',
  //   description: 'How AI is changing the way we design',
  //   link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
  //   uid: 'blog-1',
  // },
  // {
  //   title: 'Why I left my job to start my own company',
  //   description:
  //     'A deep dive into my decision to leave my job and start my own company',
  //   link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
  //   uid: 'blog-2',
  // },
  // {
  //   title: 'What I learned from my first year of freelancing',
  //   description:
  //     'A look back at my first year of freelancing and what I learned',
  //   link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
  //   uid: 'blog-3',
  // },
  // {
  //   title: 'How to Export Metadata from MDX for Next.js SEO',
  //   description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
  //   link: '/blog/example-mdx-metadata',
  //   uid: 'blog-4',
  // },
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
    label: 'Email',
    link: 'mailto:alan.shen27@gmail.com',
  },
]

export const EMAIL = 'alan.shen27@gmail.com'

export const SUMMARY = 'High school student at Institut Le Rosey with achievements in competitive programming (USACO Silver, aiming Gold), hackathons (1st place HackHarvard 2025 China), and academic research (AI pragmatics assessment publication). Passionate about computer science, music, and swimming.'

export const NAME = 'Alan Shen'

export const LOCATION = 'Tartegnin, Vaud, Switzerland'
