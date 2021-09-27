import { LinkingOptions } from '@react-navigation/native';

const routesConfig = {
  screens: {
    Main: {
      screens: {
        WishList: 'wishlist',
        Home: {
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
};
