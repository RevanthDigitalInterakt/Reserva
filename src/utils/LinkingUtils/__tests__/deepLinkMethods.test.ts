import { deepLinkHelper } from '../linkingUtils';
import {baseTabUrl, defaultInitialUrl, productUrl} from '../static/deepLinkMethods';

const DONTMATCHURL = undefined;

describe('utils | LinkingUtils | executeDeepLinkcase', () => {
  test('should return default url', () => {
    const result = deepLinkHelper('');
    expect(result).toEqual(DONTMATCHURL);
  });

  test('should return default url when is another domain', () => {
    const result = deepLinkHelper('https://www.google.com.br');
    expect(result).toEqual(DONTMATCHURL);
  });

  test('should return default url when call urlSiteCase', () => {
    const resultWithoutSlash = deepLinkHelper('https://www.usereserva.com');
    const resultWithSlash = deepLinkHelper('https://www.usereserva.com/');

    expect(resultWithoutSlash).toEqual(defaultInitialUrl);
    expect(resultWithSlash).toEqual(defaultInitialUrl);
  });

  describe('test urlProductCase ', () => {
    describe('when Query Params', () => {
      test('should return productUrl, query params skuId', () => {
        const expectedQueryParams = 'skuId=340005';
        const expectedResult = `${productUrl}${expectedQueryParams}`;

        const result = deepLinkHelper(
          `https://www.usereserva.com/mochila-bold-331-0056263/p?${expectedQueryParams}`
        );

        expect(result).toEqual(expectedResult);
      });

      test('should return productUrl, query params skuid lowercase ', () => {
        const expectedQueryParams = 'skuid=340005';
        const expectedResult = `${productUrl}${expectedQueryParams}`;

        const result = deepLinkHelper(
          `https://www.usereserva.com/mochila-bold-331-0056263/p?skuid=3232`
        );

        expect(result).toEqual(`${productUrl}skuid=3232`);
      });

      test('should return productUrl, query params productId', () => {
        const expectedQueryParams = 'productId=340005';
        const expectedResult = `${productUrl}${expectedQueryParams}`;

        const result = deepLinkHelper(
          `https://www.usereserva.com/mochila-bold-331-0056263/p?${expectedQueryParams}`
        );

        expect(result).toEqual(expectedResult);
      });

      describe('when not Query Params', () => {
        test('should return productUrl, without query params and slug param', () => {
          const productSlug = "mochila-bold-331-0056263";

          const expectedResult = `${productUrl}slug=${productSlug}`;

          const result = deepLinkHelper(
            `https://www.usereserva.com/${productSlug}/p`
          );

          expect(result).toEqual(expectedResult);
        });
      });
    });
  });

  test("should return default url when call colectionUseCase", () => {
    const endsWithColection = deepLinkHelper(`https://www.usereserva.com/colecao-reserva/ofertas`);
    const notEndWithColection = deepLinkHelper(`https://www.usereserva.com/colecao-reserva/ofertas/novo-path`);
    expect(endsWithColection).toEqual(`${baseTabUrl}/ofertas`)
    expect(notEndWithColection).toEqual(DONTMATCHURL)
  });

  describe("test account use cases", ()  => {
    const baseUrlAccount = `https://www.usereserva.com/account#`;

    test("should return wishlist use case", () => {
      const urlWishList = `${baseUrlAccount}/wishlist`;

      const result = deepLinkHelper(urlWishList);
      expect(result).toEqual(`${baseTabUrl}/wishlist`);
    });

    test("should return account use case", () => {
        const result = deepLinkHelper(baseUrlAccount);
        expect(result).toEqual(`${baseTabUrl}/profile`)
    })

    test("should return cart use case", () => {
      const orderFormId = "dasdasd-321-312312";
      const successCartUrl = deepLinkHelper(`https://www.usereserva.com/#/cart?orderFormId=${orderFormId}`)
      const badCardUrl = deepLinkHelper(`https://www.usereserva.com/#/cart?`)

      expect(successCartUrl).toEqual(`usereserva://bag/${orderFormId}`)
      expect(badCardUrl).toEqual(undefined)
    })

    test("should return collection catalog use case", () => {
      const collectionCase = "usereserva://catalog/collection:1627";

      const result = deepLinkHelper(collectionCase)

      expect(result).toEqual(collectionCase);
    })
  })
});
