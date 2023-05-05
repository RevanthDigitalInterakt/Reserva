import { MockedProvider } from '@apollo/client/testing';
import {
  act,
  render, screen,
} from '@testing-library/react-native';
import { theme } from '@usereservaapp/reserva-ui';
import type { DocumentNode } from 'graphql';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { renderHook } from '@testing-library/react-hooks';
import { ProductRecommendationsQuery, ProductRecommendationsDocument } from '../../../../base/graphql/generated';
import { Recommendation } from '../Recommendation';
import { gatewayProductsListMock } from '../../../../zustand/useRecommendation/mocks/productsList';
import useRecommendation from '../../../../zustand/useRecommendation/useRecommendation';

interface IApolloMock<T> {
  request: {
    query: DocumentNode,
    variables: object,
  },
  result: {
    data: T
  }
}

const apolloMocks: Array<IApolloMock<ProductRecommendationsQuery>> = [
  {
    request: {
      query: ProductRecommendationsDocument,
      variables: {},
    },
    result: {
      data: {
        productRecommendations: gatewayProductsListMock,
      },
    },
  },
];

describe('Test Component Recommendation', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('Testing Recommendation', () => {
    it('renders without error and match snapshot', async () => {
      const Wrapper = (
        <ThemeProvider theme={theme}>
          <MockedProvider mocks={apolloMocks} addTypename={false}>
            <Recommendation />
          </MockedProvider>
        </ThemeProvider>
      );

      render(Wrapper);

      expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should make a successful call to getProductRecommendation and add the products to zustand', async () => {
      const { result } = renderHook(() => useRecommendation());

      const Wrapper = (
        <ThemeProvider theme={theme}>
          <MockedProvider mocks={apolloMocks} addTypename={false}>
            <Recommendation />
          </MockedProvider>
        </ThemeProvider>
      );

      render(Wrapper);

      expect(result.current.products.length).toEqual(0);

      await act(async () => {
        await screen.rerender(Wrapper);
      });

      expect(result.current.products.length).toEqual(6);
    });
  });
});
