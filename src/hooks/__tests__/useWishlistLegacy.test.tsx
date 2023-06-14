import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { theme } from '@usereservaapp/reserva-ui';
import type { DocumentNode } from 'graphql';
import { ThemeProvider } from 'styled-components/native';
import { act, renderHook } from '@testing-library/react-native';
import { CartContext } from '../../context/CartContext';

import wishListQueries from '../../graphql/wishlist/wishList';
import { useWishlistLegacy } from '../useWishlistLegacy';

jest.mock('../../utils/EventProvider');

interface IApolloMock<T> {
  request: {
    query: DocumentNode,
    variables: object,
  },
  result: {
    data: T
  }
}

const mockProfile = {
  __typename: 'ProfileOutput',
  email: 'fulano@gmail.com',
  addresses: [
    {
      __typename: 'ProfileAddressOutput',
      addressName: 'nuuzjm6dd2k',
      addressType: 'residential',
      city: 'Pindamonhangaba',
      complement: 'casa',
      country: 'BRA',
      id: 'nuuzjm6dd2k',
      neighborhood: 'Residencial Mantiqueira',
      number: '500',
      postalCode: '12446300',
      receiverName: 'Teste Receber',
      reference: '',
      state: 'SP',
      street: 'Rua Reinaldo de Oliveira Santos',
    },
  ],
  id: '316438e9-d825-44d2-8f0a-94ceea768ea3',
};

jest.mock('../../zustand/useAuth/useAuthStore', () => ({
  useAuthStore: () => ({ profile: mockProfile }),
}));

jest.mock('../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    initialized: true,
    getFetchPolicyPerKey: () => 0,
  }),
}));

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate, goBack: mockGoBackFn }),
}));

const apolloMocks: Array<IApolloMock<any>> = [
  {
    request: {
      query: wishListQueries.ADD_WISH_LIST,
      variables: {
        shopperId: mockProfile.email,
        productId: 'productId1',
        sku: 'sku1',
      },
    },
    result: {
      data: {
        wishlistAddProduct: 'productId1',
      },
    },
  },
  {
    request: {
      query: wishListQueries.REMOVE_WISH_LIST,
      variables: {
        shopperId: mockProfile.email,
        id: 'productId3',
      },
    },
    result: {
      data: {
        wishlistRemoveProduct: true,
      },
    },
  },
  {
    request: {
      query: wishListQueries.CHECK_LIST,
      variables: {
        shopperId: mockProfile.email,
        productId: 'productId1',
      },
    },
    result: {
      data: {
        checkList: { inList: true, listIds: ['productId3'] },
      },
    },
  },
];

const MockedCartContext = ({ children }: { children: React.ReactNode }) => (
  <CartContext.Provider value={{
    refreshOrderFormData: jest.fn().mockResolvedValue({ orderFormId: '50e2a3c1631046feabb90e13f55e66cb' }),
    identifyCustomer: jest.fn().mockResolvedValue(true),
  }}
  >
    {children}
  </CartContext.Provider>
);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={apolloMocks} addTypename={false}>
      <MockedCartContext>
        {children}
      </MockedCartContext>
    </MockedProvider>
  </ThemeProvider>
);

describe('useWishlistLegacy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
  it('should add product to wishlist', async () => {
    const { result } = renderHook(() => useWishlistLegacy(), { wrapper });
    await act(async () => {
      expect(await result.current.addToWishlist('productId1', 'sku1')).toBeTruthy();
    });
  });
  it('should remove product to wishlist', async () => {
    const { result } = renderHook(() => useWishlistLegacy(), { wrapper });
    await act(async () => {
      expect(await result.current.removeFromWishlist('productId1', 'sku1')).toBeTruthy();
    });
  });
  it('should check if the product is in wishlist', async () => {
    const { result } = renderHook(() => useWishlistLegacy(), { wrapper });
    await act(async () => {
      expect(await result.current.checkIfProductIsInWishlist('productId1', 'sku1')).toBeTruthy();
    });
  });
});
