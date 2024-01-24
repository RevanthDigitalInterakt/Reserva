module.exports = {
  branches: ['main', 'feat/onesignal-updated-v3', 'feat/final-branch'],
  plugins: [
    'semantic-release-react-native',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
  ],
};
