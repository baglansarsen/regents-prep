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
npm ci

# Install CocoaPods.
echo "==> pod install in mobile/ios/"
cd "$ios_dir"
pod install

echo "==> ci_post_clone.sh complete"
