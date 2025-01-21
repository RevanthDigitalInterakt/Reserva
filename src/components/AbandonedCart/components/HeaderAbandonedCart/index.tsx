import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import EventProvider from '../../../../utils/EventProvider';
import { Actions } from '../../../../utils/EventProvider/Event';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import testProps from '../../../../utils/testProps';
import IconChevronRightSmall from '../../../../../assets/icons/IconChevronRightSmall';

function HeaderAbandonedCart() {
  const navigation = useNavigation();
  const { getBoolean } = useRemoteConfig();
  const showButtonSeeBag = useMemo(() => getBoolean('show_button_see_bag'), []);

  const onClickSeeBag = useCallback(() => {
    try {
      EventProvider.logEvent('abandoned_cart', { action: Actions.see_bag });
      navigation.navigate('BagScreen');
    } catch (error) {
      ExceptionProvider.captureException(error, "HeaderAbandonedCart.ts");
    }
  }, []);
  return (
    <View
      style={styles.topContainer}
      {...testProps('abandoned_cart_header_container')}
    >
      <Text
        style={styles.txtTitle}
        {...testProps('abandoned_cart_title')}
      >
        Continue comprando
      </Text>
      {showButtonSeeBag && (
        <TouchableOpacity
          onPress={() => onClickSeeBag()}
          {...testProps('abandoned_cart_button_see_bag')}
        >
          <View
            {...testProps('abandoned_cart_text_see_bag_container')}
            style={styles.seeBagContainer}
          >
            <Text
              {...testProps('abandoned_cart_text_see_bag')}
              style={styles.txtSeeBag}
            >
              Ver sacola
            </Text>
            <View
              style={styles.iconContainer}
              {...testProps('abandoned_cart_icon_container')}
            >
              <IconChevronRightSmall width={12} height={12} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default HeaderAbandonedCart;
