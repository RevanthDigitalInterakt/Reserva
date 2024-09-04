import React, { useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './HomeShowcaseShelf.styles';
import type { IRsvRecommendation } from '../HomeShowcase/HomeShowcase';
import { HomeShowcaseCards } from '../HomeShowcaseCards/HomeShowcaseCards';
import { FONTS } from '../../../../base/styles';
import IconDropdown from '../../../../../assets/icons/IconDropdown';

interface IShelfProps {
  dataShelf: IRsvRecommendation;
}

export default function Shelf({ dataShelf }: IShelfProps) {
  const { navigate } = useNavigation();

  const onClickShowAll = useCallback(() => {
    navigate('ProductCatalog', { referenceId: dataShelf.id });
  }, []);

  return (
    <View style={styles.shelfContainer}>
      <Text style={styles.shelfTitle}>{dataShelf.shelfTitle}</Text>
      <View style={styles.shelf}>
        <Text style={{
          fontFamily: FONTS.RESERVA_SANS_BOLD,
          fontSize: 14,
          marginTop: 5,
        }}
        >
          {dataShelf.shelfName}
        </Text>
        <TouchableOpacity onPress={onClickShowAll}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#969CA4', fontFamily: FONTS.NUNITO_SEMI_BOLD, fontSize: 12 }}>
              Ver tudo
            </Text>
            <IconDropdown />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={dataShelf.products}
        keyExtractor={(item, index) => item.productId + index.toString()}
        renderItem={({ item }) => <HomeShowcaseCards product={item} />}
      />
    </View>
  );
}
