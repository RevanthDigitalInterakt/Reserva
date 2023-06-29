import React from 'react';
import { CarrouselTypes } from '../../../graphql/homePage/HomeQuery';
import Banner from './Banner';
import DefaultCarrousel from './Carousel';
import { CardsCarrousel } from './CardsCarousel';
import BrandsComponent from './Brands/Brands';

const brandsCarousels = {
  type: CarrouselTypes.brands,
  title: 'Brands',
  itemsCollection: {
    items: [{ image: { url: 'brands' } }],
  },
};

function ManagerCarousel({ carousels }) {
  if (!carousels?.length) {
    return null;
  }

  // TODO create type
  const newCarousels: any = [...carousels.slice(0, 1),
    brandsCarousels,
    ...carousels.slice(1, carousels.length),
  ];

  return newCarousels.map((carousel) => {
    const isValidCarrousel = carousel
    && carousel.itemsCollection
    && carousel.itemsCollection.items
    && carousel.itemsCollection.items.length > 0;

    if (!isValidCarrousel) {
      return null;
    }

    const {
      image: { url },
      reference,
      reservaMini,
      orderBy,
    } = carousel?.itemsCollection?.items[0];

    const key = `carousel-${url}`;
    const isCarrousel = carousel.itemsCollection.items.length > 1;

    switch (carousel?.type) {
      case CarrouselTypes.mainCarrousel: {
        return (
          isCarrousel ? (
            <DefaultCarrousel
              key={key}
              carrousel={carousel}
            />
          )
            : (
              <Banner
                key={key}
                reference={reference || ''}
                url={url}
                reservaMini={reservaMini}
                orderBy={orderBy}
              />
            )
        );
      }

      case CarrouselTypes.cardsCarrousel: {
        return isCarrousel ? (
          <CardsCarrousel
            key={key}
            carrousel={carousel}
          />
        ) : (
          <Banner
            key={key}
            reference={reference || ''}
            url={url}
            reservaMini={reservaMini}
            orderBy={orderBy}
          />
        );
      }

      case CarrouselTypes.banner: {
        return (
          <Banner
            key={key}
            orderBy={orderBy}
            reference={reference}
            url={url}
            reservaMini={reservaMini}
          />
        );
      }

      case CarrouselTypes.brands: {
        return (
          <BrandsComponent key={key} />
        );
      }

      default: {
        return null;
      }
    }
  });
}

export default ManagerCarousel;
