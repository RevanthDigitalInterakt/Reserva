import LottieView from 'lottie-react-native';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { loadingSpinner } from '../../../assets/animations';
import type { Maybe, ProductSizeInstallmentOutput } from '../../base/graphql/generated';
import { useRemoteConfig, type TTypesInstallments } from '../../hooks/useRemoteConfig';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { decimalPart, integerPart } from '../../utils/numberUtils';
import type { IGetPrimeReturn } from '../../zustand/usePrimeConfig/usePrimeConfig';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import ImageComponent from '../ImageComponent/ImageComponent';
import ProductPricePrimeRow from '../ProductPricePrimeLabelRow/ProductPricePrimeRow';
import ProductPriceRow from '../ProductPriceRow/ProductPriceRow';
import ProductThumbColorsRow from '../ProductThumbColorsRow/ProductThumbColorsRow';
import { Typography } from '../Typography/Typography';

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
  prime: IGetPrimeReturn | null
  testID?: string;
  installmentsEqualPrime?: Maybe<ProductSizeInstallmentOutput>;
}

export interface DiscountLabelProps {
  discountTag: number
  width?: number
  height?: number
  isDetail?: boolean
}

export function DiscountLabel({
  discountTag,
  width,
  height,
  isDetail,
}: DiscountLabelProps) {
  return (
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
}

export function ProductVerticalListCard({
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
  installmentsEqualPrime,
  prime,
  testID,
}: ProductVerticalListCardProps) {
  const { getString } = useRemoteConfig();

  const typeInstallments: TTypesInstallments = useMemo(() => (
    getString('installments_prime')
  ), [getString]) as TTypesInstallments;

  const isHideInstallment = useMemo(() => (
    typeInstallments === 'hide_installments'
  ), [typeInstallments]);

  const regularInstallment = useMemo(() => {
    if (isHideInstallment) return undefined;

    if (
      typeInstallments === 'show_prime_equal_to_regular'
      && installmentsEqualPrime
    ) {
      return {
        number: installmentsEqualPrime.number,
        value: installmentsEqualPrime.value,
      };
    }

    return {
      number: installmentsNumber,
      value: installmentsPrice,
    };
  }, [isHideInstallment]);

  return (
    <View>
      <Box height="100%">
        <Box position="absolute" zIndex={5} right={10} top={8}>
          {loadingFavorite ? (
            <LottieView
              source={loadingSpinner}
              autoPlay
              loop
              style={{
                width: 15,
                height: 15,
              }}
            />
          ) : (
            <Button
              width={30}
              height={30}
              hitSlop={{
                top: 20, left: 20, bottom: 20, right: 20,
              }}
              variant="icone"
              testID={`${testID}_favorite`}
              onPress={() => {
                if (onClickFavorite) {
                  onClickFavorite(!isFavorited);
                }
              }}
              icon={(
                <IconLegacy
                  name={isFavorited ? 'HeartRaised' : 'Heart'}
                  size={18}
                  color="preto"
                />
            )}
            />
          )}
        </Box>

        {discountTag && (
          <Box top={0} left={0} zIndex={1}>
            <DiscountLabel discountTag={discountTag} />
          </Box>
        ) }

        {saleOff && (
        <Box position="absolute" top={discountTag ? 50 : 0} left={0} zIndex={1}>
          <ImageComponent
            source={{ uri: saleOff }}
            style={{
              width: 50,
              height: 50,
            }}
            resizeMode="cover"
          />
        </Box>
        )}

        <Button
          onPress={() => {
            if (onClickImage) {
              onClickImage();
            }
          }}
          testID={testID}
        >
          <ImageComponent
            source={{ uri: imageSource }}
            height={small ? 160 : 248}
            width={imageWidth || configDeviceSizes.DEVICE_WIDTH * 0.45}
          />
        </Button>

        {!!showThumbColors && (
        <ProductThumbColorsRow
          identifier={`${productTitle}-${imageSource}-${price}`}
          colors={colors || []}
          limit={colorsLimit}
        />
        )}

        <Box marginTop="nano" width={configDeviceSizes.DEVICE_WIDTH * 0.45}>
          <Text
            style={{
              height: 40, paddingRight: 6, fontSize: 12, fontFamily: 'ReservaSans-Bold',
            }}
          >
            {productTitle}
          </Text>

          <Box>
            {/* TODO create ProductCardLabelDiscount */}
            {discountTag && priceWithDiscount && (
            <Box
              flexDirection="row"
              alignItems="flex-end"
            >
              <Typography
                fontFamily="reservaSansRegular"
                fontSize={12}
                color="neutroFrio2"
              >
                De
              </Typography>
              <Typography
                fontFamily="reservaSansRegular"
                fontSize={12}
                color="neutroFrio2"
              >
                {` ${currency || 'R$'} `}
              </Typography>
              <Typography
                fontFamily="reservaSansRegular"
                fontSize={12}
                color="neutroFrio2"
                style={{
                  textDecorationLine: 'line-through',
                }}
              >
                {`${integerPart(price)},`}
              </Typography>
              <Typography
                fontFamily="reservaSansRegular"
                fontSize={12}
                color="neutroFrio2"
                style={{
                  textDecorationLine: 'line-through',
                }}
              >
                {`${decimalPart(price)}`}
              </Typography>
            </Box>
            )}
          </Box>

          <View style={{ marginTop: 8 }} />

          <ProductPriceRow
            installments={regularInstallment}
            currency={currency}
            discountTag={discountTag}
            priceWithDiscount={priceWithDiscount}
            price={price}
          />

          <View style={{ marginTop: 6 }} />

          {!!prime && (
            <ProductPricePrimeRow
              installments={isHideInstallment ? undefined : prime.primeInstallments}
              currency={currency}
              discountTag={discountTag}
              priceWithDiscount={priceWithDiscount}
              price={prime.primePrice}
            />
          )}
        </Box>
      </Box>
    </View>
  );
}
