import React, { useCallback } from 'react';
import {
  Alert,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import OrderProduct from './OrderProduct';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import type { IVtexServiceRequestOrder } from '../../../services/vtexService';
import { PriceCustom } from '../../../modules/Checkout/components/PriceCustom';
import IconCopyToClipboard from '../../../../assets/icons/IconCopyToClipboard';

export type IOrderData = {
  orderId: string;
  status: string;
  statusDescription: string;
  state: string;
  shippingData: {
    logisticsInfo: {
      itemIndex: string;
      selectedSla: string;
      slas: {
        shippingEstimate: string;
        shippingEstimateDate: string;
      };
    };
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
    };
  };
  items: [
    {
      name: string;
      price: string;
      sellingPrice: string;
      quantity: string;
      imageUrl: string;
      measurementUnit: string;
    },
  ];
  value: number;
  totals: [
    {
      id: string;
      name: string;
      value: string;
    },
  ];
  paymentData: {
    transactions: {
      isActive: string;
      merchantName: string;
      payments: {
        paymentSystemName: string;
        paymentSystem: string;
        lastDigits: string;
      };
    };
  };
};

interface IOrderDetailComponent {
  data: IVtexServiceRequestOrder;
  deliveryState: number;
}

function OrderDetailComponent({ data }: IOrderDetailComponent) {
  const copyToClipBoard = useCallback(() => {
    Clipboard.setString(data?.orderId);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Código copiado com suceso', ToastAndroid.SHORT);
      return;
    }

    Alert.alert('', 'Código copiado com sucesso', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'OK', onPress: () => {} },
    ]);
  }, []);

  return (
    <Box>
      <Box mt="xxs" flexDirection="row" justifyContent="space-between">
        <Typography
          fontFamily="reservaDisplayRegular"
          fontSize={20}
          color="vermelhoRSV"
        >
          {data?.orderId && data?.orderId}
        </Typography>
        <TouchableOpacity
          onPress={copyToClipBoard}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <IconCopyToClipboard />
          <Text style={{ marginLeft: 5 }}>Copiar</Text>
        </TouchableOpacity>
      </Box>
      {data?.items?.length > 0 && data.items.map(
        (item) => <OrderProduct key={item.productId} orderItem={item} />,
      )}

      {data
      && (
        <Box mt="xs" flexDirection="row" justifyContent="space-between">
          <Typography variant="precoAntigo3">Subtotal</Typography>
          <PriceCustom
            fontFamily="nunitoSemiBold"
            sizeInterger={15}
            sizeDecimal={11}
            num={
              (data?.totals?.find(({ id }) => id === 'Items')?.value || 0) / 100 || 0
            }
          />
        </Box>
      )}
      {data
      && (
        <Box mt="micro" flexDirection="row" justifyContent="space-between">
          <Typography variant="precoAntigo3">Frete</Typography>

          <PriceCustom
            fontFamily="nunitoSemiBold"
            sizeInterger={15}
            sizeDecimal={11}
            num={
              (data?.totals?.find(({ id }) => id === 'Shipping')?.value || 0) / 100 || 0
            }
          />
        </Box>
      )}
      {data
      && (
        <Box mt="micro" flexDirection="row" justifyContent="space-between">
          <Typography variant="precoAntigo3">Descontos</Typography>
          <PriceCustom
            fontFamily="nunitoSemiBold"
            sizeInterger={15}
            negative
            sizeDecimal={11}
            num={Math.abs((data.totals?.find(({ id }) => id === 'Discounts')?.value || 0) / 100 || 0)}
          />
        </Box>
      )}
      {data
      && (
        <Box
          mt="xxxs"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="precoAntigo3">Total</Typography>
          <PriceCustom
            fontFamily="nunitoBold"
            sizeInterger={20}
            sizeDecimal={11}
            num={data.value / 100}
          />
        </Box>
      )}
    </Box>
  );
}

export default OrderDetailComponent;
