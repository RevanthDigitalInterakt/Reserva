import React from 'react';
import { View } from 'react-native';
import CategoryCard from '../CategoryCard';
import { styles } from './styles';
import { useHomeStore } from '../../../../../../zustand/useHomeStore';
import testProps from '../../../../../../utils/testProps';

export default function CardWrapper() {
  const { offersCarousels } = useHomeStore(['offersCarousels']);

  const [SectionMediaCardsOutput] = offersCarousels
    .map((item) => item?.categoryCards?.sectionMediaCards);

  if (!SectionMediaCardsOutput) return null;

  return (
    <View {...testProps('category_wrapper_component')} style={styles.mainContainer}>
      {SectionMediaCardsOutput?.map((item) => (
        <CategoryCard
          key={item.id}
          id={item.id}
          url={item.image?.url}
          referenceId={item.reference}
        />
      ))}
    </View>
  );
}
