import { removeLastCharacterSlash } from '../removeLastCharacterSlash'
import {
  registerMethods,
} from './static/deepLinkMethods';

/**
 * @name deepLinkHelper
 * @description Check the url passed and if it matches any condition,
 * if yes, it returns to the proper navigation, otherwise,
 * it redirects to the home page.
 * @param initialUrl string
 * @returns string | undefined
 */

const deepLinkHelper = (initialUrl: string): string | undefined => {

  const url = removeLastCharacterSlash(initialUrl)
  for (const executeDeepLinkcase of registerMethods) {
    const route = executeDeepLinkcase(url);
    if (route.match) {
      return route.strUrl;
    }
  }


  return undefined;
};

export { deepLinkHelper };
