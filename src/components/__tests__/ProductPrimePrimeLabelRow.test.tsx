import React from 'react';
import {
  render,
} from '@testing-library/react-native';
import ProductPricePrimeRow from '../ProductPricePrimeLabelRow/ProductPricePrimeRow';

describe('ProductPrimePrimeLabelRow', () => {
  it('should match with the snapshot', async () => {
    const Component = (
      <ProductPricePrimeRow
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
