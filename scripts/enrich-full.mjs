#!/usr/bin/env node
// Complete humanities enrichment: questions + flashcards. Requires ANTHROPIC_API_KEY.
// Usage: ANTHROPIC_API_KEY=sk-... node scripts/enrich-full.mjs [--questions-only] [--flashcards-only]

import Anthropic from '@anthropic-ai/sdk'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const args = process.argv.slice(2)
const QUESTIONS_ONLY = args.includes('--questions-only')
const FLASHCARDS_ONLY = args.includes('--flashcards-only')
const BOTH = !QUESTIONS_ONLY && !FLASHCARDS_ONLY

const SUBJECT_PROMPTS = {
  english: `You are a Regents English (ELA) exam tutor. For each reading comprehension question:
1. "explanation": 1-2 sentences directly answering and explaining why the correct choice is right.
2. "diveDeep": 4-5 sentences: (a) the Regents reading skill tested; (b) why each wrong choice fails (reference by letter); (c) common student mistakes; (d) test-taking strategy.`,
  'global-history': `You are a Regents Global History tutor. For each question on history, geography, or cultural systems:
1. "explanation": 1-2 sentences stating the correct historical context and why this choice fits.
2. "diveDeep": 4-5 sentences: (a) broader period/principle with movements/empires/concepts; (b) why each wrong choice is historically wrong; (c) patterns for similar Regents questions; (d) key takeaway.`,
  'us-history': `You are a Regents US History tutor. For each question on American history, institutions, or concepts:
1. "explanation": 1-2 sentences explaining the historical/constitutional principle and why the correct answer fits.
2. "diveDeep": 4-5 sentences: (a) historical period, key actors/movements with dates; (b) why each wrong choice is historically wrong (cite date clashes); (c) how to distinguish similar events; (d) test-taking hint for date-based traps.`,
}

const FLASHCARD_PROMPTS = {
  english: `Generate 40 English (ELA) flashcard terms for a Regents exam deck. Include:
- Literary devices (metaphor, simile, irony, tone, mood, theme, symbolism, etc.) — 12 cards
- Grammar/mechanics (subject-verb agreement, pronoun reference, parallel structure, etc.) — 12 cards
- Reading comprehension (inference, main idea, author's purpose, bias, etc.) — 8 cards
- Rhetoric (ethos, pathos, logos, diction, syntax, register, etc.) — 8 cards
Format: JSON array of { term, definition, topic } objects. Keep definitions concise (1 sentence, ~20 words). Include context when relevant. Topic should be 'english', 'english-literature', or 'english-rhetoric'.`,
  'global-history': `Generate 50 Global History & Geography flashcard terms for Regents. Include:
- Empires/civilizations (Byzantine, Islamic Caliphate, Renaissance, Enlightenment, Imperialism, etc.) — 15 cards
- Geographic concepts (peninsula, monsoon, trade route, cultural diffusion, etc.) — 10 cards
- Political systems (monarchy, democracy, theocracy, oligarchy, communism, etc.) — 10 cards
- Key historical periods and events (Crusades, Black Death, Industrial Revolution, etc.) — 15 cards
Format: JSON array of { term, definition, topic }. Definitions: 1 sentence, ~20 words, include time period if relevant. Topic: 'global-history', 'world-cultures', or 'geography'.`,
  'us-history': `Generate 45 US History flashcard terms for Regents. Include:
- Constitutional concepts (separation of powers, federalism, due process, amendment, etc.) — 12 cards
- Historical periods (Colonial, Revolutionary, Antebellum, Civil War, Reconstruction, etc.) — 12 cards
- Movements and eras (abolitionism, women's suffrage, labor movement, civil rights, etc.) — 12 cards
- Key documents and concepts (Declaration, Constitution, Bill of Rights, etc.) — 9 cards
Format: JSON array of { term, definition, topic }. Definitions: 1 sentence, ~20 words, cite dates if relevant. Topic: 'us-history', 'us-government', or 'us-civics'.`,
}

async function enrichQuestion(q, subject) {
  if (!q.choices || typeof q.correct !== 'number') return null
  if (q.explanation && q.diveDeep) return null

  const prompt = `${SUBJECT_PROMPTS[subject]}

Question ${q.number} (Part ${q.part}), Topic: ${q.topic || '(none)'}
${q.context ? `Context: ${q.context}\n` : ''}Text: ${q.text}
Choices: ${q.choices.map((c, i) => `${String.fromCharCode(65 + i)}) ${c}`).join(' | ')}
Correct: ${String.fromCharCode(65 + q.correct)}

Return ONLY a JSON object: { "explanation": "...", "diveDeep": "..." }`

  try {
    const msg = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
    const match = text.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : null
  } catch (e) {
    console.error(`  Q${q.number}: ${e.message}`)
    return null
  }
}

async function generateFlashcards(subject) {
  const prompt = FLASHCARD_PROMPTS[subject]
  try {
    const msg = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
    const match = text.match(/\[[\s\S]*\]/)
    const cards = match ? JSON.parse(match[0]) : []
    // Assign unique IDs
    const idPrefix = { english: 'en', 'global-history': 'gh', 'us-history': 'us' }[subject]
    return cards.map((c, i) => ({ ...c, id: `${idPrefix}${i + 1}` }))
  } catch (e) {
    console.error(`Flashcard generation failed for ${subject}: ${e.message}`)
    return []
  }
}

async function enrichExamFiles(subject) {
  let enriched = 0
  const platforms = [
    path.join(ROOT, 'mobile/src/content/regents-exams', subject),
    path.join(ROOT, 'shared/content/regents-exams', subject),
    path.join(ROOT, 'src/data/regents-exams', subject),
  ]

  for (const platform of platforms) {
    if (!fs.existsSync(platform)) continue
    for (const file of fs.readdirSync(platform).filter((f) => f.endsWith('.js'))) {
      const examPath = path.join(platform, file)
      const mod = (await import('file://' + examPath)).default
      let count = 0

      for (const q of mod.questions) {
        if (q.choices && !q.explanation) {
          const result = await enrichQuestion(q, subject)
          if (result) {
            q.explanation = result.explanation
            q.diveDeep = result.diveDeep
            count++
          }
        }
      }

      if (count > 0) {
        const banner = `// Enriched: ${count} questions with explanation/diveDeep\n`
        fs.writeFileSync(examPath, banner + 'export default ' + JSON.stringify(mod, null, 2) + '\n')
        enriched += count
      }
    }
  }
  return enriched
}

function mergeFlashcards(subject, newCards) {
  const platforms = [
    path.join(ROOT, 'mobile/src/content/flashcards.js'),
    path.join(ROOT, 'shared/content/flashcards.js'),
    path.join(ROOT, 'src/data/flashcards.js'),
  ]

  for (const fPath of platforms) {
    if (!fs.existsSync(fPath)) continue
    const content = fs.readFileSync(fPath, 'utf8')
    // Simple merge: find the closing bracket and insert before it
    const newContent = content.replace(/\]\s*$/, `,\n\n  // ─ ${subject.toUpperCase()} ─\n${newCards.map((c) => `  { id: '${c.id}', term: '${c.term.replace(/'/g, "\\'")}', definition: '${c.definition.replace(/'/g, "\\'")}', topic: '${c.topic}' }`).join(',\n')},\n]`)
    fs.writeFileSync(fPath, newContent)
  }
}

async function run() {
  console.log('🚀 Humanities Enrichment Started\n')

  const subjects = ['english', 'global-history', 'us-history']
  const report = {}

  if (BOTH || QUESTIONS_ONLY) {
    console.log('📝 Enriching Questions...\n')
    for (const subject of subjects) {
      const count = await enrichExamFiles(subject)
      report[subject] = { questions: count }
      console.log(`  ${subject}: +${count} questions enriched`)
    }
  }

  if (BOTH || FLASHCARDS_ONLY) {
    console.log('\n📚 Generating Flashcards...\n')
    for (const subject of subjects) {
      const cards = await generateFlashcards(subject)
      if (cards.length > 0) {
        mergeFlashcards(subject, cards)
        if (!report[subject]) report[subject] = {}
        report[subject].flashcards = cards.length
        console.log(`  ${subject}: +${cards.length} flashcards added`)
      }
    }
  }

  console.log('\n✅ Complete!')
  console.log(JSON.stringify(report, null, 2))
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY not set')
  process.exit(1)
}

run().catch(console.error)
