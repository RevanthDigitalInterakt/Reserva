import {
  Box, Button, Divider, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import React, { useCallback, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { createAnimatableComponent } from 'react-native-animatable';
import { ListHorizontalProducts } from './ListHorizontalProducts';
import EventProvider from '../../../utils/EventProvider';
import { getBrandByUrl } from '../../../utils/getBrandByURL';
import useRecommendation from '../../../zustand/useRecommendation/useRecommendation';
import { useProductRecommendationsLazyQuery } from '../../../base/graphql/generated';
import { defaultBrand } from '../../../utils/defaultWBrand';
import { useApolloFetchPolicyStore } from '../../../zustand/useApolloFetchPolicyStore';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';

export function Recommendation() {
  const {
    products, showSection, setProducts, setShowSection,
  } = useRecommendation();

  const BoxAnimated = createAnimatableComponent(Box);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const [getProductRecommendation] = useProductRecommendationsLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('productRecommendations'),
  });

  const onToggleSection = useCallback(() => (
    setShowSection(!showSection)
  ), [setShowSection, showSection]);

  useEffect(() => {
    getProductRecommendation().then(({ data }) => {
      if (data) {
        setProducts(data?.productRecommendations);
      }
    });
  }, [getProductRecommendation, setProducts]);

  useEffect(() => {
    if (!products || !products?.length) return;
    if (!EventProvider) return;
    try {
      const newItems = products.map((item) => ({
        price: item?.priceRange?.sellingPrice?.lowPrice,
        item_id: item?.productId,
        item_name: item?.productName,
        item_category: Object.values(item?.categoryTree?.map((i) => (i.href))).join('|'),
      }));
      EventProvider.logEvent('page_view', {
        wbrand: defaultBrand.picapau,
      });
      EventProvider.logEvent('view_item_list', {
        items: newItems,
        wbrand: getBrandByUrl(products),
      });
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, [products]);

  return (
    <>
      <Box paddingX="xxxs">
        <Divider marginTop="xs" variant="fullWidth" />
      </Box>
      <Box testID="com.usereserva:id/products_recomendation_list" paddingLeft="micro">
        <Button
          onPress={onToggleSection}
          hitSlop={{ left: 50, top: 15, bottom: 15 }}
          flexDirection="row"
        >
          <BoxAnimated
            flexDirection="row"
            alignItems="flex-start"
            marginY="xxs"
            marginBottom="xxs"
          >
            <Box marginRight="micro">
              <Icon name="Handbag" size={20} />
            </Box>

            <Box flex={1}>
              <Typography variant="subtituloSessoes">
                Outros produtos que você pode gostar
              </Typography>
            </Box>
            <Box marginRight="md">
              <Icon
                name="ArrowDown"
                color="preto"
                size="20"
                style={
                  showSection
                    ? { transform: [{ rotate: '-180deg' }, { translateY: 4 }] }
                    : { transform: [{ translateY: 8 }] }
                }
              />
            </Box>
          </BoxAnimated>
        </Button>
      </Box>
      {!!showSection && (
        <>
          <Box paddingX="xxxs">
            <Divider marginBottom="xs" variant="fullWidth" />
          </Box>
          <Box mt="quarck" paddingX="micro">
            {products && products?.length > 0 && (
              <Animatable.View animation="fadeIn" style={{ marginBottom: 20 }}>
                <ListHorizontalProducts
                  horizontal
                  products={products}
                />
              </Animatable.View>
            )}
          </Box>
        </>
      )}
    </>
  );
}
