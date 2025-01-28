import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';

import { useProductRecommendationsLazyQuery } from '../../../base/graphql/generated';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { Divider } from '../../../components/Divider/Divider';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';
import { ListHorizontalProducts } from '../../../modules/Checkout/components/ListHorizontalProducts';
import EventProvider from '../../../utils/EventProvider';
import { defaultBrand } from '../../../utils/defaultWBrand';
import { getBrandByUrl } from '../../../utils/getBrandByURL';
import { useApolloFetchPolicyStore } from '../../../zustand/useApolloFetchPolicyStore';
import useRecommendation from '../../../zustand/useRecommendation/useRecommendation';

export function Recommendation() {
  const {
    products, showSection, setProducts, setShowSection,
  } = useRecommendation();

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
        item_brand: defaultBrand.picapau,
      });
      EventProvider.logEvent('view_item_list', {
        items: newItems,
        item_brand: getBrandByUrl(products),
      });
    } catch (error) {
      ExceptionProvider.captureException(error, "useEffect - Recommendation", {products: (JSON.stringify(products) || "")});
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
          <Box
            flexDirection="row"
            alignItems="flex-start"
            marginY="xxs"
            marginBottom="xxs"
          >
            <Box marginRight="micro">
              <IconLegacy name="Handbag" size={20} />
            </Box>

            <Box flex={1}>
              <Typography variant="subtituloSessoes">
                Outros produtos que você pode gostar
              </Typography>
            </Box>
            <Box marginRight="md">
              <IconLegacy
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
          </Box>
        </Button>
      </Box>
      {!!showSection && (
        <>
          <Box paddingX="xxxs">
            <Divider marginBottom="xs" variant="fullWidth" />
          </Box>
          <Box mt="quarck" paddingX="micro">
            {products && products?.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <ListHorizontalProducts
                  horizontal
                  products={products}
                />
              </View>
            )}
          </Box>
        </>
      )}
    </>
  );
}
