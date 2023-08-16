import React, { useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Box } from '@usereservaapp/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import type { RootStackParamList } from '../../routes/StackNavigator';
import ProductDetailWrapper from './components/ProductDetailWrapper';
import FormNewsletter from './components/FormNewsletter';
import ProductSLA from './components/ProductSLA';
import ProductAbout from './components/ProductAbout';
import ProductSummary from './components/ProductSummary';
import ProductAssinaturaSimples from './components/ProductAssinaturaSimples';
import ProductSelectors from './components/ProductSelectors';
import { ProductQuery, ProductResultActionEnum, useProductLazyQuery } from '../../base/graphql/generated';
import { getProductLoadType } from './utils/getProductLoadType';
import { useProductDetailStore } from '../../zustand/useProductDetail/useProductDetail';
import EventProvider from '../../utils/EventProvider';
import type { IProductDetailRouteParams } from '../../utils/createNavigateToProductParams';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import { ProductRecommendation } from '../../components/ProductRecommendation/ProductRecommendation';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import useAsyncStorageProvider from '../../hooks/useAsyncStorageProvider';
import { getProductCategories } from '../../utils/getProductCategories';
import DeepLinkPathModule from '../../NativeModules/DeepLinkPathModule';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { usePageLoadingStore } from '../../zustand/usePageLoadingStore/usePageLoadingStore';

type IProductDetailNew = StackScreenProps<RootStackParamList, 'ProductDetail'>;

function ProductDetail({ route, navigation }: IProductDetailNew) {
  const { getItem } = useAsyncStorageProvider();
  const { profile } = useAuthStore(['profile']);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { setProduct, resetProduct, productDetail } = useProductDetailStore([
    'setProduct',
    'resetProduct',
    'productDetail',
  ]);

  const [getProduct, { loading }] = useProductLazyQuery({
    fetchPolicy: getFetchPolicyPerKey('productDetail'),
    notifyOnNetworkStatusChange: true,
    context: { clientName: 'gateway' },
  });

  const { onFinishLoad } = usePageLoadingStore(['onFinishLoad']);

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

  const onInitialLoad = useCallback(async (params: IProductDetailRouteParams) => {
    try {
      const input = getProductLoadType(params);
      const { data, error } = await getProduct({ variables: { input } });

      if (error || !data?.product) {
        throw new Error(error?.message || 'Ocorreu um erro ao carregar o produto.');
      }

      const { product } = data;

      trackEventDitoAccessProduct(data);

      EventProvider.logEvent('product_view', {
        product_id: product.productId,
        product_category: 'product_group',
        product_price: product.priceRange?.listPrice?.lowPrice,
        product_currency: 'BRL',
      });

      if (product.action !== ProductResultActionEnum.ShowProduct) {
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
  }, [getProduct, navigation, setProduct, trackEventDitoAccessProduct]);

  useEffect(() => {
    resetProduct();

    onInitialLoad(route.params);
  }, [resetProduct, onInitialLoad, route.params]);

  useEffect(() => {
    if (!loading) {
      onFinishLoad();
    }
  }, [loading]);

  return (
    <ProductDetailWrapper loading={loading}>
      {!!productDetail && (
        <View>
          <ProductSummary />

          <ProductSelectors />

          <Box px="xxxs">
            <ProductAssinaturaSimples />

            <ProductSLA />

            <ProductAbout />

            <ProductRecommendation />

            <FormNewsletter />
          </Box>
        </View>
      )}
    </ProductDetailWrapper>
  );
}

export default ProductDetail;
