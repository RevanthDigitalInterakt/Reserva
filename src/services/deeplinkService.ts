import axios from 'axios';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

interface ICategory {
  extensions: any;
  route: {
    pageContext: {
      id: string;
      type: string;
    }
  }
}

export const deeplinkService = {
  getCategory: async (deepLink: string): Promise<ICategory | undefined> => {
    try {
      const response = await axios.get<ICategory>(
        `https://www.usereserva.com/${deepLink}?/&__siteEditor=true&__pickRuntime=extensions,page,pages,route,runtimeMeta`,
      );
      return response.data;
    } catch (error) {
      ExceptionProvider.captureException(error, "deeplinkService - deeplinkService.ts");
    }

    return undefined;
  },
};
