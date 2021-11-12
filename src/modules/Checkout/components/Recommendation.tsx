import React, { useEffect, useState } from 'react';

import { QueryResult, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import { createAnimatableComponent } from 'react-native-animatable';
import { Box, Typography, Button, Icon, Divider } from 'reserva-ui';

import { productSearch } from '../../../graphql/products/productSearch';
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';

export interface RecommendationProps {
  sumPriceShipping: number;
  loadingRecommendation: boolean;
}

export const Recommendation = ({ sumPriceShipping }: RecommendationProps) => {
  const [sumPrice, setSumPrice] = useState(0);
  const [skip, setSkip] = useState(false);
  const pageSize = 6;
  const [showMore, setShowMore] = useState(true);
  const [products, setProducts] = useState<any>([]);
  const [arrayProducts, setArrayProducts] = useState<any>([]);
  const [priceRange, setPriceRange] = useState('');
  const PRICE_SHIPPING_FREE = 299.0;

  const BoxAnimated = createAnimatableComponent(Box);

  const getPriceRange = async () => {
    const totalFreeShipping = PRICE_SHIPPING_FREE - sumPriceShipping;
    if (sumPriceShipping <= PRICE_SHIPPING_FREE) {
      const valuePrice = `${totalFreeShipping.toString()} TO ${PRICE_SHIPPING_FREE}`;
      setPriceRange(valuePrice);
    } else {
      setPriceRange('299 TO 1999');
    }
  };

  const { fetchMore, refetch }: QueryResult = useQuery(productSearch, {
    skip,
    variables: {
      skusFilter: 'ALL_AVAILABLE',
      hideUnavailableItems: true,
      selectedFacets: [{ key: 'priceRange', value: priceRange }],
      orderBy: 'OrderByTopSaleDESC',
      to: pageSize - 1,
      simulationBehavior: 'default',
      productOriginVtex: false,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const loadMoreProducts = async (offset: number, searchQuery?: string) => {
    const {
      data: {
        productSearch: { products: newProducts },
      },
      loading: loadingProducts,
    } = await fetchMore({
      variables: {
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? pageSize * 2 - 1 : offset + (pageSize - 1),
      },
    });

    /*  if (!loadingProducts) {
      setProducts(data.productSearch.products);
    } */
  };

  const saveItems = async (items: any) => {
    const newArray = items.splice(0, 5);

    if (newArray.length === 1) {
      setArrayProducts({ ...newArray });

      const array = arrayProducts;
      array.push(...newArray);

      setProducts(array);
    }
  };

  const handleSearch = async (text: string) => {
    const { data: dataProd, loading: loadingProd } = await refetch({
      fullText: text,
      selectedFacets: [{ key: 'priceRange', value: `${priceRange}` }],
    });

    if (!loadingProd) {
      await saveItems(dataProd.productSearch.products);
    }
  };

  useEffect(() => {
    getPriceRange();
  }, [sumPriceShipping]);

  useEffect(() => {
    if (sumPriceShipping > 0) setSumPrice(sumPriceShipping);

    const arrayCategories = [
      'camiseta adulto',
      'cueca',
      'bermuda adulto',
      'calça',
      'cinto',
      'jaqueta',
    ];

    arrayCategories.forEach((element) => {
      handleSearch(element);
    });
  }, []);

  return (
    <>
      <Box paddingX="xxxs">
        <Divider marginTop="xs" variant="fullWidth" />
      </Box>

      <Box paddingLeft="micro">
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
                <ListVerticalProducts
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
