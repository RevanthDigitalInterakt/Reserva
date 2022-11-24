import {
  getPathFromState,
  LinkingOptions,
  PathConfigMap,
} from '@react-navigation/native';
import { Alert, Linking, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { StoreUpdatePush } from '../modules/Update/pages/StoreUpdatePush';
import { URL } from 'react-native-url-polyfill';

const REGEX_PRODUCT_URL = {
  _IS_PRODUCT_URL: /(?:\b\/p\b.?)/gm,
  _REMOVE_INVALID_WORDS: /\b\/p\b/gi,
} as const;

const routesConfig = {
  screens: {
    Main: {
      initialRouteName: 'HomeTabs',
      screens: {
        WishList: 'wishlist',
        BagScreen: 'bag',
        HomeTabs: {
          path: 'home-tabs',
          screens: {
            Offers: 'ofertas',
            WishList: 'wishlist',
            Profile: 'profile',
            Call: 'call-center',
          },
        },
        ProductDetail: {
          path: 'product',
        },
        ProductCatalog: {
          path: 'catalog/:referenceId',
        },
        MY_CASHBACK_MY_WALLET: {
          path: 'wallet-cashback',
        },
      },
    },
  },
};
export const linkingConfig: LinkingOptions = {
  prefixes: ['usereserva://', 'https://www.usereserva.com/'],
  config: routesConfig,
  getPathFromState(state) {
    const path = getPathFromState(state);
    if (path) {
      return path;
    }
    return '';
  },
  // Push notification firebase
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      if (
        url === 'https://www.usereserva.com' ||
        url === 'https://www.usereserva.com/'
      ) {
        return 'usereserva://home-tabs';
      }

      if (REGEX_PRODUCT_URL._IS_PRODUCT_URL.test(url.toLowerCase())) {
        const productUrl = new URL(url);

        if (!productUrl.search.length) {
          productUrl.searchParams.append(
            'slug',
            productUrl.pathname
              .replace(REGEX_PRODUCT_URL._REMOVE_INVALID_WORDS, '')
              .replace('/', '')
          );
        }

        return `usereserva://product?${productUrl.search.replace('?', '')}`;
      }

      if (url.endsWith('colecao-reserva/ofertas')) {
        return 'usereserva://home-tabs';
      }

      if (url.includes('account#/wishlist')) {
        return 'usereserva://home-tabs/wishlist';
      }

      if (url.includes('account#')) {
        return 'usereserva://home-tabs/profile';
      }

      if (Platform.OS === 'ios') {
        Linking.openURL(url);
      }

      return 'usereserva://home-tabs';
    }

    // Check if there is an initial firebase notification
    // When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();

    //update app in store
    if (message?.data?.link === 'usereserva://storeUpdate') {
      StoreUpdatePush();
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
          if (url === 'usereserva://storeUpdate') {
            StoreUpdatePush();
          } else {
            listener(url);
          }
        }
      }
    );

    return () => {
      // Clean up the event listeners
      Linking.removeEventListener('url', onReceiveURL);
      unsubscribeNotification();
    };
  },
};
