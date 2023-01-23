/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { getDefaultConfig } = require('metro-config');

const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();

// Uncomment for use @usereservaapp/reserva-ui from NPM
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    ...defaultResolver,
    sourceExts: [
      ...defaultResolver.sourceExts,
      'cjs',
    ],
  },
};
