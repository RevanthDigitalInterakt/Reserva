/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
 const { getDefaultConfig } = require("metro-config");
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
      "cjs",
    ],
  }
};


// This allow to use external module as internal module, for example @usereservaapp/reserva-ui, uncomment to allow chances in real time. Usefull to test fixes.
// const path = require('path');
//  const extraNodeModules = {
//    'common': path.resolve(__dirname + '/../common'),
//  };
//  const watchFolders = [
//    path.resolve(__dirname + '/../common')
//  ];
//  module.exports = {
//    transformer: {
//      getTransformOptions: async () => ({
//        transform: {
//          experimentalImportSupport: false,
//          inlineRequires: false,
//        },
//      }),
//    },
//    resolver: {
//      extraNodeModules: new Proxy(extraNodeModules, {
//        get: (target, name) =>
//          redirects dependencies referenced from common/ to local node_modules
//          name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
//      }),
//    },
//    watchFolders,
//  };
