import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageMock from '@react-native-community/async-storage/jest/async-storage-mock';
import useController from '../controller/useController';
import CartContextProvider from '../../../../context/CartContext';
import { deleteAddress as DELETE_ADDRESS_QUERY } from '../../../../graphql/address/addressMutations';
import AuthContextProvider from '../../../../context/AuthContext';
import { IdentifyCustomer } from '../../../../services/vtexService';
import { profileQuery as PROFILE_QUERY } from '../../../../graphql/profile/profileQuery';

jest.mock('../../../../services/vtexService', () => ({
  ...jest.requireActual('../../../../services/vtexService'),
  IdentifyCustomer: jest.fn().mockResolvedValue({
    data: {
      orderFormId: '128adb08596442708ee89e2a0f561321',
      clientProfileData: {
        firstName: 'Tester',
      },
    },
  }),
  ResetUserCheckout: jest.fn().mockResolvedValue(true),
  CreateCart: jest.fn().mockResolvedValue({
    data: {
      orderFormId: '128adb08596442708ee89e2a0f561321',
    },
  }),
}));

AsyncStorageMock.getItem = jest.fn((key) => {
  if (key === '@RNAuth:RSAKey') {
    return Promise.resolve('rsaKey123');
  }

  if (key === '@RNAuth:email') return Promise.resolve('test123@gmail.com');

  return Promise.resolve('');
});

describe('AddressList - controller', () => {
  it('should successfully call doDeleteAddress', async () => {
    const mockProfile = {
      __typename:
        'vtex_storegraphql_2_160_0_Profile',
      addresses: [[{}]],
      birthDate: '1980-01-01T00:00:00.000Z',
      customFields: [[{}], [{}], [{}]],
      document: '11111111111',
      email: 'nogueirahy@gmail.com',
      firstName: 'Tester',
      gender: 'male',
      homePhone: '+5511991111111',
      lastName: 'Silva',
      payments: null,
      userId: '4d35c3cf-d4a1-4c52-a421-66d8f97f1b10',
    };

    const mocks = [
      {
        request: {
          query: DELETE_ADDRESS_QUERY,
          variables: {
            id: '12345',
          },
        },
        result: {
          data: {
            deleteAddress:
            {
              __typename: 'vtex_storegraphql_2_160_0_Profile',
              userId: '4d35c3cf-d4a1-4c52-a421-66d8f97f1b10',
            },
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

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartContextProvider>
        <AuthContextProvider>
          <MockedProvider mocks={mocks}>
            {children}
          </MockedProvider>
        </AuthContextProvider>
      </CartContextProvider>
    );

    const { result } = renderHook(() => useController(), { wrapper });

    await act(async () => {
      await result.current.openModalDeleteAddress('12345');
      await result.current.doDeleteAddress();
    });

    const expectedOrderFormId = undefined;

    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1, '@RNAuth:RSAKey');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(2, '@RNAuth:cookie');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(3, '@RNAuth:cookie');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(4, '@RNAuth:email');

    expect(IdentifyCustomer).toHaveBeenCalledWith(expectedOrderFormId, 'test123@gmail.com');
    expect(result.current.profileData).toEqual(mockProfile);
  });
});
