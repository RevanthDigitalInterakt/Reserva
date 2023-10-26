import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Platform, ScrollView } from 'react-native';

import type { Maybe, OrderformSelectableGiftOptionOutput } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import { RadioButtons } from '../../../../components/RadioButtons/RadioButtons';
import { Typography } from '../../../../components/Typography/Typography';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { platformType } from '../../../../utils/platformType';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

const fontTitlePerPlatform = (Platform.OS === platformType.ANDROID ? 0.0352 : 0.036);
const fontTitle = configDeviceSizes.DEVICE_WIDTH * fontTitlePerPlatform;
const subtitle = configDeviceSizes.DEVICE_WIDTH * 0.032;

function getArrayColors(itemsInfo: Array<Maybe<OrderformSelectableGiftOptionOutput>>): Set<string> {
  const colors = itemsInfo.map((itemInfo) => itemInfo?.color || '');

  return new Set(colors);
}

export default function SelectableGifts() {
  const [showMoreSizes, setShowMoreSizes] = useState<boolean>(false);
  const [giftSizeList, setGiftSizeList] = useState<Array<string>>([]);

  const {
    currentSelectedColorGift,
    currentSelectedGiftSize,
    selectableGift,
    actions,
  } = useBagStore([
    'selectableGift',
    'currentSelectedGiftSize',
    'currentSelectedColorGift',
    'actions',
  ]);

  const giftImage = useMemo(() => (
    selectableGift?.currentSelectableGift.imageUrl?.replace('http', 'https')?.split('-55-55')?.join('')
  ), [selectableGift?.currentSelectableGift]);

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
    actions.SELECT_GIFT(color, '');
  }, [actions]);

  const handleAddGift = useCallback((giftId: string) => {
    const gift = selectableGift?.availableGifts.find(
      (giftItem) => giftItem.id === giftId,
    );

    if (!gift || !selectableGift?.id) return;

    actions.ADD_AVAILABLE_GIFT(gift, selectableGift?.id);
  }, [actions, selectableGift]);

  const handleSelectGiftSize = useCallback(({ size }: { size: string | number }) => {
    const giftToAddOrderForm = selectableGift?.giftOptions.find(
      (giftOption) => giftOption?.color
      === currentSelectedColorGift && giftOption.size === size,
    );

    if (!giftToAddOrderForm) return;

    handleAddGift(giftToAddOrderForm.id);
  }, [currentSelectedColorGift, handleAddGift, selectableGift?.giftOptions]);

  useEffect(() => {
    handleGenerateAndSetGiftSizeList({
      currentColorSelected: currentSelectedColorGift,
      giftOptions: selectableGift?.giftOptions || [],
    });
  }, [
    currentSelectedColorGift,
    handleGenerateAndSetGiftSizeList,
    selectableGift?.giftOptions,
  ]);

  useEffect(() => {
    if (selectableGift?.currentSelectableGift) {
      const currentColorSelected = selectableGift.currentSelectableGift.skuName.split('-')[0]?.trim() || '';

      handleGenerateAndSetGiftSizeList({
        currentColorSelected,
        giftOptions: selectableGift.giftOptions,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectableGift?.currentSelectableGift.isSelected === false) {
      handleAddGift(selectableGift.currentSelectableGift.id);
    }
  }, [selectableGift?.currentSelectableGift, handleAddGift]);

  return (
    <Box flexDirection="row" minHeight={152} mt="xxs">
      {giftImage && (
      <ImageComponent
        source={{ uri: giftImage }}
        width={configDeviceSizes.DEVICE_WIDTH * 0.25}
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
                {selectableGift?.currentSelectableGift.name?.split('-')[0]?.trim()}
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
                selectableGift?.giftOptions || [],
              )].map((colorItem, index) => (
                <Button
                  key={`${colorItem}_btn`}
                  onPress={() => handleSelectedGiftColor({ color: colorItem })}
                >
                  <Box
                    borderWidth="hairline"
                    borderColor="divider"
                    borderRadius="pico"
                    height={configDeviceSizes.DEVICE_WIDTH * 0.06}
                    bg={currentSelectedColorGift === colorItem ? 'preto' : 'white'}
                    alignItems="center"
                    justifyContent="center"
                    paddingX="nano"
                    marginRight={index < colorItem.length ? 'micro' : null}
                  >
                    <Typography
                      color={currentSelectedColorGift === colorItem ? 'white' : 'preto'}
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
              <Box
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

                <IconLegacy
                  style={
                    showMoreSizes
                      ? { transform: [{ rotate: '-90deg' }] }
                      : { transform: [{ translateY: 4 }] }
                  }
                  name={showMoreSizes ? 'ChevronRight' : 'ArrowDown'}
                  color="preto"
                  marginLeft="nano"
                  size={12}
                />
              </Box>
            </Button>
            )}
          </Box>
          <Box flex={1} justifyContent="flex-end">
            <Box>
              <RadioButtons
                size={configDeviceSizes.DEVICE_WIDTH * 0.08}
                fontSize={11.5}
                disbledOptions={[]}
                onSelectedChange={(giftSize) => handleSelectGiftSize({ size: giftSize })}
                optionsList={showMoreSizes ? giftSizeList : giftSizeList?.slice(0, 5)}
                showMoreSizes={showMoreSizes}
                defaultSelectedItem=""
                selectedItem={currentSelectedGiftSize.trim()}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
