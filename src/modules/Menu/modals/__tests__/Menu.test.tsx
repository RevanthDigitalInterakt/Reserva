import * as React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import type { DocumentNode } from 'graphql';
import {
  fireEvent,
  render,
  act,
  screen,
} from '@testing-library/react-native';
import { Menu, MenuProps } from '../Menu';
import { categoriesQuery } from '../../../../graphql/categories/categoriesQuery';
import EventProvider from '../../../../utils/EventProvider';
import CartContextProvider from '../../../../context/CartContext';
import { profileQuery } from '../../../../graphql/profile/profileQuery';

jest.mock('../../../../utils/EventProvider', () => ({
  sendTrackEvent: jest.fn(),
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

const apolloMocks: Array<any> = [
  {
    request: {
      query: categoriesQuery,
      variables: {},
    },
    result: {
      data: {
        appMenuCollection: {
          typename: 'AppMenuItemsCollection',
          items: [{
            itemsCollection: {
              __typename: 'AppMenuItemsCollection',
              items: [{
                __typename: 'Category',
                childCategoryCollection: [{ __typename: 'CategoryChildCategoryCollection', items: [{ __typename: 'Category', name: 'Lançamento Flamengo 2023', referenceId: 'collection:2410' }, { __typename: 'Category', name: '40% Cashback', referenceId: 'collection:2374' }, { __typename: 'Category', name: 'Tudo com 60%OFF', referenceId: 'collection:2360' }, { __typename: 'Category', name: 'Coleção Inverno 23', referenceId: 'collection:2219' }] }],
                name: 'Novidades',
                referenceId: 'collection:152',
              }],
            },
          }],
        },
      },
    },
  },
  {
    request: {
      query: profileQuery,
      variables: {},
    },
    result: {
      data:
        {
          profile: {
            addresses: [{
              __typename: 'vtex_storegraphql_2_162_0_Address', city: 'Cariacica', complement: '', country: 'BRA', id: '5zyupts49xg', neighborhood: 'Mucuri', number: '825', postalCode: '29148385', receiverName: 'Erick Fraga', state: 'ES', street: 'Avenida Santa Luzia',
            }],
            birthDate: '1980-01-01T00:00:00.000Z',
            customFields: [{
              __typename: 'vtex_storegraphql_2_162_0_ProfileCustomField', cacheId: 'profileImagePath', key: 'profileImagePath', value: 'null',
            }, {
              __typename: 'vtex_storegraphql_2_162_0_ProfileCustomField', cacheId: 'isNewsletterOptIn', key: 'isNewsletterOptIn', value: 'false',
            }, {
              __typename: 'vtex_storegraphql_2_162_0_ProfileCustomField', cacheId: 'userAcceptedTerms', key: 'userAcceptedTerms', value: 'false',
            }],
            document: '11111111111',
            email: 'nogueirahy@gmail.com',
            firstName: 'Tester',
            gender: 'male',
            homePhone: '+5511991111111',
            lastName: 'Silva',
            payments: null,
            userId: '4d35c3cf-d4a1-4c52-a421-66d8f97f1b10',
          },
        },
      refetch: () => {},
    },
  },
];

const mockNavigation: MenuProps['navigation'] = {
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
}));

describe('Componente Menu', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    const cookie = 'myCookie';
    const mockAuthContextValue: any = { cookie };

    const Component = (
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={apolloMocks} addTypename={false}>
          <CartContextProvider>
            <Menu navigation={mockNavigation} route={{ params: { indexMenuOpened: 1 } }} />
          </CartContextProvider>
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

  it('should update categories and send event', async () => {
    const clickedCategory = screen.getByText('NOVIDADES');
    await act(async () => {
      await fireEvent.press(clickedCategory);
    });

    expect(EventProvider.sendTrackEvent).toBeCalledWith('acessou-departamento', { action: 'acessou-departamento', data: { nome_departamento: 'Novidades', origem: 'app' }, id: null });
  });
});
