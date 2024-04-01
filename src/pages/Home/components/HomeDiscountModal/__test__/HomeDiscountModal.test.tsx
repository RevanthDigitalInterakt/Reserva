import {
  render,
  screen,
} from '@testing-library/react-native';
import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { HomeConfigDocument } from '../../../../../base/graphql/generated';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import HomeDiscountModal from '../HomeDiscountModal';

// MOCKS
const mockNavigate = jest.fn();

const mockHomeConfigQuery = {
  request: { query: HomeConfigDocument, variables: {} },
  result: {
    data: {
      homeConfig: {
        id: 'MainConfig',
        offersPage: 'collection:2772',
        __typename: 'ConfigOutput',
      },
    },
  },
};

jest.mock('react-native-share', () => ({
  open: jest.fn(() => Promise.resolve()),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../../../zustand/useHomeStore', () => ({
  useHomeStore: () => ({
    onLoad: () => {},
  }),
}));

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider
      mocks={[mockHomeConfigQuery]}
      addTypename={false}
    >
      <HomeDiscountModal />
    </MockedProvider>
  </ThemeProvider>
);

describe('HomeDiscountModal', () => {
  beforeEach(async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    render(TestingComponent);
  });

  it('should render properly', () => {
    const card = screen.getByTestId('com.usereserva:id/discount_code_modal_container');
    expect(card).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
