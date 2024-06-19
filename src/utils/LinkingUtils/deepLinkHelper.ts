import { removeLastCharacterSlash } from '../removeLastCharacterSlash';
import { registerMethods, type ICustomMethodReturnParams } from './static/deepLinkMethods';

const deepLinkHelper = async (
  initialUrl: string,
): Promise<string | undefined> => {
  const url = removeLastCharacterSlash(initialUrl);

  const route = await registerMethods.reduce(
    async (accPromise: Promise<ICustomMethodReturnParams>, executeDeepLinkCase) => {
      const acc = await accPromise;
      if (acc.match) return acc;

      const result = await executeDeepLinkCase(url);
      return result.match ? result : acc;
    },
    Promise.resolve({ match: false }),
  );

  return route.match ? route.strUrl : undefined;
};

export { deepLinkHelper };
