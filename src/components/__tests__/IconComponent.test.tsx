import React from 'react';
import {
  render, waitFor,
} from '@testing-library/react-native';
import IconComponent from '../IconComponent/IconComponent';

describe('IconComponent', () => {
  it('should match with the snapshot', async () => {
    const Component = (
      <IconComponent
        icon="whatsapp"
      />
    );

    const { toJSON } = await waitFor(() => render(Component));

    expect(toJSON()).toMatchSnapshot();
  });
});
