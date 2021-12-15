/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { Linking, NativeModules, Platform } from 'react-native'
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage.data.link);
    Linking.openURL(remoteMessage.data.link)
    console.log('remoteMessage.data.link', remoteMessage.data.link)
});

AppRegistry.registerComponent(appName, () => App);
