import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { LoadingScreen } from '../../common/components/LoadingScreen';

import { IListContentQuery, ListContent, listContentQuery } from '../../graphql/facets/facetsQuery';
import { deeplinkService } from '../../services/deeplinkService';
import { apolloClientProduction } from '../../services/apolloClient';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { useCart } from '../../context/CartContext';
import EventProvider from '../../utils/EventProvider';
import { platformType } from '../../utils/platformType';

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

interface IGetWebCatalogReturn {
  routeName: string;
  params: Object;
}

const createRouteFallbackPlatform = async (newPathName: string) => {
  if (Platform.OS === platformType.IOS) {
    await Linking.openURL(`https://www.usereserva.com${newPathName}`);
    return {
      routeName: 'Home',
      params: {},
    };
  }
  return {
    routeName: 'WebViewDeepLink',
    params: {
      uri: `www.usereserva.com${newPathName}`,
    },
  };
};

export const getWebCatalog = async (pathName: string): Promise<IGetWebCatalogReturn> => {
  const regExpPathName = /\|/g;
  const replacePathName = '/';
  const newPathName = pathName.replace(regExpPathName, replacePathName);
  const isCategory: string[] = ['/reserva', '/unbrand', '/mini', '/reversa/'];
  try {
    if (isCategory.some((item) => newPathName.includes(item))) {
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

    const searchRegExp = /\//g;
    const replaceQueryField = ',';
    const { getCategory } = deeplinkService;
    const category = await getCategory(newPathName);

    if (category) {
      let treePath: string;
      const isFeminine = pathName.includes('feminino');
      let extensionsInArray: IExtensionsInArray[] = [];
      extensionsInArray = Object.keys(category.extensions).map((key) => (
        category.extensions[key]));
      const extensionsBlock = extensionsInArray.find((extension) => extension?.blocks.find((block) => block?.blockId.includes('search-result-layout.customQuery')));
      const customQueryBlock = extensionsBlock?.blocks.find((block) => block.blockId.includes('search-result-layout.customQuery'));
      if (customQueryBlock) {
        if (isFeminine) {
          treePath = `${category.route.pageContext.id}/flex-layout.row#colecoes-custom/flex-layout.col#colecoes-custom/search-result-layout.customQuery#colecoes-custom`;
        } else {
          treePath = `${category.route.pageContext.id}/${customQueryBlock.extensionPointId}`;
        }
        const { data: dataListContent } = await apolloClientProduction.query<IListContentQuery>({
          query: listContentQuery,
          variables: {
            blockId: customQueryBlock.blockId,
            id: category.route.pageContext.id,
            template: extensionsInArray[0]?.blockId,
            treePath,
          },
        });

        if (dataListContent.listContent.length) {
          const listContent: ListContent | undefined = dataListContent.listContent[0];

          if (!listContent?.contentJSON) {
            return createRouteFallbackPlatform(newPathName);
          }

          const {
            querySchema: { mapField, queryField },
          } = JSON.parse(listContent.contentJSON);
          const newQueryField = queryField.replace(searchRegExp, replaceQueryField);
          const queryFieldMapField = `queryField=${newQueryField}&mapField=${mapField}`;
          return {
            routeName: 'ProductCatalog',
            params: {
              referenceId: queryFieldMapField,
              safeArea: true,
              search: false,
              orderBy: '',
              facetInput: [{ key: '', value: '' }],
            },
          };
        }
      }
    }
    return createRouteFallbackPlatform(newPathName);
  } catch (err) {
    EventProvider.sentry.captureException(err);
    return createRouteFallbackPlatform(newPathName);
  }
};

type TWebRedirectToCatalogProps = StackScreenProps<RootStackParamList, 'WebRedirectToCatalog'>;

export default function WebRedirectToCatalog({ route }: TWebRedirectToCatalogProps) {
  const { pathName } = route?.params || {};
  const { topBarLoading } = useCart();
  const [data, setData] = useState<IGetWebCatalogReturn | null>(null);
  const navigation = useNavigation();

  const doRequest = useCallback(async () => {
    if (pathName) {
      const dataResult = await getWebCatalog(pathName);
      setData(dataResult);
    }
  }, [pathName]);

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  useEffect(() => {
    if (data) {
      if (data.routeName === 'WebViewDeepLink' || data.routeName === 'Home') {
        navigation.navigate(data.routeName, data.params);
      } else {
        navigation.replace(data.routeName, data.params);
      }
    }
  }, [data]);

  return (
    <SafeAreaView style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#fff' }}>
      <TopBarBackButton showShadow loading={topBarLoading} />

      <LoadingScreen />
    </SafeAreaView>
  );
}
