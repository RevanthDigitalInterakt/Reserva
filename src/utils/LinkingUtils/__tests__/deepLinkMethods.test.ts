import { deepLinkHelper } from '../deepLinkHelper';
import {
  baseTabUrl,
  defaultInitialUrl,
  metaProductUrl,
  productUrlWithIdSku,
  productUrlWithProductId,
  productUrlWithSkuId,
  productUrlWithSlug,
} from '../static/deepLinkMethods';
import { EXPECTED_RESULT, INPUTS_LINKS } from '../../../../__mocks__/webViewLinks';
import { removeProtocol } from '../../removeProtocol';
import { getApolloClient } from '../../getApolloClient';
import { getAsyncStorageItem } from '../../../hooks/useAsyncStorageProvider';

const DONTMATCHURL = undefined;
const WEBVIEWOPEN = 'usereserva://webview/d?' as const;
const gclidMock = 'CjwKCAjwscGjBhAXEiwAswQqNA0NVqJjj06ySZzHJSIPweMbdI3WvOI494VVhr3vequoTkfLDf15TBoCy2AQAvD_BwE';
const orderformMock = '123';
const URL_HOME = 'https://www.usereserva.com';
const URL_HOME_VARIANT_1 = 'www.usereserva.com';
const URL_HOME_VARIANT_2 = 'http://usereserva.com';
const URL_HOME_VARIANT_3 = 'https://now.usereserva.io';
const URL_META = 'usereserva://';

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
  Platform.OS = 'android';
  return Platform;
});

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve('mockResolve')),
}));

jest.mock('../../../hooks/useRemoteConfig', () => ({
  useRemoteConfig: {
    getState: jest.fn(() => ({
      getBoolean: jest.fn(() => true),
    })),
  },
  syncRemoteConfig: jest.fn(),
}));

jest.mock('@datadog/mobile-react-native', () => ({
  DdLogs: {
    error: () => { },
  },
}));

jest.mock('../../../hooks/useAsyncStorageProvider', () => ({
  getAsyncStorageItem: jest.fn().mockReturnValue({ orderFormId: orderformMock }),
  setAsyncStorageItem: jest.fn().mockReturnValue({ orderFormId: orderformMock }),
}));

jest.mock('../../getApolloClient', () => ({
  getApolloClient: jest.fn(() => ({
    mutate: jest.fn(() => Promise.resolve({
      data: {
        orderFormAddMultipleItem: {
          orderFormId: orderformMock,
          items: [],
        },
      },
    })),
  })),
}));

describe('utils | LinkingUtils | executeDeepLinkcase', () => {
  test('should return default url', async () => {
    const result = await deepLinkHelper('');
    expect(result).toEqual(DONTMATCHURL);
  });

  test('should return default url when is another domain', async () => {
    const result = await deepLinkHelper('https://www.google.com.br');
    expect(result).toEqual(`${WEBVIEWOPEN}uri=www.google.com.br`);
  });

  test('should return default url HOME when call urlSiteCase', async () => {
    const expected1 = await deepLinkHelper(URL_HOME);
    const expected2 = await deepLinkHelper(`${URL_HOME}/`);
    const expected3 = await deepLinkHelper(URL_HOME_VARIANT_1);
    const expected4 = await deepLinkHelper(URL_HOME_VARIANT_2);

    expect(expected1).toEqual(defaultInitialUrl);
    expect(expected2).toEqual(defaultInitialUrl);
    expect(expected3).toEqual(defaultInitialUrl);
    expect(expected4).toEqual(defaultInitialUrl);
  });

  test('should return default url HOME when google gclid', async () => {
    const expected = await deepLinkHelper(`${URL_HOME}/?gclid=${gclidMock}`);
    expect(expected).toEqual(defaultInitialUrl);
  });

  describe('test urlRonCase ', () => {
    const code = 'code';

    test('with correct params', async () => {
      const result = await deepLinkHelper(`${URL_HOME_VARIANT_3}/${code}`);
      expect(result).toEqual(`usereserva://ron/${code}`);
    });

    test('without any params on url and platform ANDROID', async () => {
      const result = await deepLinkHelper(`${URL_HOME_VARIANT_3}`);
      expect(result).toEqual(defaultInitialUrl);
    });

    test('without any params on url and slash at end', async () => {
      const result = await deepLinkHelper(`${URL_HOME_VARIANT_3}`);
      expect(result).toEqual(defaultInitialUrl);
    });
  });

  describe('test cartAddItemUseCase ', () => {
    test('with correct params', async () => {
      const expectedUrl = `${URL_HOME}/checkout/cart/add/?sku=66155&qty=1&seller=1&sc=1`;

      const result = await deepLinkHelper(expectedUrl);
      const expectUrl = `${URL_META}bag/${orderformMock}`;
      expect(getApolloClient).toHaveBeenCalledTimes(1);
      expect(getAsyncStorageItem).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectUrl);
    });
  });

  describe('test urlPrimeCase ', () => {
    test('with correct params', async () => {
      const variant1 = await deepLinkHelper('https://usereserva.com/prime/');
      expect(variant1).toEqual('usereserva://prime');

      const variant2 = await deepLinkHelper('https://usereserva.com/prime');
      expect(variant2).toEqual('usereserva://prime');
    });

    test('with wrong domain', async () => {
      const result = await deepLinkHelper('https://usereserva.io/');
      expect(result).toEqual(defaultInitialUrl);
    });

    test('with wrong domain with params', async () => {
      const result = await deepLinkHelper('https://now.usereserva.io/prime');
      expect(result).toEqual('usereserva://prime');
    });

    test('with correct prefix but another path', async () => {
      const result = await deepLinkHelper('https://usereserva.com/prime/detalhe');
      expect(result).toEqual('usereserva://prime');
    });
  });

  describe('test urlProductCase ', () => {
    describe('when Query Params', () => {
      test('should return productUrl, query params skuId', async () => {
        const id = '340005';
        const expectedResult1 = `${productUrlWithSkuId}${id}`;
        const expectedResult2 = `${productUrlWithIdSku}${id}`;

        const result = await deepLinkHelper(
          `${URL_HOME}/mochila-bold-331-0056263/p?skuId=340005`,
        );

        const result2 = await deepLinkHelper(
          `${URL_HOME}/tenis-rsv-yankee0078812/p?idsku=340005`,
        );

        expect(result).toEqual(expectedResult1);
        expect(result2).toEqual(expectedResult2);
      });

      test('should return productUrl, query params skuid lowercase ', async () => {
        const expected = `${productUrlWithSkuId}3232`

        const result = await deepLinkHelper(
          `${URL_HOME}/mochila-bold-331-0056263/p?skuid=3232`,
        );

        expect(result).toEqual(expected);
      });

      test('should return productUrl, query params productId', async () => {
        const expectedQueryParams = '340005';
        const expectedResult = `${productUrlWithProductId}${expectedQueryParams}`;

        const result = await deepLinkHelper(
          `${URL_HOME}/mochila-bold-331-0056263/p?productId=340005`,
        );

        expect(result).toEqual(expectedResult);
      });

      describe('when not Query Params', () => {
        test('should return productUrl, without query params and slug param', async () => {
          const productSlug = 'mochila-bold-331-0056263';

          const expectedResult = `${productUrlWithSlug}${productSlug}`;

          const result = await deepLinkHelper(
            `${URL_HOME}/${productSlug}/p`,
          );

          expect(result).toEqual(expectedResult);
        });

        test('should return productUrl, query params srsltid', async () => {
          const productSlug = 'tenis-rsv-r-broox-l-e-0088509';

          const expectedResult = `${productUrlWithSlug}${productSlug}`;

          const input = `${URL_HOME}/tenis-rsv-r-broox-l-e-0088509/p?srsltid=token`

          const result = await deepLinkHelper(input);

          expect(result).toEqual(expectedResult);
        });

        test('should return productUrl, query params changes', async () => {
          const productSlug = 'tenis-rsv-r-broox-l-e-0088509';

          const expectedResult = `${productUrlWithSlug}${productSlug}`;

          const input = `${URL_HOME}/tenis-rsv-r-broox-l-e-0088509/p?gad_source=token&gbraid=123456`

          const result = await deepLinkHelper(input);

          expect(result).toEqual(expectedResult);
        });
      });
    });
  });

  describe('test urlMetaProductCase', () => {
    test('should return productUrl', async () => {
      const expectedQueryParams = 'tenis-simples-2-0-mini0061050';
      const expectedResult = `${metaProductUrl}${expectedQueryParams}`;

      const result = await deepLinkHelper(
        `${URL_META}product?slug=${expectedQueryParams}`,
      );

      expect(result).toEqual(expectedResult);
    });
  });

  test('should return default url when call colectionUseCase', async () => {
    const endsWithColection = await deepLinkHelper(
      `${URL_HOME}/colecao-reserva/ofertas`,
    );
    expect(endsWithColection).toEqual(`${baseTabUrl}/ofertas`);
  });

  describe('test account use cases', () => {
    const baseUrlAccount = `${URL_HOME}/account#`;

    test('should return wishlist use case', async () => {
      const urlWishList = `${baseUrlAccount}/wishlist`;

      const result = await deepLinkHelper(urlWishList);
      expect(result).toEqual(`${baseTabUrl}/wishlist`);
    });

    test('should return account use case', async () => {
      const result = await deepLinkHelper(baseUrlAccount);
      expect(result).toEqual(`${baseTabUrl}/profile`);
    });

    test('should return cart use case', async () => {
      const orderFormId = 'dasdasd-321-312312';
      const successCartUrl = await deepLinkHelper(
        `${URL_HOME}/#/cart?orderFormId=${orderFormId}`,
      );
      const badCardUrl = await deepLinkHelper(`${URL_HOME}/#/cart?`);

      expect(successCartUrl).toEqual(`usereserva://bag/${orderFormId}`);
      expect(badCardUrl).toEqual(`${WEBVIEWOPEN}uri=${URL_HOME_VARIANT_1}/#/cart?`);
    });

    test('should return collection catalog use case', async () => {
      const collectionCase = 'usereserva://catalog/collection:1627';

      const result = await deepLinkHelper(collectionCase);

      expect(result).toEqual(collectionCase);
    });
  });

  describe('test async deeplink catalog use case', () => {
    INPUTS_LINKS.forEach(async (deepLink: string, index) => {
      test(`Test ${deepLink} when open in web catalog collection use case`, async () => {
        const deepLinkHelperResult = await deepLinkHelper(deepLink);
        expect(deepLinkHelperResult).toEqual(`usereserva://asyncDeepLink/CATALOG?params=${EXPECTED_RESULT[index]}&initialUrl=${removeProtocol(INPUTS_LINKS[index]!)}`);
      });
    });
    describe('when has three paths', () => {
      test('should return web catalog collection use case', async () => {
        const notEndWithColection = await deepLinkHelper(
          `${URL_HOME}/colecao-reserva/ofertas/novo-path`,
        );
        expect(notEndWithColection).toEqual('usereserva://asyncDeepLink/CATALOG?params=|colecao-reserva|ofertas|novo-path&initialUrl=www.usereserva.com/colecao-reserva/ofertas/novo-path');
      });
    });
  });

  describe('test async deeplink facavc use case', () => {
    test('should redirect to FacaVc page', async () => {
      const facaVoceCase = 'usereserva://facavc/criar';
      const result = await deepLinkHelper(facaVoceCase);

      expect(result).toEqual(facaVoceCase.concat('/null/null/null'));
    });

    test('should redirect to FacaVc page case 1', async () => {
      const facaVoceCase = 'usereserva://facavc/criar/test';
      const result = await deepLinkHelper(facaVoceCase);

      expect(result).toEqual(facaVoceCase.concat('/null/null'));
    });

    test('should redirect to FacaVc page case 2', async () => {
      const facaVoceCase = 'usereserva://facavc/criar/test/testeb';
      const result = await deepLinkHelper(facaVoceCase);

      expect(result).toEqual(facaVoceCase.concat('/null'));
    });

    test('should redirect to FacaVc page case 3', async () => {
      const facaVoceCase = 'usereserva://facavc/criar/test/testeb/testec';
      const result = await deepLinkHelper(facaVoceCase);

      expect(result).toEqual(facaVoceCase);
    });

    test('should redirect to FacaVc page case 4', async () => {
      const facaVoceCase = 'usereserva://facavc/criar/test/testeb/testec/other';
      const expectFacaVoceCase = 'usereserva://facavc/criar/test/testeb/testec';
      const result = await deepLinkHelper(facaVoceCase);

      expect(result).toEqual(expectFacaVoceCase);
    });
  });

  describe('test deep link newsletter use case', () => {
    test('should return Newsletter page', async () => {
      const newsletter = 'usereserva://newsletter';
      const result = await deepLinkHelper(newsletter);

      expect(result).toEqual(newsletter);
    });
  });
});
