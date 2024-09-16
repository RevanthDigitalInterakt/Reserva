module.exports = {
  branches: ['feat/refact-pipeline'],
  plugins: [
    'semantic-release-react-native',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
  ],
};
