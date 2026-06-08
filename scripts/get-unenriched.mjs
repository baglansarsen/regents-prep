#!/usr/bin/env node
// Prints out details of the questions that need enrichment for the first exam file that is not fully enriched.
// Run: node scripts/get-unenriched.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const subjects = ['english', 'global-history', 'us-history']

async function getNext() {
  for (const subject of subjects) {
    const dir = path.join(ROOT, 'mobile/src/content/regents-exams', subject)
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'))

    for (const file of files) {
      const filepath = path.join(dir, file)
      const mod = (await import('file://' + filepath)).default
      if (!mod || !mod.questions) continue

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

      if (missing.length > 0) {
        console.log(JSON.stringify({
          subject,
          file,
          path: filepath,
          questionsCount: missing.length,
          questions: missing
        }, null, 2))
        return
      }
    }
  }
  console.log(JSON.stringify({ complete: true }))
}

getNext().catch(console.error)
