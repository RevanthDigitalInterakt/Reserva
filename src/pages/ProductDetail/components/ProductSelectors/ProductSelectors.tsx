import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Image, Text, TouchableOpacity, View,
} from 'react-native';
import ReactMoE, { MoEProperties } from 'react-native-moengage';
import { ScrollView } from 'react-native-gesture-handler';
import { Box } from '../../../../components/Box/Box';
import { Divider } from '../../../../components/Divider/Divider';
import { RadioButtons } from '../../../../components/RadioButtons/RadioButtons';
import { Typography } from '../../../../components/Typography/Typography';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { SelectColor } from '../SelectColor/SelectColor';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { NewInput } from '../../../../components/NewInput';
import { NewInputType } from '../../../../components/NewInput/types';
import { styles } from './ProductSelectors.styles';
import { BottomSheet } from '../../../../components/BottomSheet';
import { GiftCardList } from './components/GiftCardList';
import { type ProductGiftCardOptionOutput, ProductResultActionEnum } from '../../../../base/graphql/generated';
import { GiftCardRulesModal } from './components/GiftCardRulesModal';
import { commons } from '../../../../base/styles';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { RouletCouponCard } from '../../../Home/components/RouletCouponCard';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import ProductAddToCart from '../ProductAddToCart';
import OneP5P from '../../../../components/OneP5P/OneP5P';
import FittingRoomSession from '../FittingRoomSession';
import { SizeGuideImages } from '../FittingRoomSession/components/SizeGuide';
import { useDorisVerify } from '../../../../hooks/useDorisVerify';
import Personalize from '../Personalize';

function ProductSelectors() {
  const [showModal, setShowModal] = useState(false);
  const {
    productDetail,
    selectedColor,
    selectedSize,
    sizeIsSelected,
    setSelectedColor,
    setSelectedSize,
    selectedGiftCardSku,
    setGiftCardSelectedAmount,
    selectedGiftCardEmail,
    setGiftCardSelectedEmail,
  } = useProductDetailStore([
    'sizeIsSelected',
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

  const { getBoolean } = useRemoteConfig();
  const showRoulet = getBoolean('show_roulet');
  const showOnep5p = useMemo(() => getBoolean('show_onep5p_pdp'), []);
  const addToBagButtonIsFixed = useMemo(() => getBoolean('add_to_bag_button_is_fixed'), []);
  const showButtonsPdpFacavc = useMemo(() => getBoolean('show_buttons_pdp_facavc'), []);
  const { verifyProductDoris, isValidProductDoris } = useDorisVerify();
  const existsFvcProductReference = !!productDetail?.fvcProductReference;

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
      ExceptionProvider.captureException(err, "doSelectSizeTrack - ProductSelectors");
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
    return productDetail?.giftCard?.options.find(
      (option) => option.itemId === selectedGiftCardSku,
    )?.name;
  }, [selectedGiftCardSku, productDetail?.giftCard?.options]);

  const isGiftCard = productDetail?.action === ProductResultActionEnum.ShowGiftCard;

  useEffect(() => {
    if (selectedSize) doSelectSizeTrack();
    return () => {
      setGiftCardSelectedEmail('');
      setGiftCardSelectedAmount('');
    };
  }, [selectedSize, doSelectSizeTrack]);

  useEffect(() => {
    const properties = new MoEProperties();

    const lowPrice = productDetail?.priceRange?.sellingPrice?.lowPrice || 0;
    const currentPrice = productDetail?.initialSize?.currentPrice || 0;

    const discountValue = lowPrice - currentPrice;

    properties.addAttribute('source', '');
    properties.addAttribute('marca', productDetail?.categoryTree[0] || '');
    properties.addAttribute('id_produto', productDetail?.productId || '');
    properties.addAttribute('nome_produto', productDetail?.productName || '');
    properties.addAttribute('preco_produto', productDetail?.priceRange?.sellingPrice.lowPrice || 0);
    properties.addAttribute('preco_desconto', productDetail?.initialSize?.currentPrice || 0);
    properties.addAttribute('categorias', productDetail?.categoryTree || []);
    properties.addAttribute('cor_produto', productDetail?.initialColor?.colorName || '');
    properties.addAttribute('tamanho_produto', productDetail?.initialSize?.size || '');
    properties.addAttribute('desconto', discountValue);

    properties.setNonInteractiveEvent();

    ReactMoE.trackEvent('acessou_produto', properties);
    if (selectedSize) verifyProductDoris(selectedSize.ean);
  }, [selectedSize, selectedColor]);

  const handleSelectedItem = useMemo(() => {
    if (addToBagButtonIsFixed) {
      return sizeIsSelected ? selectedSize?.size || '' : '';
    }
    return selectedSize?.size || '';
  }, [sizeIsSelected, addToBagButtonIsFixed, selectedSize]);

  if (!productDetail) return null;

  const productDetailsHasColors = !!productDetail.colorUrls.length;
  const productIsOnlyFVC = productDetail.categoryTree.includes('Faça Você');

  return (
    <View>
      {productDetailsHasColors && !productIsOnlyFVC && (
        <Box mt="xs">
          <Box px="xxxs" mb="xxxs">
            <Typography variant="subtituloSessoes">Cores:</Typography>
          </Box>

          <Box>
            <ScrollView horizontal>
              <SelectColor
                onPress={(color) => {
                  EventProvider.logEvent('change_item_color', {
                    item_id: selectedSize?.itemId,
                    item_color: color,
                  });
                  setSelectedColor(color);
                }}
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
        {productDetailsHasColors && !productIsOnlyFVC && (
          <>
            <Box mt="xxxs">
              <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtituloSessoes">Tamanhos:</Typography>
              </Box>

              <Box alignItems="flex-start" mt="xxxs">
                <RadioButtons
                  size={38}
                  fontSize={12}
                  disbledOptions={disabledSizes}
                  onSelectedChange={(val) => {
                    EventProvider.logEvent('change_item_size', {
                      item_id: selectedSize?.itemId,
                      item_size: val,
                    });
                    setSelectedSize(`${val}`);
                  }}
                  optionsList={sizes}
                  defaultSelectedItem=""
                  selectedItem={handleSelectedItem}
                />
              </Box>
            </Box>

            <FittingRoomSession
              categoryTree={categoryTree}
              productId={productDetail.productId}
              productEan={selectedSize?.ean}
              isValidProductDoris={isValidProductDoris}
            />

            {showButtonsPdpFacavc && existsFvcProductReference && <Personalize fvcReferenceProduct={productDetail?.fvcProductReference || ''} />}

            {showOnep5p && addToBagButtonIsFixed && (<OneP5P comingFrom="PDP" />)}

            {!selectedSize?.availableQuantity && (
              <Box mt="xxs" flexDirection="row" alignItems="center">
                <IconLegacy name="Alert" size={20} color="vermelhoRSV" mr="nano" />

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
        ) : null}
        {!isGiftCard && !getBoolean('add_to_bag_button_is_fixed') && (
          <ProductAddToCart />
        )}
        {showRoulet ? (
          <RouletCouponCard />
        ) : null}

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
