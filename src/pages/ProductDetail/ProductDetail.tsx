import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Alert, View } from 'react-native';
import {
  type ProductQuery,
  ProductResultActionEnum,
  TrackPageTypeEnum,
  useProductLazyQuery,
  useInfoCashbackPdpCollectionQuery,
  TrackEventTypeEnum,
  TrackEventNameEnum,
} from '../../base/graphql/generated';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { Box } from '../../components/Box/Box';
import useAsyncStorageProvider from '../../hooks/useAsyncStorageProvider';
import type { RootStackParamList } from '../../routes/StackNavigator';
import EventProvider from '../../utils/EventProvider';
import type { IProductDetailRouteParams } from '../../utils/createNavigateToProductParams';
import { getProductCategories } from '../../utils/getProductCategories';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import { GiftCardAddToCart } from './components/GiftCardAddToCart';
import { usePageLoadingStore } from '../../zustand/usePageLoadingStore/usePageLoadingStore';
import { useProductDetailStore } from '../../zustand/useProductDetail/useProductDetail';
import { Recommendation } from '../Bag/components/Recommendation';
import FormNewsletter from './components/FormNewsletter';
import ProductAbout from './components/ProductAbout';
import ProductAssinaturaSimples from './components/ProductAssinaturaSimples';
import ProductDetailWrapper from './components/ProductDetailWrapper';
import ProductSLA from './components/ProductSLA';
import ProductSelectors from './components/ProductSelectors';
import ProductSummary from './components/ProductSummary';
import { getProductLoadType } from './utils/getProductLoadType';
import DeepLinkPathModule from '../../NativeModules/DeepLinkPathModule';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { trackPageViewStore } from '../../zustand/useTrackPageViewStore/useTrackPageViewStore';
import KitLookSummary from './components/ProductKitLookSummary/KitLookSummary';
import ProductAddToCart from './components/ProductAddToCart';
import { Drawer } from '../../components/Drawer';
import { DrawerSelectors } from './components/DrawerSelectors';
import { trackClickStore, type IData } from '../../zustand/useTrackClickStore/useTrackClickStore';
import CashbackInfo from '../../components/CashbackInfo';
import { ProductPayment } from './components/ProductPayment';
import { Divider } from '../../components/Divider/Divider';
import { useTrackClickAlgoliaStore } from '../../zustand/useTrackAlgoliaStore/useTrackAlgoliaStore';
import ReturnPolicy from './components/ReturnPolicy/ReturnPolicy';
import UxCam from '../../utils/UxCam';

type IProductDetailNew = StackScreenProps<RootStackParamList, 'ProductDetail'>;

function ProductDetail({ route, navigation }: IProductDetailNew) {
  const { getBoolean } = useRemoteConfig();
  const { getItem } = useAsyncStorageProvider();
  const { profile } = useAuthStore(['profile']);
  const { onTrack } = useTrackClickAlgoliaStore(['onTrack']);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const {
    setProduct, resetProduct, productDetail, drawerIsOpen,
  } = useProductDetailStore([
    'setProduct',
    'resetProduct',
    'productDetail',
    'drawerIsOpen',
  ]);

  const isGiftCard = productDetail?.action === ProductResultActionEnum.ShowGiftCard;

  const isKitLook = productDetail?.action === ProductResultActionEnum.ShowKit;

  const showReturnPolicy = useMemo(() => getBoolean('show_return_policy'), []);

  const [getProduct, { loading }] = useProductLazyQuery({
    fetchPolicy: getFetchPolicyPerKey('productDetail'),
    notifyOnNetworkStatusChange: true,
    context: { clientName: 'gateway' },
  });

  const { data } = useInfoCashbackPdpCollectionQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('InfoCashbackPdpCollection'),
  });
  const isCashbackValid = data && data.infoCashbackPdpCollection && data.infoCashbackPdpCollection.infoCashback && !data.infoCashbackPdpCollection.infoCashback.includes('0%');

  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const trackEventDitoAccessProduct = useCallback(async ({ product }: ProductQuery) => {
    try {
      const id = profile?.email
        ? await getItem('@Dito:userRef')
        : await AsyncStorage.getItem('@Dito:anonymousID');

      EventProvider.sendTrackEvent('acessou-produto', {
        id,
        action: 'acessou-produto',
        data: {
          id_produto: product.productId,
          cor: product.initialColor?.colorName || '',
          tamanho: product.initialSize?.size || '',
          nome_categoria: getProductCategories(product.categoryTree),
          nome_produto: product.productName,
          marca: product.categoryTree[0],
          origem: 'app',
        },
      });
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, [getItem, profile?.email]);
  const isOnlyFvcProduct = productDetail?.categoryTree.includes('Faça Você');
  const onInitialLoad = useCallback(async (params: IProductDetailRouteParams) => {
    try {
      const input = getProductLoadType(params);
      const { data, error } = await getProduct({ variables: { input } });

      if (error || !data?.product) {
        throw new Error(error?.message || 'Ocorreu um erro ao carregar o produto.');
      }

      const { product } = data;
      trackEventDitoAccessProduct(data);

      const existsFvcProductReference = !!product?.fvcProductReference;
      if (existsFvcProductReference) {
        EventProvider.logEvent('pdp_open_product_with_ref_fvc', {});
      }
      if (isOnlyFvcProduct) {
        navigation.navigate('FacaVc', { type: product.productId });
      }

      EventProvider.logScreenViewEvent(`/pdp/${product.productName?.replace(/ /g, '-').toLowerCase()}`);

      const newData: IData = {
        identifier: product.identifier || '',
        productId: product.productId,
      };

      const skuItem = params.skuId || '';

      onTrack({
        typeEvent: TrackEventTypeEnum.View,
        nameEvent: TrackEventNameEnum.ViewedItems,
        sku: [product.initialSize?.ean || skuItem],
      });

      trackClickStore.getState()
        .onTrackClick(newData, product.identifier || '', TrackPageTypeEnum.Product);
      trackPageViewStore.getState().onTrackPageView(product.identifier || '', TrackPageTypeEnum.Product);

      EventProvider.logEvent('product_view', {
        product_id: product.productId,
        product_category: 'product_group',
        product_price: product.priceRange?.listPrice?.lowPrice,
        product_currency: 'BRL',
      });

      UxCam.tagScreen('Product Detail Screen');
      UxCam.logEvent('product detail view', {
        product_id: product.productId,
        product_category: getProductCategories(product.categoryTree),
        product_price: product.priceRange?.listPrice?.lowPrice,
        product_currency: 'BRL',
      });

      const showKitlook = getBoolean('show_kitlook');

      const pdpShowGiftCard = getBoolean('pdp_show_gift_card');
      if (
        (product.action !== ProductResultActionEnum.ShowProduct
          && product.action !== ProductResultActionEnum.ShowGiftCard
          && (!isKitLook && !showKitlook)
        )
        || (product.action === ProductResultActionEnum.ShowGiftCard && !pdpShowGiftCard)
      ) {
        await DeepLinkPathModule.openUrlInBrowser({
          closeCurrentAppInstance: false,
          url: product.share.url,
        });

        navigation.goBack();

        return;
      }

      setProduct(product, params);
    } catch (err) {
      ExceptionProvider.captureException(err, { params });

      Alert.alert(
        'Ops!',
        err.message || 'Ocorreu um erro ao carregar o produto.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    }
  }, [getProduct, navigation, setProduct, trackEventDitoAccessProduct, route]);

  useEffect(() => {
    resetProduct();

    onInitialLoad(route.params);
  }, [resetProduct, onInitialLoad, route.params]);

  useEffect(() => {
    if (!loading && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [loading, onFinishLoad, startLoadingTime]);

  return (
    <>
      <ProductDetailWrapper loading={loading}>
        {!!productDetail && !isKitLook && (
          <View>
            <ProductSummary />
            {isCashbackValid && (
              <CashbackInfo data={data} />
            )}

            <ProductSelectors />

            <Box px="xxxs">
              <ProductAssinaturaSimples />

              <ProductSLA />

              <ProductAbout />

              {productDetail?.paymentSystemGroupName
                && productDetail?.paymentSystemGroupName.length > 0 && (
                  <>
                    <Divider variant="fullWidth" my="xs" />
                    <ProductPayment />
                  </>
              )}
              {showReturnPolicy && (<ReturnPolicy />)}
            </Box>

            <Recommendation />

            <Box px="xxxs">
              <FormNewsletter />
            </Box>

          </View>
        )}
        {isKitLook && <KitLookSummary />}
      </ProductDetailWrapper>
      {!isGiftCard && (
        <Drawer isOpen={drawerIsOpen} snapPoints={['15%', '50%']}>
          <DrawerSelectors />
        </Drawer>
      )}
      {isGiftCard ? <GiftCardAddToCart /> : null}
      {!isGiftCard && !drawerIsOpen && getBoolean('add_to_bag_button_is_fixed') && !isKitLook
        && !loading
        && (
        <ProductAddToCart
          isFixed
          fvcReferenceId={productDetail?.categoryTree.includes('Faça Você') ? productDetail?.productId || undefined : undefined}
        />
        )}
    </>
  );
}

export default ProductDetail;
