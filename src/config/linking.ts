import { Linking, Platform } from 'react-native';
import { getPathFromState, LinkingOptions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import appsFlyer from 'react-native-appsflyer';
import { StoreUpdatePush } from '../modules/Update/pages/StoreUpdatePush';
import { env } from './env';

import { deepLinkHelper } from '../utils/LinkingUtils/linkingUtils';
import { defaultInitialUrl } from '../utils/LinkingUtils/static/deepLinkMethods';
import { platformType } from '../utils/platformType';

const routesConfig = {
  screens: {
    Main: {
      initialRouteName: 'HomeTabs',
      screens: {
        WishList: 'wishlist',
        BagScreen: {
          path: 'bag/:orderFormId?',
        },
        RonRedirectToBag: {
          path: 'ron/:ronCode',
        },
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
  prefixes: ['usereserva://', 'https://www.usereserva.com/', 'https://usereserva.io/'],
  config: routesConfig,
  getPathFromState(state) {
    return getPathFromState(state) || '';
  },

  // Push notification firebase
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      const currentDeepLink = deepLinkHelper(url);

      if (currentDeepLink) return currentDeepLink;

      if (Platform.OS === platformType.IOS) {
        Linking.openURL(url);
      }

      return defaultInitialUrl;
    }

    // Check if there is an initial firebase notification
    // When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();

    // update app in store
    if (message?.data?.link === 'usereserva://storeUpdate') {
      StoreUpdatePush();
    }

    // Get deep link from data
    // if this is undefined, the app will open the default/home page
    return message?.data?.link;
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => {
      listener(deepLinkHelper(url) || defaultInitialUrl);
    };

    const onDeepLinkCanceller = appsFlyer.onDeepLink((res) => {
      if (res?.deepLinkStatus !== 'NOT_FOUND') {
        const url = res.data?.deep_link_value;
        if (url) {
          const newUrl = deepLinkHelper(url);
          if (newUrl) {
            listener(newUrl);
          }
        }
      }
    });

    appsFlyer.initSdk(
      {
        devKey: env.APPSFLYER.DEV_KEY,
        isDebug: false,
        appId: env.APPSFLYER.APP_ID,
        onInstallConversionDataListener: true,
        onDeepLinkListener: true,
        timeToWaitForATTUserAuthorization: 10,
      },
      (_) => {},
      (_) => {},
    );

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
      },
    );

    return () => {
      // Clean up the event listeners
      Linking.removeEventListener('url', onReceiveURL);
      unsubscribeNotification();
      onDeepLinkCanceller();
    };
  },
};
