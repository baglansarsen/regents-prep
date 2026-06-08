#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function getNext() {
  const fileArg = process.argv[2]
  const dir = path.join(ROOT, 'mobile/src/content/regents-exams/global-history')
  if (!fs.existsSync(dir)) {
    console.error('Global history directory not found')
    process.exit(1)
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'))
  let targetFile = fileArg
  if (!targetFile) {
    // Find the first file that has missing questions
    for (const file of files) {
      const filepath = path.join(dir, file)
      const mod = (await import('file://' + filepath)).default
      if (!mod || !mod.questions) continue

      const hasMissing = mod.questions.some(q => q.choices && typeof q.correct === 'number' && (!q.explanation || !q.diveDeep))
      if (hasMissing) {
        targetFile = file
        break
      }
    }
  }

  if (!targetFile) {
    console.log(JSON.stringify({ complete: true }))
    return
  }

  const filepath = path.join(dir, targetFile)
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

  console.log(JSON.stringify({
    subject: 'global-history',
    file: targetFile,
    path: filepath,
    questionsCount: missing.length,
    questions: missing
  }, null, 2))
}

getNext().catch(console.error)
