module.exports = {
  branches: ['main'],
  plugins: [
    'semantic-release-react-native',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
  ],
};
