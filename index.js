/**
 * @format
 */

import 'react-native-get-random-values';
import { AppRegistry, BackHandler } from 'react-native';
import 'react-native-url-polyfill/auto';
import JailMonkey from 'jail-monkey';
import App from './src/App';
import { name as appName } from './app.json';
import onBackgroundEventPush from './src/utils/Notifee/BackgroundEvents';

if (JailMonkey.isJailBroken() && !__DEV__) {
  BackHandler.exitApp();
}

// if (__DEV__) {
// NativeModules.DevSettings.setIsDebuggingRemotely(false);
// }
onBackgroundEventPush();
AppRegistry.registerComponent(appName, () => App);
