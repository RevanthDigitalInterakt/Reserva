import { ThemeProvider } from 'styled-components/native';
import React from 'react';
import
{
  act, fireEvent, render, screen,
} from '@testing-library/react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TesterAreaViewComponent from '../TesterAreaViewComponent';
import { theme } from '../../../../../base/usereservappLegacy/theme';

const TestsIds = {
  buttons: {
    oneSignal: 'testerAreaView_button_copy_onesignal_token',
    oderFormId: 'testerAreaView_button_copy_orderform_id',
    userTester: 'testerAreaView_button_toogle_tester_user',
    onboardView: 'testerAreaView_button_toogle_onboarding_view',
  },

  texts: {
    oneSignal: 'testerAreaView_onesignal_token',
    orderFormId: 'testerAreaView_orderform_id',
  },
} as const;

const oneSignalToken = '1234' as const;
const orderFormId = '123456' as const;

jest.mock('react-native-onesignal', () => ({
  default: jest.fn(),
  getDeviceState: () => Promise.resolve({
    userId: oneSignalToken,
  }),
}));

const handleToggleModalTesting = jest.fn();

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <TesterAreaViewComponent handleToggleModalTesting={handleToggleModalTesting} />
  </ThemeProvider>
);

// TODO check test broken
describe.skip('ChangeFileModal', () => {
  beforeEach(async () => {
    render(TestingComponent);
  });

  it('renders without error and match snapshot', async () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  // describe('OneSignal Token tests', () => {
  it('check pressable handle copy one signal token', async () => {
    await act(async () => {
      await fireEvent.press(screen.getByTestId(TestsIds.buttons.oneSignal));
    });

    expect(Clipboard.setString).toHaveBeenCalledTimes(1);
  });

  it('check oneSignal token when pressable handle copy oneSignal token', async () => {
    await act(async () => {
      await fireEvent.press(screen.getByTestId(TestsIds.buttons.oneSignal));
    });

    expect(Clipboard.setString).toHaveBeenCalledWith(oneSignalToken);
  });

  it('check render oneSignal token text', async () => {
    expect(screen.getByTestId(TestsIds.texts.oneSignal).children[0]).toBe(oneSignalToken);
  });
  // });

  // describe('OrderFormId tests', () => {
  it.skip('check pressable handle copy orderFormId', async () => {
    await act(async () => {
      await fireEvent.press(screen.getByTestId(TestsIds.buttons.oderFormId));
    });

    expect(Clipboard.setString).toHaveBeenCalledTimes(1);
  });

  it('check orderFormId when pressable handle copy orderFormId', async () => {
    await act(async () => {
      await fireEvent.press(screen.getByTestId(TestsIds.buttons.oderFormId));
    });

    expect(Clipboard.setString).toHaveBeenCalledWith(orderFormId);
  });

  it('check render orderFormId text', async () => {
    expect(screen.getByTestId(TestsIds.texts.orderFormId).children[0]).toBe(orderFormId);
  });
  // });

  // describe('Teste user toogle', () => {
  it('check pressable handle toogle user test', async () => {
    await act(async () => {
      await fireEvent.press(screen.getByTestId(TestsIds.buttons.userTester));
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  });
  // });

  // describe('Test onboardingView toogle', () => {
  it('check pressable handle toogle user test', async () => {
    await act(async () => {
      await fireEvent.press(screen.getByTestId(TestsIds.buttons.onboardView));
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  });
  // });
});
