/* eslint-disable-file */

import {
  Box, Button, Icon, RadioButtons, Typography,
} from '@usereservaapp/reserva-ui';
import { Dimensions, Platform, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { createAnimatableComponent } from 'react-native-animatable';
import { platformType } from '../../../../utils/platformType';
import useBagStore from '../../../../zustand/useBagStore/useBagStore';
import type { Maybe, OrderformSelectableGiftOptionOutput } from '../../../../base/graphql/generated';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';

const screenWidth = Dimensions.get('window').width;
const BoxAnimation = createAnimatableComponent(Box);
const fontTitle = screenWidth * (Platform.OS === platformType.ANDROID ? 0.0352 : 0.036);
const subtitle = screenWidth * 0.032;

const getArrayColors = (
  itemsInfo: Array<Maybe<OrderformSelectableGiftOptionOutput>>,
): Set<string> => {
  const colors = itemsInfo.map((itemInfo) => itemInfo?.color || '');
  return new Set(colors);
};

export default function SelectableGifts() {
  const [showMoreSizes, setShowMoreSizes] = useState<boolean>(false);
  const [giftSizeList, setGiftSizeList] = useState<Array<string>>([]);

  const { selectableGiftInfo, dispatch } = useBagStore();
  const giftImage = React.useMemo(() => selectableGiftInfo.selectableGift?.currentSelectableGift.imageUrl?.replace('http', 'https')?.split('-55-55')?.join(''), [selectableGiftInfo.selectableGift?.currentSelectableGift]);

  const handleGenerateAndSetGiftSizeList = useCallback(({
    currentColorSelected,
    giftOptions,
  }: {
    giftOptions: Array<Maybe<OrderformSelectableGiftOptionOutput>>,
    currentColorSelected: string,
  }) => {
    const giftList: Set<string> = new Set();

    giftOptions.forEach((giftOption) => {
      if (giftOption?.color === currentColorSelected) {
        giftList.add(giftOption.size);
      }
    });

    setGiftSizeList([...giftList]);
  }, [setGiftSizeList]);

  const handleSelectedGiftColor = useCallback(({ color }: { color: string }) => {
    dispatch({
      actionType: 'HANDLE_SELECT_GIFT_SIZE_AND_COLOR',
      payload: {
        value: {
          giftSize: '',
          giftColor: color,
        },
      },
    });
  }, [dispatch]);

  const handleAddGift = useCallback((giftId: string) => {
    const gift = selectableGiftInfo.selectableGift?.availableGifts.find(
      (giftItem) => giftItem.id === giftId,
    );

    if (!gift) return;

    dispatch({
      actionType: 'HANDLE_ADD_AVAILABLE_GIFT',
      payload: {
        value: {
          gift,
          giftId: selectableGiftInfo.selectableGift?.id,
        },
      },
    });
  }, [dispatch, selectableGiftInfo.selectableGift]);

  const handleSelectGiftSize = useCallback(({ size }: { size: string | number }) => {
    const giftToAddOrderForm = selectableGiftInfo.selectableGift?.giftOptions.find(
      (giftOption) => giftOption?.color
      === selectableGiftInfo.currentSelectedColorGift && giftOption.size === size,
    );

    if (!giftToAddOrderForm) return;

    handleAddGift(giftToAddOrderForm.id);
  }, [
    selectableGiftInfo,
    handleAddGift,
  ]);

  useEffect(() => {
    handleGenerateAndSetGiftSizeList({
      currentColorSelected: selectableGiftInfo.currentSelectedColorGift,
      giftOptions: selectableGiftInfo.selectableGift?.giftOptions || [],
    });
  }, [
    selectableGiftInfo.currentSelectedColorGift,
    handleGenerateAndSetGiftSizeList,
    selectableGiftInfo.selectableGift?.giftOptions,
  ]);

  useEffect(() => {
    if (selectableGiftInfo.selectableGift?.currentSelectableGift) {
      const currentColorSelected = selectableGiftInfo.selectableGift.currentSelectableGift.skuName.split('-')[0]?.trim() || '';

      handleGenerateAndSetGiftSizeList({
        currentColorSelected,
        giftOptions: selectableGiftInfo.selectableGift.giftOptions,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectableGiftInfo.selectableGift?.currentSelectableGift.isSelected === false) {
      handleAddGift(selectableGiftInfo.selectableGift.currentSelectableGift.id);
    }
  }, [selectableGiftInfo.selectableGift?.currentSelectableGift, handleAddGift]);

  return (
    <Box flexDirection="row" minHeight={152} mt="xxs">
      {giftImage && (
      <ImageComponent
        source={{ uri: giftImage }}
        width={screenWidth * 0.25}
        height={152}
      />
      )}

      <Box ml="micro" flex={1} minHeight={152}>
        <Box minHeight={93}>
          <Box>
            <Typography
              fontFamily="reservaSerifBold"
              fontSize={fontTitle}
            >
              Parabéns, você ganhou um brinde!
            </Typography>
          </Box>

          <Box minHeight={48}>
            <Typography
              fontFamily="reservaSansLight"
              fontSize={subtitle}
            >
              Sua compra tem uma vantagem especial:
            </Typography>
            <Typography
              fontFamily="reservaSansLight"
              fontSize={subtitle}
            >
              você ganhou
              <Typography
                fontFamily="reservaSansBold"
                fontSize={subtitle}
              >
                {' '}
                1
                {' '}
                {selectableGiftInfo.selectableGift?.currentSelectableGift.name?.split('-')[0]?.trim()}
              </Typography>
            </Typography>
          </Box>
          <ScrollView horizontal>
            <Box
              alignItems="flex-start"
              flexWrap="wrap"
              flexDirection="row"
            >
              {[...getArrayColors(
                selectableGiftInfo.selectableGift?.giftOptions || [],
              )].map((colorItem, index) => (
                <Button
                  key={`${colorItem}_btn`}
                  onPress={() => handleSelectedGiftColor({ color: colorItem })}
                >
                  <Box
                    borderWidth="hairline"
                    borderColor="divider"
                    borderRadius="pico"
                    height={screenWidth * 0.06}
                    bg={selectableGiftInfo.currentSelectedColorGift === colorItem ? 'preto' : 'white'}
                    alignItems="center"
                    justifyContent="center"
                    paddingX="nano"
                    marginRight={index < colorItem.length ? 'micro' : null}
                  >
                    <Typography
                      color={selectableGiftInfo.currentSelectedColorGift === colorItem ? 'white' : 'preto'}
                      fontFamily="reservaSansBold"
                      fontSize={10.3}
                    >
                      {colorItem}
                    </Typography>
                  </Box>
                </Button>
              ))}
            </Box>
          </ScrollView>
        </Box>

        <Box minHeight={59}>
          <Box
            mb="micro"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              fontFamily="reservaSansBold"
              fontSize={subtitle}
            >
              Selecione o tamanho
            </Typography>

            {showMoreSizes && (
            <Button
              onPress={() => setShowMoreSizes(!showMoreSizes)}
              hitSlop={{ left: 50, top: 15, bottom: 15 }}
            >
              <BoxAnimation
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  fontFamily="reservaSansRegular"
                  fontSize={subtitle}
                >
                  Ver mais
                </Typography>

                <Icon
                  style={
                    showMoreSizes
                      ? {
                        transform: [{ rotate: '-90deg' }],
                      }
                      : { transform: [{ translateY: 4 }] }
                  }
                  name={
                    showMoreSizes
                      ? 'ChevronRight'
                      : 'ArrowDown'
                  }
                  color="preto"
                  marginLeft="nano"
                  size={12}
                />
              </BoxAnimation>
            </Button>
            )}
          </Box>
          <Box flex={1} justifyContent="flex-end">
            <Box>
              <RadioButtons
                size={screenWidth * 0.08}
                fontSize={11.5}
                disbledOptions={[]}
                onSelectedChange={(giftSize) => handleSelectGiftSize({ size: giftSize })}
                optionsList={showMoreSizes ? giftSizeList : giftSizeList?.slice(0, 5)}
                showMoreSizes={showMoreSizes}
                defaultSelectedItem=""
                selectedItem={selectableGiftInfo.currentSelectedGiftSize.trim()}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
