#!/usr/bin/env node
// Applies generated enrichments (explanation + diveDeep) to a specified exam file across all three platforms.
// Usage: node scripts/write-enrichment.mjs scratch/payload.json

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.error('❌ Please specify the path to the payload JSON file.')
    process.exit(1)
  }

  const payloadPath = path.resolve(args[0])
  if (!fs.existsSync(payloadPath)) {
    console.error(`❌ Payload file not found: ${payloadPath}`)
    process.exit(1)
  }

  const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'))
  const { subject, file, updates } = payload

  if (!subject || !file || !updates || !Array.isArray(updates)) {
    console.error('❌ Invalid payload format. Must include: subject, file, updates (array).')
    process.exit(1)
  }

  const platforms = [
    path.join(ROOT, 'mobile/src/content/regents-exams', subject, file),
    path.join(ROOT, 'shared/content/regents-exams', subject, file),
    path.join(ROOT, 'src/data/regents-exams', subject, file),
  ]

  let updatedPlatformsCount = 0

  for (const fPath of platforms) {
    if (!fs.existsSync(fPath)) {
      console.log(`⚠️ Platform file does not exist: ${fPath}`)
      continue
    }

    // Read the file and import it dynamically to verify/work with it,
    // or parse the text of the file directly to avoid ESM caching issues if we run multiple times.
    const fileContent = fs.readFileSync(fPath, 'utf8')
    
    // Locate the start of the object (ignoring the export default or banners)
    const jsonStartIndex = fileContent.indexOf('{')
    if (jsonStartIndex === -1) {
      console.error(`❌ Could not locate JSON object in file: ${fPath}`)
      continue
    }

    const mod = (await import('file://' + fPath)).default
    if (!mod || !mod.questions) {
      console.error(`❌ Invalid module or missing questions in file: ${fPath}`)
      continue
    }

    // Apply updates
    let changeCount = 0
    for (const update of updates) {
      const q = mod.questions.find(quest => quest.number === update.number)
      if (q) {
        q.explanation = update.explanation
        q.diveDeep = update.diveDeep
        changeCount++
      } else {
        console.warn(`⚠️ Question ${update.number} not found in ${fPath}`)
      }
    }

    if (changeCount > 0) {
      // Calculate total enriched questions
      const totalEnriched = mod.questions.filter(q => q.explanation && q.diveDeep).length
      const banner = `// Enriched: ${totalEnriched} questions with explanation/diveDeep\n`
      fs.writeFileSync(fPath, banner + 'export default ' + JSON.stringify(mod, null, 2) + '\n')
      console.log(`✅ Updated ${fPath} (+${changeCount} questions, total ${totalEnriched} enriched)`)
      updatedPlatformsCount++
    }
  }

  console.log(`\n🎉 Success! Updated ${updatedPlatformsCount} platforms for ${subject}/${file}.`)
}

main().catch(console.error)
