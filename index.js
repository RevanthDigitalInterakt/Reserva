/**
 * @format
 */

import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// if (__DEV__) {
// NativeModules.DevSettings.setIsDebuggingRemotely(false);
// }

AppRegistry.registerComponent(appName, () => App);
