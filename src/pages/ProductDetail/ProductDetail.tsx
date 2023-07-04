import React, { useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Box } from '@usereservaapp/reserva-ui';
import * as Sentry from '@sentry/react-native';
import type { RootStackParamList } from '../../routes/StackNavigator';
import ProductDetailWrapper from './components/ProductDetailWrapper';
import FormNewsletter from './components/FormNewsletter';
import ProductSLA from './components/ProductSLA';
import ProductAbout from './components/ProductAbout';
import ProductSummary from './components/ProductSummary';
import ProductAssinaturaSimples from './components/ProductAssinaturaSimples';
import ProductSelectors from './components/ProductSelectors';
import { ProductQuery, useProductLazyQuery } from '../../base/graphql/generated';
import { getProductLoadType } from './utils/getProductLoadType';
import { useProductDetailStore } from '../../zustand/useProductDetail/useProductDetail';
import EventProvider from '../../utils/EventProvider';
import type { IProductDetailRouteParams } from '../../utils/createNavigateToProductParams';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import { ProductRecommendation } from '../../components/ProductRecommendation/ProductRecommendation';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import { useProductCatalogStore } from '../../zustand/useProductCatalog/useProductCatalog';

type IProductDetailNew = StackScreenProps<RootStackParamList, 'ProductDetail'>;

function ProductDetail({ route, navigation }: IProductDetailNew) {
  const { profile } = useAuthStore(['profile']);
  const { facets } = useProductCatalogStore(['facets']);
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

  const trackEventDitoAccessProduct = useCallback(({ product }: ProductQuery) => {
    EventProvider.sendTrackEvent('acessou-produto', {
      id: profile?.document || '',
      action: 'acessou-produto',
      data: {
        id_produto: product.productId,
        cor: '',
        tamanho: product.initialSize?.size,
        nome_categoria: facets,
        nome_produto: product.productName,
        marca: '',
        origem: 'app',
      },
    });
  }, [facets, profile?.document]);

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

      setProduct(product, params);
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.setExtra('params', params);
        Sentry.captureException(err);
      });

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
