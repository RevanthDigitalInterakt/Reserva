import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import CreateAddress from '../CreateAddress';
import type { RootStackParamList } from '../../../../routes/StackNavigator';
import { theme } from '../../../../base/usereservappLegacy/theme';

type TNavigation = StackScreenProps<RootStackParamList, 'CreateAddress'>['navigation'];

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();

const navigationMock: Partial<TNavigation> = {
  navigate: mockedNavigate,
  goBack: mockGoBackFn,
};

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <CreateAddress
        navigation={navigationMock as TNavigation}
        route={{
          name: 'CreateAddress',
          key: '',
          params: { id: '' },
        }}
      />
    </MockedProvider>
  </ThemeProvider>
);

describe('Create Address', () => {
  it('snapshot', () => {
    render(Component);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should go back to address list when topBarBackButton is pressed', async () => {
    render(Component);

    const topBarBackButton = screen.getAllByTestId('com.usereserva:id/top_bar_button_go_back');

    await act(async () => {
      await topBarBackButton.forEach((button) => fireEvent.press(button));
    });

    expect(mockGoBackFn).toBeCalled();
  });

  it('should not show error message when input values are valid', async () => {
    const { getByTestId } = render(Component);

    const surnameInput = getByTestId('com.usereserva:id/create_address_input_surname');
    const fullnameInput = getByTestId('com.usereserva:id/create_address_input_fullname');
    const postalCodeInput = getByTestId('com.usereserva:id/create_address_input_postal_code');
    const streetInput = getByTestId('com.usereserva:id/create_address_input_street');
    const neighborhoodInput = getByTestId('com.usereserva:id/create_address_input_neighborhood');
    const addressNumberInput = getByTestId('com.usereserva:id/create_address_input_address_number');
    const addressStateInput = getByTestId('com.usereserva:id/create_address_input_address_state');
    const cityInput = getByTestId('com.usereserva:id/create_address_input_city');

    const submitButton = getByTestId('com.usereserva:id/create_address_button_submit');

    await waitFor(() => {
      fireEvent.changeText(surnameInput, 'Minha Casa');
    });

    await waitFor(() => {
      fireEvent.changeText(fullnameInput, 'Teste');
    });

    await waitFor(() => {
      fireEvent.changeText(postalCodeInput, '81230340');
    });

    await waitFor(() => {
      fireEvent.changeText(streetInput, 'Rua Ciro de Castro');
    });

    await waitFor(() => {
      fireEvent.changeText(neighborhoodInput, 'Cidade Industrial');
    });

    await waitFor(() => {
      fireEvent.changeText(addressNumberInput, '250');
    });

    await waitFor(() => {
      fireEvent.changeText(addressStateInput, 'PR');
    });

    await waitFor(() => {
      fireEvent.changeText(cityInput, 'Curitiba');
    });

    await waitFor(() => {
      fireEvent.changeText(cityInput, 'Curitiba');
    });

    await waitFor(() => {
      expect(submitButton).toBeTruthy();
    });

    await act(async () => {
      await fireEvent.press(getByTestId('com.usereserva:id/create_address_button_submit'));
    });

    fireEvent.press(submitButton);
  });
});
