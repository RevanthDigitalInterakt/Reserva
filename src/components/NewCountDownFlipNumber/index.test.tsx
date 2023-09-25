import React from 'react';
import { render } from '@testing-library/react-native';
import { NewCountDownFlipNumber } from '.';
import type { HomeCountdownThemeOutput } from '../../base/graphql/generated';

const mockTheme = {
  __typename: 'HomeCountdownThemeOutput',
  clockBackgroundColor: '#1A1A1A',
  colorBanner: '#000000',
  colorButton: '#4A4A4A',
};

describe('NewCountDownFlipNumber', () => {
  it('should render correctly', () => {
    const root = render(
      <NewCountDownFlipNumber theme={mockTheme as HomeCountdownThemeOutput} />,
    );

    expect(root).toBeDefined();
  });

  it('should render the hours flip number', () => {
    const { queryByTestId } = render(
      <NewCountDownFlipNumber theme={mockTheme as HomeCountdownThemeOutput} />,
    );
    expect(queryByTestId('com.usereserva:id/flip_number_hours')).toBeTruthy();
  });

  it('should render the minutes flip number', () => {
    const { queryByTestId } = render(
      <NewCountDownFlipNumber theme={mockTheme as HomeCountdownThemeOutput} />,
    );
    expect(queryByTestId('com.usereserva:id/flip_number_minutes')).toBeTruthy();
  });

  it('should render the seconds flip number', () => {
    const { queryByTestId } = render(
      <NewCountDownFlipNumber theme={mockTheme as HomeCountdownThemeOutput} />,
    );
    expect(queryByTestId('com.usereserva:id/flip_number_seconds')).toBeTruthy();
  });
});
