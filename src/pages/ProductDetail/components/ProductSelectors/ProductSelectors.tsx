import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Box, Divider, Icon, RadioButtons, SelectColor, Typography,
} from '@usereservaapp/reserva-ui';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Image, Text, TouchableOpacity, View,
} from 'react-native';

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
import { GiftCardList } from './components/GiftCardList';
import { type ProductGiftCardOptionOutput, ProductResultActionEnum } from '../../../../base/graphql/generated';
import { GiftCardRulesModal } from './components/GiftCardRulesModal';
import { commons } from '../../../../base/styles';

function ProductSelectors() {
  const [showModal, setShowModal] = useState(false);
  const {
    productDetail,
    selectedColor,
    selectedSize,
    setSelectedColor,
    setSelectedSize,
    selectedGiftCardSku,
    setGiftCardSelectedAmount,
    selectedGiftCardEmail,
    setGiftCardSelectedEmail,
  } = useProductDetailStore([
    'productDetail',
    'selectedColor',
    'selectedSize',
    'setSelectedColor',
    'setGiftCardSelectedAmount',
    'setSelectedSize',
    'selectedGiftCardSku',
    'selectedGiftCardEmail',
    'setGiftCardSelectedEmail',
  ]);

  const doSelectSizeTrack = useCallback(() => {
    try {
      if (!productDetail || !selectedSize) return;

      EventProvider.logEvent('page_view', {
        item_brand: defaultBrand.picapau,
      });

      EventProvider.logEvent('view_item', {
        currency: 'BRL',
        items: [
          {
            item_id: selectedSize?.itemId,
            price: productDetail?.priceRange?.sellingPrice?.lowPrice || 0,
            quantity: 1,
            item_variant: '',
            item_name: productDetail.productName,
            item_category: 'product_group',
          },
        ],
        value: productDetail?.priceRange?.sellingPrice?.lowPrice || 0,
        item_brand: `${productDetail?.categoryTree[0]?.toUpperCase()},`,
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
    return () => {
      setGiftCardSelectedEmail('');
      setGiftCardSelectedAmount('');
    };
  }, [selectedSize, doSelectSizeTrack]);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);

  const handleBottomSheet = useCallback(() => {
    setBottomSheetIsOpen(!bottomSheetIsOpen);
  }, [bottomSheetIsOpen]);

  const handleSelectGiftCard = (option: ProductGiftCardOptionOutput) => {
    setGiftCardSelectedAmount(option.itemId);
    handleBottomSheet();
  };

  const handleChangeBeneficiarysEmail = (email: string) => {
    setGiftCardSelectedEmail(email);
  };

  const handleShowModal = () => setShowModal(true);

  const selectedGiftCardSkuAmount = useMemo(() => {
    if (!selectedGiftCardSku) return null;
    return productDetail?.giftCard?.options.find((option) => option.itemId === selectedGiftCardSku)?.name;
  }, [selectedGiftCardSku, productDetail?.giftCard?.options]);

  const isGiftCard = productDetail?.action === ProductResultActionEnum.ShowGiftCard;

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

        {isGiftCard ? (
          <>
            <View style={styles.inputsWrapper}>
              <NewInput
                type={NewInputType.CALL_TO_ACTION}
                onPress={handleBottomSheet}
                placeholder="Valor do cartão presente"
                value={selectedGiftCardSkuAmount as string | undefined}
              />
              <NewInput
                onChangeText={handleChangeBeneficiarysEmail}
                value={selectedGiftCardEmail}
                type={NewInputType.TEXT}
                placeholder="Digite aqui o e-mail do presenteado"
              />
            </View>

            <TouchableOpacity onPress={handleShowModal} style={styles.infoWrapper}>
              <Image source={commons.help} />
              <Text style={styles.infoText}>Entenda como funciona o presente.</Text>
            </TouchableOpacity>

            <BottomSheet isOpen={bottomSheetIsOpen} onBackdropPress={handleBottomSheet}>
              <GiftCardList
                onSelect={handleSelectGiftCard}
                list={productDetail.giftCard?.options!}
              />
            </BottomSheet>
          </>
        ) : <ProductAddToCart />}

        <Box mt="nano" flexDirection="row" />

        {!isGiftCard ? (
          <Divider variant="fullWidth" my="xs" />
        ) : null}
      </Box>

      <GiftCardRulesModal
        isVisible={showModal}
        setIsVisible={() => setShowModal(false)}
        data={{
          titleModal: 'Cartão Presente',
          descriptionModal: "Para garantir que o presenteado receba o código, é importante que você forneça um e-mail válido no campo 'E-mail do Presenteado' e que selecione o valor desejado no campo 'Valor do Cartão Presente' \n\n*Se certifique sempre de conferir os campos antes concluir a compra.",
        }}
        onPress={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
}

export default ProductSelectors;
