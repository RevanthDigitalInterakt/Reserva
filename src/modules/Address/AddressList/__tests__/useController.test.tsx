import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import useController from '../controller/useController';
import { ProfileAddressRemoveDocument as DELETE_ADDRESS_QUERY } from '../../../../base/graphql/generated';

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

jest.mock('../../../../zustand/useAuth/useAuthStore', () => ({
  useAuthStore: () => ({ profile: mockProfile }),
}));

AsyncStorageMock.getItem = jest.fn((key) => {
  if (key === '@RNAuth:RSAKey') {
    return Promise.resolve('rsaKey123');
  }

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
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useController(), { wrapper });

    await act(async () => {
      await result.current.openModalDeleteAddress('nuuzjm6dd2k');
      await result.current.doDeleteAddress();
    });

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
        {children}
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
