import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageMock from '@react-native-community/async-storage/jest/async-storage-mock';
import useController from '../controller/useController';
import AuthContextProvider from '../../../../context/AuthContext';
import { ProfileDocument as PROFILE_QUERY, ProfileAddressRemoveDocument as DELETE_ADDRESS_QUERY } from '../../../../base/graphql/generated';
import CartContextProvider, { CartContext } from '../../../../context/CartContext';

AsyncStorageMock.getItem = jest.fn((key) => {
  if (key === '@RNAuth:RSAKey') {
    return Promise.resolve('rsaKey123');
  }

  if (key === '@RNAuth:email') return Promise.resolve('test123@gmail.com');

  return Promise.resolve('');
});

describe('AddressList - controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
  it('should successfully call doDeleteAddress', async () => {
    const mockProfile = {
      __typename: 'ProfileOutput',
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

    const mocks = [
      {
        request: {
          query: DELETE_ADDRESS_QUERY,
          variables: {
            input: {
              addressId: 'nuuzjm6dd2k',
            },
          },
        },
        result: {
          data: {
            profileAddressRemove: true,
          },
        },
      },
      {
        request: {
          query: PROFILE_QUERY,
          variables: {},
        },
        result: {
          data:
            {
              profile: mockProfile,
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
      <MockedProvider mocks={mocks}>
        <MockedCartContext>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </MockedCartContext>
      </MockedProvider>
    );

    const { result } = renderHook(() => useController(), { wrapper });

    await act(async () => {
      await result.current.openModalDeleteAddress('nuuzjm6dd2k');
      await result.current.doDeleteAddress();
    });
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1, '@RNAuth:RSAKey');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(2, '@RNAuth:cookie');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(3, '@RNAuth:cookie');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(4, '@RNAuth:email');

    expect(result.current.profileData).toEqual(mockProfile);
  });
  it('should error call doDeleteAddress', async () => {
    const mocks = [
      {
        request: {
          query: DELETE_ADDRESS_QUERY,
          variables: {
            input: {
              addressId: '',
            },
          },
        },
        result: {
          errors: [
            {
              message: 'Variable "$input" of required type "RemoveProfileAddressInput!" was not provided.',
            },
          ],
        },
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks}>
        <CartContextProvider>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </CartContextProvider>
      </MockedProvider>
    );

    const { result } = renderHook(() => useController(), { wrapper });

    await act(async () => {
      await result.current.openModalDeleteAddress('');
      await result.current.doDeleteAddress();
    });

    const hasError = result.current.hasDeleteAddressError;
    expect(hasError).toEqual(true);
  });
});
