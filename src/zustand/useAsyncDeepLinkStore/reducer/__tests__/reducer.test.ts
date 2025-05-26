import reducer from '../asyncDeepLinkReducer';
import * as CatalogService from '../methods/services/CatalogService';

const spy = jest.spyOn(CatalogService, 'catalogService');

const defaultReducerMock = {
  deepLinkLoading: false, fallBackRoute: null, dispatch: jest.fn(),
};

describe('Reducer methods test', () => {
  afterEach(() => {
    if (spy) {
      jest.resetAllMocks();
    }
  });

  test('check default fallback route to reducer return', async () => {
    spy.mockClear();
    spy.mockResolvedValue({
      routeName: 'HomeTabs',
    });

    const defaultInvalidReturn = { routeName: 'HomeTabs' };

    const reducerReturn = await reducer(defaultReducerMock, { actionType: 'null', payload: {} });

    expect(reducerReturn.fallBackRoute).toEqual(defaultInvalidReturn);
  });

  test('Invalid payload, default return HomeTabs', async () => {
    spy.mockClear();
    spy.mockResolvedValue({
      routeName: 'HomeTabs',
      params: {},
    });

    const defaultReturnHomeTabs = { routeName: 'HomeTabs', params: {} };

    const reducerReturn = await reducer(defaultReducerMock, {
      actionType: 'CATALOG',
      payload: {
        params: '',
        initialUrl: '',
      },
    });

    expect(reducerReturn.fallBackRoute).toEqual(defaultReturnHomeTabs);
  });

  test('Payload contentful url', async () => {
    spy.mockClear();
    spy.mockResolvedValue({
      routeName: 'ProductCatalog',
      params: {
        referenceId: 'colection:0',
        safeArea: true,
        search: false,
        orderBy: '',
        facetInput: [{ key: '', value: '' }],
      },
    });

    const paylaodContentFullUrl = {
      routeName: 'ProductCatalog',
      params: {
        referenceId: 'colection:0',
        safeArea: true,
        search: false,
        orderBy: '',
        facetInput: [{ key: '', value: '' }],
      },
    };

    const reducerReturn = await reducer(defaultReducerMock, {
      actionType: 'CATALOG',
      payload: {
        params: '|churrasqueiras-rsv|novas',
        initialUrl: 'https://www.usereserva.com/churrasqueiras-rsv/novas',
      },
    });

    expect(reducerReturn.fallBackRoute).toEqual(paylaodContentFullUrl);
  });

  test('Payload category url', async () => {
    spy.mockClear();
    spy.mockResolvedValue({
      routeName: 'ProductCatalog',
      params: {
        referenceId: 'category:reserva',
        safeArea: true,
        search: false,
        orderBy: '',
        facetInput: [{ key: '', value: '' }],
      },
    });

    const payloadCategoryUrl = {
      routeName: 'ProductCatalog',
      params: {
        referenceId: 'category:reserva',
        safeArea: true,
        search: false,
        orderBy: '',
        facetInput: [{ key: '', value: '' }],
      },
    };

    const reducerReturn = await reducer(defaultReducerMock, {
      actionType: 'CATALOG',
      payload: {
        params: '|reserva',
        initialUrl: 'https://www.usereserva.com/reserva',
      },
    });

    expect(reducerReturn.fallBackRoute).toEqual(payloadCategoryUrl);
  });
});
