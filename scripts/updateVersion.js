/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const BUILD_GRADLE_PATH = path.join(__dirname, '../android/app/build.gradle');
const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');

fs.readFile(BUILD_GRADLE_PATH, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading build.gradle:', err);
    process.exit(1);
  }

  const versionMatch = data.match(/versionName\s+"([^"]+)"/);
  if (!versionMatch) {
    console.error('Version not found in build.gradle');
    process.exit(1);
  }

  const version = versionMatch[1];

  fs.readFile(PACKAGE_JSON_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading package.json:', err);
      process.exit(1);
    }

    const packageJson = JSON.parse(data);
    packageJson.version = version;

    fs.writeFile(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to package.json:', err);
        process.exit(1);
      }

      console.log(`Version updated to ${version} in package.json`);
    });
  });
});
