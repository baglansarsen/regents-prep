#!/usr/bin/env node
// Agent that generates Algebra I, Algebra II, and Geometry subject data files
// using the Claude API, then patches subjects.js and HomeScreen.jsx.
//
// Usage: ANTHROPIC_API_KEY=sk-... node scripts/generate-subjects.js

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const client = new Anthropic()

// ── Subject definitions ───────────────────────────────────────────────────────

const SUBJECTS = [
  {
    id: 'algebra-1',
    name: 'Algebra I',
    shortName: 'A1',
    color: '#7c3aed',
    darkColor: '#5b21b6',
    baseIdStart: 701,
    examIdPrefix: 'alg1',
    topics: {
      LINEAR_EQUATIONS:    'Linear Equations & Inequalities',
      FUNCTIONS:           'Functions & Relations',
      SYSTEMS:             'Systems of Equations',
      POLYNOMIALS:         'Polynomials & Factoring',
      STATISTICS:          'Statistics & Data Analysis',
    },
    topicIcons: {
      'Linear Equations & Inequalities': '📐',
      'Functions & Relations':           '📈',
      'Systems of Equations':            '⚖️',
      'Polynomials & Factoring':         '🔢',
      'Statistics & Data Analysis':      '📊',
    },
    unitColors: [
      { color: '#7c3aed', darkColor: '#5b21b6' },
      { color: '#8b5cf6', darkColor: '#6d28d9' },
      { color: '#a78bfa', darkColor: '#7c3aed' },
      { color: '#6d28d9', darkColor: '#4c1d95' },
      { color: '#9333ea', darkColor: '#7e22ce' },
    ],
  },
  {
    id: 'algebra-2',
    name: 'Algebra II',
    shortName: 'A2',
    color: '#0891b2',
    darkColor: '#0e7490',
    baseIdStart: 726,
    examIdPrefix: 'alg2',
    topics: {
      POLYNOMIAL_FUNCTIONS:  'Polynomial Functions',
      EXPONENTIAL_LOG:       'Exponential & Logarithmic Functions',
      TRIGONOMETRY:          'Trigonometric Functions',
      STATISTICS_PROB:       'Statistics & Probability',
      COMPLEX_SEQUENCES:     'Complex Numbers & Sequences',
    },
    topicIcons: {
      'Polynomial Functions':              '🔢',
      'Exponential & Logarithmic Functions':'📈',
      'Trigonometric Functions':            '🌊',
      'Statistics & Probability':           '📊',
      'Complex Numbers & Sequences':        '🔄',
    },
    unitColors: [
      { color: '#0891b2', darkColor: '#0e7490' },
      { color: '#06b6d4', darkColor: '#0891b2' },
      { color: '#22d3ee', darkColor: '#06b6d4' },
      { color: '#0284c7', darkColor: '#0369a1' },
      { color: '#0ea5e9', darkColor: '#0284c7' },
    ],
  },
  {
    id: 'geometry',
    name: 'Geometry',
    shortName: 'GE',
    color: '#b45309',
    darkColor: '#92400e',
    baseIdStart: 751,
    examIdPrefix: 'geo',
    topics: {
      TRANSFORMATIONS:   'Transformations & Congruence',
      TRIANGLE_PROOFS:   'Triangle Proofs & Properties',
      SIMILARITY_TRIG:   'Similarity & Trigonometry',
      CIRCLES:           'Circles',
      SOLID_GEOMETRY:    '3D Geometry & Volume',
    },
    topicIcons: {
      'Transformations & Congruence': '🔄',
      'Triangle Proofs & Properties': '📐',
      'Similarity & Trigonometry':    '📏',
      'Circles':                      '⭕',
      '3D Geometry & Volume':         '🧊',
    },
    unitColors: [
      { color: '#b45309', darkColor: '#92400e' },
      { color: '#d97706', darkColor: '#b45309' },
      { color: '#f59e0b', darkColor: '#d97706' },
      { color: '#92400e', darkColor: '#78350f' },
      { color: '#c2410c', darkColor: '#9a3412' },
    ],
  },
]

// ── System prompt (schema reference) ─────────────────────────────────────────

const SYSTEM_PROMPT = `You are a New York State Regents exam content expert and JavaScript developer.
You generate valid JavaScript ES module files for a React Native study app.

STRICT RULES:
- Return ONLY a JavaScript code block — no explanations, no markdown prose outside the code block.
- The code block must start with \`\`\`js and end with \`\`\`.
- All questions must be accurate NY Regents content.
- Every question must have exactly 4 choices (array of 4 strings).
- correct is a 0-based index (0, 1, 2, or 3).
- Questions must be multiple-choice appropriate for the NY Regents exam.
- Vary difficulty: ~30% easy, ~50% medium, ~20% hard.
- No duplicate questions.

SCHEMA EXAMPLES (follow these exactly):

=== questions.js ===
import { TOPICS } from './questions'  // for files that import it
// Full file example:
export const TOPICS = {
  ATOMIC_STRUCTURE: 'Atomic Structure',
  PERIODIC_TABLE: 'Periodic Table',
}
export const TOPIC_ICONS = {
  [TOPICS.ATOMIC_STRUCTURE]: '⚛️',
  [TOPICS.PERIODIC_TABLE]: '📊',
}
export const questions = [
  {
    id: 101,
    topic: TOPICS.ATOMIC_STRUCTURE,
    text: 'Which subatomic particle has a negative charge?',
    choices: ['Proton', 'Neutron', 'Electron', 'Positron'],
    correct: 2,
    explanation: 'Electrons carry a charge of -1.',
  },
]
export function getByTopic(topic) { return questions.filter(q => q.topic === topic) }
export function getContextual() { return questions.filter(q => q.context) }
export function shuffled(arr) { return [...arr].sort(() => Math.random() - 0.5) }
export function buildDiagnosticSet() {
  return Object.values(TOPICS).flatMap(topic => {
    const pool = getByTopic(topic)
    return pool.sort(() => Math.random() - 0.5).slice(0, 3)
  })
}

=== units.js ===
import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'
export const UNITS = [
  { id: 'chemistry-u1', title: 'Atomic Structure', icon: TOPIC_ICONS[TOPICS.ATOMIC_STRUCTURE], color: '#ec4899', darkColor: '#be185d', topic: TOPICS.ATOMIC_STRUCTURE, lessonCount: 3 },
]
const LESSON_SIZE = 10
export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  const pool = getByTopic(topic)
  const sorted = [...pool].sort((a, b) => a.id - b.id)
  if (lessonIndex >= lessonCount) return [...pool].sort(() => Math.random() - 0.5)
  const chunkSize = Math.ceil(sorted.length / lessonCount)
  const start = lessonIndex * chunkSize
  return sorted.slice(start, start + chunkSize).slice(0, LESSON_SIZE)
}

=== flashcards.js ===
import { TOPICS } from './questions'
export const flashcards = [
  { topic: TOPICS.ATOMIC_STRUCTURE, term: 'Proton', definition: 'A subatomic particle in the nucleus with charge +1.' },
]
export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS) // wait — actually list the string values directly

Wait, correct pattern:
import { TOPICS } from './questions'
export const flashcards = [ ... ]
export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)  // This works since TOPICS imported

=== achievements.js ===
import { TOPICS } from './questions'
export const ACHIEVEMENTS = [
  { id: 'chem_atomic_master', title: 'Subatomic Pioneer', description: 'Pass Atomic Structure with 80%+', icon: '⚛️', condition: s => s.topicsPassed?.has(TOPICS.ATOMIC_STRUCTURE) },
]

=== strategies.js ===
export const STRATEGIES = {
  'chemistry-u1': {
    mentalPrep: ['tip 1', 'tip 2'],
    answeringTechniques: ['technique 1'],
    guessingStrategy: ['guess tip 1'],
    processOfElimination: ['elimination tip 1'],
    timeManagement: ['time tip 1'],
  },
}

=== index.js ===
export { questions, TOPICS, TOPIC_ICONS, getByTopic, getContextual, buildDiagnosticSet, shuffled } from './questions'
export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions } from './units'
export { STRATEGIES as strategies } from './strategies'
import { TOPICS, questions } from './questions'
export const TOPIC_ORDER = [ TOPICS.ATOMIC_STRUCTURE, TOPICS.PERIODIC_TABLE ]
export function getExamContextQuestions(topic) {
  return questions.filter((q) => q.context && q.topic === topic).sort(() => Math.random() - 0.5)
}

=== regents-exam file ===
export default {
  id: 'chem-june-2023',
  subject: 'chemistry',
  year: 2023,
  session: 'June',
  totalMinutes: 180,
  questions: [
    { number: 1, part: 'A', text: 'Question?', choices: ['a','b','c','d'], topic: 'Atomic Structure', correct: 0 },
  ],
}`

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractCode(text) {
  const match = text.match(/```(?:js|javascript)?\n([\s\S]*?)```/)
  if (!match) throw new Error(`No code block found in response:\n${text.slice(0, 300)}`)
  return match[1].trim()
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content + '\n')
  console.log(`  ✓ ${path.relative(ROOT, filePath)}`)
}

async function generate(prompt) {
  const msg = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })
  return extractCode(msg.content[0].text)
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ── File generators ───────────────────────────────────────────────────────────

async function generateQuestions(sub) {
  const topicList = Object.values(sub.topics).map((t, i) => `${i + 1}. ${t}`).join('\n')
  const idRange = `${sub.baseIdStart}–${sub.baseIdStart + 24}`

  const prompt = `Generate the questions.js file for the NY Regents "${sub.name}" subject.

Topics (exactly these 5, use them as TOPICS enum values):
${topicList}

Requirements:
- 5 questions per topic = 25 total questions
- Question IDs: ${idRange} (sequential, 5 per topic in order)
- Topic icons to use: ${JSON.stringify(sub.topicIcons)}
- All questions must reflect real NY Regents Algebra I/II/Geometry content
- Include clear explanations for every question
- Vary question style: computation, conceptual, graph-reading described in text, word problems

Export: TOPICS, TOPIC_ICONS, questions[], getByTopic(), getContextual(), shuffled(), buildDiagnosticSet()`

  return generate(prompt)
}

async function generateUnits(sub) {
  const topicEntries = Object.entries(sub.topics)
  const unitsInfo = topicEntries.map(([key, name], i) => {
    const c = sub.unitColors[i]
    return `{ id: '${sub.id}-u${i + 1}', title: '${name}', topic: TOPICS.${key}, color: '${c.color}', darkColor: '${c.darkColor}' }`
  }).join('\n')

  const prompt = `Generate the units.js file for the NY Regents "${sub.name}" subject.

Use exactly these units (fill in TOPIC_ICONS lookup from TOPICS):
${unitsInfo}

Each unit has lessonCount: 3.
Include getLessonQuestions(topic, lessonIndex, lessonCount) exactly as per the schema.
Import TOPICS, TOPIC_ICONS, getByTopic from './questions'.`

  return generate(prompt)
}

async function generateFlashcards(sub) {
  const topicList = Object.values(sub.topics).join(', ')
  const prompt = `Generate the flashcards.js file for the NY Regents "${sub.name}" subject.

Topics: ${topicList}

Requirements:
- 5 flashcards per topic = 25 total
- Each flashcard: { topic: TOPICS.TOPIC_KEY, term: '...', definition: '...' }
- Terms should be key vocabulary, formulas, or theorems tested on the NY Regents
- Definitions should be precise and concise (1-2 sentences)
- Export: flashcards[], FLASHCARD_TOPIC_LIST = Object.values(TOPICS)`

  return generate(prompt)
}

async function generateAchievements(sub) {
  const topicList = Object.entries(sub.topics).map(([k, v]) => `${k}: '${v}'`).join(', ')
  const prompt = `Generate the achievements.js file for the NY Regents "${sub.name}" subject.

Topics: { ${topicList} }

Requirements:
- One achievement per topic (5 total) for passing with 80%+
- One "perfect quiz" achievement
- One "all topics passed" achievement
- ID format: '${sub.id.replace('-', '_')}_descriptor' (use underscores, no hyphens in IDs)
- Each: { id, title, description, icon, condition: s => s.topicsPassed?.has(TOPICS.TOPIC_KEY) }
- For perfect quiz: condition: s => s.perfectQuiz
- For all topics: condition: s => Object.values(TOPICS).every(t => s.topicsPassed?.has(t))
- Use creative, subject-appropriate titles and relevant emoji icons`

  return generate(prompt)
}

async function generateStrategies(sub) {
  const units = Object.values(sub.topics).map((t, i) => `'${sub.id}-u${i + 1}' // ${t}`).join('\n')
  const prompt = `Generate the strategies.js file for the NY Regents "${sub.name}" subject.

Unit IDs and their topics:
${units}

For each unit, provide an object with exactly these 5 keys (all values are arrays of strings):
- mentalPrep: 3 tips for approaching this topic mentally / what reference info to locate
- answeringTechniques: 2-3 specific techniques for answering questions in this topic
- guessingStrategy: 2 intelligent guessing strategies specific to this topic
- processOfElimination: 2 elimination tips specific to this topic's question types
- timeManagement: 1-2 time management tips for this topic

All strategies must be specific to NY Regents ${sub.name} content — not generic.`

  return generate(prompt)
}

async function generateIndex(sub) {
  const topicOrder = Object.keys(sub.topics).map(k => `  TOPICS.${k}`).join(',\n')
  const prompt = `Generate the index.js file for the NY Regents "${sub.name}" subject (id: '${sub.id}').

It must:
1. Re-export everything from './questions', './flashcards', './achievements', './units', './strategies'
2. Import TOPICS and questions locally from './questions'
3. Export TOPIC_ORDER array: [\n${topicOrder}\n]
4. Export getExamContextQuestions(topic) function that filters questions by context field and topic

Follow the exact schema from the system prompt.`

  return generate(prompt)
}

async function generateExam(sub, session, year) {
  const topicList = Object.values(sub.topics).join(', ')
  const sessionStr = session === 'August' ? 'August' : 'June'
  const prompt = `Generate a realistic NY Regents ${sub.name} exam file for ${sessionStr} ${year}.

Subject ID: '${sub.id}'
Topics: ${topicList}

Requirements:
- 50 questions total (10 per topic, distributed across Part A and Part B)
- Parts: Questions 1-30 = Part 'A', 31-50 = Part 'B'
- Exam ID: '${sub.examIdPrefix}-${sessionStr.toLowerCase()}-${year}'
- totalMinutes: 180
- topic field uses the exact topic strings above (not TOPICS.KEY, just the string value)
- Each question: { number, part, text, choices: [4 strings], topic, correct }
- No explanation field needed for exam questions
- Questions should be distinct from each other and reflect real ${sub.name} Regents content
- Distribute questions evenly across all 5 topics`

  return generate(prompt)
}

// ── Patch existing files ──────────────────────────────────────────────────────

function patchSubjectsFile() {
  const filePath = path.join(ROOT, 'src/data/subjects.js')
  let content = fs.readFileSync(filePath, 'utf8')

  const newEnums = `  ALGEBRA_1: 'algebra-1',\n  ALGEBRA_2: 'algebra-2',\n  GEOMETRY:  'geometry',`
  const newMeta = `  'algebra-1': { id: 'algebra-1', name: 'Algebra I',  icon: '📐', color: '#7c3aed', shortName: 'A1' },
  'algebra-2': { id: 'algebra-2', name: 'Algebra II', icon: '📈', color: '#0891b2', shortName: 'A2' },
  'geometry':  { id: 'geometry',  name: 'Geometry',   icon: '⭕', color: '#b45309', shortName: 'GE' },`

  if (content.includes('ALGEBRA_1')) {
    console.log('  ⚠ subjects.js already patched, skipping')
    return
  }

  content = content.replace('  PHYSICS:', `${newEnums}\n  PHYSICS:`)
  content = content.replace("  'physics':", `${newMeta}\n  'physics':`)

  fs.writeFileSync(filePath, content)
  console.log('  ✓ src/data/subjects.js patched')
}

function patchHomeScreen() {
  const filePath = path.join(ROOT, 'mobile/src/screens/HomeScreen.jsx')
  let content = fs.readFileSync(filePath, 'utf8')

  if (content.includes('algebra-1')) {
    console.log('  ⚠ HomeScreen.jsx already patched, skipping')
    return
  }

  // Add imports after physicsData import
  content = content.replace(
    "import * as physicsData from '../../../src/data/physics/index'",
    `import * as physicsData  from '../../../src/data/physics/index'\nimport * as algebra1Data from '../../../src/data/algebra-1/index'\nimport * as algebra2Data from '../../../src/data/algebra-2/index'\nimport * as geometryData from '../../../src/data/geometry/index'`,
  )

  // Extend subject routing chain
  content = content.replace(
    ': (subject === SUBJECTS.PHYSICS ? physicsData : leData))',
    ': (subject === SUBJECTS.PHYSICS ? physicsData\n    : (subject === SUBJECTS.ALGEBRA_1 ? algebra1Data\n    : (subject === SUBJECTS.ALGEBRA_2 ? algebra2Data\n    : (subject === SUBJECTS.GEOMETRY  ? geometryData : leData)))))',
  )

  fs.writeFileSync(filePath, content)
  console.log('  ✓ mobile/src/screens/HomeScreen.jsx patched')
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function generateSubject(sub) {
  console.log(`\n📚 Generating ${sub.name} (${sub.id})...`)
  const dataDir  = path.join(ROOT, 'src/data', sub.id)
  const examDir  = path.join(ROOT, 'src/data/regents-exams', sub.id)

  // 1. questions.js (all other files depend on it)
  console.log('  → questions.js')
  writeFile(path.join(dataDir, 'questions.js'), await generateQuestions(sub))
  await sleep(1000)

  // 2. units.js
  console.log('  → units.js')
  writeFile(path.join(dataDir, 'units.js'), await generateUnits(sub))
  await sleep(1000)

  // 3. flashcards.js
  console.log('  → flashcards.js')
  writeFile(path.join(dataDir, 'flashcards.js'), await generateFlashcards(sub))
  await sleep(1000)

  // 4. achievements.js
  console.log('  → achievements.js')
  writeFile(path.join(dataDir, 'achievements.js'), await generateAchievements(sub))
  await sleep(1000)

  // 5. strategies.js
  console.log('  → strategies.js')
  writeFile(path.join(dataDir, 'strategies.js'), await generateStrategies(sub))
  await sleep(1000)

  // 6. index.js
  console.log('  → index.js')
  writeFile(path.join(dataDir, 'index.js'), await generateIndex(sub))
  await sleep(1000)

  // 7–10. Regents exam files
  const exams = [
    { session: 'June',   year: 2023 },
    { session: 'June',   year: 2024 },
    { session: 'August', year: 2024 },
    { session: 'June',   year: 2025 },
  ]
  for (const { session, year } of exams) {
    const filename = `${session.toLowerCase()}-${year}.js`
    console.log(`  → regents-exams/${filename}`)
    writeFile(path.join(examDir, filename), await generateExam(sub, session, year))
    await sleep(1500)
  }
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY environment variable not set')
    process.exit(1)
  }

  console.log('🚀 Starting subject generation agent...')
  console.log(`   Generating: ${SUBJECTS.map(s => s.name).join(', ')}`)
  console.log(`   Model: claude-opus-4-8\n`)

  for (const sub of SUBJECTS) {
    await generateSubject(sub)
  }

  console.log('\n📝 Patching existing files...')
  patchSubjectsFile()
  patchHomeScreen()

  console.log('\n✅ Done! All files generated.')
  console.log('\nNext steps:')
  console.log('  1. Review generated files for accuracy')
  console.log('  2. Run Metro: cd mobile && npx expo start')
  console.log('  3. Select A1, A2, or GE in the subject dropdown')
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message)
  process.exit(1)
})
