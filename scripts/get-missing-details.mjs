#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function main() {
  const fileArg = process.argv[2]
  if (!fileArg) {
    console.error('Usage: node scripts/get-missing-details.mjs <exam-file.js>')
    process.exit(1)
  }

  const dir = path.join(ROOT, 'mobile/src/content/regents-exams/global-history')
  const filepath = path.join(dir, fileArg)
  if (!fs.existsSync(filepath)) {
    console.error(`File not found: ${filepath}`)
    process.exit(1)
  }

  const mod = (await import('file://' + filepath)).default
  const missing = []

  for (const q of mod.questions) {
    if (q.choices && typeof q.correct === 'number' && (!q.explanation || !q.diveDeep)) {
      missing.push({
        number: q.number,
        part: q.part,
        topic: q.topic,
        context: q.context,
        text: q.text,
        choices: q.choices,
        correct: q.correct
      })
    }
  }

  const outDir = path.join(ROOT, 'scratch')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const outFile = path.join(outDir, 'questions_to_enrich.json')
  fs.writeFileSync(outFile, JSON.stringify({
    subject: 'global-history',
    file: fileArg,
    questions: missing
  }, null, 2))

  console.log(`Success! Saved ${missing.length} questions to ${outFile}`)
}

main().catch(console.error)
