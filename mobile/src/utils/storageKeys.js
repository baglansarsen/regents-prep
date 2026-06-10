/**
 * storageKeys — canonical AsyncStorage key builders shared across hooks/screens.
 *
 * Keeping these in one place prevents subtle drift: useUnitUnlocks built the
 * skip-unlock key as `@skipUnlocks_${subject}` (yielding `@skipUnlocks_undefined`
 * when subject was missing) while useUnlocks defaulted to 'living-environment',
 * so the writer and reader could target different keys.
 */

const DEFAULT_SUBJECT = 'living-environment'

/** Key for the set of topics force-unlocked via the Skip Challenge, per subject. */
export function skipUnlocksKey(subject) {
  return `@skipUnlocks_${subject ?? DEFAULT_SUBJECT}`
}
