import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { styles } from './styles';
import CardWrapper from './components/CardWrapper';
import { useHomeStore } from '../../../../zustand/useHomeStore';
import testProps from '../../../../utils/testProps';

export default function CategoryComponent() {
  const { offersCarousels } = useHomeStore(['offersCarousels']);

  const title = offersCarousels.map((item) => item.categoryCards?.sectionCardTitle);
  return (
    <View {...testProps('category_main_component')} style={styles.mainContainer}>
      <View style={styles.childrenContainer}>
        <View style={styles.containerRow}>
          <Text {...testProps('category_main_title')} style={styles.txtTitle}>{title}</Text>
        </View>
        <CardWrapper />
      </View>
    </View>
  );
}
