#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const subjects = ['english', 'global-history', 'us-history']

async function listMissing() {
  const missingExams = []

  for (const subject of subjects) {
    const dir = path.join(ROOT, 'mobile/src/content/regents-exams', subject)
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'))

    for (const file of files) {
      const filepath = path.join(dir, file)
      const mod = (await import('file://' + filepath)).default
      if (!mod || !mod.questions) continue

      let missingCount = 0
      let totalCount = 0
      for (const q of mod.questions) {
        if (q.choices && typeof q.correct === 'number') {
          totalCount++
          if (!q.explanation || !q.diveDeep) {
            missingCount++
          }
        }
      }

      if (missingCount > 0) {
        missingExams.push({
          subject,
          file,
          total: totalCount,
          missing: missingCount
        })
      }
    }
  }

  // Sort by subject, then by filename
  missingExams.sort((a, b) => {
    if (a.subject !== b.subject) return a.subject.localeCompare(b.subject)
    return a.file.localeCompare(b.file)
  })

  console.log(JSON.stringify(missingExams, null, 2))
}

listMissing().catch(console.error)
