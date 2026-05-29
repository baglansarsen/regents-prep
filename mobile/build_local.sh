#!/bin/bash
# Safety first: exit immediately if any command fails
set -e

echo "=== Starting Regentify Local Android Build Pipeline ==="

# Ensure we are in the mobile directory
cd "$(dirname "$0")"

# 1. Temporarily comment out google-services.json in .gitignore
echo "Temporarily commenting out google-services.json from .gitignore..."
sed -i '' 's/^google-services.json/# google-services.json/g' .gitignore
sed -i '' 's/^GoogleService-Info.plist/# GoogleService-Info.plist/g' .gitignore

# 2. Stage the modified .gitignore and force-stage the firebase credentials
echo "Staging files..."
git add .gitignore
git add -f google-services.json

# 3. Create a temporary local commit
echo "Creating a temporary local build commit..."
git commit -m "temp: local build packaging firebase credentials" --no-verify --allow-empty

# 4. Set up trap to clean up the temporary changes on exit (success or failure)
cleanup() {
  echo "=== Post-Build Cleanup: Reverting temporary changes ==="
  git reset HEAD~1
  git checkout -- .gitignore
  echo "Temporary commit reverted and .gitignore restored successfully."
}
trap cleanup EXIT

# 5. Execute the EAS local production build
echo "Running EAS local production build..."
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home \
ANDROID_HOME=~/Library/Android/sdk \
npx eas-cli build --platform android --profile production --local --non-interactive

echo "EAS Build completed successfully!"
