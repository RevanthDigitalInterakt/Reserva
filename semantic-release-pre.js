module.exports = {
  branches: ['main', 'feat/onesignal-updated-v3'],
  plugins: [
    ['@semantic-release/exec', {
      publishCmd: 'echo "ignore publish."',
    }],
    'semantic-release-react-native',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
  ],
};
