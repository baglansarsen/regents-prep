#!/usr/bin/env node
// Computes each Earth and Space Sciences unit's share of real Regents exam
// questions, across the full 20-exam bank — used as `examWeight` in
// mobile/src/content/earth-science/units.js so goal-wiring (Step 4 of
// ~/.claude/plans/expressive-meandering-lagoon.md) can rank units by how many
// exam points they're actually worth, not by guesswork.
//
// The topic/sub-topic normalization here is a read-only snapshot of the
// routing in mobile/src/content/earth-science/units.js — keep the two in
// sync if that file's ES_TOPIC_MAP / SUBTOPIC_UNITS / SP_SKILLS change.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const EXAM_DIR = path.join(ROOT, 'mobile/src/content/regents-exams/earth-science')

const ES_TOPIC_MAP = {
  'Geology':              'Earth Science Mixed Review',
  'Plate Tectonics':      'Earth Science Mixed Review',
  'Geologic Time':        'Earth Science Mixed Review',
  'Meteorology':          'Meteorology & Weather',
  'Climate':              'Climate & Atmosphere',
  'Astronomy':            'Astronomy',
  'Water Cycle':          'Water Cycle & Oceans',
  'Oceanography':         'Water Cycle & Oceans',
  'Maps':                 'Earth Science Mixed Review',
  'General':              'Earth Science Mixed Review',
  'General Review':       'Earth Science Mixed Review',
  'Earth Science Skills': 'Earth Science Mixed Review',
}

// Sub-topic-routed units: pool = questions with this exact subTopic string,
// pulled OUT of their parent topic (Geology / Astronomy / Plate Tectonics /
// Geologic Time) rather than counted there. Mirrors SUBTOPIC_UNITS in
// units.js. Plate Tectonics and Geologic Time were fully dissolved into their
// subtopics (like Geology/Astronomy) after the hand-enrichment pass gave
// every one of these real, well-populated pools.
const SUBTOPIC_UNITS = {
  'es-rocks':          'Rocks & the Rock Cycle',
  'es-surface':        'Weathering, Erosion & Deposition',
  'es-min':            'Minerals',
  'es-solar':          'Solar System & Earth Motions',
  'es-cosmos':         'Moon, Stars & the Universe',
  'es-reldate':        'Relative Dating',
  'es-radiodate':      'Radioactive Dating',
  'es-fossils':        'Fossils & Correlation',
  'es-plateboundaries':'Plate Boundaries',
  'es-earthquakes':    'Earthquakes & Seismic',
  'es-interior':       'Evidence & Convection',
}

// Whole-topic units (post ES_TOPIC_MAP normalization).
const TOPIC_UNITS = {
  'es-u4': 'Meteorology & Weather',
  'es-u5': 'Climate & Atmosphere',
  'es-u7': 'Water Cycle & Oceans',
  'es-u9': 'Earth Science Mixed Review',
}

async function loadAllQuestions() {
  const files = fs.readdirSync(EXAM_DIR).filter((f) => f.endsWith('.js'))
  const all = []
  for (const f of files) {
    const mod = await import(path.join(EXAM_DIR, f))
    const exam = mod.default
    for (const q of exam.questions ?? []) {
      const hasChoices = Array.isArray(q.choices) && q.choices.length > 0 &&
        q.choices.every((c) => String(c ?? '').trim() !== '')
      if (!hasChoices) continue // matches lessonEngine's blank-choice guard
      if (ES_TOPIC_MAP[q.topic] == null) continue // matches lessonEngine's mapped-topic guard
      all.push({ ...q, topic: ES_TOPIC_MAP[q.topic] })
    }
  }
  return all
}

async function run() {
  const pool = await loadAllQuestions()

  const counts = {}
  for (const [id, subTopic] of Object.entries(SUBTOPIC_UNITS)) {
    counts[id] = pool.filter((q) => q.subTopic === subTopic).length
  }
  for (const [id, topic] of Object.entries(TOPIC_UNITS)) {
    counts[id] = pool.filter((q) => q.topic === topic).length
  }

  // Exam-weight denominator excludes es-sp (an overlapping skill tag, not a
  // topic partition — its questions are already counted in their own topic)
  // and es-u9 Mixed Review (a catch-all, not a distinct DCI to weight).
  const weighted = { ...counts }
  delete weighted['es-u9']
  const total = Object.values(weighted).reduce((a, b) => a + b, 0)

  console.log(`Total questions in pool: ${pool.length}`)
  console.log(`Weighted (exclusive, non-Mixed-Review) total: ${total}\n`)

  const rows = Object.entries(counts).map(([id, n]) => {
    const weight = weighted[id] != null ? +(weighted[id] / total).toFixed(3) : null
    return { id, questions: n, examWeight: weight }
  })

  rows.sort((a, b) => (b.examWeight ?? 0) - (a.examWeight ?? 0))
  for (const r of rows) {
    console.log(`${r.id.padEnd(10)} n=${String(r.questions).padStart(3)}  examWeight=${r.examWeight ?? '—'}`)
  }

  const sum = rows.reduce((a, r) => a + (r.examWeight ?? 0), 0)
  console.log(`\nSum of examWeight (should be ~1.0): ${sum.toFixed(3)}`)
}

run()
