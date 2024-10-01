module.exports = {
  branches: ['main'],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "conventionalcommits",
      }
    ],
    'semantic-release-react-native',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
  ],
};
