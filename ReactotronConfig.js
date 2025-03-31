// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron
  .configure()
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect();

console.tron = Reactotron;

console.log = (...args) => {
  console.tron.log(...args);
};

export default reactotron;
