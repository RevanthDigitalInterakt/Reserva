import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { COLORS } from '../../base/styles/colors';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { decimalPart, integerPart } from '../../utils/numberUtils';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import ImageComponent from '../ImageComponent/ImageComponent';
import { Typography } from '../Typography/Typography';
import EventProvider from '../../utils/EventProvider';

interface IWishListProductCard {
  currency?: string;
  discountTag?: string;
  imageUrl: string;
  isAvailable?: boolean;
  size: string;
  color: string;
  title: string;
  price: number;
  onClickFavorite: () => Promise<void>;
  onClickBagButton: () => void;
  handleNavigateToProductDetail: () => void;
  loadingWishList: boolean;
  loadingBagButton: boolean;
  testID?: string;
}

export function WishListProductCard({
  currency = 'R$',
  discountTag,
  imageUrl,
  size,
  color,
  title,
  price,
  onClickFavorite,
  onClickBagButton,
  handleNavigateToProductDetail,
  loadingWishList,
  loadingBagButton,
  testID,
  isAvailable = true,
}: IWishListProductCard) {
  return (
    <Box
      flexDirection="row"
      height={152}
      justifyContent="space-between"
      flexGrow={1}
    >
      <Box flexDirection="row">
        <Box marginRight="micro">

          <TouchableOpacity onPress={handleNavigateToProductDetail} testID={`${testID}_image`}>
            <ImageComponent
              source={{ uri: imageUrl }}
              style={{
                height: '100%',
                width: configDeviceSizes.DEVICE_WIDTH * 0.25,
              }}
            />
          </TouchableOpacity>
        </Box>

        <Box>
          <Box flexDirection="row" width={configDeviceSizes.DEVICE_WIDTH * 0.53}>
            <Typography
              fontFamily="nunitoBold"
              fontSize={13}
              textAlign="center"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Typography>
          </Box>
          <Box width={230} justifyContent="space-between" flexGrow={1}>
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
                    fontSize={11}
                    color="preto"
                  >
                    {`Tam: ${size}`}
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
                    fontSize={11}
                    color="preto"
                  >
                    {`Cor: ${color}`}
                  </Typography>
                  <Box />
                </Box>
              </Box>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Box>
                {isAvailable ? (

                  <Box flexDirection="row" alignItems="flex-end">
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize={15}
                      color="neutroFrio2"
                    >
                      <Typography fontFamily="nunitoRegular" color="neutroFrio2">
                        {'Por\n'}
                        <Typography
                          fontFamily="nunitoBold"
                          color={discountTag ? 'neutroFrio2' : 'preto'}
                        >
                          {currency || 'R$'}
                        </Typography>
                      </Typography>
                    </Typography>
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize={15}
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
                    <Box mb="nano">
                      <Typography
                        fontFamily="nunitoBold"
                        fontSize={1}
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
                ) : (
                  <Box mt="xxs" flexDirection="row" alignItems="center">
                    <IconLegacy name="Alert" size={20} color="vermelhoRSV" mr="nano" />

                    <Typography fontFamily="reservaSansBold" fontSize={15} color="vermelhoRSV">
                      Produto Esgotado
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Box>
              <Button
                flexDirection="row"
                testID={`${testID}_buy`}
                disabled={loadingBagButton}
                loading={loadingBagButton}
                onPress={() => {
                  EventProvider.logEvent('add_to_cart_from_wishlist', {
                    item_name: title,
                    item_color: color,
                    item_size: size,
                    value: price,
                  });
                  onClickBagButton();
                }}
              >
                <Box height={32} flexGrow={1} py="nano" bg="preto">
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

          </Box>
        </Box>
      </Box>
      <Box paddingLeft="xxs" paddingTop="nano" position="absolute" right={0} top={-5}>
        {!loadingWishList
          ? (
            <Button
              variant="icone"
              testID={`${testID}_favorite`}
              onPress={async () => {
                await onClickFavorite();
              }}
              icon={(
                <IconLegacy
                  name="HeartRaised"
                  size={14}
                  color="preto"
                />
            )}
            />
          )
          : (
            <ActivityIndicator
              color={COLORS.BLACK}
              style={{ height: 16, width: 16 }}
            />
          )}
      </Box>
    </Box>
  );
}
