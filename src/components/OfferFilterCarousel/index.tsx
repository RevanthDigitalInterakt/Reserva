import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import { Card } from './components/Card';

interface Offer {
  info: string;
  imageUrl: string;
  collectionId: string;
  title: string;
  prefix: string
}

interface OfferFilterCarouselProps {
  offers: Offer[]
  title: string;
}

export function OfferFilterCarousel({ offers, title }: OfferFilterCarouselProps) {
  // TODO: function handleRedirectToPDCWithSelectedPrice
  // TODO: function handleGetPricesCards

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
            prefix={offer.prefix}
            title={offer.title}
            imageUrl={offer.imageUrl}
            info={offer.info}
            key={offer.collectionId}
          />
        ))}
      </ScrollView>
    </View>

  );
}
