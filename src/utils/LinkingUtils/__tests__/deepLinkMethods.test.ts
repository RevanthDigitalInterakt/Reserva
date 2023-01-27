import { deepLinkHelper } from '../linkingUtils';
import {
  baseTabUrl,
  defaultInitialUrl,
  productUrl,
} from '../static/deepLinkMethods';

const WEBVIEW_LINKS = ['https://www.usereserva.com/colecao-reserva/bestfriday', 'https://www.usereserva.com/colecao-reserva/masculino', 'https://www.usereserva.com/colecao-reserva/adulto-top-camisetas', 'https://www.usereserva.com/colecao-reserva/masculino-kits', 'https://www.usereserva.com/colecao-reserva/ofertas/calcados', 'https://www.usereserva.com/colecao-reserva/bf-verao23', 'https://www.usereserva.com/colecao-reserva/novas-mochilas', 'https://www.usereserva.com/colecao-reserva/masculino-camisetas', 'https://www.usereserva.com/colecao-reserva/copa', 'https://www.usereserva.com/colecao-reserva/acessorios', 'https://www.usereserva.com/colecao-reserva/calcados-reserva', 'https://www.usereserva.com/colecao-reserva/calcados-feminino', 'https://www.usereserva.com/colecao-reserva/chinelos', 'https://www.usereserva.com/colecao-reserva/ofertas/calcados', 'https://www.usereserva.com/colecao-reversa/go-reversa', 'https://www.usereserva.com/colecao-reserva/couro-go', 'https://www.usereserva.com/colecao-reserva/type-r', 'https://www.usereserva.com/colecao-reserva/tenis-spriz', 'https://www.usereserva.com/colecao-reserva/tenis-hero', 'https://www.usereserva.com/colecao-reserva/tenis-astral', 'https://www.usereserva.com/colecao-reserva/hunter', 'https://www.usereserva.com/colecao-reserva/chinelo-diferente', 'https://www.usereserva.com/colecao-reserva/typer-bold', 'https://www.usereserva.com/colecao-mini/bebe-calcados', 'https://www.usereserva.com/colecao-mini/mini-bebe-calcados', 'https://www.usereserva.com/colecao-mini/chinelos-meninos', 'https://www.usereserva.com/colecao-mini/ofertas', 'https://www.usereserva.com/colecao-mini/ofertas-crianca', 'https://www.usereserva.com/colecao-mini/novidades', 'https://www.usereserva.com/colecao-mini/intimo-sungas', 'https://www.usereserva.com/colecao-mini/ofertas-camisetas', 'https://www.usereserva.com/colecao-mini/liquidacao', 'https://www.usereserva.com/colecao-mini/promocao-camisetas', 'https://www.usereserva.com/mini/bebes', 'https://www.usereserva.com/mini/bebes/bodies', 'https://www.usereserva.com/mini/criancas', 'https://www.usereserva.com/mini/criancas/camisetas', 'https://www.usereserva.com/mini/criancas/polos', 'https://www.usereserva.com/calcados', 'https://www.usereserva.com/spriz-knit'];

const DONTMATCHURL = undefined;
const WEBVIEWOPEN = 'usereserva://webview/d?' as const;

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
  Platform.OS = 'android';
  return Platform;
});

describe('utils | LinkingUtils | executeDeepLinkcase', () => {
  test('should return default url', () => {
    const result = deepLinkHelper('');
    expect(result).toEqual(DONTMATCHURL);
  });

  test('should return default url when is another domain', () => {
    const result = deepLinkHelper('https://www.google.com.br');
    expect(result).toEqual(`${WEBVIEWOPEN}uri=www.google.com.br`);
  });

  test('should return default url when call urlSiteCase', () => {
    const expected1 = deepLinkHelper('https://www.usereserva.com');
    const expected2 = deepLinkHelper('https://www.usereserva.com/');
    const expected3 = deepLinkHelper('www.usereserva.com');
    const expected4 = deepLinkHelper('http://usereserva.com');

    expect(expected1).toEqual(defaultInitialUrl);
    expect(expected2).toEqual(defaultInitialUrl);
    expect(expected3).toEqual(defaultInitialUrl);
    expect(expected4).toEqual(defaultInitialUrl);
  });

  describe('test urlRonCase ', () => {
    const code = 'code';

    test('with correct params', () => {
      const result = deepLinkHelper(`https://usereserva.io/${code}`);
      expect(result).toEqual(`usereserva://ron/${code}`);
    });

    test('without any params on url', () => {
      const result = deepLinkHelper('https://usereserva.io');
      expect(result).toEqual(defaultInitialUrl);
    });

    test('without any params on url and slash at end', () => {
      const result = deepLinkHelper('https://usereserva.io/');
      expect(result).toEqual(defaultInitialUrl);
    });
  });

  describe('test urlProductCase ', () => {
    describe('when Query Params', () => {
      test('should return productUrl, query params skuId', () => {
        const expectedQueryParams = 'skuId=340005';
        const expectedResult = `${productUrl}${expectedQueryParams}`;

        const result = deepLinkHelper(
          `https://www.usereserva.com/mochila-bold-331-0056263/p?${expectedQueryParams}`,
        );

        expect(result).toEqual(expectedResult);
      });

      test('should return productUrl, query params skuid lowercase ', () => {
        const result = deepLinkHelper(
          'https://www.usereserva.com/mochila-bold-331-0056263/p?skuid=3232',
        );

        expect(result).toEqual(`${productUrl}skuid=3232`);
      });

      test('should return productUrl, query params productId', () => {
        const expectedQueryParams = 'productId=340005';
        const expectedResult = `${productUrl}${expectedQueryParams}`;

        const result = deepLinkHelper(
          `https://www.usereserva.com/mochila-bold-331-0056263/p?${expectedQueryParams}`,
        );

        expect(result).toEqual(expectedResult);
      });

      describe('when not Query Params', () => {
        test('should return productUrl, without query params and slug param', () => {
          const productSlug = 'mochila-bold-331-0056263';

          const expectedResult = `${productUrl}slug=${productSlug}`;

          const result = deepLinkHelper(
            `https://www.usereserva.com/${productSlug}/p`,
          );

          expect(result).toEqual(expectedResult);
        });
      });
    });
  });

  test('should return default url when call colectionUseCase', () => {
    const endsWithColection = deepLinkHelper(
      'https://www.usereserva.com/colecao-reserva/ofertas',
    );
    const notEndWithColection = deepLinkHelper(
      'https://www.usereserva.com/colecao-reserva/ofertas/novo-path',
    );
    expect(endsWithColection).toEqual(`${baseTabUrl}/ofertas`);
    expect(notEndWithColection).toEqual(`${WEBVIEWOPEN}uri=www.usereserva.com/colecao-reserva/ofertas/novo-path`);
  });

  describe('test account use cases', () => {
    const baseUrlAccount = 'https://www.usereserva.com/account#';

    test('should return wishlist use case', () => {
      const urlWishList = `${baseUrlAccount}/wishlist`;

      const result = deepLinkHelper(urlWishList);
      expect(result).toEqual(`${baseTabUrl}/wishlist`);
    });

    test('should return account use case', () => {
      const result = deepLinkHelper(baseUrlAccount);
      expect(result).toEqual(`${baseTabUrl}/profile`);
    });

    test('should return cart use case', () => {
      const orderFormId = 'dasdasd-321-312312';
      const successCartUrl = deepLinkHelper(
        `https://www.usereserva.com/#/cart?orderFormId=${orderFormId}`,
      );
      const badCardUrl = deepLinkHelper('https://www.usereserva.com/#/cart?');

      expect(successCartUrl).toEqual(`usereserva://bag/${orderFormId}`);
      expect(badCardUrl).toEqual(`${WEBVIEWOPEN}uri=www.usereserva.com/#/cart?`);
    });

    test('should return collection catalog use case', () => {
      const collectionCase = 'usereserva://catalog/collection:1627';

      const result = deepLinkHelper(collectionCase);

      expect(result).toEqual(collectionCase);
    });
  });

  describe('test android webview cases', () => {
    test('Test any links when open in webview', () => {
      WEBVIEW_LINKS.forEach((deepLink: string) => {
        const currentUriResult = deepLink.replace(/(^\w+:|^)\/\//, '');
        const deepLinkHelperResult = deepLinkHelper(deepLink);

        expect(deepLinkHelperResult).toEqual(`${WEBVIEWOPEN}uri=${currentUriResult}`);
      });
    });
  });
});
