import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Box, Typography } from 'reserva-ui';

import { CreditsView, CreditsViewProps } from '../Credits.view';

const render = (props: CreditsViewProps) => {
  const testRenderer = TestRenderer.create(<CreditsView {...props} />);
  const testInstance = testRenderer.root;

  const box = testInstance.findByType(Box);
  const typography = testInstance.findByType(Typography);

  return {
    box,
    typography,
  };
}

describe('CreditsView', () => {
  describe('when screenCashbackInStoreActive is true', () => {
    it('should render a Typography', () => {
      const props: CreditsViewProps = {
        creditsBalance: 0,
        screenCashbackInStoreActive: true,
        navigateToCashbackInStore: jest.fn(),
      };

      const { typography } = render(props);

      expect(typography).toBeTruthy();
    });
  });
});
