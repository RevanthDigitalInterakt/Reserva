import { Linking, Platform } from 'react-native';
import { getPathFromState, type LinkingOptions } from '@react-navigation/native';
import appsFlyer from 'react-native-appsflyer';
import { env } from './env';
import messaging from '@react-native-firebase/messaging';

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
        AsyncDeepLink: {
          path: 'asyncDeepLink/:reducerKey',
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
        PrimeLP: {
          path: 'prime',
        },
      },
    },
  },
};

export const urlHandler = async (url: string) => {
  const currentDeepLink = await deepLinkHelper(url);
  if (currentDeepLink) return currentDeepLink;

  if (Platform.OS === platformType.IOS) {
    Linking.openURL(url);
  }

  return defaultInitialUrl;
};

export const linkingConfig: LinkingOptions = {
  prefixes: ['usereserva://', 'https://www.usereserva.com/', 'https://usereserva.io/', 'https://now.usereserva.io/'],
  config: routesConfig,
  getPathFromState(state) {
    return getPathFromState(state) || '';
  },
  async getInitialURL() {
    // Check if app was opened from a deep link
    const remoteMessage = await messaging().getInitialNotification();
    const { details } = JSON.parse(remoteMessage?.data?.data || '{}');
    const link = details?.link || '';

    if(remoteMessage) return urlHandler(link);

    return undefined;
  },
  subscribe(listener) {
    const onReceiveURL = async ({ url }: { url: string }) => {
      const currentDeepLink = await deepLinkHelper(url);

      if (!currentDeepLink) {
        if (Platform.OS === platformType.IOS) {
          Linking.openURL(url);
        }
      }

      listener(currentDeepLink || defaultInitialUrl);
    };

    const onDeepLinkCanceller = appsFlyer.onDeepLink(async (res) => {
      if (res?.deepLinkStatus !== 'NOT_FOUND') {
        const url = res.data?.deep_link_value;
        if (url) {
          const newUrl = await deepLinkHelper(url);
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

    const subFcm = messaging().onNotificationOpenedApp(async (remoteMessage) => {
      const { details } = JSON.parse(remoteMessage?.data?.data || '{}');
      const link = details?.link || '';   
      console.log('link',link);
              
      listener(link);
    });
    // Listen to incoming links from deep linking
    const subscription = Linking.addEventListener('url', onReceiveURL);

    return () => {
      // Clean up the event listeners
      subscription.remove();
      onDeepLinkCanceller();
      subFcm()
    };
  },
};
