import { URL } from 'react-native-url-polyfill';
import { Platform } from 'react-native';
import { platformType } from '../../platformType';
import { removeProtocol } from '../../removeProtocol';
import { getAsyncStorageItem, setAsyncStorageItem } from '../../../hooks/useAsyncStorageProvider';
import { getApolloClient } from '../../getApolloClient';
import {
  OrderFormDocument,
  OrderFormAddMultipleItemDocument,
  type OrderFormQuery,
  type OrderFormQueryVariables,
  type OrderFormAddMultipleItemMutation,
  type OrderFormAddMultipleItemMutationVariables,
  type OrderformAddMultipleItemInfoInput,
  DitoRedirectDocument,
  type DitoRedirectQuery,
  type DitoRedirectQueryVariables,
  DitoRedirectTypeEnum,
} from '../../../base/graphql/generated';
import { mergeItemsPackage } from '../../mergeItemsPackage';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { syncRemoteConfig, useRemoteConfig } from '../../../hooks/useRemoteConfig';
import * as linkingUtils from '../linkingUtils';

const { getBoolean } = useRemoteConfig.getState();

export interface ICustomMethodReturnParams {
  match: boolean;
  strUrl?: string;
}

export const REGEX_PRODUCT_URL = {
  IS_PRODUCT_URL: /\/p\b/gm,
  REMOVE_INVALID_WORDS: /\/p\b/gi,
  IS_META_PRODUCT_URL: /product\?slug/gm,
} as const;

export const REGEX_VALID_URL = /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/gi;

export const baseTabUrl = 'usereserva://home-tabs';

export const defaultInitialUrl = 'usereserva://home-tabs';

export const webCatalogUrl = 'https://www.usereserva.com/catalog/';

export const productUrlWithSlug = 'usereserva://product?slug=';

export const productUrlWithSkuId = 'usereserva://product?skuId=';

export const productUrlWithIdSku = 'usereserva://product?idsku=';

export const productUrlWithProductId = 'usereserva://product?productId=';


export const metaProductUrl = 'usereserva://product?slug=';

const defaultCustomMethodReturn: ICustomMethodReturnParams = {
  match: false,
  strUrl: defaultInitialUrl,
};

export const urlRon = (initialUrl: string): ICustomMethodReturnParams => {
  const isRonDomain = initialUrl.startsWith('https://now.usereserva.io/');

  if (isRonDomain) {
    return {
      match: true,
      strUrl: `usereserva://ron/${initialUrl.split('.io/')[1]!}`,
    };
  }

  return defaultCustomMethodReturn;
};

export const urlLandingPagePrime = (
  initialUrl: string,
): ICustomMethodReturnParams => {
  if (initialUrl.includes('/prime')) {
    try {
      return {
        match: true,
        strUrl: 'usereserva://prime',
      };
    } catch (err) {
      return defaultCustomMethodReturn;
    }
  }

  return defaultCustomMethodReturn;
};

const newsLetterUseCase = (
  initialUrl: string,
): ICustomMethodReturnParams => {
  if (initialUrl.includes('/newsletter')) {
    try {
      const queryString = initialUrl.split('?')[1];

      if (queryString) {
        setAsyncStorageItem('@Newsletter:IdCampaign', queryString);
      }

      return {
        match: true,
        strUrl: 'usereserva://newsletter',
      };
    } catch (err) {
      return defaultCustomMethodReturn;
    }
  }

  return defaultCustomMethodReturn;
};

const urlSiteCase = (initialUrl: string): ICustomMethodReturnParams => {
  const isUrlSiteCase = initialUrl === 'https://www.usereserva.com'
    || initialUrl === 'http://www.usereserva.com'
    || initialUrl === 'www.usereserva.com'
    || initialUrl === 'http://usereserva.com'
    || initialUrl === 'https://usereserva.io'
    || initialUrl === 'http://usereserva.io'
    || initialUrl === 'https://now.usereserva.io'
    || initialUrl === 'http://now.usereserva.io';

  if (isUrlSiteCase) {
    return {
      match: true,
      strUrl: defaultInitialUrl,
    };
  }

  return defaultCustomMethodReturn;
};

const urlGoogleGclidCase = (initialUrl: string): ICustomMethodReturnParams => {
  const isHomeSiteWithGclidGoogle = initialUrl.split('/?gclid')[0] === 'https://www.usereserva.com';

  if (isHomeSiteWithGclidGoogle) {
    return {
      match: true,
      strUrl: defaultInitialUrl,
    };
  }

  return defaultCustomMethodReturn;
};

const urlMetaProductCase = (initialUrl: string): ICustomMethodReturnParams => {
  const regex = new RegExp(REGEX_PRODUCT_URL.IS_META_PRODUCT_URL);

  if (regex.test(initialUrl.toLowerCase())) {
    return {
      match: true,
      strUrl: `${initialUrl}`,
    };
  }

  return defaultCustomMethodReturn;
};

const urlProductCase = (initialUrl: string): ICustomMethodReturnParams => {
  const regex = new RegExp(REGEX_PRODUCT_URL.IS_PRODUCT_URL);

  if (regex.test(initialUrl.toLowerCase())) {
    const url = new URL(initialUrl);

    const productId = url.searchParams.get('productId');
    if (productId) {
      return {
        match: true,
        strUrl: `${productUrlWithProductId}${productId}`,
      };
    }

    const skuId = url.searchParams.get('skuId') || url.searchParams.get('skuid')
    if (skuId) {
      return {
        match: true,
        strUrl: `${productUrlWithSkuId}${skuId}`,
      };
    }

    const idSku = url.searchParams.get('idsku')
    if (idSku) {
      return {
        match: true,
        strUrl: `${productUrlWithIdSku}${idSku}`,
      };
    }

    const slug = url.pathname
      .replace(REGEX_PRODUCT_URL.REMOVE_INVALID_WORDS, '')
      .replace(/^\//, '');

    if (slug) {
      return {
        match: true,
        strUrl: `${productUrlWithSlug}${slug}`,
      };
    }
  }

  return defaultCustomMethodReturn;
};

const colectionUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (initialUrl.endsWith('colecao-reserva/ofertas')) {
    return {
      match: true,
      strUrl: `${baseTabUrl}/ofertas`,
    };
  }

  return defaultCustomMethodReturn;
};

const newOffersPageUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (initialUrl.endsWith('/colecao-ofertas')) {
    return {
      match: true,
      strUrl: `${baseTabUrl}/colecao-ofertas`,
    };
  }

  return defaultCustomMethodReturn;
};

// const clusterCollectionUseCase = async (initialUrl: string):
//  Promise<ICustomMethodReturnParams> => {
//   const splitPath = initialUrl.split('//')[1];
//   const res = await fetch(`https://www.usereserva.com/${splitPath}`);
//   const clusterId = (await res?.text())?.split('productClusterIds')[0]
//     ?.split('queryField')[1]
//     ?.replace(/\\\"/g, '')
//     .replace(':', '')
//     .split(',')[0];

// const $ = cheerio.load(html);

// Procurar pelo productClusterId no HTML
// Procurar pelo productClusterId no HTML
// let clusterId;
// $('script').each((i, script) => {
//   const content = $(script).html();
//   if (content.includes('productClusterIds')) {
//     // Tentar analisar como JSON
//     const jsonMatch = content.match(/\{.*"productClusterIds":\["(\d+)"\].*\}/);
//     if (jsonMatch) {
//       const jsonData = JSON.parse(jsonMatch[0]);
//       clusterId = jsonData.productClusterIds[0];
//       return false; // Interromper o loop quando encontrar
//     }
//   }
// });
// const clusterId = (await res?.text())?.split('productClusterIds')[0]
//   ?.split('queryField')[1]
//   ?.replace(/\\\"/g, '')
//   .replace(':', '')
//   .split(',')[0];

// if (initialUrl.includes('/colecao-')) {
//   return {
//     match: true,
//     strUrl: `usereserva://catalog/collection:${clusterId}`,
//   };
// }

//   return defaultCustomMethodReturn;
// };

const accountWishListUseCase = (
  initialUrl: string,
): ICustomMethodReturnParams => {
  if (initialUrl.includes('account#/wishlist')) {
    return {
      match: true,
      strUrl: `${baseTabUrl}/wishlist`,
    };
  }
  return defaultCustomMethodReturn;
};

const accountUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (initialUrl.includes('account#')) {
    return {
      match: true,
      strUrl: `${baseTabUrl}/profile`,
    };
  }

  return defaultCustomMethodReturn;
};

const catalogCollectionUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (initialUrl.includes('catalog/collection')) {
    return {
      match: true,
      strUrl: initialUrl,
    };
  }

  return defaultCustomMethodReturn;
};

const cartUseCase = async (initialUrl: string): Promise<ICustomMethodReturnParams> => {
  if (initialUrl.includes('#/cart')) {
    if (initialUrl.includes('?orderFormId')) {
      const splitOrderFormId = initialUrl.split('?orderFormId=')[1];
      if (splitOrderFormId) {
        const splitCart = splitOrderFormId.split('#/cart')[0] || '';
        await setAsyncStorageItem('orderFormId', splitCart);
        return {
          match: true,
          strUrl: `usereserva://bag/${splitCart}`,
        };
      }
    }
  }

  return defaultCustomMethodReturn;
};

const restoreCartUseCase = async (initialUrl: string): Promise<ICustomMethodReturnParams> => {
  if (initialUrl.includes('#/cart') && initialUrl.includes('checkout')) {
    const orderFormId = await getAsyncStorageItem('orderFormId');
    if (orderFormId) {
      const { data } = await getApolloClient().query<OrderFormQuery, OrderFormQueryVariables>({
        query: OrderFormDocument,
        fetchPolicy: 'no-cache',
        variables: { orderFormId },
        context: { clientName: 'gateway' },
      });

      const { orderForm: { packageItems } } = data;

      const mergedItems = mergeItemsPackage(packageItems);
      if (mergedItems.length) {
        return {
          match: true,
          strUrl: `usereserva://bag/${orderFormId}`,
        };
      }
    }
  }

  return defaultCustomMethodReturn;
};

const cartAddItemUseCase = async (initialUrl: string): Promise<ICustomMethodReturnParams> => {
  if (initialUrl.includes('/checkout/cart/add/?sku=')) {
    const url = initialUrl;
    const queryString = url.split('?')[1];
    const payload: { [key: string]: any } = {};

    let currentSkuId: string | null | undefined = null;

    queryString?.split('&').forEach((item) => {
      const [key, value] = item.split('=').map(decodeURIComponent);

      if (key === 'sku') {
        currentSkuId = value;

        payload[`${key}-${value}`] = {
          id: value,
        };
      }

      if (key === 'qty') {
        payload[`sku-${currentSkuId}`] = {
          ...payload[`sku-${currentSkuId}`],
          quantity: Number(value),
        };
      }

      if (key === 'seller') {
        payload[`sku-${currentSkuId}`] = {
          ...payload[`sku-${currentSkuId}`],
          seller: value,
        };
      }
    });

    const orderFormId = await getAsyncStorageItem('orderFormId');

    const orderItems = Object.values(payload) as OrderformAddMultipleItemInfoInput[];

    if (orderFormId) {
      const input = {
        orderFormId,
        orderItems,
      };

      try {
        const { data } = await getApolloClient().mutate<
          OrderFormAddMultipleItemMutation,
          OrderFormAddMultipleItemMutationVariables>({
            mutation: OrderFormAddMultipleItemDocument,
            context: { clientName: 'gateway' },
            variables: {
              input,
            },
          });

        const { orderFormAddMultipleItem: orderForm } = data || {};

        return {
          match: true,
          strUrl: `usereserva://bag/${orderForm?.orderFormId}`,
        };
      } catch (error) {
        ExceptionProvider.captureException(error, "cartAddItemUseCase - deepLinkMethods.ts",{ deeplink: initialUrl});
        return defaultCustomMethodReturn;
      }
    }
  }

  return defaultCustomMethodReturn;
};

const ditoRedirectCartUseCase = async (initialUrl: string): Promise<ICustomMethodReturnParams> => {
  if (initialUrl.includes('dito.vc')) {
    const code = new URL(initialUrl).pathname.substring(1);

    if (code) {
      const {
        data: dataDitoRedirect,
      } = await getApolloClient().query<DitoRedirectQuery, DitoRedirectQueryVariables>({
        query: DitoRedirectDocument,
        fetchPolicy: 'no-cache',
        variables: { code },
        context: { clientName: 'gateway' },
      });

      const { ditoRedirect } = dataDitoRedirect;

      if (ditoRedirect?.type === DitoRedirectTypeEnum.RestoreCart) {
        const orderFormId = await getAsyncStorageItem('orderFormId');

        if (orderFormId) {
          const {
            data: dataOrderForm,
          } = await getApolloClient().query<OrderFormQuery, OrderFormQueryVariables>({
            query: OrderFormDocument,
            fetchPolicy: 'no-cache',
            variables: { orderFormId },
            context: { clientName: 'gateway' },
          });

          const { orderForm: { packageItems } } = dataOrderForm;

          const mergedItems = mergeItemsPackage(packageItems);

          if (mergedItems.length) {
            return {
              match: true,
              strUrl: `usereserva://bag/${orderFormId}`,
            };
          }
        }
      }
    }
  }

  return defaultCustomMethodReturn;
};

const abandonedBagUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (initialUrl.includes('bag')) {
    return {
      match: true,
      strUrl: initialUrl,
    };
  }
  return defaultCustomMethodReturn;
};

const webCatalogCollectionUseCase = async (initialUrl: string) => {
  if (!initialUrl) {
    return defaultCustomMethodReturn;
  }

  const searchRegExp = /\//g;
  const replacePathName = '|';

  const { pathname } = new URL(initialUrl);

  const noHasPathName = pathname === '/';

  if (noHasPathName) {
    return defaultCustomMethodReturn;
  }

  const newPathName = pathname?.replace(searchRegExp, replacePathName);

  if (newPathName !== '|') {
    return {
      match: true,
      strUrl: `usereserva://asyncDeepLink/CATALOG?params=${newPathName}&initialUrl=${removeProtocol(initialUrl)}`,
    };
  }
  return defaultCustomMethodReturn;
};

const webviewDeepLinkUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (Platform.OS === platformType.ANDROID) {
    const regexValidURL = new RegExp(REGEX_VALID_URL);
    let currentURl = initialUrl;
    if (regexValidURL.test(currentURl)) {
      currentURl = removeProtocol(currentURl);

      return {
        match: true,
        strUrl: `usereserva://webview/d?uri=${currentURl}`,
      };
    }
  }

  return defaultCustomMethodReturn;
};

const webViewFacaVcUseCase = async (initialUrl: string): Promise<ICustomMethodReturnParams> => {
  await syncRemoteConfig();
  const showWebviewFacavc = getBoolean('show_webview_facavc');
  const facaVcPath = 'facavc/criar';

  if (initialUrl.includes(facaVcPath) && showWebviewFacavc) {
    const numbersOfPathParams = 3;
    const handleInitialUrlParams = linkingUtils.handlePathsParams(
      initialUrl,
      facaVcPath,
      numbersOfPathParams,
    );
    const aditionalParams = linkingUtils.splitPathParams(
      handleInitialUrlParams,
      facaVcPath,
    );

    return {
      match: true,
      strUrl: `usereserva://facavc/criar${aditionalParams}`,
    };
  }

  return defaultCustomMethodReturn;
};

const registerMethods = [
  newOffersPageUseCase,
  urlLandingPagePrime,
  newsLetterUseCase,
  urlSiteCase,
  webViewFacaVcUseCase,
  urlGoogleGclidCase,
  urlRon,
  urlProductCase,
  urlMetaProductCase,
  colectionUseCase,
  accountWishListUseCase,
  accountUseCase,
  cartAddItemUseCase,
  ditoRedirectCartUseCase,
  cartUseCase,
  restoreCartUseCase,
  catalogCollectionUseCase,
  abandonedBagUseCase,
  webCatalogCollectionUseCase,
  webviewDeepLinkUseCase,
  // clusterCollectionUseCase,
];

export { registerMethods };
