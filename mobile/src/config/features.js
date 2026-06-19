// Feature flags for gating features that aren't ready to ship yet.
// Flip a flag back to `true` to restore the feature — the code stays in place.

// Virtual pet (pick/feed/evolve/shop). While false: the onboarding pet-picker
// step is skipped, all pet screens/entry points are hidden, and the Home/Quiz
// "study buddy" shows the Reggie mascot instead of a chosen pet.
export const PETS_ENABLED = false
