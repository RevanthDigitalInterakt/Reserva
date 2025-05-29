import React, { useCallback, useEffect, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import ImageComponent from '../../../../../../components/ImageComponent/ImageComponent';
import { PriceCustom } from '../../../../../../modules/Checkout/components/PriceCustom';
import IconComponent from '../../../../../../components/IconComponent/IconComponent';

import type { ProductKitOutput } from '../../../../../../base/graphql/generated';
import { RadioButtons } from '../RadioButtons';
import { ColorsButtons } from '../ColorsButtons';
import { defaultBrand } from '../../../../../../utils/defaultWBrand';
import EventProvider from '../../../../../../utils/EventProvider';
import { ExceptionProvider } from '../../../../../../base/providers/ExceptionProvider';
import { useProductDetailStore } from '../../../../../../zustand/useProductDetail/useProductDetail';

export interface ISelectedItem {
  checked: boolean;
  productId: string;
  colorId: string;
  itemId: string; // skuId
  size?: string | number;
  seller: string;
  price: number;
  index: number;
}

interface IItemsCard {
  item: ProductKitOutput;
  selectedItem: ISelectedItem;
  onSelectItem: (item: ISelectedItem) => void;
}

function ItemsCard({ item, selectedItem, onSelectItem }: IItemsCard) {
  const { productDetail } = useProductDetailStore(['productDetail']);
  const listColors = useMemo(() => item.colors.map((color) => ({
    id: color.colorId,
    url: color.colorUrl,
  })), [item.colors]);

  const selectedColor = useMemo(() => (
    item.colors.find((color) => color.colorId === selectedItem.colorId)
  ), [item, selectedItem]);

  const selectedSize = useMemo(() => (
    selectedColor?.sizes.find((size) => size.itemId === selectedItem.itemId)
  ), [selectedColor, selectedItem]);

  const onSelectedChange = useCallback((obj: Partial<ISelectedItem>) => {
    onSelectItem({ ...selectedItem, ...obj });
  }, [onSelectItem, selectedItem]);

  const doSelectSizeTrack = useCallback(() => {
    try {
      if (!selectedSize || !selectedItem.checked) return;

      EventProvider.logEvent('page_view', {
        item_brand: defaultBrand.picapau,
      });

      EventProvider.logEvent('view_item', {
        currency: 'BRL',
        items: [
          {
            item_id: selectedSize?.itemId,
            price: selectedItem.price || 0,
            quantity: 1,
            item_variant: '',
            item_name: selectedSize.skuName,
            item_category: 'product_group',
          },
        ],
        value: selectedItem.price || 0,
        item_brand: `${productDetail?.categoryTree[0]?.toUpperCase()},`,
      });
    } catch (err) {
      ExceptionProvider.captureException(err, "doSelectSizeTrack - ProductKitLookSummary");
    }
  }, [productDetail, selectedSize, selectedItem]);

  useEffect(() => {
    doSelectSizeTrack();
  }, [selectedItem]);

  const disabledSizes = useMemo(() => (
    (selectedColor?.sizes || []).filter((x) => x.disabled).map((t) => t.size || '')
  ), [selectedColor]);

  if (!item) return null;

  const image = item?.colors.map((i) => i.images[0]);

  return (
    <View style={styles.container}>
      <View style={styles.containerIcon}>
        <TouchableOpacity onPress={() => onSelectedChange({ checked: !selectedItem.checked })}>
          <IconComponent
            icon={selectedItem.checked ? 'checkedBox' : 'uncheckedBox'}
            height={24}
            width={24}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerImage}>
        <ImageComponent
          source={{ uri: image.toString() }}
          width={100}
          height={154}
          resizeMode="contain"
        />
      </View>

      <View style={styles.containerColor}>
        <Text numberOfLines={1} style={styles.title}>
          {item?.productName}
        </Text>

        <View style={styles.containerInstallments}>
          {
            selectedSize?.installment
            && selectedSize?.installment.number > 1 && (
              <>
                <Text style={styles.textInstallments}>
                  {selectedSize?.installment.number}
                  x
                  {' '}
                </Text>
                <PriceCustom
                  fontFamily="reservaSansBold"
                  sizeInterger={15}
                  sizeDecimal={11}
                  num={selectedSize?.installment.value || 0}
                />

                <View style={styles.divider} />
              </>
            )
          }

          {selectedSize?.currentPrice ? (
            <PriceCustom
              fontFamily="reservaSansBold"
              sizeInterger={15}
              sizeDecimal={11}
              num={selectedSize?.currentPrice || 0}
            />
          ) : (<Text style={styles.textSizeSelected}>Selecione um tamanho</Text>)}
        </View>

        <View style={styles.containerColors}>
          <View style={styles.containerTexts}>
            <Text style={styles.textBold}>Cor:</Text>
            <Text style={styles.textColor}>{selectedColor?.colorName}</Text>
          </View>
          <ColorsButtons
            onPress={(color) => onSelectedChange({ colorId: color })}
            disabledColors={disabledSizes}
            listColors={listColors}
            selectedColors={selectedColor?.colorId || ''}
          />
        </View>

        {!!selectedColor?.sizes.length && (
          <View style={styles.containerSize}>
            <View style={styles.containerTexts}>
              <Text style={styles.textBold}>Tamanho:</Text>
              {selectedSize?.currentPrice ? (
                <Text style={styles.textSize}>{selectedItem.size}</Text>
              ) : null}
            </View>
            <RadioButtons
              disabledOptions={disabledSizes}
              onSelectedChange={
                (val) => onSelectedChange({
                  itemId: `${val.item}`,
                  size: `${val.size}`,
                  seller: `${val.seller}`,
                  price: val.price,
                })
              }
              optionsList={selectedColor.sizes.map((size) => size)}
              selectedItem={selectedItem.itemId || ''}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default ItemsCard;
