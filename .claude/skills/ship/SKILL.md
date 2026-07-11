---
name: ship
description: "Ship Regentify mobile to TestFlight / App Store: batch commits, single intentional push (Xcode Cloud), and — for releases — version bump in mobile/ios/Info.plist, App Store Connect version record, and EAS gotchas. Use when the user says ship, push to TestFlight, release, submit to App Store, or bump version."
---

# /ship — Regentify iOS ship & release

Two modes. `/ship` = get current mobile work onto TestFlight. `/ship release` (or any mention of App Store approval / version bump) = full release dance. **Never push or submit without explicit confirmation — every push to `master` burns Xcode Cloud minutes.**

## Mode 1 — ship to TestFlight (default)

1. **Preflight:** `cd mobile && npm run check` (jest + parse-check). Abort on failure.
2. **Batch:** confirm all intended mobile commits are on `master` (`git log origin/master..HEAD --oneline`). One app per commit; never mix chromebook work in.
3. **Confirm, then push once.** Xcode Cloud builds **only `master`** — commits on a feature branch will never reach TestFlight (this caused days of "still old version" confusion once).
4. After push, tell the user the Xcode Cloud build was triggered and that TestFlight will show it under an incremented **build number** (managed by Xcode Cloud), not a new version string.

## Mode 2 — release (`/ship release`, "1.0.X approved", "bump version")

Run Mode 1's preflight, then:

1. **Bump the version in `mobile/ios/Info.plist` directly** — `CFBundleShortVersionString`. The committed `mobile/ios/` directory means `app.json` version/plugins/infoPlist are **ignored** (editing app.json silently does nothing).
2. **Check the version train:** the new marketing version must be strictly higher than the last released one. If App Store Connect shows the previous version still "Ready for Sale" with no open version, remind the user to create the new version record in ASC (or do it via `eas submit` flow if asked).
3. **Xcode Cloud distribution gotcha:** if a validated build is greyed out in ASC "Add Build", the Xcode Cloud archive action is set to TestFlight-only — switch it to "TestFlight and App Store" and rebuild.
4. Commit the bump as its own commit (`chore(release): bump iOS version to X.Y.Z`), confirm, push once.

## EAS path (only when explicitly asked to build via EAS instead of Xcode Cloud)

- `npx eas build --profile production -p ios` / `npx eas submit -p ios` (ascAppId 6776260260, team ZYVRJGM2ZY, EAS account `sbtproduct`).
- `appVersionSource: remote` — EAS manages the version, not app.json.
- Root `.easignore` (NOT `mobile/.easignore`) controls the upload; keep the archive under 2 GB.
- Rive requires the latest Xcode image in `eas.json`.

## Facts that answer recurring App Store prompts

- **Export compliance:** the app uses only standard OS encryption → `ITSAppUsesNonExemptEncryption` is `false` in `mobile/ios/Info.plist`; if ASC still asks, answer "None of the algorithms mentioned above."
- Native iOS config changes (permissions strings, ATT, plist keys) go in `mobile/ios/Info.plist` — never app.json (see #1 above; an ATT launch crash shipped because of this).
