import { deepLinkHelper } from '../linkingUtils';
import {
  baseTabUrl,
  defaultInitialUrl,
  productUrl,
} from '../static/deepLinkMethods';
import { INPUTS_LINKS, EXPECTED_RESULT } from '../../../../__mocks__/webViewLinks';
import { removeProtocol } from '../../removeProtocol';

const DONTMATCHURL = undefined;
const WEBVIEWOPEN = 'usereserva://webview/d?' as const;

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
  Platform.OS = 'android';
  return Platform;
});

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
    const expected1 = await deepLinkHelper('https://www.usereserva.com');
    const expected2 = await deepLinkHelper('https://www.usereserva.com/');
    const expected3 = await deepLinkHelper('www.usereserva.com');
    const expected4 = await deepLinkHelper('http://usereserva.com');

    expect(expected1).toEqual(defaultInitialUrl);
    expect(expected2).toEqual(defaultInitialUrl);
    expect(expected3).toEqual(defaultInitialUrl);
    expect(expected4).toEqual(defaultInitialUrl);
  });

  describe('test urlRonCase ', () => {
    const code = 'code';

    test('with correct params', async () => {
      const result = await deepLinkHelper(`https://usereserva.io/${code}`);
      expect(result).toEqual(`usereserva://ron/${code}`);
    });

    test('without any params on url', async () => {
      const result = await deepLinkHelper('https://usereserva.io');
      expect(result).toEqual(defaultInitialUrl);
    });

    test('without any params on url and slash at end', async () => {
      const result = await deepLinkHelper('https://usereserva.io/');
      expect(result).toEqual(defaultInitialUrl);
    });
  });

  describe('test urlProductCase ', () => {
    describe('when Query Params', () => {
      test('should return productUrl, query params skuId', async () => {
        const expectedQueryParams = 'skuId=340005';
        const expectedResult = `${productUrl}${expectedQueryParams}`;

        const result = await deepLinkHelper(
          `https://www.usereserva.com/mochila-bold-331-0056263/p?${expectedQueryParams}`,
        );

        expect(result).toEqual(expectedResult);
      });

      test('should return productUrl, query params skuid lowercase ', async () => {
        const result = await deepLinkHelper(
          'https://www.usereserva.com/mochila-bold-331-0056263/p?skuid=3232',
        );

        expect(result).toEqual(`${productUrl}skuid=3232`);
      });

      test('should return productUrl, query params productId', async () => {
        const expectedQueryParams = 'productId=340005';
        const expectedResult = `${productUrl}${expectedQueryParams}`;

        const result = await deepLinkHelper(
          `https://www.usereserva.com/mochila-bold-331-0056263/p?${expectedQueryParams}`,
        );

        expect(result).toEqual(expectedResult);
      });

      describe('when not Query Params', () => {
        test('should return productUrl, without query params and slug param', async () => {
          const productSlug = 'mochila-bold-331-0056263';

          const expectedResult = `${productUrl}slug=${productSlug}`;

          const result = await deepLinkHelper(
            `https://www.usereserva.com/${productSlug}/p`,
          );

          expect(result).toEqual(expectedResult);
        });
      });
    });
  });

  test('should return default url when call colectionUseCase', async () => {
    const endsWithColection = await deepLinkHelper(
      'https://www.usereserva.com/colecao-reserva/ofertas',
    );
    expect(endsWithColection).toEqual(`${baseTabUrl}/ofertas`);
  });

  describe('test account use cases', () => {
    const baseUrlAccount = 'https://www.usereserva.com/account#';

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
        `https://www.usereserva.com/#/cart?orderFormId=${orderFormId}`,
      );
      const badCardUrl = await deepLinkHelper('https://www.usereserva.com/#/cart?');

      expect(successCartUrl).toEqual(`usereserva://bag/${orderFormId}`);
      expect(badCardUrl).toEqual(`${WEBVIEWOPEN}uri=www.usereserva.com/#/cart?`);
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
          'https://www.usereserva.com/colecao-reserva/ofertas/novo-path',
        );
        expect(notEndWithColection).toEqual('usereserva://asyncDeepLink/CATALOG?params=|colecao-reserva|ofertas|novo-path&initialUrl=www.usereserva.com/colecao-reserva/ofertas/novo-path');
      });
    });
  });
});
