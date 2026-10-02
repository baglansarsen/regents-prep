#!/usr/bin/env node
/**
 * compare-jev-mistake-type — read-only comparison of Claude's and Jev's mistakeType.
 *
 * explainMistake stores Jev's shadow classification as `jev` beside Claude's
 * `result.mistakeType` in tutorCache. This reads those documents and prints how
 * often the two agree, a confusion table, and agreement by Jev confidence band,
 * so we can decide whether Jev is worth building on. Never writes to Firestore.
 *
 * Run locally (never in CI):
 *   gcloud auth application-default login      # once; the firebase CLI login is not ADC
 *   node scripts/compare-jev-mistake-type.mjs [--list] [--project regents-prep]
 *
 * --list also prints one row per document (hashed ids only, no student data).
 */
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const MISTAKE_TYPES = ['concept_gap', 'careless', 'reading_trap', 'formula_setup', 'test_strategy']

// Bands follow the TypeSafe confidence guidance (>0.9 act, 0.5–0.9 confirm, <0.5 escalate).
export const BANDS = [
  { name: 'low (<0.5)', test: (c) => c < 0.5 },
  { name: 'medium (0.5-0.9)', test: (c) => c >= 0.5 && c <= 0.9 },
  { name: 'high (>0.9)', test: (c) => c > 0.9 },
]

/**
 * Pure analysis over tutorCache document data, so it can be tested without Firestore.
 * Documents missing either label (concept mode, pre-shadow entries) are skipped.
 */
export function summarize(docs) {
  const rows = []
  let skipped = 0
  for (const { id, data } of docs) {
    const claude = data?.result?.mistakeType
    const jev = data?.jev?.choice
    const confidence = data?.jev?.confidence
    if (!MISTAKE_TYPES.includes(claude) || !MISTAKE_TYPES.includes(jev)) { skipped++; continue }
    rows.push({ id, claude, jev, confidence: Number.isFinite(confidence) ? confidence : null })
  }

  const agree = rows.filter((r) => r.claude === r.jev).length
  const confusion = Object.fromEntries(
    MISTAKE_TYPES.map((c) => [c, Object.fromEntries(MISTAKE_TYPES.map((j) => [j, 0]))]),
  )
  for (const r of rows) confusion[r.claude][r.jev]++

  const bands = BANDS.map((b) => {
    const inBand = rows.filter((r) => r.confidence !== null && b.test(r.confidence))
    const ok = inBand.filter((r) => r.claude === r.jev).length
    return { band: b.name, n: inBand.length, agree: ok, rate: inBand.length ? ok / inBand.length : null }
  })

  return { n: rows.length, skipped, agree, rate: rows.length ? agree / rows.length : null, confusion, bands, rows }
}

const pct = (x) => (x === null ? 'n/a' : `${(x * 100).toFixed(0)}%`)

export function render(s, { list = false } = {}) {
  const out = []
  out.push(`Compared: ${s.n} documents (skipped ${s.skipped} without both labels)`)
  out.push(`Agreement: ${s.agree}/${s.n} = ${pct(s.rate)}`)
  out.push('', 'Agreement by Jev confidence band:')
  for (const b of s.bands) out.push(`  ${b.band.padEnd(18)} n=${String(b.n).padStart(3)}  agree=${pct(b.rate)}`)
  out.push('', 'Confusion (rows = Claude, columns = Jev):')
  const w = 14
  out.push(' '.repeat(w) + MISTAKE_TYPES.map((t) => t.slice(0, 12).padStart(w - 1)).join(' '))
  for (const c of MISTAKE_TYPES) {
    out.push(c.padEnd(w) + MISTAKE_TYPES.map((j) => String(s.confusion[c][j]).padStart(w - 1)).join(' '))
  }
  if (list) {
    out.push('', 'Per document (claude / jev / confidence):')
    for (const r of s.rows) {
      out.push(`  ${r.id}  ${r.claude} / ${r.jev} / ${r.confidence ?? 'n/a'}${r.claude === r.jev ? '' : '  <- differ'}`)
    }
  }
  return out.join('\n')
}

async function main() {
  const args = process.argv.slice(2)
  const list = args.includes('--list')
  const pi = args.indexOf('--project')
  const projectId = pi >= 0 ? args[pi + 1] : 'regents-prep'

  // firebase-admin lives in functions/ (the only package that depends on it).
  const here = path.dirname(fileURLToPath(import.meta.url))
  const require = createRequire(path.join(here, '..', 'functions', 'package.json'))
  const { initializeApp, applicationDefault } = require('firebase-admin/app')
  const { getFirestore } = require('firebase-admin/firestore')

  initializeApp({ credential: applicationDefault(), projectId })
  // orderBy on the field excludes documents that have no `jev` yet.
  const snap = await getFirestore().collection('tutorCache').orderBy('jev.confidence').get()
  console.log(render(summarize(snap.docs.map((d) => ({ id: d.id, data: d.data() }))), { list }))
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((e) => {
    console.error(`[compare-jev] ${e.message}`)
    if (/default credentials/i.test(e.message)) {
      console.error('Run: gcloud auth application-default login')
    }
    process.exit(1)
  })
}
