import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import type { SectionMediaCardsOutput } from '../../../../../../base/graphql/generated';
import ImageComponent from '../../../../../../components/ImageComponent/ImageComponent';

interface ICategoryCard {
  item: SectionMediaCardsOutput[];
}

export default function CategoryCard({ item }: ICategoryCard) {
  return (
    <TouchableOpacity style={styles.childContainer}>
      {item.image && (
        <ImageComponent
          source={{ uri: item.image?.url }}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
}
