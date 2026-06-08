/**
 * Generates correct.wav and wrong.wav as signed 16-bit PCM WAV files.
 * Run: node mobile/scripts/generate-sounds.js
 * Then upload the files in mobile/scripts/sounds/ to Firebase Hosting at /sounds/.
 */

const fs   = require('fs')
const path = require('path')

const OUT_DIR   = path.join(__dirname, 'sounds')
const SAMPLE_RATE = 44100

fs.mkdirSync(OUT_DIR, { recursive: true })

function writeWav(filename, samples) {
  const dataLen   = samples.length * 2          // 16-bit = 2 bytes/sample
  const buf       = Buffer.alloc(44 + dataLen)

  buf.write('RIFF', 0)
  buf.writeUInt32LE(36 + dataLen, 4)
  buf.write('WAVE', 8)
  buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16)                     // chunk size
  buf.writeUInt16LE(1, 20)                      // PCM
  buf.writeUInt16LE(1, 22)                      // mono
  buf.writeUInt32LE(SAMPLE_RATE, 24)
  buf.writeUInt32LE(SAMPLE_RATE * 2, 28)        // byte rate
  buf.writeUInt16LE(2, 32)                      // block align
  buf.writeUInt16LE(16, 34)                     // bits per sample
  buf.write('data', 36)
  buf.writeUInt32LE(dataLen, 40)

  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]))
    buf.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2)
  }

  fs.writeFileSync(path.join(OUT_DIR, filename), buf)
  console.log(`wrote ${filename}  (${samples.length} samples, ${(dataLen / 1024).toFixed(1)} KB)`)
}

// ── correct: two-tone ascending chime (523 Hz → 784 Hz), 0.35 s, soft fade-out
function makeCorrect() {
  const dur     = 0.35
  const n       = Math.floor(SAMPLE_RATE * dur)
  const samples = new Float32Array(n)
  const f1 = 523.25, f2 = 783.99       // C5 → G5
  const crossAt = Math.floor(n * 0.5)  // switch at halfway

  for (let i = 0; i < n; i++) {
    const t      = i / SAMPLE_RATE
    const freq   = i < crossAt ? f1 : f2
    const env    = i < crossAt
      ? Math.min(1, i / (SAMPLE_RATE * 0.02))                   // 20 ms attack
      : 1 - (i - crossAt) / (n - crossAt)                       // linear decay
    samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.55
  }
  return samples
}

// ── wrong: descending low tone (330 Hz → 220 Hz), 0.3 s, dull thud envelope
function makeWrong() {
  const dur     = 0.30
  const n       = Math.floor(SAMPLE_RATE * dur)
  const samples = new Float32Array(n)

  for (let i = 0; i < n; i++) {
    const t    = i / SAMPLE_RATE
    const freq = 330 - 110 * (i / n)             // glide down
    const env  = Math.exp(-t * 9) * Math.min(1, i / (SAMPLE_RATE * 0.01))
    samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.6
  }
  return samples
}

writeWav('correct.wav', makeCorrect())
writeWav('wrong.wav',   makeWrong())

console.log('\nNext steps:')
console.log('  1. Rename files to correct.mp3 / wrong.mp3  (or keep .wav — expo-av handles both)')
console.log('  2. firebase deploy --only hosting  from the project root')
console.log('     Files must be reachable at https://regents-prep.web.app/sounds/correct.mp3')
