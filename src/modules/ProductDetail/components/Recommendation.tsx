import { useLazyQuery } from '@apollo/client';
import {
  Box, Button, Divider, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { createAnimatableComponent } from 'react-native-animatable';
import { productSearch } from '../../../graphql/products/productSearch';
import { ListHorizontalProducts } from './ListHorizontalProducts';
import EventProvider from '../../../utils/EventProvider';

interface RecommendationProps {
  handleScrollToTheTop?: () => void;
}

export const Recommendation = ({
  handleScrollToTheTop,
}: RecommendationProps) => {
  const [skip, setSkip] = useState(false);
  const pageSize = 36;
  const [showMore, setShowMore] = useState(true);
  const [products, setProducts] = useState<any>([]);

  const BoxAnimated = createAnimatableComponent(Box);

  const [getProductData] = useLazyQuery(productSearch, {
    // skip,
    variables: {
      skusFilter: 'ALL_AVAILABLE',
      hideUnavailableItems: true,
      orderBy: 'OrderByTopSaleDESC',
      to: pageSize - 1,
      simulationBehavior: 'default',
      productOriginVtex: false,
      salesChannel: '4',
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const saveItems = async (items: any) => {
    const arrayProductsId = items.map((elem) => elem.productId);

    const arrayWithoutDuplicates = items.filter((element, index) => index === arrayProductsId.indexOf(element.productId));

    setProducts(arrayWithoutDuplicates.slice(0, 6));
  };

  useEffect(() => {
    const handleSearch = async () => {
      const { data, loading } = await getProductData();

      if (!loading) {
        await saveItems(data.productSearch.products);
      }
    };

    handleSearch();
  }, []);

  useEffect(() => {
    if (!products || !products?.length) return;
    if (!EventProvider) return;

    try {
      const newItems = products.map((item) => ({
        price: item?.priceRange?.sellingPrice?.lowPrice,
        item_id: item?.productId,
        item_name: item?.productName,
        item_category: Object.values(item?.categoryTree.map((i) => (i.href))).join('|'),
      }));
      EventProvider.logEvent('view_item_list', {
        items: newItems,
      });
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [products, EventProvider]);

  return (
    <>
      <Box>
        <Divider marginTop="xs" variant="fullWidth" />
      </Box>

      <Box paddingLeft="quarck" marginTop="xxxs" marginBottom="xxxs">
        <Button
          onPress={() => setShowMore(!showMore)}
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
                name={showMore ? 'ArrowDown' : 'ArrowDown'}
                style={
                  showMore
                    ? { transform: [{ rotate: '-180deg' }, { translateY: 4 }] }
                    : { transform: [{ translateY: 8 }] }
                }
                color="preto"
                size={showMore ? '20' : '20'}
              />
            </Box>
          </BoxAnimated>
        </Button>
      </Box>
      {showMore ? (
        <>
          <Box>
            <Divider marginBottom="xs" variant="fullWidth" />
          </Box>
          <Box mt="quarck">
            {products && products?.length > 0 && (
              <Animatable.View animation="fadeIn" style={{ marginBottom: 20 }}>
                <ListHorizontalProducts
                  horizontal
                  products={products || []}
                  handleScrollToTheTop={handleScrollToTheTop}
                />
              </Animatable.View>
            )}
          </Box>
          <Box>
            <Divider marginBottom="xs" variant="fullWidth" />
          </Box>
        </>
      ) : (
        <Box>
          <Divider marginBottom="xs" variant="fullWidth" />
        </Box>
      )}
    </>
  );
};
