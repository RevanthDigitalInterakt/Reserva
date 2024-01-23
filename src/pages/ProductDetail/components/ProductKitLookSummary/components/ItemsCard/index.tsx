import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Box } from '../../../../../../components/Box/Box';
import styles from '../styles';
import ImageComponent from '../../../../../../components/ImageComponent/ImageComponent';
import { PriceCustom } from '../../../../../../modules/Checkout/components/PriceCustom';
import IconComponent from '../../../../../../components/IconComponent/IconComponent';

import type { ProductKitOutput } from '../../../../../../base/graphql/generated';
import { RadioButtons } from '../RadioButtons';
import { ColorsButtons } from '../ColorsButtons';

export interface ISelectedItem {
  checked: boolean;
  productId: string;
  colorId: string;
  itemId: string; // skuId
}

interface IItemsCard {
  item: ProductKitOutput;
  selectedItem: ISelectedItem;
  onSelectItem: (item: ISelectedItem) => void;
}

function ItemsCard({ item, selectedItem, onSelectItem }: IItemsCard) {
  const listColors = useMemo(() => item.colors.map((color) => ({
    id: color.colorId,
    url: color.colorUrl,
  })), [item.colors]);

  const selectedColor = useMemo(() => (
    item.colors.find((color) => color.colorId === selectedItem.colorId)
  ), [item, selectedItem]);

  const selectedSize = useMemo(() => (
    selectedColor?.sizes.find((size) => size.itemId === selectedItem.itemId)
  ), [item, selectedItem]);

  const onSelectedChange = useCallback((obj: Partial<ISelectedItem>) => {
    onSelectItem({ ...selectedItem, ...obj });
  }, [onSelectItem, selectedItem]);

  // const disabledSizes = useMemo(() => (
  //   (selectedColor?.sizes || []).filter((x) => x.disabled).map((t) => t.size || '')
  // ), [selectedColor]);
  //
  // const sizes: string[] = useMemo(() => (
  //   (selectedColor?.sizes || []).map((y) => y.size || '')
  // ), [selectedColor]);

  // if (!productDetail) return null;

  if (!item) return null;

  const image = item?.colors.map((i) => i.images[0]);

  // const price = item?.colors.map((i) => i.sizes.map((p) => p.currentPrice)) || 0;

  return (
    <View>
      <Box
        key={item?.productId}
        style={styles.container}
      >
        <Box style={styles.containerIcon}>
          <TouchableOpacity onPress={() => onSelectedChange({ checked: !selectedItem.checked })}>
            <IconComponent
              icon={selectedItem.checked ? 'checkedBox' : 'uncheckedBox'}
              height={24}
              width={24}
            />
          </TouchableOpacity>
        </Box>

        <Box style={styles.containerImage}>
          <TouchableOpacity
            onPress={() => { }}
          >

            <ImageComponent
              key={item?.productId}
              source={{ uri: image.toString() }}
              width={100}
              height={154}
              resizeMode="contain"
            />

          </TouchableOpacity>
        </Box>

        <Box
          key={item?.productId}
          style={styles.containerColor}
        >
          <Text style={styles.title}>{item?.productName}</Text>

          <PriceCustom
            key={item?.productId}
            fontFamily="reservaSansBold"
            sizeInterger={15}
            sizeDecimal={11}
            num={selectedSize?.currentPrice || 0}
          />

          <Box style={styles.containerColors}>
            <View style={styles.containerTexts}>
              <Text style={styles.textBold}>Cor:</Text>
              <Text style={styles.textColor}>{selectedColor?.colorName}</Text>
            </View>
            <ColorsButtons
              onPress={console.log}
              disabledColors={[]}
              listColors={listColors}
              selectedColors={selectedColor?.colorId || ''}
            />
          </Box>

          {!!selectedColor?.sizes.length && (
            <Box style={styles.containerSize}>
              <View style={styles.containerTexts}>
                <Text style={styles.textBold}>Tamanho:</Text>
                <Text style={styles.textColor}>{selectedItem.itemId}</Text>
              </View>
              <RadioButtons
                disabledOptions={[]}
                onSelectedChange={(val) => console.log('VAL', val)}
                optionsList={selectedColor.sizes.map((size) => size.size)}
                selectedItem={selectedItem.itemId || ''}
              />
            </Box>
          )}
        </Box>
      </Box>
    </View>
  );
}

export default ItemsCard;
