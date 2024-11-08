import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IconComponent from '../../../../../../components/IconComponent/IconComponent';
import styles from './styles';
import testProps from '../../../../../../utils/testProps';
import EventProvider from '../../../../../../utils/EventProvider';
import useDorisStore from '../../../../../../zustand/useDorisStore';
import { useBagStore } from '../../../../../../zustand/useBagStore/useBagStore';

interface IButtonDoris {
  enabledBtnFullDoris: boolean;
  productEan?: string;
  productId?: string;
}

export default function ButtonDoris({
  enabledBtnFullDoris,
  productEan,
  productId,
}: IButtonDoris) {
  const navigation = useNavigation();
  const { setDorisUrl } = useDorisStore(['setDorisUrl']);
  const { orderFormId } = useBagStore(['orderFormId']);
  const goToWebviewDoris = useCallback(async (ean?: string) => {
    if (!ean) return;

    setDorisUrl(ean, orderFormId);
    navigation.navigate('Doris');

    if (productId) {
      EventProvider.logEvent('doris_button', {
        product_id: productId,
        product_ean: ean,
      });
    }
  }, []);

  return (
    <View
      {...testProps('component_button_doris')}
      style={enabledBtnFullDoris ? styles.containerDoris : null}
    >
      <View style={styles.containerNew}>
        <Text {...testProps('txt_new')} style={styles.txtNew}>
          NOVO
        </Text>
      </View>
      <TouchableOpacity
        {...testProps('button_doris')}
        onPress={() => goToWebviewDoris(productEan)}
      >
        <View
          style={
            enabledBtnFullDoris
              ? styles.containerBtnDorisFull
              : styles.containerBtnDoris
          }
        >
          <IconComponent icon="hanger" />
          <Text style={styles.txtDoris}>vista em você</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
