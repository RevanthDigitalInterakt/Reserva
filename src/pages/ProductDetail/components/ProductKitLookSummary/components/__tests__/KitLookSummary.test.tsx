import React from 'react';
import {
  render, waitFor,
} from '@testing-library/react-native';

import KitLookSummary from '../../KitLookSummary';

describe('KitLookSummary', () => {
  it('should match with the snapshot', async () => {
    const Component = (
      <KitLookSummary />
    );

    const { toJSON } = await waitFor(() => render(Component));

    expect(toJSON()).toMatchSnapshot();
  });
});
