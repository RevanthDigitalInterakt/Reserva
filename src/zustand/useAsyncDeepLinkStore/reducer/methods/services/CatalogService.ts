import { Linking, Platform } from 'react-native';
import { DeeplinkPathDocument } from '../../../../../base/graphql/generated';
import { ExceptionProvider } from '../../../../../base/providers/ExceptionProvider';
import type { IDeepLinkQuery, IDeepLinkRoute } from '../../../../../graphql/DeepLink/DeepLinkQuery';
import type { IListContentQuery, ListContent } from '../../../../../graphql/facets/facetsQuery';
import { listContentQuery } from '../../../../../graphql/facets/facetsQuery';
import DeepLinkPathModule from '../../../../../NativeModules/DeepLinkPathModule';
import { deeplinkService } from '../../../../../services/deeplinkService';
import { formatProductClusterIds } from '../../../../../utils/formatProductClusterIds';
import { getApolloClient } from '../../../../../utils/getApolloClient';
import { platformType } from '../../../../../utils/platformType';
import type { IFallBackRoute } from '../../../types/asyncDeepLinkStore';

interface IExtensionsInArray {
  after: string[];
  around: string[];
  before: string[];
  blockId: string;
  blocks: {
    blockId: string;
    blockRole: string;
    children: boolean;
    extensionPointId: string;
  }[]
  component: string;
  composition: string;
  content: {
    elements: string[];
  }
  contentIds: string[];
  hasContentSchema: boolean;
  hydration: string;
  implements: string[];
  props: {
    elements: string[];
  }
  render: string;
  track: string[];
}

const ISCATEGORY = ['/reserva', '/unbrand', '/mini', '/reversa/'] as const;
const REGEX = {
  pathnName: new RegExp(/\|/g),
  searchRegExp: new RegExp(/\//g),
};

const CustomBlocks = {
  customQuery: 'search-result-layout.customQuery',
} as const;

const defaultReturn: IFallBackRoute = {
  routeName: 'HomeTabs',
};

const createRouteFallbackPlatform = async (newPathName: string): Promise<IFallBackRoute> => {
  if (Platform.OS === platformType.IOS) {
    await Linking.openURL(`https://www.usereserva.com${newPathName}`);
    return {
      routeName: 'HomeTabs',
      params: {},
    };
  }

  await DeepLinkPathModule.openUrlInBrowser({
    url: `https://www.usereserva.com${newPathName}`,
    closeCurrentAppInstance: true,
  });

  return {
    routeName: 'HomeTabs',
    params: {},
  };
};

const getContentFullUrl = async (
  deepLinkRoute: string,
): Promise<IDeepLinkRoute | undefined> => {
  try {
    const { data: { deeplinkPath } } = await getApolloClient().query<IDeepLinkQuery>({
      query: DeeplinkPathDocument,
      variables: {
        path: encodeURI(deepLinkRoute),
      },
      context: { clientName: 'gateway' },
    });

    if (!deeplinkPath) return undefined;

    return deeplinkPath;
  } catch (error) {
    ExceptionProvider.captureException(error, "getContentFullUrl - useAsyncDeepLinkStore", { deepLinkRoute });
  }

  return undefined;
};

export const catalogService = async (pathName: string, fullUrl: string): Promise<IFallBackRoute> => {
  const newPathName = pathName.replace(REGEX.pathnName, '/');

  const contentFullUrl = await getContentFullUrl(fullUrl);

  if (contentFullUrl) {
    if (!contentFullUrl.active) return createRouteFallbackPlatform(newPathName);
    return {
      routeName: 'ProductCatalog',
      params: {
        referenceId: contentFullUrl.referenceId.startsWith('collection:') ? contentFullUrl.referenceId : `collection:${contentFullUrl.referenceId}`,
        safeArea: true,
        search: false,
        orderBy: '',
        facetInput: [{ key: '', value: '' }],
      },
    };
  }

  try {
    if (ISCATEGORY.some((item) => newPathName.includes(item))) {
      return {
        routeName: 'ProductCatalog',
        params: {
          referenceId: `category:${pathName}`,
          safeArea: true,
          search: false,
          orderBy: '',
          facetInput: [{ key: '', value: '' }],
        },
      };
    }

    const category = await deeplinkService.getCategory(newPathName);

    if (!category) return await createRouteFallbackPlatform(newPathName);

    let treePath: string = `${category.route.pageContext.id}/flex-layout.row#colecoes-custom/flex-layout.col#colecoes-custom/search-result-layout.customQuery#colecoes-custom`;

    const isFeminine = pathName.includes('feminino');

    const extensionsInArray: IExtensionsInArray[] = Object.keys(
      category.extensions,
    ).map((key) => (category.extensions[key]));

    const extensionsBlock = extensionsInArray.find(
      (extension) => extension?.blocks.find(
        (block) => block?.blockId.includes(CustomBlocks.customQuery),
      ),
    );

    const customQueryBlock = extensionsBlock?.blocks.find(
      (block) => block.blockId.includes(CustomBlocks.customQuery),
    );

    if (!customQueryBlock) return defaultReturn;

    if (!isFeminine) {
      treePath = `${category.route.pageContext.id}/${customQueryBlock.extensionPointId}`;
    }

    const { data: dataListContent } = await getApolloClient().query<IListContentQuery>({
      query: listContentQuery,
      variables: {
        blockId: customQueryBlock.blockId,
        id: category.route.pageContext.id,
        template: extensionsInArray[0]?.blockId,
        treePath,
      },
    });

    if (!dataListContent.listContent.length) return defaultReturn;

    const listContent: ListContent | undefined = dataListContent.listContent[0];

    if (!listContent?.contentJSON) {
      return await createRouteFallbackPlatform(newPathName);
    }

    const {
      querySchema: { mapField, queryField },
    } = JSON.parse(listContent.contentJSON);

    return {
      routeName: 'ProductCatalog',
      params: {
        referenceId: `queryField=${queryField.replace(REGEX.searchRegExp, ',')}&mapField=${formatProductClusterIds(mapField)}`,
        safeArea: true,
        search: false,
        orderBy: '',
        facetInput: [{ key: '', value: '' }],
      },
    };
  } catch (err) {
    ExceptionProvider.captureException(err, "catalogService - useAsyncDeepLinkStore", { pathName: pathName || "", fullUrl: fullUrl || "" });
    return createRouteFallbackPlatform(newPathName);
  }
};
