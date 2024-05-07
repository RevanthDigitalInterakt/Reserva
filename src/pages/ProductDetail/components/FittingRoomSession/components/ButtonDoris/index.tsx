import React, { useCallback } from 'react';
import Config from 'react-native-config';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IconComponent from '../../../../../../components/IconComponent/IconComponent';
import styles from './styles';
import testProps from '../../../../../../utils/testProps';

interface IButtonDoris {
  enabledBtnFullDoris: boolean;
  productEan?: string;
}

export default function ButtonDoris({ enabledBtnFullDoris, productEan }: IButtonDoris) {
  const navigation = useNavigation();
  const goToWebviewDoris = useCallback(async (ean?: string) => {
    if (!ean) return;

    navigation.navigate('Doris', {
      url: `${Config.DORIS_URL}?ean=${ean}`,
    });
  }, []);

  return (
    <View
      {...testProps('component_button_doris')}
      style={enabledBtnFullDoris ? styles.containerDoris : null}
    >
      <View style={styles.containerNew}>
        <Text
          {...testProps('txt_new')}
          style={styles.txtNew}
        >
          NOVO
        </Text>
      </View>
      <TouchableOpacity
        {...testProps('button_doris')}
        onPress={() => goToWebviewDoris(productEan)}
      >
        <View
          style={enabledBtnFullDoris ? styles.containerBtnDorisFull : styles.containerBtnDoris}
        >
          <IconComponent
            icon="hanger"
          />
          <Text style={styles.txtDoris}>
            vista em você
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
