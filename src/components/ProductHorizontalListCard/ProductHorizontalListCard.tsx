import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Counter,
  Icon,
  Checkbox,
  Box,
  Typography,
} from '@usereservaapp/reserva-ui';
import { integerPart, decimalPart } from '../../utils/numberUtils';
import { Button } from '../Button';
import ImageComponent from '../ImageComponent/ImageComponent';
import configDeviceSizes from '../../utils/configDeviceSizes';

interface ProductHorizontalListCardProps {
  currency?: string
  imageSource: string
  imageWidth?: number
  productTitle: string
  price: number
  isFavorited?: boolean
  isGiftable?: boolean
  onClickFavorite?: (favoriteState: boolean) => void
  ItemSize: string
  itemColor: string
  count?: number
  curency?: string
  discountTag?: number
  priceWithDiscount?: number
  discountApi?: number
  height?: number | string
  disableCounter?: boolean
  onClickClose?: () => void
  onClickAddCount?: (count: number) => void
  onClickSubCount?: (count: number) => void
  onClickBagButton?: () => void
  onClickPiker?: () => void
  handleNavigateToProductDetail?: () => void
  handleToggleGift?: (value: boolean) => void
  isGift?: boolean
  testID?: string;
}

export const ProductHorizontalListCard = ({
  currency = 'R$',
  discountTag,
  imageSource,
  imageWidth,
  ItemSize,
  itemColor,
  productTitle,
  price,
  priceWithDiscount,
  discountApi,
  isFavorited,
  onClickFavorite,
  count,
  disableCounter,
  height,
  onClickClose,
  onClickAddCount,
  onClickSubCount,
  onClickBagButton,
  onClickPiker,
  handleNavigateToProductDetail,
  handleToggleGift,
  isGiftable = false,
  isGift = false,
  testID,
}: ProductHorizontalListCardProps) => {
  const handleToggleIsGift = () => {
    handleToggleGift?.(!isGift);
  };

  return (
    <>
      <Box
        flexDirection="row"
        height={height || 152}
        justifyContent="space-between"
        flexGrow={1}
      >
        <Box flexDirection="row">
          <Box marginRight="micro">

            <TouchableOpacity onPress={handleNavigateToProductDetail} testID={`${testID}_image`}>
              <ImageComponent
                source={{ uri: imageSource }}
                style={{
                  height: '100%',
                  width: imageWidth || configDeviceSizes.DEVICE_WIDTH * 0.25,
                }}
              />
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
                {productTitle}
              </Typography>
            </Box>
            <Box width={230} justifyContent="space-between" flexGrow={1}>
              {!onClickAddCount
                ? (
                  <Box
                    flexDirection="row"
                    marginTop="quarck"
                  >
                    <Box mr="micro">
                      <Button
                        borderRadius="nano"
                        borderColor="dropDownBorderColor"
                        borderWidth="hairline"
                        flexDirection="row"
                        inline
                        height={25}
                        testID={`${testID}_size`}
                        onPress={onClickPiker}
                      >
                        <Box
                          paddingLeft="nano"
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography
                            fontFamily="nunitoRegular"
                            fontSize="11px"
                            color="preto"
                          >
                            {`Tam: ${ItemSize}`}
                          </Typography>
                          <Icon
                            style={{ transform: [{ rotate: '90deg' }] }}
                            name="ChevronRight"
                            color="preto"
                            marginLeft="micro"
                            marginRight="nano"
                            size={16}
                          />
                        </Box>
                      </Button>
                    </Box>

                    <Button
                      borderRadius="nano"
                      borderColor="dropDownBorderColor"
                      borderWidth="hairline"
                      flexDirection="row"
                      inline
                      height={25}
                      testID={`${testID}_color`}
                      onPress={() => {
                      }}
                    >
                      <Box
                        paddingLeft="nano"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize="11px"
                          color="preto"
                        >
                          {`Cor: ${itemColor}`}
                        </Typography>
                        <Icon
                          style={{ transform: [{ rotate: '90deg' }] }}
                          name="ChevronRight"
                          color="preto"
                          marginLeft="micro"
                          marginRight="nano"
                          size={16}
                        />
                      </Box>
                    </Button>
                  </Box>
                )
                : (
                  <Box flexDirection="row" marginTop="quarck">
                    <Box
                      borderRadius="nano"
                      marginRight="micro"
                      borderColor="dropDownBorderColor"
                      borderWidth="hairline"
                      flexDirection="row"
                      alignItems="center"
                      height={25}
                    >
                      <Box
                        paddingX="nano"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize="11px"
                          color="preto"
                        >
                          {`Tam: ${ItemSize}`}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      borderRadius="nano"
                      borderColor="dropDownBorderColor"
                      borderWidth="hairline"
                      flexDirection="row"
                      alignItems="center"
                      height={25}
                    >
                      <Box
                        paddingX="nano"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize="11px"
                          color="preto"
                        >
                          {`Cor: ${itemColor}`}
                        </Typography>
                        <Box />
                      </Box>
                    </Box>
                  </Box>
                )}
              <Box flexDirection="row" alignItems="center">
                <Box>
                  <Box flexDirection="row" alignItems="flex-end">
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize="15px"
                      color="neutroFrio2"
                    >
                      {discountTag ? (
                        `De ${currency || 'R$'} `
                      ) : (
                        <Typography fontFamily="nunitoRegular" color="neutroFrio2">
                          {'Por\n'}
                          <Typography
                            fontFamily="nunitoBold"
                            color={discountTag ? 'neutroFrio2' : 'preto'}
                          >
                            {currency || 'R$'}
                          </Typography>
                        </Typography>
                      )}
                    </Typography>
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize="15px"
                      color={discountTag ? 'neutroFrio2' : 'preto'}
                      style={
                      discountTag
                        ? {
                          textDecorationLine: 'line-through',
                        }
                        : {}
                    }
                    >
                      {discountTag
                        ? `${integerPart(price)},`
                        : `\n${integerPart(price)},`}
                    </Typography>
                    <Box mb={8}>
                      <Typography
                        fontFamily="nunitoBold"
                        fontSize="8px"
                        color={discountTag ? 'neutroFrio2' : 'preto'}
                        style={
                        discountTag
                          ? {
                            textDecorationLine: 'line-through',
                          }
                          : {}
                      }
                      >
                        {discountTag
                          ? `${decimalPart(price)}`
                          : `\n${decimalPart(price)}`}
                      </Typography>
                    </Box>
                  </Box>
                  {(priceWithDiscount === 0 && isGift) && (
                  <Box flexDirection="row">
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize="14px"
                      color="vermelhoRSV"
                    >
                      Grátis
                    </Typography>
                  </Box>

                  )}
                  {discountTag && priceWithDiscount !== 0 && (
                  <Box flexDirection="row">
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize="14px"
                      color="vermelhoRSV"
                      style={
                        discountApi
                          ? {
                            textDecorationLine: 'line-through',
                          }
                          : {}
                      }
                    >
                      {`${currency || 'R$'} ${integerPart(
                        discountApi ? priceWithDiscount + Math.abs(discountApi) : priceWithDiscount,
                      )},`}
                    </Typography>
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize="8px"
                      color="vermelhoRSV"
                      style={
                        discountApi
                          ? {
                            textDecorationLine: 'line-through',
                          }
                          : {}
                      }
                    >
                      {`${decimalPart(
                        discountApi ? priceWithDiscount + Math.abs(discountApi) : priceWithDiscount,
                      )}`}
                    </Typography>
                  </Box>
                  )}
                  {discountApi ? (
                    <Box flexDirection="row">
                      <Typography
                        fontFamily="nunitoBold"
                        fontSize="14px"
                        color="vermelhoRSV"
                      >
                        {`R$ ${integerPart(priceWithDiscount || price)},`}
                      </Typography>
                      <Typography
                        fontFamily="nunitoBold"
                        fontSize="8px"
                        color="vermelhoRSV"
                      >
                        {decimalPart(priceWithDiscount || price)}
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
                {count && (
                <Box width={90} marginTop="micro">
                  <Counter
                    testID={`${testID}_count`}
                    count={count}
                    disabledAdd={!!disableCounter}
                    disabledSub={!!disableCounter}
                    onClickAdd={(addCount) => {
                      if (onClickAddCount) {
                        onClickAddCount(addCount);
                      }
                    }}
                    onClickSub={(subCount) => {
                      if (subCount <= 0 && onClickSubCount) {
                        return onClickSubCount(count);
                      }

                      if (onClickSubCount) {
                        return onClickSubCount(subCount);
                      }
                    }}
                  />
                </Box>
                )}
                {isGiftable && (
                <Checkbox
                  testID={`${testID}_isGift`}
                  fontFamily="reservaSansRegular"
                  fontSize="10px"
                  optionName="É presente?"
                  color="preto"
                  width="80px"
                  onCheck={handleToggleIsGift}
                  checked={isGift}
                />
                )}
              </Box>
              {onClickBagButton && (
              <Box>
                <Button
                  flexDirection="row"
                  testID={`${testID}_buy`}
                  onPress={() => {
                    onClickBagButton();
                  }}
                >
                  <Box height={32} px="14px" flexGrow={1} py="nano" bg="preto">
                    <Typography
                      textAlign="center"
                      color="white"
                      fontSize={12}
                      fontFamily="nunitoRegular"
                    >
                      Comprar agora
                    </Typography>
                  </Box>
                </Button>
              </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box paddingLeft="xxs" paddingTop="nano" position="absolute" right={0} top={-5}>
          {onClickFavorite && (
          <Button
            variant="icone"
            testID={`${testID}_favorite`}
            onPress={() => {
              if (onClickFavorite) {
                onClickFavorite(!isFavorited);
              }
            }}
            icon={(
              <Icon
                name={isFavorited ? 'HeartRaised' : 'Heart'}
                size={14}
                color="preto"
              />
            )}
          />
          )}
          {onClickClose && (
          <Button
            hitSlop={{
              top: 35, left: 35, bottom: 35, right: 35,
            }}
            variant="icone"
            onPress={() => {
              onClickClose();
            }}
            icon={<Icon name="Close" size={11} color="preto" />}
          />
          )}
        </Box>
      </Box>
    </>
  );
};
