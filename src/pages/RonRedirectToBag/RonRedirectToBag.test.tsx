import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import type { DocumentNode } from 'graphql';
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import
{
  cleanup,
  render,
  waitFor,
} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RonRedirectToBag from './RonRedirectToBag';
import { RonRedirectDocument, type RonRedirectQuery, RonRedirectTypeEnum } from '../../base/graphql/generated';
import { theme } from '../../base/usereservappLegacy/theme';

interface IApolloMock<T> {
  request: {
    query: DocumentNode;
    variables: object;
  };
  result: { data: T; }
}

const RON_ORDERFORM_CODE = '0NxiK7FA80gk';
const RON_REDIRECT_PRODUCT_CODE = '1MiUK4FB16op';
const RON_REDIRECT_CATALOG_CODE = '123';

const RON_INVALID_CODE = '1234567890';

const navigateFn = jest.fn();
const replaceFn = jest.fn();
const navigationMock = { navigate: navigateFn, replace: replaceFn };

const apolloMocks: Array<IApolloMock<RonRedirectQuery>> = [
  {
    request: {
      query: RonRedirectDocument,
      variables: { code: RON_INVALID_CODE },
    },
    result: {
      data: {
        ronRedirect: null,
        __typename: 'Query',
      },
    },
  },
  {
    request: {
      query: RonRedirectDocument,
      variables: { code: RON_ORDERFORM_CODE },
    },
    result: {
      data: {
        ronRedirect: {
          orderFormId: 'f30f6121fa6543e8a288965e6dbcd7fe',
          url: '',
          type: RonRedirectTypeEnum.Orderform,
        },
        __typename: 'Query',
      },
    },
  },
  {
    request: {
      query: RonRedirectDocument,
      variables: { code: RON_REDIRECT_PRODUCT_CODE },
    },
    result: {
      data: {
        ronRedirect: {
          orderFormId: '',
          url: 'https://www.usereserva.com/peitoral-mesh-flag0079448/p?skuId=425418',
          type: RonRedirectTypeEnum.Custom,
        },
        __typename: 'Query',
      },
    },
  },
  {
    request: {
      query: RonRedirectDocument,
      variables: { code: RON_REDIRECT_CATALOG_CODE },
    },
    result: {
      data: {
        ronRedirect: {
          orderFormId: '',
          url: 'https://www.usereserva.com/peitoral-mesh-flag0079448/p?params=123',
          type: RonRedirectTypeEnum.Custom,
        },
        __typename: 'Query',
      },
    },
  },
];

jest.mock('../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    getFetchPolicyPerKey: jest.fn(),
  }),
}));

AsyncStorageMock.setItem = jest.fn();

describe('RonRedirectToBag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders without error and match snapshot', () => {
    const ComponentForSnapShot = (
      <ThemeProvider theme={theme}>
        <MockedProvider addTypename={false} mocks={apolloMocks}>
          <RonRedirectToBag
            navigation={navigationMock as any}
            route={{
              params: { ronCode: '' },
              name: 'RonRedirectToBag',
              key: '',
            }}
          />
        </MockedProvider>
      </ThemeProvider>
    );

    const root = render(ComponentForSnapShot);
    expect(root.toJSON()).toMatchSnapshot();
    cleanup();
  });

  it('must load a ron with orderform code and setItem', async () => {
    const ComponentForSnapShot = (
      <ThemeProvider theme={theme}>
        <MockedProvider addTypename={false} mocks={apolloMocks}>
          <RonRedirectToBag
            navigation={navigationMock as any}
            route={{
              params: { ronCode: RON_ORDERFORM_CODE },
              name: 'RonRedirectToBag',
              key: '',
            }}
          />
        </MockedProvider>
      </ThemeProvider>
    );

    render(ComponentForSnapShot);

    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalled());
    expect(replaceFn).toHaveBeenCalledTimes(1);
    expect(replaceFn).toHaveBeenCalledWith(
      'BagScreen',
      { isProfileComplete: false, orderFormId: 'f30f6121fa6543e8a288965e6dbcd7fe' },
    );
    cleanup();
  });

  it('must load a ron with redirect home', async () => {
    const ComponentForSnapShot = (
      <ThemeProvider theme={theme}>
        <MockedProvider addTypename={false} mocks={apolloMocks}>
          <RonRedirectToBag
            navigation={navigationMock as any}
            route={{
              params: { ronCode: RON_INVALID_CODE },
              name: 'RonRedirectToBag',
              key: '',
            }}
          />
        </MockedProvider>
      </ThemeProvider>
    );

    await waitFor(() => render(ComponentForSnapShot));
    expect(replaceFn).toHaveBeenCalledWith('HomeTabs');
  });

  it.skip('must load a ron with product url', () => {
    const ComponentForSnapShot = (
      <ThemeProvider theme={theme}>
        <MockedProvider addTypename={false} mocks={apolloMocks}>
          <RonRedirectToBag
            navigation={navigationMock as any}
            route={{
              params: { ronCode: RON_REDIRECT_PRODUCT_CODE },
              name: 'RonRedirectToBag',
              key: '',
            }}
          />
        </MockedProvider>
      </ThemeProvider>
    );

    render(ComponentForSnapShot);

    expect(replaceFn).toHaveBeenCalledWith('');
  });

  it.skip('must load a ron with catalog url', async () => {
    const ComponentForSnapShot = (
      <ThemeProvider theme={theme}>
        <MockedProvider addTypename={false} mocks={apolloMocks}>
          <RonRedirectToBag
            navigation={navigationMock as any}
            route={{
              params: { ronCode: RON_REDIRECT_CATALOG_CODE },
              name: 'RonRedirectToBag',
              key: '',
            }}
          />
        </MockedProvider>
      </ThemeProvider>
    );

    render(ComponentForSnapShot);

    await waitFor(() => expect(replaceFn).toHaveBeenCalledWith('AsyncDeepLink', {
      reducerKey: 'CATALOG',
      params: '123',
    }));
  });
});
