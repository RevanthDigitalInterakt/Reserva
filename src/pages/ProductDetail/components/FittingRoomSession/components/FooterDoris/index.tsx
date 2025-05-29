import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import testProps from '../../../../../../utils/testProps';

interface IFooterDoris {
  enabledBtnFullDoris: boolean;
}

export default function FooterDoris({ enabledBtnFullDoris }: IFooterDoris) {
  return (
    <View
      {...testProps('footer_doris')}
      style={styles.containerFooterDoris}
    >
      <Text style={styles.txtFooterDoris}>
        Vista a roupa que está vendo
        {' '}
        <Text style={styles.txtFooterDorisBold}>
          em você
        </Text>
        {' '}
        ou em modelos com corpos
        similares ao seu
        {!enabledBtnFullDoris && (<Text>.</Text>)}
        {' '}
        {enabledBtnFullDoris && (
          <Text>
            ou se preferir, consulte o guia de medidas.
          </Text>
        )}
      </Text>
    </View>
  );
}
