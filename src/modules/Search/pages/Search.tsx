import * as React from 'react';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { useLazyQuery } from '@apollo/client';
import {
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  ScrollView, Dimensions, BackHandler, Keyboard, Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  Box,
  Button,
  Divider,
  SearchBar,
  Typography,
  Picker,
} from '@usereservaapp/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import { FilterModal } from '../../ProductCatalog/modals/FilterModal/FilterModal';

import {
  configCollection,
  ConfigCollection,
} from '../../../graphql/homePage/HomeQuery';
import {
  OrderByEnum,
  productSearch,
  ProductSearchData,
} from '../../../graphql/products/productSearch';
import {
  SearchSuggestionsVars,
  searchSuggestionsAndProductSearch,
} from '../../../graphql/products/searchSuggestions';

import type { RootStackParamList } from '../../../routes/StackNavigator';
import { useCheckConnection } from '../../../hooks/useCheckConnection';
import useDebounce from '../../../hooks/useDebounce';
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';
import { News } from '../components/News';
import { useRegionalSearch } from '../../../context/RegionalSearchContext';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { ColorsToHexEnum } from '../../../graphql/product/colorsToHexEnum';
import { facetsQuery } from '../../../graphql/facets/facetsQuery';
import EventProvider from '../../../utils/EventProvider';
import { generateFacets } from '../../../utils/generateFacets';
import { useCheckSearchRedirectLazyQuery } from '../../../base/graphql/generated';
import DeepLinkPathModule from '../../../NativeModules/DeepLinkPathModule';
import { useApolloFetchPolicyStore } from '../../../zustand/useApolloFetchPolicyStore';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import { useIsTester } from '../../../hooks/useIsTester';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';
import IconComponent from '../../../components/IconComponent/IconComponent';

const deviceHeight = Dimensions.get('window').height;

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>;

export const SearchScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { regionId } = useRegionalSearch();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showResults, setShowResults] = React.useState(true);
  const [showAllProducts, setShowAllProducts] = React.useState(false);

  const [loadingRefetch, setLoadingRefetch] = useState(false);
  const [products, setProducts] = useState<any[]>();
  const [relatedProducts, setRelatedProducts] = useState<any[]>();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>();
  const [suggestions, setSuggestions] = useState<SearchSuggestionsVars[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [productNews, setProductNews] = useState<ConfigCollection[]>([]);
  const [suggestionsFound, setSuggestionsFound] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState(false);
  const [returnSearch, setReturnSearch] = useState<boolean>(false);
  const [productsQuery, setProductsQuery] = useState<ProductSearchData>(
    {} as ProductSearchData,
  );
  const [sizefilters, setSizeFilters] = useState([]);
  const [categoryfilters, setCategoryFilters] = useState([]);
  const [priceRangefilters, setPriceRangeFilters] = useState<any[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [colorsfilters, setColorsFilters] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sorterVisible, setSorterVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string>();
  const [filterRequestList, setFilterRequestList] = useState<[] | undefined | null>([]);

  const { getItem } = useAsyncStorageProvider();
  const { profile } = useAuthStore(['profile']);

  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const { getString, getBoolean } = useRemoteConfig();
  const isTester = useIsTester();

  const hasPrimeLandingPageRedirect = useMemo(() => (
    getBoolean(isTester ? 'show_primelp_on_search_tester' : 'show_primelp_on_search')
  ), [getBoolean, isTester]);

  const primeLandingPageSearchTerms = useMemo(() => {
    if (!hasPrimeLandingPageRedirect) return [];

    return getString('primelp_terms_search')?.split('|');
  }, [getString, hasPrimeLandingPageRedirect]);

  const [{ collectionData, loadingCollection }, setCollectionData] = useState({
    collectionData: null,
    loadingCollection: false,
  });

  const [{ featuredData, loadingFeatured }, setFeaturedData] = useState({
    featuredData: null,
    loadingFeatured: false,
  });

  const [{ data, loading }, setProductData] = useState({
    data: null,
    loading: false,
  });

  const [referenceString, setReferenceString] = useState('');

  const [getCheckSearchRedirect] = useCheckSearchRedirectLazyQuery({
    context: { clientName: 'gateway' },
  });

  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 400 });

  const [getCollection] = useLazyQuery(configCollection, {
    context: { clientName: 'contentful' },
  });

  const [getFeaturedData] = useLazyQuery(productSearch, {
    variables: {
      hideUnavailableItems: true,
      salesChannel: '4',
      selectedFacets: [
        {
          key: 'productClusterIds',
          value: collectionData?.configCollection?.items[0]?.searchCollection,
        },
      ],
      to: 7,
      orderBy: selectedOrder,
      simulationBehavior: 'default',
      productOriginVtex: false,
    },
  });

  const pageSize = 12;

  const [getProducts, { fetchMore }] = useLazyQuery(productSearch, {
    variables: {
      salesChannel: '4',
      to: pageSize - 1,
      fullText: '',
      orderBy: selectedOrder,
      selectedFacets: [
        {
          key: 'region-id',
          value: regionId,
        },
      ],
    } as any,
  });

  const redirectWightList = {
    camiseta: [
      { key: 'c', value: 'reserva' },
      { key: 'c', value: 'masculino' },
      { key: 'c', value: 'camisetas' },
    ],
    camisetas: [
      { key: 'c', value: 'reserva' },
      { key: 'c', value: 'masculino' },
      { key: 'c', value: 'camisetas' },
    ],
    mochila: [{ key: 'productClusterIds', value: '902' }],
    mochilas: [{ key: 'productClusterIds', value: '902' }],
  };

  const gambiarraRedirect = async (searchTerm: string) => {
    if (Object.keys(redirectWightList).includes(searchTerm.toLowerCase())) {
      const { data } = await getProducts({
        variables: {
          salesChannel: '4',
          to: pageSize - 1,
          fullText: '',
          map: '',
          // @ts-ignore
          selectedFacets: [].concat(
            redirectWightList[searchTerm?.toLowerCase()],
            filterRequestList || [],
          ),
        },
      });

      return { data };
    }
    return null;
  };

  useEffect(() => {
    setCollectionData({ collectionData: null, loadingCollection: true });
    setFeaturedData({ featuredData: null, loadingFeatured: true });
    getCollection({
      fetchPolicy: getFetchPolicyPerKey('config'),
    }).then(({ data }) => {
      setCollectionData({ collectionData: data, loadingCollection: false });
    });
    getFeaturedData({
      fetchPolicy: getFetchPolicyPerKey('productFeaturedData'),
    }).then(({ data }) => {
      setFeaturedData({ featuredData: data, loadingFeatured: false });
    });
  }, []);

  // DESTAQUES

  const [
    getSuggestions,
    { data: suggestionsData, loading: suggestionsLoading },
  ] = useLazyQuery(searchSuggestionsAndProductSearch, {
    variables: {
      salesChannel: '4',
    },
  });

  const { WithoutInternet } = useCheckConnection({});

  useEffect(() => {
    if (!selectedTerm && debouncedSearchTerm) {
      setRelatedProducts([]);
      handleDebouncedSearchTerm();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (suggestionsData) {
      const { searchSuggestions, productSearch } = suggestionsData;

      setSuggestions(searchSuggestions.searches);
      setRelatedProducts(productSearch.products);
      if (searchSuggestions?.searches.length > 0) {
        setSuggestionsFound(true);
      } else {
        setSuggestionsFound(false);
      }
    }
  }, [suggestionsData]);

  useEffect(() => {
    if (collectionData) {
      setProductNews(
        collectionData?.configCollection?.items[0]?.searchMedia
          .secionMediaCollection.items,
      );
      setSearchSuggestions(
        collectionData?.configCollection?.items[0]?.searchSuggestionsCollection
          .items,
      );
      setReturnSearch(false);
    }
  }, [collectionData]);

  useEffect(() => {
    if (!loadingFeatured) {
      setFeaturedProducts(featuredData?.productSearch?.products);
    }
  }, [featuredData]);

  useEffect(() => {
    setShowResults(false);
  }, []);

  useEffect(() => {
    setReturnSearch(false);
  }, []);

  useEffect(() => {
    if (returnSearch) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.dispatch(StackActions.popToTop());

        navigation.navigate('SearchMenu');
        return true;
      });
    } else {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();

        return true;
      });
    }
  }, [returnSearch]);

  /**
   * @name handleCheckSearchTerm
   * @description Search for specific terms in the backend,
   * and checks whether it should be opened in the app or browser.
   * If it is to be opened in the browser and it is on android, it
   * will use the DeepLinkPathModule module to open a new instance
   * of the browser and close the current app. On IOS it will only
   * open the link in the browser.
   * */
  const handleCheckSearchTerm = useCallback(async () => {
    const term = (debouncedSearchTerm || '').toLowerCase().trim();

    if (hasPrimeLandingPageRedirect && primeLandingPageSearchTerms.includes(term)) {
      Keyboard.dismiss();
      navigation.navigate('PrimeLP');
      return;
    }

    const { data: dataSearch } = await getCheckSearchRedirect({
      variables: { q: debouncedSearchTerm },
      fetchPolicy: getFetchPolicyPerKey('checkSearchRedirect'),
    });

    if (dataSearch?.checkSearchRedirect) {
      await DeepLinkPathModule.openUrlInBrowser({
        closeCurrentAppInstance: true,
        url: dataSearch.checkSearchRedirect,
      });
    }
  }, [
    debouncedSearchTerm,
    hasPrimeLandingPageRedirect,
    primeLandingPageSearchTerms,
    getCheckSearchRedirect,
    getFetchPolicyPerKey,
    navigation,
  ]);

  const trackEventSearchDito = useCallback(async (searchedTerm: string, amountFound: number) => {
    const id = profile?.email
      ? await getItem('@Dito:userRef')
      : await AsyncStorage.getItem('@Dito:anonymousID');

    if (!searchedTerm) {
      return;
    }

    EventProvider.sendTrackEvent(
      'buscou-produto', {
        id,
        action: 'buscou-produto',
        data: {
          term: searchedTerm,
          itens_encontrados: amountFound || 0,
          dispositivo: Platform.OS,
          origem: 'app',
        },
      },
    );
  }, [getItem, profile?.email]);

  const handleSearch = async (text: string) => {
    setProductData({ data: null, loading: true });

    /**
     * Searches for specific terms in the backend,
     * and checks whether it should be opened in the app or browser
     * */
    await handleCheckSearchTerm();

    if (Object.keys(redirectWightList).includes(text.toLowerCase())) {
      gambiarraRedirect(text).then(({ data }: any) => {
        setShowResults(true);
        setSelectedTerm(false);
        setProducts(data?.productSearch?.products);
        setProductData({ data, loading: false });
        try {
          trackEventSearchDito(text, data?.productSearch?.recordsFiltered);
          EventProvider.logEvent('search', {
            search_term: text,
          });
        } catch (error) {
          EventProvider.captureException(error);
        }
      });
    } else {
      getProducts({
        variables: {
          fullText: text,
          selectedFacets: [
            {
              key: 'region-id',
              value: regionId,
            },
          ],
        },
      }).then(({ data }) => {
        setShowResults(true);
        setSelectedTerm(false);
        setProducts(data?.productSearch?.products);
        setProductData({ data, loading: false });
        try {
          trackEventSearchDito(text, data?.productSearch?.recordsFiltered);
          EventProvider.logEvent('search', {
            search_term: text,
          });
        } catch (error) {
          EventProvider.captureException(error);
        }
      });
    }
  };

  const handleDebouncedSearchTerm = useCallback(async () => {
    await handleCheckSearchTerm();

    await getSuggestions({
      variables: {
        fullText: debouncedSearchTerm,
      },
      fetchPolicy: getFetchPolicyPerKey('searchSuggestionsAndProductSearch'),
    });

    setShowAllProducts(false);
  }, [getSuggestions, setShowAllProducts, getFetchPolicyPerKey, debouncedSearchTerm, handleCheckSearchTerm]);

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
        selectedFacets:
        generateFacets({ reference: referenceString })
          .concat(
            filterRequestList || [],
          ),
      },
    });

    if (!loading) {
      if (Array.isArray(newProducts) && newProducts.length) {
        setProducts(newProducts);
      } else {
        const newProduct = [...products] as any[] | undefined;
        setProducts(newProduct);
      }
    }
    setLoadingRefetch(false);
  };

  useEffect(() => {
    if (filterRequestList) {
      setProducts({
        products: [],
      });
      loadMoreProducts(0);
    }
  }, [filterRequestList]);

  const [{ facetsData, lodingFacets }, setFacets] = useState<{
    facetsData: any;
    lodingFacets: boolean;
  }>({
    facetsData: null,
    lodingFacets: true,
  });

  useEffect(() => {
    setReferenceString('collection:1438');
  }, []);

  const [getFacets] = useLazyQuery(facetsQuery, {
    variables: {
      hideUnavailableItems: true,
      selectedFacets:
      generateFacets({ reference: referenceString })
        .concat(
          filterRequestList || [],
        ),
    },
  });

  useEffect(() => {
    getFacets({
      fetchPolicy: getFetchPolicyPerKey('facets'),
    }).then((response) => setFacets({
      facetsData: response.data,
      lodingFacets: false,
    }));
  }, []);

  useEffect(() => {
    if (!lodingFacets) {
      const facets = facetsData?.facets?.facets;

      if (!facets?.length) {
        return;
      }

      // COLOR
      const colorFacets = facets.filter(
        ({ name }: any) => name.toUpperCase() === 'COR'
          || name.toUpperCase() === 'DESC_COR_CONSOLIDADA',
      );
      const colorFacetValues = !!colorFacets && colorFacets.length > 0
        ? colorFacets[0].values.map(({ key, value }: any) => ({
          key,
          value: ColorsToHexEnum[value],
        }))
        : [];
      // SIZE
      const sizeFacets = facets.filter(
        ({ name }: any) => name.toUpperCase() === 'TAMANHO' || name === 'Tamanho',
      );
      const sizeFacetValues = !!sizeFacets && sizeFacets.length > 0
        ? sizeFacets[0].values.map(({ key, value }: any) => ({
          key,
          value,
        }))
        : [];

      // CATEGORY
      const categoryFacets = facets.filter(
        ({ name }: any) => name === 'Categoria',
      );
      const categoryFacetValues = !!categoryFacets && categoryFacets.length > 0
        ? categoryFacets[0].values.map(({ key, value }: any) => ({
          key,
          value,
        }))
        : [];

      // PRICE
      const priceFacets = facets.filter(({ name }: any) => name === 'Preço');
      const priceFacetValues = !!priceFacets && priceFacets.length > 0
        ? priceFacets[0].values.map(({ key, range }: any) => ({
          key,
          range,
        }))
        : [];

      setPriceRangeFilters(priceFacetValues);
      setCategoryFilters(categoryFacetValues);
      setSizeFilters(sizeFacetValues);
      setColorsFilters(colorFacetValues);
    }
  }, [facetsData]);

  useEffect(() => {
    if (!loading && !!productSearch) {
      setProductsQuery(data?.productSearch);
    }
  }, [data, featuredData]);

  const refetch = async () => {
    const response = await getProducts({
      variables: {
        salesChannel: '4',
        to: pageSize - 1,
        fullText: '',
        orderBy: selectedOrder,
        selectedFacets: [
          {
            key: 'region-id',
            value: regionId,
          },
        ],
      } as any,
    });

    setProducts(response.data.productSearch.products);

    return response;
  };

  useEffect(() => {
    refetch();
  }, [selectedOrder]);

  useEffect(() => {
    if (!EventProvider) return;
    if (!searchTerm) return;
    if (!products || products?.length <= 0) return;

    EventProvider.logEvent('view_search_results', {
      search_term: searchTerm,
    });
  }, [EventProvider, products, searchTerm]);

  return (
    <Box backgroundColor="white" flex={1}>
      <TopBarDefaultBackButton
        loading={
          loading || loadingCollection || loadingFeatured || selectedTerm
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
            handleSearch(searchTerm.replace(/^\s+|\s+$/gm, ''));
          }}
          height={36}
          placeholder="Buscar"
        />
      </Box>
      {!showResults ? (
        <ScrollView>
          <>
            {searchTerm.length === 0 && (
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
                    {searchSuggestions.map((item, index) => (
                      <Button
                        key={`search-suggestion-${index}`}
                        onPress={async () => {
                          setSearchTerm(item.name);
                          handleSearch(item.name);
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
                            {item.name}
                          </Typography>
                        </Box>
                      </Button>
                    ))}
                  </Box>
                </Box>

                <News
                  data={productNews}
                  onPress={(item) => {
                    const { reference, orderBy } = item;
                    if (reference) {
                      const facetInput: any[] = [];
                      const [collecion, valueCollecion] = reference?.split(':');
                      facetInput.push({
                        key: 'productClusterIds',
                        value: valueCollecion,
                      });
                      navigation.navigate('ProductCatalog', {
                        facetInput,
                        referenceId: reference,
                        orderBy,
                      });
                    }
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
            )}
          </>
          <>
            {suggestions?.length > 0 && searchTerm.length > 0 && (
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
              </>
            )}
          </>
          <>{!suggestionsFound && <ProductNotFound />}</>
        </ScrollView>
      ) : products && products?.length > 0 ? (
        <Animatable.View animation="fadeIn" style={{ marginBottom: 120 }}>
          <Box paddingY="micro" flexDirection="row" justifyContent="center">
            <Box width={1 / 2}>
              <Button
                onPress={() => {
                  if (productsQuery.products.length > 0) {
                    setFilterVisible(true);
                  } else {
                    setFilterRequestList([]);
                  }
                }}
                marginRight="nano"
                marginLeft="micro"
                borderRadius="nano"
                borderColor="dropDownBorderColor"
                borderWidth="hairline"
                flexDirection="row"
                inline
                height={40}
              >
                <Typography
                  color="preto"
                  fontFamily="nunitoSemiBold"
                  fontSize="14px"
                >
                  {productsQuery?.products?.length == 0
                    && filterRequestList?.length > 0
                    ? 'Limpar Filtros'
                    : 'Filtrar'}
                </Typography>
              </Button>
            </Box>
            <Box width={1 / 2}>
              <Button
                marginRight="micro"
                marginLeft="nano"
                borderRadius="nano"
                borderColor="dropDownBorderColor"
                borderWidth="hairline"
                flexDirection="row"
                inline
                height={40}
                onPress={() => {
                  setSorterVisible(true);
                }}
              >
                <Typography
                  color="preto"
                  fontFamily="nunitoSemiBold"
                  fontSize="14px"
                >
                  Ordenar
                </Typography>
              </Button>
            </Box>
          </Box>
          <FilterModal
            setFilterRequestList={setFilterRequestList}
            filterList={filterList}
            setFilterList={setFilterList}
            isVisible={filterVisible}
            colors={colorsfilters}
            sizes={sizefilters}
            categories={categoryfilters}
            priceRange={priceRangefilters}
            onCancel={() => setFilterVisible(false)}
            onClose={() => setFilterVisible(false)}
            title=""
            subtitle=""
          />
          <Picker
            onSelect={(item) => {
              setSorterVisible(false);
              setSelectedOrder(item?.value);
            }}
            isVisible={sorterVisible}
            items={[
              {
                text: 'Relevância',
                value: OrderByEnum.OrderByScoreDESC,
              },
              {
                text: 'Mais Vendidos',
                value: OrderByEnum.OrderByTopSaleDESC,
              },
              {
                text: 'Mais Recentes',
                value: OrderByEnum.OrderByReleaseDateDESC,
              },
              {
                text: 'Descontos',
                value: OrderByEnum.OrderByBestDiscountDESC,
              },
              {
                text: 'Maior Preço',
                value: OrderByEnum.OrderByPriceDESC,
              },
              {
                text: 'Menor Preço',
                value: OrderByEnum.OrderByPriceASC,
              },
              {
                text: 'De A a Z',
                value: OrderByEnum.OrderByNameASC,
              },
              {
                text: 'De Z a A',
                value: OrderByEnum.OrderByNameDESC,
              },
            ]}
            onConfirm={() => {
              setSorterVisible(false);
            }}
            onClose={() => {
              setSorterVisible(false);
            }}
            onBackDropPress={() => setSorterVisible(false)}
            title="Ordenar Por"
          />
          <ListVerticalProducts
            products={products || featuredData?.productSearch || []}
            isLoading={loadingRefetch}
            totalProducts={data?.productSearch.recordsFiltered}
            loadMoreProducts={(offset) => {
              loadMoreProducts(offset, searchTerm);
            }}
          />
        </Animatable.View>
      ) : (
        <ProductNotFound />
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
    px="micro"
  >
    <Box mb="sm">
      <IconComponent width={120} height={120} icon="searchNotFound" />
    </Box>
    <Box>
      <Typography fontFamily="nunitoRegular" fontSize={13} textAlign="center">
        Não encontramos produtos que corresponde a sua busca.
      </Typography>
    </Box>
  </Box>
);
