#!/bin/sh

# Xcode Cloud post-clone script.
# Runs after the repo is cloned, before xcodebuild starts.
# CWD when this script runs is: <repo>/mobile/ios/ci_scripts

set -e

echo "==> ci_post_clone.sh starting"
echo "    pwd: $(pwd)"
echo "    CI_PRIMARY_REPOSITORY_PATH: $CI_PRIMARY_REPOSITORY_PATH"

script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"

# Walk upward until we find the iOS directory that owns the Podfile.
ios_dir="$script_dir"
while [ "$ios_dir" != "/" ] && [ ! -f "$ios_dir/Podfile" ]; do
  ios_dir="$(CDPATH= cd -- "$ios_dir/.." && pwd)"
done

if [ ! -f "$ios_dir/Podfile" ]; then
  echo "Could not locate Podfile by walking up from: $script_dir"
  exit 1
fi

mobile_dir="$(CDPATH= cd -- "$ios_dir/.." && pwd)"

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
