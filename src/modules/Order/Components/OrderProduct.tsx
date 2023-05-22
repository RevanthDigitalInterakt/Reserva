import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Typography, Box, Button, Image,
} from '@usereservaapp/reserva-ui';
import { images } from '../../../assets';
import { PriceCustom } from '../../Checkout/components/PriceCustom';
import EventProvider from '../../../utils/EventProvider';
import { defaultBrand } from '../../../utils/defaultWBrand';

type IOrderItemData = {
  listPrice?: number;
  name: string;
  price: number;
  sellingPrice: number;
  quantity: string;
  imageUrl: string;
  measurementUnit: string;
  productId: string;
  id: string;
};

interface IOrderProduct {
  orderItem: IOrderItemData;
}

const OrderProduct = ({ orderItem }: IOrderProduct) => {
  // TODO: repassar nesse componente. se possivel trocar com o que ja foi feito anteriormente.
  const { navigate } = useNavigation();

  return (
    <>
      <Box flexDirection="row" mt="xxs">
        <Box>
          {orderItem
            && (
              <Button
                onPress={() => {
                  EventProvider.logEvent('page_view', {
                    wbrand: defaultBrand.picapau,
                  });
                  EventProvider.logEvent('select_item', {
                    item_list_id: orderItem?.id,
                    item_list_name: orderItem?.name,
                    wbrand: defaultBrand.reserva,
                  });

                  navigate('ProductDetail', {
                    productId: orderItem?.productId?.trim(),
                    itemId: orderItem?.id?.trim(),
                    sizeSelected: orderItem?.name?.split('-')[1]?.trim() || '',
                  });
                }}
              >
                <Image
                  imageDefault={images?.imageNotFound}
                  variant="sm"
                  source={{
                    uri: orderItem?.imageUrl?.split('-55-55')?.join(''),
                  }}
                />
              </Button>
            )}
        </Box>

        <Box ml="micro" flex={1}>
          <Box mb="nano">
            <Typography fontSize={13} fontFamily="nunitoBold">
              {orderItem?.name?.split(' - ')[0]}
            </Typography>
          </Box>

          <Box flexDirection="row">
            <Typography
              color="neutroFrio2"
              fontSize={11}
              fontFamily="nunitoRegular"
            >
              De:
              {' '}
            </Typography>
            <PriceCustom
              fontFamily="nunitoSemiBold"
              sizeInterger={15}
              sizeDecimal={11}
              num={orderItem?.listPrice ? orderItem?.listPrice / 100 : 0}
            />
          </Box>
          <PriceCustom
            fontFamily="nunitoSemiBold"
            sizeInterger={15}
            sizeDecimal={11}
            num={orderItem.price / 100}
          />
        </Box>
      </Box>
    </>
  );
};

export default OrderProduct;
