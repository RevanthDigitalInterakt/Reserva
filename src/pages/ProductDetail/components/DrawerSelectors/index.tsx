import React from 'react';
import {
  Image, ScrollView, Text, View,
} from 'react-native';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { SelectColor } from '../SelectColor/SelectColor';
import { RadioButtons } from '../../../../components/RadioButtons/RadioButtons';
import { commons } from '../../../../base/styles';
import styles from './styles';
import ProductAddToCart from '../ProductAddToCart';

export function DrawerSelectors() {
  const {
    productDetail,
    selectedColor,
    selectedSize,
    setSelectedColor,
    getDisabledSizes,
    getSizes,
    setSelectedSize,
    sizeIsSelected,
  } = useProductDetailStore([
    'productDetail',
    'selectedColor',
    'selectedSize',
    'setSelectedColor',
    'getSizes',
    'getDisabledSizes',
    'setSelectedSize',
    'sizeIsSelected',
  ]);
  const productDetailsHasColors = !!productDetail?.colorUrls.length;

  return productDetailsHasColors && (
    <View>
      <Text style={styles.title}>
        O produto já é quase seu!
      </Text>
      {!sizeIsSelected && (
        <Text style={styles.disclaimer}>
          Selecione um tamanho para adicioná-lo à sacola
        </Text>
      )}
      <View>
        <Text style={styles.labelText}>
          Cor:
        </Text>
        <ScrollView horizontal>
          <SelectColor
            onPress={setSelectedColor}
            size={30}
            disabledColors={productDetail?.disabledColors!}
            listColors={productDetail?.colorUrls!}
            selectedColors={selectedColor?.colorId || ''}
          />
        </ScrollView>
      </View>
      <View style={styles.sizesWrapper}>
        <Text style={styles.labelText}>
          Tamanho:
        </Text>
        <RadioButtons
          size={38}
          fontSize={12}
          disbledOptions={getDisabledSizes()}
          onSelectedChange={(val) => setSelectedSize(`${val}`)}
          optionsList={getSizes()}
          defaultSelectedItem=""
          selectedItem={sizeIsSelected ? selectedSize?.size || '' : ''}
        />
      </View>
      <ProductAddToCart />
      <View style={styles.umP5PWrapper}>
        <Image source={commons.umPCincoPLogo} alt="1p5p" />
        <View style={styles.divider} />
        <Text style={styles.umP5PText}>
          Ao comprar essa peça você está doando 5 pratos de comida
          para quem tem fome. Saiba mais no menu do app.
        </Text>
      </View>
    </View>
  );
}
