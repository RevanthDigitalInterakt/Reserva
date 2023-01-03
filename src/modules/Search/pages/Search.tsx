import * as React from 'react';
import { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import {
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, Dimensions, BackHandler } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  Box,
  Button,
  Divider,
  SearchBar,
  Typography,
  Image,
  Picker,
} from '@usereservaapp/reserva-ui';
import { FilterModal } from '../../ProductCatalog/modals/FilterModal';

import { images } from '../../../assets';
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

import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import useDebounce from '../../../shared/hooks/useDebounce';
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';
import { News } from '../components/News';
import { useRegionalSearch } from '../../../context/RegionalSearchContext';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { ColorsToHexEnum } from '../../../graphql/product/colorsToHexEnum';
import { facetsQuery } from '../../../graphql/facets/facetsQuery';
import EventProvider from '../../../utils/EventProvider';

const deviceHeight = Dimensions.get('window').height;

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>;

export const SearchScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { regionId } = useRegionalSearch();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showResults, setShowResults] = React.useState(true);
  const [showAllProducts, setShowAllProducts] = React.useState(false);

  const [waiting, setWaiting] = React.useState(false);

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
  const categoryId = 'camisetas';
  const [colorsfilters, setColorsFilters] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sorterVisible, setSorterVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string>();
  const [filterRequestList, setFilterRequestList] = useState<any[]>([]);
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

  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 400 });

  const [getCollection] = useLazyQuery(configCollection, {
    context: { clientName: 'contentful' },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const [getFeaturedData] = useLazyQuery(productSearch, {
    variables: {
      hideUnavailableItems: true,
      salesChannel: '4',
      selectedFacets: [
        {
          key: 'productClusterIds',
          value: collectionData?.configCollection?.items[0].searchCollection,
        },
      ],
      to: 7,
      orderBy: selectedOrder,
      simulationBehavior: 'default',
      productOriginVtex: false,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
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
      const { data, variables } = await getProducts({
        variables: {
          salesChannel: '4',
          to: pageSize - 1,
          fullText: '',
          map: '',
          // @ts-ignore
          selectedFacets: [].concat(
            redirectWightList[searchTerm.toLowerCase()],
            filterRequestList,
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
    getCollection().then(({ data }) => {
      setCollectionData({ collectionData: data, loadingCollection: false });
    });
    getFeaturedData().then(({ data }) => {
      setFeaturedData({ featuredData: data, loadingFeatured: false });
    });
  }, []);

  // DESTAQUES

  const [
    getSuggestions,
    { data: suggestionsData, loading: suggestionsLoading },
  ] = useLazyQuery(searchSuggestionsAndProductSearch, {
    fetchPolicy: 'no-cache',
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
        collectionData?.configCollection?.items[0].searchMedia
          .secionMediaCollection.items,
      );
      setSearchSuggestions(
        collectionData?.configCollection?.items[0].searchSuggestionsCollection
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
        // navigation.dispatch(StackActions.replace('SearchMenu'));

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

  const handleSearch = (text: string) => {
    setProductData({ data: null, loading: true });
    if (Object.keys(redirectWightList).includes(text.toLowerCase())) {
      gambiarraRedirect(text).then(({ data }: any) => {
        setShowResults(true);
        setSelectedTerm(false);
        // resetProductsArray()
        setProducts(data?.productSearch?.products);
        setProductData({ data, loading: false });
        const searchIds = data?.productSearch?.products.map(
          (x: any) => x?.productId,
        );

        EventProvider.logEvent('search', {
          search_string: text,
          search_ids: searchIds,
        });
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
        // resetProductsArray();
        setProducts(data?.productSearch?.products);
        setProductData({ data, loading: false });

        const searchIds = data?.productSearch?.products.map(
          (x: any) => x?.productId,
        );

        EventProvider.logEvent('search', {
          search_string: text,
          search_ids: searchIds,
        });
      });
    }
  };

  const handleDebouncedSearchTerm = async () => {
    const { data } = await getSuggestions({
      variables: {
        fullText: debouncedSearchTerm,
      },
    });

    // setShowResults(false);
    setShowAllProducts(false);
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
        selectedFacets: [].concat(
          generateFacets(referenceString),
          filterRequestList,
        ),
      },
    });

    if (!loading) {
      // setProducts([...products, newProducts]);
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

  const generateFacets = (reference: string) => {
    const facetInput: any[] = [];
    const [subType, subcategories] = reference.split(':');

    if (subType === 'category') {
      subcategories.split('|').forEach((sub) => {
        if (sub !== '') {
          facetInput.push({
            key: 'c',
            value: sub,
          });
        }
      });
    } else {
      facetInput.push({
        key: 'productClusterIds',
        value: subcategories,
      });
    }
    return facetInput;
  };

  // const { referenceId } = route.params;

  useEffect(() => {
    // if (referenceId === 'offers-page') {
    //   setReferenceString('collection:1438');
    // } else {
    setReferenceString('collection:1438');
    // }
  }, []);

  const [getFacets] = useLazyQuery(facetsQuery, {
    variables: {
      hideUnavailableItems: true,
      selectedFacets: [].concat(
        generateFacets(referenceString),
        filterRequestList,
      ),
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getFacets().then((response) => setFacets({
      facetsData: response.data,
      lodingFacets: false,
      // refetchFacets: facetsData.refetch
    }));
  }, []);

  useEffect(() => {
    if (!lodingFacets) {
      const { facets } = facetsData.facets;

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
            // handleSearch(text);
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
                          // setReturnSearch(true);
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
                  && filterRequestList.length > 0
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
            categoryId={categoryId}
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
            // confirmText={"Ok"}
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
              // {
              //   text: 'Menor Preço',
              //   value: OrderByEnum.OrderByPriceASC,
              // },
              // {
              //   text: 'Maior Preço',
              //   value: OrderByEnum.OrderByPriceDESC,
              // },
              // {
              //   text: 'Mais Recentes',
              //   value: OrderByEnum.OrderByReleaseDateDESC,
              // },
              // {
              //   text: 'Relevante',
              //   value: OrderByEnum.OrderByReviewRateDESC,
              // },
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
