import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Divider } from '../../../../components/Divider/Divider';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { stringToReal } from '../../../../utils/stringToReal';
import styles from './styles';
import { COLORS } from '../../../../base/styles';
import { useOrderListStore } from '../../../../zustand/useOrderListStore/useOrderListStore';

function LastOrder() {
  const navigation = useNavigation();
  const { lastOrder: order } = useOrderListStore(['lastOrder']);

  if (!order) return null;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetail', { order })}
    >
      <View style={styles.mainContainer}>
        <View style={styles.bodyContainer}>

          <View style={styles.numberOrderContainer}>
            <Text style={styles.textOrder}>Número do Pedido</Text>
            <Text style={styles.textOrderValue}>{stringToReal(String(order?.value))}</Text>
          </View>

          <Text style={styles.textOrderId}>
            {order?.orderId}
          </Text>

          <View style={styles.orderDateContainer}>
            <Text style={styles.textOrderDate}>
              Data do Pedido:
              {' '}
              {format(new Date(order?.creationDate), 'dd/MM/yy', { locale: ptBR })}
            </Text>
          </View>

          <View style={styles.statusDescriptionContainer}>
            <Text style={[
              styles.textStatusDescription, {
                color: ['payment-pending', 'canceled'].includes(order?.status)
                  ? COLORS.ALERT
                  : COLORS.SUCCESS_GREEN,
              },
            ]}
            >
              {order?.statusDescription}
            </Text>
          </View>

        </View>

        <Divider variant="fullWidth" mt="micro" />

        <View style={styles.iconContainer}>
          <IconLegacy name="ArrowDown" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default LastOrder;
