#!/usr/bin/env bash
# deploy-chromebook — build + deploy the chromebook app from a git WORKTREE of
# feat/chromebook, so the main checkout (usually on master with mobile WIP)
# never has to stash/switch/restore. That stash-switch dance previously
# half-applied a stash onto the wrong branch and let a .firebase/ cache file
# block the branch switch.
#
# Usage: scripts/deploy-chromebook.sh [branch]   (default: feat/chromebook)
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
BRANCH="${1:-feat/chromebook}"
WT="$REPO/.worktrees/chromebook"

cd "$REPO"

# ── Worktree: create once, reuse forever ─────────────────────────────────────
if [ ! -d "$WT" ]; then
  mkdir -p "$REPO/.worktrees"
  git worktree add "$WT" "$BRANCH"
  echo "→ created worktree $WT on $BRANCH"
fi

cd "$WT"
git fetch origin "$BRANCH" --quiet || true
# Fast-forward to the freshest local/remote state of the branch
git checkout --quiet "$BRANCH"
git merge --ff-only "origin/$BRANCH" 2>/dev/null || true

echo "→ deploying $(git log -1 --oneline)"

# ── Build ────────────────────────────────────────────────────────────────────
cd "$WT/chromebook"
[ -d node_modules ] || npm install
npm run build

# ── Deploy (from the worktree — its own .firebase/ cache, no collisions) ─────
cd "$WT"
if grep -q '"deploy:web"' package.json 2>/dev/null; then
  npm run deploy:web
else
  npx firebase-tools@latest deploy --only hosting:regents
fi

echo "✓ chromebook deployed from worktree ($BRANCH). Main checkout untouched."
