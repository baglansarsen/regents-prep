const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

// The monorepo root — one level up from mobile/
const monoRoot = path.resolve(__dirname, '..')

const config = getDefaultConfig(__dirname)

// Watch the entire regents-prep project
config.watchFolders = [monoRoot]

// Resolve modules from both mobile/node_modules and regents-prep/node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(monoRoot, 'node_modules'),
]

// @content alias → shared/content (single source of truth for all content data)
const CONTENT_ROOT = path.resolve(monoRoot, 'shared/content')

const NATIVE_ONLY_ON_WEB = ['react-native-google-mobile-ads']

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Resolve @content/* to shared/content/*
  if (moduleName === '@content' || moduleName.startsWith('@content/')) {
    const subPath = moduleName.slice('@content'.length)  // '' or '/foo/bar'
    const resolved = path.resolve(CONTENT_ROOT, subPath ? subPath.slice(1) : '')
    return context.resolveRequest(context, resolved, platform)
  }

  // Native-only packages stubbed on web
  if (
    platform === 'web' &&
    NATIVE_ONLY_ON_WEB.some((m) => moduleName === m || moduleName.startsWith(m + '/'))
  ) {
    return { type: 'empty' }
  }

  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
