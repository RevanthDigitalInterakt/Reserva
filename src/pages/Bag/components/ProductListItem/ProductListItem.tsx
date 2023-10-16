import React, { useMemo } from 'react';
import {
  Box, Button, Checkbox, Counter, decimalPart, Icon, integerPart, Typography,
} from '@usereservaapp/reserva-ui';
import { TouchableOpacity, View } from 'react-native';
import { slugify } from '../../../../utils/slugify';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import type { OrderFormQuery } from '../../../../base/graphql/generated';
import { FirstPurchaseDiscount, TotalDiscountFirstPurchase } from './ProductListItemDiscount.utils';
import testProps from '../../../../utils/testProps';
import IconPrimeLogoWhite from '../../../PrimeLP/components/Icons/IconPrimeLogoWhite';
import { styles } from './ProductListItem.styles';

interface IProductListItem {
  data: OrderFormQuery['orderForm']['items'][0];
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
}: IProductListItem) {
  const discountTag = useMemo(() => data.discountPercent > 0, [data?.discountPercent]);

  const price = useMemo(() => data.price / 100, [data.price]);

  return (
    <Box bg="white" marginTop="xxxs" testID="com.usereserva:id/BagProductList">
      {!!data.showFirstPurchaseDiscountMessage && (
        <FirstPurchaseDiscount discountText={data.showFirstPurchaseDiscountMessage} />
      )}

      {!!data.showTotalDiscountFirstPurchaseValue && (
        <TotalDiscountFirstPurchase priceDiscount={data.showFirstPurchaseDiscountMessage || ''} />
      )}

      <Box flexDirection="row" height={152} justifyContent="space-between" flexGrow={1}>
        <Box flexDirection="row">
          <Box marginRight="micro">
            <TouchableOpacity
              onPress={onPress}
              {...testProps(`product_card_bag_${slugify(data.productId + data.skuName)}_image`)}
            >
              <ImageComponent
                source={{ uri: data.imageSource }}
                width={configDeviceSizes.DEVICE_WIDTH * 0.25}
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

              <Box
                width="100%"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                position="relative"
              >
                {data.quantity ? (
                  <Box width={90} marginTop="micro">
                    <Counter
                      testID={`product_card_bag_${slugify(data.productId + data.skuName)}_count`}
                      count={data.quantity}
                      disabledAdd={!!data.disableCounter}
                      disabledSub={!!data.disableCounter}
                      onClickAdd={onAddCount}
                      onClickSub={onSubCount}
                    />
                  </Box>
                ) : <></>}

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
            icon={<Icon name="Close" size={11} color="preto" />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductListItem;
