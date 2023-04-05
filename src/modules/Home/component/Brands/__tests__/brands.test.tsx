import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import Config from 'react-native-config';
import type { DocumentNode } from 'graphql';
import { act } from 'react-test-renderer';
import Brands from '../Brands';
import { brandsCarouselQuery, IBrandsCarouselQuery } from '../../../../../graphql/brands/brandsCarouselQuery';

interface IApolloMock<T> {
  request: {
    query: DocumentNode,
    variables: object,
  },
  result: {
    data: T
  }
}

const apolloMocks: Array<IApolloMock<IBrandsCarouselQuery>> = [
  {
    request: {
      query: brandsCarouselQuery,
      variables: {
        id: Config.ID_BRANDS_COLLECTION_CONTENTFUL,
      },
    },
    result: {
      data: {
        brandsCarousel: {
          __typename: '_',
          brandsCollection: {
            __typename: '_',
            items: [
              {
                __typename: '_',
                brandLogo: {
                  __typename: '_',
                  url: 'https://teste.com.br',
                },
                reference: 'colecation:188',
              },
            ],
          },
        },
      },
    },
  },
];

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={apolloMocks} addTypename={false}>
      <Brands />
    </MockedProvider>
  </ThemeProvider>
);

const mockedFn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedFn }),
}));

describe('Brands tests', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('Testing brands', () => {
    it.skip('renders without error and match snapshot', () => {
      render(TestingComponent);
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it.skip('check render flatList', async () => {
      render(TestingComponent);

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      expect(screen.queryByTestId('com.usereserva:id/brands_flatList')).toBeVisible();
    });

    it.skip('check brand click', async () => {
      render(TestingComponent);

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      await act(async () => {
        await fireEvent.press(screen.getByTestId('com.usereserva:id/brands_brand_container'));
      });

      expect(mockedFn).toHaveBeenCalledTimes(1);
    });
  });
});
