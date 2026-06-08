#!/usr/bin/env node
// Enriches Life Science written (constructed-response) questions with explanation + diveDeep.
// Usage: ANTHROPIC_API_KEY=sk-ant-... node scripts/enrich-ls-written.mjs
// Resumes safely — skips questions already enriched.

import Anthropic from '@anthropic-ai/sdk'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT    = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client  = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const DELAY   = 800  // ms between API calls to avoid rate limits

const EXAM_FILES = [
  { file: 'june-2025.js',    id: 'ls-jun-2025',  session: 'June',    year: 2025 },
  { file: 'january-2026.js', id: 'ls-jan-2026',  session: 'January', year: 2026 },
  { file: 'august-2025.js',  id: 'ls-aug-2025',  session: 'August',  year: 2025 },
]

const SYSTEM_PROMPT = `You are an expert NY Regents Life Science (biology) tutor and exam coach.

For each written (constructed-response) question you receive, produce two fields:

1. "explanation" (2-3 sentences): What a complete, full-credit answer must include. Reference the model answer. Be specific about the biological concept and the key evidence or reasoning required.

2. "diveDeep" (4-5 sentences):
   (a) The core Life Science concept being tested (cell biology, genetics, evolution, ecology, or human body systems).
   (b) Common student mistakes or misconceptions for this type of question.
   (c) How to structure a strong constructed-response answer on the Regents (use specific vocabulary, cite the stimulus/data, make a claim and support it).
   (d) The key biological vocabulary or principles the grader expects to see.
   (e) A test-taking tip specific to this question type.

Respond ONLY with valid JSON: { "explanation": "...", "diveDeep": "..." }
No markdown, no code blocks, no extra text.`

async function enrichQuestion(q) {
  const prompt = `Life Science Regents — Written Question ${q.number} (Part ${q.part})
Topic: ${q.topic}
${q.context ? `Context: ${q.context}\n` : ''}Question: ${q.text}
Model Answer: ${q.modelAnswer}`

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = msg.content[0]?.text?.trim() ?? ''
  return JSON.parse(raw)
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function processFile({ file }) {
  const filePath = path.join(ROOT, 'mobile/src/content/regents-exams/life-science', file)
  const { default: exam } = await import('file://' + filePath)

  const toEnrich = exam.questions.filter(q => q.type === 'written' && (!q.explanation || !q.diveDeep))
  if (toEnrich.length === 0) { console.log(`✅ ${file}: already complete`); return }

  console.log(`\n📝 ${file}: enriching ${toEnrich.length} written questions...`)

  let done = 0
  for (const q of toEnrich) {
    try {
      const { explanation, diveDeep } = await enrichQuestion(q)
      q.explanation = explanation
      q.diveDeep    = diveDeep
      done++
      process.stdout.write(`  Q${q.number} ✓  (${done}/${toEnrich.length})\r`)
    } catch (err) {
      console.error(`\n  ❌ Q${q.number} failed: ${err.message}`)
    }
    await sleep(DELAY)
  }

  const enrichedCount = exam.questions.filter(q => q.explanation && q.diveDeep).length
  const banner = `// Enriched: ${enrichedCount} questions with explanation/diveDeep\n`
  fs.writeFileSync(filePath, banner + 'export default ' + JSON.stringify(exam, null, 2) + '\n')
  console.log(`\n  ✅ Saved ${file} (${enrichedCount}/${exam.questions.length} enriched)`)
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌  Set ANTHROPIC_API_KEY before running.')
    process.exit(1)
  }
  for (const entry of EXAM_FILES) {
    await processFile(entry)
  }
  console.log('\n🎉  All Life Science written questions enriched.')
}

main().catch(console.error)
