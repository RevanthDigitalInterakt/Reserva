import React, { useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import IconDropdown from '../../../../../../assets/icons/IconDropdown';
import { ShelfItemCard } from '../ShelfItemCard';
import type { IRsvRecommendation } from '..';
import EventProvider from '../../../../../utils/EventProvider';

interface IShelfProps {
  dataShelf: IRsvRecommendation;
}

export default function WrapperShelf({ dataShelf }: IShelfProps) {
  const { navigate } = useNavigation();

  const onClickShowAll = useCallback(() => {
    EventProvider.logEvent('shelf_offers_button_see_more', {});
    // @ts-ignore
    navigate('ProductCatalog', { referenceId: dataShelf?.id });
  }, []);

  return (
    <View style={styles.shelfContainer}>
      <Text style={styles.textShelfTitle}>{dataShelf.shelfTitle}</Text>
      <View style={styles.shelf}>
        <Text style={styles.textShelfName}>{dataShelf.shelfName}</Text>
        <TouchableOpacity onPress={onClickShowAll}>
          <View style={styles.actionTitleContent}>
            <Text style={styles.actionTitleText}>
              Ver tudo
            </Text>
            <View style={styles.iconContainer}>
              <IconDropdown width={20} height={20} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ overflow: 'visible' }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={dataShelf.products}
        keyExtractor={(item, index) => item.productId + index.toString()}
        renderItem={({ item }) => <ShelfItemCard product={item} />}
      />
    </View>
  );
}
