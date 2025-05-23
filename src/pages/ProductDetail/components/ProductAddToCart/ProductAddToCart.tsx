import React, { useCallback, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../ProductSelectors/ProductSelectors.styles';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import EventProvider from '../../../../utils/EventProvider';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { ModalBag } from '../../../../components/ModalBag/ModalBag';
import testProps from '../../../../utils/testProps';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import { Button } from '../../../../components/Button';
import { loadingSpinner } from '../../../../../assets/animations';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import type { ProductAddToCartProps } from './types';
import { mergeItemsPackage } from '../../../../utils/mergeItemsPackage';
import OneP5P from '../../../../components/OneP5P/OneP5P';
import { useTrackClickAlgoliaStore } from '../../../../zustand/useTrackAlgoliaStore/useTrackAlgoliaStore';
import { TrackEventNameEnum, TrackEventSubTypeEnum, TrackEventTypeEnum } from '../../../../base/graphql/generated';
import useSearchStore from '../../../../zustand/useSearchStore';
import ReactMoE, { MoEProperties } from 'react-native-moengage';
import { toProperCase } from '../../../../utils/properCase';
//import { sentenceCase } from "sentence-case";

function ProductAddToCart({ isFixed = false, fvcReferenceId }: ProductAddToCartProps) {
  const { getString, getBoolean } = useRemoteConfig();
  const { navigate } = useNavigation();
  const { onTrack } = useTrackClickAlgoliaStore(['onTrack']);
  const { queryID } = useSearchStore(['queryID']);

  const {
    actions, packageItems, orderFormId, appTotalizers,
  } = useBagStore(['actions', 'orderFormId', 'packageItems', 'appTotalizers']);

  const {
    productDetail,
    selectedColor,
    selectedSize,
    assinaturaSimples,
    setDrawerIsOpen,
    sizeIsSelected,
  } = useProductDetailStore([
    'productDetail',
    'selectedColor',
    'selectedSize',
    'assinaturaSimples',
    'sizeIsSelected',
    'setDrawerIsOpen',
  ]);

  const [showAnimationBag, setShowAnimationBag] = useState(false);
  const [loading, setLoading] = useState(false);
  const showOnep5p = useMemo(() => getBoolean('show_onep5p_pdp'), []);
  const addToBagButtonIsFixed = useMemo(() => getBoolean('add_to_bag_button_is_fixed'), []);

  const addTagsUponCartUpdate = useCallback(() => {
    if (!selectedColor || !productDetail) return;

    const timestamp = Math.floor(Date.now() / 1000);

    EventProvider.sendPushTags('sendAbandonedCartTags', {
      cart_update: timestamp.toString(),
      product_name: productDetail.productName,
      product_image: selectedColor.images?.[0] || '',
    });
  }, [selectedColor, productDetail]);

  const onAddProductToCart = useCallback(async () => {
    if (fvcReferenceId) {
      navigate('FacaVc', { type: fvcReferenceId });
      return;
    }

    try {
      if (!selectedSize || loading) return;

      if (!sizeIsSelected && addToBagButtonIsFixed) {
        setDrawerIsOpen(true);
        return;
      }

      setLoading(true);

      const mergedItems = mergeItemsPackage(packageItems);
      const existingItem = mergedItems.find(item => item.id === selectedSize.itemId);
      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

      await actions.ADD_ITEM(selectedSize.seller, selectedSize.itemId, newQuantity);

      onTrack({
        typeEvent: TrackEventTypeEnum.Conversion,
        nameEvent: queryID
          ? TrackEventNameEnum.CartItemsSearch
          : TrackEventNameEnum.CartItems,
        sku: [existingItem?.ean || ''],
        subTypeEvent: TrackEventSubTypeEnum.AddToCart,
        dataObject: [
          {
            discount: existingItem?.discountPercent || 0,
            price: existingItem?.price || 0,
            quantity: newQuantity,
          },
        ],
        totalPrice: appTotalizers.total,
        queryID,
      });

      console.log('mergedItems:', mergedItems);


      if (productDetail && selectedColor) {


        const timestamp: number | undefined = Math.floor(Date.now() / 1000);

        let formattedDate = '';

        if (typeof timestamp === 'number') {
          const d = new Date(0);
          d.setUTCSeconds(timestamp);

          // Extract parts
          const day = String(d.getUTCDate()).padStart(2, '0');
          const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // months 0-based
          const year = d.getUTCFullYear();

          const hours = String(d.getUTCHours()).padStart(2, '0');
          const minutes = String(d.getUTCMinutes()).padStart(2, '0');
          const seconds = String(d.getUTCSeconds()).padStart(2, '0');
          const milliseconds = String(d.getUTCMilliseconds()).padStart(3, '0');

          formattedDate = `${day}-${month}-${year}T${hours}:${minutes}:${seconds}.${milliseconds}`;

          console.debug("converted date", formattedDate);
        }


        let color = selectedColor?.colorName || '';
        //  color=sentenceCase(color);
        console.debug("printing color case", color);
        const size = selectedSize?.size || '';
        const lowPrice = productDetail?.priceRange?.sellingPrice?.lowPrice || 0;
        const currentPrice = productDetail?.initialSize?.currentPrice || 0;

        const discountValue = lowPrice - currentPrice;

        console.debug('detail tree', productDetail?.categoryTree);

        const rawCategoryTree: string[] = productDetail?.categoryTree || [];

        const productCategory = rawCategoryTree.map((name, index) => ({
          id: (index + 1).toString(),
          name: name,
        }));

        console.debug("product category",productCategory);


        



        // const rawCategoryTree: string[] = productDetail?.categoryTree || [];


        // const formattedCategory = {
        //   category: rawCategoryTree.map((name, index) => ({
        //     id: index.toString(),
        //     name: name.toLowerCase()
        //   }))
        // };



        const moeProps = new MoEProperties();
        moeProps.addAttribute('sellingPrice', productDetail?.priceRange?.sellingPrice.lowPrice || 0);
        moeProps.addAttribute('price', productDetail?.initialSize?.currentPrice || 0);
        //  moeProps.addAttribute('variant',color+'-'+size);

        moeProps.addAttribute('productColor', toProperCase(color || ''));
        moeProps.addAttribute('productSize', size.toUpperCase() || '');
        console.debug(size.toUpperCase());
        moeProps.addAttribute('skuId', selectedSize.itemId);
        moeProps.addAttribute('quantity', newQuantity);
        moeProps.addAttribute('brand', productDetail?.categoryTree[0] || '');
        moeProps.addAttribute('name', productDetail.productName);
        moeProps.addAttribute('category',JSON.stringify(productCategory));
        moeProps.addAttribute('discount', discountValue);
        moeProps.addAttribute('ean', productDetail?.initialSize?.ean || '');
        moeProps.addAttribute('productId', productDetail?.productId || '');

        console.debug('printing category', productCategory);
       //detail url missing


        const debugMoEProps = {
          sellingPrice: productDetail?.priceRange?.sellingPrice.lowPrice || 0,
          price: productDetail?.initialSize?.currentPrice || 0,
          productColor: color || '',
          productSize: size.toUpperCase() || '',
          skuId: selectedSize.itemId,
          quantity: newQuantity,
          brand: productDetail?.categoryTree[0] || '',
          name: productDetail.productName,
          category: productDetail?.categoryTree || [],
          discount: discountValue,
          ean: productDetail?.initialSize?.ean || '',
        };

        console.debug('MoEngage Event Properties:', debugMoEProps);

        ReactMoE.trackEvent('AddToCart', moeProps);
      }

      setShowAnimationBag(true);
      addTagsUponCartUpdate();
      setDrawerIsOpen(false);
    } catch (err: any) {
      ExceptionProvider.captureException(err, 'onAddProductToCart - ProductAddToCart.tsx', { orderFormId });
      Alert.alert('Ocorreu um erro', err?.message || 'Erro inesperado');
      actions.CREATE_NEW_ORDER_FORM();
    } finally {
      setLoading(false);
    }
  }, [
    actions,
    addTagsUponCartUpdate,
    loading,
    packageItems,
    orderFormId,
    selectedSize,
    setDrawerIsOpen,
    sizeIsSelected,
    fvcReferenceId,
    productDetail,
    selectedColor,
    queryID,
    onTrack,
    appTotalizers.total,
    addToBagButtonIsFixed,
    navigate,
  ]);

  const buttonAddCartActive = useMemo(() => {
    if (fvcReferenceId) return true;
    if (!selectedSize || !productDetail || selectedSize.disabled) return false;
    if (productDetail?.properties?.isAssinaturaSimples && !assinaturaSimples?.accepted) return false;
    return true;
  }, [fvcReferenceId, selectedSize, productDetail, assinaturaSimples]);

  return (
    <View style={isFixed ? styles.fixedWrapper : undefined}>
      <ModalBag
        isVisible={showAnimationBag}
        onBackdropPress={() => setShowAnimationBag(false)}
      />

      <Button
        height={70}
        title={fvcReferenceId ? 'PERSONALIZE DO SEU JEITO' : 'ADICIONAR À SACOLA'}
        variant="primarioEstreito"
        buttonBackgroundColor={getString('pdp_button_add_bag')}
        disabled={!buttonAddCartActive || loading}
        onPress={onAddProductToCart}
        inline
        {...testProps('com.usereserva:id/button_add_to_bag')}
      />

      {showOnep5p && !addToBagButtonIsFixed && (
        <OneP5P comingFrom="PDP" />
      )}

      {loading && (
        <View style={styles.containerLoading}>
          <LottieView
            source={loadingSpinner}
            style={{ width: 16, height: 16 }}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
}

export default ProductAddToCart;




