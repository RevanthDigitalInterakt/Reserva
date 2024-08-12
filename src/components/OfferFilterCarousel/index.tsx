import React from 'react';
import {
  View, Text, ScrollView, Linking,
} from 'react-native';
import { styles } from './styles';
import { Card } from './components/Card';

interface Offer {
  offerImage: string;
  collectionId: string;
}

interface OfferFilterCarouselProps {
  offers: Offer[]
  title: string;
}

export function OfferFilterCarousel({ offers, title }: OfferFilterCarouselProps) {
  const handleRedirectToCatalog = (collectionId: string) => {
    Linking.openURL(`usereserva://catalog/collection:${collectionId}`);
  };
  const handleFormatCollectionId = (collectionId: string) => collectionId.split(':')[1];

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
              handleFormatCollectionId(offer.collectionId)!,
            )}
            imageUrl={offer.offerImage}
            key={offer.collectionId}
          />
        ))}
      </ScrollView>
    </View>

  );
}
