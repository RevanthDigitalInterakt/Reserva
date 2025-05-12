// import React, { useCallback, useMemo, useState } from 'react';
// import { Alert, View } from 'react-native';
// import LottieView from 'lottie-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { styles } from '../ProductSelectors/ProductSelectors.styles';
// import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
// import EventProvider from '../../../../utils/EventProvider';
// import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
// import { ModalBag } from '../../../../components/ModalBag/ModalBag';
// import testProps from '../../../../utils/testProps';
// import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
// import { Button } from '../../../../components/Button';
// import { loadingSpinner } from '../../../../../assets/animations';
// import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
// import type { ProductAddToCartProps } from './types';
// import { mergeItemsPackage } from '../../../../utils/mergeItemsPackage';
// import OneP5P from '../../../../components/OneP5P/OneP5P';
// import { useTrackClickAlgoliaStore } from '../../../../zustand/useTrackAlgoliaStore/useTrackAlgoliaStore';
// import { TrackEventNameEnum, TrackEventSubTypeEnum, TrackEventTypeEnum } from '../../../../base/graphql/generated';
// import useSearchStore from '../../../../zustand/useSearchStore';
// import ReactMoE, { MoEProperties } from 'react-native-moengage';



// function ProductAddToCart({ isFixed = false, fvcReferenceId }: ProductAddToCartProps) {
//   const { getString, getBoolean } = useRemoteConfig();
//   const { navigate } = useNavigation();
//   const { onTrack } = useTrackClickAlgoliaStore(['onTrack']);
//   const { queryID } = useSearchStore(['queryID']);
//   const {
//     actions, packageItems, orderFormId, appTotalizers,
//   } = useBagStore(['actions', 'orderFormId', 'packageItems', 'appTotalizers']);
//   const {
//     productDetail,
//     selectedColor,
//     selectedSize,
//     assinaturaSimples,
//     setDrawerIsOpen,
//     sizeIsSelected,
//   } = useProductDetailStore([
//     'productDetail',
//     'selectedColor',
//     'selectedSize',
//     'assinaturaSimples',
//     'sizeIsSelected',
//     'setDrawerIsOpen',
//   ]);

//   const [showAnimationBag, setShowAnimationBag] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const showOnep5p = useMemo(() => getBoolean('show_onep5p_pdp'), []);
//   const addToBagButtonIsFixed = useMemo(() => getBoolean('add_to_bag_button_is_fixed'), []);

//   const addTagsUponCartUpdate = useCallback(() => {
//     if (!selectedColor || !productDetail) return;

//     const timestamp = Math.floor(Date.now() / 1000);

//     EventProvider.sendPushTags('sendAbandonedCartTags', {
//       cart_update: timestamp.toString(),
//       product_name: productDetail.productName,
//       product_image: selectedColor.images[0],
//     });
//   }, [selectedColor, productDetail]);

//   // const onAddProductToCart = useCallback(async () => {
//   //   if (fvcReferenceId) {
//   //     navigate('FacaVc', { type: fvcReferenceId });
//   //     return;
//   //   }

//   //   try {
//   //     if (!selectedSize || loading) return;

//   //     if (!sizeIsSelected && addToBagButtonIsFixed) {
//   //       setDrawerIsOpen(true);
//   //       return;
//   //     }

//   //     setLoading(true);

//   //     const mergeItems = mergeItemsPackage(packageItems);

//   //     const orderFormItem = mergeItems.find((item) => item.id === selectedSize.itemId);

//   // onTrack({
//   //   typeEvent: TrackEventTypeEnum.Conversion,
//   //   nameEvent: queryID
//   //     ? TrackEventNameEnum.CartItemsSearch
//   //     : TrackEventNameEnum.CartItems,
//   //   sku: [orderFormItem?.ean || ''],
//   //   subTypeEvent: TrackEventSubTypeEnum.AddToCart,
//   //   dataObject: [
//   //     {
//   //       discount: orderFormItem?.discountPercent || 0,
//   //       price: orderFormItem?.price || 0,
//   //       quantity: orderFormItem?.quantity || 0,
//   //     },
//   //   ],
//   //   totalPrice: appTotalizers.total,
//   //   queryID,
//   // });

//   //     await actions.ADD_ITEM(
//   //       selectedSize.seller,
//   //       selectedSize.itemId,
//   //       orderFormItem ? orderFormItem.quantity + 1 : 1,
//   //     );

//   //     setShowAnimationBag(true);
//   //     addTagsUponCartUpdate();
//   //     setDrawerIsOpen(false);
//   //   } catch (err) {
//   //     ExceptionProvider.captureException(err, "onAddProductToCart - ProductAddToCart.tsx", { orderFormId });
//   //     Alert.alert('Ocorreu um erro', err.message);

//   //     actions.CREATE_NEW_ORDER_FORM();
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }, [
//   //   actions,
//   //   addTagsUponCartUpdate,
//   //   loading,
//   //   packageItems,
//   //   orderFormId,
//   //   selectedSize,
//   //   setDrawerIsOpen,
//   //   sizeIsSelected,
//   //   fvcReferenceId,
//   // ]);



//   const onAddProductToCart = useCallback(async () => {
//     if (fvcReferenceId) {
//       navigate('FacaVc', { type: fvcReferenceId });
//       return;
//     }

//     try {
//       if (!selectedSize || loading) return;

//       if (!sizeIsSelected && addToBagButtonIsFixed) {
//         setDrawerIsOpen(true);
//         return;
//       }

//       setLoading(true);

//       const mergeItems = mergeItemsPackage(packageItems);
//       const orderFormItem = mergeItems.find((item) => item.id === selectedSize.itemId);

//       await actions.ADD_ITEM(
//         selectedSize.seller,
//         selectedSize.itemId,
//         orderFormItem ? orderFormItem.quantity + 1 : 1,
//       );

//       onTrack({
//         typeEvent: TrackEventTypeEnum.Conversion,
//         nameEvent: queryID
//           ? TrackEventNameEnum.CartItemsSearch
//           : TrackEventNameEnum.CartItems,
//         sku: [orderFormItem?.ean || ''],
//         subTypeEvent: TrackEventSubTypeEnum.AddToCart,
//         dataObject: [
//           {
//             discount: orderFormItem?.discountPercent || 0,
//             price: orderFormItem?.price || 0,
//             quantity: orderFormItem?.quantity || 0,
//           },
//         ],
//         totalPrice: appTotalizers.total,
//         queryID,
//       });

//       // MoEngage AddToCart Event
//       if (orderFormItem && productDetail && selectedColor) {
//         const properties = new MoEProperties();

//         properties.addAttribute('seller', selectedSize.seller);
//         properties.addAttribute('priceIsInt', Number.isInteger(orderFormItem.price));
//         properties.addAttribute('referenceId', selectedSize.itemId);
//         properties.addAttribute('ean', selectedSize.ean);
//         properties.addAttribute('currency', 'BRL');
//         properties.addAttribute('skuId', selectedSize.itemId);
//         properties.addAttribute('quantity', orderFormItem.quantity + 1);
//         properties.addAttribute('productId', productDetail.productId);
//         properties.addAttribute('name', productDetail.productName);

//         console.log('Tracking MoEngage AddToCart event', properties);
//         ReactMoE.trackEvent('AddToCart', properties);
//         console.log('done');
//       }

//       //comment
//       setShowAnimationBag(true);
//       addTagsUponCartUpdate();
//       setDrawerIsOpen(false);
//     } catch (err) {
//       ExceptionProvider.captureException(err, "onAddProductToCart - ProductAddToCart.tsx", { orderFormId });
//       Alert.alert('Ocorreu um erro', err.message);
//       actions.CREATE_NEW_ORDER_FORM();
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     actions,
//     addTagsUponCartUpdate,
//     loading,
//     packageItems,
//     orderFormId,
//     selectedSize,
//     setDrawerIsOpen,
//     sizeIsSelected,
//     fvcReferenceId,
//     productDetail,
//     selectedColor,
//   ]);

//   const buttonAddCartActive = useMemo(() => {
//     if (fvcReferenceId) return true;

//     if (!selectedSize || !productDetail) return false;

//     if (selectedSize.disabled) return false;

//     if (productDetail?.properties.isAssinaturaSimples && !assinaturaSimples?.accepted) {
//       return false;
//     }

//     return true;
//   }, [assinaturaSimples, productDetail, selectedSize]);

//   return (
//     <View
//       style={isFixed && styles.fixedWrapper}
//     >
//       <ModalBag
//         isVisible={showAnimationBag}
//         onBackdropPress={() => setShowAnimationBag(false)}
//       />

//       <Button
//         height={70}
//         title={fvcReferenceId ? 'PERSONALIZE DO SEU JEITO' : 'ADICIONAR À SACOLA'}
//         variant="primarioEstreito"
//         buttonBackgroundColor={getString('pdp_button_add_bag')}
//         disabled={!buttonAddCartActive || loading}
//         onPress={onAddProductToCart}
//         inline
//         {...testProps('com.usereserva:id/button_add_to_bag')}
//       />
//       {showOnep5p && !addToBagButtonIsFixed && (<OneP5P comingFrom="PDP" />)}

//       {!!loading && (
//         <View style={styles.containerLoading}>
//           <LottieView source={loadingSpinner} style={{ width: 16, height: 16 }} autoPlay loop />
//         </View>
//       )}
//     </View>
//   );
// }

// export default ProductAddToCart;




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

      if (productDetail && selectedColor) {
        const moeProps = new MoEProperties();
        moeProps.addAttribute('seller', selectedSize.seller);
        moeProps.addAttribute('priceIsInt', Number.isInteger(existingItem?.price));  //boolean
        moeProps.addAttribute('referenceId', selectedSize.itemId);
        moeProps.addAttribute('ean', selectedSize.ean);
        moeProps.addAttribute('currency', 'BRL');
        moeProps.addAttribute('skuId', selectedSize.itemId);
        moeProps.addAttribute('quantity', newQuantity);
        moeProps.addAttribute('productId', productDetail.productId);
        moeProps.addAttribute('name', productDetail.productName);

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




