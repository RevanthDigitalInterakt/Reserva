import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { PriceCustom } from '../../Checkout/components/PriceCustom';
import EventProvider from '../../../utils/EventProvider';
import { defaultBrand } from '../../../utils/defaultWBrand';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';
import configDeviceSizes from '../../../utils/configDeviceSizes';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography/Typography';

type IOrderItemData = {
  listPrice?: number;
  name: string;
  price: number;
  sellingPrice: number;
  quantity: string;
  imageUrl: string;
  measurementUnit: string;
  attachments: any[];
  productId: string;
  id: string;
};

interface IOrderProduct {
  orderItem: IOrderItemData;
}

function OrderProduct({ orderItem }: IOrderProduct) {
  const { navigate } = useNavigation();

  return (
    <Box flexDirection="row" mt="xxs">
      <Box>
        {orderItem
            && (
              <Button
                onPress={() => {
                  EventProvider.logEvent('page_view', {
                    item_brand: defaultBrand.picapau,
                  });
                  EventProvider.logEvent('select_item', {
                    item_list_id: orderItem?.id,
                    item_list_name: orderItem?.name,
                    item_brand: defaultBrand.reserva,
                  });

                  navigate('ProductDetail', {
                    productId: orderItem?.productId?.trim(),
                    itemId: orderItem?.id?.trim(),
                    sizeSelected: orderItem?.name?.split('-')[1]?.trim() || '',
                  });
                }}
              >

                {orderItem.attachments.length > 0 ? (
                  <ImageBackground
                    source={{ uri: orderItem?.imageUrl }}
                    resizeMode="contain"
                    style={{
                      width: configDeviceSizes.DEVICE_WIDTH * 0.25,
                      height: 160,
                      position: 'relative',
                    }}
                  >
                    <Image
                      source={{ uri: orderItem.attachments[0] }}
                      resizeMode="contain"
                      style={{
                        width: configDeviceSizes.DEVICE_WIDTH * 0.12,
                        height: configDeviceSizes.DEVICE_WIDTH * 0.12,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: [{ translateX: -(configDeviceSizes.DEVICE_WIDTH * 0.06) },
                          { translateY: -(configDeviceSizes.DEVICE_WIDTH * 0.06) }],
                      }}
                    />
                  </ImageBackground>
                ) : (
                  <ImageComponent
                    height={152}
                    width={configDeviceSizes.DEVICE_WIDTH * 0.25}
                    source={{
                      uri: orderItem?.imageUrl?.split('-55-55')?.join(''),
                    }}
                  />
                )}

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
  );
}

export default OrderProduct;
