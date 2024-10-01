import React from 'react';
import { render } from '@testing-library/react-native';
import { OfferFilterCarousel } from '..';

const offers = [
  {
    info: '56',
    imageUrl: 'https://google.com.br',
    collectionId: '123',
    title: 'test 1',
    prefix: '',
  },
  {
    info: '57',
    imageUrl: 'https://google.com.br',
    collectionId: '321',
    title: 'test 2',
    prefix: '',
  },
];

describe('OfferFilter Carousel', () => {
  it('should display explore by price title', () => {
    const root = render(<OfferFilterCarousel title="Navegue por preço" offers={offers} />);
    const title = root.getByText('Navegue por preço');
    expect(root).toBeDefined();
    expect(title).toBeDefined();
  });
  it.skip('should display all offer prices', () => {
    const root = render(<OfferFilterCarousel title="Navegue por preço" offers={offers} />);
    expect(root).toBeDefined();
    offers.forEach((offer) => {
      const offerPrice = root.getByText(offer.info);
      expect(offerPrice).toBeDefined();
    });
  });
});
