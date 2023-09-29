import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Box, Icon, RadioButtons, SelectColor, Typography,
} from '@usereservaapp/reserva-ui';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';

import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { SizeGuide, SizeGuideImages } from './SizeGuide';
import EventProvider from '../../../../utils/EventProvider';
import ProductAddToCart from '../ProductAddToCart';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { NewInput } from '../../../../components/NewInput';
import { NewInputType } from '../../../../components/NewInput/types';
import { styles } from './ProductSelectors.styles';
import { BottomSheet } from '../../../../components/BottomSheet';

function ProductSelectors() {
  const {
    productDetail,
    selectedColor,
    selectedSize,
    setSelectedColor,
    setSelectedSize,
  } = useProductDetailStore([
    'productDetail',
    'selectedColor',
    'selectedSize',
    'setSelectedColor',
    'setSelectedSize',
  ]);

  const doSelectSizeTrack = useCallback(() => {
    try {
      if (!productDetail || !selectedSize) return;

      EventProvider.logEvent('page_view', {
        wbrand: defaultBrand.picapau,
      });

      EventProvider.logEvent('view_item', {
        currency: 'BRL',
        items: [
          {
            item_id: selectedSize?.itemId,
            price: productDetail.priceRange.sellingPrice?.lowPrice,
            quantity: 1,
            item_variant: '',
            item_name: productDetail.productName,
            item_category: 'product_group',
          },
        ],
        value: productDetail.priceRange.sellingPrice?.lowPrice,
        wbrand: `${productDetail?.categoryTree[0]?.toUpperCase()},`,
      });
    } catch (err) {
      ExceptionProvider.captureException(err);
    }
  }, [productDetail, selectedSize]);

  const disabledSizes = useMemo(() => (
    (selectedColor?.sizes || []).filter((item) => item.disabled).map((item) => item.size || '')
  ), [selectedColor]);

  const sizes: string[] = useMemo(() => (
    (selectedColor?.sizes || []).map((item) => item.size || '')
  ), [selectedColor]);

  const categoryTree = useMemo(() => {
    const sizeGuide = productDetail?.categoryTree.find((cat) => (
      Object.keys(SizeGuideImages).includes(cat)
    ));

    if (!sizeGuide || !productDetail) return null;

    return productDetail.categoryTree.map((item) => ({ name: item }));
  }, [productDetail]);

  useEffect(() => {
    if (selectedSize) doSelectSizeTrack();
  }, [selectedSize, doSelectSizeTrack]);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);

  const handleBottomSheet = useCallback(() => {
    setBottomSheetIsOpen(!bottomSheetIsOpen);
  }, [bottomSheetIsOpen]);

  if (!productDetail) return null;

  const productDetailsHasColors = !!productDetail.colorUrls.length;

  return (
    <View>
      {productDetailsHasColors && (
        <Box mt="xs">
          <Box px="xxxs" mb="xxxs">
            <Typography variant="subtituloSessoes">Cores:</Typography>
          </Box>

          <Box>
            <ScrollView horizontal>
              <SelectColor
                onPress={setSelectedColor}
                size={30}
                disabledColors={productDetail.disabledColors}
                listColors={productDetail.colorUrls}
                selectedColors={selectedColor?.colorId || ''}
              />
            </ScrollView>
          </Box>
        </Box>
      )}

      <Box px="xxxs">
        {productDetailsHasColors && (
          <>
            <Box mt="xxxs">
              <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtituloSessoes">Tamanhos:</Typography>

                {!!categoryTree?.length && (
                  <SizeGuide categoryTree={categoryTree} productId={productDetail.productId} />
                )}
              </Box>

              <Box alignItems="flex-start" mt="xxxs">
                <RadioButtons
                  size={38}
                  fontSize={12}
                  disbledOptions={disabledSizes}
                  onSelectedChange={(val) => setSelectedSize(`${val}`)}
                  optionsList={sizes}
                  defaultSelectedItem=""
                  selectedItem={selectedSize?.size || ''}
                />
              </Box>
            </Box>

            {!selectedSize?.availableQuantity && (
              <Box mt="xxs" flexDirection="row" alignItems="center">
                <Icon name="Alert" size={20} color="vermelhoRSV" mr="nano" />

                <Typography fontFamily="reservaSansBold" fontSize={15} color="vermelhoRSV">
                  Produto Esgotado
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* TODO: FORM CARTÃO PRESENTE */}
        <View style={styles.inputsWrapper}>
          <NewInput
            type={NewInputType.CALL_TO_ACTION}
            onPress={handleBottomSheet}
            placeholder="Valor do cartão presente"
          />
          <NewInput type={NewInputType.TEXT} placeholder="Digite aqui o e-mail do presenteado" />
        </View>

        <BottomSheet isOpen={bottomSheetIsOpen} onBackdropPress={handleBottomSheet} />

        <ProductAddToCart />

        <Box mt="nano" flexDirection="row" />

        {/* <Divider variant="fullWidth" my="xs" /> */}
      </Box>
    </View>
  );
}

export default ProductSelectors;
