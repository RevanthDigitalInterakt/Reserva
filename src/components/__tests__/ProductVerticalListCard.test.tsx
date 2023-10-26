import React from 'react';
import {
  render,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { ProductVerticalListCard } from '../ProductVerticalListCard';
import { theme } from '../../base/usereservappLegacy/theme';

describe('ProductVerticalListCard', () => {
  it('should match with the snapshot', async () => {
    const Component = (
      <ThemeProvider theme={theme}>
        <ProductVerticalListCard
          prime={null}
          imageSource=""
          productTitle="title"
          price={1200}
          loadingFavorite={false}
          showThumbColors={false}
          installmentsNumber={6}
          discountTag={6}
          colors={['#000000']}
          installmentsPrice={200}
          onClickFavorite={jest.fn()}
          onClickImage={jest.fn()}
        />
      </ThemeProvider>
    );

    const { toJSON } = render(Component);

    expect(toJSON()).toMatchSnapshot();
  });
});
