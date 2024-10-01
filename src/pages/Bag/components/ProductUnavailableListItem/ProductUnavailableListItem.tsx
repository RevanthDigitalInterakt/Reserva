import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import type { OrderFormQuery } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import { Typography } from '../../../../components/Typography/Typography';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { decimalPart, integerPart } from '../../../../utils/numberUtils';
import { slugify } from '../../../../utils/slugify';
import testProps from '../../../../utils/testProps';
import IconPrimeLogoWhite from '../../../PrimeLP/components/Icons/IconPrimeLogoWhite';
import { styles } from './ProductUnavailableListItem.styles';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import { COLORS } from '../../../../base/styles';

export interface IProductUnavailableListItem {
  data: OrderFormQuery['orderForm']['packageItems'][0]['items'][0]
  onDelete: () => void;
  onPress: () => void;
}

export const titleSection: { [key: string]: string } = {
  cannotBeDelivered: 'Indisponíveis para o CEP atual',
  withoutStock: 'Indisponíveis no Estoque',
};

export function ProductUnavailableListItem({
  data,
  onPress,
  onDelete,
}: Readonly<IProductUnavailableListItem>) {
  const discountTag = useMemo(
    () => data.discountPercent > 0,
    [data?.discountPercent],
  );
  const price = useMemo(() => data.price / 100, [data.price]);

  return (
    <>
      <Box
        flexDirection="row"
        alignItems="center"
        marginTop="xxs"
        testID="com.usereserva:id/ProductUnavailableListItem"
      >
        <IconComponent icon="info" />
        <Typography
          color="fullBlack"
          fontSize={18}
          fontFamily="reservaSerifMedium"
          style={styles.titleSection}
        >
          {titleSection[data.availability]}
        </Typography>
      </Box>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 16,
          height: 152,
          justifyContent: 'space-between',
          flexGrow: 1,
          borderWidth: 1,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderColor: COLORS.PINK,
          padding: 16,
        }}

      >
        <Box flexDirection="row">
          <Box marginRight="micro">
            <TouchableOpacity
              onPress={onPress}
              {...testProps(`product_card_bag_${slugify(data.productId + data.skuName)}_image`)}
            >
              <ImageComponent
                source={{ uri: data.imageSource }}
                width={configDeviceSizes.DEVICE_WIDTH * 0.19}
                resizeMode="contain"
              />

              {!!data.hasPrimeDiscount && (
              <View style={styles.primeTag}>
                <IconPrimeLogoWhite height={7} width={30} />
              </View>
              )}
            </TouchableOpacity>
          </Box>

          <Box>
            <Box flexDirection="row" width={configDeviceSizes.DEVICE_WIDTH * 0.53}>
              <Typography
                fontFamily="nunitoBold"
                fontSize="13px"
                textAlign="center"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.productTitle}
              </Typography>
            </Box>

            <Box width={230} justifyContent="space-between" flexGrow={1}>
              <Box flexDirection="row" marginTop="quarck">
                {data.itemSize ? (
                  <Box
                    borderRadius="nano"
                    marginRight="micro"
                    borderColor="dropDownBorderColor"
                    borderWidth="hairline"
                    flexDirection="row"
                    alignItems="center"
                    height={25}
                  >
                    <Box paddingX="nano" flexDirection="row" justifyContent="space-between">
                      <Typography fontFamily="nunitoRegular" fontSize="11px" color="preto">
                        {`Tam: ${data.itemSize}`}
                      </Typography>
                    </Box>
                  </Box>
                ) : null}

                {data.itemColor ? (
                  <Box
                    borderRadius="nano"
                    borderColor="dropDownBorderColor"
                    borderWidth="hairline"
                    flexDirection="row"
                    alignItems="center"
                    height={25}
                  >
                    <Box paddingX="nano" flexDirection="row" justifyContent="space-between">
                      <Typography fontFamily="nunitoRegular" fontSize="11px" color="preto">
                        {`Cor: ${data.itemColor}`}
                      </Typography>
                      <Box />
                    </Box>
                  </Box>
                ) : null}
              </Box>

              <Box flexDirection="row" alignItems="center">
                <Box>
                  <Box flexDirection="row" alignItems="flex-end">
                    <Typography fontFamily="nunitoBold" fontSize="15px" color="neutroFrio2">
                      {discountTag ? (
                        'De R$ '
                      ) : (
                        <Typography fontFamily="nunitoRegular" color="neutroFrio2">
                          Por
                          {'\n'}

                          <Typography
                            fontFamily="nunitoBold"
                            color={discountTag ? 'neutroFrio2' : 'preto'}
                          >
                            {'R$ '}
                          </Typography>
                        </Typography>
                      )}
                    </Typography>

                    <Typography
                      fontFamily="nunitoBold"
                      fontSize="15px"
                      color={discountTag ? 'neutroFrio2' : 'preto'}
                      style={discountTag ? { textDecorationLine: 'line-through' } : {}}
                    >
                      {discountTag ? `${integerPart(price)},` : `\n${integerPart(price)},`}
                    </Typography>

                    <Box mb={8}>
                      <Typography
                        fontFamily="nunitoBold"
                        fontSize="8px"
                        color={discountTag ? 'neutroFrio2' : 'preto'}
                        style={discountTag ? { textDecorationLine: 'line-through' } : {}}
                      >
                        {discountTag ? `${decimalPart(price)}` : `\n${decimalPart(price)}`}
                      </Typography>
                    </Box>
                  </Box>

                  {(data.priceWithDiscount === 0 && data.isAddedAsGift) && (
                  <Box flexDirection="row">
                    <Typography fontFamily="nunitoBold" fontSize="14px" color="vermelhoRSV">
                      Grátis
                    </Typography>
                  </Box>
                  )}

                  {discountTag && data.priceWithDiscount !== 0 && (
                  <Box flexDirection="row">
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize="14px"
                      color="vermelhoRSV"
                      style={data.discountApi ? { textDecorationLine: 'line-through' } : {}}
                    >
                      {`R$ ${integerPart(
                        data.discountApi
                          ? data.priceWithDiscount + Math.abs(data.discountApi)
                          : data.priceWithDiscount,
                      )},`}
                    </Typography>
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize="8px"
                      color="vermelhoRSV"
                      style={data.discountApi ? { textDecorationLine: 'line-through' } : {}}
                    >
                      {`${decimalPart(
                        data.discountApi
                          ? data.priceWithDiscount + Math.abs(data.discountApi)
                          : data.priceWithDiscount,
                      )}`}
                    </Typography>
                  </Box>
                  )}

                  {data.discountApi ? (
                    <Box flexDirection="row">
                      <Typography fontFamily="nunitoBold" fontSize="14px" color="vermelhoRSV">
                        {`R$ ${integerPart(data.priceWithDiscount || price)},`}
                      </Typography>

                      <Typography fontFamily="nunitoBold" fontSize="8px" color="vermelhoRSV">
                        {decimalPart(data.priceWithDiscount || price)}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              </Box>

            </Box>
          </Box>
        </Box>

        <View>
          <TouchableOpacity
            hitSlop={{
              top: 24,
              left: 24,
              bottom: 24,
              right: 24,
            }}
            onPress={onDelete}
            {...testProps('remove_product_unavailable_bag')}
          >
            <IconComponent icon="trash" />
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.descriptionWrapper}>
        <Typography style={styles.description}>
          {'Remova o produto da sacola para finalizar a compra.\nTe notificaremos quando houver disponibilidade.'}
        </Typography>
      </View>
    </>
  );
}
