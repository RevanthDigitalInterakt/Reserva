import { QueryResult, useQuery } from '@apollo/client';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Box, SearchBar, Typography } from 'reserva-ui';
import { bottom } from 'styled-system';
import { productSearch } from '../../../graphql/products/productSearch';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { Product } from '../../../store/ducks/product/types';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>;

export const SearchScreen: React.FC<Props> = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showResults, setShowResults] = React.useState(true);
  const [waiting, setWaiting] = React.useState(false);

  const [products, setProducts] = useState<Product[]>();

  let pageSize = 12;
  const { data, loading, error, fetchMore, refetch }: QueryResult = useQuery(
    productSearch,
    {
      variables: {
        to: pageSize - 1,
      },
    }
  );
  const { WithoutInternet } = useCheckConnection({})
  useEffect(() => {
    if (!loading) {
      setProducts(data.productSearch.products);
    }
  }, [data]);

  useEffect(() => {
    setShowResults(false);
  }, []);

  const handleSearch = async (text: string) => {
    setWaiting(true)

    const { data, loading } = await refetch({
      fullText: text,
    });

    resetProductsArray();
    if (!loading) {
      setProducts(data.productSearch.products);
    }
    setWaiting(false)

    setShowResults(true);
  };

  const resetProductsArray = () => {
    setProducts([]);
  };

  const loadMoreProducts = async (offset: number, searchQuery?: string) => {
    let {
      data: {
        productSearch: { products: newProducts },
      },
      loading,
    } = await fetchMore({
      variables: {
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? pageSize * 2 - 1 : offset + (pageSize - 1),
      },
    });

    if (!loading) {
      setProducts(data.productSearch.products);
    }
  };

  return (
    <Box backgroundColor="white" flex={1}>
      <TopBarDefault loading={loading} />
      <WithoutInternet />
      <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
        <SearchBar
          onValueChange={(text) => {
            setSearchTerm(text);
          }}
          onClickIcon={() => {
            handleSearch(searchTerm);
          }}
          height={36}
          placeholder="Buscar"
        />
      </Box>

      {showResults && (

        products && products?.length > 0 ?
          <Animatable.View animation="fadeIn" style={{ marginBottom: 120 }}>
            <ListVerticalProducts
              products={products ? products : []}
              loadMoreProducts={(offset) => {
                loadMoreProducts(offset, searchTerm);
              }}
            />
          </Animatable.View>
          :
          <Box
            height="100%"
            justifyContent="center"
            alignItems="center"
            bg="white"
          >
            <Box mx="sm">
              <Typography
                textAlign="center"
                fontFamily="reservaSansRegular"
                fontSize={16}
              >
                Opss, infelizmente não encontramos nenhum resultado para a sua pesquisa.
              </Typography>
            </Box>
          </Box>
      )}
      {waiting &&
        <Box
          bg="white"
          opacity={0.5}
          position="absolute"
          right={0}
          left={0}
          top={110}
          bottom={0}
          zIndex={2}
        >
          <Box marginLeft="nano">
            <Typography>Carregando...</Typography>
          </Box>
        </Box>
      }
    </Box>
  );
};
