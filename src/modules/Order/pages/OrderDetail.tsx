import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import {
  Typography,
  Box,
  Button,
  Alert,
  Icon,
  Stepper,
  Image,
} from "reserva-ui";
import { orderQuery } from "../../../graphql/orders/ordersQuery";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import Order from "../Components/Order";
import OrderDetailComponent, { } from "../Components/OrderDetailComponent";

type Props = StackScreenProps<RootStackParamList, 'OrderDetail'>;

export type IOrderData = {
  orderId: string;
  status: string;
  statusDescription: string;
  shippingData: {
    logisticsInfo: {
      itemIndex: string;
      selectedSla: string;
      slas: {
        shippingEstimate: string;
        shippingEstimateDate: string;
      }
    }
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
    }
  }
  items: [{
    name: string;
    price: string;
    sellingPrice: string;
    quantity: string;
    imageUrl: string;
    measurementUnit: string;
  }]
  value: string;
  totals: {
    id: string;
    name: string;
    value: string;
  }
  paymentData: {
    transactions: {
      isActive: string;
      merchantName: string;
      payments: {
        paymentSystemName: string;
        paymentSystem: string;
        lastDigits: string;
      }
    }
  }
}

const OrderList: React.FC<Props> = ({ route }) => {
  const { orderId } = route.params;
  const { data, loading, refetch } = useQuery(orderQuery, { variables: { orderId } });
  const [order, setOrder] = React.useState({} as IOrderData);

  React.useEffect(() => {
    if (!loading) {
      setOrder(data.order);
    }
  }, [data])

  React.useEffect(() => {
    refetch();
  }, [])

  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView flex={1} backgroundColor={"white"}>
        <TopBarBackButton loading={loading} showShadow />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {!loading && (
            <>
              <Box mb="xxxs" justifyContent="flex-start" paddingTop={"md"}>
                <Typography variant={"tituloSessoes"}>
                  Rastreamento de entrega
                </Typography>
              </Box>
              <Box paddingX="xxs" paddingY="xs">
                <Stepper
                  steps={["Pedido feito", "Confirmação", "Envio", "Entrega"]}
                  actualStepIndex={2}
                />
              </Box>

              <Box
                marginY="micro"
                borderBottomWidth={"hairline"}
                borderBottomColor={"divider"}
              >
                <Typography fontSize={14} fontFamily="nunitoBold">
                  Previsão: 04 de abril de 2021
                </Typography>
                <Typography
                  style={{ marginBottom: 17 }}
                  fontSize={14}
                  fontFamily="nunitoRegular"
                >
                  Endereço de entrega: {
                    order.shippingData &&
                    `${order.shippingData.address.street}, ${order.shippingData.address.number}, ${order.shippingData.address.neighborhood} - ${order.shippingData.address.city} - ${order.shippingData.address.state} - ${order.shippingData.address.postalCode}
                  `}
                </Typography>
              </Box>

              <OrderDetailComponent data={order} deliveryState={3} />

              <Typography
                style={{ marginTop: 45 }}
                fontFamily="reservaSerifRegular"
                fontSize={20}
              >
                Forma de pagamento
              </Typography>

              <Box mt={"xxs"} flexDirection="row" justifyContent="space-between">
                <Box flexDirection="row" alignItems="center">
                  <Icon name="Card" size={20} mr="nano" />
                  <Typography fontSize={12} fontFamily="nunitoRegular">
                    Cartão de crédito
                  </Typography>
                  <Typography
                    style={{ marginLeft: 10 }}
                    fontSize={12}
                    fontFamily="nunitoRegular"
                  >
                    **** 6582
                  </Typography>
                </Box>
                <Box flexDirection="row" alignItems="center">
                  <Typography fontSize={14} fontFamily="nunitoSemiBold">
                    10x
                  </Typography>
                  <Typography fontSize={14} fontFamily="nunitoSemiBold">
                    R$ 100,00
                  </Typography>
                </Box>
              </Box>

              <Box mb={"md"} mt="md">
                <Box width="100%">
                  <Button
                    inline
                    title="PRECISO DE AJUDA"
                    variant="primarioEstreitoOutline"
                    onPress={() => {
                      navigation.navigate("HelpCenter");
                    }}
                  />
                </Box>
                <Box my="xxxs">
                  <Button
                    inline
                    onPress={() => {
                      navigation.navigate("OrderCancel");
                    }}
                    title="Desejo cancelar meu pedido"
                  >
                    <Typography
                      style={{ textDecorationLine: "underline" }}
                      fontSize="12px"
                      fontFamily="nunitoRegular"
                    >
                      Desejo cancelar meu pedido
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderList;
