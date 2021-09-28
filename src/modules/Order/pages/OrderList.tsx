import { useQuery } from '@apollo/client';
import * as React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Typography, Box } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import Order from '../Components/Order';
import { useEffect, useState } from 'react';
import { GET_ORDERS } from '../../../store/ducks/orders/gql';
import { IOrder, useCart } from '../../../context/CartContext';

const OrderList = () => {
  const { orders } = useCart()
  // const [ordersList, setOrdersList] = useState<IOrder[]>([]);
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { data, loading, refetch } = useQuery(GET_ORDERS, { fetchPolicy: "no-cache" });

  // useEffect(() => {
  //   refetch();
  // }, []);

  const fetchOrders = async () => {
    setLoading(true)
    const list = await orders()
    console.log('dataorders', list)
    if (list) {
      const completedOrders = list.filter((x) => {
        if (x.status != 'canceled') return true;
        return false
      })
      console.log('completedOrders', completedOrders)
      setOrdersList(completedOrders)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    console.log('ordersList', ordersList)
  }, [ordersList])

  // useEffect(() => {
  //   if (!loading && data) {
  //     const { orders } = data;
  //     const completedOrders = orders.filter((x) => {
  //       if (x.state != 'canceled' && x.isCompleted === true) return true;
  //       return false
  //     })
  //     setOrdersList(completedOrders);
  //   }
  // }, [data]);

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
            {ordersList && ordersList.length > 0 && !loading && (
              ordersList.map((order) => <Order data={order} />)
            )}

            {!loading && ordersList.length === 0 &&
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
