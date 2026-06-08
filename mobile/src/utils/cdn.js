export const CDN_BASE = 'https://regents-prep.web.app'

export function imageUri(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${CDN_BASE}${path}`
}
