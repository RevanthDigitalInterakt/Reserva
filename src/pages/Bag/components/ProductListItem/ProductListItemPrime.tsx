import React, { useMemo } from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';

import type { OrderFormQuery } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import { Typography } from '../../../../components/Typography/Typography';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { decimalPart, integerPart } from '../../../../utils/numberUtils';
import { slugify } from '../../../../utils/slugify';
import testProps from '../../../../utils/testProps';

interface IProductListItemPrime {
  data: OrderFormQuery['orderForm']['packageItems'][0]['items'][0]
  onPress: () => void;
  onDelete: () => void;
}

function ProductListItemPrime({
  data,
  onPress,
  onDelete,
}: Readonly<IProductListItemPrime>) {
  

  const price = useMemo(() => (data.price / 12) / 100, [data.price]);

  const discountTag = useMemo(
    () => data.discountPercent > 0 && data.priceWithDiscount !== price,
    [data?.discountPercent, data?.priceWithDiscount, price],
  );

  const urlFacaVc = useMemo(() => data.urlFacaVc, [data.urlFacaVc]);

  return (
    <Box bg="white" marginTop="xxxs" testID="com.usereserva:id/BagProductList">
      <Box flexDirection="row" height={152} justifyContent="space-between" flexGrow={1}>
        <Box flexDirection="row">
          <Box marginRight="micro">
            <TouchableOpacity
              onPress={onPress}
              {...testProps(`product_card_bag_${slugify(data.productId + data.skuName)}_image`)}
            >
              {urlFacaVc ? (
                <View>
                  <ImageBackground
                    source={{ uri: data.imageSource }}
                    resizeMode="cover"
                    style={{
                      width: configDeviceSizes.DEVICE_WIDTH * 0.25,
                      height: configDeviceSizes.DEVICE_WIDTH * 0.3,
                      position: 'relative',
                    }}
                  >
                    <ImageComponent
                      source={{ uri: urlFacaVc }}
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
                </View>
              ) : (
                <ImageComponent
                  source={{ uri: data.imageSource }}
                  style={{
                    width: configDeviceSizes.DEVICE_WIDTH * 0.25,
                    height: configDeviceSizes.DEVICE_WIDTH * 0.3,
                  }}
                  resizeMode="contain"
                />
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
              <Box flexDirection="row" alignItems="center">
                <Box>
                  <Box marginTop="quarck">
                    <Typography fontFamily="nunitoRegular" fontSize="12px" color="preto">
                      A primeira mensalidade será cobrada
                      nesse pedido e as demais serão
                      cobradas nos próximos meses.
                    </Typography>
                  </Box>

                  <Box flexDirection="row" alignItems="flex-end">
                    <Typography fontFamily="nunitoBold" fontSize="15px" color="neutroFrio2">
                      {discountTag ? (
                        'De R$ '
                      ) : (
                        <Typography fontFamily="nunitoRegular" color="neutroFrio2">
                          <Typography fontFamily="nunitoBold" color="preto" fontSize={12}>
                            {'12x '}
                          </Typography>

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
                        {discountTag ? `${decimalPart(price)}` : `\n${decimalPart(price)}` }
                      </Typography>
                    </Box>
                  </Box>

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

        <Box paddingLeft="xxs" paddingTop="nano" position="absolute" right={0} top={-5}>
          <Button
            hitSlop={{
              top: 35,
              left: 35,
              bottom: 35,
              right: 35,
            }}
            variant="icone"
            onPress={onDelete}
            icon={<IconLegacy name="Trash" size={24} color="preto" />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductListItemPrime;
