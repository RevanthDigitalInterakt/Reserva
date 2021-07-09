import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Typography, Box } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import Order from '../Components/Order';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../../store/ducks/orders/gql';
import { useEffect, useState } from 'react';
const OrderList = () => {
  const navigation = useNavigation();
  const { data, loading, refetch } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <SafeAreaView flex={1} backgroundColor={'white'}>
        <TopBarBackButton loading={loading} showShadow />

        <ScrollView>
          <Box
            mb="xxxs"
            paddingHorizontal={20}
            justifyContent="flex-start"
            paddingTop={'md'}
          >
            <Typography variant={'tituloSessoes'} fontSize={20}>
              Meus pedidos
            </Typography>
          </Box>
          <Box
            flex={1}
            paddingY={'xxxs'}
            paddingX={'xxxs'}
            bg="backgoundInput"
            width={'100%'}
          >
            {/* aqui dentro os pedidos */}
            {orders.length > 0 &&
              orders.map(() => (
                <Order
                  onPress={() => {
                    navigation.navigate('OrderDetail', { pixPending: true });
                  }}
                />
              ))}
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderList;
