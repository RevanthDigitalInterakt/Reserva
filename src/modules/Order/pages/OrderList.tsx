import { Box, Button, Typography } from '@danilomsou/reserva-ui';
import { loadingSpinner } from '@danilomsou/reserva-ui/src/assets/animations';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BackHandler, FlatList, SafeAreaView } from 'react-native';
import { IOrder, useCart } from '../../../context/CartContext';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import Order from '../Components/Order';



const OrderList = () => {
  const { orders } = useCart();
  const [ordersList, setOrdersList] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await orders(page.toString());
    if (data) {
      setOrdersList([...ordersList, ...data.list]);
      setTotalOrders(data.paging.total);
      setPage(page + 1);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('totalOrders', totalOrders);
  }, [totalOrders]);

  useEffect(() => {
    console.log('ordersList', ordersList);
  }, [ordersList]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  return (
    <>
      <SafeAreaView flex={1} backgroundColor="white">
        <TopBarBackButton loading={loading} showShadow />

        {ordersList && ordersList.length > 0 && (
          <FlatList
            onEndReached={() => {
              if (ordersList.length != totalOrders) {
                fetchOrders();
              }
            }}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={() => (
              <Box
                mb="xs"
                paddingHorizontal={20}
                justifyContent="flex-start"
                paddingTop="md"
              >
                <Typography variant="tituloSessoes" fontSize={20}>
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
              <Box paddingX="xxxs" bg="white" width="100%">
                <Order data={item} />
              </Box>
            )}
            keyExtractor={(item) => item.orderId.toString()}
          />
        )}
        {!loading && ordersList.length === 0 && (
          <Box flex={1} alignItems="center" paddingTop="60%">
            <Box mx={37}>
              <Typography fontFamily="reservaSerifRegular" fontSize={23}>
                Você ainda não tem pedidos realizados :(
              </Typography>
            </Box>
            <Box mx={58} my={28}>
              <Typography
                fontFamily="nunitoRegular"
                fontSize={14}
                textAlign="center"
              >
                Navegue pelo nosso app e compre os produtos que são a sua cara!
              </Typography>
            </Box>
            <Button
              title="NAVEGAR"
              variant="primarioEstreito"
              width={258}
              onPress={() => navigation.navigate('Home')}
            />
          </Box>
        )}
      </SafeAreaView>
    </>
  );
};

export default OrderList;
