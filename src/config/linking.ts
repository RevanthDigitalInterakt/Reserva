import { getPathFromState, LinkingOptions, PathConfigMap } from '@react-navigation/native';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { StoreUpdatePush } from '../modules/Update/pages/StoreUpdatePush'

const routesConfig= {
  screens: {

    Main: {

      screens: {
        WishList: 'wishlist',
        HomeTabs: {
          path: 'home',
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
          path: 'c/:path1/:path2/:path3',///:path4/:path5/:path6/:path7',
        },
      },
    },
  },
};
export const linkingConfig: LinkingOptions = {
  prefixes: ['usereserva://', 'https://www.usereserva.com/'],
  config: routesConfig,
  getPathFromState(state) {
    console.log('getInitialURL 2');
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

    if(url.includes('/p?')){
      // get query params from url
      const urlParams = url.split('/p?')[1]
      // const skuId = urlParams.searchParams.get('idsku');
      console.log('url product', url.split('/p?')[1])
      console.log('url product 1', `usereserva://product?${urlParams}`)
      return `usereserva://product?${urlParams}`;
    }

    if(url.includes('colecao-reserva/ofertas')){
      return 'usereserva://home/ofertas'
    }

    if(url.includes('account#/wishlist')){
      return 'usereserva://home/wishlist'
    }

    if(url.includes('account#')){
      return 'usereserva://home/profile'
    }

    console.log('getInitialURL 1', url);
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
