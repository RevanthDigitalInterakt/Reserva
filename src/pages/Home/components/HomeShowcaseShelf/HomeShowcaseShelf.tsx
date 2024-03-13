import React from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import { styles } from './HomeShowcaseShelf.styles';
import type { IRsvRecommendation } from '../HomeShowcase/HomeShowcase';
import { HomeShowcaseCards } from '../HomeShowcaseCards/HomeShowcaseCards';

interface IShelfProps {
  dataShelf: IRsvRecommendation;
}

export default function Shelf({ dataShelf }: IShelfProps) {
  return (
    <View style={styles.shelfContainer}>
      <View style={styles.shelf}>
        <Text style={styles.shelfTitle}>{dataShelf.shelfTitle}</Text>
      </View>
      <FlatList
        horizontal
        data={dataShelf.products}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => <HomeShowcaseCards product={item} />}
      />
    </View>
  );
}
