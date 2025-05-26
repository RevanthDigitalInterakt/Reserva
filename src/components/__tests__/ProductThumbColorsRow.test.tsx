import React from 'react';
import {
  render,
} from '@testing-library/react-native';
import ProductThumbColorsRow from '../ProductThumbColorsRow/ProductThumbColorsRow';

describe('ProductThumbColorsRow', () => {
  it('should match with the snapshot', async () => {
    const Component = (
      <ProductThumbColorsRow identifier="test" colors={['#fff', '#000']} />
    );

    const { toJSON } = render(Component);

    expect(toJSON()).toMatchSnapshot();
  });
});
