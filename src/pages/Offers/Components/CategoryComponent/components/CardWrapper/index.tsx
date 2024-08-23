import React from 'react';
import { View } from 'react-native';
import CategoryCard from '../CategoryCard';
import { styles } from './styles';
import { useHomeStore } from '../../../../../../zustand/useHomeStore';

export default function CardWrapper() {
  const { offersCarousels } = useHomeStore(['offersCarousels']);

  const sectionMediaCards = offersCarousels.map((item) => item?.categoryCards);

  if (!sectionMediaCards) return null;

  return (
    <View style={styles.mainContainer}>
      {sectionMediaCards.map((item) => (
        <CategoryCard
          key={item?.sectionMediaCards?.map((x) => x.id)}
          item={item?.sectionMediaCards}
        />
      ))}
    </View>
  );
}
