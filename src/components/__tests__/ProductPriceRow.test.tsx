import React from 'react';
import {
  render,
} from '@testing-library/react-native';
import ProductPriceRow from '../ProductPriceRow/ProductPriceRow';

describe('ProductPriceRow', () => {
  it('should match with the snapshot', async () => {
    const Component = (
      <ProductPriceRow
        installmentsNumber={6}
        installmentsPrice={200}
        discountTag={100}
        priceWithDiscount={150}
        price={1000}
      />
    );

    const { toJSON } = render(Component);

    expect(toJSON()).toMatchSnapshot();
  });
});
