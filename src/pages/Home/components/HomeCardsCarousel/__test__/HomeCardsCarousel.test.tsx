import {
  render,
  screen,
} from '@testing-library/react-native';
import React from 'react';

import { ThemeProvider } from 'styled-components/native';
import type { HomeCarouselOutput } from '../../../../../base/graphql/generated';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import HomeCardsCarousel from '../HomeCardsCarousel';

// MOCKS
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const mockedCardCarousel = {
  id: 'MAIN',
  type: 'MAIN',
  showtime: 10,
  items: [{
    mkt: false,
    linkMktIn: null,
    reservaMini: false,
    reference: 'collection:2894',
    orderBy: 'RELEVANCIA',
    facets: [{ key: 'productClusterIds', value: '2894', __typename: 'ProductFacetOutput' }],
    image: {
      url: 'https://images.ctfassets.net/6jsfqc13oxv4/RYtXBnHIjoNdgmEvoO9Km/d06af9b5124eca415b7dfbf56fad7163/banner-home-app-liqui_para_todos.gif', title: 'Liqui para Todos Agosto 2023', height: 1400, width: 1080, __typename: 'HomeCarouselItemImageOutput',
    },
  }, {
    mkt: false,
    linkMktIn: null,
    reservaMini: false,
    reference: 'collection:2648',
    orderBy: 'RELEVANCIA',
    facets: [{ key: 'productClusterIds', value: '2648', __typename: 'ProductFacetOutput' }],
    image: {
      url: 'https://images.ctfassets.net/6jsfqc13oxv4/4TFpt2F0YWUdrb2lZ2SYak/09ad88e0d507be9079da04be0733bd05/banner-home-app-od_ate129.jpg', title: 'Camisetas até R$129', height: 1400, width: 1080, __typename: 'HomeCarouselItemImageOutput',
    },
  }, {
    mkt: false,
    linkMktIn: null,
    reservaMini: false,
    reference: 'collection:2772',
    orderBy: 'RELEVANCIA',
    facets: [{ key: 'productClusterIds', value: '2772', __typename: 'ProductFacetOutput' }],
    image: {
      url: 'https://images.ctfassets.net/6jsfqc13oxv4/2PZVKTj8T4Vkf0rGIw3NsK/2a8f32e7fe4e14ceaec20157001d328f/banner-home-app-ofertas_ate60.gif', title: 'Home 2772 Ofertas Reserva', height: 1400, width: 1080, __typename: 'HomeCarouselItemImageOutput',
    },
  }],
};

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <HomeCardsCarousel data={mockedCardCarousel as HomeCarouselOutput} />
  </ThemeProvider>
);

describe('HomeCardsCarousel', () => {
  beforeEach(async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    render(TestingComponent);
  });

  it('should render properly', () => {
    const card = screen.getByTestId('com.usereserva:id/cards_carrousel_animated_flat_list');
    expect(card).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
