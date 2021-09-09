import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import ReactotronFlipper from '../../node_modules/reactotron-react-native/dist/flipper';
import RNAsyncStorageFlipper from 'rn-async-storage-flipper';

declare global {
  interface Console {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tron: any;
  }
}

if (__DEV__) {
  RNAsyncStorageFlipper(AsyncStorage);
  console.tron = Reactotron
    .configure({
      name: "Reserva App",
      createSocket: (path) => new ReactotronFlipper(path)
    })
    .use(reactotronRedux())
    .use(sagaPlugin({except: ['']}))
    .useReactNative({
      asyncStorage: {
        ignore: ['secret']
      }
    })
    .connect();

  if (console.tron) {
    console.tron.setAsyncStorageHandler(AsyncStorage);
    console.tron.clear?.();
  }
}