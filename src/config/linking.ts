import { Linking, Platform } from 'react-native';
import {
  getPathFromState,
  type LinkingOptions,
} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import appsFlyer from 'react-native-appsflyer';
import { env } from './env';
import { deepLinkHelper } from '../utils/LinkingUtils/deepLinkHelper';
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
            NewOffersPage: 'colecao-ofertas',
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
        FacaVc: {
          path: 'facavc/criar/:category/:type/:custom',
        },
        Newsletter: {
          path: 'newsletter',
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
  prefixes: [
    'usereserva://',
    'https://www.usereserva.com/',
    'https://usereserva.io/',
    'https://now.usereserva.io/',
    'https://dito.vc/',
  ],
  config: routesConfig,
  getPathFromState(state) {
    return getPathFromState(state) || '';
  },
  async getInitialURL() {
    // Check if app was opened from a deep link
    const remoteMessage = await messaging().getInitialNotification();
    const { details } = JSON.parse(remoteMessage?.data?.data || '{}');
    const ditoDeeplinkUrl = details?.link || '';
    if (ditoDeeplinkUrl) {
      // TODO import { pushClicked } from '../../services/ditoService';
      // TODO implementar o pushClicked da dito
      return urlHandler(ditoDeeplinkUrl);
    }

    const url = await Linking.getInitialURL();

    if (url) {
      return urlHandler(url);
    }

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
      (_) => { },
      (_) => { },
    );

    const unsubscribeFCM = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        const { details } = JSON.parse(remoteMessage?.data?.data || '{}');
        const url = details?.link || '';
        // TODO testar com app minimizado
        // TODO import { pushClicked } from '../../services/ditoService';
        // TODO implementar o pushClicked da dito
        const newUrl = await deepLinkHelper(url);
        listener(newUrl);
      },
    );

    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
      onDeepLinkCanceller();
      unsubscribeFCM();
    };
  },
};
