import React, { useEffect, useState } from 'react';

import { QueryResult, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import { createAnimatableComponent } from 'react-native-animatable';
import { Box, Typography, Button, Icon, Divider } from '@danilomsou/reserva-ui';

import { productSearch } from '../../../graphql/products/productSearch';
import { ListHorizontalProducts } from './ListHorizontalProducts'

export const Recommendation = () => {
  const [skip, setSkip] = useState(false);
  const pageSize = 6;
  const [showMore, setShowMore] = useState(true);
  const [products, setProducts] = useState<any>([]);
  const [arrayProducts, setArrayProducts] = useState<any>([]);

  const BoxAnimated = createAnimatableComponent(Box);

  const { fetchMore, refetch }: QueryResult = useQuery(productSearch, {
    skip,
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
    const newArray = [items[0]];

    if (newArray.length === 1) {
      setArrayProducts({ ...newArray });

      const array = arrayProducts;
      array.push(...newArray);

      const arrayProductsId = array.map(elem => elem.productId)

      const arrayWithoutDuplicates = array.filter((element, index) => {
          return index === arrayProductsId.indexOf(element.productId);
      });

      setProducts(arrayWithoutDuplicates);
    }
  };

  const handleSearch = async (text: string) => {
    const { data: dataProd, loading: loadingProd } = await refetch({
      fullText: text,
    });

    if (!loadingProd) {
      console.log(text)

      await saveItems(dataProd.productSearch.products);
    }
  };

  useEffect(() => {
    const arrayCategories = [
      'camiseta adulto',
      'cueca',
      'bermuda adulto',
      'calça',
      'cinto',
      'jaqueta',
    ];

    arrayCategories.forEach(async (element) => {
      await handleSearch(element);
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
