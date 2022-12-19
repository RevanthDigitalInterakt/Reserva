import { URL } from "react-native-url-polyfill";

interface ICustomMethodReturnParams {
  match: boolean;
  strUrl: string;
}

export const REGEX_PRODUCT_URL = {
  _IS_PRODUCT_URL: /(?:\b\/p\b.?)/gm,
  _REMOVE_INVALID_WORDS: /\b\/p\b/gi,
} as const;

export const baseTabUrl = 'usereserva://home-tabs';

export const defaultInitialUrl = 'usereserva://home-tabs';

export const productUrl = `usereserva://product?`;

const defautlCustomMethodReturn: ICustomMethodReturnParams = {
  match: false,
  strUrl: defaultInitialUrl,
};

const urlSiteCase = (initialUrl: string): ICustomMethodReturnParams => {
  const isUrlSiteCase =
    initialUrl === 'https://www.usereserva.com' ||
    initialUrl === 'http://www.usereserva.com' ||
    initialUrl === 'www.usereserva.com' ||
    initialUrl === 'http://usereserva.com'
  if (isUrlSiteCase) {
    return {
      match: true,
      strUrl: defaultInitialUrl,
    };
  }
  return defautlCustomMethodReturn;
};

const urlProductCase = (initialUrl: string): ICustomMethodReturnParams => {
  const regex = new RegExp(REGEX_PRODUCT_URL._IS_PRODUCT_URL);

  if (regex.test(initialUrl.toLowerCase())) {
    const url = new URL(initialUrl);

    if (!url.search.length) {
      url.searchParams.append(
        'slug',
        url.pathname
          .replace(REGEX_PRODUCT_URL._REMOVE_INVALID_WORDS, '')
          .replace('/', '')
      );
    }

    return {
      match: true,
      strUrl: `${productUrl}${url.search.replace('?', '')}`
    };
  }

  return defautlCustomMethodReturn;
};

const colectionUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (initialUrl.endsWith('colecao-reserva/ofertas')) {
    return {
      match: true,
      strUrl: `${baseTabUrl}/ofertas`,
    };
  }

  return defautlCustomMethodReturn;
};

const accountWishListUseCase = (
  initialUrl: string
): ICustomMethodReturnParams => {
  if (initialUrl.includes('account#/wishlist')) {
    return {
      match: true,
      strUrl: `${baseTabUrl}/wishlist`,
    };
  }
  return defautlCustomMethodReturn;
};

const accountUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (initialUrl.includes('account#')) {
    return {
      match: true,
      strUrl: `${baseTabUrl}/profile`,
    };
  }

  return defautlCustomMethodReturn;
};

const catalogCollectionUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if(initialUrl.includes("catalog/collection")) {
    return {
      match: true,
      strUrl: initialUrl
    }
  }

  return defautlCustomMethodReturn
}

const cartUseCase = (initialUrl: string): ICustomMethodReturnParams => {
  if (initialUrl.includes("#/cart")) {
    if (initialUrl.includes("?orderFormId")) {
      const splitOrderFormId = initialUrl
        .split('?orderFormId=')[1]
        .split('#/cart')[0];

      return {
        match: true,
        strUrl: `usereserva://bag/${splitOrderFormId}`
      }
    }
  }

  return defautlCustomMethodReturn;
}

const registerMethods = [
  urlSiteCase,
  urlProductCase,
  colectionUseCase,
  accountWishListUseCase,
  accountUseCase,
  cartUseCase,
  catalogCollectionUseCase
];

export {registerMethods};
