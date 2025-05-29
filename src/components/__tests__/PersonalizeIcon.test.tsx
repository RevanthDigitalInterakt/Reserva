import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import PersonalizeIcon from '../NewProductDetailCard/components/PersonalizeIcon';
import EventProvider from '../../utils/EventProvider';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe('PersonalizeIcon component', () => {
  const productReference = 'test-product';
  const testID = 'test-id';
  const discountTag = false;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render the personalize icon with correct styles', () => {
    const { getByTestId, getByText } = render(
      <PersonalizeIcon
        productReference={productReference}
        testID={testID}
        discountTag={discountTag}
      />,
    );

    const button = getByTestId(`${testID}_pdp_icon_fvc`);
    const personalizeText = getByText('Personalize');

    expect(button).toBeTruthy();
    expect(personalizeText).toBeTruthy();
  });

  it('should trigger animations after two seconds', () => {
    const { getByTestId } = render(
      <PersonalizeIcon
        productReference={productReference}
        testID={testID}
        discountTag={discountTag}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const button = getByTestId(`${testID}_pdp_icon_fvc`);
    expect(button).toBeTruthy();
  });

  it('should call navigation when personalize icon is pressed', () => {
    const { getByTestId } = render(
      <PersonalizeIcon
        productReference={productReference}
        testID={testID}
        discountTag={discountTag}
      />,
    );

    const button = getByTestId(`${testID}_pdp_icon_fvc`);
    fireEvent.press(button);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('FacaVc', { type: productReference });
  });

  it('should log event when personalize icon is pressed', () => {
    const logEventSpy = jest.spyOn(EventProvider, 'logEvent');
    const { getByTestId } = render(
      <PersonalizeIcon
        productReference={productReference}
        testID={testID}
        discountTag={discountTag}
      />,
    );

    const button = getByTestId(`${testID}_pdp_icon_fvc`);
    fireEvent.press(button);

    expect(logEventSpy).toHaveBeenCalledWith('pdp_icon_fvc', {});
  });
});
