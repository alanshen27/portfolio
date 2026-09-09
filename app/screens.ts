import type { Screen } from '@/components/app-plate'

/**
 * Product screens for the programme notes. Captured from the live apps in
 * September 2026 — Studious on a teacher demo account, Scribe on Alan's own
 * workspace with the account rail cropped away — and exported in greyscale
 * so they read as ink on paper.
 */

export const STUDIOUS_SCREENS: Screen[] = [
  {
    src: '/media/projects/studious/home.jpg',
    alt: 'Studious teacher home: grading counts, the week, up-next assignments, classes and messages',
    route: 'home',
    label: 'a teacher’s home, demo account',
    callouts: [
      {
        x: 24.9,
        y: 15.6,
        text: 'the term at a glance — 15 submissions to grade, 41 missing, across two classes',
      },
      {
        x: 72.8,
        y: 71.4,
        text: 'grading progress per assignment; one click into the submissions',
      },
      {
        x: 88.4,
        y: 87.5,
        text: 'student and faculty chat inside the same tool',
      },
    ],
  },
  {
    src: '/media/projects/studious/assignment.jpg',
    alt: 'A Studious assignment: instructions, AI-use level, and a submissions table with statuses and grades',
    route: 'assignment',
    label: 'an assignment’s submissions',
    callouts: [
      {
        x: 60.5,
        y: 31.7,
        text: 'an AI-use level set per assignment — this one is independent work, no AI',
      },
      {
        x: 57.3,
        y: 79.7,
        text: 'late, submitted, returned — each student’s state and grade in one table',
      },
      {
        x: 8.3,
        y: 46.1,
        text: 'a class rail: assignments, quizzes, modules, worksheets, grades, attendance, AI labs',
      },
    ],
  },
  {
    src: '/media/projects/studious/class.jpg',
    alt: 'A Studious class overview: a post composer and the class stream',
    route: 'class',
    label: 'a class stream',
    callouts: [
      {
        x: 51.8,
        y: 32.8,
        text: 'the class stream — posts with attachments, formatting and an equation button',
      },
      {
        x: 89,
        y: 23.4,
        text: 'up next: what’s due, and how many have handed it in',
      },
    ],
  },
]

export const SCRIBE_SCREENS: Screen[] = [
  {
    src: '/media/projects/scribe/chat.jpg',
    alt: 'A Scribe workspace chat: the assistant poses an integration-by-parts question and offers a study session',
    route: 'chat',
    label: 'a workspace conversation',
    callouts: [
      {
        x: 19.5,
        y: 47.1,
        text: 'a chat that teaches — one practice question at a time, in typeset maths',
      },
      {
        x: 36.6,
        y: 79.7,
        text: 'the same conversation assembles a 30-minute study session',
      },
      {
        x: 85.5,
        y: 24.4,
        text: 'the workspace’s materials and sessions, kept at the side',
      },
    ],
  },
  {
    src: '/media/projects/scribe/guide.jpg',
    alt: 'A Scribe study guide on integration by parts, with derived and boxed formulae',
    route: 'guide',
    label: 'a generated study guide',
    callouts: [
      {
        x: 34.8,
        y: 23.6,
        text: 'a study guide generated from the workspace, structured into sections',
      },
      {
        x: 49.7,
        y: 61.8,
        text: 'integration by parts derived from the product rule, then boxed — rendered maths',
      },
    ],
  },
  {
    src: '/media/projects/scribe/sessions.jpg',
    alt: 'Scribe study sessions: a continue card and planned sessions with activity tags',
    route: 'contents',
    label: 'planned study sessions',
    callouts: [
      {
        x: 11.6,
        y: 31.7,
        text: 'pick up where you left off — 17% through the reading',
      },
      {
        x: 23.8,
        y: 64.2,
        text: 'sessions planned as sequences: reading, questions, a worksheet, flashcards',
      },
    ],
  },
]
