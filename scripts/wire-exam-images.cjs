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

const SUBJECT_MAP = {
  le: 'living-environment',
  es: 'earth-science',
  chem: 'chemistry',
  phys: 'physics',
  geo: 'geometry',
  alg1: 'algebra-1',
  alg2: 'algebra-2',
  ls: 'life-science',
  ela: 'english',
  ush: 'us-history',
  gh: 'global-history'
}

let totalAdded = 0

for (const folder of fs.readdirSync(IMG_ROOT)) {
  const folderPath = path.join(IMG_ROOT, folder)
  if (!fs.statSync(folderPath).isDirectory()) continue

  // Parse folder name: e.g. "le-june-2024" → subject=le, session=june-2024
  const match = folder.match(/^(le|es|chem|phys|geo|alg1|alg2|ls|ela|ush|gh)-(.+)$/)
  if (!match) { console.log(`Skipping unknown folder: ${folder}`); continue }

  const [, prefix, session] = match
  const subjectDir = SUBJECT_MAP[prefix]
  if (!subjectDir) continue

  // For life-science, map abbreviated months back to full month names in filename
  let sessionFile = session
  if (prefix === 'ls') {
    sessionFile = sessionFile.replace(/^jun-/, 'june-')
                            .replace(/^aug-/, 'august-')
                            .replace(/^jan-/, 'january-')
  }

  const jsFile = path.join(EXAM_ROOT, subjectDir, `${sessionFile}.js`)
  if (!fs.existsSync(jsFile)) {
    console.log(`No JS file for ${folder} (expected ${jsFile})`)
    continue
  }

  // Collect question numbers that have images (both qN.png and context_X_Y.png)
  const images = {}
  for (const file of fs.readdirSync(folderPath)) {
    const m = file.match(/^q(\d+)\.png$/)
    if (m) {
      images[parseInt(m[1], 10)] = `/images/exams/${folder}/${file}`
    }
    const mCtx = file.match(/^context_(\d+)_(\d+)\.png$/)
    if (mCtx) {
      const qStart = parseInt(mCtx[1], 10)
      const qEnd = parseInt(mCtx[2], 10)
      for (let num = qStart; num <= qEnd; num++) {
        images[num] = `/images/exams/${folder}/${file}`
      }
    }
  }

  if (Object.keys(images).length === 0) continue

  let src = fs.readFileSync(jsFile, 'utf8')
  let changed = 0

  for (const [num, imgPath] of Object.entries(images)) {
    // Find the question object: "number: N," at word boundary
    const qRe = new RegExp(
      `(\\{[^{}]*?number:\\s*${num}\\s*,[^{}]*?)(\\})`,
      'g'
    )

    // Check if the current question block already has the exact image path
    // If it already points to the correct image, we skip to avoid unnecessary updates
    const exactRe = new RegExp(`number:\\s*${num},[^{}]*image:\\s*'${imgPath.replace(/\//g, '\\/')}'`)
    if (exactRe.test(src)) continue

    let replaced = false
    src = src.replace(qRe, (full, body, close) => {
      if (replaced) return full  // only first match
      replaced = true
      changed++
      if (body.includes('image:')) {
        // Replace existing image field with the correct one
        return body.replace(/image:\s*'[^']*'/, `image: '${imgPath}'`) + close
      } else {
        // Insert new image field — tidy formatting and avoid double commas
        const trimmedBody = body.trimEnd()
        const cleanBody = trimmedBody.endsWith(',') ? trimmedBody.slice(0, -1).trimEnd() : trimmedBody
        return `${cleanBody}, image: '${imgPath}' ${close}`
      }
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
