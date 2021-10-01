import { useQuery } from '@apollo/client';
import * as React from 'react';
import { SafeAreaView, ScrollView, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import { Typography, Box } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import Order from '../Components/Order';
import { useEffect, useState } from 'react';
import { GET_ORDERS } from '../../../store/ducks/orders/gql';
import { IOrder, useCart } from '../../../context/CartContext';
import { loadingSpinner } from 'reserva-ui/src/assets/animations';

const OrderList = () => {
  const { orders } = useCart();
  const [ordersList, setOrdersList] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [])

  const fetchOrders = async () => {
    if (loading) return;
    setLoading(true);
    const list = await orders(page.toString());
    if (list) {
      setOrdersList([...ordersList, ...list]);
      setPage(page + 1)
      setLoading(false)
    }
  }

  return (
    <>
      <SafeAreaView flex={1} backgroundColor={'white'}>
        <TopBarBackButton loading={loading} showShadow />

        {/* {ordersList && ordersList.length > 0 && !loading && (
              ordersList.map((order) => <Order data={order} />)
            )} */}
        {ordersList && ordersList.length > 0 && (
          <FlatList
            onEndReached={fetchOrders}

            onEndReachedThreshold={0.1}
            ListHeaderComponent={() => (
              <Box
                mb="xs"
                paddingHorizontal={20}
                justifyContent="flex-start"
                paddingTop={'md'}
              >
                <Typography variant={'tituloSessoes'} fontSize={20}>
                  Meus pedidos
                </Typography>
              </Box>
            )}
            ListFooterComponent={() => {
              if (!loading) return null;

              return (
                <Box
                  width="100%"
                  height={80}
                  color="verdeSucesso"
                  justifyContent="center"
                  alignItems="center"
                >
                  <LottieView
                    source={loadingSpinner}
                    style={{
                      width: 40,
                    }}
                    autoPlay
                    loop
                  />
                </Box>
              );
            }}
            data={ordersList}
            renderItem={({ item }) => (
              <Box
                paddingX="xxxs"
                bg="white"
                width="100%"
              >
                <Order data={item} />
              </Box>
            )}
            keyExtractor={(item) => item.orderId.toString()}
          />
        )}
        {!loading && ordersList.length === 0 &&
          <Typography variant="tituloSessoes" fontSize={16}>
            Você ainda não tem pedidos!
          </Typography>
        }
      </SafeAreaView>
    </>
  );
};

export default OrderList;
