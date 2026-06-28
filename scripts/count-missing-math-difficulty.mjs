#!/usr/bin/env node
// Counts how many total questions exist in math subjects and how many are missing difficulty.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const subjects = ['algebra-1', 'algebra-2', 'geometry']

async function run() {
  let totalQuestions = 0
  let missingDifficulty = 0

  for (const subject of subjects) {
    const dir = path.join(ROOT, 'mobile/src/content/regents-exams', subject)
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'))
    let subjectTotal = 0
    let subjectMissing = 0

    for (const file of files) {
      const filepath = path.join(dir, file)
      const mod = (await import('file://' + filepath)).default
      if (!mod || !mod.questions) continue

      for (const q of mod.questions) {
        subjectTotal++
        totalQuestions++
        if (typeof q.difficulty !== 'number') {
          subjectMissing++
          missingDifficulty++
        }
      }
    }
    console.log(`${subject}: ${subjectTotal} questions total, ${subjectMissing} missing difficulty`)
  }

  console.log(`\nGrand Total: ${totalQuestions} questions, ${missingDifficulty} missing difficulty`)
}

run().catch(console.error)
