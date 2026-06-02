#!/usr/bin/env node
/**
 * Scans public/images/exams/ for qN.png files and injects
 * image: '/images/exams/FOLDER/qN.png' into the matching JS exam files.
 *
 * Folder name mapping:
 *   le-*   →  shared/content/regents-exams/living-environment/
 *   es-*   →  shared/content/regents-exams/earth-science/
 *   Session  → august-YYYY / june-YYYY / january-YYYY
 */

const fs   = require('fs')
const path = require('path')

const ROOT      = path.resolve(__dirname, '..')
const IMG_ROOT  = path.join(ROOT, 'public', 'images', 'exams')
const EXAM_ROOT = path.join(ROOT, 'shared', 'content', 'regents-exams')

const SUBJECT_MAP = { le: 'living-environment', es: 'earth-science' }

let totalAdded = 0

for (const folder of fs.readdirSync(IMG_ROOT)) {
  const folderPath = path.join(IMG_ROOT, folder)
  if (!fs.statSync(folderPath).isDirectory()) continue

  // Parse folder name: e.g. "le-june-2024" → subject=le, session=june-2024
  const match = folder.match(/^(le|es)-(.+)$/)
  if (!match) { console.log(`Skipping unknown folder: ${folder}`); continue }

  const [, prefix, session] = match
  const subjectDir = SUBJECT_MAP[prefix]
  if (!subjectDir) continue

  const jsFile = path.join(EXAM_ROOT, subjectDir, `${session}.js`)
  if (!fs.existsSync(jsFile)) {
    console.log(`No JS file for ${folder} (expected ${jsFile})`)
    continue
  }

  // Collect question numbers that have images
  const images = {}
  for (const file of fs.readdirSync(folderPath)) {
    const m = file.match(/^q(\d+)\.png$/)
    if (m) images[parseInt(m[1], 10)] = `/images/exams/${folder}/${file}`
  }

  if (Object.keys(images).length === 0) continue

  let src = fs.readFileSync(jsFile, 'utf8')
  let changed = 0

  for (const [num, imgPath] of Object.entries(images)) {
    // Skip if image already present for this question
    const alreadyRe = new RegExp(`number:\\s*${num},[^}]*image:`)
    if (alreadyRe.test(src)) continue

    // Find the question object: "number: N," at word boundary
    // We look for `number: N,` and then the closing `}` of that object,
    // inserting image before the closing brace.
    const qRe = new RegExp(
      `(\\{[^{}]*?number:\\s*${num}\\s*,[^{}]*?)(\\})`,
      'g'
    )

    let replaced = false
    src = src.replace(qRe, (full, body, close) => {
      if (replaced) return full  // only first match
      replaced = true
      changed++
      // Insert image field — tidy formatting
      return `${body.trimEnd()}, image: '${imgPath}' ${close}`
    })
  }

  if (changed > 0) {
    fs.writeFileSync(jsFile, src, 'utf8')
    console.log(`✅ ${folder}: added ${changed} image reference(s) to ${path.basename(jsFile)}`)
    totalAdded += changed
  } else {
    console.log(`✓  ${folder}: all images already present`)
  }
}

console.log(`\nDone. Total image references added: ${totalAdded}`)
