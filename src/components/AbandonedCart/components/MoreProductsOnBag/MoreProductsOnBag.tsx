import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconComponent from '../../../IconComponent/IconComponent';
import { styles } from './styles';
import EventProvider from '../../../../utils/EventProvider';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { Actions } from '../../../../utils/EventProvider/Event';

function MoreProductsOnBag() {
  const navigation = useNavigation();

  const onTouchOpacity = useCallback((action: Actions) => {
    try {
      EventProvider.logEvent('abandoned_cart', { action });
      navigation.navigate('BagScreen');
    } catch (error) {
      ExceptionProvider.captureException(error, "onTouchOpacity - MoreProductsOnBag.ts");
    }
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onTouchOpacity(Actions.click_on_card_more_items)}
      >
        <View style={styles.childContainer}>
          <IconComponent style={styles.icon} icon="abandonedCartBag" />
          <View style={styles.textMoreItemsContainer}>
            <Text style={styles.textMoreItems}>Você tem mais produtos</Text>
            <Text style={styles.textMoreItems}>na sacola</Text>
          </View>
          <View style={styles.textSeeAllProductsContainer}>
            <Text style={styles.textSeeAllProducts}>Visualizar todos produtos</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MoreProductsOnBag;
