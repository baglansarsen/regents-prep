#!/bin/sh

# Xcode Cloud pre-xcodebuild script.
# Runs after dependencies are installed, just before xcodebuild.
# Sets CFBundleVersion to CI_BUILD_NUMBER so TestFlight uploads
# never collide on duplicate build numbers.

set -e

echo "==> ci_pre_xcodebuild.sh starting"
echo "    CI_BUILD_NUMBER: $CI_BUILD_NUMBER"

INFO_PLIST="$CI_PRIMARY_REPOSITORY_PATH/mobile/ios/Regentify/Info.plist"

if [ -z "$CI_BUILD_NUMBER" ]; then
  echo "    CI_BUILD_NUMBER is empty, skipping version bump"
  exit 0
fi

/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $CI_BUILD_NUMBER" "$INFO_PLIST"
echo "    CFBundleVersion set to $CI_BUILD_NUMBER in $INFO_PLIST"

echo "==> ci_pre_xcodebuild.sh complete"
