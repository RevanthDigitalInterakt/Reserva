import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import LoadingModal from '..';
import { theme } from '../../../../../base/usereservappLegacy/theme';

describe('LoadingModal component', () => {
  it('should render correctly with the loading spinner animation ', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <LoadingModal />
      </ThemeProvider>,
    );

    const modal = getByTestId('com.usereserva:id/loading-modal');

    expect(modal).toBeTruthy();
  });
});
