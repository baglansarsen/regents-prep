#!/usr/bin/env node
/**
 * Verify all Regents exam images referenced in question data files.
 * Checks: file exists, valid PNG signature, size > 500 bytes.
 *
 * Usage:
 *   node scripts/verify-images.js          # full report
 *   node scripts/verify-images.js --fix    # remove corrupt files so they get re-extracted
 */

const fs   = require('fs')
const path = require('path')

const REPO    = path.join(__dirname, '..')
const DATA    = path.join(REPO, 'src', 'data', 'regents-exams')
const PUB     = path.join(REPO, 'public')
const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
const FIX     = process.argv.includes('--fix')

function validPng(fp) {
  try {
    const stat = fs.statSync(fp)
    if (stat.size < 500) return false
    const buf = Buffer.alloc(8)
    const fd  = fs.openSync(fp, 'r')
    fs.readSync(fd, buf, 0, 8, 0)
    fs.closeSync(fd)
    return buf.equals(PNG_SIG)
  } catch { return false }
}

function collectRefs() {
  const refs = []
  for (const subj of ['earth-science', 'living-environment']) {
    const dir = path.join(DATA, subj)
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) {
      const content = fs.readFileSync(path.join(dir, file), 'utf8')
      const examId  = (content.match(/id:\s*'([^']+)'/) || [])[1] || file
      for (const m of content.matchAll(/image:\s*'([^']+)'/g)) {
        refs.push({ examId, rel: m[1], abs: path.join(PUB, m[1]) })
      }
    }
  }
  return refs
}

const refs = collectRefs()
let ok = 0, missing = 0, corrupt = 0

console.log(`Checking ${refs.length} image references...\n`)

for (const { examId, rel, abs } of refs) {
  if (!fs.existsSync(abs)) {
    console.log(`MISSING  ${rel}`)
    missing++
  } else if (!validPng(abs)) {
    const size = fs.statSync(abs).size
    console.log(`CORRUPT  ${rel}  (${size} bytes)`)
    if (FIX) { fs.unlinkSync(abs); console.log(`         → deleted`) }
    corrupt++
  } else {
    ok++
  }
}

console.log(`\n✓ Valid: ${ok}   ✗ Missing: ${missing}   ✗ Corrupt: ${corrupt}`)

// Also report exam-level coverage
console.log('\n--- Per-exam image coverage ---')
const byExam = {}
for (const { examId } of refs) byExam[examId] = (byExam[examId] || 0) + 1
const allExams = [
  'es-june-2025','es-august-2024','es-june-2024','es-august-2023','es-june-2023',
  'es-august-2022','es-june-2022','es-august-2021','es-june-2021','es-august-2019','es-june-2019',
  'le-june-2025','le-august-2024','le-june-2024','le-august-2023','le-june-2023',
  'le-august-2022','le-june-2022','le-august-2021','le-june-2021','le-august-2019','le-june-2019',
]
for (const id of allExams) {
  const n = byExam[id] || 0
  const present = fs.existsSync(path.join(PUB, 'images', 'exams', id))
    ? fs.readdirSync(path.join(PUB, 'images', 'exams', id)).filter(f => f.endsWith('.png')).length
    : 0
  const status = n === 0 ? '⚠ no refs' : (present >= n ? '✓' : `✗ ${present}/${n} files`)
  console.log(`  ${id.padEnd(18)} refs:${String(n).padStart(3)}  files:${String(present).padStart(3)}  ${status}`)
}

process.exit(missing + corrupt > 0 ? 1 : 0)
