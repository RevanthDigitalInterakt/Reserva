import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '../../../../../base/usereservappLegacy/theme';
import HomeCard from '../HomeCard';

// MOCKS
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <HomeCard
      reservaMini
      reference="category:1689"
      orderBy="RELEVANCIA"
      imageUrl="https://image.com"
    />
  </ThemeProvider>
);

describe('PrimeLP', () => {
  beforeEach(async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    render(TestingComponent);
  });

  it('should render properly', () => {
    const card = screen.getByTestId('com.usereserva:id/card_container_category:1689');
    expect(card).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should call onAddPrimeToCart when to press call to action button', async () => {
    const callToAction = screen.getByTestId(
      'com.usereserva:id/card_button_category:1689',
    );

    fireEvent.press(callToAction);

    await waitFor(() => {
      expect(mockNavigate).toBeCalled();
      expect(mockNavigate).toBeCalledWith('ProductCatalog', {
        referenceId: 'category:1689',
        reservaMini: true,
        orderBy: 'RELEVANCIA',
      });
    });
  });
});
