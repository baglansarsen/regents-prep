#!/usr/bin/env node
// Enriches humanities exam content (english, global-history, us-history) by generating
// explanation + diveDeep for each MC question. Non-destructive: only fills missing fields.
// Requires ANTHROPIC_API_KEY in env.

import Anthropic from '@anthropic-ai/sdk'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SUBJECT_PROMPTS = {
  english: `You are a Regents English (ELA) exam tutor. For each multiple-choice reading comprehension question, write:
1. "explanation": 1-2 sentences that directly answer the question and explain why the correct choice is right.
2. "diveDeep": A deeper explanation (4-5 sentences) that covers:
   - Why this question type appears on the Regents (reading skill tested)
   - Why each incorrect choice is wrong (reference them by letter: "Choice A is wrong because...")
   - Common student misconceptions or test-taking strategy (e.g., "Students often confuse character motivation with plot events")
   - How to approach similar questions confidently

Use clear, student-friendly language. Avoid jargon unless you explain it.`,

  'global-history': `You are a Regents Global History & Geography exam tutor. For each multiple-choice question about historical events, documents, or geographic concepts, write:
1. "explanation": 1-2 sentences that directly answer the question and state why the correct choice best matches the historical context.
2. "diveDeep": A deeper explanation (4-5 sentences) covering:
   - The broader historical context or geographic principle (e.g., "Feudalism was based on mutual obligations between lords and vassals")
   - Why each incorrect choice fails (e.g., "Choice B is wrong because Ottoman expansion occurred centuries later")
   - How to recognize similar patterns on the Regents (e.g., "Document-based questions test your ability to infer historical cause-and-effect from primary sources")
   - A key takeaway (e.g., "The Regents often pairs historical events with their long-term consequences")

Use clear, historical language. Cite concepts, not just events.`,

  'us-history': `You are a Regents US History exam tutor. For each multiple-choice question about American history, institutions, or constitutional concepts, write:
1. "explanation": 1-2 sentences that directly answer the question and explain the historical or constitutional principle.
2. "diveDeep": A deeper explanation (4-5 sentences) covering:
   - The historical period and key actors/movements (e.g., "Jacksonian Democracy expanded voting rights to white men but excluded women and enslaved people")
   - Why each incorrect choice is historically inaccurate (e.g., "Choice C is wrong because the Missouri Compromise predated the Civil War by 40 years")
   - How to distinguish similar events (e.g., "Students often confuse the Reconstruction eras; Reconstruction (1865-1877) followed the Civil War, while the Progressive Era (1900-1920) was a separate reform movement")
   - Test-taking hint (e.g., "Watch for date-based distractors that reference earlier or later events")

Use precise historical language and mention dates/names to anchor concepts.`,
}

async function enrichQuestion(q, subject) {
  if (!q.choices || typeof q.correct !== 'number') return null // skip written/non-MC
  if (q.explanation && q.diveDeep) return null // already enriched

  const prompt = `${SUBJECT_PROMPTS[subject]}

Question:
Number: ${q.number}, Part: ${q.part}, Topic: ${q.topic || '(no topic)'}
${q.context ? `Context: ${q.context}\n` : ''}Text: ${q.text}
Choices:
${q.choices.map((c, i) => `${String.fromCharCode(65 + i)}) ${c}`).join('\n')}
Correct answer: ${String.fromCharCode(65 + q.correct)}

Provide a JSON object with "explanation" and "diveDeep" fields. Use \\n for multi-line text. Keep explanations concise but thorough.`

  try {
    const msg = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('no JSON in response')
    return JSON.parse(match[0])
  } catch (e) {
    console.error(`  Q${q.number}: ${e.message}`)
    return null
  }
}

async function enrichExam(examPath, subject) {
  const mod = (await import('file://' + examPath)).default
  let enriched = 0

  for (const q of mod.questions) {
    if (q.choices && typeof q.correct === 'number' && !q.explanation) {
      const result = await enrichQuestion(q, subject)
      if (result) {
        q.explanation = result.explanation
        q.diveDeep = result.diveDeep
        enriched++
      }
    }
  }

  if (enriched > 0) {
    const banner = `// Auto-enriched: ${enriched} questions. Real extracted text; explanation/diveDeep filled by Claude.\n`
    const code = banner + 'export default ' + JSON.stringify(mod, null, 2) + '\n'
    fs.writeFileSync(examPath, code)
  }
  return enriched
}

async function run() {
  const subjects = ['english', 'global-history', 'us-history']
  let totalEnriched = 0

  for (const subject of subjects) {
    const dir = path.join(ROOT, 'mobile/src/content/regents-exams', subject)
    if (!fs.existsSync(dir)) continue
    console.log(`\n${subject}:`)

    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js'))) {
      const filepath = path.join(dir, file)
      const n = await enrichExam(filepath, subject)
      if (n > 0) {
        console.log(`  ${file}: +${n}`)
        totalEnriched += n
      }
    }
  }

  console.log(`\n✓ Total enriched: ${totalEnriched} questions`)
}

run().catch(console.error)
