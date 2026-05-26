#!/usr/bin/env node
/**
 * Seed 10 bot users into Firestore for testing league / leaderboard / gamification.
 *
 * Usage:
 *   node scripts/seed-bots.cjs --sa path/to/serviceAccount.json --uid <your_uid> [--school "My School"]
 *   node scripts/seed-bots.cjs --sa path/to/serviceAccount.json --uid <your_uid> --cleanup
 *
 * Env var fallbacks: SA_PATH, TEST_UID, BOT_SCHOOL
 *
 * Requires: npm install --save-dev firebase-admin
 */

const admin = require('firebase-admin')
const path  = require('path')

// ── arg parsing ──────────────────────────────────────────────────────────────
const argv = process.argv.slice(2)
function arg(flag) {
  const i = argv.indexOf(flag)
  return i !== -1 ? argv[i + 1] : undefined
}

const saPath  = arg('--sa')    || process.env.SA_PATH
const testUid = arg('--uid')   || process.env.TEST_UID
const school  = arg('--school')|| process.env.BOT_SCHOOL || 'Regents Prep'
const cleanup = argv.includes('--cleanup')

if (!saPath)  { console.error('Missing --sa <serviceAccount.json>'); process.exit(1) }
if (!testUid) { console.error('Missing --uid <your_firebase_uid>');  process.exit(1) }

// ── Firebase Admin init ──────────────────────────────────────────────────────
const sa = require(path.resolve(saPath))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

// ── ISO 8601 week key (same algorithm as mobile/src/hooks/useXP.js) ──────────
function getWeekKey(date = new Date()) {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = utc.getUTCDay() || 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((utc - yearStart) / 86_400_000 + 1) / 7)
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

function prevWeekKey() {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - 7)
  return getWeekKey(d)
}

// ── Bot roster ───────────────────────────────────────────────────────────────
const BOTS = [
  { uid: 'bot_001', displayName: 'Alex R.',   xp: 45,   weeklyXP: 12,   lastWeekXP: 8,   tier: 'bronze',  friendCode: 'BOT001' },
  { uid: 'bot_002', displayName: 'Maya T.',   xp: 180,  weeklyXP: 55,   lastWeekXP: 40,  tier: 'bronze',  friendCode: 'BOT002' },
  { uid: 'bot_003', displayName: 'Jordan K.', xp: 420,  weeklyXP: 110,  lastWeekXP: 90,  tier: 'bronze',  friendCode: 'BOT003' },
  { uid: 'bot_004', displayName: 'Sam L.',    xp: 650,  weeklyXP: 200,  lastWeekXP: 180, tier: 'silver',  friendCode: 'BOT004' },
  { uid: 'bot_005', displayName: 'Riley P.',  xp: 850,  weeklyXP: 280,  lastWeekXP: 250, tier: 'silver',  friendCode: 'BOT005' },
  { uid: 'bot_006', displayName: 'Casey M.',  xp: 1400, weeklyXP: 380,  lastWeekXP: 320, tier: 'silver',  friendCode: 'BOT006' },
  { uid: 'bot_007', displayName: 'Morgan W.', xp: 2200, weeklyXP: 520,  lastWeekXP: 490, tier: 'gold',    friendCode: 'BOT007' },
  { uid: 'bot_008', displayName: 'Drew H.',   xp: 3100, weeklyXP: 680,  lastWeekXP: 640, tier: 'gold',    friendCode: 'BOT008' },
  { uid: 'bot_009', displayName: 'Quinn B.',  xp: 5500, weeklyXP: 900,  lastWeekXP: 850, tier: 'diamond', friendCode: 'BOT009' },
  { uid: 'bot_010', displayName: 'Skyler N.', xp: 9200, weeklyXP: 1400, lastWeekXP: 1300,tier: 'diamond', friendCode: 'BOT010' },
]

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  const weekKey     = getWeekKey()
  const lastWeekKey = prevWeekKey()
  const batch       = db.batch()

  if (cleanup) {
    console.log(`Removing ${BOTS.length} bots…`)
    for (const bot of BOTS) {
      batch.delete(db.doc(`leaderboard/${bot.uid}`))
      batch.delete(db.doc(`users/${testUid}/friends/${bot.uid}`))
      batch.delete(db.doc(`friendCodes/${bot.friendCode}`))
    }
    await batch.commit()
    console.log('Done. All bot data removed.')
    return
  }

  console.log(`Seeding ${BOTS.length} bots (weekKey=${weekKey}, school="${school}")…`)
  for (const bot of BOTS) {
    // leaderboard doc — drives League screen and school leaderboard
    batch.set(db.doc(`leaderboard/${bot.uid}`), {
      displayName:      bot.displayName,
      xp:               bot.xp,
      weeklyXP:         bot.weeklyXP,
      weekKey,
      lastWeekXP:       bot.lastWeekXP,
      lastWeekKey,
      tier:             bot.tier,
      friendCode:       bot.friendCode,
      school,
      promotionChecked: lastWeekKey,
    })

    // friend relationship — drives Friends leaderboard tab
    batch.set(db.doc(`users/${testUid}/friends/${bot.uid}`), {
      uid:         bot.uid,
      displayName: bot.displayName,
      addedAt:     admin.firestore.FieldValue.serverTimestamp(),
    })

    // friend code lookup — enables testing add-by-code flow
    batch.set(db.doc(`friendCodes/${bot.friendCode}`), {
      uid:         bot.uid,
      displayName: bot.displayName,
    })
  }

  await batch.commit()
  console.log('Done. Bots seeded:')
  for (const bot of BOTS) {
    console.log(`  ${bot.uid}  ${bot.displayName.padEnd(12)} xp=${bot.xp}  weeklyXP=${bot.weeklyXP}  tier=${bot.tier}`)
  }
  console.log('\nTo remove bots later, re-run with --cleanup')
}

main().catch((err) => { console.error(err); process.exit(1) })
