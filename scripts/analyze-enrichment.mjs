#!/usr/bin/env node
// Analyzes the current state of enrichment for English, Global History, and US History exams.
// Run: node scripts/analyze-enrichment.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const subjects = ['english', 'global-history', 'us-history']

async function analyze() {
  console.log('📊 Enrichment Analysis of Regents Exams (Mobile Platform Source)\n')
  
  let totalQuestions = 0
  let totalEnriched = 0
  let totalMissing = 0

  for (const subject of subjects) {
    const dir = path.join(ROOT, 'mobile/src/content/regents-exams', subject)
    if (!fs.existsSync(dir)) {
      console.log(`❌ Subject ${subject} directory not found: ${dir}`)
      continue
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'))
    let subjectTotal = 0
    let subjectEnriched = 0
    let subjectMissing = 0
    let subjectExamsCount = files.length

    for (const file of files) {
      const filepath = path.join(dir, file)
      const mod = (await import('file://' + filepath)).default
      if (!mod || !mod.questions) continue

      for (const q of mod.questions) {
        if (!q.choices || typeof q.correct !== 'number') {
          // Skip non-MC (written questions)
          continue
        }
        subjectTotal++
        if (q.explanation && q.diveDeep) {
          subjectEnriched++
        } else {
          subjectMissing++
        }
      }
    }

    console.log(`Subject: ${subject.toUpperCase()}`)
    console.log(`  Exams: ${subjectExamsCount}`)
    console.log(`  Total MC Questions: ${subjectTotal}`)
    console.log(`  Enriched: ${subjectEnriched} (${Math.round((subjectEnriched / subjectTotal) * 100)}%)`)
    console.log(`  Missing: ${subjectMissing}`)
    console.log('')

    totalQuestions += subjectTotal
    totalEnriched += subjectEnriched
    totalMissing += subjectMissing
  }

  console.log('SUMMARY:')
  console.log(`  Total MC Questions: ${totalQuestions}`)
  console.log(`  Total Enriched: ${totalEnriched} (${Math.round((totalEnriched / totalQuestions) * 100)}%)`)
  console.log(`  Total Missing: ${totalMissing}`)
}

analyze().catch(console.error)
