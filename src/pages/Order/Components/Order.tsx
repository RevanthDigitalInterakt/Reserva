import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { stringToReal } from '../../../utils/stringToReal';
import { platformType } from '../../../utils/platformType';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Divider } from '../../../components/Divider/Divider';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';

type IOrderData = {
  orderId: string;
  creationDate: string;
  clientName: string;
  items: null;
  totalValue: number;
  paymentNames: string;
  status: string;
  statusDescription: string;
  marketPlaceOrderId: null;
  sequence: string;
  salesChannel: string;
  affiliateId: string;
  origin: string;
  workflowInErrorState: boolean;
  workflowInRetry: boolean;
  lastMessageUnread: string;
  ShippingEstimatedDate: null;
  ShippingEstimatedDateMax: null;
  ShippingEstimatedDateMin: null;
  orderIsComplete: boolean,
  listId: null;
  listType: null;
  authorizedDate: null;
  callCenterOperatorName: null;
  totalItems: number;
  currencyCode: string;
  hostname: string;
  invoiceOutput: null;
  invoiceInput: null;
  lastChange: string;
  isAllDelivered: boolean;
  isAnyDelivered: boolean;
  giftCardProviders: null;
  orderFormId: string;
  paymentApprovedDate: null;
  readyForHandlingDate: null;
  deliveryDates: null
};
interface IOrder {
  onPress?: () => void;
  delivered?: boolean;
  pixPending?: boolean;
  obj?: object;
  data: IOrderData;
}

function Order({ data: order }: IOrder) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', { order })}>
      <Box
        style={{ elevation: 6 }}
        boxShadow={Platform.OS === platformType.IOS ? 'topBarShadow' : null}
        mb="xxxs"
        width="100%"
        minHeight={132}
        backgroundColor="white"
      >
        <Box
          paddingY="micro"
          paddingX="micro"
        >
          <Box flexDirection="row" justifyContent="space-between">
            <Typography
              fontSize={16}
              fontFamily="reservaSerifRegular"
              color="preto"
            >
              Número do pedido
            </Typography>

            <Typography fontSize={20} fontFamily="nunitoBold" color="preto">
              {stringToReal(String(order?.totalValue))}
            </Typography>
          </Box>

          <Typography
            fontSize={20}
            fontFamily="reservaSerifBold"
            color="vermelhoRSV"
          >
            {order.orderId}
          </Typography>

          <Box mt="nano">
            <Typography fontSize={14} fontFamily="nunitoRegular" color="preto">
              Data do Pedido:
              {' '}
              {format(new Date(order.creationDate), 'dd/MM/yy', { locale: ptBR })}
            </Typography>
          </Box>

          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              style={{ marginTop: 5, marginBottom: 5 }}
              mt="micro"
              fontSize={14}
              fontFamily="nunitoBold"
              color={
                ['payment-pending', 'canceled'].includes(order.status)
                  ? 'vermelhoAlerta'
                  : 'verdeSucesso'
              }
            >
              {order.statusDescription}
            </Typography>
          </Box>
        </Box>

        <Divider variant="fullWidth" mt="micro" />

        <Box alignItems="center" pt="micro">
          <IconLegacy name="ArrowDown" size={20} />
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

export default Order;
