/**
 * @format
 */

import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import 'react-native-url-polyfill/auto';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
