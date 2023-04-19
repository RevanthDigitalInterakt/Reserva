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

export const Recommendation = () => {
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
        item_category: 'product_group',
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
      <Box paddingX="xxxs">
        <Divider marginTop="xs" variant="fullWidth" />
      </Box>

      <Box testID="com.usereserva:id/products_recomendation_list" paddingLeft="micro">
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
      {!!showMore && (
        <>
          <Box paddingX="xxxs">
            <Divider marginBottom="xs" variant="fullWidth" />
          </Box>
          <Box mt="quarck" paddingX="micro">
            {products && products?.length > 0 && (
              <Animatable.View animation="fadeIn" style={{ marginBottom: 20 }}>
                <ListHorizontalProducts
                  horizontal
                  products={products || []}
                  loadMoreProducts={(offset) => {
                    loadMoreProducts(offset, '');
                  }}
                />
              </Animatable.View>
            )}
          </Box>
        </>
      )}
    </>
  );
};
