/* eslint-disable */ //TODO ajust lint on sprint 13
import { useLazyQuery } from '@apollo/client';
import {
  Box, Button, Picker, Typography,
} from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import { Skeleton } from '@usereservaapp/reserva-ui/src/components/Image/Skeleton';
import {
  productSearch,
  ProductSearchData,
  OrderByEnum,
} from '../../graphql/products/productSearch';
import { ColorsToHexEnum } from '../../graphql/product/colorsToHexEnum';
import { facetsQuery } from '../../graphql/facets/facetsQuery';
import { EmptyProductCatalog } from '../../modules/ProductCatalog/components/EmptyProductCatalog/EmptyProductCatalog';
import { ListVerticalProducts } from '../../modules/ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';
import { useCheckConnection } from '../hooks/useCheckConnection';
import { bannerDefaultQuery, bannerQuery, configCollection } from '../../graphql/homePage/HomeQuery';
import { FilterModal, TFilterType } from '../../modules/ProductCatalog/modals/FilterModal/FilterModal';

interface ProductListProps {
  referenceId: string;
}
export const ProductList: React.FC<ProductListProps> = ({
  referenceId,
}) => {
  const [productsQuery, setProducts] = useState<ProductSearchData>(
    {} as ProductSearchData,
  );
  const pageSize = 12;
  const categoryId = 'camisetas';
  const navigation = useNavigation();
  const [bannerImage, setBannerImage] = useState();
  // const [bannerDefault, setBannerDefault] = useState();
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [watchLoading, setWatchLoading] = useState(false);
  const [showWatch, setShowWatch] = useState(false);
  const [colorsfilters, setColorsFilters] = useState([]);
  const [sizefilters, setSizeFilters] = useState([]);
  const [categoryfilters, setCategoryFilters] = useState([]);
  const [priceRangefilters, setPriceRangeFilters] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sorterVisible, setSorterVisible] = useState(false);
  const [filterList, setFilterList] = useState<TFilterType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>();
  const [loadingFetchMore, setLoadingFetchMore] = useState(false);
  const [loadingHandlerState, setLoadingHandlerState] = useState(false);
  const [filterRequestList, setFilterRequestList] = useState<any[]>([]);
  const [skip, setSkip] = useState(false);
  const [{ collectionData }, setConfigCollection] = useState<{ collectionData: any }>({ collectionData: null });
  const [getCollection] = useLazyQuery(configCollection, {
    context: { clientName: 'contentful' },
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
  const [{
    data,
    loading,
    error,
  }, setProductSearch] = useState<{
    data: any | null,
    loading: boolean,
    error: any,
  }>({
    data: null,
    loading: false,
    error: null,
  });
  const refetch = async () => {
    const response = await getProductSearch();
    setProductSearch({
      data: response.data,
      loading: false,
      error: response.error,
    });
    return response;
  };
  const fetchMore = async (props: any) => {
    const response = await getProductSearch(props);
    setProductSearch({
      data: response.data,
      loading: false,
      error: response.error,
      fetchMore,
      refetch,
    });
    return response;
  };
  const [getProductSearch] = useLazyQuery(
    productSearch,
    {
      // skip,
      variables: {
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        selectedFacets: [].concat(
          generateFacets(referenceId),
          filterRequestList,
        ),
        orderBy: selectedOrder,
        to: pageSize - 1,
        simulationBehavior: 'default',
        productOriginVtex: false,
      },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
    },
  );
  useEffect(() => {
    appsFlyer.logEvent('af_list_view', {
      af_content_type: referenceId,
    });
    analytics().logEvent('product_list_view', {
      content_type: referenceId,
    });
  }, []);
  const [{
    facetsData,
    lodingFacets,
  }, setFacets] = useState<{
    facetsData: any,
    lodingFacets: boolean,
  }>({
    facetsData: null,
    lodingFacets: true,
  });
  const [getFacets] = useLazyQuery(facetsQuery, {
    variables: {
      hideUnavailableItems: true,
      selectedFacets: [].concat(generateFacets(referenceId), filterRequestList),
    },
    fetchPolicy: 'no-cache',
  });
  const [{
    bannerData,
    loadingBanner,
    // refetchBanner
  }, setBannerData] = useState<{
    bannerData: any | null,
    loadingBanner: boolean,
  }>({
    bannerData: null,
    loadingBanner: false,
  });
  const refetchBanner = async () => {
    const response = await getBanner();
    setBannerData({
      bannerData: response.data,
      loadingBanner: false,
    });
    return response;
  };
  const [getBanner] = useLazyQuery(bannerQuery, {
    context: { clientName: 'contentful' },
    variables: {
      category: referenceId,
    },
  });
  const [{
    defaultBanner,
    loadingDefaultBanner,
  }, setDefaultBanner] = useState<{
    defaultBanner: any,
    loadingDefaultBanner: boolean,
  }>({
    defaultBanner: null,
    loadingDefaultBanner: false,
    // refetchDefaultBanner: () => { return {}},
  });
  const refetchDefaultBanner = async () => {
    const response = await getDefaultBanner();
    setDefaultBanner({
      defaultBanner: response.data,
      // refetchDefaultBanner,
      loadingDefaultBanner: false,
    });
    return response;
  };
  const [getDefaultBanner] = useLazyQuery(bannerDefaultQuery, { context: { clientName: 'contentful' } });
  useEffect(() => {
    getFacets().then((response) => setFacets({
      facetsData: response.data,
      lodingFacets: false,
      // refetchFacets: facetsData.refetch
    }));
    getBanner().then((response) => setBannerData({
      bannerData: response.data,
      loadingBanner: false,
      // refetchBanner
    }));
    getDefaultBanner().then((response) => setDefaultBanner({
      defaultBanner: response.data,
      // refetchDefaultBanner: defaultBanner.refetch,
      loadingDefaultBanner: false,
    }));
    getCollection().then((response) => setConfigCollection({
      collectionData: response.data,
    }));
    getProductSearch().then((response) => setProductSearch({
      data: response.data,
      loading: false,
      error: response.error,
      // fetchMore: response.fetchMore,
      // refetch
    }));
  }, []);
  const setBannerDefaultImage = async () => {
    const { data } = await refetchDefaultBanner();
    if (data) {
      const url = data.bannerCategoryCollection?.items[0]?.item?.image?.url;
      setBannerImage(url);
    }
  };
  const { WithoutInternet } = useCheckConnection({});
  const firstLoad = async () => {
    setSkeletonLoading(true);
    setSkip(true);
    const { data, loading } = await refetch();
    setProductSearch({
      data, loading, fetchMore, refetch, error,
    });
    setSkeletonLoading(false);
    await refetchBanner({ category: referenceId });
  };
  useEffect(() => {
    firstLoad();
    animationSkeletonLoading();
  }, []);
  useEffect(() => {
    if (bannerData) {
      const bannerUrl = bannerData?.bannerCategoryCollection?.items[0]?.item?.image?.url;
      if (bannerUrl) {
        setBannerImage(bannerUrl);
      } else {
        setBannerDefaultImage();
      }
    }
  }, [bannerData]);
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
    if (!loading && !!data) {
      setProducts(data.productSearch);
    }
  }, [data]);
  const loadMoreProducts = async (offset: number) => {
    setLoadingFetchMore(true);
    const { data, loading } = await fetchMore({
      variables: {
        orderBy: selectedOrder,
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? pageSize * 2 - 1 : offset + (pageSize - 1),
        selectedFacets: [].concat(
          generateFacets(referenceId),
          filterRequestList,
        ),
      },
    });
    setProductSearch({
      data, loading, fetchMore, refetch, error,
    });
    // setLoadingFetchMore(false);
    setLoadingFetchMore(loading);
    setProducts(data.productSearch);
  };
  useEffect(() => {
    if (filterRequestList) {
      setProducts({
        products: [],
      });
      loadMoreProducts(0);
    }
  }, [filterRequestList]);
  useEffect(() => {
    const fetch = async () => {
      const { data, loading } = await refetch({
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        selectedFacets: [].concat(
          generateFacets(referenceId),
          filterRequestList,
        ),
        orderBy: selectedOrder,
        to: pageSize - 1,
        simulationBehavior: 'default',
        productOriginVtex: false,
      });
      if (!loading && !!data) {
        setProductSearch({
          data, loading, fetchMore, refetch, error,
        });
        setProducts(data.productSearch);
      }
    };
    fetch();
  }, [selectedOrder]);
  const skeletonOpacity = useRef(new Animated.Value(0)).current;
  const animationSkeletonLoading = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonOpacity, {
          useNativeDriver: true,
          toValue: 1,
          duration: 1200,
          delay: 300,
        }),
        Animated.timing(skeletonOpacity, {
          useNativeDriver: true,
          toValue: 0.3,
          duration: 600,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  };

  const orderOptions = [
    {
      text: 'Menor Preço',
      value: OrderByEnum.OrderByPriceASC,
    },
    {
      text: 'Maior Preço',
      value: OrderByEnum.OrderByPriceDESC,
    },
    {
      text: 'Mais Recentes',
      value: OrderByEnum.OrderByReleaseDateDESC,
    },
    {
      text: 'Relevante',
      value: OrderByEnum.OrderByReviewRateDESC,
    },
  ]

  return (
    <Box>
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
      />
      <Picker
        onSelect={(item) => {
          setSorterVisible(false);
          setSelectedOrder(item?.value);
        }}
        isVisible={sorterVisible}
        items={orderOptions}
        onConfirm={() => {
          setSorterVisible(false);
        }}
        onClose={() => {
          setSorterVisible(false);
        }}
        onBackDropPress={() => setSorterVisible(false)}
        title="Ordenar Por"
      />
      {skeletonLoading || loadingHandlerState || watchLoading ? (
        <Skeleton>
          <Box bg="neutroFrio1" width="100%" height={200} />
          <Box flexDirection="row" justifyContent="center" marginTop={34}>
            <Box width="50%">
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={40}
                marginRight={8}
                marginLeft={12}
              />
            </Box>
            <Box width="50%">
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={40}
                marginRight={12}
                marginLeft={8}
              />
            </Box>
          </Box>
          <Box flexDirection="row" justifyContent="center" marginTop={45}>
            <Box
              width="50%"
              paddingRight={12}
              paddingLeft={8}
              marginBottom={33}
            >
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={250}
              />
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={24}
                marginTop={8}
              />
              <Box />
            </Box>
            <Box
              width="50%"
              paddingRight={12}
              paddingLeft={8}
              marginBottom={33}
            >
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={250}
              />
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={24}
                marginTop={8}
              />
            </Box>
          </Box>
          <Box flexDirection="row" justifyContent="center">
            <Box
              width="50%"
              paddingRight={12}
              paddingLeft={8}
              marginBottom={33}
            >
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={250}
              />
            </Box>
            <Box
              width="50%"
              paddingRight={12}
              paddingLeft={8}
              marginBottom={33}
            >
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={250}
              />
            </Box>
          </Box>
        </Skeleton>
      ) : null}

      {productsQuery.products
        && productsQuery.products.length > 0
        ? (
          <ListVerticalProducts
            loadMoreProducts={loadMoreProducts}
            products={data.productSearch.products}
            loadingHandler={(loadingState) => {
              setLoadingHandlerState(loadingState);
            }}
            totalProducts={productsQuery.recordsFiltered}
            listHeader={(
              <>
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
                        {productsQuery.products?.length == 0
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
                <Box
                  paddingX="micro"
                  paddingBottom="xxxs"
                  paddingTop="quarck"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography fontFamily="nunitoRegular" fontSize="13px">
                    {productsQuery.recordsFiltered}
                    {' '}
                    produtos encontrados
                  </Typography>
                  {!!filterRequestList && filterRequestList.length > 0 && (
                  <Button onPress={() => setFilterRequestList([])}>
                    <Typography
                      color="progressTextColor"
                      variant="precoAntigo3"
                      style={{ textDecorationLine: 'underline' }}
                    >
                      Limpar tudo
                    </Typography>
                  </Button>
                  )}
                </Box>
              </>
          )}
          />
        )
        : (
          <EmptyProductCatalog
            onPress={() => navigation.navigate('Home')}
          />
        )}
    </Box>
  );
};
