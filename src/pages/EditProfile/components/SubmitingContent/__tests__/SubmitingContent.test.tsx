import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  act, fireEvent, render, screen,
} from '@testing-library/react-native';
import SubmitingContentComponent from '../SubmitingContentComponent';
import { theme } from '../../../../../base/usereservappLegacy/theme';

const SubmitingContentProps = {
  handleSubmitForm: jest.fn(),
  formEditIsValid: false,
};

describe('Submiting Content', () => {
  it('renders without error and match snapshot', () => {
    render((
      <ThemeProvider theme={theme}>
        <SubmitingContentComponent isRegister={false} {...SubmitingContentProps} />
      </ThemeProvider>
    ));
    expect(screen.toJSON()).toMatchSnapshot();
  });
});

describe('Testing isRegister=true', () => {
  it('check visible go back button', async () => {
    render((
      <ThemeProvider theme={theme}>
        <SubmitingContentComponent isRegister {...SubmitingContentProps} />
      </ThemeProvider>
    ));
    expect(screen.getByTestId('com.usereserva:id/submitingcontent_button_submit_register')).toBeVisible();
  });

  it('check pressable submit form', async () => {
    render((
      <ThemeProvider theme={theme}>
        <SubmitingContentComponent isRegister {...SubmitingContentProps} />
      </ThemeProvider>
    ));

    await act(async () => {
      await fireEvent.press(screen.getByTestId('com.usereserva:id/submitingcontent_button_submit_register'));
    });

    expect(SubmitingContentProps.handleSubmitForm).toHaveBeenCalledTimes(1);
  });
});

describe('Testing isRegister=false', () => {
  it('check visible go back button', async () => {
    render((
      <ThemeProvider theme={theme}>
        <SubmitingContentComponent isRegister={false} {...SubmitingContentProps} />
      </ThemeProvider>
    ));
    expect(screen.getByTestId('com.usereserva:id/submitingcontent_button_go_back_no_register')).toBeVisible();
  });

  it('check visible save button', () => {
    render((
      <ThemeProvider theme={theme}>
        <SubmitingContentComponent isRegister={false} {...SubmitingContentProps} />
      </ThemeProvider>
    ));
    expect(screen.getByTestId('com.usereserva:id/submitingcontent_button_submit_no_register')).toBeVisible();
  });
});

describe('SubmitingContentTest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('check pressable submit form', async () => {
    render((
      <ThemeProvider theme={theme}>
        <SubmitingContentComponent isRegister={false} {...SubmitingContentProps} />
      </ThemeProvider>
    ));

    await act(async () => {
      await fireEvent.press(screen.getByTestId('com.usereserva:id/submitingcontent_button_submit_no_register'));
    });

    expect(SubmitingContentProps.handleSubmitForm).toHaveBeenCalledTimes(1);
  });
});
