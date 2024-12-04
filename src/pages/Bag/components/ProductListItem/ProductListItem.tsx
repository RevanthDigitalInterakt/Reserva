import React, { useMemo } from 'react';
import {
  Text, TouchableOpacity, View, ImageBackground,
  Image,
} from 'react-native';

import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import { Typography } from '../../../../components/Typography/Typography';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import type { OrderFormQuery } from '../../../../base/graphql/generated';
import { decimalPart, integerPart } from '../../../../utils/numberUtils';
import { slugify } from '../../../../utils/slugify';
import testProps from '../../../../utils/testProps';
import IconPrimeLogoWhite from '../../../PrimeLP/components/Icons/IconPrimeLogoWhite';
import { styles } from './ProductListItem.styles';
import { FirstPurchaseDiscount, TotalDiscountFirstPurchase } from './ProductListItemDiscount.utils';
import { Counter } from '../../../../components/Counter/Counter';

interface IProductListItem {
  data: OrderFormQuery['orderForm']['packageItems'][0]['items'][0]
  onPress: () => void;
  onAddCount: (count: number) => void;
  onSubCount: (count: number) => void;
  onAddGift: () => void;
  onDelete: () => void;
}

function ProductListItem({
  data,
  onPress,
  onAddCount,
  onSubCount,
  onAddGift,
  onDelete,
}: Readonly<IProductListItem>) {
  const discountTag = useMemo(() => data.discountPercent > 0, [data?.discountPercent]);

  const price = useMemo(() => data.price / 100, [data.price]);

  const urlFacaVc = useMemo(() => data.urlFacaVc, [data.urlFacaVc]);

  return (
    <Box bg="white" marginTop="xxxs" testID="com.usereserva:id/BagProductList">
      {!!data.showFirstPurchaseDiscountMessage && (
        <FirstPurchaseDiscount discountText={data.showFirstPurchaseDiscountMessage} />
      )}

      {!!data.showTotalDiscountFirstPurchaseValue && (
        <TotalDiscountFirstPurchase priceDiscount={data.showFirstPurchaseDiscountMessage || ''} />
      )}

      <Box flexDirection="row" height={142} justifyContent="space-between" flexGrow={1}>
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
                    <Image
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

              {!!data.hasPrimeDiscount && (
                <View style={styles.primeTag}>
                  <IconPrimeLogoWhite height={7} width={30} />
                </View>
              )}
            </TouchableOpacity>
          </Box>

          <Box>
            <Box flexDirection="row" width={configDeviceSizes.DEVICE_WIDTH * 0.53}>
              <Text style={styles.productTitle} numberOfLines={1}>
                {data.productTitle}
              </Text>
            </Box>

            <Box width={246} justifyContent="space-between" flexGrow={1}>
              <View style={styles.attributesWrap}>
                {data.itemSize ? (
                  <View style={styles.productAttributeWrap}>
                    <Text style={styles.productAttributeLabel}>Tamanho:</Text>
                    <Text style={styles.productAttributeValue}>{data.itemSize}</Text>
                  </View>
                ) : null}

                {data.itemColor ? (
                  <>
                    <Text style={styles.productAttributeSeparator}>|</Text>
                    <View style={styles.productAttributeWrap}>
                      <Text style={styles.productAttributeLabel}>Cor:</Text>
                      <Text style={styles.productAttributeValue}>{data.itemColor}</Text>
                    </View>
                  </>
                ) : null}
              </View>

              <View style={styles.valueWrap}>
                <Box>
                  <Box flexDirection="row" alignItems="flex-end">
                    <Typography fontFamily="nunitoBold" fontSize="15px" color="preto">
                      {discountTag ? (
                        'De '
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
                      {discountTag ? `R$ ${integerPart(price)},` : `\nR$ ${integerPart(price)},`}
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
                        color="verdeSucesso"
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
                        color="verdeSucesso"
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
                {data.quantity ? (
                  <View>
                    <Counter
                      testID={`product_card_bag_${slugify(data.productId + data.skuName)}_count`}
                      count={data.quantity}
                      disabledAdd={!!data.disableCounter}
                      disabledSub={!!data.disableCounter}
                      onClickAdd={onAddCount}
                      onClickSub={onSubCount}
                    />
                  </View>
                ) : null}
              </View>

              <Box
                width="100%"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                position="relative"
              >

                {data.isGiftable && (
                  <Checkbox
                    testID={`product_card_bag_${slugify(data.productId + data.skuName)}_isGift`}
                    fontFamily="reservaSansRegular"
                    fontSize="10px"
                    optionName="É presente?"
                    color="preto"
                    width="80px"
                    onCheck={onAddGift}
                    checked={data.isAddedAsGift}
                    newPackageItem
                  />
                )}
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

export default ProductListItem;
