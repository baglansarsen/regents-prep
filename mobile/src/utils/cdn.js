// Mobile images are hosted on the mobile-web Firebase target (regents-prep-mobile),
// NOT the chromebook site (regents-prep.web.app) — that domain serves the
// chromebook SPA and returns index.html (not the PNG) for /images/* paths.
export const CDN_BASE = 'https://regents-prep-mobile.web.app'

export function imageUri(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${CDN_BASE}${path}`
}
