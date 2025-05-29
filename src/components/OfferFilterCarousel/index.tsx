import React from 'react';
import {
  View, Text, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { Card } from './components/Card';
import type { IFilters } from '../../utils/generateFacets';

interface Offer {
  offerImage: string;
  collectionId: string;
  offerName: string;
  fromPriceFilter?: string | null;
  toPriceFilter?: string | null;
  sizeFilter?: string | null;
  colorFilter?: string | null;
}

interface NavigateToCatalogParams {
  filters?: IFilters;
  referenceId?: string;
}

interface OfferFilterCarouselProps {
  offers: Offer[]
  title: string;
}

export function OfferFilterCarousel({ offers, title }: OfferFilterCarouselProps) {
  const navigation = useNavigation();
  const handleRedirectToCatalog = (offer: Offer) => {
    const navigationParams: NavigateToCatalogParams = {
      filters: { },
      referenceId: undefined,
    };

    if (offer.colorFilter) {
      navigationParams.filters!.colors = [
        {
          key: 'cor',
          value: offer.colorFilter[0]?.toLowerCase() || '',
        },
      ];
    }
    if (offer.sizeFilter) {
      navigationParams.filters!.sizes = [
        {
          key: 'tamanho',
          value: offer.sizeFilter[0]?.toUpperCase() || '',
        },
      ];
    }
    if (offer.fromPriceFilter && offer.toPriceFilter) {
      navigationParams.filters!.priceFilter = {
        from: Number(offer.fromPriceFilter),
        to: Number(offer.toPriceFilter),
      };
    }

    if (offer.collectionId) {
      navigationParams.referenceId = offer.collectionId;
    }

    navigation.navigate('ProductCatalog', navigationParams);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          gap: 8,
          paddingRight: 100,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {offers.map((offer) => (
          <Card
            handleRedirectToCatalog={() => handleRedirectToCatalog(
              offer,
            )}
            imageUrl={offer.offerImage}
            key={offer.offerName}
          />
        ))}
      </ScrollView>
    </View>

  );
}
