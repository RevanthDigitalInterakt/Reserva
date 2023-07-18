module.exports = {
  dependency: {
    assets: ['./node_modules/@usereservaapp/reserva-ui/.storybook/fonts'],
    ...(process.env.NO_FLIPPER ? { 'react-native-flipper': { platforms: { ios: null } } } : {})
  },
};
