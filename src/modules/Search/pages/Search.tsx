import { QueryResult, useQuery, useLazyQuery } from '@apollo/client';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Box, Button, Divider, SearchBar, Typography } from 'reserva-ui';
import { bottom } from 'styled-system';
import { topSearches, TopSearches } from '../../../graphql/products/topSearches';
import { searchSuggestions, SearchSuggestionsVars } from '../../../graphql/products/searchSuggestions';
import { productSearch } from '../../../graphql/products/productSearch';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import useDebounce from '../../../shared/hooks/useDebounce';
import { Product } from '../../../store/ducks/product/types';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>;

export const SearchScreen: React.FC<Props> = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showResults, setShowResults] = React.useState(true);
  const [waiting, setWaiting] = React.useState(false);

  const [products, setProducts] = useState<Product[]>();
  const [suggestions, setSuggestions] = useState<SearchSuggestionsVars[]>([]);
  const [mostSearched, setMostSearched] = useState<TopSearches[]>([]);
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 500 });

  let pageSize = 12;
  const { data, loading, error, fetchMore, refetch }: QueryResult = useQuery(
    productSearch,
    {
      variables: {
        to: pageSize - 1,
      },
    }
  );

  const [getSuggestions, { data: suggestionsData, loading: suggestionsLoading }] = useLazyQuery(searchSuggestions, { fetchPolicy: "no-cache" });

  const { data: topSearchesData, loading: topSearchesLoading } = useQuery(topSearches);

  const { WithoutInternet } = useCheckConnection({})

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSuggestions({
        variables: {
          fullText: debouncedSearchTerm
        }
      })
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (suggestionsData) {
      setSuggestions(suggestionsData.searchSuggestions.searches);
    }
  }, [suggestionsData]);

  useEffect(() => {
    if (topSearchesData) {
      console.log('suggestions', topSearchesData.topSearches.searches)
      setMostSearched(topSearchesData.topSearches.searches)
    }
  }, [topSearchesData])

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
          value={searchTerm}
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

      {
        !showResults &&
        <Box
          marginX="nano"
          mt="micro"
        >
          <Box>
            <Typography
              fontFamily="nunitoBold"
              fontSize={13}
              color="neutroFrio2"
            >
              OS MAIS PROCURADOS
            </Typography>
          </Box>

          <Box flexDirection={"row"} flexWrap="wrap">
            {
              mostSearched.map((item) => (
                <Button onPress={() => {
                  setSearchTerm(item.term)
                }}>
                  <Box
                    bg={"divider"}
                    justifyContent="center"
                    px={"micro"}
                    height={26}
                    borderRadius={"pico"}
                    marginTop="micro"
                    mr="micro"
                  >
                    <Typography fontFamily={"nunitoRegular"} fontSize={13}>
                      {item.term}
                    </Typography>
                  </Box>
                </Button>
              ))}
          </Box>
        </Box>
      }
      {searchTerm.length > 0 &&
        !showResults &&
        <Box
          bg="white"
          marginX="nano"
          position="absolute"
          top={99}
          right={0}
          left={0}
          justifyContent="center"
        >
          {
            suggestions.map((suggestion) => (
              <>
                <Button
                  width="100%"
                  onPress={() => setSearchTerm(suggestion.term)}
                >
                  <Box
                    width="100%"
                    paddingX="micro"
                    minHeight={40}
                    justifyContent="center"
                  >
                    <Typography
                      fontFamily="nunitoRegular"
                      fontSize={12}
                      color="searchBarTextColor"
                    >
                      {suggestion.term}
                    </Typography>
                  </Box>
                </Button>
                <Divider variant="fullWidth" />
              </>
            ))}
        </Box>
      }
      {
        showResults && (

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
        )
      }
      {
        waiting &&
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
    </Box >
  );
};
