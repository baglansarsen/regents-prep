#!/usr/bin/env node
// Raw wire-up generator: converts output/data/<subject>/<session>.json into app
// exam modules for both the web app (src/data/regents-exams) and the mobile app
// (mobile/src/content/regents-exams). "Raw" = real extracted question text/choices,
// no authored explanation/diveDeep yet (enrichment is a later pass).
//
// It also emits, per subject + platform, the exact import block + REGENTS_EXAMS
// array block to splice into the two index.js files (printed to stdout).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// subject id -> { prefix (id/var prefix), name, icon, color, shortName }
const SUBJECTS = {
  english:          { prefix: 'eng', varPrefix: 'eng', name: 'English (ELA)',  icon: '📖', color: '#ef4444', shortName: 'EN' },
  'global-history': { prefix: 'gh',  varPrefix: 'gh',  name: 'Global History', icon: '🌐', color: '#0ea5e9', shortName: 'GH' },
  'us-history':     { prefix: 'ush', varPrefix: 'ush', name: 'US History',     icon: '🗽', color: '#a855f7', shortName: 'US' },
}

const MONTHS = { june: { abbr: 'jun', label: 'June', ord: 0 }, august: { abbr: 'aug', label: 'August', ord: 1 }, january: { abbr: 'jan', label: 'January', ord: 2 } }

function parseSession(file) {
  // "june-2025.json" -> { month, year }
  const base = file.replace(/\.json$/, '')
  const [month, year] = base.split('-')
  return { month, year: Number(year), label: MONTHS[month].label, abbr: MONTHS[month].abbr, ord: MONTHS[month].ord }
}

function mapQuestion(q) {
  const out = { number: q.number }
  const written = q.type && q.type !== 'multiple-choice'
  out.part = written ? 'II' : 'I'
  if (written) out.type = 'written'
  out.text = q.text
  if (!written) {
    out.choices = q.choices ?? []
    out.correct = q.correct
  } else {
    if (q.maxPoints != null) out.maxPoints = q.maxPoints
    out.modelAnswer = q.modelAnswer ?? null
  }
  if (q.image) out.image = q.image
  if (q.context) out.context = q.context
  return out
}

function buildExam(subjectId, file) {
  const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/data', subjectId, file), 'utf8'))
  const s = parseSession(file)
  const { prefix } = SUBJECTS[subjectId]
  return {
    session: s,
    module: {
      id: `${prefix}-${s.abbr}-${s.year}`,
      subject: subjectId,
      year: s.year,
      session: s.label,
      totalMinutes: 180,
      questions: (raw.questions ?? []).map(mapQuestion),
    },
  }
}

function writeModule(targetDir, file, mod) {
  fs.mkdirSync(targetDir, { recursive: true })
  const banner = `// Auto-generated raw wire-up from output/data/${mod.subject}/${file.replace('.js', '.json')}\n// Real extracted questions; explanation/diveDeep enrichment is a later pass.\n`
  fs.writeFileSync(path.join(targetDir, file), banner + 'export default ' + JSON.stringify(mod, null, 2) + '\n')
}

const WEB_DIR = path.join(ROOT, 'src/data/regents-exams')
const MOBILE_DIR = path.join(ROOT, 'mobile/src/content/regents-exams')

let snippets = ''

for (const subjectId of Object.keys(SUBJECTS)) {
  const dir = path.join(ROOT, 'output/data', subjectId)
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
  const exams = files.map((f) => ({ file: f, ...buildExam(subjectId, f) }))
  // sort newest year first, then June, August, January
  exams.sort((a, b) => b.session.year - a.session.year || a.session.ord - b.session.ord)

  for (const e of exams) {
    const jsFile = e.file.replace(/\.json$/, '.js')
    writeModule(path.join(WEB_DIR, subjectId), jsFile, e.module)
    writeModule(path.join(MOBILE_DIR, subjectId), jsFile, e.module)
  }

  // build index.js snippets
  const { varPrefix } = SUBJECTS[subjectId]
  const varName = (e) => `${varPrefix}${cap(e.session.label)}${e.session.year}`
  const imports = exams.map((e) => `import ${varName(e)} from './${subjectId}/${e.file.replace(/\.json$/, '')}'`).join('\n')
  const arrayBlock = `  '${subjectId}': [\n${exams.map((e) => `    ${varName(e)},`).join('\n')}\n  ],`
  snippets += `\n========== ${subjectId} ==========\n--- IMPORTS ---\n${imports}\n--- ARRAY (inside REGENTS_EXAMS) ---\n${arrayBlock}\n`
}

function cap(s) { return s[0].toUpperCase() + s.slice(1) }

const snippetPath = path.join(ROOT, 'scratch/humanities-index-snippets.txt')
fs.mkdirSync(path.dirname(snippetPath), { recursive: true })
fs.writeFileSync(snippetPath, snippets)
console.log('Wrote exam modules for:', Object.keys(SUBJECTS).join(', '))
console.log('Index snippets ->', path.relative(ROOT, snippetPath))
console.log(snippets)
