import { MockedProvider } from '@apollo/client/testing';
import { act } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react-native';
import type { DocumentNode } from 'graphql';
import React from 'react';
import appsFlyer from 'react-native-appsflyer';
import { ThemeProvider } from 'styled-components/native';
import BagFooter from '..';
import { OrderFormDocument, type OrderFormQuery } from '../../../../../base/graphql/generated';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import EventProvider from '../../../../../utils/EventProvider';
import { Method } from '../../../../../utils/EventProvider/Event';
import * as useAuthStore from '../../../../../zustand/useAuth/useAuthStore';
import * as useBagStore from '../../../../../zustand/useBagStore/useBagStore';
import { mockCurrentOrderForm } from '../../../__test__/__mocks__/mockCurrentOrderForm';
import { currentOrderForm } from '../../../../../../__mocks__/mockResponseUnavailableList';

jest.mock('../../../../../utils/EventProvider');

const mockedFn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedFn }),
  useRoute: () => ({ params: { needRefresh: false } }),
}));

jest.mock('../../../../../hooks/usePrimeInfo', () => ({
  usePrimeInfo: () => ({
    primeActive: true,
  }),
}));

const mockRemoveUnavailableItems = jest.fn();

interface IApolloMock<T> {
  request: {
    query: DocumentNode;
    variables: object;
  };
  result: {
    data: T;
  };
}

const apolloMocks: Array<IApolloMock<OrderFormQuery>> = [
  {
    request: {
      query: OrderFormDocument,
      variables: {},
    },
    result: {
      data: {
        orderForm: mockCurrentOrderForm,
        __typename: 'Query',
      },
    },
  },
];

jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
  actions: {
    REMOVE_UNAVAILABLE_ITEMS: mockRemoveUnavailableItems,
    REFETCH_ORDER_FORM: jest.fn(),
  },
  appTotalizers: {
    delivery: 100,
    discount: 10,
    items: 3,
    total: 90,
    __typename: 'OrderformAppTotalizersOutput',
  },
  orderFormId: '12578e89687rieoua186',
  installmentInfo: {
    __typename: 'OrderformInstallmentInfoOutput',
    installmentPrice: 25,
    installmentsNumber: 4,
    totalPrice: 100,
  },
  items: currentOrderForm.items,
  packageItems: [{
    items: currentOrderForm.items,
  }],
  topBarLoading: false,
} as any);

describe('BagFooter Component', () => {
  it('should be renders correctly with EventProvider', async () => {
    jest.spyOn(useAuthStore, 'useAuthStore').mockReturnValue({
      profile: {
        __typename: 'ProfileOutput',
        addresses: [
          {
            city: 'Lugar Nenhum',
            country: 'Vazio',
            id: '1235478',
            __typename: 'ProfileAddressOutput',
          },
        ],
        authCookie: 'VtexIdclientAutCookie',
        birthDate: '1995-03-09T00:00:00.000Z',
        customFields: [
          {
            __typename: 'ProfileCustomFieldOutput',
            cacheId: 'profileImagePath',
            key: 'profileImagePath',
            value:
              'user/profile/image/a6017658-3a04-4f80-ab6b-71e9be47d341.jpg',
          },
          {
            __typename: 'ProfileCustomFieldOutput',
            cacheId: 'isNewsletterOptIn',
            key: 'isNewsletterOptIn',
            value: 'false',
          },
          {
            __typename: 'ProfileCustomFieldOutput',
            cacheId: 'userAcceptedTerms',
            key: 'userAcceptedTerms',
            value: 'false',
          },
        ],
        document: '90188779051',
        email: 'augustoneves@frwk.com.br',
        firstName: 'Augusto',
        gender: 'male',
        homePhone: '+5563993560705',
        id: '1wder78te-1898re-resdoie-145er3',
        isComplete: true,
        isPrime: true,
        lastName: 'Neves',
      },
    } as any);

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={apolloMocks}>
          <BagFooter />
        </MockedProvider>
      </ThemeProvider>,
    );

    const button = getByTestId('com.usereserva:id/bag_button_go_to_delivery');

    await act(async () => {
      await fireEvent.press(button);
    });

    expect(mockRemoveUnavailableItems).toHaveBeenCalled();
    expect(appsFlyer.logEvent).toHaveBeenCalled();
    expect(EventProvider.logEvent).toHaveBeenCalled();
  });

  it('should call EventProvider complete registration if profile is not complete', async () => {
    jest.spyOn(useAuthStore, 'useAuthStore').mockReturnValue({
      profile: {
        __typename: 'ProfileOutput',
        addresses: [
          {
            city: 'Lugar Nenhum',
            country: 'Vazio',
            id: '1235478',
            __typename: 'ProfileAddressOutput',
          },
        ],
        authCookie: 'VtexIdclientAutCookie',
        birthDate: '1995-03-09T00:00:00.000Z',
        customFields: [
          {
            __typename: 'ProfileCustomFieldOutput',
            cacheId: 'profileImagePath',
            key: 'profileImagePath',
            value:
              'user/profile/image/a6017658-3a04-4f80-ab6b-71e9be47d341.jpg',
          },
          {
            __typename: 'ProfileCustomFieldOutput',
            cacheId: 'isNewsletterOptIn',
            key: 'isNewsletterOptIn',
            value: 'false',
          },
          {
            __typename: 'ProfileCustomFieldOutput',
            cacheId: 'userAcceptedTerms',
            key: 'userAcceptedTerms',
            value: 'false',
          },
        ],
        document: '90188779051',
        email: 'augustoneves@frwk.com.br',
        firstName: 'Augusto',
        gender: 'male',
        homePhone: '+5563993560705',
        id: '1wder78te-1898re-resdoie-145er3',
        isComplete: false,
        isPrime: true,
        lastName: 'Neves',
      },
    } as any);

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={apolloMocks}>
          <BagFooter />
        </MockedProvider>
      </ThemeProvider>,
    );

    const button = getByTestId('com.usereserva:id/bag_button_go_to_delivery');

    await act(async () => {
      await fireEvent.press(button);
    });

    expect(EventProvider.logEvent).toHaveBeenCalledWith('complete_registration', {
      method: Method.Email,
      custumer_email: 'augustoneves@frwk.com.br',
    });
    expect(mockedFn).toHaveBeenCalled();
  });
});
