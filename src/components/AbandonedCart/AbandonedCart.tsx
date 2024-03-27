import React, { useCallback, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import IconComponent from '../IconComponent/IconComponent';
import ItemsCardWrapper from './components/ItemsCardWrapper';
import FooterAbandonedCart from './components/FooterAbandonedCart/FooterAbandonedCart';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import EventProvider from '../../utils/EventProvider';
import { Actions } from '../../utils/EventProvider/Event';

function AbandonedCart() {
  const navigation = useNavigation();
  const { getBoolean } = useRemoteConfig();
  const showButtonSeeBag = useMemo(() => getBoolean('show_button_see_bag'), []);

  const onClickSeeBag = useCallback(() => {
    try {
      EventProvider.logEvent('abandoned_cart', { action: Actions.see_bag });
      navigation.navigate('BagScreen');
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.txtTitle}>Continue comprando</Text>
          {showButtonSeeBag && (
            <TouchableOpacity
              onPress={() => onClickSeeBag()}
            >
              <View style={styles.seeBagContainer}>
                <Text style={styles.txtSeeBag}>Ver sacola</Text>
                <View style={styles.iconContainer}>
                  <IconComponent style={styles.iconChevronRight} icon="chevronRight" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <ItemsCardWrapper />
        <FooterAbandonedCart />
      </View>
    </SafeAreaView>
  );
}

export default AbandonedCart;
