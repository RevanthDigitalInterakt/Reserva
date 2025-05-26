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
import { FlagDiscount } from '../FlagDiscount/FlagDiscount';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import ImageComponent from '../ImageComponent/ImageComponent';
import ProductPricePrimeRow from '../ProductPricePrimeLabelRow/ProductPricePrimeRow';
import ProductPriceRow from '../ProductPriceRow/ProductPriceRow';
import ProductThumbColorsRow from '../ProductThumbColorsRow/ProductThumbColorsRow';
import { Typography } from '../Typography/Typography';
import { COLORS, FONTS } from '../../base/styles';

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

export function ProductVerticalListCard({
  currency,
  imageSource,
  installmentsNumber,
  installmentsPrice,
  isFavorited,
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
        <Box position="absolute" zIndex={5} right={4} top={6}>
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
            <FlagDiscount discountTag={discountTag} />
          </Box>
        ) }

        {saleOff && (
          <Box
            position="absolute"
            top={discountTag ? 50 : 0}
            left={0}
            zIndex={1}
          >
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

        <View testID={testID}>
          <ImageComponent
            source={{ uri: imageSource }}
            height={small ? 160 : 248}
            width={imageWidth || configDeviceSizes.DEVICE_WIDTH * 0.45}
          />
        </View>

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
              paddingBottom: 8, paddingRight: 6, fontSize: 12, fontFamily: 'ReservaSans-Bold',
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
              <Text
                style={{
                  fontFamily: FONTS.RESERVA_SANS_REGULAR,
                  color: COLORS.DARK_GREY_BLUE,
                  fontSize: 12,
                  marginLeft: -3,
                }}
              >
                {` ${currency || 'R$'} `}
              </Text>
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
