import * as Sentry from '@sentry/react-native';
import type { ApolloQueryResult } from '@apollo/client';
import { Linking, Platform } from 'react-native';
import { getWebCatalog } from './index';
import { deeplinkService } from '../../services/deeplinkService';
import { apolloClientProduction } from '../../services/apolloClient';
import type { IListContentQuery } from '../../graphql/facets/facetsQuery';

const mockSuccess = {
  extensions: {
    'vtex.store@2.x:store.custom#colecao-reserva-masculino-polos': {
      blockId: 'lojausereserva.lojausereserva-theme@6.x:store.custom#colecoes-custom-page-2',
      blocks: [
        {
          blockId: 'lojausereserva.lojausereserva-theme@6.x:flex-layout.row#colecoes-custom-richtext-1-page-2',
          extensionPointId: 'flex-layout.row#colecoes-custom-richtext-1-page-2',
          children: false,
          blockRole: 'block',
        },
        {
          blockId: 'lojausereserva.lojausereserva-theme@6.x:search-result-layout.customQuery#colecoes-custom-page-2',
          extensionPointId: 'search-result-layout.customQuery#colecoes-custom-page-2',
          children: false,
          blockRole: 'block',
        },
      ],
    },
  },
  route: {
    pageContext: {
      id: 'vtex.store@2.x:store.custom#colecao-reserva-masculino-polos',
      type: 'route',
    },
  },
};

const mockSuccessApollo: Partial<ApolloQueryResult<unknown>> = {
  data: {
    listContent: [{
      contentJSON: '{"querySchema":{"maxItemsPerPage":24,"orderByField":"","hideUnavailableItems":true,"skusFilter":"ALL_AVAILABLE","simulationBehavior":"default","installmentCriteria":"MAX_WITHOUT_INTEREST","queryField":"431/1484/1450/1438/1606/1692/1807/polos","mapField":"productClusterIds,productClusterIds,productClusterIds,productClusterIds,productClusterIds,productClusterIds,productClusterIds,category-3"},"text":""}',
      __typename: 'vtex_pagesgraphql_2_114_4_ContentConfigurationnnnn',
    },
    ],
  },
};

describe.skip('WebRedirectToCatalog', () => {
  afterEach(() => {
    jest.resetAllMocks();
    Platform.OS = 'android';
  });

  it('WHEN getCategory success SHOULD and apolloClientProduction success SHOULD return queryFieldMapField', async () => {
    jest.spyOn(deeplinkService, 'getCategory').mockResolvedValueOnce(mockSuccess);
    jest.spyOn(apolloClientProduction, 'query').mockResolvedValueOnce(mockSuccessApollo as ApolloQueryResult<IListContentQuery>);

    const queryFieldMapField = await getWebCatalog('/colecao-reserva/masculino-polos');
    expect(queryFieldMapField).toEqual({
      params: {
        facetInput: [
          {
            key: '',
            value: '',
          },
        ],
        orderBy: '',
        referenceId: 'queryField=431,1484,1450,1438,1606,1692,1807,polos&mapField=productClusterIds,productClusterIds,productClusterIds,productClusterIds,productClusterIds,productClusterIds,productClusterIds,category-3',
        safeArea: true,
        search: false,
      },
      routeName: 'ProductCatalog',
    });
  });

  it('WHEN getCategory AND ANDROID error SHOULD call captureException AND return a empty string', async () => {
    jest.spyOn(deeplinkService, 'getCategory').mockRejectedValueOnce(new Error());
    jest.spyOn(apolloClientProduction, 'query').mockResolvedValueOnce(mockSuccessApollo as ApolloQueryResult<IListContentQuery>);

    const queryFieldMapField = await getWebCatalog('');
    expect(queryFieldMapField).toEqual({
      routeName: 'WebViewDeepLink',
      params: { uri: 'www.usereserva.com' },
    });
    expect(Sentry.captureException).toBeCalled();
  });

  it('WHEN getCategory AND ANDROID return undefined SHOULD WebViewDeepLink', async () => {
    jest.spyOn(deeplinkService, 'getCategory').mockResolvedValueOnce(undefined);
    jest.spyOn(apolloClientProduction, 'query').mockResolvedValueOnce(mockSuccessApollo as ApolloQueryResult<IListContentQuery>);

    const queryFieldMapField = await getWebCatalog('');
    expect(queryFieldMapField).toEqual({
      routeName: 'WebViewDeepLink',
      params: { uri: 'www.usereserva.com' },
    });
  });

  it('WHEN return undefined SHOULD direct IOS to web', async () => {
    jest.spyOn(deeplinkService, 'getCategory').mockResolvedValueOnce(undefined);
    jest.spyOn(apolloClientProduction, 'query').mockResolvedValueOnce(mockSuccessApollo as ApolloQueryResult<IListContentQuery>);
    Platform.OS = 'ios';

    const queryFieldMapField = await getWebCatalog('/colecao-reserva/masculino-polos');

    expect(Linking.openURL).toBeCalled();
    expect(queryFieldMapField).toEqual({
      params: {},
      routeName: 'Home',
    });
  });

  it('WHEN contentJSON AND ANDROID return undefined SHOULD WebViewDeepLink', async () => {
    jest.spyOn(deeplinkService, 'getCategory').mockResolvedValueOnce(mockSuccess);
    jest.spyOn(apolloClientProduction, 'query').mockResolvedValueOnce({
      data: {
        listContent: [{
          __typename: '',
          contentJSON: undefined,
        }],
      },
    } as unknown as ApolloQueryResult<IListContentQuery>);

    const queryFieldMapField = await getWebCatalog('');
    expect(queryFieldMapField).toEqual({
      routeName: 'WebViewDeepLink',
      params: { uri: 'www.usereserva.com' },
    });
  });
});
