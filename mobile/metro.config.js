const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

// The monorepo root — one level up from mobile/
const monoRoot = path.resolve(__dirname, '..')

const config = getDefaultConfig(__dirname)

// Watch the entire regents-prep project so we can import from ../src/data/
config.watchFolders = [monoRoot]

// Resolve modules from both mobile/node_modules and regents-prep/node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(monoRoot, 'node_modules'),
]

// Native-only packages that can't be bundled for web — resolve them to an empty
// module on the web platform. Their callers already guard usage at runtime
// (TurboModuleRegistry checks), so the empty stub is never actually invoked.
const NATIVE_ONLY_ON_WEB = ['react-native-google-mobile-ads']
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    platform === 'web' &&
    NATIVE_ONLY_ON_WEB.some((m) => moduleName === m || moduleName.startsWith(m + '/'))
  ) {
    return { type: 'empty' }
  }
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
