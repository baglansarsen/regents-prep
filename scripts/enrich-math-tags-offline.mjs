#!/usr/bin/env node
// Enriches math exam questions with pedagogical metadata tags (e.g. isLiteralEquation,
// isExtraneousCheck, isComplexSimplification, isCoordinateProof, isGeometricProof)
// completely offline. Syncs changes across all three platforms.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function tagAlgebra1(q) {
  const text = (q.text || '').toLowerCase()
  const topic = q.topic || ''

  const isLiteral = 
    text.includes('terms of') || 
    text.includes('solve the formula') || 
    text.includes('solved for') ||
    text.includes('expressed in terms')

  if (isLiteral) {
    q.isLiteralEquation = true
  }
}

function tagAlgebra2(q) {
  const text = (q.text || '').toLowerCase()
  const topic = (q.topic || '').toLowerCase()

  const isExtraneous = text.includes('extraneous')
  const isComplex = 
    text.includes('a + bi') || 
    text.includes('imaginary') || 
    text.includes('powers of i') || 
    text.includes('conjugate') ||
    topic.includes('complex')

  if (isExtraneous) {
    q.isExtraneousCheck = true
  }
  if (isComplex) {
    q.isComplexSimplification = true
  }
}

function tagGeometry(q) {
  const text = (q.text || '').toLowerCase()
  const topic = q.topic || ''
  const part = typeof q.part === 'string' ? q.part.toUpperCase() : 'A'

  const isProve = text.includes('prove')
  const isCoord = text.includes('coordinate')

  if (isProve && isCoord) {
    q.isCoordinateProof = true
  } else if (isProve && part !== 'A') {
    q.isGeometricProof = true
  }
}

async function run() {
  const subjects = ['algebra-1', 'algebra-2', 'geometry']
  let totalTagged = 0

  console.log('⚡ Offline Math Tag Enrichment & Sync Started\n')

  for (const subject of subjects) {
    const mobileDir = path.join(ROOT, 'mobile/src/content/regents-exams', subject)
    if (!fs.existsSync(mobileDir)) continue

    const targetDirs = [
      path.join(ROOT, 'mobile/src/content/regents-exams', subject),
      path.join(ROOT, 'shared/content/regents-exams', subject),
      path.join(ROOT, 'src/data/regents-exams', subject),
    ]

    const files = fs.readdirSync(mobileDir).filter((f) => f.endsWith('.js'))
    console.log(`Subject: ${subject} (${files.length} exam files)`)

    let subjectTagged = 0

    for (const file of files) {
      const sourcePath = path.join(mobileDir, file)
      const mod = (await import('file://' + sourcePath)).default
      if (!mod || !mod.questions) continue

      let count = 0
      for (const q of mod.questions) {
        const prevKeys = Object.keys(q).length
        
        if (subject === 'algebra-1') tagAlgebra1(q)
        else if (subject === 'algebra-2') tagAlgebra2(q)
        else if (subject === 'geometry') tagGeometry(q)

        if (Object.keys(q).length > prevKeys) {
          count++
        }
      }

      if (count > 0) {
        let banner = `// Enriched ${subject} exam — difficulty tags mapped offline\n`
        if (subject === 'geometry') {
          banner = `// Enriched Geometry exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)\n`
        } else if (subject === 'algebra-2') {
          banner = `// Algebra 2 Regents — ${mod.session} ${mod.year}\n`
        }

        const finalCode = banner + 'export default ' + JSON.stringify(mod, null, 2) + '\n'

        // Write to all three platforms in sync
        for (const targetDir of targetDirs) {
          if (!fs.existsSync(targetDir)) continue
          const targetPath = path.join(targetDir, file)
          fs.writeFileSync(targetPath, finalCode, 'utf8')
        }

        subjectTagged += count
        totalTagged += count
      }
    }
    console.log(`  -> Tagged ${subjectTagged} questions`)
  }

  console.log(`\n✅ Completed! Total questions tagged and synced across all platforms: ${totalTagged}`)
}

run().catch(console.error)
