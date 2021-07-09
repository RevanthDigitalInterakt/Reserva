import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Typography, Box, Button, Alert, Icon } from "reserva-ui";
import { ordersQuery } from "../../../graphql/orders/ordersQuery";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import Order from "../Components/Order";
const OrderList = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = React.useState([]);
  const { data, loading} = useQuery(ordersQuery);

  React.useEffect(() => {
    if(!loading){
      setOrders(data.orders);
    }
  }, [data])

  return (
    <>
      <SafeAreaView flex={1} backgroundColor={"white"}>
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
            {
              orders.map((order) => (
                <Order data={order} />
              ))
            }
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderList;
