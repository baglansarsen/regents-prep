#!/usr/bin/env bash
# Deploy Firebase Hosting with a stored token (no interactive login needed).
#
# SETUP (one-time):
#   firebase login:ci          # prints a token
#   echo 'FIREBASE_TOKEN=1//...' >> .env.local   # save it
#
# USAGE:
#   ./scripts/deploy.sh                  # full build + deploy
#   ./scripts/deploy.sh --images-only    # deploy without rebuilding (after adding images)
#   ./scripts/deploy.sh --verify         # verify images before deploying
#
# The token is read from (in order):
#   1. FIREBASE_TOKEN env var
#   2. .env.local in repo root
#   3. ~/.firebase-token

set -euo pipefail
cd "$(dirname "$0")/.."

# ── Load token ──────────────────────────────────────────────────────────────
load_token() {
  if [[ -n "${FIREBASE_TOKEN:-}" ]]; then
    echo "$FIREBASE_TOKEN"
    return
  fi
  local env_file=".env.local"
  if [[ -f "$env_file" ]]; then
    local tok
    tok=$(grep -m1 'FIREBASE_TOKEN=' "$env_file" 2>/dev/null | cut -d= -f2- | tr -d '"' || true)
    if [[ -n "$tok" ]]; then echo "$tok"; return; fi
  fi
  if [[ -f "$HOME/.firebase-token" ]]; then
    cat "$HOME/.firebase-token"
    return
  fi
  echo ""
}

TOKEN=$(load_token)

if [[ -z "$TOKEN" ]]; then
  echo "No FIREBASE_TOKEN found. Run:"
  echo "  firebase login:ci"
  echo "Then save the printed token:"
  echo "  echo 'FIREBASE_TOKEN=<token>' >> .env.local"
  echo "Or set the env var before running this script."
  exit 1
fi

echo "✓ Token loaded"

# ── Optional: verify images first ───────────────────────────────────────────
if [[ "${1:-}" == "--verify" ]]; then
  echo "Verifying images..."
  node scripts/verify-images.cjs
  echo ""
fi

# ── Build ───────────────────────────────────────────────────────────────────
if [[ "${1:-}" != "--images-only" ]]; then
  echo "Building..."
  npm run build
  echo "✓ Build complete"
fi

# ── Copy new images into dist (Firebase serves from dist/) ──────────────────
echo "Syncing images to dist/..."
rsync -a --include="*.png" --include="*.jpg" --include="*.jpeg" \
  public/images/ dist/images/ 2>/dev/null || \
  cp -r public/images/ dist/images/
echo "✓ Images synced"

# ── Deploy ──────────────────────────────────────────────────────────────────
echo "Deploying to Firebase Hosting..."
npx -y firebase-tools@latest deploy --only hosting --project regents-prep --token "$TOKEN"
echo "✓ Deployed"
