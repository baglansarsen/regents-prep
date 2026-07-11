#!/usr/bin/env node
/**
 * parse-check — babel-parses every git-changed .js/.jsx under mobile/src so
 * syntax errors (e.g. from bulk edits) are caught before commit instead of
 * shipping a crashing bundle. Used by `npm run check`.
 *
 * Checks staged + unstaged + untracked changes vs HEAD. Exits non-zero on
 * the first parse failure.
 */
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const babel = require('@babel/core')

const out = execSync(
  // --relative → paths relative to cwd (mobile/), matching the untracked list
  'git diff --name-only --relative HEAD -- src; git ls-files --others --exclude-standard -- src',
  { cwd: process.cwd(), encoding: 'utf8' },
)
const files = [...new Set(out.split('\n').filter((f) => /\.(js|jsx)$/.test(f)))]
  .filter((f) => existsSync(f))

if (!files.length) {
  console.log('parse-check: no changed src files')
  process.exit(0)
}

let failed = 0
for (const f of files) {
  try {
    babel.transformFileSync(f, { presets: ['babel-preset-expo'], code: false })
    console.log(`OK    ${f}`)
  } catch (e) {
    failed++
    console.error(`FAIL  ${f}\n      ${e.message.split('\n')[0]}`)
  }
}

if (failed) {
  console.error(`\nparse-check: ${failed}/${files.length} file(s) failed`)
  process.exit(1)
}
console.log(`parse-check: ${files.length} file(s) OK`)
