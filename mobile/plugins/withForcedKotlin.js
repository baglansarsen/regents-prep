const { withProjectBuildGradle, withGradleProperties } = require('@expo/config-plugins');

const withForcedKotlin = (config) => {
  // 1. Force kotlinVersion in gradle.properties
  config = withGradleProperties(config, (config) => {
    config.modResults = config.modResults.filter(
      (item) => item.key !== 'android.kotlinVersion'
    );
    config.modResults.push({
      type: 'property',
      key: 'android.kotlinVersion',
      value: '1.9.24',
    });
    return config;
  });

  // 2. Force kotlinVersion and suppression in build.gradle
  config = withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      let contents = config.modResults.contents;

      // Force the ext variable
      contents = contents.replace(
        /kotlinVersion\s*=\s*findProperty\('android\.kotlinVersion'\)\s*\?:\s*['"]\d+\.\d+\.\d+['"]/g,
        "kotlinVersion = '1.9.24'"
      );

      // Force skip metadata check for ALL projects
      if (!contents.includes('Xskip-metadata-version-check')) {
        contents += `
allprojects {
    tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach {
        kotlinOptions {
            freeCompilerArgs += [
                "-P",
                "plugin:androidx.compose.compiler.plugins.kotlin:suppressKotlinVersionCompatibilityCheck=true",
                "-Xskip-metadata-version-check",
                "-Xskip-prerelease-check"
            ]
        }
    }
}
`;
      }

      config.modResults.contents = contents;
    }
    return config;
  });

  return config;
};

module.exports = withForcedKotlin;
