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
import { useProductLazyQuery } from '../../base/graphql/generated';
import { getProductLoadType } from './utils/getProductLoadType';
import { useProductDetailStore } from '../../zustand/useProductDetail/useProductDetail';
import EventProvider from '../../utils/EventProvider';
import type { IProductDetailRouteParams } from '../../utils/createNavigateToProductParams';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import { ProductRecommendation } from '../../components/ProductRecommendation/ProductRecommendation';

type IProductDetailNew = StackScreenProps<RootStackParamList, 'ProductDetail'>;

function ProductDetail({ route, navigation }: IProductDetailNew) {
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

  const onInitialLoad = useCallback(async (params: IProductDetailRouteParams) => {
    try {
      const input = getProductLoadType(params);
      const { data, error } = await getProduct({ variables: { input } });

      if (error || !data?.product) {
        throw new Error(error?.message || 'Ocorreu um erro ao carregar o produto.');
      }

      const { product } = data;

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
  }, [getProduct, navigation, setProduct]);

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
