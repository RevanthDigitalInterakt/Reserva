import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import LoadingModal from '..';

describe('LoadingModal component', () => {
  it('should render correctly with the loading spinner animation ', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <LoadingModal />
      </ThemeProvider>,
    );

    const modal = getByTestId('com.usereserva:id/loading-modal');
    const lottieView = getByTestId('com.usereserva:id/lottie-view');

    expect(modal).toBeTruthy();
    expect(lottieView).toBeTruthy();
  });
});
