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

module.exports = config
