#!/usr/bin/env bash
# Deploy Firebase Hosting with a stored token (no interactive login needed).
#
# SETUP (one-time):
#   firebase login:ci          # prints a token
#   echo 'FIREBASE_TOKEN=1//...' >> .env.local   # save it
#
# USAGE:
#   ./scripts/deploy.sh                  # build chromebook + deploy the regents site
#   ./scripts/deploy.sh --images-only    # refresh images in the existing build + deploy (no rebuild)
#   ./scripts/deploy.sh --verify         # verify images before building/deploying
#
# WHAT THIS DEPLOYS:
#   The `regents` hosting target -> chromebook/dist -> https://regents-prep.web.app
#   This is the live content+image site that BOTH the web app and the mobile app
#   load exam images from (mobile CDN_BASE = https://regents-prep.web.app).
#   chromebook/public/images is a symlink to the repo-root public/images, so the
#   chromebook vite build bakes current images straight into chromebook/dist.
#
#   The mobile-web target (regents-prep-mobile.web.app) is deployed separately:
#     npm run deploy:mobile
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
# Firebase serves the `regents` target from chromebook/dist. The chromebook vite
# build copies chromebook/public/ (whose images/ symlinks to repo-root public/images)
# into chromebook/dist, so a full build already includes the current images.
if [[ "${1:-}" != "--images-only" ]]; then
  echo "Building chromebook (regents) site..."
  npm run --prefix chromebook build
  echo "✓ Build complete"
else
  # No rebuild: refresh images into the already-built chromebook/dist so newly
  # added/corrected images go live without a full rebuild.
  if [[ ! -f chromebook/dist/index.html ]]; then
    echo "chromebook/dist has no build yet (no index.html)."
    echo "Run a full build first:  ./scripts/deploy.sh"
    exit 1
  fi
  echo "Refreshing images in chromebook/dist (no rebuild)..."
  rsync -a --include="*/" --include="*.png" --include="*.jpg" --include="*.jpeg" \
    --exclude="*" public/images/ chromebook/dist/images/ 2>/dev/null || \
    cp -r public/images/. chromebook/dist/images/
  echo "✓ Images refreshed"
fi

# ── Deploy ──────────────────────────────────────────────────────────────────
echo "Deploying regents site to Firebase Hosting (regents-prep.web.app)..."
npx -y firebase-tools@latest deploy --only hosting:regents --project regents-prep --token "$TOKEN"
echo "✓ Deployed"
