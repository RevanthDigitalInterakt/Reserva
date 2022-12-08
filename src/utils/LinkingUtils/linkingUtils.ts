import {
  defaultInitialUrl as defautlInitialUrlReturnDeepLink,
  registerMethods,
} from './static/deepLinkMethods';

/**
 * @name deepLinkHelper
 * @description Check the url passed and if it matches any condition,
 * if yes, it returns to the proper navigation, otherwise,
 * it redirects to the home page.
 * @param initialUrl string
 * @returns string
 */
const deepLinkHelper = (initialUrl: string): string => {
  for (const executeDeepLinkcase of registerMethods) {
    const route = executeDeepLinkcase(initialUrl);
    if (route.match) {
      return route.strUrl;
    }
  }


  return defautlInitialUrlReturnDeepLink;
};

export { deepLinkHelper };
