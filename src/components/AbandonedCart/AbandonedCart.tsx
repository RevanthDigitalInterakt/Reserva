import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles } from './styles';
import ItemsCardWrapper from './components/ItemsCardWrapper';
import FooterAbandonedCart from './components/FooterAbandonedCart';
import HeaderAbandonedCart from './components/HeaderAbandonedCart';
import testProps from '../../utils/testProps';

function AbandonedCart() {
  return (
    <SafeAreaView>
      <View style={styles.container} {...testProps('abandoned_cart_container')}>
        <HeaderAbandonedCart />
        <ItemsCardWrapper />
        <FooterAbandonedCart />
      </View>
    </SafeAreaView>
  );
}

export default AbandonedCart;
