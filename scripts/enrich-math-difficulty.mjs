#!/usr/bin/env node
// Enriches math exam content (algebra-1, algebra-2, geometry) by generating
// difficulty (1-5) for each question. Non-destructive: only fills missing difficulty.
// Writes to all three platforms (mobile, shared, web Vite data) to keep them in sync.
// Requires ANTHROPIC_API_KEY in env.
//
// Usage: ANTHROPIC_API_KEY=sk-... node scripts/enrich-math-difficulty.mjs [--limit N]

import Anthropic from '@anthropic-ai/sdk'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const args = process.argv.slice(2)
const limitArgIdx = args.indexOf('--limit')
const limit = limitArgIdx !== -1 ? parseInt(args[limitArgIdx + 1], 10) : Infinity

const SYSTEM_PROMPT = `You are an expert New York State Regents Math tutor.
Evaluate the difficulty of NY Regents math questions (Algebra 1, Algebra 2, and Geometry) on a scale of 1 to 5:
1: Foundational / single-step arithmetic, basic substitution, or reading coordinates.
2: Basic algebra/geometry / simple two-step equations, simple formula application, or identifying key properties.
3: Standard Regents difficulty / multi-step equations, standard graphs, or standard geometric proofs/calculations.
4: Challenging / complex modeling, abstract reasoning, or multi-step coordinate proofs.
5: Highly abstract / constructed response Part IV questions, full abstract proofs, or complex multi-topic applications.

Your response must be a single JSON object containing only two keys:
- "difficulty": an integer between 1 and 5
- "rationale": a 1-2 sentence explanation of why the question falls into this difficulty tier.

Example response:
{
  "difficulty": 3,
  "rationale": "Requires solving a multi-step linear equation by distributing and combining like terms, which is standard Regents algebra."
}`

async function enrichQuestionDifficulty(q) {
  const prompt = `Question details:
Subject: Math
Number: ${q.number}, Part: ${q.part}, Topic: ${q.topic || '(no topic)'}
${q.context ? `Context/Passage: ${q.context}\n` : ''}Text: ${q.text}
${q.choices ? `Choices:\n${q.choices.map((c, i) => `${String.fromCharCode(65 + i)}) ${c}`).join('\n')}` : 'Type: Written / Constructed-Response'}

Evaluate the question and return the JSON object with "difficulty" and "rationale".`

  try {
    const msg = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      system: SYSTEM_PROMPT,
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

async function run() {
  const subjects = ['algebra-1', 'algebra-2', 'geometry']
  let totalEnriched = 0

  console.log('🚀 Math Difficulty Enrichment Started\n')
  if (limit !== Infinity) {
    console.log(`Using limit of ${limit} questions total.\n`)
  }

  for (const subject of subjects) {
    const mobileDir = path.join(ROOT, 'mobile/src/content/regents-exams', subject)
    if (!fs.existsSync(mobileDir)) continue

    const targetDirs = [
      path.join(ROOT, 'mobile/src/content/regents-exams', subject),
      path.join(ROOT, 'shared/content/regents-exams', subject),
      path.join(ROOT, 'src/data/regents-exams', subject),
    ]

    console.log(`Subject: ${subject}`)
    const files = fs.readdirSync(mobileDir).filter((f) => f.endsWith('.js'))

    for (const file of files) {
      if (totalEnriched >= limit) break

      const sourcePath = path.join(mobileDir, file)
      const mod = (await import('file://' + sourcePath)).default
      if (!mod || !mod.questions) continue

      let count = 0
      for (const q of mod.questions) {
        if (totalEnriched >= limit) break
        
        // Non-destructive: skip if already has difficulty
        if (typeof q.difficulty === 'number' && q.difficulty >= 1 && q.difficulty <= 5) {
          continue
        }

        console.log(`  Enriching ${file} Q${q.number}...`)
        const result = await enrichQuestionDifficulty(q)
        if (result && typeof result.difficulty === 'number') {
          q.difficulty = result.difficulty
          q.difficultyRationale = result.rationale
          count++
          totalEnriched++
          // Small delay to respect rate limits
          await new Promise((r) => setTimeout(r, 500))
        }
      }

      if (count > 0) {
        const totalWithDifficulty = mod.questions.filter((q) => typeof q.difficulty === 'number').length
        const banner = `// Enriched: ${totalWithDifficulty} questions with difficulty\n`
        const finalCode = banner + 'export default ' + JSON.stringify(mod, null, 2) + '\n'

        // Sync to all three target directories simultaneously
        for (const targetDir of targetDirs) {
          if (!fs.existsSync(targetDir)) continue
          const targetPath = path.join(targetDir, file)
          fs.writeFileSync(targetPath, finalCode)
        }
        console.log(`  [Saved] ${file} (+${count} questions difficulty enriched)`)
      }
    }
  }

  console.log(`\n✅ Complete! Total enriched: ${totalEnriched} questions`)
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY not set in environment.')
  process.exit(1)
}

run().catch(console.error)
