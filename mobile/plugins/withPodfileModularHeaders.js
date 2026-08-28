const { withPodfile } = require('@expo/config-plugins');

// Google Sign-In's dependency chain (GoogleSignIn -> AppCheckCore ->
// GoogleUtilities/RecaptchaInterop) ships AppCheckCore as a Swift pod that
// doesn't define modules, which CocoaPods refuses to link statically without
// modular headers ("Swift pods cannot yet be integrated as static libraries").
// This project doesn't use use_frameworks!, so these three pods need modular
// headers explicitly. Encoded as a plugin (not a one-off Podfile hand-edit) so
// it survives `expo prebuild --clean`.
const MARKER = '# withPodfileModularHeaders'
const INSERTION = `${MARKER}
  pod 'GoogleUtilities', :modular_headers => true
  pod 'RecaptchaInterop', :modular_headers => true
  pod 'AppCheckCore', :modular_headers => true
`

const withPodfileModularHeaders = (config) => {
  return withPodfile(config, (config) => {
    const contents = config.modResults.contents
    if (contents.includes(MARKER)) return config
    config.modResults.contents = contents.replace(
      /use_expo_modules!\n/,
      `use_expo_modules!\n\n${INSERTION}\n`
    )
    return config
  })
}

module.exports = withPodfileModularHeaders
