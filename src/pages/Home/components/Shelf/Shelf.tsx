import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from './Shelf.styles';
import type { IShelf } from '../HomeShowcase/HomeShowcase';
import { HomeShowcaseCards } from '../HomeShowcaseCards/HomeShowcaseCards';

interface IShelfProps {
  dataShelf: IShelf;
}

export default function Shelf({ dataShelf }: IShelfProps) {
  return (
    <View style={styles.shelfContainer}>
      <View style={styles.shelf}>
        <Text style={styles.shelfName}>{dataShelf.shelfName}</Text>
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
