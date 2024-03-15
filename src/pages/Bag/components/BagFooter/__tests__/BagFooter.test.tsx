import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from '@testing-library/react-hooks';
import appsFlyer from 'react-native-appsflyer';
import BagFooter from '..';
import EventProvider from '../../../../../utils/EventProvider';
import { CartContext } from '../../../../../context/CartContext';
import * as useBagStore from '../../../../../zustand/useBagStore/useBagStore';
import {
  apolloMocks,
  apolloMocksWithoutDataUser,
  bagInfos,
  currentOrderForm,
  installmentInfo,
} from '../__mocks__';
import * as useAuthStore from '../../../../../zustand/useAuth/useAuthStore';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import { Method } from '../../../../../utils/EventProvider/Event';

jest.mock('../../../../../utils/EventProvider');

const mockedFn = jest.fn();
const mockRestoreCart = jest.fn((_orderFormId: string) => Promise.resolve({}));

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

jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
  actions: {
    REMOVE_UNAVAILABLE_ITEMS: mockRemoveUnavailableItems,
  },
  appTotalizers: {
    delivery: bagInfos.totalBagDeliveryPrice,
    discount: bagInfos.totalBagDiscountPrice,
    items: bagInfos.totalBagItems,
    total: bagInfos.totalBagItems,
    __typename: 'OrderformAppTotalizersOutput',
  },
  orderFormId: '12578e89687rieoua186',
  installmentInfo: {
    __typename: 'OrderformInstallmentInfoOutput',
    installmentPrice: installmentInfo.installmentPrice,
    installmentsNumber: installmentInfo.installmentsNumber,
    totalPrice: installmentInfo.totalPrice,
  },
  items: currentOrderForm.items,
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
          <CartContext.Provider value={{ restoreCart: mockRestoreCart } as any}>
            <BagFooter />
          </CartContext.Provider>
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
        <MockedProvider mocks={apolloMocksWithoutDataUser}>
          <CartContext.Provider value={{ restoreCart: mockRestoreCart } as any}>
            <BagFooter />
          </CartContext.Provider>
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
    expect(mockRestoreCart).toHaveBeenCalledWith('12578e89687rieoua186');
    expect(mockedFn).toHaveBeenCalled();
  });
});
