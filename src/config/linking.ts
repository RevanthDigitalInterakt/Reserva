import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { StoreUpdatePush } from '../modules/Update/pages/StoreUpdatePush'

const routesConfig = {
  screens: {
    Main: {
      screens: {
        WishList: 'wishlist',
        HomeTabs: {
          path: 'home-tabs',
          screens: {
            Offers: 'offers',
            WishList: 'wishlist',
            Profile: 'profile',
            Call: 'call-center',
          },
        },
        ProductCatalog: {
          path: 'catalog/:referenceId',
        },
        ProductDetail: {
          path: 'product/:productId/:colorSelected',
        },
      },
    },
  },
};
export const linkingConfig: LinkingOptions = {
  prefixes: ['usereserva://', 'https://www.usereserva.com'],
  config: routesConfig,

  // Push notification firebase
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }

    // Check if there is an initial firebase notification
    // When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();

    //update app in store
    if (message?.data?.link === "usereserva://storeUpdate") {
      StoreUpdatePush()
    }

    // Get deep link from data
    // if this is undefined, the app will open the default/home page
    return message?.data?.link;
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    Linking.addEventListener('url', onReceiveURL);

    // Listen to firebase push notifications
    // When the application is running, but in the background.
    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      (message) => {
        const url = message?.data?.link;

        if (url) {
          // Any custom logic to check whether the URL needs to be handled
          // Call the listener to let React Navigation handle the URL
          if (url === "usereserva://storeUpdate") {
            StoreUpdatePush()
          } else {
            listener(url);
          }
        }
      },
    );

    return () => {
      // Clean up the event listeners
      Linking.removeEventListener('url', onReceiveURL);
      unsubscribeNotification();
    };
  },

}
