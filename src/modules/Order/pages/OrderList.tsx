import { useQuery } from '@apollo/client';
import * as React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Typography, Box } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import Order from '../Components/Order';
import { useEffect, useState } from 'react';
import { GET_ORDERS } from '../../../store/ducks/orders/gql';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const { data, loading, refetch } = useQuery(GET_ORDERS);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const { orders } = data;
      const completedOrders = orders.filter((x) => {
        if (x.state === 'payment-approved' || x.status === 'payment-approved') return true;
        return false
      })
      setOrders(completedOrders);
    }
  }, [data]);

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
            paddingY="xxxs"
            paddingX="xxxs"
            backgroundColor="white"
            width="100%"
          >
            {orders.length > 0 && !loading && (
              orders.map((order) => <Order data={order} />)
            )}

            {!loading && orders.length === 0 &&
              <Typography variant="tituloSessoes" fontSize={16}>
                Você ainda não tem pedidos!
              </Typography>
            }
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderList;
