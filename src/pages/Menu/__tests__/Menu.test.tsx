import * as React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import type { DocumentNode } from 'graphql';
import {
  render,
  act,
  screen,
} from '@testing-library/react-native';
import Menu from '../Menu';
import { AppMenuDocument } from '../../../base/graphql/generated';
import { theme } from '../../../base/usereservappLegacy/theme';

jest.mock('../../../utils/EventProvider', () => ({
  logEvent: jest.fn(),
}));

interface IApolloMock {
  request: {
    query: DocumentNode,
    variables: object,
  },
  result: {
    data: {}
  }
}

const apolloMocks: Array<IApolloMock> = [
  {
    request: {
      query: AppMenuDocument,
      variables: {},
    },
    result: {
      data: {
        appMenu: [
          {
            name: 'Novidades',
            type: 'PARENT_CATEGORY',
            customUrl: null,
            highlight: false,
            referenceId: 'collection:152',
            facets: [],
            children: [
              {
                name: 'Reserva + Flamengo',
                type: 'COLLECTION',
                customUrl: null,
                highlight: false,
                referenceId: 'collection:2410',
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '2410',
                  },
                ],
              },
            ],
          },
          {
            name: 'Masculino',
            type: 'PARENT_CATEGORY',
            customUrl: null,
            highlight: false,
            referenceId: 'category:reserva|masculino',
            facets: [],
            children: [
              {
                name: 'Camisetas',
                type: 'COLLECTION',
                customUrl: null,
                highlight: false,
                referenceId: 'collection:2230',
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '2230',
                  },
                ],
              },
              {
                name: 'Polos',
                type: 'COLLECTION',
                customUrl: null,
                highlight: false,
                referenceId: 'collection:2232',
                facets: [
                  {
                    key: 'productClusterIds',
                    value: '2232',
                  },
                ],
              },
            ],
          },
          {
            name: 'Prime',
            type: 'DEEPLINK',
            customUrl: '/prime',
            highlight: true,
            referenceId: null,
            facets: [],
            children: [],
          },
        ],
      },
    },
  },
];

const mockNavigation = {
  addListener: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(),
  navigate: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  push: jest.fn(),
  removeListener: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
};

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate, goBack: mockGoBackFn }),
  useLinkTo: () => () => {},
}));

jest.mock('../../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    getFetchPolicyPerKey: jest.fn(),
  }),
}));

describe('Componente Menu', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    const Component = (
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={apolloMocks} addTypename={false}>
          <Menu navigation={mockNavigation} route={{ params: { indexMenuOpened: 1 } }} />
        </MockedProvider>
      </ThemeProvider>
    );

    render(Component);
    act(() => { jest.runAllTimers(); });
    await act(async () => {});
  });

  it('should match with snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
