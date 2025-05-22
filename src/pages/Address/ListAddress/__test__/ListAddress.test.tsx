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
import ListAddress from '../ListAddress';
import ModalConfirmDelete from '../components/ModalConfirmDelete';
import type { RootStackParamList } from '../../../../routes/StackNavigator';
import { theme } from '../../../../base/usereservappLegacy/theme';

type TNavigation = StackScreenProps<RootStackParamList, 'AddressList'>['navigation'];

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();
const mockAddListenerFn = jest.fn();

const navigationMock: Partial<TNavigation> = {
  navigate: mockedNavigate,
  goBack: mockGoBackFn,
  addListener: mockAddListenerFn,
};

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <ListAddress
        navigation={navigationMock as TNavigation}
        route={{
          name: 'AddressList',
          key: '',
          params: '',
        }}
      />
    </MockedProvider>
  </ThemeProvider>
);

describe('List Address', () => {
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

  it('should render message empty list', () => {
    const { getByTestId } = render(Component);

    expect(getByTestId('com.usereserva:id/empty_list_message'));
  });

  it('should navigate to create address when button new address is pressed', async () => {
    render(Component);

    const actionButtonNewAddress = screen.getByTestId('com.usereserva:id/action_button_navigate_create_address');

    await act(async () => {
      await fireEvent.press(actionButtonNewAddress);
    });

    expect(mockedNavigate).toHaveBeenCalledWith('CreateAddress');
  });

  it('should render confirm delete address modal', () => {
    const { getByTestId } = render(<ModalConfirmDelete showModal onCloseModal={() => {}} onDeleteAddress={() => {}} addressID="abcdefg" />);

    expect(getByTestId('com.usereserva:id/modal_delete')).toHaveProp('visible', true);
  });

  it('should press delete confirmation button on modal', async () => {
    const { getByTestId } = render(<ModalConfirmDelete showModal onCloseModal={() => {}} onDeleteAddress={() => {}} addressID="abcdefg" />);

    const deleteButton = getByTestId('com.usereserva:id/com.usereserva:id/delete_address_button');

    await waitFor(() => {
      expect(deleteButton).toBeTruthy();
    });

    await act(async () => {
      await fireEvent.press(getByTestId('com.usereserva:id/com.usereserva:id/delete_address_button'));
    });

    fireEvent.press(deleteButton);
  });
});
