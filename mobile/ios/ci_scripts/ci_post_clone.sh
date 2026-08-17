#!/bin/sh

# Xcode Cloud post-clone script.
# Runs after the repo is cloned, before xcodebuild starts.
# CWD when this script runs is: <repo>/mobile/ios/ci_scripts

set -e

echo "==> ci_post_clone.sh starting"
echo "    pwd: $(pwd)"
echo "    CI_PRIMARY_REPOSITORY_PATH: $CI_PRIMARY_REPOSITORY_PATH"

script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"

repo_root="${CI_PRIMARY_REPOSITORY_PATH:-$(CDPATH= cd -- "$script_dir/.." && pwd)}"

first_match() {
  find "$1" -path '*/node_modules' -prune -o -type f -name "$2" -print | awk 'NR==1 { print; exit }'
}

podfile_path="$(first_match "$repo_root" Podfile)"
if [ -z "$podfile_path" ]; then
  echo "Could not locate a Podfile under: $repo_root"
  exit 1
fi

ios_dir="$(CDPATH= cd -- "$(dirname -- "$podfile_path")" && pwd)"

mobile_dir="$(CDPATH= cd -- "$ios_dir/.." && pwd)"
package_json_path="$mobile_dir/package.json"
if [ ! -f "$package_json_path" ]; then
  echo "Could not locate package.json at: $package_json_path"
  exit 1
fi

echo "    repo_root: $repo_root"
echo "    ios_dir: $ios_dir"
echo "    mobile_dir: $mobile_dir"
echo "    podfile_path: $podfile_path"
echo "    package_json_path: $package_json_path"

# Homebrew is preinstalled on Xcode Cloud runners.
# Install Node 20 (matches Expo SDK 52 / RN 0.76) and CocoaPods.
echo "==> Installing Node 20 and CocoaPods via Homebrew"
brew install node@20
brew link --overwrite --force node@20
brew install cocoapods

node --version
npm --version
pod --version

# Install JS dependencies (patch-package runs via postinstall).
echo "==> npm ci in mobile/"
cd "$mobile_dir"
npm ci --legacy-peer-deps

# Install CocoaPods.
echo "==> pod install in mobile/ios/"
cd "$ios_dir"

# The CocoaPods CDN ("trunk") pulls podspecs from raw.githubusercontent.com,
# which rate-limits shared Xcode Cloud runner IPs with HTTP 429. A cold runner
# has to fetch the whole spec index every build, so this fails intermittently
# on pods with many published versions (lottie-ios is the usual victim).
# Retry with backoff, then fall back to the git Specs repo, which is served
# over github.com git rather than the rate-limited raw host.
pod_install_with_retry() {
  attempt=1
  max_attempts=3
  while [ "$attempt" -le "$max_attempts" ]; do
    echo "==> pod install (attempt $attempt/$max_attempts)"
    if pod install; then
      return 0
    fi
    if [ "$attempt" -lt "$max_attempts" ]; then
      delay=$((attempt * 45))
      echo "    pod install failed; sleeping ${delay}s before retry"
      sleep "$delay"
    fi
    attempt=$((attempt + 1))
  done

  echo "==> CDN retries exhausted; falling back to the git Specs repo"
  pod repo remove trunk 2>/dev/null || true
  # Git clone over github.com instead of raw.githubusercontent.com. Slower
  # (several minutes to clone the Specs repo) but not subject to the raw 429s.
  pod repo add trunk https://github.com/CocoaPods/Specs.git
  pod install
}

pod_install_with_retry

echo "==> ci_post_clone.sh complete"
