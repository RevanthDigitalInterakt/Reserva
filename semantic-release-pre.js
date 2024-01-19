module.exports = {
  branches: ['main', 'feat/onesignal-updated-v3'],
  plugins: [
    ['@semantic-release/git', {
      tag: false,
    }],
    'semantic-release-react-native',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
  ],
};
