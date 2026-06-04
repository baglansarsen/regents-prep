#!/usr/bin/env node
// Syncs question enrichment (explanation + diveDeep) from mobile/src/content/regents-exams/
// to shared/content/regents-exams/ and src/data/regents-exams/ to ensure all platforms are in sync.
// Run: node scripts/sync-enrichment.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const subjects = ['english', 'global-history', 'us-history']

async function syncSubject(subject) {
  const sourceDir = path.join(ROOT, 'mobile/src/content/regents-exams', subject)
  if (!fs.existsSync(sourceDir)) {
    console.log(`Source directory not found: ${sourceDir}`)
    return
  }

  const targets = [
    path.join(ROOT, 'shared/content/regents-exams', subject),
    path.join(ROOT, 'src/data/regents-exams', subject),
  ]

  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.js'))

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file)
    
    // Import source module
    const sourceMod = (await import('file://' + sourcePath)).default
    if (!sourceMod || !sourceMod.questions) continue

    // Map source questions by number
    const sourceMap = new Map()
    for (const q of sourceMod.questions) {
      if (q.explanation || q.diveDeep) {
        sourceMap.set(q.number, {
          explanation: q.explanation,
          diveDeep: q.diveDeep
        })
      }
    }

    if (sourceMap.size === 0) continue

    // Sync to each target platform
    for (const targetDir of targets) {
      if (!fs.existsSync(targetDir)) continue
      const targetPath = path.join(targetDir, file)
      if (!fs.existsSync(targetPath)) continue

      const targetMod = (await import('file://' + targetPath)).default
      if (!targetMod || !targetMod.questions) continue

      let updatedCount = 0
      for (const q of targetMod.questions) {
        const sourceData = sourceMap.get(q.number)
        if (sourceData) {
          if (q.explanation !== sourceData.explanation || q.diveDeep !== sourceData.diveDeep) {
            q.explanation = sourceData.explanation
            q.diveDeep = sourceData.diveDeep
            updatedCount++
          }
        }
      }

      if (updatedCount > 0) {
        // Count total enriched questions in the target
        const totalEnriched = targetMod.questions.filter(q => q.explanation && q.diveDeep).length
        const banner = `// Enriched: ${totalEnriched} questions with explanation/diveDeep\n`
        fs.writeFileSync(targetPath, banner + 'export default ' + JSON.stringify(targetMod, null, 2) + '\n')
        console.log(`  [Synced] ${subject}/${file} -> ${path.relative(ROOT, targetPath)} (+${updatedCount} questions, total ${totalEnriched} enriched)`)
      }
    }
  }
}

async function run() {
  console.log('🔄 Syncing Humanities Enrichment across platforms...\n')
  for (const subject of subjects) {
    console.log(`Subject: ${subject}`)
    await syncSubject(subject)
  }
  console.log('\n✅ Sync complete!')
}

run().catch(console.error)
