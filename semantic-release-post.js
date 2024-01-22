module.exports = {
  branches: ['main', 'feat/onesignal-updated-v3', 'feat/final-branch'],
  plugins: [
    ['@semantic-release/git', {
      // eslint-disable-next-line no-template-curly-in-string
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      assets: [
        'ios/reserva/Info.plist',
        'ios/OneSignalNotificationServiceExtension/Info.plist',
        'ios/reserva.xcodeproj/project.pbxproj',
        'ios/reservaTests/Info.plist',
        'android/app/build.gradle',
        'package.json',
        'CHANGELOG.md',
      ],
    }],
  ],
};
