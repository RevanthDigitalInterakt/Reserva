import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Personalize from '../components/Personalize';
import EventProvider from '../../../utils/EventProvider';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe('Personalize component', () => {
  const fvcReferenceProduct = 'test-product';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the personalize button with correct text', () => {
    const { getByText, getByTestId } = render(
      <Personalize fvcReferenceProduct={fvcReferenceProduct} />,
    );

    const button = getByTestId('com.usereserva:id/pdp_button_rainbow_fvc');
    const buttonText = getByText('PERSONALIZE DO SEU JEITO');
    const externalText = getByText('Agora você pode personalizar esta peça. Experimente!');

    expect(button).toBeTruthy();
    expect(buttonText).toBeTruthy();
    expect(externalText).toBeTruthy();
  });

  it('should animate border color on render', () => {
    const { getByTestId } = render(<Personalize fvcReferenceProduct={fvcReferenceProduct} />);

    const animatedView = getByTestId('com.usereserva:id/pdp_button_rainbow_fvc');

    expect(animatedView).toBeTruthy();
  });

  it('should navigate to the correct webview when button is pressed', () => {
    const { getByTestId } = render(<Personalize fvcReferenceProduct={fvcReferenceProduct} />);

    const button = getByTestId('com.usereserva:id/pdp_button_rainbow_fvc');

    fireEvent.press(button);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('FacaVc', { type: fvcReferenceProduct });
  });

  it('should log an event when button is pressed', () => {
    const logEventSpy = jest.spyOn(EventProvider, 'logEvent');
    const { getByTestId } = render(<Personalize fvcReferenceProduct={fvcReferenceProduct} />);

    const button = getByTestId('com.usereserva:id/pdp_button_rainbow_fvc');

    fireEvent.press(button);

    expect(logEventSpy).toHaveBeenCalledWith('pdp_button_rainbow_fvc', {});
  });
});
