import { URL } from 'react-native-url-polyfill';
import { Platform } from 'react-native';
import { platformType } from '../../platformType';
import { removeProtocol } from '../../removeProtocol';

interface ICustomMethodReturnParams {
  match: boolean;
  strUrl: string;
}

export const REGEX_PRODUCT_URL = {
  IS_PRODUCT_URL: /(?:\b\/p\b.?)/gm,
  REMOVE_INVALID_WORDS: /\b\/p\b/gi,
  IS_META_PRODUCT_URL: /product\?slug/gm,
} as const;

export const REGEX_VALID_URL = /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/gi;

export const baseTabUrl = 'usereserva://home-tabs';

export const defaultInitialUrl = 'usereserva://home-tabs';

export const webCatalogUrl = 'https://www.usereserva.com/catalog/';

export const productUrl = 'usereserva://product?';

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

export const urlLandingPagePrime = (initialUrl: string): ICustomMethodReturnParams => {
  try {
    const url = new URL(initialUrl);

    return url.pathname === '/prime'
      ? { match: true, strUrl: 'usereserva://prime' }
      : defaultCustomMethodReturn;
  } catch (err) {
    return defaultCustomMethodReturn;
  }
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

    if (!url.search.length) {
      url.searchParams.append(
        'slug',
        url.pathname
          .replace(REGEX_PRODUCT_URL.REMOVE_INVALID_WORDS, '')
          .replace('/', ''),
      );
    }

    return {
      match: true,
      strUrl: `${productUrl}${url.search.replace('?', '')}`,
    };
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

const cartUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (initialUrl.includes('#/cart')) {
    if (initialUrl.includes('?orderFormId')) {
      const splitOrderFormId = initialUrl.split('?orderFormId=')[1];
      if (splitOrderFormId) {
        const splitCart = splitOrderFormId.split('#/cart')[0];
        return {
          match: true,
          strUrl: `usereserva://bag/${splitCart}`,
        };
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

const registerMethods = [
  urlSiteCase,
  urlGoogleGclidCase,
  urlRon,
  urlLandingPagePrime,
  urlProductCase,
  urlMetaProductCase,
  colectionUseCase,
  accountWishListUseCase,
  accountUseCase,
  cartUseCase,
  catalogCollectionUseCase,
  abandonedBagUseCase,
  webCatalogCollectionUseCase,
  webviewDeepLinkUseCase,
];

export { registerMethods };
