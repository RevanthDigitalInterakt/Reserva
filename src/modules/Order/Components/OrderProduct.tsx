import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Typography, Box, Button, Icon, Image } from 'reserva-ui';
import { images } from '../../../assets';
import { PriceCustom } from '../../Checkout/components/PriceCustom';

type IOrderItemData = {
  name: string;
  price: number;
  sellingPrice: number;
  quantity: string;
  imageUrl: string;
  measurementUnit: string;
};

interface IOrderProduct {
  orderItem: IOrderItemData;
}

const OrderProduct = ({ orderItem }: IOrderProduct) => {
  //TODO: repassar nesse componente. se possivel trocar com o que ja foi feito anteriormente.
  return (
    <>
      <Box flexDirection="row" mt={'xxs'}>
        <Box>
          {orderItem &&
            <Image
              imageDefault={images.imageNotFound}
              variant="sm"
              source={{
                uri: orderItem.imageUrl
                  .split("-55-55")
                  .join("")
              }}
            />
          }
        </Box>

        <Box ml="micro" flex={1}>
          <Box mb="nano">
            <Typography fontSize={13} fontFamily="nunitoBold">
              {orderItem.name.split(' - ')[0]}
            </Typography>
          </Box>
          {/* <Box flexDirection="row" mb="micro">
            <Box mr="xxs">
              <Typography fontSize={11} fontFamily="nunitoRegular">
                Tam: 41
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={11} fontFamily="nunitoRegular">
                Cor: Branca
              </Typography>
            </Box>
          </Box> */}

          <Box flexDirection="row">
            <Typography
              color="neutroFrio2"
              fontSize={11}
              fontFamily="nunitoRegular"
            >
              De:{' '}
            </Typography>
            <PriceCustom
              fontFamily={'nunitoSemiBold'}
              sizeInterger={15}
              sizeDecimal={11}
              num={orderItem.listPrice / 100}
            />
            {/* <Typography
              style={{
                textDecorationLine: 'line-through',
                marginLeft: 5,
              }}
              color="neutroFrio2"
              fontSize={11}
              fontFamily="nunitoRegular"
            >
              {orderItem.price / 100}
            </Typography> */}
            {/* <Typography
              style={{
                marginLeft: 5,
              }}
              color="neutroFrio2"
              fontSize={11}
              fontFamily="nunitoRegular"
            >
              por
            </Typography> */}
          </Box>
          <PriceCustom
            fontFamily={'nunitoSemiBold'}
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
