import * as React from 'react';
import { useEffect, useState } from 'react';

import { QueryResult, useQuery, useLazyQuery } from '@apollo/client';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { paraiso } from 'base16';
import { ScrollView, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import appsFlyer from 'react-native-appsflyer';
import {
  Box,
  Button,
  Divider,
  SearchBar,
  Typography,
  Image,
  ProductVerticalListCard,
  Icon,
} from 'reserva-ui';

import { images } from '../../../assets';
import {
  configCollection,
  ConfigCollection,
} from '../../../graphql/homePage/HomeQuery';
import { productSearch } from '../../../graphql/products/productSearch';
import {
  searchSuggestions,
  SearchSuggestionsVars,
  searchSuggestionsAndProductSearch,
} from '../../../graphql/products/searchSuggestions';
import {
  topSearches,
  TopSearches,
} from '../../../graphql/products/topSearches';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import useDebounce from '../../../shared/hooks/useDebounce';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';
import { News } from '../components/News';

const deviceHeight = Dimensions.get('window').height;

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>;

export const SearchScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showResults, setShowResults] = React.useState(true);
  const [showAllProducts, setShowAllProducts] = React.useState(false);

  const [waiting, setWaiting] = React.useState(false);

  const [loadingRefetch, setLoadingRefetch] = useState(false);
  const [products, setProducts] = useState<any[]>();
  const [relatedProducts, setRelatedProducts] = useState<any[]>();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>();
  const [suggestions, setSuggestions] = useState<SearchSuggestionsVars[]>([]);
  const [mostSearched, setMostSearched] = useState<TopSearches[]>([]);
  const [productNews, setProductNews] = useState<ConfigCollection[]>([]);
  const [suggestionsFound, setSuggestionsFound] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState(false);

  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 400 });

  const { data: collectionData, loading: loadingCollection } = useQuery(
    configCollection,
    {
      context: { clientName: 'contentful' },
    }
  );

  const pageSize = 12;
  const { data, loading, error, fetchMore, refetch }: QueryResult = useQuery(
    productSearch,
    {
      variables: {
        to: pageSize - 1,
      },
    }
  );

  // DESTAQUES
  const { data: featuredData, loading: loadingFeatured }: QueryResult =
    useQuery(productSearch, {
      variables: {
        hideUnavailableItems: true,
        selectedFacets: [
          {
            key: 'productClusterIds',
            value: collectionData?.configCollection?.items[0].searchCollection,
          },
        ],
        to: 7,
        simulationBehavior: 'default',
        productOriginVtex: false,
      },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
    });

  const [
    getSuggestions,
    { data: suggestionsData, loading: suggestionsLoading },
  ] = useLazyQuery(searchSuggestionsAndProductSearch, {
    fetchPolicy: 'no-cache',
  });
  const { data: topSearchesData, loading: topSearchesLoading } =
    useQuery(topSearches);

  const { WithoutInternet } = useCheckConnection({});

  useEffect(() => {
    if (!selectedTerm && debouncedSearchTerm) {
      setRelatedProducts([]);
      handleDebouncedSearchTerm();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (suggestionsData) {
      setSuggestions(suggestionsData.searchSuggestions.searches);
      setRelatedProducts(suggestionsData.productSearch.products);

      if (suggestionsData?.searchSuggestions?.searches.length > 0) {
        setSuggestionsFound(true);
      } else {
        setSuggestionsFound(false);
      }
    }
  }, [suggestionsData]);

  useEffect(() => {
    if (topSearchesData) {
      setMostSearched(topSearchesData.topSearches.searches);
    }
  }, [topSearchesData]);

  useEffect(() => {
    if (collectionData) {
      setProductNews(
        collectionData?.configCollection?.items[0].searchMedia
          .secionMediaCollection.items
      );
    }
  }, [collectionData]);

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
    setWaiting(true);

    const { data, loading } = await refetch({
      fullText: text,
      selectedFacets: [],
    });

    resetProductsArray();
    if (!loading) {
      setProducts(data.productSearch.products);
    }
    setWaiting(false);

    setShowResults(true);
    setSelectedTerm(false);

    console.log(
      'productSearchIds',
      data.productSearch.products.map((x) => x.productId)
    );
    const searchIds = data.productSearch.products.map((x: any) => x.productId);

    appsFlyer.logEvent('af_search', {
      af_search_string: text,
      af_content_list: searchIds,
    });

    analytics().logEvent('search', {
      search_string: text,
      search_ids: searchIds,
    });
  };

  const handleDebouncedSearchTerm = () => {
    getSuggestions({
      variables: {
        fullText: debouncedSearchTerm,
      },
    });
    setShowResults(false);
    setShowAllProducts(false);
  };

  const resetProductsArray = () => {
    setProducts([]);
  };

  const loadMoreProducts = async (offset: number, searchQuery?: string) => {
    setLoadingRefetch(true);
    const {
      data: {
        productSearch: { products: newProducts },
      },
    } = await fetchMore({
      variables: {
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? pageSize * 2 - 1 : offset + (pageSize - 1),
      },
    });
    console.log('foi essa porra', newProducts.products);

    if (!loading) {
      setProducts(newProducts);
    }
    setLoadingRefetch(false);
  };

  return (
    <Box backgroundColor="white" flex={1}>
      <TopBarDefault
        loading={
          loading || topSearchesLoading || loadingFeatured || selectedTerm
        }
      />
      <WithoutInternet />
      <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
        <SearchBar
          value={searchTerm}
          onValueChange={(text) => {
            setSearchTerm(text);
          }}
          onClickIcon={() => {
            suggestionsData && setSelectedTerm(true);
            handleSearch(searchTerm);
          }}
          height={36}
          placeholder="Buscar"
        />
      </Box>
      {!showResults ? (
        <ScrollView>
          {
            // !showResults &&
            searchTerm.length === 0 && (
              <>
                <Box marginX="nano" mt="micro">
                  <Box>
                    <Typography
                      fontFamily="nunitoBold"
                      fontSize={13}
                      color="neutroFrio2"
                    >
                      OS MAIS PROCURADOS
                    </Typography>
                  </Box>

                  <Box flexDirection="row" flexWrap="wrap">
                    {mostSearched.map((item) => (
                      <Button
                        onPress={() => {
                          setSearchTerm(item.term);
                        }}
                      >
                        <Box
                          bg="divider"
                          justifyContent="center"
                          px="micro"
                          height={26}
                          borderRadius="pico"
                          marginTop="micro"
                          mr="micro"
                        >
                          <Typography fontFamily="nunitoRegular" fontSize={13}>
                            {item.term}
                          </Typography>
                        </Box>
                      </Button>
                    ))}
                  </Box>
                </Box>

                <News
                  data={productNews}
                  onPress={(item) => {
                    const facetInput: any[] = [];
                    const [collecion, valueCollecion] = item.split(':');
                    facetInput.push({
                      key: 'productClusterIds',
                      value: valueCollecion,
                    });
                    navigation.navigate('ProductCatalog', {
                      facetInput,
                      referenceId: item,
                    });
                  }}
                />

                {featuredProducts && featuredProducts?.length > 0 && (
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

                    <Animatable.View
                      animation="fadeIn"
                      style={{ marginBottom: 120 }}
                    >
                      <ListVerticalProducts
                        totalProducts={data?.productSearch?.recordsFiltered}
                        products={featuredProducts || []}
                        loadMoreProducts={(offset) => {
                          loadMoreProducts(offset, '');
                        }}
                      />
                    </Animatable.View>
                  </>
                )}
              </>
            )
          }

          {suggestions?.length > 0 && searchTerm.length > 0 && (
            // !showResults &&
            <>
              <Box bg="white" marginX="nano" justifyContent="center">
                {suggestions.map((suggestion) => (
                  <>
                    <Button
                      width="100%"
                      onPress={() => {
                        setSearchTerm(suggestion.term);
                        setSelectedTerm(true);
                        handleSearch(suggestion.term);
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
                ))}
              </Box>
              {/* {relatedProducts && relatedProducts.length > 0 ?
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
              } */}
            </>
          )}
          {!suggestionsFound && <ProductNotFound />}
        </ScrollView>
      ) : (
        showResults &&
        (products && products?.length > 0 ? (
          <Animatable.View animation="fadeIn" style={{ marginBottom: 120 }}>
            <ListVerticalProducts
              products={products || []}
              isLoading={loadingRefetch}
              totalProducts={data.productSearch.recordsFiltered}
              loadMoreProducts={(offset) => {
                loadMoreProducts(offset, searchTerm);
              }}
            />
          </Animatable.View>
        ) : (
          <ProductNotFound />
        ))
      )}
    </Box>
  );
};

const ProductNotFound = () => (
  <Box
    bg="white"
    height={deviceHeight}
    mt="xxl"
    alignItems="center"
    // justifyContent="center"
    px="micro"
  >
    <Box mb="sm">
      <Image source={images.searchNotFound} resizeMode="contain" />
    </Box>
    <Box>
      <Typography fontFamily="nunitoRegular" fontSize={13} textAlign="center">
        Não encontramos produtos que corresponde a sua busca.
      </Typography>
    </Box>
  </Box>
);
