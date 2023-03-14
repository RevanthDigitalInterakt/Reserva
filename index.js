/**
 * @format
 */

import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import onBackgroundEventPush from './src/utils/Notifee/BackgroundEvents';

onBackgroundEventPush();
AppRegistry.registerComponent(appName, () => App);
