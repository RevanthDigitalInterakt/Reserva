import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import LastOrder from '../LastOrder/LastOrder';

interface IListHeader {
  isLastPurchase?: boolean;
}

function ListHeader({ isLastPurchase }: IListHeader) {
  return (
    <View>
      <View
        style={styles.mainContainer}
      >
        <Text style={styles.textTitle}>
          Meus pedidos
        </Text>
      </View>

      {isLastPurchase && (
        <View style={styles.lastOrderContainer}>
          <LastOrder />
        </View>
      )}
    </View>
  );
}

export default ListHeader;
