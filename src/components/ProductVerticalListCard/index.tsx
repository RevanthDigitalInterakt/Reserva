import React from 'react';
import {
  Box,
  Button,
  Icon,
  Image,
  Typography,
} from '@usereservaapp/reserva-ui';
import {
  loadingSpinner,
} from '@usereservaapp/reserva-ui/src/assets/animations';
import LottieView from 'lottie-react-native';

import { Text, View } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { decimalPart, integerPart } from '../../utils/numberUtils';
import ProductPricePrimeRow from '../ProductPricePrimeLabelRow/ProductPricePrimeRow';
import ProductPriceRow from '../ProductPriceRow/ProductPriceRow';
import ProductThumbColorsRow from '../ProductThumbColorsRow/ProductThumbColorsRow';

export interface ProductVerticalListCardProps {
  imageWidth?: number
  imageSource: string
  productTitle: string
  price: number
  loadingFavorite: boolean,
  small?: boolean
  currency?: string
  colors?: string[]
  colorsLimit?: number;
  showThumbColors?: boolean;
  installmentsNumber: number
  installmentsPrice: number
  discountTag?: number
  saleOff?: string
  priceWithDiscount?: number
  isFavorited?: boolean
  onClickFavorite?: (favoriteState: boolean) => void
  onClickImage?: () => void
  mktplaceImageComponent?: React.ReactNode;
  isPrime: boolean
  testID?: string;
}

export interface DiscountLabelProps {
  discountTag: number
  width?: number
  height?: number
  isDetail?: boolean
}

export const DiscountLabel = ({
  discountTag,
  width,
  height,
  isDetail,
}: DiscountLabelProps) => (
  <Box
    alignItems="center"
    justifyContent="space-between"
    position="absolute"
    bg="vermelhoRSV"
    width={width || configDeviceSizes.DEVICE_WIDTH * 0.1215}
    height={height || configDeviceSizes.DEVICE_WIDTH * 0.1215}
    py="quarck"
  >
    <Box
      flexDirection="row"
      position="absolute"
      alignItems="flex-start"
      justifyContent="center"
      left={5}
      top={3}
    >
      <Typography
        fontFamily="reservaDisplayRegular"
        fontSize={isDetail ? 36 : configDeviceSizes.DEVICE_WIDTH * 0.055}
        color="white"
      >
        {discountTag}
      </Typography>
      <Typography
        fontFamily="reservaDisplayRegular"
        fontSize={isDetail ? 20 : 11}
        color="white"
        textAlign="center"
      >
        %
      </Typography>
    </Box>

    <Box
      flexDirection="row"
      position="absolute"
      justifyContent="center"
      left={5}
      bottom={isDetail ? -2 : -2}
    >
      <Typography
        fontFamily="reservaDisplayRegular"
        fontSize={isDetail ? 32 : configDeviceSizes.DEVICE_WIDTH * 0.045}
        color="vermelhoAlerta"
        textAlign="center"
      >
        OFF
      </Typography>
    </Box>
  </Box>
);

export const ProductVerticalListCard = ({
  currency,
  imageSource,
  installmentsNumber,
  installmentsPrice,
  isFavorited,
  onClickImage,
  price,
  small,
  loadingFavorite,
  priceWithDiscount,
  productTitle,
  onClickFavorite,
  discountTag,
  saleOff,
  imageWidth,
  colors,
  colorsLimit,
  showThumbColors,
  mktplaceImageComponent = null,
  isPrime,
  testID,
}: ProductVerticalListCardProps) => (
  <View>
    <Box height="100%">
      {mktplaceImageComponent}

      <Box position="absolute" zIndex={5} right={10} top={8}>
        {loadingFavorite
          ? (
            <LottieView
              source={loadingSpinner}
              autoPlay
              loop
              style={{
                width: 15,
                height: 15,
              }}
            />
          )
          : (
            <Button
              width={30}
              height={30}
              hitSlop={{
                top: 20, left: 20, bottom: 20, right: 20,
              }}
              variant="icone"
              testID={`${testID}_favorite`}
              onPress={() => {
                onClickFavorite && onClickFavorite(!isFavorited);
              }}
              icon={(
                <Icon
                  name={isFavorited ? 'HeartRaised' : 'Heart'}
                  size={18}
                  color="preto"
                />
              )}
            />
          )}
      </Box>

      {discountTag ? (
        <Box top={0} left={0} zIndex={1}>
          <DiscountLabel discountTag={discountTag} />
        </Box>
      ) : <></>}

      {saleOff && (
        <Box position="absolute" top={discountTag ? 50 : 0} left={0} zIndex={1}>
          <Image
            source={saleOff}
            width={50}
            height={50}
            resizeMode="cover"
          />
        </Box>
      )}

      <Button
        onPress={() => {
          onClickImage && onClickImage();
        }}
        testID={testID}
      >
        <Box>
          <Image
            source={imageSource}
            height={small ? 160 : 248}
            width={imageWidth || configDeviceSizes.DEVICE_WIDTH * 0.45}
            resizeMode="cover"
          />
        </Box>
      </Button>

      {!showThumbColors && (
        <ProductThumbColorsRow
          identifier={`${productTitle}-${imageSource}-${price}`}
          colors={colors || []}
          limit={colorsLimit}
        />
      )}

      <Box marginTop="micro" width={configDeviceSizes.DEVICE_WIDTH * 0.45}>
        <Text
          style={{ fontSize: 12, fontFamily: 'ReservaSans-Bold' }}
        >
          {productTitle}
        </Text>

        <Box>
          {/* TODO create ProductCardLabelDiscount */}
          {discountTag && priceWithDiscount && (
          <Box
            flexDirection="row"
            alignItems="flex-end"
            mt="nano"
          >
            <Typography
              fontFamily="reservaSansRegular"
              fontSize="9px"
              color="neutroFrio2"
            >
              De
            </Typography>
            <Typography
              fontFamily="reservaSansRegular"
              fontSize="9px"
              color="preto"
            >
              {` ${currency || 'R$'} `}
            </Typography>
            <Typography
              fontFamily="reservaSansRegular"
              fontSize="9px"
              color="preto"
              style={{
                textDecorationLine: 'line-through',
              }}
            >
              {`${integerPart(price)},`}
            </Typography>
            <Typography
              fontFamily="reservaSansRegular"
              fontSize="5px"
              color="preto"
              style={{
                textDecorationLine: 'line-through',
              }}
            >
              {`${decimalPart(price)}`}
            </Typography>
          </Box>
          )}
        </Box>

        <ProductPriceRow
          installmentsNumber={installmentsNumber}
          currency={currency}
          installmentsPrice={installmentsPrice}
          discountTag={discountTag}
          priceWithDiscount={priceWithDiscount}
          price={price}
        />

        <View style={{ marginVertical: 2 }} />

        {isPrime
        && (
        <ProductPricePrimeRow
          installmentsNumber={installmentsNumber}
          currency={currency}
          installmentsPrice={installmentsPrice}
          discountTag={discountTag}
          priceWithDiscount={priceWithDiscount}
          price={price}
        />
        )}
      </Box>
    </Box>
  </View>
);
