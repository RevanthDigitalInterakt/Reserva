import React, { useCallback, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { createAnimatableComponent } from 'react-native-animatable';
import { useProductRecommendationsQuery } from '../../base/graphql/generated';
import { ListHorizontalProducts } from './ListHorizontalProducts';
import EventProvider from '../../utils/EventProvider';
import useRecommendation from '../../zustand/useRecommendation/useRecommendation';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { Typography } from '../Typography/Typography';
import { Divider } from '../Divider/Divider';

interface IProductRecommendation {
  handleScrollToTheTop?: () => void;
}

export function ProductRecommendation({ handleScrollToTheTop }: IProductRecommendation) {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const BoxAnimated = createAnimatableComponent(Box);

  const {
    products,
    showSection,
    setProducts,
    setShowSection,
  } = useRecommendation();

  const { data } = useProductRecommendationsQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('productRecommendations'),
  });

  const doTrack = useCallback(() => {
    try {
      if (!products?.length) return;

      const newItems = products.map((item) => ({
        price: item?.priceRange?.sellingPrice?.lowPrice,
        item_id: item?.productId,
        item_name: item?.productName,
        item_category: 'product_group',
        quantity: 0,
        item_variant: '',
      }));

      EventProvider.logEvent('view_item_list', { items: newItems });
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [products]);

  const onToggle = useCallback((show: boolean) => {
    setShowSection(show);
    EventProvider.logEvent('product_view_recommended', { show: show ? 1 : 0 });
  }, [setShowSection]);

  useEffect(() => {
    if (products.length) doTrack();
  }, [products, doTrack]);

  useEffect(() => {
    if (data?.productRecommendations?.length) {
      setProducts(data.productRecommendations);
    }
  }, [data, setProducts]);

  return (
    <Box paddingLeft="quarck">
      <Button
        testID="com.usereserva:id/show_more_button"
        onPress={() => onToggle(!showSection)}
        hitSlop={{ left: 50, top: 15, bottom: 15 }}
        flexDirection="row"
      >
        <BoxAnimated flexDirection="row" alignItems="flex-start">
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
              // @ts-ignore
              style={
                showSection
                  ? { transform: [{ rotate: '-180deg' }, { translateY: 4 }] }
                  : { transform: [{ translateY: 8 }] }
              }
              color="preto"
              size="20"
            />
          </Box>
        </BoxAnimated>
      </Button>

      {!!(showSection && data?.productRecommendations?.length) && (
        <>
          <Box my="xxxs" />

          <Box mt="quarck">
            <Animatable.View animation="fadeIn" style={{ marginBottom: 20 }}>
              <ListHorizontalProducts
                horizontal
                products={products}
                handleScrollToTheTop={handleScrollToTheTop}
              />
            </Animatable.View>
          </Box>
        </>
      )}

      <Divider variant="fullWidth" my="xs" />
    </Box>
  );
}
