import { URL } from 'react-native-url-polyfill';

interface ICustomMethodReturnParams {
  match: boolean;
  strUrl: string;
}

export const REGEX_PRODUCT_URL = {
  IS_PRODUCT_URL: /(?:\b\/p\b.?)/gm,
  REMOVE_INVALID_WORDS: /\b\/p\b/gi,
} as const;

export const baseTabUrl = 'usereserva://home-tabs';

export const defaultInitialUrl = 'usereserva://home-tabs';

export const productUrl = 'usereserva://product?';

const defaultCustomMethodReturn: ICustomMethodReturnParams = {
  match: false,
  strUrl: defaultInitialUrl,
};

export const urlRon = (initialUrl: string): ICustomMethodReturnParams => {
  const isRonDomain = initialUrl.startsWith('https://usereserva.io/');

  if (isRonDomain) {
    return {
      match: true,
      strUrl: `usereserva://ron/${initialUrl.split('.io/')[1]!}`,
    };
  }

  return defaultCustomMethodReturn;
};

const urlSiteCase = (initialUrl: string): ICustomMethodReturnParams => {
  const isUrlSiteCase = initialUrl === 'https://www.usereserva.com'
    || initialUrl === 'http://www.usereserva.com'
    || initialUrl === 'www.usereserva.com'
    || initialUrl === 'http://usereserva.com'
    || initialUrl === 'https://usereserva.io'
    || initialUrl === 'http://usereserva.io';

  if (isUrlSiteCase) {
    return {
      match: true,
      strUrl: defaultInitialUrl,
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
      const splitOrderFormId = initialUrl
        .split('?orderFormId=')[1]
        .split('#/cart')[0];

      return {
        match: true,
        strUrl: `usereserva://bag/${splitOrderFormId}`,
      };
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

const registerMethods = [
  urlSiteCase,
  urlRon,
  urlProductCase,
  colectionUseCase,
  accountWishListUseCase,
  accountUseCase,
  cartUseCase,
  catalogCollectionUseCase,
  abandonedBagUseCase,
];

export { registerMethods };
