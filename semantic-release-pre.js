module.exports = {
  branches: ['feat/refact-pipeline'],
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
