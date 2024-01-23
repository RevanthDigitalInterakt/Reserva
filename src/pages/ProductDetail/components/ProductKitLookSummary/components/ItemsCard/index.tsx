import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Box } from '../../../../../../components/Box/Box';
import styles from '../styles';
import ImageComponent from '../../../../../../components/ImageComponent/ImageComponent';
import { PriceCustom } from '../../../../../../modules/Checkout/components/PriceCustom';
import IconComponent from '../../../../../../components/IconComponent/IconComponent';

import { useProductDetailStore } from '../../../../../../zustand/useProductDetail/useProductDetail';

import { RadioButtons } from '../RadioButtons';
import { ColorsButtons } from '../ColorsButtons';
import type { ProductKitOutput } from '../../../../../../base/graphql/generated';

interface IItemsCard {
  item: ProductKitOutput;
}

function ItemsCard({ item }: IItemsCard) {
  const [selectedItem, setSelectedItem] = useState(false);

  const {
    productDetail,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    kit,
  } = useProductDetailStore([
    'productDetail',
    'selectedSize',
    'setSelectedSize',
    'selectedColor',
    'setSelectedColor',
    'kit',
  ]);

  const disabledSizes = useMemo(() => (
    (selectedColor?.sizes || []).filter((x) => x.disabled).map((t) => t.size || '')
  ), [selectedColor]);

  const sizes: string[] = useMemo(() => (
    (selectedColor?.sizes || []).map((y) => y.size || '')
  ), [selectedColor]);

  if (!productDetail) return null;

  if (!item) return null;

  const image = item?.colors.map((i) => i.images[0]);

  const price = item?.colors.map((i) => i.sizes.map((p) => p.currentPrice)) || 0;

  return (
    <View>
      <Box
        key={item?.productId}
        style={styles.container}
      >
        <Box style={styles.containerIcon}>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(!selectedItem);
            }}
          >
            <IconComponent
              icon={selectedItem ? 'checkedBox' : 'uncheckedBox'}
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
            num={300}
          />

          <Box style={styles.containerColors}>
            <View style={styles.containerTexts}>
              <Text style={styles.textBold}>Cor:</Text>
              <Text style={styles.textColor}>{selectedColor?.colorName}</Text>
            </View>
            <ColorsButtons
              onPress={setSelectedColor}
              disabledColors={productDetail?.disabledColors}
              listColors={productDetail?.colorUrls}
              selectedColors={selectedColor?.colorId || ''}
            />
          </Box>

          <Box style={styles.containerSize}>
            <View style={styles.containerTexts}>
              <Text style={styles.textBold}>Tamanho:</Text>
              <Text style={styles.textColor}>{selectedSize?.size}</Text>
            </View>
            <RadioButtons
              disabledOptions={disabledSizes}
              onSelectedChange={(val) => setSelectedSize(`${val}`)}
              optionsList={sizes}
              selectedItem={selectedSize?.size || ''}
            />
          </Box>
        </Box>
      </Box>
    </View>
  );
}

export default ItemsCard;
