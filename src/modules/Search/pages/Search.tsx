import { QueryResult, useQuery, useLazyQuery } from '@apollo/client';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Box, Button, Divider, SearchBar, Typography, Image, ProductVerticalListCard, Icon } from 'reserva-ui';
import { configCollection, ConfigCollection } from '../../../store/ducks/HomePage/types';
import { topSearches, TopSearches } from '../../../graphql/products/topSearches';
import { searchSuggestions, SearchSuggestionsVars, searchSuggestionsAndProductSearch } from '../../../graphql/products/searchSuggestions';
import { productSearch } from '../../../graphql/products/productSearch';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import useDebounce from '../../../shared/hooks/useDebounce';
import { Product } from '../../../store/ducks/product/types';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';
import { News } from '../components/News';

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>;

export const SearchScreen: React.FC<Props> = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showResults, setShowResults] = React.useState(true);
  const [showAllProducts, setShowAllProducts] = React.useState(false);

  const [waiting, setWaiting] = React.useState(false);

  const [products, setProducts] = useState<Product[]>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>();
  const [suggestions, setSuggestions] = useState<SearchSuggestionsVars[]>([]);
  const [mostSearched, setMostSearched] = useState<TopSearches[]>([]);
  const [productNews, setProductNews] = useState<ConfigCollection[]>([]);

  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 400 });

  const { data: collectionData, loading: loadingCollection, } = useQuery(
    configCollection, {
    context: { clientName: 'contentful' },
  });

  let pageSize = 12;
  const { data, loading, error, fetchMore, refetch }: QueryResult = useQuery(
    productSearch,
    {
      variables: {
        to: pageSize - 1,
      },
    }
  );

  //DESTAQUES
  const { data: featuredData, loading: loadingFeatured, }: QueryResult = useQuery(
    productSearch,
    {
      variables: {
        hideUnavailableItems: true,
        selectedFacets: [
          {
            key: "productClusterIds",
            value: collectionData?.configCollection?.items[0].searchCollection
          }
        ],
        to: 7,
        simulationBehavior: "default",
        productOriginVtex: false
      },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache'
    }
  );

  const [getSuggestions, { data: suggestionsData, loading: suggestionsLoading }] = useLazyQuery(
    searchSuggestionsAndProductSearch,
    {
      fetchPolicy: "no-cache"
    }
  );
  const { data: topSearchesData, loading: topSearchesLoading } = useQuery(topSearches);

  const { WithoutInternet } = useCheckConnection({})

  useEffect(() => {
    if (debouncedSearchTerm) {
      setRelatedProducts([])
      handleDebouncedSearchTerm();
    }

  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (suggestionsData) {
      setSuggestions(suggestionsData.searchSuggestions.searches);
      setRelatedProducts(suggestionsData.productSearch.products);
    }

  }, [suggestionsData]);

  useEffect(() => {
    if (topSearchesData) {
      setMostSearched(topSearchesData.topSearches.searches)
    }
  }, [topSearchesData])

  useEffect(() => {
    if (collectionData) {
      setProductNews(collectionData?.configCollection?.items[0].searchMedia.imagesCollection.items)
    }
  }, [collectionData])

  useEffect(() => {
    if (!loading) {
      setProducts(data.productSearch.products);
    }
  }, [data]);

  useEffect(() => {
    if (!loadingFeatured) {
      setFeaturedProducts(featuredData.productSearch.products);
    }
  }, [featuredData]);

  useEffect(() => {
    setShowResults(false);
  }, []);

  const handleSearch = async (text: string) => {
    setWaiting(true)

    const { data, loading, } = await refetch({
      fullText: text,
      selectedFacets: []
    });

    resetProductsArray();
    if (!loading) {
      setProducts(data.productSearch.products);
    }
    setWaiting(false)

    setShowResults(true);
  };

  const handleDebouncedSearchTerm = () => {
    getSuggestions({
      variables: {
        fullText: debouncedSearchTerm
      }
    });
    setShowResults(false);
    setShowAllProducts(false);
  }

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
      <TopBarDefault loading={loading || topSearchesLoading || loadingFeatured} />
      <WithoutInternet />
      <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
        <SearchBar
          value={searchTerm}
          onValueChange={(text) => {
            setSearchTerm(text);
          }}
          onClickIcon={() => {
            handleDebouncedSearchTerm()
          }}
          height={36}
          placeholder="Buscar"
        />
      </Box>
      {!showAllProducts ?
        <ScrollView>
          {
            !showResults &&
            searchTerm.length === 0 &&
            <>
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

              <News
                data={productNews}
                onPress={(item) => console.log('item', item)}
              />
              {featuredProducts && featuredProducts?.length > 0 &&
                <>
                  <Box mt="xs" marginX="nano" mb="micro">
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize={13}
                      color="neutroFrio2"
                    >
                      DESTAQUES
                    </Typography>
                  </Box>

                  <Animatable.View animation="fadeIn" style={{ marginBottom: 120 }}>
                    <ListVerticalProducts
                      products={featuredProducts ? featuredProducts : []}
                      loadMoreProducts={(offset) => {
                        loadMoreProducts(offset, '');
                      }}
                    />
                  </Animatable.View>
                </>
              }
            </>
          }

          {
            suggestions?.length > 0 &&
            searchTerm.length > 0 &&
            !showResults &&
            <>
              <Box
                bg="white"
                marginX="nano"
                justifyContent="center"
              >
                {
                  suggestions.map((suggestion) => {
                    return (
                      <>
                        <Button
                          width="100%"
                          onPress={() => {
                            setSearchTerm(suggestion.term)
                          }}
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
                    )
                  })}
              </Box>
              {relatedProducts && relatedProducts.length > 0 ?
                <Box mt="xs" marginX="nano" mb="micro">
                  <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="xxxs">
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize={13}
                      color="neutroFrio2"
                    >
                      PRODUTOS RELACIONADOS
                    </Typography>
                    <Button
                      onPress={() => {
                        setShowAllProducts(true)
                        handleSearch(searchTerm)
                      }}
                      bg="white"
                      borderRadius="pico"
                      borderWidth={1}
                      borderColor="divider"
                      px="nano"
                      py="quarck"
                    >
                      <Typography
                        fontFamily="reservaSansMedium"
                        fontSize={14}
                      >
                        Ver todos
                      </Typography>
                    </Button>
                  </Box>
                  <Animatable.View animation="fadeIn" style={{ marginBottom: 120 }}>
                    <ListVerticalProducts
                      horizontal
                      products={relatedProducts ? relatedProducts : []}
                      loadMoreProducts={(offset) => {
                        loadMoreProducts(offset, '');
                      }}
                    />
                  </Animatable.View>
                </Box>
                : null
              }
            </>
          }

        </ScrollView>
        :
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
    </Box >
  );
};
